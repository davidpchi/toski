import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import { Button, Flex, Image, Input } from "@chakra-ui/react";

import { useUserInfo } from "../../logic/hooks/userHooks";
import { ProfileSelectors } from "../../redux/profiles/profilesSelectors";
import { AppState } from "../../redux/rootReducer";
import { MoxfieldService } from "../../services/MoxfieldService";
import { commanderList } from "../../services/commanderList";
import { ProfileService } from "../../services/ProfileService";

import { FiTrash2 } from "react-icons/fi";

const placeholderImage = "https://static.thenounproject.com/png/5425-200.png";

const FavoriteDeckItem = React.memo(function FavoriteDeckItem({
    deckName,
    deckUrl,
    commanderName,
    deckId
}: {
    deckName: string;
    deckUrl: string;
    commanderName: string;
    deckId: string;
}) {
    const commanderImage = commanderList[commanderName]?.image.replace("normal", "art_crop");

    const shortenedDeckName = deckName.length > 20 ? deckName.substring(0, 20) + "..." : deckName;

    const removeDeckFromProfile = ProfileService.useRemoveDeckFromProfile();

    const removeDeck = useCallback(() => {
        removeDeckFromProfile(deckId);
    }, [deckId, removeDeckFromProfile]);

    const navigateToMoxfieldDeck = useCallback(() => {
        window.open(deckUrl, "_blank");
    }, [deckUrl]);

    return (
        <Flex
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
            margin={"4px"}
        >
            <Button
                onClick={navigateToMoxfieldDeck}
                minHeight={"100px"}
                variant={"ghost"}
                flexGrow={1}
                display={"flex"}
                justifyContent={"flex-start"}
            >
                {commanderImage !== undefined ? (
                    <Image src={commanderImage} height={20} borderRadius={8} />
                ) : (
                    <Image src={placeholderImage} height={"80px"} borderRadius={8} />
                )}
                <Flex flexDirection={"row"} marginLeft={"10px"}>
                    {shortenedDeckName}
                </Flex>
            </Button>
            <Button onClick={removeDeck} variant={"ghost"} alignSelf={"stretch"} minHeight={"100px"}>
                <FiTrash2 />
            </Button>
        </Flex>
    );
});

export const FavoriteDecksSection = React.memo(function FavoriteDecksSection() {
    const { userId } = useUserInfo();

    const hydrateMoxfieldDeck = MoxfieldService.useHydrateMoxfieldDeck();
    const addDeckToProfile = ProfileService.useAddDeckToProfile();

    const profile = useSelector((state: AppState) => ProfileSelectors.getProfile(state, userId ?? ""));
    const moxfieldDecks = useSelector(ProfileSelectors.getMoxfieldDecks);

    const [moxfieldDeckUrl, setMoxfieldDeckUrl] = useState<string>();
    const [canAddDeck, setCanAddDeck] = useState<boolean>(true);

    const addDeck = useCallback(() => {
        if (moxfieldDeckUrl !== undefined) {
            setCanAddDeck(false);
            addDeckToProfile(moxfieldDeckUrl, () => setCanAddDeck(true));
        }
    }, [addDeckToProfile, moxfieldDeckUrl]);

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
                hydratedDecks.push(
                    <FavoriteDeckItem
                        key={deck.id}
                        deckName={deck.name}
                        commanderName={deck.commanderName}
                        deckId={curDeck.id}
                        deckUrl={deck.url}
                    />
                );
            }
        }
    }

    function updateMoxfieldDeckUrl(event: any) {
        setMoxfieldDeckUrl(event.target.value);
    }

    return (
        <Flex
            direction={"column"}
            justifyContent={"center"}
            flexWrap={"wrap"}
            alignItems={"flex-start"}
            marginBottom={"64px"}
        >
            <Flex>My Decks:</Flex>
            {hydratedDecks}
            <Flex direction={"row"} alignItems={"center"} width={"100%"} gap={2} marginTop={"16px"}>
                <Input
                    value={moxfieldDeckUrl}
                    onChange={updateMoxfieldDeckUrl}
                    placeholder={"Enter Moxfield Deck URL to add"}
                    flex={1}
                />
                <Button onClick={addDeck} isDisabled={!canAddDeck || hydratedDecks.length >= 10}>
                    Add Deck
                </Button>
            </Flex>
        </Flex>
    );
});
