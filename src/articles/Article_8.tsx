import { paragraphStyle } from "./styles";
import { NewsArticle } from "../types/domain/NewsArticle";

import article8 from "../assets/article8.png";

export const article_8: NewsArticle = {
    id: "0008",
    title: "New Updates & Dinosaurs",
    author: "doomgeek",
    date: "November 3rd, 2023",
    summary: "A new updates experience and Lost Caverns of Ixalan support",
    content: <Article_8 />,
    image: article8
};

export default function Article_8() {
    return (
        <>
            <p style={paragraphStyle}>It's doomgeek here, bringing you some new updates on Project Toski!</p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>"New" Updates</h1>
            <p style={paragraphStyle}>
                You probably notice the pretty pictures and different style of the former "articles" part of the site.
                We've revamped it and have no made it specific to Project Toski updates! This should make it easier to
                parse and brings more focus to the updates.
            </p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Lost Caverns of Ixalan</h1>
            <p style={paragraphStyle}>
                We've added support for the latest set, the Lost Caverns of Ixalan. You should be able to submit matches
                with all the commanders in this set (as well as the associated commander sets).
            </p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Bug Fixes and Quality of Life Updates</h1>
            <p style={paragraphStyle}>
                We've also gone through and updated some of the tables, adding additional columns and data to give you
                better data analysis. Explore the site to find them out!
            </p>
            <p style={paragraphStyle}>Stay tuned for more tables and analysis coming soon! We can't wait!</p>
        </>
    );
}
