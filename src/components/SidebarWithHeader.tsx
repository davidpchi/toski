import {
    Box,
    BoxProps,
    Button,
    CloseButton,
    Drawer,
    DrawerContent,
    Flex,
    FlexProps,
    Icon,
    IconButton,
    Link,
    Text,
    useColorModeValue,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import { ReactNode, useCallback, useMemo } from "react";
import { IconType } from "react-icons";
import { FiBarChart, FiCalendar, FiHome, FiMenu, FiRss, FiShield, FiTrendingUp, FiUsers } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { FF_IS_NEWS_ENABLED } from "../services/featureFlagService";
import { routes } from "../navigation/routes";

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

export default function SidebarWithHeader({ children }: { children: ReactNode }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh">
            <SidebarContent onClose={() => onClose} display={{ base: "none", md: "block" }} />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            <Box>
                <Header onOpen={onOpen} />
            </Box>
            <Box ml={{ base: 0, md: 60 }} p="8">
                {children}
                <Flex
                    height={"64px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    marginTop={"64px"}
                    flexDirection={"column"}
                >
                    <div style={{ textAlign: "center", fontStyle: "italic", fontSize: "12px" }}>
                        This site contains unofficial Fan Content permitted under the{" "}
                        <a
                            href="https://company.wizards.com/en/legal/fancontentpolicy"
                            style={{ textDecoration: "underline" }}
                        >
                            Fan Content Policy
                        </a>
                        . Not approved/endorsed by Wizards. Portions of the materials used are property of Wizards of
                        the Coast. ©Wizards of the Coast LLC.
                    </div>
                </Flex>
            </Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    const linkItems = [...LinkItems];

    if (FF_IS_NEWS_ENABLED) {
        linkItems.splice(1, 0, { name: "Articles", icon: FiRss, route: "/articles" });
    }

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
            <Flex h="20" align="center" paddingRight={"8px"} paddingLeft={"20px"} backgroundColor={"white"}>
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
                    <NavItem
                        key={link.name}
                        icon={link.icon}
                        route={link.route}
                        onClose={onClose}
                        label={link.name}
                    ></NavItem>
                ))}
            </VStack>
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    key: string;
    icon: IconType;
    label: string;
    route: string;
    onClose: () => void;
}

const NavItem = ({ icon, label, route, onClose }: NavItemProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isSelected = () => {
        return location.pathname === route || (route !== "/" && location.pathname.indexOf(route) > -1);
    };

    const onClick = useCallback(() => {
        navigate(route);
        window.scrollTo(0, 0);
        onClose();
    }, [route, navigate, onClose]);

    return (
        <Link style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
            <Flex direction="column">
                <Button
                    leftIcon={<Icon as={icon}></Icon>}
                    onClick={onClick}
                    variant={isSelected() ? "solid" : "ghost"}
                    size="lg"
                    borderRadius="0"
                    justifyContent="flex-start"
                >
                    <Text>{label}</Text>
                </Button>
            </Flex>
        </Link>
    );
};

interface HeaderProps extends FlexProps {
    onOpen: () => void;
}

const useHeaderTitle = () => {
    const location = useLocation();

    return useMemo(() => {
        let title = "";

        const path = location.pathname;

        // check each of the potential "areas" of the app that may need more specific titles
        if (path.includes("commanderOverview")) {
            title = "Commander Overview";
        } else if (path.includes("matchHistory")) {
            title = "Match History";
        } else if (path.includes("playerOverview")) {
            title = "Player Overview";
        } else if (path.includes("articles")) {
            title = "Articles";
        } else {
            const route = routes[path];

            // if the route doesn't exist, just return the default;
            if (route !== undefined) {
                title = route.name;
            }
        }

        return title;
    }, [location]);
};

// the md layout is used for normal
// the base layout is used for mobile view
const Header = ({ onOpen, ...rest }: HeaderProps) => {
    const headerTitle = useHeaderTitle();
    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
        <Flex
            transition="0.5s ease"
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height={{ base: 20, md: isHome ? 0 : 20 }}
            align="center"
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            justify={{ base: "space-between", md: "flex-start" }}
            boxShadow={"0px 12px 18px -12px rgba(0,0,0,0.3)"}
            {...rest}
        >
            <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Flex alignItems={"flex-start"} display={{ base: "fixed", md: isHome ? "none" : "fixed" }}>
                <Text fontSize="20" fontWeight="bold" textTransform="uppercase" color="gray.600">
                    {headerTitle}
                </Text>
            </Flex>
        </Flex>
    );
};
