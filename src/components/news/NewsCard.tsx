import { Box, Button, Flex, Image } from "@chakra-ui/react";
import React from "react";

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
        <Box
            style={{
                borderWidth: 1,
                borderRadius: "4px",
                borderColor: "rgb(0,0,0,0.1)",
                marginRight: 8,
                marginLeft: 8,
                width: "100%",
                minWidth: 350,
                cursor: "pointer"
            }}
            boxShadow={"0px 12px 18px -6px rgba(0,0,0,0.3)"}
            onClick={onClick}
        >
            <Flex flexDirection="column" alignItems={"flex-start"} height="100%" width={"100%"}>
                <Flex height={"200px"} position={"relative"} width={"100%"}>
                    <Box
                        position={"absolute"}
                        bottom={0}
                        right={0}
                        left={0}
                        height={"50%"}
                        width={"100%"}
                        backgroundImage={"linear-gradient(to bottom, rgba(255,0,0,0), #F8F9FA)"}
                    />
                    <Image src={image} objectFit={"cover"} borderTopRadius={"4px"} width={"100%"} />
                </Flex>
                <Flex padding={"16px"} flexDirection={"column"} width={"100%"}>
                    <h1 style={{ fontSize: 12 }}>{`${date}- ${author}`}</h1>
                    <h1 style={{ fontSize: 30, fontWeight: "bold" }}>{title}</h1>
                    <div
                        style={{
                            marginTop: 8,
                            textAlign: "left",
                            display: "flex",
                            flexDirection: "column",
                            alignSelf: "stretch",
                            flex: 1
                        }}
                    >
                        <div style={{ flexGrow: 1, marginBottom: 8 }}>
                            <p>{content}</p>
                        </div>
                        <Button variant="ghost" flex={1} padding={1} size="md" alignSelf={"flex-end"}>
                            Read More
                        </Button>
                    </div>
                </Flex>
            </Flex>
        </Box>
    );
});
