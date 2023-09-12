import { Flex } from '@chakra-ui/react';
import { NewsCards } from './NewsCards';

export default function NewsOverview() {
    return (
        <Flex
            flexDirection='column'
            alignItems='center'
            paddingTop='4'
            paddingBottom='4'
        >
            <Flex maxWidth='1024px' flexDirection='column' wrap='wrap'>
                <Flex wrap='wrap' flexDirection='row'>
                    <NewsCards />
                </Flex>
            </Flex>
        </Flex>
    );
}
