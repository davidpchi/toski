import { Flex } from "@chakra-ui/react";
const backgroundVideo = 'https://cdn.discordapp.com/attachments/983610720316977193/1144864732914925620/Editor115_VP9.webm';

const generalLogo =
    'https://media.discordapp.net/attachments/980133030050021396/1144855095486447686/toski_logo_1.png';

export default function Home() {
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
        </Flex>
    )
}