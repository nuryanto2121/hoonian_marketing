<template>
  <ABSModal id="Modal_Email" ref="Modal_Email" size="md">
    <template slot="headerTitle">Email</template>
    <template slot="content">
      <b-row>
        <b-col md="12">
          <b-form
            :data-vv-scope="'FormScope_' + 1 + '_' + 1"
            :data-vv-value-path="'FormScope_' + 1 + '_' + 1"
          >
            <b-row>
              <b-col md="12">
                <b-row>
                  <b-col md="12">
                    <span>
                      <label>To :</label>
                    </span>
                    <ACCTextBox :prop="PI_to" v-model="to" ref="ref_to" />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="12">
                    <span>
                      <label>CC :</label>
                    </span>
                    <ACCTextBox :prop="PI_cc" v-model="cc" ref="ref_cc" />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="12">
                    <span>
                      <label>Subject :</label>
                    </span>
                    <ACCTextBox
                      :prop="PI_subject"
                      v-model="subject"
                      ref="ref_subject"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="12">
                    <span>
                      <label>Body Message</label>
                    </span>
                    <ACCTextArea :prop="PI_body" v-model="bodyMessage" ref="ref_body" />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="12">
                    <span>
                      <label>Attachment</label>
                    </span><br>
                    <font-awesome-icon icon="file-pdf" class="icon-style-1__exportPdf" size="2x" style="cursor:pointer" @click="showPdf" />
                    {{prop.doc_no}}
                  </b-col>
                </b-row>
                <b-row style="margin-top: 20px;">
                  <b-col md="12">
                    <ABSButton
                      :text="'Send'"
                      classButton="btn btn--default"
                      classIcon="icon-style-1"
                      @click="doSendEmail"
                      styleButton="height: 40px;width: 100%;"
                    />
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-form>
        </b-col>
      </b-row>
    </template>
  </ABSModal>
</template>

<script>

export default {
  props: {
    prop: {
      to: String,
      cc: String,
      subject: String,
      bodyMessage: String,
      doc_type: String,
      doc_no: String,
      attachmentHtml: String,
    },
  },
  data() {
    return {
      to: "",
      cc: "",
      subject: "",
      bodyMessage: "",
      attachmentUrlFile: "",

      PI_to: {
        cValidate: "",
        cName: "to",
        cOrder: 12,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_cc: {
        cValidate: "",
        cName: "cc",
        cOrder: 12,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_subject: {
        cValidate: "",
        cName: "subject",
        cOrder: 12,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_body: {
        cValidate: "",
        cName: "body",
        cOrder: 2,
        cKey: false,
        cProtect: false,
        cResize: false,
        cReadonly: false,
        cRows: 10,
        cMaxRows: 10,
        cSize: "md",
        cParentForm: "",
        cInputStatus: this.inputStatus,
        cStyle: "text-align: justify;",
      },
    }
  },
  computed: {
    inputStatus() {
      this.$validator.pause()
      this.$nextTick(() => {
        this.$validator.errors.clear(this.prop.cParentForm)
        this.$validator.resume()
      })
      
      return this.prop.cInputStatus.toLowerCase()
    },
  },
  methods: {
    showPdf() {
      window.open(this.url + this.attachmentUrlFile, "_blank");
    },
    Onchat_toChange(data) {
      this.$nextTick(() => {
        this.chat_to = data;
      });
    },
    doSendEmail() {
      let param = {
        portfolio_id: this.getDataUser().portfolio_id,
        subportfolio_id: this.getDataUser().subportfolio_id,
        to: this.to,
        cc: this.cc,
        subject: this.subject,
        body: this.replaceAllString(this.bodyMessage, "\n", "<br>", "string"),
        doc_type: this.prop.doc_type,
        doc_no: this.prop.doc_no,
        user_id: this.getDataUser().user_id,
        attachment_string: '',
        path_attachment: this.attachmentUrlFile,
      };

      this.postJSON(this.sendEmail(), param).then((response) => {
        if (response == null) return;
        this.$refs.Modal_Email._hide();
      });
    },
    _show(data) {
      let openHtml = '<!DOCTYPE html> <head><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous"> <script defer src="http://acc.api.absoluteconnection.co.id:1002/svg-with-js/js/fontawesome-all.min.js"><\/script> </head> <body style="margin: 20px;">';
      let closeHtml = "</body><html>";
      let param = {
        subject: data.doc_no,
        BodyHTML: openHtml + data.attachmentHtml + closeHtml,
      };

      this.postJSON(this.getUrlGeneratePDF(), param).then((response) => {
        if (response == null) return;
        this.attachmentUrlFile = response.Data.DbPath;
        this.$refs.Modal_Email._show();
      });
    },
    _hide() {
      this.$refs.Modal_Email._hide();
    },
  },
  watch: {
    prop: function(newValue, oldValue) {
      this.to = newValue.to;
      this.cc = newValue.cc;
      this.subject = newValue.subject;
      this.bodyMessage = newValue.bodyMessage;
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