import { paragraphStyle } from './styles';
import { NewsArticle } from '../types/domain/NewsArticle';

export const article_3: NewsArticle = {
    id: '3',
    title: 'ARAM Clash 2022 Accolade',
    date: 'December 15, 2022',
    summary:
        'It took a while, but we are excited and happy to finalize the accolade for ARAM Clash 2022 participation!',
    content: <Article_3 />
};

export default function Article_3() {
    return (
        <>
            <p style={paragraphStyle}>
                Hey everyone! It took a while, but we are happy to finally share
                the <b>ARAM Clash 2022</b> participation accolade! The MNC Team
                was thrilled to see our matchmaking ranks used to create the
                teams used in the tournament.
            </p>
            <p style={paragraphStyle}>
                Congratulations again to all who participated in ARAM Clash
                2022!
            </p>
        </>
    );
};
