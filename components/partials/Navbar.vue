<template>
  <div>
    <v-app-bar
      :clipped-right="$vuetify.rtl"
      :clipped-left="!$vuetify.rtl"
      class="bgSecondary"
      elevation="0"
      app
    >
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" small text v-bind="attrs" v-on="on">
            {{ $t("welcome") }} {{ $auth.user.name
            }}<v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list dense class="py-0" tile>
          <v-list-item class="bgCard">
            <v-list-item-icon>
              <v-icon>mdi-translate</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t("switch_language") }}</v-list-item-title>
              <v-list-item-subtitle>{{
                $t("you_can_change_language")
              }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                v-if="$store.state.locale == 'ar'"
                text
                @click="changeLanguage()"
                >English</v-btn
              >
              <v-btn v-else text @click="changeLanguage()">عربى</v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list-item class="bgCard">
            <v-list-item-icon>
              <v-icon>mdi-theme-light-dark</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t("dark_theme") }}</v-list-item-title>
              <v-list-item-subtitle>{{
                $t("you_can_change_theme")
              }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-switch
                v-model="$vuetify.theme.dark"
                color="primary"
                hide-details
                inset
                @change="changeTheme"
              ></v-switch>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="logout" class="bgCard">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t("logout") }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    changeTheme() {
      localStorage.setItem("dark", this.$vuetify.theme.dark);
    },
    changeLanguage() {
      if (this.$store.state.locale == "en") {
        localStorage.setItem("lang", "ar");
      } else {
        localStorage.setItem("lang", "en");
      }
      window.location = `/`;
    },
    async logout() {
      await this.$auth.logout();
      this.$router.push("/auth/login");
    },
  },
};
</script>

<style></style>
