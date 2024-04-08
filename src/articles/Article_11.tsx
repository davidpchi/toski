import { paragraphStyle } from "./styles";
import { NewsArticle } from "../types/domain/NewsArticle";
import article11 from "../assets/article11.webp";

export const article_11: NewsArticle = {
    id: "0011",
    title: "Advanced Commander Color Identities",
    author: "doomgeek",
    date: "April 7th, 2024",
    summary: "Add your own decks to your profile!",
    content: <Article_11 />,
    image: article11
};

export default function Article_11() {
    return (
        <>
            <p style={paragraphStyle}>Hi everyone! It's doomgeek here again providing a small update on what's new!</p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Revamped Commander Color Identities</h1>
            <p style={paragraphStyle}>
                Something we've been looking to do is to add better breakdown of the commanders played by color. The
                breakdown simply by the commander's colors and not identity is nice, but doesn't provide a better
                picture of what is being played in the Squirrel's Nest.
            </p>
            <p style={paragraphStyle}>
                Thanks to some work done recently, we now have an new updated Commander Color Identity chart on the
                "Commander Trends" page. Go check it out!
            </p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Updated Navigation</h1>
            <p style={paragraphStyle}>
                You probably noticed that the site's navigation got a little bit of revamping. This should remove a lot
                of the clutter the previous navigation had and be friendly for smaller screens. Let us know what you
                think!
            </p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Always Open to Suggetions</h1>
            <p style={paragraphStyle}>
                On that note, if you have any ideas or suggestions for Project Toski, feel free to share on the
                "Feedback" channel in the Discord Server.
            </p>
            <p style={paragraphStyle}>That's all we have for now. Till next time!</p>
        </>
    );
}
