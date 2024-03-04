import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/rootReducer";
import { ProfileSelectors } from "../../../redux/profiles/profilesSelectors";
import { Button, Flex, Image } from "@chakra-ui/react";
import { commanderList } from "../../../services/commanderList";

const placeholderImage = "https://static.thenounproject.com/png/5425-200.png";

export const PlayerDecks = React.memo(function PlayerDecks({ profileId }: { profileId: string }) {
    const profile = useSelector((state: AppState) => ProfileSelectors.getProfile(state, profileId ?? ""));
    const moxfieldDecks = useSelector(ProfileSelectors.getMoxfieldDecks);

    // this component will not render unless moxfield decks are populated
    if (profile === undefined || moxfieldDecks === undefined) {
        return null;
    }

    let hydratedDecks = [];

    for (const curDeck of profile.decks) {
        const deck = moxfieldDecks[curDeck.moxfieldId];

        // drop any unhydrated decks
        if (deck !== undefined) {
            const commanderImage = commanderList[deck.commanderName]?.image.replace("normal", "art_crop");

            const navigateToMoxfieldDeck = () => {
                window.open(deck.url, "_blank");
            };

            const deckDisplayName = `${deck.name.substring(0, 20)}${deck.name.length > 20 ? "..." : ""}`;

            hydratedDecks.push(
                <Button
                    onClick={navigateToMoxfieldDeck}
                    minHeight={"100px"}
                    variant={"ghost"}
                    width={"400px"}
                    key={deck.id}
                    display={"flex"}
                    justifyContent={"flex-start"}
                >
                    <Flex flexDirection={"row"} alignItems={"center"} maxWidth={"500px"}>
                        {commanderImage !== undefined ? (
                            <Image src={commanderImage} height={20} borderRadius={8} />
                        ) : (
                            <Image src={placeholderImage} height={"80px"} borderRadius={8} />
                        )}
                        <Flex marginLeft={"10px"} maxWidth={"300px"}>
                            {deckDisplayName}
                        </Flex>
                    </Flex>
                </Button>
            );
        }
    }

    return (
        <Flex
            direction={"row"}
            justifyContent={"center"}
            flexWrap={"wrap"}
            marginBottom={"64px"}
            maxWidth={"1200px"}
            alignSelf={"center"}
        >
            {hydratedDecks}
        </Flex>
    );
});
