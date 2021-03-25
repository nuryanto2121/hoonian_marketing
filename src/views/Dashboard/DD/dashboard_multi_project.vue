<template>
  <div class="card" style="height: 100%;">
    <div class="card__body">
      <DashboardMultiProject
        :isDashboardDev="true"
      />
    </div>
  </div>
</template>

<script>
import DashboardMultiProject from '../OP/dashboard_multi_project';
export default {
  components: {
    DashboardMultiProject
  },
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {
  }
};
</script>

<style scoped>
</style>