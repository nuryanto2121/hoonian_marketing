<template>
  <div>
    <Mobile v-if="isMobile()" />
    <Web v-else />
  </div>
</template>

<script>
import Web from "./HeaderAppWeb";
import Mobile from "./HeaderAppMobile";
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