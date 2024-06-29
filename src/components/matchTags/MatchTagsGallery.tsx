import React from "react";
import { Flex, Tag, TagLabel, TagRightIcon } from "@chakra-ui/react";

import { primaryColor } from "../../themes/acorn";
import { MatchTag, getMatchTags } from "../../logic/matchTags";
import { FiLoader } from "react-icons/fi";
import { Match } from "../../types/domain/Match";

export const MatchTagsGallery = React.memo(function MatchTagsGallery({ match }: { match: Match }) {
    const matchTags = getMatchTags(match);

    const isMultiKo = matchTags.indexOf(MatchTag.MultiKo) > -1;

    return (
        <Flex alignItems={"center"} justifyContent={"center"} flexDirection={"column"} padding={"16px"}>
            <div style={{ flex: 0 }}>
                {isMultiKo ? (
                    <Tag size={"md"} variant="subtle" bgColor={primaryColor["400"]}>
                        <TagLabel>Multi-Ko</TagLabel>
                        <TagRightIcon as={FiLoader} />
                    </Tag>
                ) : null}
            </div>
        </Flex>
    );
});
