import { GiWingedSword } from 'react-icons/gi';
import { Flex, Tag, TagLeftIcon, Text } from '@chakra-ui/react';

import { paragraphStyle } from './styles';
import { NewsArticle } from '../types/domain/NewsArticle';

export const article_1: NewsArticle = {
    id: '1',
    title: 'Monday Night Customs Season 1',
    date: 'October 20, 2022',
    summary:
        "The Monday Night Customs team is excited to announce several new and exciting changes coming with our first ever season! From new Season Power Rankings to Season Rewards, you won't want to miss this update!",
    content: <Article_1 />
};

export default function Article_1() {
    return (
        <>
            <p style={paragraphStyle}>
                The Monday Night Customs Team has heard your voices on
                progression in our custom games. Things like difficulty in
                increasing MMR despite winning games and stagnant rankings are
                just some of the feedback we’ve gotten.
            </p>
            <h1 style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>
                Introducing Seasons
            </h1>
            <p style={paragraphStyle}>
                As a result, we are excited to announce something new…
                <b>Monday Night Customs Season 1!</b>
            </p>
            <img
                style={{ margin: 'auto' }}
                src={
                    'https://cdn.discordapp.com/attachments/1032423770578755584/1032433210275135519/season_1_transparent.png'
                }
                alt='season 1 splash'
            />
            <p>
                This will be a <b>timed event that occurs over 3 months</b>,
                which will allow players to try to climb and do their best
                before the season “resets” and the next season begins!
            </p>
            <p style={paragraphStyle}>
                Moving forward, a{' '}
                <b>new season will be introduced every 3 months</b>, so players
                have the opportunity to prove themselves again and get ranked.
            </p>
            <h1 style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>
                Season Power Ranking
            </h1>
            <p style={paragraphStyle}>
                How are players going to be ranked in each season?
            </p>
            <p style={paragraphStyle}>
                As part of seasons, we are introducing the concept of{' '}
                <b>“Season Power Ranking”</b>, or “SPR” for short. SPR will be
                driven by a different algorithm than existing MMRs. Moving
                forward, a new “Leaderboard” on the MNC hub will be the go-to
                place to track your progression throughout the season and
                compare how well you are doing.
            </p>
            <Flex style={{ margin: 'auto', justifyContent: 'center' }}>
                <Tag textAlign='center' color={'gray.600'} alignSelf='center'>
                    <TagLeftIcon as={GiWingedSword}></TagLeftIcon>
                    <Text minW='30px'>{'SPR'}</Text>
                </Tag>
            </Flex>
            <p style={paragraphStyle}>
                SPR will only be finalized after you{' '}
                <b>complete 30 qualifying games</b>. SPRs that aren’t
                “qualified” by the end of the season won’t count! They’ll still
                appear on the leaderboard so players can know how much they are
                changing, but will be deprioritized and shown at the end of the
                list. With a season lasting 3 months, there will be plenty of
                time to play for a “qualified” spot on the leaderboard.
            </p>
            <p style={paragraphStyle}>
                Know that after your SPR is "qualified", your SPR can still
                change! 30 games is just the minimum number of games to get your
                rank counted for the season.
            </p>
            <p style={paragraphStyle}>
                For all the players who enjoy the concept of MMR over all of
                your games, don’t worry, the lifetime MMRs will continue to be
                calculated and viewed on the player overview pages. MMR however
                does not have any effect on the placement you have on the
                leaderboard.
            </p>
            <h1 style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>
                Accolades
            </h1>
            <p style={paragraphStyle}>
                So why qualify for a season and get ranked? Well we are also
                excited to announce <b>Accolades</b>! Accolades are things you
                can earn by completing various tasks across your Monday Night
                Customs games. What are some Accolades you can earn? Well to
                start, the player profiles are getting a little bit of a
                cleanup, and with that we are excited to introduce{' '}
                <b>Player Badges</b>. These are just the first of many possible
                Accolades you can earn by accomplishing tasks throughout the
                season, and they will appear on your profile.
            </p>
            <p style={paragraphStyle}>
                To kick things off, all players who currently have been placed
                with an MMR assigned get a <b>PROJECT: KRAKEN Badge</b> to thank
                you for all the progress you have already made and the
                contributions you brought to this community!
            </p>
            <p>
                These 3 badges are just the beginning of what we have in store
                for Accolades. You'll hear back from us again when we have more
                Accolades finalized!
            </p>
            <h1 style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>
                Season 1 Starts Soon!
            </h1>
            <p style={paragraphStyle}>
                <b>Monday Night Customs Season 1 starts on November 14th!</b>{' '}
                Players who haven’t gotten an MMR yet before Season 1 have until
                then to complete placements to get the PROJECT: KRAKEN badge.
            </p>
            <p style={paragraphStyle}>
                Alright, that’s everything we have to announce for now! If you
                have any feedback or questions, don't hesistate to reach out on
                our discord! Good luck on the abyss!
            </p>
            <h1 style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>
                - TEAM TOXIC
            </h1>
        </>
    );
};
