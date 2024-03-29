import { paragraphStyle } from "./styles";
import { NewsArticle } from "../types/domain/NewsArticle";

import article1 from "../assets/article1.webp";

export const article_1: NewsArticle = {
    id: "0001",
    title: "Introducing Articles!",
    author: "doomgeek",
    date: "September 22, 2023",
    summary: "Adding the articles section and new filters",
    content: <Article_1 />,
    image: article1
};

export default function Article_1() {
    return (
        <>
            <p style={paragraphStyle}>
                Hey everyone. Doomgeek here with a small update on some new features on Project Toski!
            </p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Articles</h1>
            <p style={paragraphStyle}>
                Since you are reading this article now, you have discovered the articles section of Project Toski! This
                will allow members of our community to share their thoughts, insights, and learnings. It will also allow
                the team to share any updates and functionality that we've added to Project Toski.
            </p>
            <p style={paragraphStyle}>
                If you are at all interested in submitting any sort of content (deck techs, analysis, stats, etc), feel
                free to reach out to any Derranged Hermit and we'll see about getting your content published here!
            </p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Date Filters</h1>
            <p style={paragraphStyle}>
                There are new date filters that can be applied on commander & player overview and details pages. What
                this will do is limit the data used on those pages to a certain date range. Currently, there are pre-set
                date ranges, but let us know if you think a more customized date range is prefered!
            </p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Eager for Feedback</h1>
            <p style={paragraphStyle}>
                As always, if you find something that could be improved or is missing on Project Toski. Don't hesitate
                to reach out. Thanks everyone!
            </p>
        </>
    );
}
