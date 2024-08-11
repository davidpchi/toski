import { DeckSource } from "../../domain/DeckSource";
import { Profile } from "../../domain/Profile";
import { ChatterfangProfile } from "./ChatterfangProfile";

function mapDeckSource(source: string): DeckSource {
    switch (source) {
        case "moxfield":
            return DeckSource.Moxfield;
        case "archidekt":
            return DeckSource.Archidekt;
        default:
            return DeckSource.Unknown;
    }
}

function profileDataMapper(profile: ChatterfangProfile): Profile | undefined {
    // check to see if the chatterfang profile has all the fields defined
    if (profile.userId) {
        return {
            id: profile.userId.toString(),
            favoriteCommanderId: profile.favoriteCommander ? profile.favoriteCommander : undefined,
            moxfieldId: profile.moxfieldId ? profile.moxfieldId : undefined,
            decks: profile.decks
                ? profile.decks.map((deck) => {
                      return {
                          id: deck._id,
                          externalId: {
                              id: deck.deckId,
                              source: mapDeckSource(deck.source)
                          }
                      };
                  })
                : [],
            toskiId: profile.toskiId,
            archidektId: profile.archidektId,
            isAdmin: profile.isAdmin ?? false
        };
    }

    // something went wrong here, log the error
    console.error(`Failed to map service profile to toski profile. UserId:${profile.userId}.`);
    return undefined;
}

/**
 * Given a collection of service profiles, returns a collection of toski domain profiles,
 * dropping all of the ones that failed to map
 */
export function profilesDataMapper(profiles: ChatterfangProfile[]): Profile[] {
    const mapped = profiles.map((profile: ChatterfangProfile) => profileDataMapper(profile));

    const result: Profile[] = [];

    for (const item of mapped) {
        if (item) {
            result.push(item);
        }
    }

    return result;
}
