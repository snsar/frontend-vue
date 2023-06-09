<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
export default {
  async beforeRouteEnter(to, from, next) {
    let canAccess = true;

    if (canAccess) {
      next();
    }
  },
};
</script>
