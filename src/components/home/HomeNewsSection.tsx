import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { NewsCards } from "../news/NewsCards";

export const HomeNewsSection = React.memo(function HomeNewsSection() {
    const navigate = useNavigate();

    const navigateToArticles = () => {
        navigate("/articles");
    };

    return (
        <Flex flexDirection="column" alignItems="center" paddingTop="4" paddingBottom="4">
            <Flex maxWidth="1024px" flexDirection="column" wrap="wrap">
                <Button
                    variant="ghost"
                    flex={1}
                    padding={1}
                    size="md"
                    alignSelf={"flex-end"}
                    marginBottom="4"
                    marginRight="1"
                    flexDirection="row"
                    onClick={navigateToArticles}
                >
                    <Flex alignItems="center">
                        <h1>All Articles</h1>
                        <FiArrowRight />
                    </Flex>
                </Button>
                <Flex wrap="wrap" flexDirection="row">
                    <NewsCards />
                </Flex>
            </Flex>
        </Flex>
    );
});
