<template>
  <header class="header-component">
    <nav class="navbar navbar-expand-lg navbar-light">
      <router-link class="navbar-brand" to="/user/home">Trang chủ</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-if="isAuthenticated">
            <router-link class="nav-link" to="/user/user-profile"
              >Hồ sơ</router-link
            >
          </li>
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link class="nav-link" to="/user/books">Sách</router-link>
          </li>
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link class="nav-link" to="/auth/login"
              >Đăng nhập</router-link
            >
          </li>
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link class="nav-link" to="/auth/signup"
              >Đăng ký</router-link
            >
          </li>
          <li class="nav-item" v-if="isAuthenticated && user.admin">
            <router-link class="nav-link" to="/user/admin">Admin</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <router-link class="nav-link" to="/auth/logout" @click="logout"
              >Đăng xuất</router-link
            >
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <router-link
              class="nav-link"
              to="/auth/logout"
              @click="logout"
            ></router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import router from "@/router";
import logoutAPI from "@/services/modules/AuthenModules.js";
export default {
  name: "HeaderComponent",
  props: {
    user: Object,
  },

  computed: {
    isAuthenticated() {
      return this.user && this.user.name;
    },
  },
  methods: {
    async logout() {
      // Thực hiện chức năng đăng xuất ở đây (gửi yêu cầu API, xóa local storage, v.v.)
      await logoutAPI();
      router.push("/");
    },
  },
};
</script>

<style scoped>
.header-component {
  background-color: #207198;
  padding: 10px 0;
  border-radius: 10px;
}

.navbar {
  margin-bottom: 0;
}

.navbar-brand {
  font-weight: bold;
  color: #fff;
}

.navbar-nav .nav-item {
  margin-right: 10px;
}

.nav-link {
  color: #fff;
  font-weight: bold;
}

.nav-link:hover {
  color: #c5e1d9;
}

.navbar-toggler {
  border: none;
  outline: none;
}

.navbar-toggler-icon {
  background-color: #fff;
  border-radius: 50%;
  padding: 0.25rem;
}

@media (max-width: 767px) {
  .navbar-nav .nav-item {
    margin-right: 0;
    margin-bottom: 10px;
  }
}
</style>
