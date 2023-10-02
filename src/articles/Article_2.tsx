import { paragraphStyle } from "./styles";
import { NewsArticle } from "../types/domain/NewsArticle";

export const article_2: NewsArticle = {
    id: "2",
    title: "Understanding Chance and Clumps",
    author: "WitchPHD",
    note: "Originally published on WitchPHD's substack on March 3, 2022.",
    originalLink: " https://witchphd.substack.com/p/understanding-chance?utm_source=profile&utm_medium=reader2",
    date: "September 22, 2023",
    summary: "Exploring shuffling and statistics with WithPHD: A simple solution",
    content: <Article_2 />,
};

export default function Article_2() {
    return (
        <>
            <p style={paragraphStyle}>
                Alright, so this will be a short one. A friend of mine asked a simple question about eliminating clumps
                in an EDH deck. I decided to describe how I shuffle (a pile shuffle followed by iterant mash shuffling,
                pretty standard). But at the end of the day, theoretically speaking, clumps are a normal part of
                randomly distributing cards and you should expect to run into them from time to time.{" "}
            </p>

            <p style={paragraphStyle}>
                I decided I wanted to explain this, and went on a completely un-asked-for rant about chance, starting
                with my old friend the{" "}
                <a href="https://stattrek.com/online-calculator/hypergeometric.aspx" rel="nofollow">
                    HGDC
                </a>{" "}
                (which{" "}
                <a href="https://witchphd.substack.com/p/mdfc-hyperdrive" rel="nofollow">
                    I wrote about here
                </a>
                ). Of course, this resulted in me rambling on with math nerd stuff like the buffoon I am (though I did
                find out that if you’re running 37 lands then if every one of the 7.9 billion people on earth each
                shuffled a copy of your deck to “perfect randomness” every single day, a deck in a configuration where
                all the lands were sorted to the bottom would appear once every 7,000,000,000,000,000 years or so.)
                Anyway, on to the simple stuff.{" "}
            </p>

            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>
                A Simple Way to Visualize Randomness in Your Deck
            </h1>

            <p style={paragraphStyle}>
                Let’s throw out all the numbers of your deck, and simply{" "}
                <a href="https://www.wolframalpha.com/input?i=flip+100+coins" rel="nofollow">
                    flip 100 coins
                </a>{" "}
                on{" "}
                <a href="https://www.wolframalpha.com/" rel="nofollow">
                    wolfram alpha
                </a>
                . Pick heads or tails and simply underline all the “clumps” of 4 or more. I did this and underlined
                Tails:
            </p>

            <p style={paragraphStyle}>
                <img
                    style={{ margin: "auto" }}
                    src={
                        "https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F8160a034-3612-4280-b837-09ed63293610_1736x916.png"
                    }
                    alt="season 1 splash"
                />
            </p>

            <p style={paragraphStyle}>
                <strong>Consider the following:</strong> Imagine those underlined clumps as clumps of lands, or clumps
                of non-lands. This is what random looks like. The purpose of shuffling your deck is to make it as close
                to randomly ordered as practically possible.
                <em>You may not like it, but this is what a shuffled deck will look like.</em>
            </p>

            <p style={paragraphStyle}>
                The discrepancy is that most people will expect that if you have a 50% chance of flipping heads the
                results will be relatively even, but the reality is that long strings of heads or tails will often
                occur. This is the gap between what random is, and how the human brain tends to think about / predict
                random chance. But the truth is that you are not{" "}
            </p>

            <p style={paragraphStyle}>
                <strong>701.20a</strong>
                <span> To shuffle a library or a face-down pile of cards, </span>
                <strong>randomize the cards within</strong>
                <span> it so that no player knows their order.</span>
            </p>

            <p style={paragraphStyle}>
                Your deck won’t (usually) have 50% lands and if you want truly accurate odds you must use a
                hypergeometric distribution, but this simple experiment is pretty easy to help understand and visualize
                clumping… and why it is a naturally occurring part of a properly shuffled deck… and why methods that
                eliminate clumps altogether (or give you an increased chance of not having them, such as mana weaving)
                are cheating.
            </p>

            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Mana Weaving</h1>
            <p style={paragraphStyle}>
                Mana weaving is a technique meant to reduce clumps. Since a sufficiently randomized deck will have
                clumps like above, I will advise against mana weaving because it has two possible outcomes:
            </p>
            <p style={{ marginLeft: 20 }}>
                <ol>
                    <li>
                        <p style={paragraphStyle}>
                            You shuffle effectively afterward and your deck is “sufficiently random” so the mana weaving
                            doesn’t affect the outcome: <strong>You wasted your time and effort mana weaving.</strong>
                        </p>
                    </li>
                    <li>
                        <p style={paragraphStyle}>
                            Mana weaving reduces clumping in some way, which means the distribution is not sufficiently
                            shuffled / randomized since you affected the outcome: <strong>You are cheating.</strong>
                        </p>
                    </li>
                </ol>
            </p>

            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Conclusion</h1>
            <p style={paragraphStyle}>
                That’s it. That’s the thought. I just thought it was a fun, simple way to communicate how random really
                looks and that clumping is a natural part of it. Maybe it even helps emphasize why you need to have
                effective sources of card draw, to help you power through those clumps, or why tutoring is so powerful.
            </p>
            <p style={paragraphStyle}>I hope you enjoyed this simpler article for a change.</p>
            <p style={paragraphStyle}>
                <strong>Remember:</strong>{" "}
                <em>shuffle thoroughly, play at a reasonable pace, and don’t forget to have fun.</em>
            </p>
        </>
    );
}
