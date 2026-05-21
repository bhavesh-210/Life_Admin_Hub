/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                accent: '#292524',
                'accent-light': '#f1eee8',
                'text-muted': '#78716c',
                'text-dark': '#202124',
                'border-light': '#e7e2da',
                'border-subtle': '#d6d3ce',
                'bg-light': '#fbfaf8',
                'bg-page': '#f7f5f0',
            },
            borderRadius: {
                card: '22px',
                btn: '12px',
                input: '14px',
                badge: '999px',
            },
            spacing: {
                4.5: '1.125rem',
                5.5: '1.375rem',
                6.5: '1.625rem',
            },
            fontSize: {
                '4xl': ['34px', { lineHeight: '1' }],
                '5xl': ['42px', { lineHeight: '1' }],
                '6xl': ['64px', { lineHeight: '1.03' }],
            },
        },
    },
    plugins: [],
};
