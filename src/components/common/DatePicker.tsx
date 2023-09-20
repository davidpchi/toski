import { Flex, Select, Text } from "@chakra-ui/react";
import React, { useState } from "react";

enum DatePickerOptions {
    AllTime = "allTime",
    Weeks1 = "week1",
    Weeks2 = "week2",
    Months1 = "month1",
    Months6 = "month6",
    Year1 = "year1",
}


export const DatePicker = React.memo(function DatePicker({
    onChange
}: {
    onChange: (date: Date | undefined) => void;
}) {
    const [dateSelectValue, setDateSelectValue] = useState<DatePickerOptions>(DatePickerOptions.AllTime);

    const onDateFilterChange = (event: any) => {
        const value = event.target.value;
        let dateDiff: number | undefined = undefined;

        switch (value) {
            case DatePickerOptions.AllTime:
                dateDiff = undefined;
                break;
            case DatePickerOptions.Weeks1: {
                dateDiff = 7;
                break;
            }
            case DatePickerOptions.Weeks2: {
                dateDiff = 14;
                break;
            }
            case DatePickerOptions.Months1: {
                dateDiff = 30;
                break;
            }
            case DatePickerOptions.Months6: {
                dateDiff = 180;
                break;
            }
            case DatePickerOptions.Year1: {
                dateDiff = 365;
                break;
            }
        }

        const filter = new Date();
        if (dateDiff !== undefined) {
            filter.setDate(filter.getDate() - dateDiff);
        }

        onChange(dateDiff !== undefined ? filter : dateDiff);

        setDateSelectValue(value);
    };


    return (<Flex direction={"row"} alignItems={"center"} marginRight={"16px"}>
        <Text marginRight={"8px"}>Data from: </Text>
        <Select width={200} onChange={onDateFilterChange} value={dateSelectValue}>
            <option value={DatePickerOptions.AllTime}>All time</option>
            <option value={DatePickerOptions.Weeks1}>1 week ago</option>
            <option value={DatePickerOptions.Weeks2}>2 weeks ago</option>
            <option value={DatePickerOptions.Months1}>1 month ago</option>
            <option value={DatePickerOptions.Months6}>6 months ago</option>
            <option value={DatePickerOptions.Year1}>1 year ago</option>
        </Select>
    </Flex>)
});