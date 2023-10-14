import { Flex, Text } from "@chakra-ui/react";
import React from "react";

export const InsufficientData = React.memo(function InsufficentData({ description }: { description: string }) {
    return (
        <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"} padding="8px">
            <Text>{description}</Text>
        </Flex>
    );
});
