const url = "https://leeb8depa6.execute-api.us-east-2.amazonaws.com/";
//const url = "http://localhost:8000/";

export default {
  ssr: false,
  target: "static",
  head: {
    titleTemplate: "%s - Nahda",
    title: "Nahda - Attendance Management",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  css: ["~assets/main/style.css"],
  plugins: ["@/plugins/i18n.js"],
  router: {
    middleware: ["theme", "i18n"],
  },
  components: true,
  buildModules: ["@nuxtjs/vuetify", "@nuxtjs/moment"],
  modules: ["@nuxtjs/axios", "@nuxtjs/pwa", "@nuxtjs/auth-next"],
  axios: {
    baseURL: url,
  },
  moment: {
    defaultTimezone: "Africa/Cairo",
    locales: ["ar"],
  },
  auth: {
    redirect: {
      login: "/auth/login",
      logout: "/",
      callback: "/auth/login",
      home: "/",
    },
    strategies: {
      laravelJWT: {
        provider: "laravel/jwt",
        url: url,
        token: {
          property: "token",
          global: true,
        },
        endpoints: {
          login: {
            url: "api/auth/login",
            method: "post",
            propertyName: "token",
          },
          logout: {
            url: "api/auth/logout",
            method: "post",
          },
          user: {
            url: "api/auth/me",
            method: "post",
            propertyName: "user",
          },
        },
      },
    },
  },
  vuetify: {
    optionsPath: "./vuetify.options.js",
  },
  build: {},
};
