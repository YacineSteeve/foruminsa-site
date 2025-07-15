import type { Config } from 'tailwindcss';

export default {
    content: ['./src/**/*.{ts,tsx,mdx}'],
    important: '#app',
    theme: {
        boxShadow: {
            md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 -2px 4px -2px rgb(0 0 0 / 0.1)',
        },
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1f3d6a',
                    light: '#2a6ea9',
                },
                secondary: {
                    DEFAULT: '#ff6118',
                    light: '#ff9361',
                },
                tertiary: {
                    DEFAULT: '#267205',
                    light: '#9bcd5f',
                },
                neutral: {
                    DEFAULT: '#dce2ec',
                    light: '#ffffff',
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
