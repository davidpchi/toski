import { Box, Button, Flex } from '@chakra-ui/react';
import React from 'react';

export const NewsCard = React.memo(function NewsCard({
    onClick,
    title,
    date,
    content,
}: {
    title: string;
    date: string;
    content: string;
    onClick: () => void;
}) {
    return (
        <Box
            style={{
                borderWidth: 1,
                borderRadius: 16,
                borderColor: 'rgb(0,0,0,0.1)',
                marginRight: 8,
                marginLeft: 8,
                padding: 16,
                width: '100%',
                minWidth: 350,
                cursor: 'pointer',
            }}
            onClick={onClick}
        >
            <Flex
                flexDirection='column'
                alignItems={'flex-start'}
                height='100%'
            >
                <h1 style={{ fontSize: 12 }}>{date}</h1>
                <h1 style={{ fontSize: 30 }}>{title}</h1>
                <div
                    style={{
                        marginTop: 16,
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                    }}
                >
                    <div style={{ flexGrow: 1 }}>
                        <p>{content}</p>
                    </div>
                    <Button
                        variant='ghost'
                        flex={1}
                        padding={1}
                        size='md'
                        alignSelf={'flex-end'}
                    >
                        Read More
                    </Button>
                </div>
            </Flex>
        </Box>
    );
});
