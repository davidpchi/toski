import { paragraphStyle } from "./styles";
import { NewsArticle } from "../types/domain/NewsArticle";

import article9 from "../assets/article9.png";
import article9_0 from "../assets/article9_0.png";
import article9_1 from "../assets/article9_1.png";

export const article_9: NewsArticle = {
    id: "0009",
    title: "Profile Customization & Account Linking",
    author: "doomgeek",
    date: "November 15th, 2023",
    summary: "New sign-in customization and account linking",
    content: <Article_9 />,
    image: article9
};

export default function Article_9() {
    return (
        <>
            <p style={paragraphStyle}>
                Hi everyone! It's doomgeek here wishing you a happy early Thanksgiving with some big updates!
            </p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Accounts and Sign-In</h1>
            <p style={paragraphStyle}>
                This has been a lot of work, but we are excited to finally bring you the ability to sign in with your
                Discord account into Project Toski!
            </p>
            <p style={paragraphStyle}>...but what does this mean?</p>
            <p style={paragraphStyle}>
                When you successfully sign in and Project Toski has linked your Discord account to a specific player on
                the site, you'll be able to customize your own player page! Right now this includes choosing what
                commander you want to display at the top of your player details page, as well as the ability to link and
                show a Moxfield account on your details page!
            </p>
            <img style={{ margin: "auto" }} src={article9_0} alt="player details demo" />
            <p style={paragraphStyle}>This is just the start of what you'll soon be able to do once you sign-in!</p>
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>First Time Account Linking</h1>
            <p style={paragraphStyle}>
                After you sign in,{" "}
                <b>
                    check the settings page to see if your Discord account has been successfuly linked a Project Toski
                    player.
                </b>
            </p>
            <img style={{ margin: "auto" }} src={article9_1} alt="player details demo" />
            <p style={paragraphStyle}>
                If you don't see an active account linking, reach out to any Derranged Hermit and we'll get you set up!
            </p>
            <p style={paragraphStyle}>
                With this being a pretty new feature set for us, let us know if you find any issues or oddities, and
                we'll happily assist or fix them!
            </p>
            <p style={paragraphStyle}>Til next time!</p>
        </>
    );
}
