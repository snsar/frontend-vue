<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import store from "@/store";
import { refreshAccessToken } from "@/services/modules/AuthenModules";

export default {
  async beforeRouteEnter(to, from, next) {
    let canAccess = true;

    if (store.state.cookies.get("access_token") == null) {
      if (store.state.cookies.get("refresh_token") == null) {
        canAccess = false;

        next("/auth/login");
      } else {
        try {
          const refreshResponse = await refreshAccessToken(
            store.state.cookies.get("refresh_token")
          );

          this.$store.state.cookies.set(
            "access_token",
            refreshResponse.data.access,
            { maxAge: 60 * 60 * 24, path: "/" }
          );
        } catch {
          canAccess = false;

          next("/auth/login");
        }
      }
    }

    if (canAccess) {
      next();
    }
  },
};
</script>
