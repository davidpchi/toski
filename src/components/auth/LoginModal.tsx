import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

import { AuthAction } from "../../redux/auth/authActions";
import { AuthSelectors } from "../../redux/auth/authSelectors";
import { useUserInfo } from "../../logic/hooks/userHooks";
import { useAuthInfo } from "../../logic/hooks/authHooks";

export const LoginModal = React.memo(function LoginModal({
    finalRef,
    onSignOut
}: {
    finalRef: any;
    onSignOut: () => void;
}) {
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { accessToken, tokenType, expirationDate } = useAuthInfo();
    const { userPic, username } = useUserInfo();

    const isFirstLogin = useSelector(AuthSelectors.getIsFirstLogin);

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
    const handleLoginModalConfirm = useCallback(() => {
        if (isRememberMe) {
            if (tokenType) {
                localStorage.setItem("tokenType", tokenType);
            }
            if (accessToken) {
                localStorage.setItem("accessToken", accessToken);
            }
            if (expirationDate) {
                localStorage.setItem("expirationDate", expirationDate.getTime().toString());
            }
        } else {
            localStorage.clear();
        }

        dispatch(AuthAction.FirstLoginComplete());
        onClose();
    }, [accessToken, dispatch, expirationDate, isRememberMe, onClose, tokenType]);

    const handleLoginModalCancel = useCallback(() => {
        onSignOut();
        onClose();
    }, [onClose, onSignOut]);

    return (
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={handleLoginModalCancel}>
            <ModalOverlay />
            <ModalContent maxW={"500px"}>
                <ModalHeader>Confirm Login</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex direction={"column"} justifyContent={"center"} flexWrap={"wrap"} alignItems={"center"}>
                        <Heading>{username}</Heading>
                        <Avatar size={"2xl"} src={userPic ?? ""} />
                        <Checkbox
                            marginTop={"16px"}
                            isChecked={isRememberMe}
                            onChange={() => {
                                setIsRememberMe(!isRememberMe);
                            }}
                        >
                            Keep me signed in
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
