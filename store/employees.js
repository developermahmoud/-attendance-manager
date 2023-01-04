export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async index({ _ }, obj) {
    return this.$axios.$get(
      `/api/employees/get-by-zone-id?zone=${obj.zone}&page=${obj.page}&query=${obj.query}&sort=${obj.sort}&team=${obj.team_id}`
    );
  },
  async getZoneManager({ _ }, obj) {
    return this.$axios.$get(
      `/api/employees/get-managers-by-zone-id?zone=${obj.zone}`
    );
  },
  async getById({ _ }, id) {
    return this.$axios.$get(`/api/employees/${id}`);
  },
  async checkIn({ _ }, obj) {
    return this.$axios.$post(`/api/employees/${obj.id}/check-in`, {
      attendance_code: obj.attendance_code,
      zone_id: obj.zone_id,
    });
  },
  async checkOut({ _ }, id) {
    return this.$axios.$put(`/api/employees/${id}/check-out`);
  },
  async sendReport({ _ }, obj) {
    return this.$axios.$post(`/api/employees/${obj.id}/report`, {
      body: obj.body,
    });
  },
};
