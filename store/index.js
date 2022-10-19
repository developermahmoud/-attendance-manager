export const state = () => ({
  locales: ["en", "ar"],
  locale: "ar",
});

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale;
    }
  },
};

export const actions = {
  async attendanceCodeList() {
    return this.$axios.$get(`/api/attendance-code`);
  },
  async statistics() {
    return this.$axios.$get(`/api/statistics`);
  },
};
