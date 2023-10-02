import React, { useCallback, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Button, Flex, Heading, Input, Select, Text, Image, IconButton } from "@chakra-ui/react";
import { submitMatch } from "../../services/matchHistoryService";
import { CreatableSelect, SingleValue } from "chakra-react-select";
import { useSelector } from "react-redux";
import { getPlayers } from "../../redux/statsSelectors";
import { commanderList } from "../../services/commanderList";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router";

type SelectItem = {
    name: string;
    label: string;
};

const MatchSubmissionPlayerCard = React.memo(function MatchSubmissionPlayerCard({
    title,
    commanderOptions,
    rankValue,
    showCloseIcon = false,
    setPlayerValue,
    setCommanderValue,
    setPlayerRank,
    onClose,
}: {
    title: string;
    rankValue: number;
    commanderOptions: SelectItem[];
    showCloseIcon?: boolean;
    setPlayerValue: (val: string) => void;
    setCommanderValue: (val: string) => void;
    setPlayerRank: (val: number) => void;
    onClose?: () => void;
}) {
    const players = useSelector(getPlayers);
    const playersArray = players
        ? Object.values(players)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((value) => {
                  return { name: value.name, label: value.name };
              })
        : [];

    const [playerName, setPlayerName] = useState<SelectItem>();
    const [playerNameInputValue, setPlayerNameInputValue] = useState("");
    const handlePlayerInputChange = (value: string) => {
        setPlayerNameInputValue(value);
    };
    const handleOnPlayerNameChange = (value: SingleValue<SelectItem>) => {
        if (value !== null) {
            setPlayerValue(value.name);
            setPlayerName(value);
        }
    };
    const handleCreatePlayerName = (inputValue: string) => {
        if (inputValue !== "") {
            setPlayerValue(inputValue);
            setPlayerName({ name: inputValue, label: inputValue });
        }
    };

    const [commanderSelectValue, setCommanderSelectValue] = useState<string>("");

    const onCommanderSelectChange = (event: any) => {
        const value = event.target.value;
        setCommanderSelectValue(value);
        setCommanderValue(value);
    };

    const onUpdateRank = useCallback((event: any) => {
        setPlayerRank(Number(event.target.value));
    }, []);

    const commanderImage = commanderList[commanderSelectValue]
        ? commanderList[commanderSelectValue].image.replace("normal", "art_crop")
        : "";

    return (
        <Flex
            direction="column"
            justify="center"
            align="left"
            borderWidth={1}
            padding={"8px"}
            borderRadius={"8px"}
            marginBottom={"16px"}
            marginRight={"16px"}
            marginTop={"16px"}
            width={"500px"}
        >
            <Flex justifyContent={"space-between"}>
                <Flex direction={"column"}>
                    <Heading size={"md"} padding={"0px"}>
                        {title}
                    </Heading>
                    <Image src={commanderImage} height={20} borderRadius={8} />
                </Flex>
                {showCloseIcon ? (
                    <IconButton onClick={onClose} variant="ghost" aria-label="open menu" icon={<FiX />} />
                ) : null}
            </Flex>
            <Text>Name:</Text>
            <CreatableSelect
                isMulti={false}
                options={playersArray}
                inputValue={playerNameInputValue}
                value={playerName}
                getOptionLabel={(player) => player.label}
                getOptionValue={(player) => player.name}
                onChange={handleOnPlayerNameChange}
                onInputChange={handlePlayerInputChange}
                onCreateOption={handleCreatePlayerName}
                placeholder="Enter Player Name"
                size="lg"
            />

            <Text>Commander:</Text>
            <Select
                size="lg"
                onChange={onCommanderSelectChange}
                value={commanderSelectValue}
                placeholder={"Select commander..."}
            >
                {commanderOptions.map((option) => {
                    return <option value={option.name}>{option.name}</option>;
                })}
            </Select>
            <Text>Rank:</Text>
            <Input value={rankValue} onChange={onUpdateRank} marginBottom={"16px"}></Input>
        </Flex>
    );
});

export const MatchSubmission = React.memo(function MatchSubmission() {
    const navigate = useNavigate();

    const [date, setDate] = useState<Date>(new Date());

    const [player1Name, setPlayer1Name] = useState<string>("");
    const [player1Commander, setPlayer1Commander] = useState<string>("");
    const [player1Rank, setPlayer1Rank] = useState<number>(0);

    const [player2Name, setPlayer2Name] = useState<string>("");
    const [player2Commander, setPlayer2Commander] = useState<string>("");
    const [player2Rank, setPlayer2Rank] = useState<number>(0);

    const [player3Name, setPlayer3Name] = useState<string>("");
    const [player3Commander, setPlayer3Commander] = useState<string>("");
    const [player3Rank, setPlayer3Rank] = useState<number>(0);

    const [player4Name, setPlayer4Name] = useState<string>("");
    const [player4Commander, setPlayer4Commander] = useState<string>("");
    const [player4Rank, setPlayer4Rank] = useState<number>(0);

    const [turnCount, setTurnCount] = useState<number>(0);

    const [notes, setNotes] = useState<string>("");

    const [playerCount, setPlayerCount] = useState<number>(4);

    const onUpdateTurnCount = useCallback((event: any) => {
        setTurnCount(Number(event.target.value));
    }, []);

    const onUpdateNotes = useCallback((event: any) => {
        setNotes(event.target.value);
    }, []);

    const onClose = useCallback(() => {
        setPlayerCount(playerCount - 1);
    }, [playerCount, setPlayerCount]);

    const submitData = useCallback(async () => {
        const player1 = {
            name: player1Name,
            commander: player1Commander,
            turnOrder: 1,
            rank: player1Rank,
        };

        const player2 = {
            name: player2Name,
            commander: player2Commander,
            turnOrder: 2,
            rank: player2Rank,
        };

        const player3 = {
            name: player3Name,
            commander: player3Commander,
            turnOrder: 3,
            rank: player3Rank,
        };

        const player4 = {
            name: player4Name,
            commander: player4Commander,
            turnOrder: 4,
            rank: player4Rank,
        };

        const result = await submitMatch(date, player1, player2, player3, player4, turnCount, notes);

        if (result) {
            alert("Match submitted successfully!");
            navigate(0);
        } else {
            alert("Match failed to submit. Try again later.");
        }
    }, [
        player1Name,
        player1Commander,
        player1Rank,
        player2Name,
        player2Commander,
        player2Rank,
        player3Name,
        player3Commander,
        player3Rank,
        player4Name,
        player4Commander,
        player4Rank,
        turnCount,
        notes,
    ]);

    // loop through all of players and create their matchSubmission cards

    const commandersArray = useMemo(() => {
        return Object.keys(commanderList).map((value) => {
            return { name: value, label: value };
        });
    }, []);

    return (
        <Flex direction="column" justify="center" align="center">
            <Heading>SUBMIT MATCH</Heading>
            <Flex direction="column" justify="center" align="left" marginBottom={"16px"}>
                <Text>Date:</Text>
                <DatePicker
                    selected={date}
                    onChange={(value) => {
                        if (value !== null) setDate(value);
                    }}
                />
                <Flex direction="column" justify="center" align="left" marginBottom={"16px"}>
                    {playerCount >= 1 ? (
                        <MatchSubmissionPlayerCard
                            commanderOptions={commandersArray}
                            title={"Player 1"}
                            rankValue={player1Rank}
                            setPlayerValue={setPlayer1Name}
                            setCommanderValue={setPlayer1Commander}
                            setPlayerRank={setPlayer1Rank}
                        />
                    ) : null}
                    {playerCount >= 2 ? (
                        <MatchSubmissionPlayerCard
                            commanderOptions={commandersArray}
                            title={"Player 2"}
                            rankValue={player2Rank}
                            setPlayerValue={setPlayer2Name}
                            setCommanderValue={setPlayer2Commander}
                            setPlayerRank={setPlayer2Rank}
                            showCloseIcon={playerCount == 2}
                            onClose={onClose}
                        />
                    ) : null}
                    {playerCount >= 3 ? (
                        <MatchSubmissionPlayerCard
                            commanderOptions={commandersArray}
                            title={"Player 3"}
                            rankValue={player3Rank}
                            setPlayerValue={setPlayer3Name}
                            setCommanderValue={setPlayer3Commander}
                            setPlayerRank={setPlayer3Rank}
                            showCloseIcon={playerCount == 3}
                            onClose={onClose}
                        />
                    ) : null}
                    {playerCount >= 4 ? (
                        <MatchSubmissionPlayerCard
                            commanderOptions={commandersArray}
                            title={"Player 4"}
                            rankValue={player4Rank}
                            setPlayerValue={setPlayer4Name}
                            setCommanderValue={setPlayer4Commander}
                            setPlayerRank={setPlayer4Rank}
                            showCloseIcon={playerCount == 4}
                            onClose={onClose}
                        />
                    ) : null}
                </Flex>
            </Flex>
            <Text>Number of Turns:</Text>
            <Input value={turnCount} onChange={onUpdateTurnCount} marginBottom={"16px"} width={"500px"}></Input>
            <Text>Notes:</Text>
            <Input value={notes} onChange={onUpdateNotes} marginBottom={"16px"} width={"500px"}></Input>
            <Button onClick={submitData}>Submit Data</Button>
        </Flex>
    );
});
