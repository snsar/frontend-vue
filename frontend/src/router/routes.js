import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
import HomeView from "@/views/HomeView.vue";
import UserView from "@/views/UserView.vue";
import DestinationView from "@/views/DestinationView";
import StatView from "@/views/StatView.vue";
import AddDestinationView from "@/views/AddDestinationView.vue";
import ToursView from "@/views/ToursView.vue";
import AdminView from "@/views/AdminView.vue";
import UpdateDestinationView from "@/views/UpdateDestinationView.vue";

const routes = [
  {
    path: "/",
    redirect: "/user/home",
  },
  {
    path: "/auth",
    component: () => import("@/layouts/AuthLayout.vue"),
    meta: {
      title: "Auth",
    },
    children: [
      {
        path: "signup",
        name: "signup",
        component: SignupView,
      },
      {
        path: "login",
        name: "login",
        component: LoginView,
      },
      {
        path: "logout",
        redirect: "/user/home",
        name: "logout",
      },
    ],
  },
  {
    path: "/user",
    component: () => import("@/layouts/UserLayout.vue"),
    meta: {
      title: "User",
    },
    children: [
      {
        path: "home",
        name: "home",
        component: HomeView,
      },
      {
        path: "user-profile",
        name: "user_profile",
        component: UserView,
      },
      {
        path: "destinations",
        name: "destinations",
        component: DestinationView,
      },
      {
        path: "stat",
        name: "stat",
        component: StatView,
      },
      {
        path: "adddestination",
        name: "adddestination",
        component: AddDestinationView,
      },
      {
        path: "tours",
        name: "tours",
        component: ToursView,
      },
      {
        path: "admin",
        name: "admin",
        component: AdminView,
      },
      {
        path: "update/:id",
        name: "UpdateDestinatoin",
        component: UpdateDestinationView,
      },
    ],
  },
];

export default routes;
