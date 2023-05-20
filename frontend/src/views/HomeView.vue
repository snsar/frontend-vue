<template>
  <div class="container-fluid p-0">
    <Header :user="user" />

    <div class="container">
      <div class="jumbotron">
        <h1 class="display-4">Chào mừng đến với Website Du lịch của tôi</h1>
        <p class="lead">
          Khám phá thế giới cùng chúng tôi và trải nghiệm những cuộc phiêu lưu
          đáng nhớ.
        </p>
        <hr class="my-4" />
        <p>
          Tìm hiểu về những địa điểm tuyệt đẹp, tìm kiếm những giao dịch du lịch
          tốt nhất và tạo những kỷ niệm vĩnh cửu.
        </p>
        <p class="lead">
          <a
            v-if="user"
            class="btn btn-primary btn-lg"
            href="/user/destinations"
            role="button"
          >
            Bắt đầu
          </a>
          <a
            v-else
            class="btn btn-primary btn-lg"
            href="/auth/login"
            role="button"
          >
            Bắt đầu
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "../components/Header.vue";
import { getUserAPI } from "@/services/modules/AuthenModules";

export default {
  name: "HomeView",
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
};
</script>

<style scoped>
.home-view {
  margin: 10px;
}

.jumbotron {
  background-color: #f8f9fa;
  padding: 2rem;
  margin-bottom: 2rem;
}

.jumbotron h1 {
  font-size: 3.5rem;
  font-weight: bold;
}

.jumbotron p {
  font-size: 1.25rem;
}

.card-text {
  margin-bottom: 0.5rem;
}
</style>
