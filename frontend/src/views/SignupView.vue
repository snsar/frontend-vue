<template>
  <div class="container-fluid p-0">
    <Header :user="user" />
    <div
      class="container d-flex justify-content-center align-items-center vh-100"
    >
      <div
        class="col-sm-6 col-md-4 col-lg-3 d-flex flex-column justify-content-center"
      >
        <h1 class="fs-1 fw-bold mx-auto" style="color: #0e4a67">Đăng Ký</h1>

        <Form
          class="mt-4"
          @submit="onSubmit"
          :validation-schema="schema"
          v-slot="{ errors }"
        >
          <div class="form-floating mt-3">
            <Field
              name="name"
              type="text"
              class="form-control"
              id="input-name"
              placeholder="Enter your name"
              :class="{ 'is-invalid': errors.name }"
            ></Field>
            <label for="input-name" style="color: #207198">Name</label>
            <div class="invalid-feedback d-block">{{ errors.name }}</div>
          </div>

          <div class="form-floating mt-3">
            <Field
              name="address"
              type="text"
              class="form-control"
              id="input-address"
              placeholder="Enter your address"
              :class="{ 'is-invalid': errors.address }"
            ></Field>
            <label for="input-address" style="color: #207198">Address</label>
            <div class="invalid-feedback d-block">{{ errors.address }}</div>
          </div>

          <div class="form-floating mt-3">
            <Field
              name="email"
              type="text"
              class="form-control"
              id="input-email"
              placeholder="Enter your email address"
              :class="{ 'is-invalid': errors.email }"
            ></Field>
            <label for="input-email" style="color: #207198"
              >Email address</label
            >
            <div class="invalid-feedback d-block">{{ errors.email }}</div>
          </div>

          <div class="form-floating mt-3">
            <Field
              name="phone"
              type="text"
              class="form-control"
              id="input-phone"
              placeholder="Enter your phone number"
              :class="{ 'is-invalid': errors.phone }"
            ></Field>
            <label for="input-phone" style="color: #207198">Phone number</label>
            <div class="invalid-feedback d-block">{{ errors.phone }}</div>
          </div>

          <div class="form-floating mt-3">
            <Field
              name="username"
              type="text"
              class="form-control"
              id="input-username"
              placeholder="Enter your username"
              :class="{ 'is-invalid': errors.username }"
            ></Field>
            <label for="input-username" style="color: #207198">Username</label>
            <div class="invalid-feedback d-block">{{ errors.username }}</div>
          </div>

          <div class="input-group mt-3">
            <div class="form-floating">
              <Field
                name="password"
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                id="input-password"
                placeholder="Enter your password"
                :class="{ 'is-invalid': errors.password }"
              ></Field>
              <label for="input-password" style="color: #207198"
                >Password</label
              >
            </div>
            <button
              @click="togglePassword"
              class="btn btn-outline-secondary rounded-end"
              type="button"
            >
              <font-awesome-icon
                :icon="`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`"
              />
            </button>
            <div class="invalid-feedback d-block">{{ errors.password }}</div>
          </div>

          <div class="input-group mt-3">
            <div class="form-floating">
              <Field
                name="confirm_password"
                :type="showConfirmPassword ? 'text' : 'password'"
                class="form-control"
                id="input-confirm-password"
                placeholder="Enter your confirm password"
                :class="{ 'is-invalid': errors.confirmPassword }"
              ></Field>
              <label for="input-confirm-password" style="color: #207198">
                Confirm password
              </label>
            </div>
            <button
              @click="toggleConfirmPassword"
              class="btn btn-outline-secondary rounded-end"
              type="button"
            >
              <font-awesome-icon
                :icon="`fa-solid ${
                  showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'
                }`"
              />
            </button>
            <div class="invalid-feedback d-block">
              {{ errors.confirm_password }}
            </div>
          </div>

          <button
            type="submit"
            class="btn w-100 mt-4 py-2 text-white fw-bold opt-submit-button"
          >
            Đăng Ký
          </button>
          <router-link
            to="/auth/login"
            class="btn btn-secondary w-100 mt-3 py-2 fw-bold"
          >
            Đăng Nhập
          </router-link>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { createUserAPI } from "@/services/modules/AuthenModules";
import router from "@/router";
import HeaderComponent from "../components/Header.vue";
import { getUserAPI } from "@/services/modules/AuthenModules";

export default {
  name: "SignupView",
  components: {
    Header: HeaderComponent,
    Form,
    Field,
  },
  data() {
    const schema = Yup.object().shape({
      name: Yup.string().required("Name is required"),
      address: Yup.string().required("Address is required"),
      email: Yup.string()
        .email("Email is invalid")
        .required("Email is required"),
      phone: Yup.string()
        .matches(
          /(^\+?[0-9]{8,15}$)|(^(09|01[2|6|8|9])+([0-9]{8})$)/,
          "Phone number is invalid"
        ) // Kiểm tra đúng 10 chữ số
        .required("Phone number is required"),
      username: Yup.string().required("Username is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .test(
          "password-requirements",
          "Password must have at least 1 uppercase letter and 1 digit",
          function (value) {
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/; // at least one capital letter and one digit
            return passwordRegex.test(value);
          }
        )
        .required("Password is required"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password must match")
        .required("Confirm password is required"),
    });

    return {
      schema,
      showPassword: false,
      showConfirmPassword: false,
      user: {},
    };
  },
  methods: {
    async onSubmit(values) {
      try {
        const response = await createUserAPI(
          values.name,
          values.address,
          values.email,
          values.phone,
          values.username,
          values.password,
          values.confirm_password
        );
        if (response.status == 201) {
          this.$store.state.toast.success(response.data.message);
          router.push("/");
        }
      } catch (error) {
        this.$store.state.toast.warning(error.response.data.message);
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
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

<style scoped>
.opt-submit-button {
  background-color: #f0a5a5; /* Màu hồng nhạt */
  transition: 0.5s;
}

.opt-submit-button:hover {
  background-color: #c5e1d9; /* Màu xanh nhạt */
  transform: scale(0.95);
}
</style>
