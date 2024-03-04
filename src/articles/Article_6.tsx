import { paragraphStyle } from "./styles";
import { NewsArticle } from "../types/domain/NewsArticle";

export const article_6: NewsArticle = {
    id: "0006",
    title: "Fresh Coat of Paint",
    author: "doomgeek",
    date: "October 12, 2023",
    summary: "Big welcomes and updated looks",
    content: <Article_6 />,
    image: "https://cdn.discordapp.xyz/attachments/1095034595377942670/1108782378224193676/OIG.png?ex=6556390f&is=6543c40f&hm=a19cfe5de0e6e3d34dc767ba159d672978c878a4cd00e63fc17f5968fedfc783&=&width=676&height=676"
};

export default function Article_6() {
    return (
        <>
            <p style={paragraphStyle}>
                Hey everyone! It's Doomgeek again, and we as you probably have noticed, we have a quite a few new
                updates to Project Toski!
            </p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Welcome New Members!</h1>
            <p style={paragraphStyle}>
                The Derranged Hermits know that the Squirrels community has grown recently with a lot of new members
                joining. First and foremost, welcome! Our team hopes that Project Toski will be as fun to use and
                explore as it was to create!
            </p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Updated Themes and Colors</h1>
            <p style={paragraphStyle}>
                Even though Project Toski is pretty young, everything can benefit from a fresh new coat of paint. Hence,
                we've been hard at work cleaning up a lot of the styling on the site to make things look consistent and
                more visible.
            </p>
            <p style={paragraphStyle}>
                Headers should be more visible, data hopefully is laid out in a prettier way without compromising
                usability. Our team chat a lot about the designs we have implemented so far, and we hope you like them!
                More changes donw the line, so stay tunned for those!
            </p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>
                Partners & Backgrounds in Match Submission Tool
            </h1>
            <p style={paragraphStyle}>
                Something we quickly realized after releasing the Match Submission tool was that you were unable to add
                a partner or a background to your primary commander.
            </p>
            <p style={paragraphStyle}>
                We've since fixed this and you are now able to toggle if you have a partner or background.
            </p>
            <p style={paragraphStyle}>
                Rest assured, support for companions is coming eventually, and we are hard at working thinking about how
                to make that happen! For now, if you need to enter a game with a companion, talk to any Derranged Hermit
                and they can manually set up that entry for you.
            </p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Bug Fixes All Around</h1>
            <p style={paragraphStyle}>
                With how fast we are working, we left some bugs in our wake. This update should correct all of them that
                we know about for a more stable and pleasant viewing experience.
            </p>
        </>
    );
}
