import { Button, Tooltip, Image } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";

export const LinkedAccountIcon = React.memo(function LinkedAccountIcon({
    onHoverTooltip,
    onClick,
    restImageUri,
    hoveredImageUri
}: {
    onClick: () => void;
    restImageUri: string;
    hoveredImageUri: string;
    onHoverTooltip: string;
}) {
    const [isMoxfieldButtonHovered, setIsMoxfieldButtonHovered] = useState<boolean>();

    const moxfieldButtonOnHoverStart = useCallback(() => {
        setIsMoxfieldButtonHovered(true);
    }, [setIsMoxfieldButtonHovered]);

    const moxfieldButtonOnHoverEnd = useCallback(() => {
        setIsMoxfieldButtonHovered(false);
    }, [setIsMoxfieldButtonHovered]);

    const archidektImage = isMoxfieldButtonHovered ? hoveredImageUri : restImageUri;

    return (
        <Tooltip label={onHoverTooltip}>
            <Button
                style={{ padding: 0 }}
                onClick={onClick}
                variant={"ghost"}
                width={"32px"}
                height={"32px"}
                borderRadius={"16px"}
                onMouseEnter={moxfieldButtonOnHoverStart}
                onMouseLeave={moxfieldButtonOnHoverEnd}
            >
                <Image borderRadius={"16px"} width={"32px"} height={"32px"} src={archidektImage} />
            </Button>
        </Tooltip>
    );
});
