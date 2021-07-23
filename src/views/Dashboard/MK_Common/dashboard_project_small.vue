<template>
  <div class="">
    <Mobile v-if="isMobile()" />
    <Web v-else />
  </div>
</template>

<script>
import Web from "./dashboard_project_small_web";
import Mobile from "./dashboard_project_small_mobile";
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