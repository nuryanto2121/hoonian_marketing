<template>
  <div id="ACCExcelUpload">
    <label
      v-if="prop.cIcon == undefined || prop.cIcon == null || prop.cIcon == ''"
      :for="'acc_excel_upload_' + prop.cName"
      :style="'background-color: #4A93B3; color: white; width: 100%; text-align: center;border-radius: 5px; margin-top: 10px;border: 1px solid #4A93B3; display: inline-block; padding: 6px 12px; cursor: pointer;' + prop.cStyle"
    >{{prop.cTitle}}</label>
    <font-awesome-icon
      v-else
      :icon="prop.cIcon"
      class="icon-style-default"
      :size="prop.cIconSize"
      style="cursor: pointer;"
      @click="onClick"
    />
    <b-form-file
      :id="'acc_excel_upload_' + prop.cName"
      style="display: none;"
      :ref="'ref_excel_upload_' + prop.cName"
      @change="fileChanged"
      accept=".xls, .xlsx"
      v-model="file"
      :state="Boolean(file)"
    />
  </div>
</template>

<script>
export default {
  props: {
    prop: {
      cName: String,
      cTitle: String,
      cModule: String,
      cStyle: String,
      cIcon: String,
      cIconSize: String,
      cUrl: String,
    },
    file: String
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    onClick(){
      document.getElementById('acc_excel_upload_' + this.prop.cName).click()
    },
    fileChanged(e) {
      let maxSize = 10;
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
      // this.M_upload(files[0]);
      this.$emit("change", files);
    },
    M_upload(fl) {
      let formData = new FormData();
      formData.append("ss_portfolio_id", this.getDataUser().portfolio_id);
      formData.append("ss_subportfolio_id", this.getDataUser().subportfolio_id);
      formData.append("user_input", 'PORTIN');
      formData.append("file_portin", fl);

      this.$store.commit('setStatusLoader', true)
      axios
        .post(this.prop.cUrl == undefined ? this.getUrlPortIn(): this.prop.cUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Token: this.getSession().Session_Id
          }
        })
        .then(response => {
          this.$store.commit('setStatusLoader', false)
          var data = response.data;
          if (data.Error) {
            this.alertError(data.Message == null ? 'Upload Failed' : data.Message);
          }
          this.$emit("change", data.Data);
          return;
        })
        .catch(err => {
          console.log(err);
          this.alertError(err);
          this.$emit("change", null);
          this.$store.commit('setStatusLoader', false)
        });
    }
  },
  created() {
    this.prop.cStyle = this.prop.cStyle ? this.prop.cStyle : "";
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>