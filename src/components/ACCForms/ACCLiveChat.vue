<template>
  <ABSModal id="Modal_Live_Chat" ref="Modal_Live_Chat" size="sm">
    <template slot="headerTitle">
      Live Chat
    </template>
    <template slot="content">
      <b-row>
        <b-col md="12">
          <b-form
            :data-vv-scope="'Chat_live'"
            :data-vv-value-path="'Chat_live'"
          >
            <b-row>
              <b-col md="12">
                <b-row>
                  <b-col md="12">
                    <span>
                      <label>Subject :</label>
                    </span>
                    <ACCTextBox
                      :prop="PI_subject"
                      v-model="subject"
                      ref="ref_subject" />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="12">
                    <span>
                      <label>Chat To :</label>
                    </span>
                    <ACCDropDown
                      @change="Onchat_toChange"
                      :prop="PI_chat_to"
                      v-model="chat_to"
                      ref="ref_chat_to"
                    />
                  </b-col>
                </b-row>
                <b-row style="margin-top: 10px;">
                  <b-col md="12">
                    <ABSButton
                      :text="'Start Chat'"
                      classButton="btn btn--default"
                      classIcon="icon-style-1"
                      @click="doStartChat"
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
      row_id: Number,
      doc_type: String,
      doc_no: String,
      url_view_detail: String
    },
  },
  data() {
    return {
      subject: "",
      doc_no: "",
      chat_to: [],

      PI_subject: {
        cValidate: "required",
        cName: "subject",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "Chat_live",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      PI_chat_to: {
        dataLookUp: {
          LookUpCd: "GetUser",
          ColumnDB: "ss_user_id",
          InitialWhere: "portfolio_id='" + this.getDataUser().portfolio_id + "' AND user_id<>'" + this.getDataUser().user_id + "'",
          ParamWhere: "",
          OrderBy: "",
          ParamView: "",
          SourceField: "",
          DisplayLookUp: "user_id,user_name,time_edit"
        },
        cValidate: "required",
        cName: "chat_to",
        ckey: false,
        cOrder: 3,
        cProtect: false,
        cParentForm: "Chat_live",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "user_id,user_name,time_edit",
        cInputStatus: this.inputStatus,
        multiple: true
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
    Onchat_toChange(data) {
      this.$nextTick(() => {
        this.chat_to = data;
      });
    },
    doStartChat() {
      let userIdTo = [];
      for (let x = 0; x < this.chat_to.length; x ++) {
        userIdTo.push(this.chat_to[x].user_id);
      }
      userIdTo = userIdTo.join(',');

      let paramSaveH = {
        portfolio_id: this.getDataUser().portfolio_id,
        subportfolio_id: this.getDataUser().subportfolio_id,
        subject: this.subject,
        user_id_to: userIdTo,
        user_id_from: this.getDataUser().user_id,
        doc_type: this.prop.doc_type,
        doc_no: this.doc_no,
        row_id: this.prop.row_id,
        current_page: 0,
        user_input: this.getDataUser().user_id,
        option_url: this.prop.option_url,
        line_no: 0,
        url_view_detail: this.prop.url_view_detail,
      };

      this.postJSON(this.getUrlSaveHeaderChat(), paramSaveH).then(response => {
        if (response == null) return;
        
        let param = {
          row_id: this.prop.row_id == 0 ? response.Data[0].row_ids : this.prop.row_id,          
          doc_type: this.prop.doc_type,
          doc_no: this.doc_no,
          url_view_detail: this.prop.url_view_detail
        }
        this.$store.commit("setParamPage2", param);
        this.$router.push({ name: 'SS_ChatDetail' });
      });
    },
    _show() {
      this.$refs.Modal_Live_Chat._show();
    },
    _hide() {
      this.$refs.Modal_Live_Chat._hide();
    },
  },
  watch: {
    prop: function(newValue, oldValue) {
      this.doc_no = newValue.doc_no == null || newValue.doc_no == undefined ? '' : newValue.doc_no
      switch (newValue.doc_type) {
        case 'Q':
          this.subject = 'Quotation No. ' + this.doc_no
          break;
        case 'O':
          this.subject = 'Order No. ' + this.doc_no
          break;
        case 'B':
          this.subject = 'Open Bidding No. ' + this.doc_no
          break;
        case 'V':
          this.subject = 'Vendor No. ' + this.doc_no
          break;
      }
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