<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>{{M_Quotation.subject}}</span>
                  <br />
                  {{M_Quotation.user_names}}
                </b-col>
                <b-col style="text-align: right;">
                  <ABSButton
                      v-show="viewDetailText !== null"
                      :text="viewDetailText"
                      classButton="button button--back"
                      classIcon="icon-style-1"
                      :disabled="false"
                      @click="viewDetail"
                    />
                  <ABSButton
                    :text="'Back'"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    @click="doBack"
                  />
                </b-col>
              </b-row>
            </div>
            <div class="card__body">
              <b-form :data-vv-scope="'MK_AddQuotation'" :data-vv-value-path="'MK_AddQuotation'">
                <b-row>
                  <b-col>
                    <b-row>
                      <div
                        id="chat-container"
                        style="width: 100%;height: 75vh;overflow: auto;margin-bottom: 10px;"
                      >
                        <b-col md="12">
                            <template v-for="(data,index) in ChatFill">
                              <div
                                v-bind:key="index"
                                :class="data.position == 'r' ? 'bubble-me me' : 'bubble-you you'"
                              >
                                <p>{{data.chat_text}}</p>
                                <span :style="data.position == 'r' ? 'float: left;' : 'float: right;'">{{momentDateFormatting(data.chat_date, "DD/MM/YYYY HH:mm")}}</span>
                                <span
                                  :class="data.position == 'r' ? 'time-right' : 'time-left'"
                                >{{ data.user_name }}</span>
                              </div>
                            </template>
                        </b-col>
                      </div>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <ACCTextBox @onEnterPress="doSendChat" :prop="PI_chat" v-model="M_Quotation.chat" ref="ref_chat" />
                        <span style="top: 10px; position: absolute; right: 10px;">
                          <font-awesome-icon
                            class="icon-style-default"
                            icon="paper-plane"
                            size="sm"
                            style="font-size: 17px;
                                margin-right: 10px;
                                margin-left: 10px;
                                cursor: pointer;"
                            @click="doSendChat"
                          />
                        </span>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-form>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      viewDetailText: "",
      M_Quotation: {
        chatid: "",
        subject: "",
        chat: "",
        user_names: ""
      },
      PI_chat: {
        cValidate: "",
        cName: "chat",
        cOrder: 12,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      ChatFill: [],
      timeout: null
    };
  },
  computed: {
    paramFromList() {
      var param = this.$store.getters.getParamPage2;
      if (param == null || param == undefined) {
        this.doBack();
      } else {
        if (Object.keys(param).length < 1) {
          this.doBack();
        } else {
          return param;
        }
      }
    }
  },
  methods: {
    doSendChat() {
      var param = {
        ss_chat_h_id: this.M_Quotation.chatid,
        chat_text: this.M_Quotation.chat,
        chat_date: new Date(),
        user_id_from: this.getDataUser().user_id,
        user_id_to: this.M_Quotation.chatfrom == this.getDataUser().user_id ? this.M_Quotation.chatto : this.M_Quotation.chatfrom,
        user_input: this.getDataUser().user_id
      }

      this.postJSON(this.getUrlAPIChat(), param).then(response => {
        if (response == null) return;
        this.ChatFill.push({
          position: "r",
          chat_date: new Date(),
          chat_text: this.M_Quotation.chat,
          user_id_from: this.getDataUser().user_id,
          user_name: this.getDataUser().user_name
        });
        this.M_Quotation.chat = ""
        this.setToBottom();
      });
    },
    doBack() {
      this.$router.go(-1);
    },
    setToBottom() {
      var divChat = this.$el.querySelector("#chat-container");
      this.$nextTick(() => {
        divChat.scrollTop = divChat.scrollHeight;
      });
    },
    GetChat() {
      var param = {
        row_id: this.paramFromList.row_id,
        portfolio_id: this.getDataUser().portfolio_id,
        subportfolio_id: this.getDataUser().subportfolio_id,
        doc_type: this.paramFromList.doc_type,
        doc_no: this.paramFromList.doc_no,
        current_page: 1,
        user_id_to: this.getDataUser().user_id,
      };

      this.postJSON(this.getUrlCheckChat(), param).then(response => {
        console.log(response);
        if (response == null) return;

        var data = response;
        var chatFill = data.Data.chat && data.Data.chat.length > 0 ? data.Data.chat : [];
        this.M_Quotation.chatid = data.Data.row_id
        this.M_Quotation.chatfrom = data.Data.user_from
        this.M_Quotation.chatto = data.Data.user_to
        this.M_Quotation.subject = data.Data.subject
        this.M_Quotation.user_names = data.Data.user_names
        this.ChatFill = [];
        var isUs = this.getDataUser().user_id;
        for (let i = 0; i < chatFill.length; i++) {
          this.ChatFill.push({
            position: chatFill[i].user_id_from == isUs ? "r" : "l",
            chat_date: chatFill[i].chat_date,
            chat_text: chatFill[i].chat_text,
            user_id_from: chatFill[i].user_id_from,
            user_name: chatFill[i].user_name
          });
        }
        
        this.setToBottom();
        this.LoopChat();
      });
    },
    GetNewChat() {
      var param = {
        id: this.M_Quotation.chatid,
        user_id: this.getDataUser().user_id
      };

      this.getJSON(this.getUrlAPIChat(), param).then(response => {
        // response from API
        console.log(response);
        if (response == null) return;

        var data = response;
        var chatFill = data.Data && data.Data.chat.length > 0 ? data.Data.chat : [];
        for (let i = 0; i < chatFill.length; i++) {
          this.ChatFill.push({
            position: "l",
            chat_date: chatFill[i].chat_date,
            chat_text: chatFill[i].chat_text,
            user_id_from: chatFill[i].user_id_from,
            user_name: chatFill[i].user_name
          });
        }

        this.setToBottom();
        this.LoopChat();
      });
    },
    LoopChat() {
      this.timeout = setTimeout(() => {
        this.GetNewChat();
      }, 10 * 1000);
    },
    viewDetail() {
      this.$router.push({name: this.paramFromList.url_view_detail});
    }
  },
  mounted() {
    switch (this.paramFromList.doc_type) {
      case 'Q':
        this.viewDetailText = 'View Quotation No.' + this.paramFromList.doc_no;
      break;
      case 'O':
        this.viewDetailText = 'View Order No.' + this.paramFromList.doc_no;
      break;
      case 'B':
        this.viewDetailText = 'View Open Bidding No.' + this.paramFromList.doc_no;
      break;
      case 'V':
        this.viewDetailText = 'View Vendor No.' + this.paramFromList.doc_no;
      break;
      case 'IC':
        this.viewDetailText = 'Invoice Customer No.' + this.paramFromList.doc_no;
      break;
      case 'IV':
        this.viewDetailText = 'Invoice Vendor No.' + this.paramFromList.doc_no;
      break;
      case 'RC':
        this.viewDetailText = 'Receipt Customer No.' + this.paramFromList.doc_no;
      break;
      case 'PV':
        this.viewDetailText = 'Payment Vendor No.' + this.paramFromList.doc_no;
      break;
      default:
        this.viewDetailText = null
    }
    this.GetChat();
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  }
};
</script>

<style scoped>
p {
  margin-top: 0px !important;
  margin-bottom: 0px !important;
  text-align: justify;
}

/* New */
.chat {
  /* width: 620px; */
}

.bubble-me {
  background-color: rgb(74, 147, 179);
  border-radius: 5px;
  box-shadow: 0 0 6px #b2b2b2;
  display: inline-block;
  padding: 10px 18px;
  position: relative;
  vertical-align: top;
  width: 50%;
}

.bubble-me::before {
  background-color: rgb(74, 147, 179);
  content: "\00a0";
  display: block;
  height: 16px;
  position: absolute;
  top: 11px;
  transform: rotate(29deg) skew(-35deg);
  -moz-transform: rotate(29deg) skew(-35deg);
  -ms-transform: rotate(29deg) skew(-35deg);
  -o-transform: rotate(29deg) skew(-35deg);
  -webkit-transform: rotate(29deg) skew(-35deg);
  width: 20px;
}

.bubble-you {
  background-color: #f2f2f2;
  border-radius: 5px;
  box-shadow: 0 0 6px #b2b2b2;
  display: inline-block;
  padding: 10px 18px;
  position: relative;
  vertical-align: top;
  width: 50%;
}

.bubble-you::before {
  background-color: #f2f2f2;
  content: "\00a0";
  display: block;
  height: 16px;
  position: absolute;
  top: 11px;
  transform: rotate(29deg) skew(-35deg);
  -moz-transform: rotate(29deg) skew(-35deg);
  -ms-transform: rotate(29deg) skew(-35deg);
  -o-transform: rotate(29deg) skew(-35deg);
  -webkit-transform: rotate(29deg) skew(-35deg);
  width: 20px;
}

.me {
  float: right;
  margin: 5px 20px 5px 45px;
  color: white;
}

.me::before {
  box-shadow: 2px -2px 2px 0 rgba(178, 178, 178, 0.4);
  right: -9px;
}

.you {
  float: left;
  margin: 5px 45px 5px 20px;
}

.you::before {
  box-shadow: -2px 2px 2px 0 rgba(178, 178, 178, 0.4);
  left: -9px;
}

.time-right {
  float: right;
  color: white;
}

.time-left {
  float: left;
  color: black;
}
</style>