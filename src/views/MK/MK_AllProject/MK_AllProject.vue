<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <Mobile v-if="isMobile()" />
      <Web v-else />
    </div>
  </div>
</template>

<script>
import Web from "./MK_AllProjectWeb";
import Mobile from "./MK_AllProjectMobile";
export default {
  components: {
    Web,
    Mobile
  },
  data() {
    return {
    };
  },
  computed: {},
  methods: {
  },
  mounted() {
  },
};
</script>