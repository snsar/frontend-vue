import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

// icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./assets/icons";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

createApp(App)
  .use(store)
  .use(router)
  .use(Toast)
  .use(VueSweetalert2)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
