import { Button, Flex } from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
import { NewsCards } from "../news/NewsCards";
import { useNavigate } from "react-router-dom";
const backgroundVideo = 'https://cdn.discordapp.com/attachments/983610720316977193/1144864732914925620/Editor115_VP9.webm';

const generalLogo =
    'https://cdn.discordapp.com/attachments/980133030050021396/1145161251945709670/toski_logo_v1.png';
//'https://media.discordapp.net/attachments/980133030050021396/1145161252298035250/toski_logo_v1_alt.png';

export default function Home() {
    const navigate = useNavigate();

    const navigateToNews = () => {
        navigate('/news');
    };


    return (
        <Flex
            style={{
                minHeight: '90vh',
                backgroundColor: '#282c34',
                margin: -16,
                position: 'relative',
            }}
            flexDirection='column'
        >
            <Flex flex='1' minHeight='50vh' alignSelf='stretch'>
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                    }}
                >
                    <video
                        autoPlay={true}
                        loop={true}
                        muted={true}
                        playsInline={true}
                        preload='none'
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    >
                        <source type='video/webm' src={backgroundVideo} />
                    </video>
                    <div
                        style={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            src={generalLogo}
                            style={{ height: '40%', objectFit: "scale-down" }}
                            alt='MNC Logo'
                        />
                    </div>
                </div>
            </Flex>
            <Flex
                backgroundColor='white'
                flexDirection='column'
                alignItems='center'
                paddingTop='4'
                paddingBottom='4'
            >
                <Flex maxWidth='1024px' flexDirection='column' wrap='wrap'>
                    <Button
                        variant='ghost'
                        flex={1}
                        padding={1}
                        size='md'
                        alignSelf={'flex-end'}
                        marginBottom='4'
                        marginRight='1'
                        flexDirection='row'
                        onClick={navigateToNews}
                    >
                        <Flex alignItems='center'>
                            <h1>All News</h1>
                            <FiArrowRight />
                        </Flex>
                    </Button>
                    <Flex wrap='wrap' flexDirection='row'>
                        <NewsCards />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}