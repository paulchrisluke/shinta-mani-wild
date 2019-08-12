const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    screens: {
      // => @media (min-width: ...px) { ... }
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      yellow: colors.yellow,
      // teal: colors.teal,
      // pink: colors.pink,
      // purple: colors.purple,
      // green: colors.green,
      // orange: colors.orange,
      // indigo: colors.indigo,
      blue: colors.blue,
      green: {
        default: '#525200'
      }
    }
  }
}
