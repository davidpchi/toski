import { paragraphStyle } from "./styles";
import { NewsArticle } from "../types/domain/NewsArticle";
import article12 from "../assets/article12.webp";

export const article_12: NewsArticle = {
    id: "0012",
    title: "Outlaws & New Match Trends",
    author: "doomgeek",
    date: "April 20th, 2024",
    summary: "Adding some new analysis and Outlaws of Thunder Junction!",
    content: <Article_12 />,
    image: article12
};

export default function Article_12() {
    return (
        <>
            <p style={paragraphStyle}>It's doomgeek again with a few udpates!</p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Match Length in Minutes</h1>
            <p style={paragraphStyle}>
                Thanks to the digilent reporting of our players, we are getting more and more data around the length of
                our games...measured in minutes!
            </p>
            <p style={paragraphStyle}>
                On the individual match detail pages, you can now see the match length in minutes if it was recorded.
                There is also a new match trends graph tracking the time length of games over time.
            </p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>First KO Turn</h1>
            <p style={paragraphStyle}>
                Another piece of data that is now formalized as part of a match is the first turn a player is eliminated
                from the game.
            </p>
            <p style={paragraphStyle}>
                You can see this by navigating into the match details for matches that had this data recorded.
            </p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Outlaws of Thunder Junction</h1>
            <p style={paragraphStyle}>
                Last but not least, Project Toski has been updated to properly support new Outlaws of Thunder Junction
                commanders. Let's see some of those getting played!
            </p>
            <p style={paragraphStyle}>
                Thanks again for jamming games and taking the time to report the matches. We are excited to provide you
                more features soon!
            </p>
        </>
    );
}
