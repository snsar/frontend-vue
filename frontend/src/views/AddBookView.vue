<template>
  <div>
    <h1>Add Book</h1>
    <Form @submit="addBook" :validation-schema="schema" v-slot="{ errors }">
      <div>
        <label for="coverImage">Cover Image</label>
        <Field
          type="file"
          name="coverImage"
          v-validate="'required|fileFormat'"
          :class="['form-control', { 'is-invalid': errors.coverImage }]"
          @change="handleImageUpload"
        />
        <span class="invalid-feedback">{{ errors.coverImage }}</span>
        <img
          v-if="coverPreview"
          :src="coverPreview"
          style="max-width: 400px"
          class="mt-3"
        />
      </div>
      <div>
        <label for="title">Title</label>
        <Field
          type="text"
          name="title"
          v-model="book.title"
          :class="['form-control', { 'is-invalid': errors.title }]"
        />
        <span class="invalid-feedback">{{ errors.title }}</span>
      </div>
      <div>
        <label for="author">Author</label>
        <Field
          type="text"
          name="author"
          v-model="book.author"
          :class="['form-control', { 'is-invalid': errors.author }]"
        />
        <span class="invalid-feedback">{{ errors.author }}</span>
      </div>
      <div>
        <label for="category">Category</label>
        <Field
          type="text"
          name="category"
          v-model="book.category"
          :class="['form-control', { 'is-invalid': errors.category }]"
        />
        <span class="invalid-feedback">{{ errors.category }}</span>
      </div>
      <div>
        <label for="releaseDate">Release Date</label>
        <Field
          type="date"
          name="releaseDate"
          v-model="book.releaseDate"
          :class="['form-control', { 'is-invalid': errors.releaseDate }]"
        />
        <span class="invalid-feedback">{{ errors.releaseDate }}</span>
      </div>
      <div>
        <label for="pageCount">Page Count</label>
        <Field
          type="number"
          name="pageCount"
          v-model="book.pageCount"
          :class="['form-control', { 'is-invalid': errors.pageCount }]"
        />
        <span class="invalid-feedback">{{ errors.pageCount }}</span>
      </div>
      <div>
        <label for="soldCount">Sold Count</label>
        <Field
          type="number"
          name="soldCount"
          v-model="book.soldCount"
          :class="['form-control', { 'is-invalid': errors.soldCount }]"
        />
        <span class="invalid-feedback">{{ errors.soldCount }}</span>
      </div>
      <button type="submit" class="btn btn-primary">Add Book</button>
    </Form>
  </div>
</template>

<script>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { addBookAPI } from "@/services/modules/BookModules";
import { getUserAPI } from "@/services/modules/AuthenModules";

export default {
  name: "AddBook",
  components: {
    Form,
    Field,
  },
  data() {
    const schema = Yup.object().shape({
      coverImage: Yup.mixed()
        .required("Cover image is required")
        .test(
          "fileFormat",
          "Please upload a valid image file (jpg, jpeg, png, gif)",
          (value) => {
            if (!value) {
              return true; // if no file is selected, skip validation
            }
            const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
            const extension = value.name.split(".").pop();
            return allowedExtensions.includes(extension);
          }
        ),
      title: Yup.string().required("Title is required"),
      author: Yup.string().required("Author is required"),
      category: Yup.string().required("Category is required"),
      releaseDate: Yup.date().required("Release date is required"),
      pageCount: Yup.number().required("Page count is required"),
      soldCount: Yup.number().required("Sold count is required"),
    });

    return { schema, coverPreview: null, user: {} };
  },
  methods: {
    async addBook(values) {
      const formData = new FormData();
      formData.append("coverImage", values.coverImage);
      formData.append("title", values.title);
      formData.append("author", values.author);
      formData.append("category", values.category);
      formData.append("releaseDate", values.releaseDate);
      formData.append("pageCount", values.pageCount);
      formData.append("soldCount", values.soldCount);

      const response = await addBookAPI(formData);

      if (response.status == 201) {
        // Book successfully added
        this.$router.push({ name: "BookList" });
      } else {
        // Book not added
        alert("Failed to add book.");
      }
    },
    handleImageUpload(event) {
      this.book.coverImage = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.coverPreview = e.target.result;
      };
      reader.readAsDataURL(this.book.coverImage);
    },
  },
  async created() {
    // Lấy thông tin người dùng
    // Code để lấy thông tin người dùng ở đây
    const getUserResponse = await getUserAPI();
    this.user = getUserResponse.data.user;
  },
};
</script>
