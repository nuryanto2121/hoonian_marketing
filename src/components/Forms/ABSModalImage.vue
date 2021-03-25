<template>
  <div v-show="isShow" class="modal-multiple">
    <div :class="'modal-content-' + size">
      <div style="position: relative;">
        <b-img style="position: absolute; width: 100%;" :src="image" alt @error="onImageLoadFailure($event)" />
        <b-img style="position: absolute; width: 40px; top: 10px; right: 10px; cursor: pointer;" :src="require('@/assets/icon-svg/close_image.svg')" @click="_hide" alt />
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "ABSModalImage",
  props: {
    id: String,
    size: { type: String, default: "md" },
    okOnly: { type: Boolean, default: false },
    saveOnly: { type: Boolean, default: false },
    okCancel: { type: Boolean, default: false },
    yesNo: { type: Boolean, default: false },
    saveCancel: { type: Boolean, default: false },
    customButton: { type: Boolean, default: false }
  },
  data() {
    return {
      isShow: false,
      image: "",
    };
  },
  computed: {
    hasHeaderSlot() {
      return !!this.$slots["header"];
    },
    hasHeaderDefaultSlot() {
      return !!this.$slots["headerDefault"];
    },
    hasHeaderDefault2Slot() {
      return !!this.$slots["headerDefault2"];
    },
    hasHeaderTitleSlot() {
      return !!this.$slots["headerTitle"];
    },
    hasHeaderCloseSlot() {
      return !!this.$slots["headerClose"];
    },
    hasContentSlot() {
      return !!this.$slots["content"];
    },
    hasContentDefaultSlot() {
      return !!this.$slots["contentDefault"];
    },
    hasFooterSlot() {
      return !!this.$slots["footer"];
    },
    hasOkOnlySlot() {
      return !!this.$slots["okOnly"];
    },
    hasSaveOnlySlot() {
      return !!this.$slots["saveOnly"];
    }
  },
  methods: {
    _show(image) {
      this.image = image;
      this.isShow = true;
    },
    _hide() {
      this.isShow = false;
    },
    onOkClicked() {
      // this._hide()

      this.$emit("modalOkClicked");
    },
    onCancelClicked() {
      this._hide();

      this.$emit("modalCancelClicked");
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian2.svg");
    },
  },
  watch: {},
  created: function() {},
  mounted: function() {
  }
};
</script>

<style lang="scss" scoped>
.modal-content {
  &-sm {
    // background-color: #fefefe;
    margin: auto;
    // padding: 10px 20px 20px 20px;
    // border-top: 1px solid #e9ecef;
    // border-bottom: 1px solid #e9ecef;
    width: 33%;
    // font-size: 12px;
    // border-radius: 0px 0px 5px 5px;
  }

  &-md {
    // background-color: #fefefe;
    margin: auto;
    // padding: 10px 20px 20px 20px;
    // border-top: 1px solid #e9ecef;
    // border-bottom: 1px solid #e9ecef;
    width: 66%;
    // font-size: 12px;
    // border-radius: 0px 0px 5px 5px;
  }

  &-lg {
    // background-color: #fefefe;
    margin: auto;
    // padding: 10px 20px 20px 20px;
    // border-top: 1px solid #e9ecef;
    // border-bottom: 1px solid #e9ecef;
    width: 90%;
    // font-size: 12px;
    // border-radius: 0px 0px 5px 5px;
  }
}
</style>