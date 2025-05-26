import { Flex, Select, Text } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatsSelectors } from "../../redux/stats/statsSelectors";
import { StatsAction } from "../../redux/stats/statsActions";

enum DatePickerOption {
    AllTime = "allTime",
    Weeks1 = "week1",
    Weeks2 = "week2",
    Months1 = "month1",
    Months6 = "month6",
    Year1 = "year1"
}

function getDatePickerOptionsFromDate(value: Date | undefined): DatePickerOption {
    const currentDate = new Date();

    if (value === undefined) {
        return DatePickerOption.AllTime;
    } else {
        const dateDiff = Math.round((currentDate.getTime() - value.getTime()) / (1000 * 60 * 60 * 24));

        if (dateDiff <= 7) return DatePickerOption.Weeks1;
        if (dateDiff <= 14) return DatePickerOption.Weeks2;
        if (dateDiff <= 30) return DatePickerOption.Months1;
        if (dateDiff <= 180) return DatePickerOption.Months6;
        if (dateDiff <= 365) return DatePickerOption.Year1;
    }

    return DatePickerOption.AllTime;
}

export const DatePicker = React.memo(function DatePicker() {
    const dispatch = useDispatch();
    const startDate = useSelector(StatsSelectors.getStartDate);

    const currentDate = useMemo(() => {
        return startDate ? new Date(startDate) : undefined;
    }, [startDate]);

    const [dateSelectValue, setDateSelectValue] = useState<DatePickerOption>(getDatePickerOptionsFromDate(currentDate));

    useEffect(() => {
        setDateSelectValue(getDatePickerOptionsFromDate(currentDate));
    }, [currentDate, startDate]);

    const onDateFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as DatePickerOption;
        let dateDiff: number | undefined;

        switch (value) {
            case DatePickerOption.Weeks1:
                dateDiff = 7;
                break;
            case DatePickerOption.Weeks2:
                dateDiff = 14;
                break;
            case DatePickerOption.Months1:
                dateDiff = 30;
                break;
            case DatePickerOption.Months6:
                dateDiff = 180;
                break;
            case DatePickerOption.Year1:
                dateDiff = 365;
                break;
            case DatePickerOption.AllTime:
            default:
                dateDiff = undefined;
        }

        const newStartDate =
            dateDiff !== undefined ? new Date(Date.now() - dateDiff * 24 * 60 * 60 * 1000).toISOString() : undefined;

        dispatch(StatsAction.UpdateStartDate(newStartDate));
        setDateSelectValue(value);
    };

    return (
        <Flex direction="row" alignItems="center" marginRight="16px">
            <Text marginRight="8px">Data from: </Text>
            <Select width={200} onChange={onDateFilterChange} value={dateSelectValue}>
                <option value={DatePickerOption.AllTime}>All time</option>
                <option value={DatePickerOption.Weeks1}>1 week ago</option>
                <option value={DatePickerOption.Weeks2}>2 weeks ago</option>
                <option value={DatePickerOption.Months1}>1 month ago</option>
                <option value={DatePickerOption.Months6}>6 months ago</option>
                <option value={DatePickerOption.Year1}>1 year ago</option>
            </Select>
        </Flex>
    );
});
