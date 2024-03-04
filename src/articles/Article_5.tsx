import { paragraphStyle } from "./styles";
import { NewsArticle } from "../types/domain/NewsArticle";

export const article_5: NewsArticle = {
    id: "0005",
    title: "Match Submission Tool",
    author: "doomgeek",
    date: "October 06, 2023",
    summary: "Match submission and more",
    content: <Article_5 />,
    image: "https://cdn.discordapp.xyz/attachments/1095034595377942670/1123500605953036418/OIG.png?ex=654b2afa&is=6538b5fa&hm=6aadb306c454e9e708ca782b8e103ecd62a092189160620ae636d5f44b1c5ea2&=&width=676&height=676"
};

export default function Article_5() {
    return (
        <>
            <p style={paragraphStyle}>
                Hey everyone! Doomgeek here, welcoming you to a spooky October! We have a few new updates to Project
                Toski!
            </p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>New Data and Analytics</h1>
            <p style={paragraphStyle}>
                Based on your feedback, we have added some additional data graphs and points to the commander and player
                details pages.
            </p>
            <p style={paragraphStyle}>
                Just to name a few, these include "average turn a commander wins", "historical placements of a
                commander", and more. Check out the commander and player details page to see them all!
            </p>
            <p style={paragraphStyle}>
                If you think of any additional stats you want to see for players and commanders, reach out to any on the
                Derranged Hermits team and we can get it added in!
            </p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Match Submission Tool</h1>
            <p style={paragraphStyle}>Something that we are really excited to announce is the match submission tool!</p>
            <p style={paragraphStyle}>
                The match submission tool will allow you to easily add a match to our data set! This includes being able
                to autopopulate any existing players, as well as browse all possible commanders!
            </p>
            <p style={paragraphStyle}>Using this tool, you won't have to worry about typos any more!</p>
            <p style={paragraphStyle}>
                The tool allows you to also to provide turn count and any match notes (which will soon be displayed on
                Project Toski as well!)
            </p>
            <p style={paragraphStyle}>
                All match submissions will still be reviewed by the Derranged Hermits team, so please don't abuse this
                tool!
            </p>
            <p style={paragraphStyle}>
                For the link to the match submission tool, check out the discord or reach out to a Derranged Hermit!
            </p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Looking for Articles!</h1>
            <p style={paragraphStyle}>
                As mentioned prior, we are always looking contributors for writing articles! If you have some wisdom or
                wacky thoughts you want to share with everyone! Reach out to us and we can you published!
            </p>
        </>
    );
}
