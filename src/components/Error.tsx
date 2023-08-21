import { Flex } from '@chakra-ui/layout';
import React from 'react';

export const Error = React.memo(function Error({ error }: { error: string }) {
    return (
        <Flex
            minHeight='100vh'
            backgroundColor='white'
            justify='center'
            align='center'
        >
            <div
                style={{
                    position: 'absolute',
                    right: 0,
                    left: 0,
                    bottom: 0,
                    top: 0,
                }}
            >
                <Flex
                    width='100%'
                    height='100%'
                    justify='center'
                    align='center'
                    flexDirection='column'
                >
                    <img
                        alt='fblthp gif'
                        style={{
                            width: '50%',
                            height: '50%',
                            objectFit: 'contain',
                        }}
                        src='https://media0.giphy.com/media/Iegqa1rqiOiAmG3zH1/source.gif'
                    />
                    <h1
                        style={{
                            color: 'black',
                            fontSize: 48,
                            marginRight: 64,
                            marginLeft: 64,
                        }}
                    >
                        {error}
                    </h1>
                </Flex>
            </div>
        </Flex>
    );
});
