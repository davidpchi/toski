import { paragraphStyle } from "./styles";
import { NewsArticle } from "../types/domain/NewsArticle";
import article14 from "../assets/article14.webp";

export const article_14: NewsArticle = {
    id: "0014",
    title: "Archidekt Account Linking",
    author: "doomgeek",
    date: "September 12th, 2024",
    summary: "Add new Archidekt Account Links!",
    content: <Article_14 />,
    image: article14
};

export default function Article_14() {
    return (
        <>
            <p style={paragraphStyle}>Hi everyone! We have just a small bit of updates coming to you!</p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Archidekt Account Linking</h1>
            <p style={paragraphStyle}>
                As the title suggests, we did some work to finally have the ability to link and Archidekt account
                profile!
            </p>
            <p style={paragraphStyle}>
                Simply follow the directions on the settings of your profile, and give it a try! If there are any
                additional deck builders you would like to be able to link to, reach out to us and we'll try to work it
                out!
            </p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Misc Bug Fixes and Updates</h1>
            <p style={paragraphStyle}>
                You may not notice, but every one of these updates comes with a few behind the scenes fixes to make
                things more stable and fix some issues the site may have, so rest assured we are always trying to make
                Toski better.
            </p>
            <p style={paragraphStyle}>Keep jamming those commander games and you'll hear back from us soon enough!</p>
        </>
    );
}
