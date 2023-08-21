import theme, { ComponentStyleConfig } from '@chakra-ui/theme';
import { mode } from '@chakra-ui/theme-tools';
import { transparentize } from '../../utils';

export const Table: ComponentStyleConfig = {
    baseStyle: (props) => {
        const { colorScheme: c } = props;
        const darkHoverBg = transparentize(`${c}.200`, 0.12)(theme);
        return {
            tr: {
                _hover: {
                    bg: mode(`${c}.50`, darkHoverBg)(props),
                },
            },
        };
    },
    defaultProps: {
        variant: 'simple',
        colorScheme: 'primary',
        size: ['sm', 'md', 'lg'],
    },
};
