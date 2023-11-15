import React, { useCallback, useMemo } from "react";

import { Flex, Select, Text, Image } from "@chakra-ui/react";

import { commanderList } from "../../services/commanderList";

const placeholderImage = "https://static.thenounproject.com/png/5425-200.png";

export const FavoriteCommanderSection = React.memo(function FavoriteCommanderSection({
    favoriteCommander,
    setFavoriteCommander
}: {
    favoriteCommander: string;
    setFavoriteCommander: (value: string) => void;
}) {
    const commandersArray = useMemo(() => {
        return Object.keys(commanderList).map((commanderName) => {
            return { id: commanderList[commanderName].id, name: commanderName };
        });
    }, []);

    const commanderImage = useMemo(() => {
        return Object.values(commanderList)
            .find((commander) => commander.id === favoriteCommander)
            ?.image.replace("normal", "art_crop");
    }, [favoriteCommander]);

    const onCommanderSelectChange = useCallback(
        (event: any) => {
            const commander = event.target.value;
            setFavoriteCommander(commander);
        },
        [setFavoriteCommander]
    );

    return (
        <Flex marginBottom={"16px"}>
            <Flex flexDirection={"column"} marginRight={"8px"}>
                <Text>Favorite Commander: </Text>
                <Select
                    onChange={onCommanderSelectChange}
                    value={favoriteCommander}
                    placeholder={"Use most played commander"}
                >
                    {commandersArray.map((option) => {
                        return (
                            <option value={option.id} key={option.id}>
                                {option.name}
                            </option>
                        );
                    })}
                </Select>
            </Flex>
            {commanderImage !== undefined ? (
                <Image src={commanderImage} height={20} borderRadius={8} />
            ) : (
                <Image src={placeholderImage} height={"80px"} borderRadius={8} />
            )}
        </Flex>
    );
});
