import { Box, Drawer, DrawerContent, Flex, useDisclosure } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export default function AppFrame({ children }: { children: ReactNode }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh">
            <Sidebar onClose={() => onClose} display={{ base: "none", md: "block" }} />
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
                    <Sidebar onClose={onClose} />
                </DrawerContent>
            </Drawer>
            <Box>
                <Header onProfileIconClick={onOpen} />
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
