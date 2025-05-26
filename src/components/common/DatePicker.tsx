import {
    Box,
    Button,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Stack,
    Text
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatsSelectors } from "../../redux/stats/statsSelectors";
import { StatsAction } from "../../redux/stats/statsActions";
import { format, isToday, startOfDay } from "date-fns";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const quickRanges = [
    { label: "1W", days: 7 },
    { label: "2W", days: 14 },
    { label: "1M", days: 30 },
    { label: "6M", days: 180 },
    { label: "1Y", days: 365 },
    { label: "All", days: undefined }
];

export const DatePicker = React.memo(function DatePicker({
    onDatePickerChange
}: {
    onDatePickerChange?: (date: Date | undefined) => void;
}) {
    const dispatch = useDispatch();
    const startDate = useSelector(StatsSelectors.getStartDate);

    const currentDate = useMemo(() => {
        return startDate ? new Date(startDate) : undefined;
    }, [startDate]);

    const displayDate = useMemo(() => {
        if (!currentDate || isToday(startOfDay(currentDate))) return "All Time";
        return format(currentDate, "MMM d, yyyy");
    }, [currentDate]);

    useEffect(() => {
        if (startDate === undefined && currentDate) {
            dispatch(StatsAction.UpdateStartDate(currentDate.toISOString()));
        }
    }, [startDate, currentDate, dispatch]);

    const setDate = (date: Date | undefined) => {
        const effectiveDate = date && isToday(startOfDay(date)) ? undefined : date;
        dispatch(StatsAction.UpdateStartDate(effectiveDate?.toISOString()));
        onDatePickerChange?.(effectiveDate);
    };

    const handleQuickRange = (days: number | undefined) => {
        const date = days ? new Date(Date.now() - days * 24 * 60 * 60 * 1000) : undefined;
        setDate(date);
    };

    return (
        <Popover placement="bottom-start">
            <PopoverTrigger>
                <Button
                    size="sm"
                    leftIcon={<CalendarIcon />}
                    variant="outline"
                    minW="150px"
                    maxW="200px"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                >
                    {displayDate}
                </Button>
            </PopoverTrigger>
            <PopoverContent width="fit-content" minW="250px" _focus={{ outline: "none" }}>
                <PopoverArrow />
                <PopoverBody>
                    <Box>
                        <Text fontSize="sm" mb="2">
                            Quick ranges
                        </Text>
                        <Stack direction="row" wrap="wrap" spacing={2} mb={4}>
                            {quickRanges.map(({ label, days }) => (
                                <Button key={label} size="xs" onClick={() => handleQuickRange(days)}>
                                    {label}
                                </Button>
                            ))}
                        </Stack>

                        <Text fontSize="sm" mb="2">
                            Or pick a date
                        </Text>
                        <Box border="1px solid #E2E8F0" borderRadius="md" p={2}>
                            <ReactDatePicker
                                selected={currentDate}
                                onChange={(date: Date | null) => setDate(date ?? undefined)}
                                dateFormat="MMM d, yyyy"
                                maxDate={new Date()}
                                isClearable
                                placeholderText="Select a date"
                                inline
                            />
                        </Box>
                    </Box>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
});
