import {
    Box,
    Button,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Stack,
    Text,
    useBreakpointValue,
    VStack
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatsSelectors } from "../../redux/stats/statsSelectors";
import { StatsAction } from "../../redux/stats/statsActions";
import { format, isToday, startOfDay, differenceInCalendarDays } from "date-fns";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Label (abbreviated) -> display (long-form) mapping
const quickRanges = [
    { label: "1M", display: "1 Month", days: 30 },
    { label: "3M", display: "3 Months", days: 90 },
    { label: "6M", display: "6 Months", days: 180 },
    { label: "1Y", display: "1 Year", days: 365 },
    { label: "All", display: "All Time", days: undefined }
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

        const today = startOfDay(new Date());
        for (const { days, display } of quickRanges) {
            if (!days) continue;
            const rangeStart = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);
            const diff = Math.abs(differenceInCalendarDays(rangeStart, currentDate));
            if (diff <= 1) return display;
        }

        return format(currentDate, "MMM d, yyyy");
    }, [currentDate]);

    const isMobile = useBreakpointValue({ base: true, md: false });

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
                {isMobile ? (
                    <IconButton size="sm" icon={<CalendarIcon />} aria-label="Filter by date" variant="outline" />
                ) : (
                    <Button
                        size="sm"
                        leftIcon={<CalendarIcon />}
                        variant="outline"
                        width="180px"
                        justifyContent="flex-start"
                        fontWeight="normal"
                        fontSize="sm"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                    >
                        Filter: {displayDate}
                    </Button>
                )}
            </PopoverTrigger>
            <PopoverContent width="fit-content" minWidth="260px" maxWidth="90vw" _focus={{ outline: "none" }}>
                <PopoverArrow />
                <PopoverBody>
                    <Box>
                        <Text fontSize="sm" fontWeight="bold" marginBottom="2">
                            Filter Match Data
                        </Text>

                        <VStack alignItems="start" spacing={4}>
                            <Box>
                                <Text fontSize="sm" marginBottom="1">
                                    Quick Ranges
                                </Text>
                                <Stack direction="row" flexWrap="wrap" spacing={2}>
                                    {quickRanges.map(({ label, days }) => (
                                        <Button key={label} size="xs" onClick={() => handleQuickRange(days)}>
                                            {label}
                                        </Button>
                                    ))}
                                </Stack>
                            </Box>

                            <Box>
                                <Text fontSize="sm" marginBottom="1">
                                    Custom Date
                                </Text>
                                <Box border="1px solid #E2E8F0" borderRadius="md" padding="2">
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
                        </VStack>
                    </Box>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
});
