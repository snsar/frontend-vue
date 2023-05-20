<template>
  <div class="container-fluid p-0">
    <Header :user="user" />
    <div class="container d-flex justify-content-center">
      <div class="card mt-5" style="width: 600px">
        <h1 class="card-title text-center mt-4">Chỉnh sửa địa điểm</h1>
        <div class="card-body">
          <Form
            @submit="editDestination"
            :validation-schema="schema"
            v-slot="{ errors }"
            class="w-100"
          >
            <div class="form-group">
              <label for="name">Name:</label>
              <Field
                name="name"
                type="text"
                :class="{ 'is-invalid': errors.name }"
                v-model="form.name"
                class="form-control"
              />
              <span class="text-danger">{{ errors.name }}</span>
            </div>
            <div class="form-group">
              <label for="address">Address:</label>
              <Field
                name="address"
                type="text"
                :class="{ 'is-invalid': errors.address }"
                v-model="form.address"
                class="form-control"
              />
              <span class="text-danger">{{ errors.address }}</span>
            </div>
            <div class="form-group">
              <label for="description">Description:</label>
              <Field
                name="description"
                type="text"
                :class="{ 'is-invalid': errors.description }"
                v-model="form.description"
                class="form-control"
                style="height: 120px"
              />
              <span class="text-danger">{{ errors.description }}</span>
            </div>
            <div class="form-group">
              <label for="price">Price:</label>
              <Field
                name="price"
                type="number"
                :class="{ 'is-invalid': errors.price }"
                v-model="form.price"
                class="form-control"
              />
              <span class="text-danger">{{ errors.price }}</span>
            </div>
            <div class="form-group">
              <label for="image">Image:</label>
              <input
                type="file"
                @change="handleImageUpload"
                class="form-control-file"
              />
              <span class="text-danger">{{ errors.image }}</span>
              <img
                v-if="coverPreview"
                :src="coverPreview"
                style="max-width: 400px"
                class="mt-3"
              />
            </div>
            <div class="d-flex justify-content-center mt-4">
              <button type="submit" class="btn btn-primary">
                Save Changes
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import Swal from "sweetalert2";
import {
  getDestinationAPI,
  updateDestinationAPI,
} from "@/services/modules/OtherModules";
import HeaderComponent from "../components/Header.vue";
import { getUserAPI } from "@/services/modules/AuthenModules";
import router from "@/router";

export default {
  name: "EditDestinationView",
  components: {
    Form,
    Field,
    Header: HeaderComponent,
  },
  data() {
    const schema = Yup.object().shape({
      name: Yup.string().required("Name is required"),
      address: Yup.string().required("Address is required"),
      description: Yup.string(),
      price: Yup.number(),
    });
    return {
      schema,
      form: {
        name: "",
        address: "",
        description: "",
        price: 0,
      },
      coverPreview: null,
      serverDomain: "",
      user: {},
    };
  },
  methods: {
    async editDestination() {
      try {
        const confirmed = await this.showConfirmationDialog();
        if (!confirmed) {
          return; // Ngừng thực hiện nếu không được xác nhận
        }
        const access_token = this.$store.state.cookies.get("access_token");
        const destinationId = this.$route.params.id;

        const formData = new FormData();
        formData.append("name", this.form.name);
        formData.append("address", this.form.address);
        formData.append("description", this.form.description);
        formData.append("price", this.form.price);
        if (this.form.image) {
          formData.append("image", this.form.image);
        }

        const response = await updateDestinationAPI(
          access_token,
          destinationId,
          formData
        );
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Cập nhật thành công",
            showConfirmButton: false,
            timer: 1500,
          });
          router.push("/user/destinations");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Cập nhật thất bại",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    async loadDestinationData() {
      try {
        const access_token = this.$store.state.cookies.get("access_token");
        const destinationId = this.$route.params.id;
        const response = await getDestinationAPI(access_token, destinationId);
        const destination = response.data;
        this.fillFormWithData(destination);
      } catch (error) {
        console.error(error);
      }
    },
    fillFormWithData(destination) {
      this.form.name = destination.name;
      this.form.address = destination.address;
      this.form.description = destination.description;
      this.form.price = destination.price;
    },
    handleImageUpload(event) {
      const image = event.target.files[0];
      if (image) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
          this.coverPreview = reader.result;
          this.form.image = image; // Lưu đối tượng file trong data
        };
      } else {
        this.coverPreview = null;
        this.form.image = null; // Reset đối tượng file trong data
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
  async created() {
    this.loadDestinationData();
    this.serverDomain = this.$store.state.serverDomain;

    const getUserResponse = await getUserAPI(
      this.$store.state.cookies.get("access_token")
    );
    this.user = getUserResponse.data.user;
  },
};
</script>

<style>
.card {
  margin: 0 auto;
}
</style>
