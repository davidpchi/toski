import { NewsCardData } from "../components/news/NewsCardData";

const paragraphStyle = { marginTop: 20 };

export const article_2: NewsCardData = {
    id: '2',
    title: 'MMR and SPR',
    date: 'November 21, 2022',
    summary:
        "Beginning with Season 1, there are now two ELO systems that are used in Monday Night Customs. Here's a handy guide to understanding the differences between MMR and SPR and how they impact you.",
    content: <Article_2 />
};

export default function Article_2() {
    return (
        <>
            <p style={paragraphStyle}>
                Monday Night Customs Season One has officially launched, and you
                might have noticed some changes concerning our ELO system.
                Additionally, SPR has replaced MMR in a lot of places throughout
                the MNC site. So what are the differences between MMR and SPR,
                and how will they impact you?
            </p>

            <img
                style={paragraphStyle}
                src={
                    'https://cdn.discordapp.com/attachments/1044352840161820803/1044376086412275783/spr_mmr.jpg'
                }
                alt='spr_mmr_diagram'
            />

            <h1 style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>
                MMR
            </h1>
            <p style={paragraphStyle}>
                MMR is "match-making ranking" and it does exactly that -- it's
                used solely for creating balanced matches. While the
                match-making algorithm hasn't changed for Season 1, the MMR
                alogithm has changed. The new algorithm is intended to be more
                accurate and stable over many matches and provide fairer
                matchmaking.
            </p>

            <p style={paragraphStyle}>
                Since MMR is no longer being used to rank players, it's been
                removed from most of the site tables and relegated to the
                individual player overview under "MMR Summary" for All Seasons.
                Since we've changed the MMR algorithm, the MMR history graph has
                temporarily disappeared, and hopefully we'll add that back in
                soon.
            </p>

            <img
                style={paragraphStyle}
                src='https://cdn.discordapp.com/attachments/1044352840161820803/1044374473484271697/image.png'
                alt='mmr'
            ></img>

            <h1 style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>
                SPR
            </h1>
            <p style={paragraphStyle}>
                SPR is "Season Power Ranking" and a players "ranking" for a
                single season. SPRs will be reset each season, and each player
                who has played at least once game since the start of the season
                now officially has an SPR! The purpose of the SPR system is to
                provide a way to competitively rank players within a season;
                while MMRs remain relatively stable and work silently in the
                background to support fair matchmaking, SPRs will change a lot
                more dramatically and will determine exactly who is at the top
                of the Season leaderboard.
            </p>

            <p style={paragraphStyle}>
                SPRs can be found on both an individual player overview and on
                the brand new "Leaderboard" tab! The Leaderboard displays data
                for each season, including the current SPRs for all players.
                Stay tuned for more updates to the Season 1 leaderboard!
            </p>
            <img
                style={paragraphStyle}
                src='https://cdn.discordapp.com/attachments/1044352840161820803/1044352851272536074/image.png'
                alt='leaderboard'
            ></img>
        </>
    );
}
// blue 3ee5fe
// purple d300ff
