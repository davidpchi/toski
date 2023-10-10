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
    Textarea
} from "@chakra-ui/react";

import React from "react";

import { submitFeedback } from "../services/feedbackService";

export function FeedbackButton() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [feedbackString, setFeedbackString] = React.useState<string>("");
    const [isFeedbackSubmit, setIsFeedbackSubmit] = React.useState<boolean>(false);

    const handleInputChange = (e: any) => {
        const inputValue = e.target.value;
        setFeedbackString(inputValue);
    };

    const submitForm = async () => {
        await submitFeedback(feedbackString);

        // Communicate that feedback is submit
        setIsFeedbackSubmit(true);

        // Clear feedback and close
        setFeedbackString("");
    };

    const customOnClose = () => {
        onClose();
        setIsFeedbackSubmit(false);
    };

    const modalContent = isFeedbackSubmit ? (
        <ModalContent>
            <ModalHeader>Thanks for your feedback!</ModalHeader>
            <ModalCloseButton />
            <ModalFooter>
                <Button colorScheme="red" mr={1} onClick={customOnClose}>
                    Close
                </Button>
            </ModalFooter>
        </ModalContent>
    ) : (
        <ModalContent>
            <ModalHeader>Submit your feedback!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text>Feedback:</Text>
                <Textarea
                    value={feedbackString}
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
    );

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

                    bottom: "25px"
                }}
            />

            <Modal isOpen={isOpen} onClose={customOnClose} blockScrollOnMount={false}>
                <ModalOverlay />
                {modalContent}
            </Modal>
        </>
    );
}
