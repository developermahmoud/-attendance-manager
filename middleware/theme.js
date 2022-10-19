export default function ({ $vuetify }) {
  if (localStorage.getItem("dark")) {
    if (localStorage.getItem("dark") === "true") {
      $vuetify.theme.dark = true;
    } else {
      $vuetify.theme.dark = false;
    }
  } else {
    $vuetify.theme.dark = false;
  }
}
