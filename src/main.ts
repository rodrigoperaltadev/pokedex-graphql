// src/main.ts
import { createApp, provide, h } from "vue";
import App from "./App.vue";
import router from "./router";
import { DefaultApolloClient } from "@vue/apollo-composable";
import "./styles/tailwind.css";
import apolloClient from "./graphql/apolloClient";

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(router);
app.mount("#app");
