<template>
  <iframe v-on:load="onLoadIframe" style="width: 100%;height: 100%;" :src="urlPreview" frameborder="0">
  </iframe>
</template>

<script>

import printJS from 'print-js'

export default {
  props: {
    prop: {
      reportName: String,
    },
  },
  data() {
    return {
      urlPreview: "",
      urlPrint: "",
      parameter: "",
      folderPath: "%2Freports%2Faccelog%2Freports%2F",
    }
  },
  computed: {
  },
  methods: {
    preview(parameter = "") {
      this.parameter = encodeURI(parameter);
      this.urlPreview = this.replaceAllString(this.urlReport, "{report_uri}", this.folderPath + this.prop.reportName);
      this.urlPreview = this.urlPreview + this.folderPath + this.prop.reportName + this.parameter;
      console.log(this.urlPreview);
    },
    print(parameter = "") {
      if (parameter !== "") {
        this.preview(parameter);
      }
      printJS({
        printable: this.urlPrint + this.parameter,
        type: 'pdf',
        showModal: true
      });
    },
    onLoadIframe(event) {
    },
  },
  created: function() {
  },
  mounted: function () {
    this.urlPrint = this.replaceAllString(this.urlExportReport, "{report_name}", this.prop.reportName + ".pdf");
  },
  beforeDestroy: function() {
  },
  updated: function () {
  }
}
</script>