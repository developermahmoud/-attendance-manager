const en = require("vuetify/es5/locale/en").default;
const ar = require("vuetify/es5/locale/ar").default;
export default {
  rtl: true,
  breakpoint: {},
  icons: {
    iconfont: "faSvg",
  },
  lang: {
    locales: { ar, en },
    current: "ar",
  },
  theme: {
    options: {
      customProperties: true,
    },
    dark: true,
    themes: {
      light: {
        primary: "#00cbdf",
        secondary: "#ffffff",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        background: "#f2f5f8",
        bgCard: "#F5F5F5",
        bgListItem: "#FAFAFA",
      },
      dark: {
        primary: "#00cbdf",
        secondary: "#a16bb3",
        accent: "#e8b118",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        bgPrimary: "#1f2033",
        bgSecondary: "#141122",
        bgCard: "#24253d",
        bgListItem: "#272943",
      },
    },
  },
};
