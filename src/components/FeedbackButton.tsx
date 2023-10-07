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
    Text,
    Textarea,
} from "@chakra-ui/react";
import React from "react";
import { submitFeedback } from "../services/feedbackService";

export function FeedbackButton() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    let [value, setValue] = React.useState("");

    let handleInputChange = (e: any) => {
        let inputValue = e.target.value;
        setValue(inputValue);
    };

    let submitForm = async () => {
        await submitFeedback(value);
        alert("Feedback submit!");
        onClose();
    };

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
                        <Text>Feedback:</Text>
                        <Textarea
                            value={value}
                            onChange={handleInputChange}
                            placeholder="Tell us what you think!"
                            size="md"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={1} onClick={submitForm}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
