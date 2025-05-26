import { paragraphStyle } from "./styles";
import { NewsArticle } from "../types/domain/NewsArticle";
import article15 from "../assets/article15.webp";

export const article_15: NewsArticle = {
    id: "0015",
    title: "Global Date Filter Improvements",
    author: "doomgeek",
    date: "May 26th, 2025",
    summary: "Site-wide date filtering!",
    content: <Article_15 />,
    image: article15
};

export default function Article_15() {
    return (
        <>
            <p style={paragraphStyle}>Hi everyone! We’ve got a quick but exciting update to share with you today!</p>

            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Global Date Filter Improvements</h1>
            <p style={paragraphStyle}>
                We’ve made some improvements to how date filtering works across Toski. Previously, filters were applied
                per table or graph, which could get a little confusing. Now, when you pick a date range, it’ll apply
                globally to all the relevant data views across the site!
            </p>
            <p style={paragraphStyle}>
                On top of that, we’ve set a new default range: all data now loads from the past 3 months by default. But
                don’t worry — if you want to look back further, just set it to "All Time" and we’ll remember that
                preference for the rest of your browsing session.
            </p>

            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Misc Bug Fixes and Updates</h1>
            <p style={paragraphStyle}>
                As always, we’ve also shipped a few behind-the-scenes fixes and improvements to help keep things running
                smoothly. The site should feel just a bit more polished and responsive.
            </p>
            <p style={paragraphStyle}>
                That’s it for now! Thanks for continuing to play games and log them — and as always, feel free to reach
                out with feedback or ideas. See you in the command zone!
            </p>
        </>
    );
}
