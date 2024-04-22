import { CreatableSelect, SingleValue } from "chakra-react-select";
import React, { useCallback, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiUserPlus, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import {
    Button,
    Flex,
    Heading,
    Input,
    Select,
    Text,
    Image,
    IconButton,
    Box,
    Textarea,
    RadioGroup,
    Stack,
    Radio
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

import { MatchHistoryService } from "../../services/MatchHistoryService";
import { StatsSelectors } from "../../redux/stats/statsSelectors";
import { commanderList } from "../../services/commanderList";

const placeholderImage = "https://static.thenounproject.com/png/5425-200.png";

type SelectItem = {
    name: string;
    label: string;
};

const MatchSubmissionPlayerCard = React.memo(function MatchSubmissionPlayerCard({
    title,
    commanderOptions,
    showCloseIcon = false,
    setPlayerValue,
    setCommanderValue,
    setPlayerRank,
    onClose
}: {
    title: string;
    commanderOptions: SelectItem[];
    showCloseIcon?: boolean;
    setPlayerValue: (val: string) => void;
    setCommanderValue: (val: string) => void;
    setPlayerRank: (val: number) => void;
    onClose?: () => void;
}) {
    const players = useSelector(StatsSelectors.getPlayers);
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
        const commander = event.target.value;
        setCommanderSelectValue(commander);
        // if the user has a partner, make sure we stich the names together
        setCommanderValue(hasPartner ? commander + " && " + partnerSelectValue : commander);
    };

    const [partnerSelectValue, setPartnerSelectValue] = useState<string>("");
    const onPartnerSelectChange = (event: any) => {
        const partner = event.target.value;
        setPartnerSelectValue(partner);
        setCommanderValue(commanderSelectValue + " && " + partner);
    };

    const [hasPartner, setHasPartner] = useState<boolean>(false);
    const onHasPartnerChanged = () => {
        if (hasPartner === true) {
            // this means we are now setting the hasPartner as false, remove the partner value from
            // our commander name string and clear the selection
            setPartnerSelectValue("");
            setCommanderValue(commanderSelectValue);
        }

        setHasPartner(!hasPartner);
    };

    const [radioButtonValue, setRadioButtonValue] = useState<string>("1");
    const onUpdateRank = useCallback(
        (value: string) => {
            setRadioButtonValue(value);
            setPlayerRank(Number(value));
        },
        [setPlayerRank]
    );

    const commanderImage = commanderList[commanderSelectValue]
        ? commanderList[commanderSelectValue].image.replace("normal", "art_crop")
        : undefined;

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
            width={"100%"}
            maxWidth={"500px"}
        >
            <div style={{ position: "relative" }}>
                <Flex direction={"column"} justifyContent={"center"} alignItems={"center"} flex={1}>
                    <Heading size={"md"} padding={"0px"} marginBottom={"8px"}>
                        {title}
                    </Heading>
                    {commanderImage !== undefined ? (
                        <Image src={commanderImage} height={20} borderRadius={8} />
                    ) : (
                        <Image src={placeholderImage} height={"80px"} borderRadius={8} />
                    )}
                </Flex>
                {showCloseIcon ? (
                    <IconButton
                        position={"absolute"}
                        top={0}
                        right={0}
                        onClick={onClose}
                        variant="ghost"
                        aria-label="open menu"
                        icon={<FiX />}
                    />
                ) : null}
            </div>
            <Text marginTop={"8px"}>Name:</Text>
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
            <Text marginTop={"8px"}>Commander:</Text>
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
            <Button
                size={"sm"}
                variant={"ghost"}
                leftIcon={hasPartner ? <TriangleUpIcon /> : <TriangleDownIcon />}
                marginTop={"8px"}
                alignSelf={"flex-end"}
                onClick={onHasPartnerChanged}
                aria-label={hasPartner ? "Toggle Partner Off" : "Toggle Partner On"}
            >
                {"Toggle Partner"}
            </Button>
            {hasPartner ? (
                <>
                    <Text marginTop={"8px"}>Partner/Background Commander:</Text>
                    <Select
                        size="lg"
                        onChange={onPartnerSelectChange}
                        value={partnerSelectValue}
                        placeholder={"Select partner or background..."}
                    >
                        {commanderOptions.map((option) => {
                            return <option value={option.name}>{option.name}</option>;
                        })}
                    </Select>
                </>
            ) : null}
            <Text marginTop={"8px"}>Rank:</Text>
            <Box padding={"6px"}>
                <RadioGroup onChange={onUpdateRank} value={radioButtonValue}>
                    <Stack direction="row" justifyContent={"space-between"} maxWidth={"400px"}>
                        <Radio value="1">1st</Radio>
                        <Radio value="2">2nd</Radio>
                        <Radio value="3">3rd</Radio>
                        <Radio value="4">4th</Radio>
                    </Stack>
                </RadioGroup>
            </Box>
        </Flex>
    );
});

export const MatchSubmission = React.memo(function MatchSubmission() {
    const navigate = useNavigate();

    const currentDate = new Date();
    const [date, setDate] = useState<Date>(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
    );

    const [player1Name, setPlayer1Name] = useState<string>("");
    const [player1Commander, setPlayer1Commander] = useState<string>("");
    const [player1Rank, setPlayer1Rank] = useState<number>(1);

    const [player2Name, setPlayer2Name] = useState<string>("");
    const [player2Commander, setPlayer2Commander] = useState<string>("");
    const [player2Rank, setPlayer2Rank] = useState<number>(1);

    const [player3Name, setPlayer3Name] = useState<string>("");
    const [player3Commander, setPlayer3Commander] = useState<string>("");
    const [player3Rank, setPlayer3Rank] = useState<number>(1);

    const [player4Name, setPlayer4Name] = useState<string>("");
    const [player4Commander, setPlayer4Commander] = useState<string>("");
    const [player4Rank, setPlayer4Rank] = useState<number>(1);

    const [turnCount, setTurnCount] = useState<number>(0);

    const [lengthInMins, setLengthInMins] = useState<number>(0);

    const [firstKOTurn, setFirstKOTurn] = useState<number>(0);

    const [notes, setNotes] = useState<string>("");

    const [playerCount, setPlayerCount] = useState<number>(4);

    const onUpdateTurnCount = useCallback((event: any) => {
        setTurnCount(Number(event.target.value));
    }, []);

    const onUpdateNotes = useCallback((event: any) => {
        setNotes(event.target.value);
    }, []);

    const onUpdateFirstKOTurn = useCallback((event: any) => {
        setFirstKOTurn(Number(event.target.value));
    }, []);

    const onUpdateLengthInMins = useCallback((event: any) => {
        setLengthInMins(Number(event.target.value));
    }, []);

    const onClose = useCallback(() => {
        setPlayerCount(playerCount - 1);
    }, [playerCount, setPlayerCount]);

    const onAddPlayer = useCallback(() => {
        if (playerCount < 4) {
            setPlayerCount(playerCount + 1);
        }
    }, [playerCount, setPlayerCount]);

    const submitData = useCallback(async () => {
        const player1 = {
            name: player1Name,
            commander: player1Commander,
            turnOrder: 1,
            rank: player1Rank
        };

        const player2 = {
            name: player2Name,
            commander: player2Commander,
            turnOrder: 2,
            rank: player2Rank
        };

        const player3 = {
            name: player3Name,
            commander: player3Commander,
            turnOrder: 3,
            rank: player3Rank
        };

        const player4 = {
            name: player4Name,
            commander: player4Commander,
            turnOrder: 4,
            rank: player4Rank
        };

        const result = await MatchHistoryService.submitMatch(
            date,
            player1,
            player2,
            player3,
            player4,
            turnCount,
            notes,
            firstKOTurn,
            lengthInMins
        );

        if (result) {
            alert("Match submitted successfully!");
            navigate(0);
            window.scrollTo(0, 0);
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
        date,
        turnCount,
        notes,
        firstKOTurn,
        lengthInMins,
        navigate
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
                    autoFocus={true}
                />
            </Flex>
            <Flex direction="column" justify="center" align="left" marginBottom={"16px"}>
                {playerCount >= 1 ? (
                    <MatchSubmissionPlayerCard
                        commanderOptions={commandersArray}
                        title={"Player 1"}
                        setPlayerValue={setPlayer1Name}
                        setCommanderValue={setPlayer1Commander}
                        setPlayerRank={setPlayer1Rank}
                    />
                ) : null}
                {playerCount >= 2 ? (
                    <MatchSubmissionPlayerCard
                        commanderOptions={commandersArray}
                        title={"Player 2"}
                        setPlayerValue={setPlayer2Name}
                        setCommanderValue={setPlayer2Commander}
                        setPlayerRank={setPlayer2Rank}
                        showCloseIcon={playerCount === 2}
                        onClose={onClose}
                    />
                ) : null}
                {playerCount >= 3 ? (
                    <MatchSubmissionPlayerCard
                        commanderOptions={commandersArray}
                        title={"Player 3"}
                        setPlayerValue={setPlayer3Name}
                        setCommanderValue={setPlayer3Commander}
                        setPlayerRank={setPlayer3Rank}
                        showCloseIcon={playerCount === 3}
                        onClose={onClose}
                    />
                ) : null}
                {playerCount >= 4 ? (
                    <MatchSubmissionPlayerCard
                        commanderOptions={commandersArray}
                        title={"Player 4"}
                        setPlayerValue={setPlayer4Name}
                        setCommanderValue={setPlayer4Commander}
                        setPlayerRank={setPlayer4Rank}
                        showCloseIcon={playerCount === 4}
                        onClose={onClose}
                    />
                ) : null}
                {playerCount < 4 ? (
                    <Button onClick={onAddPlayer} width={"100%"}>
                        <Flex direction={"row"} alignItems={"center"}>
                            <FiUserPlus />
                            <Text size={"md"} padding={"0px"} marginLeft={"16px"}>
                                Add Player
                            </Text>
                        </Flex>
                    </Button>
                ) : null}
            </Flex>
            <Text>Number of Turns:</Text>
            <Input
                value={turnCount}
                onChange={onUpdateTurnCount}
                marginBottom={"16px"}
                width={"100%"}
                maxWidth={"500px"}
            ></Input>
            <Text>Game Length in Minutes:</Text>
            <Input
                value={lengthInMins}
                onChange={onUpdateLengthInMins}
                marginBottom={"16px"}
                width={"100%"}
                maxWidth={"500px"}
            ></Input>
            <Text>Turn of First KO:</Text>
            <Input
                value={firstKOTurn}
                onChange={onUpdateFirstKOTurn}
                marginBottom={"16px"}
                width={"100%"}
                maxWidth={"500px"}
            ></Input>
            <Text>Notes:</Text>
            <Textarea
                value={notes}
                onChange={onUpdateNotes}
                marginBottom={"16px"}
                width={"100%"}
                maxWidth={"500px"}
            ></Textarea>
            <Button onClick={submitData}>Submit Data</Button>
        </Flex>
    );
});
