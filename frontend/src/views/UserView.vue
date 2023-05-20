<template>
  <div class="container-fluid p-0">
    <Header :user="user" />
    <div class="row">
      <div class="col-md-6">
        <div v-if="loading" class="text-center mt-4">
          <strong>Loading...</strong>
        </div>
        <div v-else>
          <div v-if="user" class="card mt-4">
            <div class="card-body">
              <h5 class="card-title">User Information</h5>
              <div class="mt-4">
                <p><strong>Name:</strong> {{ user.name }}</p>
                <p><strong>Address:</strong> {{ user.address }}</p>
                <p><strong>Email:</strong> {{ user.email }}</p>
                <p><strong>Phone Number:</strong> {{ user.phone_number }}</p>
                <p><strong>Username:</strong> {{ user.username }}</p>
                <p><strong>Admin:</strong> {{ user.isAdmin ? "Yes" : "No" }}</p>
              </div>
            </div>
          </div>
          <div v-else class="mt-4">
            <p>No user information available.</p>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="mt-4" v-if="hasTours">
          <h5>Tour đã đặt</h5>
          <ul>
            <li v-for="tour in filteredTours" :key="tour.id">
              <div>
                <p>
                  <strong>Địa điểm:</strong>
                  {{ getDestinationName(tour.destination_id) }}
                </p>
                <p>
                  <strong>Giá tiền:</strong>
                  {{ getDestinationPrice(tour.destination_id) }}đ
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div class="mt-4" v-else-if="user.isAdmin">
          <h5>Bạn đang dùng tài khoản Admin</h5>
          <h5>Nếu muốn đặt hãy đổi tài khoản</h5>
        </div>
        <div class="mt-4" v-else>
          <h5>Bạn chưa có Tour nào cả</h5>
          <router-link
            class="btn btn-primary btn-lg"
            to="/user/destinations"
            role="button"
            >Đặt tour</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "../components/Header.vue";
import { getUserAPI } from "@/services/modules/AuthenModules";
import {
  getToursAPI,
  getDestinationsAPI,
} from "@/services/modules/OtherModules";

export default {
  components: {
    Header: HeaderComponent,
  },
  data() {
    return {
      user: {},
      loading: true,
      tours: [],
      destinations: [],
      hasTours: false,
    };
  },
  async created() {
    try {
      const getUserResponse = await getUserAPI(
        this.$store.state.cookies.get("access_token")
      );
      this.user = getUserResponse.data.user;
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }

    try {
      const getTourResponse = await getToursAPI(
        this.$store.state.cookies.get("access_token")
      );
      this.tours = getTourResponse.data;
      this.hasTours = this.tours.some((tour) => tour.user_id === this.user.id);
    } catch (error) {
      console.error(error);
    }

    try {
      const getDestinationResponse = await getDestinationsAPI(
        this.$store.state.cookies.get("access_token")
      );
      this.destinations = getDestinationResponse.data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    getDestinationName(destinationId) {
      const destination = this.destinations.find(
        (dest) => dest.id === destinationId
      );
      return destination ? destination.name : "";
    },
    getDestinationPrice(destinationId) {
      const destination = this.destinations.find(
        (dest) => dest.id === destinationId
      );
      return destination ? destination.price : "";
    },
  },
  computed: {
    filteredTours() {
      return this.tours.filter((tour) => tour.user_id === this.user.id);
    },
  },
};
</script>

<style scoped>
.container {
  background-color: #f2f5f9;
  padding: 20px;
}

.card {
  max-width: 400px;
  margin: auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-title {
  color: #293241;
}

.card-body p {
  color: #475569;
}

.text-center {
  color: #293241;
}
</style>
