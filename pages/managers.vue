<template>
  <div>
    <v-breadcrumbs :items="items" divider="-"></v-breadcrumbs>
    <v-card class="bgCard" flat tile>
      <v-card-text>
        <div class="d-flex">
          <v-text-field
            v-model="query"
            :label="$t('search')"
            class="mb-2"
            dense
            hide-details
            outlined
          ></v-text-field>
          <div class="mx-1"></div>
          <v-btn outlined @click="$fetch()">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </div>
        <template v-if="isLoading || isLoadingCodes">
          <CoreLoading />
        </template>
        <template v-else>
          <v-list class="py-0 bgCard">
            <v-list-item
              class="bgListItem mb-2"
              v-for="employee in employees"
              :key="employee.Emp_ID"
            >
              <v-list-item-content>
                <v-list-item-title>
                  <nuxt-link :to="`/employees/${employee.Emp_ID}`">{{
                    employee.Badge_NO
                  }}</nuxt-link></v-list-item-title
                >
                <v-list-item-subtitle
                  >{{ employee.Emp_AFName }}
                  {{ employee.Emp_ALName }}</v-list-item-subtitle
                >
                <div class="mt-2">
                  <template v-if="employee.today_attendees">
                    <v-btn
                      v-if="employee.today_attendees.checkout"
                      disabled
                      tile
                      block
                      small
                    >
                      {{ $t("checkout") }}
                      {{
                        $moment(employee.today_attendees.checkout).format(
                          "LL hh:mm a"
                        )
                      }}
                    </v-btn>
                    <template v-else>
                      <div class="">
                        <v-btn disabled block tile small>
                          {{ $t("checkin") }}
                          {{
                            $moment(employee.today_attendees.checkin).format(
                              "LL hh:mm a"
                            )
                          }}
                        </v-btn>
                        <v-btn
                          block
                          @click="checkOut(employee)"
                          class="primary mt-2"
                          text
                          small
                          outlined
                          tile
                          >{{ $t("checkout") }}</v-btn
                        >
                      </div>
                    </template>
                  </template>
                  <template v-else>
                    <v-select
                      v-model="employee.attendanceCode"
                      outlined
                      dense
                      hide-details
                      class="mb-2 mt-2"
                      :label="$t('attendance_code')"
                      :items="attendanceCodes"
                      item-text="AttendanceCode_Name"
                      item-value="AttendanceCode_ID"
                    ></v-select>
                    <v-btn
                      @click="checkIn(employee)"
                      block
                      class="primary"
                      text
                      outlined
                      tile
                      >{{ $t("checkin") }}</v-btn
                    >
                  </template>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </template>
      </v-card-text>
    </v-card>
    <v-overlay :value="isSubmit">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
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
      isLoadingCodes: true,
      page: 1,
      query: "",
      isManager: false,
      employees: [],
      attendanceCodes: [],
      isSubmit: false,
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
  async mounted() {
    if (this.$auth.user.Team_ID) {
      this.$router.push("/");
    }
    this.isLoadingCodes = true;
    await this.attendanceCodeListAction().then((response) => {
      this.attendanceCodes = response;
      this.isLoadingCodes = false;
    });
  },
  async fetch() {
    this.getEmployees();
  },
  methods: {
    ...mapActions({
      index: "employees/getZoneManager",
      attendanceCodeListAction: "attendanceCodeList",
      checkInAction: "attendees/checkIn",
      checkOutAction: "attendees/checkOut",
    }),
    async getEmployees() {
      this.isLoading = true;
      this.employees = [];
      await this.index({
        zone: this.$auth.user.Zone_ID,
      }).then((response) => {
        this.employees = response;
        this.employees = this.employees.map((item) => {
          item.attendanceCode = 1;
          return item;
        });
        this.isLoading = false;
      });
    },
    searchEmployee() {
      if (this.query.length > 2) {
        this.page = 1;
        this.getEmployees();
      }
    },
    async checkIn(employee) {
      this.isSubmit = true;
      await this.checkInAction({
        attendance_code: employee.attendanceCode,
        id: employee.Emp_ID,
        zone_id: employee.Zone_ID,
      }).then((response) => {
        employee.today_attendees = response;
        this.isSubmit = false;
      });
    },
    checkOut(employee) {
      this.isSubmit = true;
      this.checkOutAction(employee.today_attendees.id).then((response) => {
        this.isSubmit = false;
        employee.today_attendees = response;
      });
    },
  },
  components: { CoreLoading },
};
</script>
