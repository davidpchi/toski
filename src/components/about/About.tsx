import { List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { FiCheckCircle } from "react-icons/fi";

export default function About() {
    return (
        <Flex flexDirection="column" alignItems="center" paddingTop="4" paddingBottom="4">
            <Flex maxWidth="1024px" flexDirection="column" wrap="wrap" alignItems={"center"}>
                <Flex flexDirection={"column"} marginBottom={4}>
                    <Text marginBottom={4}>
                        We keep stats of our games on this server, and this site lets you view said stats. Like
                        commander brackets, we think it's important to clarify the intent of the stats.
                    </Text>
                    <Text marginBottom={4}>
                        The stats are mostly for fun, but can also be a useful tool for making sure everyone’s playing
                        at a fair power level.
                    </Text>
                </Flex>
                <List maxWidth={"750px"}>
                    <ListItem marginBottom={4}>
                        <ListIcon as={FiCheckCircle} />
                        Firstly it’s important that stats will never tell “the whole story.” They are a bit of data and
                        it’s up to players contextualize that data.
                    </ListItem>
                    <ListItem marginBottom={4}>
                        <ListIcon as={FiCheckCircle} />
                        We're not competitively trying to raise winrates. There are no winrate prizes. You should be
                        "aiming for" 25% win-rate for yourself and your decks.
                    </ListItem>
                    <ListItem marginBottom={4}>
                        <ListIcon as={FiCheckCircle} />
                        Any win-rate between 15% and 35% is not problematic because we're not dealing with razor thin
                        margins and there's a lot of opportunity for random other factors to affect win-rate.
                    </ListItem>
                    <ListItem marginBottom={4}>
                        <ListIcon as={FiCheckCircle} />
                        The number of games a deck has has a direct relationship to how accurate that number is. We're
                        working with small sample sizes so data isn't super reliable, but the smaller sample size (like
                        5 or 6 games) are basically too small to count. A 50% winrate on a deck with 20 or fewer games
                        is way different from a 50% winrate on a deck with 60+ games.
                    </ListItem>
                    <ListItem marginBottom={4}>
                        <ListIcon as={FiCheckCircle} />
                        Ultimately there is some subjectivity in these numbers since we're not keeping track of deck
                        versions. If you won 10 games in a row and then cut some of the most powerful cards to win fewer
                        games, the winrate is going to be skewed until you play a lot of games without said powerful
                        cards.
                    </ListItem>
                </List>
            </Flex>
        </Flex>
    );
}
