import axios from "axios";
import store from "@/store";

const instance = axios.create({
  baseURL: store.state.serverDomain,
  responseType: "json",
  timeout: 20000,
});

export default instance;
