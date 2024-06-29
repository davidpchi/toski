import { paragraphStyle } from "./styles";
import { NewsArticle } from "../types/domain/NewsArticle";
import article13 from "../assets/article13.webp";

export const article_13: NewsArticle = {
    id: "0013",
    title: "Match Tags",
    author: "doomgeek",
    date: "June 29th, 2024",
    summary: "Adding new Match Tags!",
    content: <Article_13 />,
    image: article13
};

export default function Article_13() {
    return (
        <>
            <p style={paragraphStyle}>Hey everyone! It's been a while since our last update!</p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Match Tags</h1>
            <p style={paragraphStyle}>
                We spent some time working on a new framework to support the ability to tag specific matches with
                certain properties depending on certain conditions! We call these Match Tags!
            </p>
            <p style={paragraphStyle}>
                Right now, Match Tags are only visible on the Match Details pages, and the only Match Tag we have
                enabled is "Multi-Ko". This is shown when there are multiple players eliminated in a single turn.
            </p>
            <p style={paragraphStyle}>
                In the future, expect more Match Tags to become visible, and also a better Match Tag browsing
                experience. We just wanted to get this out in front of you as soon as possible!
            </p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Modern Horizons 3</h1>
            <p style={paragraphStyle}>
                As per usual, Project Toski has already been updated to support Modern Horizons 3. For some behind the
                scenes look at this, we are exploring ways to automate this process so we don't need to keep manually
                updating the site when a new set comes out.
            </p>
            <p style={paragraphStyle}>Thanks again for making the community awesome! Til next time!</p>
        </>
    );
}
