import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { primaryColor } from "../themes/acorn";
import Fab from "@mui/material/Fab/Fab";
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
} from "@chakra-ui/react";
import createTheme from "@mui/material/styles/createTheme";
import { FeedbackForm } from "./FeedbackForm";

const theme = createTheme();

export function FeedbackButton() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <ThemeProvider theme={theme}>
                <Fab
                    onClick={onOpen}
                    color="primary"
                    aria-label="add"
                    style={{
                        backgroundColor: primaryColor[500],
                        position: "fixed",
                        right: "25px",
                        bottom: "25px",
                        zIndex: "-1",
                    }}
                >
                    <EditIcon />
                </Fab>
            </ThemeProvider>

            <Modal isOpen={isOpen} onClose={onClose}>
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
