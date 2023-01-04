export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async getById({ _ }, id) {
    return await this.$axios.$get(`/api/teams/${id}`);
  },
};
