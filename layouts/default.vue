<template>
  <v-app :dark="$vuetify.theme.dark">
    <Navbar />
    <v-main class="bgPrimary">
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-bottom-navigation fixed app class="bgSecondary">
      <v-btn link to="/">
        <span>{{ $t("employees") }}</span>

        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn link to="/checkin">
        <span>{{ $t("checkin") }}</span>

        <v-icon>mdi-account-check-outline</v-icon>
      </v-btn>

      <v-btn link to="/checkout">
        <span>{{ $t("checkout") }}</span>
        <v-icon>mdi-check-all</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import Navbar from "../components/partials/Navbar.vue";
export default {
  middleware: ["auth"],
  data() {
    return {};
  },
  components: { Navbar },
};
</script>
