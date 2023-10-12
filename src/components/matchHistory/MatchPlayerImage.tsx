import {
    Button,
    Flex,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { commanderList } from "../../services/commanderList";
import { MatchDisplayPlayer } from "./types/MatchDisplayPlayer";
import { MatchDisplayCommander } from "./types/MatchDisplayCommander";

export const MatchPlayerImage = React.memo(function MatchPlayerImage({ player }: { player: MatchDisplayPlayer }) {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const finalRef = React.useRef(null);

    const soloCommanderNav = useCallback(() => {
        if (player.commanders[0].id !== undefined) {
            navigate("/commanderOverview/" + player.commanders[0].id);
        }
    }, [navigate, player.commanders]);

    const openCommanderNavModal = useCallback(() => {
        onOpen();
    }, [onOpen]);

    const commanderImagesForModal = player.commanders.map((value: MatchDisplayCommander) => {
        const onClickNav = () => {
            if (value.id !== undefined) {
                navigate("/commanderOverview/" + value.id);
            }
        };

        return (
            <Button
                key={value.id}
                variant="ghost"
                onClick={onClickNav}
                height={"300px"}
                flex={1}
                padding={2}
                size={"lg"}
                alignSelf={"stretch"}
            >
                {commanderList[value.name] ? (
                    <Image
                        key={value.id}
                        src={commanderList[value.name].image}
                        borderRadius={"4%"}
                        boxShadow={"0px 12px 18px 2px rgba(0,0,0,0.3)"}
                    />
                ) : (
                    <Flex width={200} alignContent="center">
                        <p
                            style={{
                                fontStyle: "italic",
                                fontWeight: "bold",
                                wordBreak: "break-word",
                                whiteSpace: "normal"
                            }}
                        >
                            {value.name}
                        </p>
                    </Flex>
                )}
            </Button>
        );
    });

    if (player.commanders.length === 1) {
        return (
            <Button
                ref={finalRef}
                variant="ghost"
                alignSelf={"stretch"}
                onClick={soloCommanderNav}
                flex={1}
                padding={1}
                height={"300px"}
                size="md"
            >
                {commanderList[player.commanders[0].name] ? (
                    <Image
                        height={player.isWinner ? "100%" : "85%"}
                        src={commanderList[player.commanders[0].name].image}
                        borderRadius={"4%"}
                        boxShadow={"0px 12px 18px 2px rgba(0,0,0,0.3)"}
                    />
                ) : (
                    <Flex width={200} alignContent="center">
                        <p
                            style={{
                                fontStyle: "italic",
                                fontWeight: "bold",
                                wordBreak: "break-word",
                                whiteSpace: "normal"
                            }}
                        >
                            {player.commanders[0].name}
                        </p>
                    </Flex>
                )}
            </Button>
        );
    } else {
        return (
            <>
                <Button
                    ref={finalRef}
                    variant="ghost"
                    alignSelf={"stretch"}
                    onClick={openCommanderNavModal}
                    flex={1}
                    padding={1}
                    height={"300px"}
                >
                    <div style={{ display: "grid" }}>
                        <div style={{ gridRowStart: 1, gridColumnStart: 1 }}>
                            {commanderList[player.commanders[1].name] ? (
                                <Image
                                    src={commanderList[player.commanders[1].name].image}
                                    borderRadius={"4%"}
                                    boxShadow={"0px 12px 18px 2px rgba(0,0,0,0.3)"}
                                />
                            ) : (
                                <Flex width={200} alignContent="center">
                                    <p
                                        style={{
                                            fontStyle: "italic",
                                            fontWeight: "bold",
                                            wordBreak: "break-word",
                                            whiteSpace: "normal"
                                        }}
                                    >
                                        {player.commanders[1].name}
                                    </p>
                                </Flex>
                            )}
                        </div>
                        <div style={{ gridRowStart: 1, gridColumnStart: 1, paddingTop: "20%" }}>
                            {commanderList[player.commanders[0].name] ? (
                                <Image
                                    src={commanderList[player.commanders[0].name].image}
                                    borderRadius={"4%"}
                                    boxShadow={"0px 12px 18px 2px rgba(0,0,0,0.3)"}
                                />
                            ) : (
                                <Flex width={200} alignContent="center">
                                    <p
                                        style={{
                                            fontStyle: "italic",
                                            fontWeight: "bold",
                                            wordBreak: "break-word",
                                            whiteSpace: "normal"
                                        }}
                                    >
                                        {player.commanders[0].name}
                                    </p>
                                </Flex>
                            )}
                        </div>
                        {player.commanders[2] !== undefined ? (
                            <div style={{ gridRowStart: 1, gridColumnStart: 1, paddingTop: "90%" }}>
                                {commanderList[player.commanders[2].name] ? (
                                    <Image
                                        src={commanderList[player.commanders[2].name].image}
                                        width={"50%"}
                                        borderRadius={"4%"}
                                        boxShadow={"0px 12px 18px 2px rgba(0,0,0,0.3)"}
                                    />
                                ) : (
                                    <Flex width={200} alignContent="center">
                                        <p
                                            style={{
                                                fontStyle: "italic",
                                                fontWeight: "bold",
                                                wordBreak: "break-word",
                                                whiteSpace: "normal"
                                            }}
                                        >
                                            {player.commanders[2].name}
                                        </p>
                                    </Flex>
                                )}
                            </div>
                        ) : null}
                    </div>
                </Button>
                <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent maxW={"500px"}>
                        <ModalHeader>Select commander to view details</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Flex direction={"row"} justifyContent={"center"} flexWrap={"wrap"}>
                                {commanderImagesForModal}
                            </Flex>
                        </ModalBody>
                        <ModalFooter>
                            <Button mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        );
    }
});
