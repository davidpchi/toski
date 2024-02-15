import React from "react";
import { MoxfieldService } from "../../../services/MoxfieldService";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/rootReducer";
import { ProfileSelectors } from "../../../redux/profiles/profilesSelectors";
import { Button, Flex, Image } from "@chakra-ui/react";
import { commanderList } from "../../../services/commanderList";

const placeholderImage = "https://static.thenounproject.com/png/5425-200.png";

export const PlayerDecks = React.memo(function PlayerDecks({ profileId }: { profileId: string }) {
    const hydrateMoxfieldDeck = MoxfieldService.useHydrateMoxfieldDeck();

    const profile = useSelector((state: AppState) => ProfileSelectors.getProfile(state, profileId ?? ""));
    const moxfieldDecks = useSelector(ProfileSelectors.getMoxfieldDecks);

    if (profile === undefined) {
        return null;
    }

    let hydratedDecks = [];

    if (moxfieldDecks === undefined) {
        // we need to hydrate each of these decks
        for (const deck of profile.decks) {
            hydrateMoxfieldDeck(deck.moxfieldId);
        }
    } else {
        // we already have some decks, initialized, check to see which ones we haven't hydrated yet
        for (const curDeck of profile.decks) {
            const deck = moxfieldDecks[curDeck.moxfieldId];
            if (deck === undefined) {
                hydrateMoxfieldDeck(curDeck.moxfieldId);
            } else {
                const commanderImage = commanderList[deck.commanderName]?.image.replace("normal", "art_crop");

                const navigateToMoxfieldDeck = () => {
                    window.open(deck.url, "_blank");
                };

                hydratedDecks.push(
                    <Button onClick={navigateToMoxfieldDeck} minHeight={"100px"} variant={"ghost"} key={deck.id}>
                        <Flex flexDirection={"row"} alignItems={"center"}>
                            {deck.name}
                            {commanderImage !== undefined ? (
                                <Image src={commanderImage} height={20} borderRadius={8} />
                            ) : (
                                <Image src={placeholderImage} height={"80px"} borderRadius={8} />
                            )}
                        </Flex>
                    </Button>
                );
            }
        }
    }

    return (
        <Flex
            direction={"column"}
            justifyContent={"center"}
            flexWrap={"wrap"}
            alignItems={"flex-start"}
            marginBottom={"64px"}
        >
            {hydratedDecks}
        </Flex>
    );
});
