<template>
  <div class="container-fluid p-0">
    <Header :user="user" />

    <div class="container">
      <div class="jumbotron">
        <h1 class="display-4">Chào mừng đến với Thư viện online</h1>
        <p class="lead">Khám phá những quyển sách hay động lòng người</p>
        <hr class="my-4" />
        <p class="lead">
          <a
            v-if="user"
            class="btn btn-primary btn-lg"
            href="/user/books"
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
import HeaderComponent from "@/components/Header.vue";
import { getUserAPI } from "@/services/modules/AuthenModules.js";

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
    try {
      const getUserResponse = await getUserAPI(this.$store.state.userId);
      this.user = getUserResponse.user;
    } catch (error) {
      console.error(error);
    }
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
