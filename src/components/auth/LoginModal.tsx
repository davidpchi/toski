import React, { useEffect, useState } from "react";

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
    useDisclosure
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { UserSelectors } from "../../redux/user/userSelectors";
import { AuthAction } from "../../redux/auth/authActions";
import { AuthSelectors } from "../../redux/auth/authSelectors";

export const LoginModal = React.memo(function LoginModal({
    finalRef,
    onSignOut
}: {
    finalRef: any;
    onSignOut: () => void;
}) {
    const dispatch = useDispatch();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const tokenType = useSelector(AuthSelectors.getTokenType);
    const accessToken = useSelector(AuthSelectors.getAccessToken);
    const isFirstLogin = useSelector(AuthSelectors.getIsFirstLogin);

    const username = useSelector(UserSelectors.getUsername);
    const userAvatar = useSelector(UserSelectors.getAvatar);
    const userId = useSelector(UserSelectors.getId);
    const userPic = username ? `https://cdn.discordapp.com/avatars/${userId}/${userAvatar}.png` : undefined;

    const [isRememberMe, setIsRememberMe] = useState<boolean>(true);

    /**
     * This effects handles if we should be showing the modal after the user logs in.
     * The primary reason for this is to allow the user to decline the "remember me", which opts them out of local storage.
     */
    useEffect(() => {
        if (username !== undefined && isFirstLogin) {
            onOpen();
            window.scroll(0, 0);
        }
    }, [dispatch, isFirstLogin, onOpen, username]);

    /**
     * When the user closes the modal, if they have selected "remember me", we save the access token to local storage
     */
    const handleLoginModalConfirm = () => {
        if (isRememberMe) {
            if (tokenType) {
                localStorage.setItem("tokenType", tokenType);
            }
            if (accessToken) {
                localStorage.setItem("accessToken", accessToken);
            }
        } else {
            localStorage.clear();
        }

        dispatch(AuthAction.FirstLoginComplete());
        onClose();
    };

    const handleLoginModalCancel = () => {
        onSignOut();
        onClose();
    };

    return (
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={handleLoginModalCancel}>
            <ModalOverlay />
            <ModalContent maxW={"500px"}>
                <ModalHeader>Confirm Login</ModalHeader>
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
                        <Checkbox
                            marginTop={"16px"}
                            isChecked={isRememberMe}
                            onChange={() => {
                                setIsRememberMe(!isRememberMe);
                            }}
                        >
                            Remember Me
                        </Checkbox>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button mr={3} onClick={handleLoginModalConfirm}>
                        Confirm
                    </Button>
                    <Button mr={3} onClick={handleLoginModalCancel} variant={"outline"}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
});
