import { Flex, Select, Text } from "@chakra-ui/react";
import React, { useState } from "react";

enum DatePickerOption {
    AllTime = "allTime",
    Weeks1 = "week1",
    Weeks2 = "week2",
    Months1 = "month1",
    Months6 = "month6",
    Year1 = "year1"
}

export function getDatePickerOptionsFromDate(value: Date | undefined): DatePickerOption {
    const currentDate = new Date();

    if (value === undefined) {
        return DatePickerOption.AllTime;
    } else {
        const dateDiff = Math.round((currentDate.getTime() - value.getTime()) / (1000 * 60 * 60 * 24));

        if (dateDiff <= 7) {
            return DatePickerOption.Weeks1;
        } else if (dateDiff <= 14) {
            return DatePickerOption.Weeks2;
        } else if (dateDiff <= 30) {
            return DatePickerOption.Months1;
        } else if (dateDiff <= 180) {
            return DatePickerOption.Months6;
        } else if (dateDiff <= 365) {
            return DatePickerOption.Year1;
        }
    }

    return DatePickerOption.AllTime;
}

export const DatePicker = React.memo(function DatePicker({
    onChange,
    value
}: {
    onChange: (date: Date | undefined) => void;
    value?: Date;
}) {
    const [dateSelectValue, setDateSelectValue] = useState<DatePickerOption>(getDatePickerOptionsFromDate(value));

    const onDateFilterChange = (event: any) => {
        const value = event.target.value;
        let dateDiff: number | undefined = undefined;

        switch (value) {
            case DatePickerOption.AllTime:
                dateDiff = undefined;
                break;
            case DatePickerOption.Weeks1: {
                dateDiff = 7;
                break;
            }
            case DatePickerOption.Weeks2: {
                dateDiff = 14;
                break;
            }
            case DatePickerOption.Months1: {
                dateDiff = 30;
                break;
            }
            case DatePickerOption.Months6: {
                dateDiff = 180;
                break;
            }
            case DatePickerOption.Year1: {
                dateDiff = 365;
                break;
            }
        }

        onChange(dateDiff !== undefined ? new Date(new Date().getTime() - dateDiff * 24 * 60 * 60 * 1000) : undefined);

        setDateSelectValue(value);
    };

    return (
        <Flex direction={"row"} alignItems={"center"} marginRight={"16px"}>
            <Text marginRight={"8px"}>Data from: </Text>
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
