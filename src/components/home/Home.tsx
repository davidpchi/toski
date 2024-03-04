import { Flex } from "@chakra-ui/react";

import { HomeNewsSection } from "./HomeNewsSection";
import { FF_IS_NEWS_ENABLED } from "../../services/featureFlagService";

const backgroundVideo =
    "https://cdn.discordapp.xyz/attachments/983610720316977193/1144864732914925620/Editor115_VP9.webm";

const generalLogo = "https://cdn.discordapp.xyz/attachments/980133030050021396/1145161251945709670/toski_logo_v1.png";
//'https://media.discordapp.net/attachments/980133030050021396/1145161252298035250/toski_logo_v1_alt.png';

export default function Home() {
    return (
        <Flex
            style={{
                minHeight: "90vh",
                margin: -16,
                position: "relative"
            }}
            flexDirection="column"
        >
            <Flex flex="1" minHeight="50vh" alignSelf="stretch">
                <div
                    style={{
                        position: "relative",
                        width: "100%"
                    }}
                >
                    <video
                        autoPlay={true}
                        loop={true}
                        muted={true}
                        playsInline={true}
                        preload="none"
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "8px"
                        }}
                    >
                        <source type="video/webm" src={backgroundVideo} />
                    </video>
                    <div
                        style={{
                            position: "absolute",
                            height: "100%",
                            width: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "8px"
                        }}
                    >
                        <img src={generalLogo} style={{ height: "40%", objectFit: "scale-down" }} alt="MNC Logo" />
                    </div>
                </div>
            </Flex>
            {FF_IS_NEWS_ENABLED ? <HomeNewsSection /> : null}
        </Flex>
    );
}
