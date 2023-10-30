import { paragraphStyle } from "./styles";
import { NewsArticle } from "../types/domain/NewsArticle";

export const article_4: NewsArticle = {
    id: "4",
    title: "The Power of Search",
    author: "doomgeek",
    date: "September 28, 2023",
    summary: "Adding search functionality and commander trends!",
    content: <Article_4 />,
    image: "https://media.discordapp.net/attachments/1095034595377942670/1134162561290473552/OIG.png?ex=654d0ab2&is=653a95b2&hm=2ce3c78c9513f6eb24882726532dd80729a5ca82f2a78fc01221d2d6655b423a&=&width=676&height=676"
};

export default function Article_4() {
    return (
        <>
            <p style={paragraphStyle}>
                Hey everyone. Doomgeek here with yet another small update on some new features on Project Toski!
            </p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Commander Trends</h1>
            <p style={paragraphStyle}>
                We have a new section of the site called "Commander Trends". This serves similar functions to "Match
                Trends" except this data is across the commanders data set.
            </p>
            <p style={paragraphStyle}>
                To start, we featured a new "Commander Colors Played" pie graph which shows what colors folks in
                Squirrel's Nest are playing. Also, we moved the "Total Commanders Played Count" graph to this new page
                as well.
            </p>
            <p style={paragraphStyle}>
                Expect greater detail on that "Commander Colors Played" pie graph in the future-- we plan on adding the
                ability to filter down to specific color combinations for even greater analysis!
            </p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Search</h1>
            <p style={paragraphStyle}>
                A very requested feature, we are slowly bringing search into Project Toski, starting with the Commander
                Overview & Details.
            </p>
            <p style={paragraphStyle}>
                On the Commander Overview, you can search for a particular commander by name to filter down the results
                to a specific commander. Meanwhile on Commander Details, you can search for a particular player name, or
                any commander name among the matches listed.
            </p>
            <p style={paragraphStyle}>
                Like the date filter, this search works in conjunction with all existing filters allowing for powerful
                scoping of data to a specific criteria.
            </p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Match Frequency</h1>
            <p style={paragraphStyle}>
                Finally, last but not least, we also added a new chart to Match Trends called "Match Frequency". This
                allows us to see how frequently games are being played (and when they are being played).
            </p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Always Looking for Feedback!</h1>
            <p style={paragraphStyle}>
                As per usual, we are eagerly looking for feedback! For now, drop us a line in the discord channel, but
                we should soon have a feedback tool built into Project Toski! Stay tuned...
            </p>
        </>
    );
}
