import { paragraphStyle } from "./styles";
import { NewsArticle } from "../types/domain/NewsArticle";

export const article_10: NewsArticle = {
    id: "0010",
    title: "My Decks on Profile",
    author: "doomgeek",
    date: "March 3rd, 2024",
    summary: "Add your own decks to your profile!",
    content: <Article_10 />,
    image: "https://cdn.discordapp.xyz/attachments/983610720316977193/1214112560689848362/different-lineage-v0-exedm3hy97mc1.png"
};

export default function Article_10() {
    return (
        <>
            <p style={paragraphStyle}>
                Hi everyone! It's doomgeek here and it's been a while since we gave you an update, but we are excited
                for this one!
            </p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Add Custom Decks to Profile</h1>
            <p style={paragraphStyle}>
                Building on the last update, we have now added the ability for you to add some of your favorite or
                featured decks to your player profile!
            </p>
            <p style={paragraphStyle}>
                If you go to your settings, you can now add Moxfield deck links to your profile. Simply copy and paste
                the Moxfield deck url and hit Add, and it'll start showing up on your public profile in the "Decks" tab!
            </p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Link your Discord Account Reminder</h1>
            <p style={paragraphStyle}>
                As mentioned prior, reach out to any Elder Squirrel on the server to make sure your player profile is
                properly linked to your Discord login to customize your profile! Today, we are limited to 10 decks added
                to a profile, and soon, we'll be able to better link the decks you have on your profile to games you
                have played!
            </p>
            <p style={paragraphStyle}>
                We'll keep you posted as more updates come down the line. Thanks again for being awesome!
            </p>
        </>
    );
}
