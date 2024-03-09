import { Flex } from "@chakra-ui/react";

import logo from "../../assets/logo.png";
import bg_image from "../../assets/bg_image.png";

import { HomeNewsSection } from "./HomeNewsSection";
import { FF_IS_NEWS_ENABLED } from "../../services/featureFlagService";

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
                    {/* <video
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
                    </video> */}
                    <div
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "8px",
                            overflow: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            background: "black"
                        }}
                    >
                        <img src={bg_image} alt="MNC Logo" />
                    </div>
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
                        <img src={logo} style={{ height: "40%", objectFit: "scale-down" }} alt="MNC Logo" />
                    </div>
                </div>
            </Flex>
            {FF_IS_NEWS_ENABLED ? <HomeNewsSection /> : null}
        </Flex>
    );
}
