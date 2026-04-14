/** @type {import('tailwindcss').Config} */
const jiti = require('jiti')(__filename)
const { sp } = jiti('./constants/Colors')

module.exports = {
  content: [
    './global.css',
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inika: ['Inika-Regular'],
        'inika-bold': ['Inika-Bold'],
        inter: ['Inter-Regular'],
        'inter-thin': ['Inter-Thin'],
        'inter-medium': ['Inter-Medium'],
        'inter-bold': ['Inter-Bold'],
        league: ['LeagueSpartan-Regular'],
        'league-thin': ['LeagueSpartan-Thin'],
        'league-medium': ['LeagueSpartan-Medium'],
        'league-bold': ['LeagueSpartan-Bold'],
        poppins: ['Poppins-Regular'],
        'poppins-thin': ['Poppins-Thin'],
        'poppins-medium': ['Poppins-Medium'],
        'poppins-bold': ['Poppins-Bold'],
        quattrocento: ['QuattrocentoSans-Regular'],
        'quattrocento-bold': ['QuattrocentoSans-Bold'],
        'quattrocento-italic': ['QuattrocentoSans-Italic'],
        'quattrocento-bold-italic': ['QuattrocentoSans-BoldItalic'],
      },
      colors: {
        sp,
      },
    },
  },
  presets: [require('nativewind/preset')],
  plugins: [],
}
