import type { Config } from 'tailwindcss';

export default {
    content: ['./src/**/*.{ts,tsx,mdx}'],
    important: '#app',
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#bd2727',
                    light: '#d32f2f',
                },
                neutral: {
                    DEFAULT: '#292929',
                    light: '#424242',
                },
                error: {
                    light: '#e57373',
                    DEFAULT: '#f44336',
                    dark: '#d32f2f',
                },
                success: {
                    light: '#81c784',
                    DEFAULT: '#66bb6a',
                    dark: '#388e3c',
                },
                warning: {
                    light: '#ffb74d',
                    DEFAULT: '#ffa726',
                    dark: '#f57c00',
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
