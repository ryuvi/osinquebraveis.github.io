import typography from '@tailwindcss/typography';

// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // garanta que MDX está incluído
  ],
  theme: {
    extend: {},
  },
  plugins: [typography],
};
