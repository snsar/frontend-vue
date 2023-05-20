<template>
  <div class="container-fluid p-0">
    <Header :user="user" />
    <h1 class="mb-4">Tours</h1>
    <div v-for="tour in paginatedTours" :key="tour.id" class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">
          Destination: {{ getDestinationName(tour.destination_id) }}
        </h5>
        <p class="card-text">
          <strong>User:</strong> {{ getUserName(tour.user_id) }}
        </p>
        <p class="card-text">
          <strong>Phone:</strong> {{ getUserPhone(tour.user_id) }}
        </p>
        <p class="card-text">
          <strong>Email:</strong> {{ getUserEmail(tour.user_id) }}
        </p>
      </div>
    </div>
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click="previousPage">Previous</a>
        </li>
        <li
          class="page-item"
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          :class="{ active: currentPage === pageNumber }"
        >
          <a class="page-link" href="#" @click="changePage(pageNumber)">{{
            pageNumber
          }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click="nextPage">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import {
  getToursAPI,
  getDestinationsAPI,
} from "@/services/modules/OtherModules";
import { getUsersAPI, getUserAPI } from "@/services/modules/AuthenModules";
import HeaderComponent from "../components/Header.vue";
export default {
  name: "ToursView",
  components: {
    Header: HeaderComponent,
  },
  data() {
    return {
      tours: [],
      destinations: [],
      users: [],
      currentPage: 1,
      pageSize: 4, // Số tour hiển thị trên mỗi trang
      user: {},
    };
  },
  async created() {
    const access_token = this.$store.state.cookies.get("access_token");

    const toursResponse = await getToursAPI(access_token);
    this.tours = toursResponse.data;

    const destinationsResponse = await getDestinationsAPI(access_token);
    this.destinations = destinationsResponse.data;

    const usersResponse = await getUsersAPI(access_token);
    this.users = usersResponse.data;

    const getUserResponse = await getUserAPI(access_token);
    this.user = getUserResponse.data.user;
  },
  computed: {
    totalPages() {
      return Math.ceil(this.tours.length / this.pageSize);
    },
    paginatedTours() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.tours.slice(startIndex, endIndex);
    },
  },
  methods: {
    getDestinationName(destinationId) {
      const destination = this.destinations.find(
        (dest) => dest.id === destinationId
      );
      return destination ? destination.name : "";
    },
    getUserName(userId) {
      const user = this.users.find((user) => user.id === userId);
      return user ? user.name : "";
    },
    getUserPhone(userId) {
      const user = this.users.find((user) => user.id === userId);
      return user ? user.phone_number : "";
    },
    getUserEmail(userId) {
      const user = this.users.find((user) => user.id === userId);
      return user ? user.email : "";
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
};
</script>

<style scoped>
.pagination {
  justify-content: center;
}
</style>
