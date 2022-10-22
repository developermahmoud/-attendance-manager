<template>
  <div class="fill-height">
    <div class="mt-16">
      <v-img src="/logo.png" width="200" class="mx-auto" />
    </div>
    <v-card flat tile max-width="500" class="mx-auto mt-5 bgCard">
      <v-card-title class="justify-center">{{
        $t("login_title")
      }}</v-card-title>
      <v-card-text>
        <template v-if="login.longitude && login.latitude">
          <v-alert type="error" text v-if="showError">{{
            $t("invalid_credential")
          }}</v-alert>
          <form @submit.prevent="userLogin">
            <v-text-field
              :label="$t('username')"
              outlined
              v-model="login.username"
            ></v-text-field>
            <v-text-field
              type="password"
              :label="$t('password')"
              outlined
              v-model="login.password"
            ></v-text-field>
            <v-btn
              :loading="isLoading"
              :disabled="isLoading"
              type="submit"
              block
              class="primary"
              text
              >{{ $t("login") }}</v-btn
            >
          </form>
        </template>
        <template v-else>
          <v-btn block outlined color="success" @click="getLocation"
            >Please Open your location</v-btn
          >
        </template>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: "blank",
  mounted() {
    this.getLocation();
  },
  data() {
    return {
      showError: false,
      isLoading: false,
      login: {
        username: "",
        password: "",
        latitude: null,
        longitude: null,
        is_manager: true,
      },
    };
  },
  methods: {
    getLocation() {
      if (!navigator.geolocation) {
        alert("Geolocation API not supported by this browser.");
      } else {
        navigator.geolocation.getCurrentPosition(this.success, this.error);
      }
    },
    success(position) {
      this.login.latitude = position.coords.latitude;
      this.login.longitude = position.coords.longitude;
    },
    error() {
      alert("Please open you loaction");
    },
    async userLogin() {
      this.isLoading = true;
      this.showError = false;
      try {
        let response = await this.$auth.loginWith("laravelJWT", {
          data: this.login,
        });
        this.isLoading = false;
        this.showError = false;
        this.$router.push("/");
      } catch (err) {
        this.isLoading = false;
        this.showError = true;
      }
    },
  },
};
</script>
