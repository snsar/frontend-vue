import { createStore } from "vuex";
import { useToast } from "vue-toastification";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const toast = useToast();

export default createStore({
  state() {
    return {
      toast,
      cookies,
      serverDomain: "http://127.0.0.1:8000/",
    };
  },
  getters: {},
  mutations: {},
  actions: {},
});
