import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useLoaderData, useNavigate } from "react-router-dom";

import { Button, Flex, Link, Text, Image, Box } from "@chakra-ui/react";

import { Error } from "../Error";
import { Articles } from "../../articles/Articles";

export async function loader(data: { params: any }) {
    return data.params.newsId;
}

export const NewsDetail = React.memo(function NewsDetail() {
    const articleId = useLoaderData() as string;
    const navigate = useNavigate();

    // get the article
    const article = Articles[articleId];

    if (article === undefined) {
        return <Error error={"Something went wrong! Try again later."} />;
    }

    const navigateToArticles = () => {
        navigate("/articles");
    };

    return (
        <Flex flexDirection="column" alignItems="center" paddingBottom="16">
            <Flex flexDirection="column" maxWidth="750">
                <Flex height={"300px"} position={"relative"}>
                    <Box
                        position={"absolute"}
                        bottom={0}
                        right={0}
                        left={0}
                        height={"100%"}
                        width={"100%"}
                        backgroundImage={"linear-gradient(to bottom, rgba(255,0,0,0), #F8F9FA)"}
                    />
                    <Flex
                        flexDirection={"column"}
                        position={"absolute"}
                        bottom={-1}
                        right={0}
                        left={0}
                        width={"100%"}
                        padding={"8px"}
                    >
                        <h1 style={{ fontSize: 12, fontWeight: "bold" }}>{article.date}</h1>
                        <h1 style={{ fontSize: 30, fontWeight: "bold" }}>{article.title}</h1>
                        <Text fontStyle={"italic"}>{article.author}</Text>
                    </Flex>
                    <Image src={article.image} objectFit={"cover"} borderRadius={"8px"} width={"100%"} />
                </Flex>
                {article.note !== undefined ? <Text fontStyle={"italic"}>{article.note}</Text> : null}
                {article.originalLink !== undefined ? (
                    <Link href={article.originalLink}>Go to original article</Link>
                ) : null}
                <div style={{ marginTop: 16 }}>{article.content}</div>
                <Button
                    variant="ghost"
                    flex={1}
                    padding={1}
                    size="lg"
                    alignSelf={"flex-end"}
                    marginTop="16"
                    marginRight="1"
                    flexDirection="row"
                    onClick={navigateToArticles}
                >
                    <Flex alignItems="center">
                        <FiArrowLeft />
                        <h1>Back to Updates</h1>
                    </Flex>
                </Button>
            </Flex>
        </Flex>
    );
});
