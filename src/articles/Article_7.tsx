import { paragraphStyle } from "./styles";
import { NewsArticle } from "../types/domain/NewsArticle";

import article7 from "../assets/article7.webp";

export const article_7: NewsArticle = {
    id: "0007",
    title: "The Doctor",
    author: "doomgeek",
    date: "October 17, 2023",
    summary: "Support for Doctor Who and matchups",
    content: <Article_7 />,
    image: article7
};

export default function Article_7() {
    return (
        <>
            <p style={paragraphStyle}>
                Hey everyone! Doomgeek here with an unusually timed update, so the changes here are going to be a bit
                smaller than usual.
            </p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Support for Doctor Who set</h1>
            <p style={paragraphStyle}>
                The new Universes Beyond Doctor Who Set just realized, and with that Project Toski is also fully
                supporting the new set. When you are submitting matches, all possible commanders from the set should be
                selectable!
            </p>
            <p style={paragraphStyle}>Looking forward to seeing some Doctor Who commanders show up in our games!</p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>New Player & Commander Matchup Analysis</h1>
            <p style={paragraphStyle}>
                Now if you go a player's details page, you can see a new tab, "Matchups". In the Matchups tab, you are
                able to see that player's games and winrates against another player, or even another commander!
            </p>
            <p style={paragraphStyle}>
                We didn't expect to ship this one so soon, but we really wanted to get it front of our players for them
                to try out! The same analysis will soon come to the Commander detail pages as well.
            </p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>
                Small Reorganization of Detail Page Tabs
            </h1>
            <p style={paragraphStyle}>
                This is a small note, but as we add more of these tables, we are slowly reorganizing the layout of the
                tabs on the Player and Commander details pages respectively.
            </p>
            <p style={paragraphStyle}>
                You are going to find all trends and anaylsis related to behavior across matches in the "Match Trends"
                tab.
            </p>
            <p style={paragraphStyle}>Stay tuned for more tables and analysis coming soon! We can't wait!</p>
        </>
    );
}
