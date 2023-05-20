<template>
  <div class="container-fluid p-0">
    <Header :user="user" />
    <h1 class="mt-4">Danh sách địa điểm</h1>
    <div class="admin-button" v-if="user.isAdmin">
      <router-link to="/user/adddestination" class="btn btn-primary">
        Thêm địa điểm
      </router-link>
    </div>
    <div class="filter-menu">
      <button
        class="btn btn-filter"
        :class="{ active: sortByPrice === 'ascending' }"
        @click="sortByAscendingPrice"
      >
        Giá tăng dần
      </button>
      <button
        class="btn btn-filter"
        :class="{ active: sortByPrice === 'descending' }"
        @click="sortByDescendingPrice"
      >
        Giá giảm dần
      </button>
      <button
        class="btn btn-filter"
        :class="{ active: sortByPrice === null }"
        @click="resetSortByPrice"
      >
        Bỏ lọc giá
      </button>
    </div>

    <div class="row">
      <div
        class="col-md-4"
        v-for="destination in paginatedDestinations"
        :key="destination.id"
      >
        <div class="card mb-4">
          <img
            :src="serverDomain + destination.image"
            :alt="destination.name"
            class="card-img-top destination-image"
          />
          <div class="card-body">
            <h5 class="card-title">{{ destination.name }}</h5>
            <p
              class="card-text"
              v-html="getDescriptionPreview(destination)"
              v-if="!isDescriptionExpanded(destination)"
            ></p>

            <div
              v-if="isDescriptionExpanded(destination)"
              class="description-expand"
            >
              <p class="card-text" v-if="isDescriptionExpanded(destination)">
                {{ destination.description }}
              </p>

              <button
                class="btn btn-link"
                @click="toggleDescriptionExpanded(destination)"
              >
                Thu gọn
              </button>
            </div>
            <div v-else class="description-expand">
              <button
                class="btn btn-link"
                @click="toggleDescriptionExpanded(destination)"
              >
                Xem thêm
              </button>
            </div>
            <p class="card-text">
              <strong>Giá tiền:</strong> {{ destination.price }}đ
            </p>
            <button
              class="btn btn-primary"
              @click="bookTour(user.id, destination.id)"
              v-if="!user.isAdmin"
            >
              Đặt Tour
            </button>
            <!-- Nút Chỉnh sửa Destination -->
            <button
              class="btn btn-secondary"
              @click="editDestination(destination.id)"
              v-if="user.isAdmin"
            >
              Chỉnh sửa
            </button>
            <!-- Nút Xoá Destination -->
            <button
              class="btn btn-danger"
              @click="deleteDestination(destination.id)"
              v-if="user.isAdmin"
            >
              Xoá
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="destinations.length === 0" class="mt-4">
      <p>Không có địa điểm nào.</p>
    </div>
    <!-- Nút Trang trước -->
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
import HeaderComponent from "../components/Header.vue";
import { getUserAPI } from "@/services/modules/AuthenModules";
import {
  getDestinationsAPI,
  createTourAPI,
  deleteDestinationAPI,
} from "@/services/modules/OtherModules";
import Swal from "sweetalert2";
import router from "@/router/index.js";

export default {
  name: "DestinationView",
  components: {
    Header: HeaderComponent,
  },
  data() {
    return {
      user: {},
      destinations: [],
      serverDomain: "",
      expandedDescriptions: [],
      descriptionLimit: 100,
      currentPage: 1,
      itemsPerPage: 6,
      sortByPrice: null,
    };
  },
  async created() {
    const getUserResponse = await getUserAPI(
      this.$store.state.cookies.get("access_token")
    );
    this.user = getUserResponse.data.user;

    const getDestinationResponse = await getDestinationsAPI(
      this.$store.state.cookies.get("access_token")
    );
    this.destinations = getDestinationResponse.data;
    this.serverDomain = this.$store.state.serverDomain;
  },
  methods: {
    getDescriptionPreview(destination) {
      const description = destination.description;
      if (
        description.length <= this.descriptionLimit ||
        this.isDescriptionExpanded(destination)
      ) {
        return description;
      } else {
        return description.slice(0, this.descriptionLimit) + "...";
      }
    },
    isDescriptionExpanded(destination) {
      return this.expandedDescriptions.includes(destination.id);
    },
    toggleDescriptionExpanded(destination) {
      if (this.isDescriptionExpanded(destination)) {
        const index = this.expandedDescriptions.indexOf(destination.id);
        this.expandedDescriptions.splice(index, 1);
      } else {
        this.expandedDescriptions.push(destination.id);
      }
    },
    async bookTour(user_id, destination_id) {
      try {
        const confirmed = await Swal.fire({
          title: "Xác nhận đặt tour",
          text: "Bạn có muốn đặt tour này không?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Hủy",
          reverseButtons: true,
        });
        if (confirmed.isConfirmed) {
          const access_token = this.$store.state.cookies.get("access_token");
          const tourData = {
            user_id,
            destination_id,
          };
          const response = await createTourAPI(access_token, tourData);
          // Xử lý response khi tour được tạo thành công
          console.log("Tour created:", response.data);
        }
      } catch (error) {
        // Xử lý error khi tạo tour không thành công
        console.error("Error creating tour:", error);
      }
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
    sortByAscendingPrice() {
      this.sortByPrice = "ascending";
    },
    sortByDescendingPrice() {
      this.sortByPrice = "descending";
    },
    resetSortByPrice() {
      this.sortByPrice = null;
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    editDestination(destinationId) {
      // Xử lý logic cần thiết

      // Điều hướng đến trang "update/:id"
      router.push(`/user/update/${destinationId}`);
    },
    async deleteDestination(destinationId) {
      try {
        const confirmed = await this.showConfirmationDialog();
        if (!confirmed) {
          return; // Ngừng thực hiện nếu không được xác nhận
        }
        const access_token = this.$store.state.cookies.get("access_token");

        const response = await deleteDestinationAPI(
          access_token,
          destinationId
        );
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Xoá thành công",
            showConfirmButton: false,
            timer: 1500,
          });
          router.push("/user/destinations");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Xoá thất bại",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    showConfirmationDialog() {
      return Swal.fire({
        title: "Xác nhận",
        text: "Bạn có đồng ý cập nhật địa điểm không?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
      }).then((result) => {
        return result.isConfirmed;
      });
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredDestinations.length / this.itemsPerPage);
    },
    filteredDestinations() {
      let filtered = [...this.destinations];

      if (this.sortByPrice === "ascending") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (this.sortByPrice === "descending") {
        filtered.sort((a, b) => b.price - a.price);
      }

      return filtered;
    },
    paginatedDestinations() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredDestinations.slice(startIndex, endIndex);
    },
  },
};
</script>

<style scoped>
.destination-image {
  width: 100%;
  height: auto;
}

.description-expand {
  margin-top: 10px;
}

.destination-image {
  width: 100%;
  height: 200px; /* Đặt chiều cao tùy ý */
  object-fit: cover; /* Đảm bảo ảnh không bị méo khi thay đổi kích thước */
}

.filter-menu {
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.btn-filter {
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-filter.active {
  background-color: #007bff;
  color: #fff;
}

.pagination {
  justify-content: center;
}

.admin-button {
  justify-content: right;
  margin-bottom: 10px;
}
</style>
