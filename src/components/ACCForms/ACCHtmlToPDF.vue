<template>
  <div>
    <vue-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="true"
      :paginate-elements-by-height="1400"
      filename="testing pdf"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="landscape"
      pdf-content-width="800px"

      @progress="onProgress($event)"
      @hasStartedGeneration="hasStartedGeneration()"
      @hasGenerated="hasGenerated($event)"
      ref="html2Pdf"
    >
      <section slot="pdf-content">
        <div v-html="prop.content">
        </div>
      </section>
    </vue-html2pdf>
  </div>
</template>

<script>

export default {
  props: {
    prop: {
      content: String,
    },
  },
  data() {
    return {
      subject: "",
    }
  },
  computed: {
  },
  methods: {
    generateReport () {
      this.$refs.html2Pdf.generatePdf()
    },
    onProgress() {

    },
    hasStartedGeneration() {

    },
    hasGenerated() {

    },
  },
  watch: {
    prop: function(newValue, oldValue) {
      // this.doc_no = newValue.doc_no == null || newValue.doc_no == undefined ? '' : newValue.doc_no
      // switch (newValue.doc_type) {
      //   case 'Q':
      //     this.subject = 'Quotation No. ' + this.doc_no
      //     break;
      //   case 'O':
      //     this.subject = 'Order No. ' + this.doc_no
      //     break;
      //   case 'B':
      //     this.subject = 'Open Bidding No. ' + this.doc_no
      //     break;
      //   case 'V':
      //     this.subject = 'Vendor No. ' + this.doc_no
      //     break;
      // }
    }
  },
  created: function() {
  },
  mounted: function () {
  },
  beforeDestroy: function() {
  },
  updated: function () {
  }
}
</script>