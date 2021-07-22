<template>
  <div>
    <Mobile v-if="isMobile()" />
    <Web v-else />
  </div>
</template>

<script>
import Web from "./dashboard_announcement_web";
import Mobile from "./dashboard_announcement_mobile";
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