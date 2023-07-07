import { createApp } from "vue";
import "./style.css";
import "./assets/styles/index.scss";
import App from "./App.vue";
import "./samples/node-api";
import router from "./router/index";
import "@unocss/reset/tailwind.css";
import "uno.css";

createApp(App)
  .use(router)
  .mount("#app")

  .$nextTick(() => {
    postMessage({ payload: "removeLoading" }, "*");
  });
