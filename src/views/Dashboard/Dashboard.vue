<template>
  <keep-alive>
    <component ref="_reference_" :is="component" />
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
    this.component = () => import(`./MK_Dashboard.vue`);
    this.$router.replace({
      path: '/MK_Dashboard'
    })
  }
};
</script>

<style scoped>
</style>
