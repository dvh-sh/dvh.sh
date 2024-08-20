module.exports = {
    plugins: [
        'tailwindcss',
        'autoprefixer',
        process.env.NODE_ENV === 'production' ? [
            '@fullhuman/postcss-purgecss', {
                content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
                safelist: ['html', 'body'], // Keep these in
                defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || [],
            }
        ] : undefined,
    ].filter(Boolean),
};
