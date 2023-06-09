<template>
  <div class="container-fluid p-0">
    <Header :user="user" />
    <div class="container">
      <h1 class="mt-4">Book List</h1>
      <div v-if="books.length === 0" class="mt-4">
        <p>No books available.</p>
      </div>
      <div class="row">
        <div class="col-md-4" v-for="book in books" :key="book.id">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">{{ book.title }}</h5>
              <p class="card-text">
                <strong>Author:</strong> {{ book.author }}
              </p>
              <p class="card-text">
                <strong>Category:</strong> {{ book.category }}
              </p>
              <p class="card-text">
                <strong>Release Date:</strong> {{ book.releaseDate }}
              </p>
              <p class="card-text">
                <strong>Page Count:</strong> {{ book.pageCount }}
              </p>
              <p class="card-text">
                <strong>Sold Count:</strong> {{ book.soldCount }}
              </p>
              <!-- Add additional fields here -->

              <button class="btn btn-primary" @click="editBook(book.id)">
                Edit
              </button>
              <button class="btn btn-danger" @click="deleteBook(book.id)">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllBooksAPI, deleteBookAPI } from "@/services/modules/BookModules";
import Swal from "sweetalert2";
import router from "@/router/index.js";
import HeaderComponent from "@/components/Header.vue";

export default {
  name: "BookView",
  components: {
    Header: HeaderComponent,
  },
  data() {
    return {
      books: [],
      user: {},
    };
  },
  async created() {
    try {
      const response = await getAllBooksAPI();
      this.books = response.data;
    } catch (error) {
      console.error("Error retrieving books:", error);
    }
  },
  methods: {
    async deleteBook(bookId) {
      try {
        const confirmed = await this.showConfirmationDialog();
        if (!confirmed) {
          return; // Stop execution if not confirmed
        }
        const response = await deleteBookAPI(bookId);
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Delete Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          router.push("/books");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error("Error deleting book:", error);
      }
    },
    showConfirmationDialog() {
      return Swal.fire({
        title: "Confirmation",
        text: "Are you sure you want to delete this book?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      }).then((result) => {
        return result.isConfirmed;
      });
    },
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}
</style>
