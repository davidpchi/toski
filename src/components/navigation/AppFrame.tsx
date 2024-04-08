import { ReactNode } from "react";

import { Box, Drawer, DrawerContent, Flex, IconButton, useDisclosure } from "@chakra-ui/react";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { FeedbackButton } from "../FeedbackButton";
import { FiMenu } from "react-icons/fi";
import { SidebarNavItem } from "./SidebarNavItem";
import { NavigationItems } from "./NavigationItems";

export default function AppFrame({ children }: { children: ReactNode }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const linkItems = [...NavigationItems];

    return (
        <>
            <Flex
                alignItems={"flex-start"}
                display={{ base: "none", md: "block" }}
                style={{
                    position: "fixed",
                    left: "0px",
                    top: "0px",
                    height: "100%"
                }}
                width={"64px"}
                marginBottom={"16px"}
                flexDirection={"column"}
                boxShadow={"0px 12px 18px 2px rgba(0,0,0,0.3)"}
            >
                <IconButton
                    onClick={onOpen}
                    variant="ghost"
                    aria-label="open menu"
                    icon={<FiMenu />}
                    marginBottom={"16px"}
                />
                {linkItems.map((link) => (
                    <Box marginBottom={"16px"}>
                        <SidebarNavItem
                            key={link.name}
                            icon={link.icon}
                            route={link.route}
                            onClose={onClose}
                            label={""}
                        />
                    </Box>
                ))}
            </Flex>
            <Box minH="100vh">
                <Drawer
                    autoFocus={false}
                    isOpen={isOpen}
                    placement="left"
                    onClose={onClose}
                    returnFocusOnClose={false}
                    onOverlayClick={onClose}
                    size="xs"
                >
                    <DrawerContent>
                        <Sidebar onClose={onClose} />
                    </DrawerContent>
                </Drawer>
                <Box>
                    <Header onProfileIconClick={onOpen} />
                </Box>
                <Box marginLeft={{ base: 0, md: 20 }} p="8">
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
                            . Not approved/endorsed by Wizards. Portions of the materials used are property of Wizards
                            of the Coast. ©Wizards of the Coast LLC.
                        </div>
                    </Flex>
                </Box>
            </Box>
            <FeedbackButton />
        </>
    );
}
