import { IconType } from "react-icons";
import { FiBarChart, FiCalendar, FiHome, FiShield, FiTrendingUp, FiUsers } from "react-icons/fi";

import { Box, useColorModeValue, Flex, CloseButton, VStack, BoxProps, Text } from "@chakra-ui/react";

import { SidebarNavItem } from "./SidebarNavItem";

interface LinkItemProps {
    name: string;
    icon: IconType;
    route: string;
}
const LinkItems: Array<LinkItemProps> = [
    { name: "Home", icon: FiHome, route: "/" },
    { name: "Player Overview", icon: FiUsers, route: "/playerOverview" },
    { name: "Commander Overview", icon: FiShield, route: "/commanderOverview" },
    { name: "Commander Trends", icon: FiBarChart, route: "/commanderTrends" },
    { name: "Match History", icon: FiCalendar, route: "/matchHistory" },
    { name: "Match Trends", icon: FiTrendingUp, route: "/matchTrends" }
];

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

export const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
    const linkItems = [...LinkItems];

    return (
        <Box
            transition="3s ease"
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
            boxShadow={"0px 12px 18px 2px rgba(0,0,0,0.3)"}
        >
            <Flex h="56px" align="center" paddingRight={"8px"} paddingLeft={"20px"} backgroundColor={"white"}>
                <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
                <Text
                    fontSize="20"
                    fontWeight="bold"
                    textTransform="uppercase"
                    color="gray.600"
                    noOfLines={1}
                    paddingLeft={"16px"}
                >
                    Project Toski
                </Text>
            </Flex>
            <VStack
                spacing="24px"
                align="stretch"
                height={"100%"}
                justify="flex-start"
                paddingTop={"24px"}
                paddingBottom={"24px"}
            >
                {linkItems.map((link) => (
                    <SidebarNavItem
                        key={link.name}
                        icon={link.icon}
                        route={link.route}
                        onClose={onClose}
                        label={link.name}
                    ></SidebarNavItem>
                ))}
            </VStack>
        </Box>
    );
};
