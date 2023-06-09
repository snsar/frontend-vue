import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
import HomeView from "@/views/HomeView.vue";
// import UserView from "@/views/UserView.vue";
// import DestinationView from "@/views/DestinationView";
import AddBookView from "@/views/AddBookView.vue";
import UpdateBookView from "@/views/UpdateBookView.vue";
import BookView from "@/views/BookView.vue";

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
        path: "books",
        name: "books",
        component: BookView,
      },
      {
        path: "addbook",
        name: "addbook",
        component: AddBookView,
      },
      {
        path: "update/:id",
        name: "UpdateBook",
        component: UpdateBookView,
      },
    ],
  },
];

export default routes;
