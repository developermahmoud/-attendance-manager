<template>
  <div>
    <v-breadcrumbs :items="items" divider="-"></v-breadcrumbs>
    <v-card class="bgCard mb-5" tile flat>
      <v-card-title
        >{{ $t("details") }}
        <v-spacer></v-spacer>
        <v-btn small tile text @click="reportDialog = true" class="primary">{{
          $t("add_report")
        }}</v-btn>
      </v-card-title>
      <v-card-text>
        <template v-if="isLoading">
          <div class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
        </template>
        <v-simple-table v-else class="transparent">
          <template v-slot:default>
            <tbody>
              <tr>
                <td>Emp ID</td>
                <td>{{ employee.Emp_ID }}</td>
              </tr>
              <tr>
                <td>{{ $t("fullname") }}</td>
                <td>{{ employee.Emp_AFName }} {{ employee.Emp_ALName }}</td>
              </tr>
              <tr>
                <td>{{ $t("zone") }}</td>
                <td>
                  {{ employee.zone ? employee.zone.Zone_AName : "" }}
                </td>
              </tr>
              <tr>
                <td>Badge_Code</td>
                <td>{{ employee.Badge_Code }}</td>
              </tr>
              <tr>
                <td>BadgeNO</td>
                <td>{{ employee.BadgeNO }}</td>
              </tr>
              <tr>
                <td>Badge_NO</td>
                <td>{{ employee.Badge_NO }}</td>
              </tr>
              <tr
                v-if="
                  employee.today_attendees && employee.today_attendees.checkin
                "
              >
                <td>{{ $t("checkin") }}</td>
                <td>
                  {{
                    $moment(employee.today_attendees.checkin).format(
                      "LL hh:mm a"
                    )
                  }}
                </td>
              </tr>
              <tr
                v-if="
                  employee.today_attendees && employee.today_attendees.checkout
                "
              >
                <td>{{ $t("checkout") }}</td>
                <td>
                  {{
                    $moment(employee.today_attendees.checkout).format(
                      "LL hh:mm a"
                    )
                  }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
    <v-dialog v-model="reportDialog" max-width="700" persistent>
      <v-card class="bgCard" :loading="isSendReport" :disabled="isSendReport">
        <v-card-title>
          <v-btn icon @click="reportDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          {{ $t("send_report") }}
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          <v-textarea
            v-model="body"
            outlined
            auto-grow
            hide-details
            :label="$t('report')"
          ></v-textarea>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            @click="send"
            :loading="isSendReport"
            :disabled="isSendReport"
            block
            tile
            class="primary"
            text
            >{{ $t("send") }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" color="success">
      {{ $t("sent") }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import CoreLoading from "../../components/core/CoreLoading.vue";
export default {
  data() {
    return {
      isLoading: true,
      isSubmit: false,
      snackbar: false,
      reportDialog: false,
      employee: null,
      body: "",
      isSendReport: false,
      attendanceCode: "",
      attendanceCodes: [],
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
      ],
    };
  },
  async fetch() {
    this.isLoading = true;
    await this.getByIdAction(this.$route.params.id).then((response) => {
      this.isLoading = false;
      this.employee = response;
    });
  },
  methods: {
    ...mapActions({
      getByIdAction: "employees/getById",
      sendReportAction: "employees/sendReport",
    }),
    async send() {
      if (this.body) {
        this.isSendReport = true;
        await this.sendReportAction({
          id: this.employee.Emp_ID,
          body: this.body,
        }).then((response) => {
          this.body = "";
          this.snackbar = true;
          this.reportDialog = false;
          this.isSendReport = false;
        });
      }
    },
  },
  components: {
    CoreLoading,
  },
};
</script>

<style></style>
