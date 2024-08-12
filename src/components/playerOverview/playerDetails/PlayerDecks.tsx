import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/rootReducer";
import { ProfileSelectors } from "../../../redux/profiles/profilesSelectors";
import { Button, Flex, Image } from "@chakra-ui/react";
import { commanderList } from "../../../services/commanderList";
import { DeckSource } from "../../../types/domain/DeckSource";
import { ExternalDeck } from "../../../types/domain/ExternalDeck";

const placeholderImage = "https://static.thenounproject.com/png/5425-200.png";

export const PlayerDecks = React.memo(function PlayerDecks({ profileId }: { profileId: string }) {
    const profile = useSelector((state: AppState) => ProfileSelectors.getProfile(state, profileId ?? ""));
    const moxfieldDecks = useSelector(ProfileSelectors.getMoxfieldDecks);
    const archidektDecks = useSelector(ProfileSelectors.getArchidektDecks);

    // this component will not render unless moxfield decks are populated
    if (profile === undefined) {
        return null;
    }

    let hydratedDecks = [];

    for (const curDeck of profile.decks) {
        let deck: ExternalDeck | undefined = undefined;
        let commanderImageUri: string | undefined = undefined;

        // attempt to hydrate the deck
        switch (curDeck.externalId.source) {
            case DeckSource.Moxfield:
                if (moxfieldDecks !== undefined) {
                    const result = moxfieldDecks[curDeck.externalId.id];
                    if (result !== undefined) {
                        deck = result;
                        commanderImageUri = commanderList[result.commanderName]?.image.replace("normal", "art_crop");
                    }
                }
                break;
            case DeckSource.Archidekt:
                if (archidektDecks !== undefined) {
                    const result = archidektDecks[curDeck.externalId.id];
                    if (result !== undefined) {
                        deck = result;
                        commanderImageUri = result.commanderImageUri;
                    }
                }
                break;
        }

        // drop any unhydrated decks
        if (deck !== undefined) {
            const navigateToMoxfieldDeck = () => {
                if (deck) {
                    window.open(deck.url, "_blank");
                }
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
                        {commanderImageUri !== undefined ? (
                            <Image src={commanderImageUri} height={20} borderRadius={8} />
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
