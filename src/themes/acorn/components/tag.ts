import type { ComponentStyleConfig } from "@chakra-ui/theme";

export const Tag: ComponentStyleConfig = {
    variants: {
        subtle: {
            container: {
                bg: "secondary.500",
                color: "white",
            },
        },
    },
    sizes: {
        xl: {
            container: {
                minH: 24,
                maxH: 24,
                fontSize: 60,
                px: 4,
            },
        },
    },
    defaultProps: {
        variant: "bold",
        size: ["md", "lg", "xl"],
    },
};
