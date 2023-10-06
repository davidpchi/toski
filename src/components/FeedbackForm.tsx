import { Text, Textarea } from "@chakra-ui/react";
import React from "react";

export function FeedbackForm() {
    let [value, setValue] = React.useState("");

    let handleInputChange = (e: any) => {
        let inputValue = e.target.value;
        setValue(inputValue);
    };

    return (
        <>
            <Text>Feedback: {value}</Text>
            <Textarea value={value} onChange={handleInputChange} placeholder="Tell us what you think!" size="md" />
        </>
    );
}
