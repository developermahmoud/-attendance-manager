<template>
  <v-app :dark="$vuetify.theme.dark">
    <Navbar />
    <v-main class="bgPrimary">
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
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
