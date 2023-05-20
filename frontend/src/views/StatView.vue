<template>
  <div class="container-fluid p-0">
    <Header :user="user" />
    <div class="container">
      <h1 class="mt-5 mb-4">Thống kê</h1>
      <div class="row">
        <div class="col-md-6 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Địa điểm đã triển khai</h5>
              <p class="card-text">{{ totalDestinations }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Người dùng đã đăng ký</h5>
              <p class="card-text">{{ registeredUsers }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Tour đã được book</h5>
              <p class="card-text">{{ bookedTours }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Lợi nhuận</h5>
              <p class="card-text">{{ profit.toLocaleString() }}đ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUsersAPI, getUserAPI } from "@/services/modules/AuthenModules";
import {
  getDestinationsAPI,
  getToursAPI,
} from "@/services/modules/OtherModules";
import HeaderComponent from "../components/Header.vue";

export default {
  name: "StatView",
  components: {
    Header: HeaderComponent,
  },
  data() {
    return {
      totalDestinations: 0,
      registeredUsers: 0,
      bookedTours: 0,
      profit: 0.0,
      user: {},
    };
  },
  async created() {
    const getUsersResponse = await getUsersAPI(
      this.$store.state.cookies.get("access_token")
    );
    this.registeredUsers = getUsersResponse.data.length;

    const getDestinationsResponse = await getDestinationsAPI(
      this.$store.state.cookies.get("access_token")
    );
    this.totalDestinations = getDestinationsResponse.data.length;

    const getToursResponse = await getToursAPI(
      this.$store.state.cookies.get("access_token")
    );
    this.bookedTours = getToursResponse.data.length;

    for (const destination of getDestinationsResponse.data) {
      for (const tour of getToursResponse.data) {
        if (tour.destination_id === destination.id) {
          this.profit += parseInt(destination.price.replace(".", ""));
        }
      }
    }

    const getUserResponse = await getUserAPI(
      this.$store.state.cookies.get("access_token")
    );
    this.user = getUserResponse.data.user;
  },
};
</script>
