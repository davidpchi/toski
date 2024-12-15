export const PLAYER_MINIMUM_GAMES_REQUIRED = 10;
export const PLAYER_MINIMUM_WINS_REQUIRED = 5; // Used for average win turn
export const COMMANDER_MINIMUM_GAMES_REQUIRED = 5;
export const COMMANDER_MINIMUM_WINS_REQUIRED = 5; // Used for average win turn
export const NEW_PLAYER_HIGHLIGHT_DAYS = 30; // Used for highlighting newly qualified players for N days
export const NUMBER_OF_PLAYERS_FOR_VALID_MATCH = 4; // Used for filtering out matches without 4 players
export const PLAYER_MAXIMUM_GAMES_AS_NEW_PLAYER = 15; // Used for defining what constitutes a new player; below this they get highlighted

export const MTG_COLORS: { name: string; id: string; rgb: string }[] = [
    { name: "Black", id: "B", rgb: "rgb(166, 159, 157)" },
    { name: "Green", id: "G", rgb: "rgb(196, 211, 202)" },
    { name: "Red", id: "R", rgb: "rgb(235, 159, 130)" },
    { name: "Blue", id: "U", rgb: "rgb(179, 206, 234)" },
    { name: "White", id: "W", rgb: "rgb(248, 231, 185)" }
];

export const MTG_COLOR_IDENTITIES: { name: string; id: string; rgb: string }[] = [
    { name: "Mono White", id: "W", rgb: "rgb(248, 231, 185)" },
    { name: "Mono Blue", id: "U", rgb: "rgb(179, 206, 234)" },
    { name: "Mono Black", id: "B", rgb: "rgb(166, 159, 157)" },
    { name: "Mono Red", id: "R", rgb: "rgb(235, 159, 130)" },
    { name: "Mono Green", id: "G", rgb: "rgb(196, 211, 202)" },
    { name: "Azorius", id: "Azorius", rgb: "#c8c9ab" },
    { name: "Orzhov", id: "Orzhov", rgb: "#c8c9ab" },
    { name: "Boros", id: "Boros", rgb: "#c8c9ab" },
    { name: "Selesnya", id: "Selesnya", rgb: "#c8c9ab" },
    { name: "Dimir", id: "Dimir", rgb: "#c8c9ab" },
    { name: "Izzet", id: "Izzet", rgb: "#c8c9ab" },
    { name: "Simic", id: "Simic", rgb: "#c8c9ab" },
    { name: "Rakdos", id: "Rakdos", rgb: "#c8c9ab" },
    { name: "Golgari", id: "Golgari", rgb: "#c8c9ab" },
    { name: "Gruul", id: "Gruul", rgb: "#c8c9ab" },
    { name: "Esper", id: "Esper", rgb: "#c8c9ab" },
    { name: "Jeskai", id: "Jeskai", rgb: "#c8c9ab" },
    { name: "Bant", id: "Bant", rgb: "#c8c9ab" },
    { name: "Mardu", id: "Mardu", rgb: "#c8c9ab" },
    { name: "Abzan", id: "Abzan", rgb: "#c8c9ab" },
    { name: "Naya", id: "Naya", rgb: "#c8c9ab" },
    { name: "Grixis", id: "Grixis", rgb: "#c8c9ab" },
    { name: "Sultai", id: "Sultai", rgb: "#c8c9ab" },
    { name: "Temur", id: "Temur", rgb: "#c8c9ab" },
    { name: "Jund", id: "Jund", rgb: "#c8c9ab" },
    { name: "Glint-Eye", id: "Glint-Eye", rgb: "#c8c9ab" },
    { name: "Dune-Brood", id: "Dune-Brood", rgb: "#c8c9ab" },
    { name: "Ink-Treader", id: "Ink-Treader", rgb: "#c8c9ab" },
    { name: "Witch-Maw", id: "Witch-Maw", rgb: "#c8c9ab" },
    { name: "Yore-Tiller", id: "Yore-Tiller", rgb: "#c8c9ab" },
    { name: "Five-color", id: "Five-color", rgb: "#c8c9ab" },
    { name: "Colorless", id: "Colorless", rgb: "#c8c9ab" }
];

export const rankDictionary: { [key: string]: string } = {
    "1": "1st",
    "2": "2nd",
    "3": "3rd",
    "4": "4th"
};
