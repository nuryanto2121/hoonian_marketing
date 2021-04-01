<template>
  <div class="loader--page" v-if="loader">
    <div class="loader--page__box" style="margin: 0; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
      <!-- <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>-->
      <div class="loader"></div>
      <div class="title" style="text-align: center;">Loading...</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    loader() {
      return this.$store.getters.getStatusLoader;
    }
  },
  data() {
    return {
      // loader: false,
    };
  }
};
</script>
