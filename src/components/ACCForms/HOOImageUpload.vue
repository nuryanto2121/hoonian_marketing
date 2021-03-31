<template>
  <div id="ACCImageUpload">
    <div v-if="prop.cIconPhoto" style="border: 1px solid #9FA2AE; box-sizing: border-box; border-radius: 6px; width: 98px; height: 98px; cursor: pointer;" @click="onClick">
      <b-img :src="require('@/assets/icon-svg/photos.svg')" alt="" style="position: relative; top: 50%; left: 50%; transform: translate(-50%, -50%);"/>
    </div>
    <template v-else>
      <label
        :tabindex="prop.cOrder"
        :class="{'error-text-field': errors.has(prop.cParentForm+'.'+prop.cName), 'poppins': true}"
        v-if="prop.cIcon == undefined || prop.cIcon == null || prop.cIcon == ''"
        :for="'acc_image_upload_' + prop.cName"
        :style="'color: gray; width: 100%; text-align: center;border-radius: 5px; margin-top: 10px;border: 1px solid gray; display: inline-block; padding: 6px 12px; cursor: pointer;' + prop.cStyle"
      >{{prop.cTitle}}</label>
      <font-awesome-icon
        v-else
        :tabindex="prop.cOrder"
        :icon="prop.cIcon"
        class="icon-style-default"
        :size="prop.cIconSize"
        style="cursor: pointer;"
        @click="onClick"
      />
    </template>
    <b-form-file
      v-validate="prop.cValidate"
      v-bind:data-vv-name="prop.cName"
      :id="'acc_image_upload_' + prop.cName"
      :ref="'ref_image_upload_' + prop.cName"
      @change="fileChanged"
      :accept="prop.cAccept"
      v-model="value"
      :state="Boolean(value)"
      :disabled="prop.cProtect"
      style="display: none;"
    />
    <span
      v-show="errors.has(prop.cParentForm+'.'+prop.cName)"
      class="error-span"
    >{{ errors.first(prop.cParentForm+'.'+prop.cName) }}</span>
  </div>
</template>

<script>
export default {
  props: {
    prop: {
      cValidate: String,
      cName: String,
      cOrder: Number,
      cAccept: String,
      cTitle: String,
      cType: String,
      cStyle: String,
      cIcon: String,
      cIconSize: String,
      cProtect: Boolean,
      cParentForm: String,
      cIconPhoto: Boolean,
    },
    value: String,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    onClick(){
      document.getElementById('acc_image_upload_' + this.prop.cName).click()
    },
    fileChanged(e) {
      let maxSize = 6;
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }

      var numb = files[0].size / 1024 / 1024;
      numb = numb.toFixed(2);
      if (numb > maxSize) {
        this.alertError("File size cannot be more than " + maxSize + " MB");
        return;
      }
      this.M_upload(files[0]);
    },
    M_upload(fl) {
      let formData = new FormData();
      formData.append("type", this.prop.cType);
      formData.append("image", fl);

      this.$store.commit('setStatusLoader', true)
      axios
        .post(this.urlHoonian + '/api/hoonian-website/upload-pic', formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: 'Bearer ' + this.getSession().Session_Id
          }
        })
        .then(response => {
          this.$store.commit('setStatusLoader', false)
          var data = response.data;
          if (data.Error === true) {
            this.alertError(data.Message);
          } else {
            this.$emit("input", data.data.url);
            this.$emit("change", data.data);
          }
        })
        .catch(err => {
          console.log(err);
          this.$emit("change", null);
          this.$store.commit('setStatusLoader', false)
        });
    }
  },
  created() {
    if (this.prop.cAccept == undefined) {
      this.prop.cAccept = ".jpg, .png, .gif";
    }

    this.prop.cStyle = this.prop.cStyle ? this.prop.cStyle : "";
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>