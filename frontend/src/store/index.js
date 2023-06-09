import { createStore } from "vuex";
import { useToast } from "vue-toastification";

const toast = useToast();

export default createStore({
  state() {
    return {
      toast,
      userId: null,
      serverDomain: "http://127.0.0.1:8000/api/",
    };
  },
  getters: {},
  mutations: {},
  actions: {},
});
