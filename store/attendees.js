export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async checkIn({ _ }, obj) {
    return this.$axios.$post(`/api/attendees/${obj.id}/check-in`, {
      attendance_code: obj.attendance_code,
      zone_id: obj.zone_id,
    });
  },
  async checkOut({ _ }, id) {
    return this.$axios.$put(`/api/attendees/${id}/check-out`);
  },
};
