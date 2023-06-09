<template>
  <div class="container-fluid p-0">
    <Header :user="user" />
    <div
      class="container d-flex align-items-center justify-content-center vh-100"
      style="font-family: 'Source Sans Pro', sans-serif"
    >
      <div class="col-md-6">
        <h1 class="text-center fs-3 fw-bold" style="color: #0e4a67">
          Đăng nhập
        </h1>

        <Form
          class="mt-4"
          @submit="onSubmit"
          :validation-schema="schema"
          v-slot="{ errors }"
        >
          <div class="form-floating mt-3">
            <Field
              name="email"
              type="text"
              class="form-control form-control-sm"
              id="input-email"
              placeholder="Enter your email"
              :class="{ 'is-invalid': errors.email }"
            ></Field>
            <label for="input-email" style="color: #207198">Email</label>
            <div class="invalid-feedback d-block">{{ errors.email }}</div>
          </div>

          <div class="input-group mt-3">
            <div class="form-floating">
              <Field
                name="password"
                :type="showPassword ? 'text' : 'password'"
                class="form-control form-control-sm"
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

          <button type="submit" class="btn btn-primary w-100 mt-4 py-2 fw-bold">
            Đăng nhập
          </button>
          <p class="text-center mt-3" style="font-size: 14px">
            Chưa có tài khoản, ấn nút đăng ký phía dưới
          </p>
          <router-link
            to="/auth/signup"
            class="btn btn-secondary w-100 mt-3 py-2 fw-bold"
          >
            Đăng Ký
          </router-link>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { loginAPI, getUserAPI } from "@/services/modules/AuthenModules";
import router from "@/router";
import HeaderComponent from "../components/Header.vue";

export default {
  name: "LoginView",
  components: {
    Header: HeaderComponent,
    Form,
    Field,
  },
  data() {
    const schema = Yup.object().shape({
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
    });

    return {
      schema,
      showPassword: false,
      user: {},
    };
  },
  methods: {
    async onSubmit(values) {
      try {
        const loginRequest = {
          email: values.email,
          password: values.password,
        };

        const response = await loginAPI(loginRequest);

        if (response.status == 202) {
          this.$store.state.userId = response.data.id;
          router.push("/");
        }
      } catch (error) {
        this.$store.state.toast.warning(error.response.data.message);
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
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

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.col-md-6 {
  max-width: 400px;
}

.text-center {
  font-size: 1.5rem;
}

.form-control {
  height: 38px;
}

.btn-primary {
  background-color: #0e4a67;
  transition: background-color 0.5s;
}

.btn-secondary {
  background-color: #207198;
  transition: background-color 0.5s;
}

.btn-primary:hover,
.btn-secondary:hover {
  background-color: #c5e1d9;
  transform: scale(0.95);
}
</style>
