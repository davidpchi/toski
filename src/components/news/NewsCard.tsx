import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { primaryColor } from "../../themes/acorn";

export const NewsCard = React.memo(function NewsCard({
    onClick,
    title,
    date,
    author,
    content,
    image
}: {
    title: string;
    date: string;
    author: string;
    content: string;
    image: string;
    onClick: () => void;
}) {
    return (
        <Button
            style={{
                borderWidth: 1,
                borderRadius: "4px",
                borderColor: "rgb(0,0,0,0.1)",
                width: "100%",
                height: "375px",
                minWidth: 350,
                padding: 0,
                margin: 8
            }}
            boxShadow={"0px 12px 18px -6px rgba(0,0,0,0.3)"}
            onClick={onClick}
            variant={"ghost"}
            flex={1}
        >
            <Flex flexDirection="column" alignItems={"flex-start"} height="100%" width={"100%"}>
                <Flex height={"200px"} width={"100%"} position={"relative"} zIndex={1}>
                    <Box
                        position={"absolute"}
                        bottom={0}
                        right={0}
                        left={0}
                        height={"50%"}
                        width={"100%"}
                        borderBottomRadius={"3px"}
                        backgroundImage={"linear-gradient(to bottom, rgba(255,0,0,0), #F8F9FA)"}
                    />
                    <Image src={image} objectFit={"cover"} borderRadius={"4px"} width={"100%"} />
                </Flex>
                <Flex flexDirection={"column"} width={"100%"} alignItems={"flex-start"} padding={4}>
                    <Heading size={"xs"} flex={1} padding={"4px 0 0 0"} color={primaryColor[200]}>{`${date}`}</Heading>
                    <Heading size={"md"} flex={1} padding={"4px 0 0 0"}  color={primaryColor[800]} style={{wordBreak: "break-word", whiteSpace: "normal", textAlign: "left" }}>{title}</Heading>
                    <Text textAlign={"left"} flex={1} marginBottom={8} style={{ wordBreak: "break-word", whiteSpace: "normal" }}>{content}</Text>
                </Flex>
            </Flex>
        </Button>
    );
});
