import React, { useState } from "react";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Flex,
    Heading,
    Avatar,
    Checkbox,
    ModalFooter,
    Button,
    useDisclosure,
    MenuItem
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { UserSelectors } from "../../redux/user/userSelectors";
import { AuthSelectors } from "../../redux/auth/authSelectors";

export const SetingsMenuItem = React.memo(function SetingsMenuItem({ finalRef }: { finalRef: any }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const tokenType = useSelector(AuthSelectors.getTokenType);
    const accessToken = useSelector(AuthSelectors.getAccessToken);

    const username = useSelector(UserSelectors.getUsername);
    const userAvatar = useSelector(UserSelectors.getAvatar);
    const userId = useSelector(UserSelectors.getId);
    const userPic = username ? `https://cdn.discordapp.com/avatars/${userId}/${userAvatar}.png` : undefined;

    const accessTokenFromState = localStorage.getItem("tokenType");
    const [isRememberMe, setIsRememberMe] = useState<boolean>(accessTokenFromState !== null);

    /**
     * When the user closes the modal, if they have selected "remember me", we save the access token to local storage
     */
    const toggleRememberMe = () => {
        if (isRememberMe) {
            // turn off remember me if it is on
            localStorage.clear();
        } else {
            if (tokenType) {
                localStorage.setItem("tokenType", tokenType);
            }
            if (accessToken) {
                localStorage.setItem("accessToken", accessToken);
            }
        }

        setIsRememberMe(!isRememberMe);
    };

    const closeModal = () => {
        onClose();
    };

    return (
        <>
            <MenuItem onClick={() => onOpen()}>Settings</MenuItem>
            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent maxW={"500px"}>
                    <ModalHeader>Settings</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex direction={"column"} justifyContent={"center"} flexWrap={"wrap"} alignItems={"center"}>
                            <Heading>{username}</Heading>
                            <Avatar
                                size={"2xl"}
                                src={
                                    userPic !== undefined
                                        ? userPic
                                        : "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                                }
                            />
                            <Checkbox marginTop={"16px"} isChecked={isRememberMe} onChange={toggleRememberMe}>
                                Remember Me
                            </Checkbox>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={closeModal} variant={"outline"}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
});
