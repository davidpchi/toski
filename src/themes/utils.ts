import { Dict, get } from "@chakra-ui/utils";
import { TinyColor } from "@ctrl/tinycolor";

export const getColor = (theme: Dict, color: string, fallback?: string) => {
    const hex = get(theme, `colors.${color}`, color);
    const { isValid } = new TinyColor(hex);
    return isValid ? hex : fallback;
};

export const transparentize = (color: string, opacity: number) => (theme: Dict) => {
    const raw = getColor(theme, color);
    return new TinyColor(raw).setAlpha(opacity).toRgbString();
};
