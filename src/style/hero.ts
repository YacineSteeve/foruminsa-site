import { heroui } from '@heroui/react';

export default heroui({
    defaultTheme: 'light',
    themes: {
        light: {
            colors: {
                primary: {
                    foreground: '#ffffff',
                    DEFAULT: '#bd2727',
                },
                secondary: '#292929',
            },
        },
    },
});
