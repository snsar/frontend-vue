<template>
  <div class="container-fluid p-0">
    <Header :user="user" />
    <h1>Admin View</h1>
    <div class="admin-buttons">
      <button
        class="btn btn-primary custom-button"
        @click="redirectToStatistics"
      >
        Xem thống kê
      </button>
      <button class="btn btn-primary custom-button" @click="redirectToTours">
        Hiển thị các tour
      </button>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "../components/Header.vue";
import { getUserAPI } from "@/services/modules/AuthenModules";

export default {
  name: "AdminView",
  components: {
    Header: HeaderComponent,
  },
  data() {
    return {
      user: {},
    };
  },
  async created() {
    // Lấy thông tin người dùng
    // Code để lấy thông tin người dùng ở đây
    const getUserResponse = await getUserAPI(
      this.$store.state.cookies.get("access_token")
    );
    this.user = getUserResponse.data.user;
  },
  methods: {
    redirectToStatistics() {
      this.$router.push("/user/stat");
    },
    redirectToTours() {
      this.$router.push("/user/tours");
    },
  },
};
</script>

<style scoped>
.admin-buttons {
  margin-top: 20px;
}

.custom-button {
  background-color: #2ecc71;
  color: #fff;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.custom-button:hover {
  background-color: #27ae60;
}

.btn {
  margin: 20px;
}
</style>
