import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import { Button, Flex, Image, Input } from "@chakra-ui/react";

import { useUserInfo } from "../../logic/hooks/userHooks";
import { ProfileSelectors } from "../../redux/profiles/profilesSelectors";
import { AppState } from "../../redux/rootReducer";
import { commanderList } from "../../services/commanderList";
import { ProfileService } from "../../services/ProfileService";

import { FiTrash2 } from "react-icons/fi";
import { ExternalDeck } from "../../types/domain/ExternalDeck";
import { DeckSource } from "../../types/domain/DeckSource";

const placeholderImage = "https://static.thenounproject.com/png/5425-200.png";

const FavoriteDeckItem = React.memo(function FavoriteDeckItem({
    deckName,
    deckUrl,
    deckImage,
    deckId
}: {
    deckName: string;
    deckUrl: string;
    deckId: string;
    deckImage?: string;
}) {
    const shortenedDeckName = deckName.length > 20 ? deckName.substring(0, 20) + "..." : deckName;

    const removeDeckFromProfile = ProfileService.useRemoveDeckFromProfile();

    const removeDeck = useCallback(() => {
        removeDeckFromProfile(deckId);
    }, [deckId, removeDeckFromProfile]);

    const navigateToMoxfieldDeck = useCallback(() => {
        window.open(deckUrl, "_blank");
    }, [deckUrl]);

    return (
        <Flex flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} width={"100%"}>
            <Button
                onClick={navigateToMoxfieldDeck}
                minHeight={"100px"}
                variant={"ghost"}
                flexGrow={1}
                display={"flex"}
                justifyContent={"flex-start"}
                marginRight={"8px"}
                marginBottom={"4px"}
            >
                {deckImage !== undefined ? (
                    <Image src={deckImage} height={20} borderRadius={8} />
                ) : (
                    <Image src={placeholderImage} height={"80px"} borderRadius={8} />
                )}
                <Flex flexDirection={"row"} marginLeft={"10px"}>
                    {shortenedDeckName}
                </Flex>
            </Button>
            <Button onClick={removeDeck} variant={"ghost"} alignSelf={"stretch"} minHeight={"100px"} width={"110px"}>
                <FiTrash2 />
            </Button>
        </Flex>
    );
});

export const FavoriteDecksSection = React.memo(function FavoriteDecksSection() {
    const { userId } = useUserInfo();

    const addDeckToProfile = ProfileService.useAddDeckToProfile();

    const profile = useSelector((state: AppState) => ProfileSelectors.getProfile(state, userId ?? ""));
    const moxfieldDecks = useSelector(ProfileSelectors.getMoxfieldDecks);
    const archidektDecks = useSelector(ProfileSelectors.getArchidektDecks);

    const [deckUrl, setDeckUrl] = useState<string>();
    const [canAddDeck, setCanAddDeck] = useState<boolean>(true);

    const addDeck = useCallback(() => {
        if (deckUrl !== undefined) {
            setCanAddDeck(false);

            let finalDeckUrl = deckUrl;

            let source: DeckSource = DeckSource.Moxfield;

            // if this deck url looks like it could be an archidekt deck,
            // let's clean it up a bit since the service is strict about deck url format.
            if (deckUrl.indexOf("archidekt.com/decks") > 0) {
                source = DeckSource.Archidekt;

                const httpsSplit = deckUrl.split("//");
                const url = httpsSplit.length > 1 ? httpsSplit[1] : httpsSplit[0];
                // check to see if the archidekt url has the friendly deck name in the url
                const slashSplit = url.split("/");
                if (slashSplit.length > 3) {
                    // drop the final slash and everything after that
                    finalDeckUrl = slashSplit[0] + "/" + slashSplit[1] + "/" + slashSplit[2];
                }
            }

            addDeckToProfile(finalDeckUrl, source, () => {
                // renable the add deck button
                setCanAddDeck(true);

                // clear the input
                setDeckUrl("");
            });
        }
    }, [addDeckToProfile, deckUrl]);

    if (profile === undefined) {
        return null;
    }

    let hydratedDecks = [];

    if (profile.decks.length > 0) {
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
                            commanderImageUri = commanderList[result.commanderName]?.image.replace(
                                "normal",
                                "art_crop"
                            );
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
                hydratedDecks.push(
                    <FavoriteDeckItem
                        key={deck.id}
                        deckName={deck.name}
                        deckImage={commanderImageUri}
                        deckId={curDeck.id}
                        deckUrl={deck.url}
                    />
                );
            }
        }
    }

    function updateDeckUrl(event: any) {
        setDeckUrl(event.target.value);
    }

    return (
        <Flex
            direction={"column"}
            justifyContent={"center"}
            flexWrap={"wrap"}
            alignItems={"flex-start"}
            alignSelf={"stretch"}
        >
            <Flex marginBottom={"4px"}>My Decks:</Flex>
            {hydratedDecks}
            <Flex direction={"row"} alignItems={"center"} width={"100%"} gap={2} marginTop={"16px"}>
                <Input
                    value={deckUrl}
                    onChange={updateDeckUrl}
                    placeholder={
                        profile.decks.length >= 10 ? "Maximum of 10 Decks Can be Added" : "Enter Deck URL to add"
                    }
                    flex={1}
                />
                <Button onClick={addDeck} isDisabled={!canAddDeck || profile.decks.length >= 10}>
                    Add Deck
                </Button>
            </Flex>
        </Flex>
    );
});
