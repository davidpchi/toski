import { Match } from "../types/domain/Match";

export enum MatchTag {
    MultiKo = "MultiKo",
    CommanderFirstWin = "CommanderFirstWin",
    PlayerFirstGame = "PlayerFirstGame"
}

/**
 * A collection match tags that are currently supported as well as the callback function to determine
 * if the match tag applies to that match.
 */
const MatchTagsCollection: {
    [id: string]: {
        type: MatchTag;
        validator: (match: Match) => boolean;
    };
} = {
    MultiKo: {
        type: MatchTag.MultiKo,
        validator: isMatchMultiKo
    }
};

/**
 * Given a match, determines what match tags are appropriate for that match.
 */
export function getMatchTags(match: Match) {
    const matchTags: MatchTag[] = [];
    // loop through all the possible MatchTags and see which ones apply to this match.
    for (const value of Object.values(MatchTagsCollection)) {
        if (value.validator(match)) {
            matchTags.push(value.type);
        }
    }

    return matchTags;
}

/**
 * Given a match, determines if multiple players were eliminated at the same time.
 */
export function isMatchMultiKo(match: Match) {
    const matchRanks: { [id: string]: string } = {};
    for (const player of match.players) {
        if (matchRanks[player.rank] === undefined) {
            matchRanks[player.rank] = player.rank;
        } else if (player.name !== match.winner) {
            return true;
        }
    }

    return false;
}
