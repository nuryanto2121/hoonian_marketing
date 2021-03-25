
<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col>
                  <span>Chat</span>
                </b-col>
                <b-col sm="5" style="text-align: right;">
                  <span>
                    <b-form-input
                      id="txtSearch"
                      v-model="search"
                      type="text"
                      placeholder="Search...."
                      v-shortkey.focus="['f1']"
                      class="text-field-search"
                      @keyup.enter.native="onSearchEnter"
                      autocomplete="off"
                      style="width:40% !important"
                    />
                    <span style="position: absolute; right: 12px; cursor: pointer;" @click="removeSearch">&times;</span>
                  </span>
                </b-col>
                <b-col sm="3" style="max-width: max-content !important;" class="col-right">
                  <ABSButton
                    :text="'Search'"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    @click="onSearchEnter"
                  />
                  <ABSButton
                    text="New Chat"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    :disabled="false"
                    @click="doChat"
                  />
                </b-col>
              </b-row>
            </div>
            <div class="card__body" style="padding-top:0px !important;">
              <template v-for="(data, index) in M_Chat">
                <b-row class="notification" v-bind:key="index">
                  <b-col style="margin: auto;">
                    <b-row style="cursor: pointer;" @click="onChatClick(data)">
                      <b-col sm="1">
                        <ABSAvatar v-if="data.doc_type=='Q'" :fullname="data.doc_type" color="red" size="54" />
                        <ABSAvatar v-else-if="data.doc_type=='O'" :fullname="data.doc_type" color="blue" size="54" />
                        <ABSAvatar v-else-if="data.doc_type=='B'" :fullname="data.doc_type" color="yellow" size="54" />
                        <ABSAvatar v-else-if="data.doc_type=='C'" :fullname="data.doc_type" color="green" size="54" />
                        <ABSAvatar v-else-if="data.doc_type=='V'" :fullname="data.doc_type" color="brown" size="54" />
                        <ABSAvatar v-else :fullname="data.doc_type" size="54" />
                      </b-col>
                      <b-col sm="9">
                        <b-row>
                          <p class="title-chat">{{data.subject}}</p>
                        </b-row>
                        <b-row>
                          <span
                          :class="'notification__descs' + (data.chat_status == 'R' ? '-disabled' : '')"
                          >{{data.last_massage}}</span>
                        </b-row>
                      </b-col>
                      <b-col sm="2">
                        <!-- <span style="cursor: pointer;" class="notification__time" @click="onDelete(data)">
                          <font-awesome-icon style="color: hsl(0, 100%, 40%);" icon="trash" size="lg" />
                        </span> -->
                        <span class="notification__time" style="margin-right: 10px;">{{data.timestampLabel}}</span>
                        <span v-show="data.is_read > 0" class="label label-primary notif"
                          style="background-color: rgb(74, 147, 179) !important; border-radius: 10px !important; margin-top: 30px; margin-right: 5px;"
                        >{{data.is_read}}</span>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </template>
              <div class="card__footer">
                <b-form inline style="float: left; color: #333;">
                  <label
                    class="font-lbl"
                    style="margin-bottom:0px !important; margin-right:0px !important;"
                  >Page Size</label>
                  <b-form-select
                    id="cmbPerPage"
                    v-model="perPage"
                    v-on:input="getListChat"
                    :options="pagingData"
                    class="sm-3 mgn-left-10 font-lbl page-size-left"
                    :disabled="isDisableTable"
                  ></b-form-select>
                  of {{ this.totalRows }} Records
                </b-form>

                <b-pagination
                  align="right"
                  v-model="currentPage"
                  @input="getListChat"
                  :total-rows="totalRows"
                  :per-page="perPage"
                  :limit="limit"
                  style="margin-bottom: 0px;"
                  :disabled="isDisableTable"
                ></b-pagination>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
    <ACCLiveChat :prop="propChat" ref="LiveChat" />
  </div>
</template>
  
<script>
  export default {
    data() {
      return {
        propChat: {
          row_id: 0,
          doc_type: "C",
          doc_no: "",
          option_url: "",
          line_no: 0,
          url_view_detail: "",
        },
        M_Chat: [],

        search: "",
        totalRows: 0,
        currentPage: 1,
        lastPage: 1,
        perPage: 8,
        limit: 2,
        pagingData: [
          { value: 8, text: "8" },
          { value: 20, text: "20" },
          { value: 50, text: "50" },
          { value: 100, text: "100" },
          { value: 500, text: "500" },
          { value: 1000, text: "1000" }
        ],
      }
    },
    methods: {
    removeSearch() {
      this.search = ""
      this.onSearchEnter("")
    },
      onSearchEnter(data) {
        this.getListChat();
      },
      doChat() {
        this.propChat = {
          row_id: 0,
          doc_type: "C",
          doc_no: this.momentDateFormatting(new Date(), "YYYY-MM-DDTHH:mm:ss.S"),
          option_url: "",
          line_no: 0,
          url_view_detail: "",
        },
        this.$refs.LiveChat._show();
      },
      getListChat() {
        this.M_Chat = [];
        let param = {
          option_url: '/SS/SS_Chat',
          line_no: 1,
          user_id: this.getDataUser().user_id,
          portfolio_id: this.getDataUser().portfolio_id,
          subportfolio_id: this.getDataUser().subportfolio_id,
          current_page: this.currentPage,
          per_page: this.perPage,
          param_where: this.search,
          initial_where: '',
          sort_field: 'last_message_date_sort DESC',
          source_field: '',
          param_view: "'" + this.getDataUser().portfolio_id + "','" + this.getDataUser().user_id + "'"
        };

        this.postJSON(this.getUrlList(), param).then(response => {
          if (response == null) return;

          this.totalRows = response.Total;
          this.lastPage = response.Last_Page;

          let data = response.Data;
          let now = this.momentDate(new Date());
          for (let i = 0; i < data.length; i++) {
            let x = data[i]
            let messageDate = data[i].last_message_date;
            
            if (now === this.momentDateFormatting(messageDate, "YYYY-MM-DD")) {
              x.timestampLabel = this.momentDateFormatting(data[i].last_message_date, "HH:mm");
            } else {
              if (messageDate != null) {
                var dr = Math.abs(new Date() - new Date(data[i].last_message_date))
                var days = Math.ceil(dr / (1000 * 60 * 60 * 24))
                var hours = Math.ceil(dr / (1000 * 60 * 60))
                var mins = Math.ceil(dr / (1000 * 60))
                var dates = this.momentDateFormatting(data[i].last_message_date, "YYYY-MM-DD")
                
                x.timestampLabel = days && days > 0 ? (days + (days < 1 ? ' Day Ago' : ' Days Ago')) : (hours && hours > 0 && hours <= 24 ? (hours + (hours < 1 ? ' Hour Ago' : ' Hours Ago')) : (mins && mins > 0 && mins <= 60 ? (mins + (mins < 1 ? ' Minute Ago' : ' Minutes Ago')) : dates))
              }
            }
            this.M_Chat.push(x)
          }
        });
      },
      onChatClick(data) {
        let param = {
          row_id: data.doc_row_id,
          lastupdatestamp: data.doc_lastupdatestamp,
          subject: data.subject,
        }
        let param2 = {
          row_id: data.doc_type == 'C' ? data.row_id : data.doc_row_id,
          doc_type: data.doc_type,
          doc_no: data.doc_no,
          url_view_detail: data.url_view_detail,
        }
        this.$store.commit("setParamPage", param);
        this.$store.commit("setParamPage2", param2);
        this.$router.push({ name: 'SS_ChatDetail' });
      },
      onDelete(data) {
        let param = "/" + data.ss_chat_h_id
        this.alertConfirmation("Are You Sure Want To Delete This Chat ?").then(
        ress => {
          if (ress.value) {
            this.deleteJSON(this.getUrlAPIDeleteChat() + param).then(response => {
              if (response == null) return;
              let data = response.Data;
              this.getListChat();
            });
          }
        })
      },
    },
    mounted() {
      this.getListChat();
    }
  };
</script>
  
<style>
.container-refresh {
  float: right;
  color: #215b7d;
}
.title-chat {
  font-size: 14px;
  font-weight: bold;
}
</style>