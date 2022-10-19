export default function ({ isHMR, app, $moment, store, $vuetify }) {
    if (isHMR) {
      return;
    }
    if (localStorage.key("lang")) {
      app.i18n.locale = localStorage.getItem("lang");
      store.commit("SET_LANG", localStorage.getItem("lang"));
      if (store.state.locale === "ar") {
        $moment.locale("ar");
        $vuetify.rtl = true;
      } else {
        $moment.locale("en");
        $vuetify.rtl = false;
      }
    } else {
      app.i18n.locale = store.state.locale;
      if (store.state.locale === "ar") {
        $moment.locale("ar");
        $vuetify.rtl = true;
      } else {
        $moment.locale("en");
        $vuetify.rtl = false;
      }
    }
  }
  