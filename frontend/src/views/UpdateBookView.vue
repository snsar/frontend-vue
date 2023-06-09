<template>
  <div class="container-fluid p-0">
    <Header :user="user" />
    <div>
      <h1>Edit Book</h1>
      <Form v-if="book" @submit="updateBook">
        <Field name="coverImage" type="file" v-model="form.coverImage" />
        <Field name="title" type="text" v-model="form.title" />
        <Field name="author" type="text" v-model="form.author" />
        <Field name="category" type="text" v-model="form.category" />
        <Field name="releaseDate" type="date" v-model="form.releaseDate" />
        <Field name="pageCount" type="number" v-model="form.pageCount" />
        <Field name="soldCount" type="number" v-model="form.soldCount" />
        <button type="submit">Update Book</button>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field } from "vee-validate";
import { getBookByIdAPI, updateBookAPI } from "@/services/modules/BookModules";

export default {
  name: "EditBook",
  components: {
    Form,
    Field,
  },
  data() {
    return {
      book: null,
      form: {
        coverImage: null,
        title: "",
        author: "",
        category: "",
        releaseDate: "",
        pageCount: 0,
        soldCount: 0,
      },
    };
  },
  methods: {
    async loadBookData() {
      const id = this.$route.params.id;
      const response = await getBookByIdAPI(id);
      this.book = response.data;

      // Set form fields to current book data
      this.form.title = this.book.title;
      this.form.author = this.book.author;
      this.form.category = this.book.category;
      this.form.releaseDate = this.book.releaseDate;
      this.form.pageCount = this.book.pageCount;
      this.form.soldCount = this.book.soldCount;
    },
    async updateBook() {
      const id = this.$route.params.id;
      const formData = new FormData();
      formData.append("coverImage", this.form.coverImage);
      formData.append("title", this.form.title);
      formData.append("author", this.form.author);
      formData.append("category", this.form.category);
      formData.append("releaseDate", this.form.releaseDate);
      formData.append("pageCount", this.form.pageCount);
      formData.append("soldCount", this.form.soldCount);

      const response = await updateBookAPI(id, formData);
      if (response.status === 200) {
        // Book updated successfully
        alert("Book updated successfully");
      } else {
        // Update failed
        alert("Update failed");
      }
    },
  },
  async created() {
    await this.loadBookData();
  },
};
</script>
