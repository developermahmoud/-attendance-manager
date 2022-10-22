<template>
  <div>
    <v-breadcrumbs :items="items" divider="-"></v-breadcrumbs>
    <v-card class="bgCard" flat tile>
      <v-card-text>
        <v-text-field
          v-model="query"
          :label="$t('search')"
          class="mb-2"
          dense
          hide-details
          outlined
          @keyup="$fetch()"
        ></v-text-field>
        <v-select
          v-model="sort"
          :items="$t('employee_sort_list')"
          :label="$t('sort')"
          class="mb-2"
          dense
          hide-details
          item-text="text"
          item-value="id"
          outlined
          @change="$fetch()"
        ></v-select>
        <template v-if="isLoading">
          <CoreLoading />
        </template>
        <template v-else>
          <v-simple-table class="bgListItem">
            <template v-slot:default>
              <thead>
                <tr>
                  <th>Badge_NO</th>
                  <th>{{ $t("fullname") }}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="employee in employees.data" :key="employee.Emp_ID">
                  <td>
                    <nuxt-link :to="`/employees/${employee.Emp_ID}`">
                      {{ employee.Badge_NO }}
                    </nuxt-link>
                  </td>
                  <td>{{ employee.Emp_AFName }} {{ employee.Emp_ALName }}</td>
                  <td>
                    <template v-if="employee.today_attendees">
                      <v-chip
                        v-if="employee.today_attendees.checkout"
                        class="success"
                        disabled
                        label
                        small
                      >
                        {{ $t("checkout") }}
                        {{
                          $moment(employee.today_attendees.checkout).format(
                            "LL hh:mm a"
                          )
                        }}
                      </v-chip>
                      <v-chip v-else class="warning" disabled label small>
                        {{ $t("checkin") }}
                        {{
                          $moment(employee.today_attendees.checkin).format(
                            "LL hh:mm a"
                          )
                        }}
                      </v-chip>
                    </template>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <div class="text-center">
            <v-pagination
              v-model="page"
              :length="employees.last_page"
            ></v-pagination>
          </div>
        </template>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import CoreLoading from "../components/core/CoreLoading.vue";

export default {
  watch: {
    page() {
      this.$fetch();
    },
  },
  data() {
    return {
      isLoading: true,
      page: 1,
      query: "",
      sort: "",
      employees: [],
      items: [
        {
          text: this.$t("home"),
          disabled: false,
          to: "/",
        },
        {
          text: this.$t("employees"),
          disabled: true,
        },
        {
          text: this.$auth.user.zone.Zone_AName,
          disabled: true,
        },
      ],
    };
  },
  async fetch() {
    this.getEmployees();
  },
  methods: {
    ...mapActions({
      index: "employees/index",
    }),
    async getEmployees() {
      this.isLoading = true;
      this.employees = [];
      await this.index({
        page: this.page,
        query: this.query,
        sort: this.sort,
        zone: this.$auth.user.Zone_ID,
      }).then((response) => {
        this.employees = response;
        this.isLoading = false;
      });
    },
    searchEmployee() {
      if (this.query.length > 2) {
        this.page = 1;
        this.getEmployees();
      }
    },
  },
  components: { CoreLoading },
};
</script>
