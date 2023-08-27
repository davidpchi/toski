import type { ComponentStyleConfig } from '@chakra-ui/theme';

export const Button: ComponentStyleConfig = {
    defaultProps: {
        variant: 'solid',
        size: ['sm', 'md', 'lg'],
        colorScheme: 'primary',
    },
};
