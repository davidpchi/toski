import { paragraphStyle } from './styles';
import { NewsArticle } from '../types/domain/NewsArticle';

export const article_3: NewsArticle = {
    id: '3',
    title: 'How good is Compost, really?',
    author: "Aetherium Slinky",
    note: "Originally published on Reddit on October 23, 2022.",
    originalLink: " https://www.reddit.com/r/EDH/comments/yc2ols/how_good_is_compost_really_with_statistics/",
    date: 'September 22, 2023',
    summary:
        "Breaking down the effectiveness of the enchantment, with statistics!",
    content: <Article_3 />
};

export default function Article_3() {
    return (
        <>
            <p style={paragraphStyle}>
                <img
                    style={{ margin: 'auto', width: "300px" }}
                    src={
                        'https://cards.scryfall.io/large/front/2/5/2523c403-0025-48c7-8ff1-e66ca27ee585.jpg?1562443738'
                    }
                    alt='season 1 splash'
                />
            </p>

            <p style={paragraphStyle}>Compost is only useful if there is an opponent playing black. Otherwise... it sits and does nothing. That's the floor. Nada. If there is an opponent(s) on black it has a very high ceiling. Let's investigate!</p>

            <p style={paragraphStyle}>Someone on reddit asked me how likely it is that there is a black player at the table. The answer might surprise you!</p>

            <p style={paragraphStyle}>I took the top 100 commanders within the last month according to EDHrec and counted how many of them contain black. That's 58 commanders. Then I looked at how many decks each top 100 commander has and found out that there are a total of 73,736 decks and 43,906 of them contained black in their colour identity. That's 59.54%.</p>

            <p style={paragraphStyle}>To figure out how likely it is to find at least one opponent playing black in a pod I found out the number of decks that do not contain black and raise that to the third power: (1 - 0.5954)3 = 6.62%. This is the likelyhood of you finding yourself sitting in a pod with no black in it if all your opponents are playing a top 100 commander. Invert that and you get a whopping 93.38% likelyhood of facing black.</p>

            <h1 style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>Let's take this a step further</h1>

            <p style={paragraphStyle}>How many black cards do we expect to see hit our opponents' graves? This is a bit trickier but let's just go with some extremely fuzzy math here. It's there just to give you an idea, not a definite truth. Please have mercy.</p>

            <p style={paragraphStyle}>Out of all top 100 decks containing black we see that each deck has an average of 2.72 colours (black included). Let's assume each deck only contains monocolour spells and that all colours are equally represented. The ratio of black spells to other colours is thus 1:1.72 which translates to 36.76%.</p>

            <p style={paragraphStyle}>Let's also say 40% of any deck is lands. Additionally we'll assume that any ramp spells we see are also not black (mostly rocks or green: dorks/lands) so we can say roughly 50% of a deck is always non-black regardless of its colour identity.</p>

            <p style={paragraphStyle}>Let's look at the top 274 black spells and their types (excluding lands). Exactly 100 of them are either an instant or a sorcery. There are 8,510,607 instances of spells in the pool out of which 4,096,267 or 48.13% are instants or sorceries.</p>

            <p style={paragraphStyle}> We need to know how many spells players cast in a game. That's a tricky one but a very rough estimate based on my very casual play group's (PlayEDH Low & Mid) stats and something I remember from The Command Zone (sorry, no source - it's in one of their stats episodes...) is that a casual-ish game usually lasts about 10 turns. Yes, high power games and cEDH games don't last that many turns but on average they also cast more spells in fewer turns so that "cancels out"...sort of. Fuzzy math moment. Bear with me.</p>

            <p style={paragraphStyle}>In 10 turns we see 7 cards from the starting hand + 10 cards for turn + probably another 10 or so cards from draw spells. Let's settle on a nice 25, shall we? Even if we see more than that it's more than likely that we can't cast them all. So we're essentially saying each player plays 25 cards during a game. That's roughly 10 lands and 15 spells. Sounds a little generous, maybe, but feel free to adjust that to your own liking.</p>

            <p style={paragraphStyle}>From earlier: the expected value (number) of opponents playing a deck containing black is 3 x 59.54% = 1.8 decks.</p>

            <h1 style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>Time to put it together</h1>

            <p style={paragraphStyle}>50% of a deck is coloured spells (the rest was lands and ramp)</p>

            <p style={paragraphStyle}>37% of the coloured spells in a deck containing black are actually black</p>

            <p style={paragraphStyle}>48% of black spells are instants or sorceries (i.e. they're guaranteed to hit the grave)</p>

            <p style={paragraphStyle}>25 cards in a deck are seen within a game</p>

            <p style={paragraphStyle}>1.8 expected opponents' black containing decks</p>

            <p style={paragraphStyle}>That's 0.50 x 0.37 x 0.48 x 25 x 1.8 = 4 black cards that actually hit the grave in an average game. This also assumes each spell is only played once (no recursion, no loops...), all spells were monocoloured, all black spells are played after Compost hit the field, Compost doesn't get destroyed and no black nontoken permanents hit the grave (in reality they do-- Reassembling Skeleton intensifies).</p>

            <p style={paragraphStyle}>Just an afterthought: this math also assumes you can land Compost before the first black instant or sorcery has been played. This is unlikely. If you draw it half-way through the actual game i.e. around turn 4 or 5 (assuming some degree of draw) it should give you half of its effect. This happens at 7 + 5 = 12 cards where you're expecting to draw 2 cards off of it (= it's a slow Night's Whisper (scryfall)). Also the likelyhood of you finding Compost by 12 cards seen is 12% via a simple hypergeometric calculation. A good tool for this is aetherhub.com if you're into figuring out your chances of drawing a particular kind of a card from your deck.</p>

            <p style={paragraphStyle}>In essence; even if you somehow sit at a table with no black decks you're still better off by slotting Compost in and suffering the consequences every now and then. But in a very averaged out nonrealistic game where you land it on turn 1 or 2:</p>

            <p style={paragraphStyle}>Compost should draw you 3-4 cards.</p>

            <p style={paragraphStyle}>
                <img
                    style={{ margin: 'auto', width: "300px" }}
                    src={
                        'https://cards.scryfall.io/large/front/0/b/0bffb892-e5dc-413d-924e-b9bda7bf7100.jpg?1692516298'
                    }
                    alt='season 1 splash'
                />
            </p>

            <p style={paragraphStyle}>PSA: Daryl, Hunter of Walkers is a non-bo with Compost. Reason: Compost asks for cards and tokens are not cards. Yes, it's on the EDHrec page. Yes, it's a tragedy. Compost, however, does not care about where the cards came from so mill, discard etc. are good strategies with Compost.</p>
        </>
    );
};
