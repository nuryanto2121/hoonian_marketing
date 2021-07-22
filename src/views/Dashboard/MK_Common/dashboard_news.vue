<template>
  <div>
    <Mobile v-if="isMobile()" />
    <Web v-else />
  </div>
</template>

<script>
import Web from "./dashboard_news_web";
import Mobile from "./dashboard_news_mobile";
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