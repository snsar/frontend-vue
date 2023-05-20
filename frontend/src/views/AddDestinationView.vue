<template>
  <div class="container-fluid p-0">
    <Header :user="user" />
    <div class="d-flex align-items-center justify-content-center">
      <div>
        <h1 class="mb-4">Add Destination</h1>
        <Form
          @submit="addDestination"
          :validation-schema="schema"
          v-slot="{ errors }"
          class="mb-4"
        >
          <div class="form-group">
            <label for="name">Name:</label>
            <Field
              name="name"
              type="text"
              :class="['form-control', { 'is-invalid': errors.name }]"
            />
            <span class="invalid-feedback">{{ errors.name }}</span>
          </div>
          <div class="form-group">
            <label for="address">Address:</label>
            <Field
              name="address"
              type="text"
              :class="['form-control', { 'is-invalid': errors.address }]"
            />
            <span class="invalid-feedback">{{ errors.address }}</span>
          </div>
          <div class="form-group">
            <label for="description">Description:</label>
            <Field
              name="description"
              type="text"
              :class="['form-control', { 'is-invalid': errors.description }]"
            />
            <span class="invalid-feedback">{{ errors.description }}</span>
          </div>
          <div class="form-group">
            <label for="price">Price:</label>
            <Field
              name="price"
              type="number"
              :class="['form-control', { 'is-invalid': errors.price }]"
            />
            <span class="invalid-feedback">{{ errors.price }}</span>
          </div>
          <div class="form-group">
            <label for="image">Image:</label>
            <Field
              name="image"
              type="file"
              :class="['form-control-file', { 'is-invalid': errors.image }]"
              @change="handleImageUpload"
            />
            <span class="invalid-feedback">{{ errors.image }}</span>
            <img
              v-if="coverPreview"
              :src="coverPreview"
              style="max-width: 400px"
              class="mt-3"
            />
          </div>
          <button type="submit" class="btn btn-primary">Add Destination</button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { createDestinationAPI } from "@/services/modules/OtherModules";
import Swal from "sweetalert2";
import HeaderComponent from "../components/Header.vue";
import { getUserAPI } from "@/services/modules/AuthenModules";

export default {
  name: "AddDestinationView",
  components: {
    Form,
    Field,
    Header: HeaderComponent,
  },
  data() {
    const schema = Yup.object().shape({
      name: Yup.string().required("Name is required"),
      address: Yup.string().required("Address is required"),
      description: Yup.string().required("Description is required"),
      price: Yup.number().required("Price is required"),
      image: Yup.mixed()
        .required("Image is required")
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
    });
    return { schema, coverPreview: null, user: {} };
  },
  methods: {
    async addDestination(values) {
      try {
        const confirmed = await this.showConfirmationDialog();
        if (!confirmed) {
          return; // Ngừng thực hiện nếu không được xác nhận
        }
        const access_token = this.$store.state.cookies.get("access_token");
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("address", values.address);
        formData.append("description", values.description);
        formData.append("price", values.price);
        formData.append("image", values.image);
        const response = await createDestinationAPI(access_token, formData);
        // Xử lý response khi địa điểm được tạo thành công
        if (response.status == 201) {
          Swal.fire({
            icon: "success",
            text: "Thêm thành công địa điểm",
          });
        }
      } catch (error) {
        // Xử lý error khi tạo địa điểm không thành công
        Swal.fire({
          icon: "warning",
          text: "Thêm địa điểm thất bại",
        });
      }
    },
    handleImageUpload(event) {
      const image = event.target.files[0];

      if (image) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
          this.coverPreview = reader.result;
        };
      } else {
        this.coverPreview = null;
      }
    },
    showConfirmationDialog() {
      return Swal.fire({
        title: "Xác nhận",
        text: "Bạn có đồng ý tạo địa điểm không?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
      }).then((result) => {
        return result.isConfirmed;
      });
    },
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
