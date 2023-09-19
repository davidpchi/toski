import { Flex } from '@chakra-ui/layout';
import React from 'react';

export const Loading = React.memo(function Loading({ text }: { text: string }) {
    return (
        <Flex
            minHeight='100vh'
            justify='center'
            align='start'
        >
            <Flex
                width='100%'
                height='100%'
                justify='center'
                align='center'
                flexDirection='column'
            >
                <img
                    alt='squirrel gif'
                    style={{
                        width: '25%',
                        height: '25%',
                        objectFit: 'contain',
                    }}
                    src={process.env.PUBLIC_URL + "/squirrel.gif"}
                />
                <h1
                    style={{
                        color: 'black',
                        fontSize: 48,
                        marginRight: 64,
                        marginLeft: 64,
                    }}
                >
                    {text}
                </h1>
            </Flex>
        </Flex>
    );
});
