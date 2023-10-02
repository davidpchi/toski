import type { ComponentStyleConfig } from "@chakra-ui/theme";

export const Heading: ComponentStyleConfig = {
    baseStyle: {
        color: "bodyFont",
        padding: "6",
        textTransform: "uppercase",
    },
    defaultProps: {
        size: ["lg", "xl", "2xl"],
    },
};
