import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { EditIcon } from "@chakra-ui/icons";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    IconButton,
} from "@chakra-ui/react";
import { FeedbackForm } from "./FeedbackForm";

export function FeedbackButton() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <IconButton
                isRound={true}
                variant="solid"
                colorScheme="primary"
                aria-label="Done"
                fontSize="20px"
                icon={<EditIcon />}
                onClick={onOpen}
                height="32px"
                width="32px"
                style={{
                    position: "fixed",
                    right: "25px",
                    bottom: "25px",
                }}
            />

            <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Submit your feedback!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FeedbackForm />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={1} onClick={onClose}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
