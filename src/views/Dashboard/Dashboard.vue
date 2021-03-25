<template>
  <keep-alive>
    <!-- <component ref="_reference_" :is="component" /> -->
  </keep-alive>
</template>

<script>
export default {
  data() {
    return {
      component: null,
    };
  },
  computed: {},
  methods: {},
  mounted() {
    let lsDataUser = localStorage.lsDataUser;
    lsDataUser = JSON.parse(lsDataUser);
    // this.component = () => import(`./${lsDataUser.dashboard_url}.vue`);
    this.$router.replace({
      path: lsDataUser.dashboard_url
    })
  }
};
</script>

<style scoped>
</style>
