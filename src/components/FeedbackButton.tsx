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

import { submitFeedback } from "../services/FeedbackService";
import { primaryColor, secondaryColor } from "../themes/acorn";

export function FeedbackButton() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [feedbackString, setFeedbackString] = React.useState<string>("");
    const [isEmptySubmit, setIsEmptySubmit] = React.useState<boolean>(false);
    const [isFeedbackSubmit, setIsFeedbackSubmit] = React.useState<boolean>(false);

    const handleInputChange = (e: any) => {
        const inputValue = e.target.value;
        setFeedbackString(inputValue);
    };

    const submitForm = async () => {
        if (feedbackString === "") {
            setIsEmptySubmit(true);
            return;
        }

        await submitFeedback(feedbackString);

        // Communicate that feedback is submit
        setIsFeedbackSubmit(true);

        // Clear feedback, reset empty submit tracker, and close
        setFeedbackString("");
        setIsEmptySubmit(false);
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
                <Button colorScheme="primary" mr={1} onClick={customOnClose}>
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
                {isEmptySubmit && feedbackString === "" && (
                    <Text fontSize="small" color={secondaryColor[600]}>
                        Required
                    </Text>
                )}
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="primary" mr={1} onClick={submitForm}>
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
                aria-label="Feedback"
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
