
<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col>
                  <span>Notification</span>
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
                </b-col>
              </b-row>
            </div>
            <div class="card__body" style="padding-top:0px !important;">
              <template v-for="(data, index) in M_Notif">
                <b-row class="notification" v-bind:key="index">
                  <b-col style="margin: auto;">
                    <b-row style="cursor: pointer;" @click="onNotifClick(data)">
                      <b-col md="8">
                        <span
                          :class="'notification__descs' + (data.notification_status == 'Y' ? '-disabled' : '')"
                        >{{data.descs}}</span>
                      </b-col>
                      <b-col md="4">
                        <span class="notification__time">{{data.timestamp}}</span>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col class="notification__icon">
                    <span style="cursor: pointer;" @click="onDeleteNotif(data)">
                      <font-awesome-icon style="color: hsl(0, 100%, 40%);" icon="trash" size="lg" />
                    </span>
                  </b-col>
                </b-row>
              </template>
            </div>
            <div class="card__footer">
              <b-form inline style="float: left; color: #333;">
                <label
                  class="font-lbl"
                  style="margin-bottom:0px !important; margin-right:0px !important;"
                >Page Size</label>
                <b-form-select
                  id="cmbPerPage"
                  v-model="perPage"
                  v-on:input="getNotification"
                  :options="pagingData"
                  class="sm-3 mgn-left-10 font-lbl page-size-left"
                  :disabled="isDisableTable"
                ></b-form-select>
                of {{ this.totalRows }} Records
              </b-form>

              <b-pagination
                align="right"
                v-model="currentPage"
                @input="getNotification"
                :total-rows="totalRows"
                :per-page="perPage"
                :limit="limit"
                style="margin-bottom: 0px;"
                :disabled="isDisableTable"
              ></b-pagination>
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
        M_Notif: [],

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
        this.getNotification();
      },
      getNotification() {
        this.M_Notif = [];
        let param = {
          option_url: '/SS/SS_Notification',
          line_no: 0,
          user_id: this.getDataUser().user_id,
          portfolio_id: this.getDataUser().portfolio_id,
          subportfolio_id: this.getDataUser().subportfolio_id,
          current_page: this.currentPage,
          per_page: this.perPage,
          param_where: this.search,
          initial_where: "ss_portfolio_id='" + this.getDataUser().portfolio_id + "' AND user_id='" + this.getDataUser().user_id + "' AND notification_status!='D'",
          sort_field: 'notification_date DESC',
          source_field: '',
          param_view: ""
        };

        this.postJSON(this.getUrlList(), param).then(response => {
          if (response == null) return;

          this.totalRows = response.Total;
          this.lastPage = response.Last_Page;
          
          let data = response.Data;
          let now = this.momentDate(new Date());
          for (let i = 0; i < data.length; i++) {
            let x = data[i]
            let messageDate = data[i].notification_date;//.replace('+07:00', '').replace('T', ' ');
            
            if (now === this.momentDateFormatting(messageDate, "YYYY-MM-DD")) {
              x.timestamp = this.momentDateFormatting(data[i].notification_date, "HH:mm");
            } else {
              if (messageDate != null) {
                var dr = Math.abs(new Date() - new Date(data[i].notification_date))
                var days = Math.ceil(dr / (1000 * 60 * 60 * 24))
                var hours = Math.ceil(dr / (1000 * 60 * 60))
                var mins = Math.ceil(dr / (1000 * 60))
                var dates = this.momentDateFormatting(data[i].notification_date, "YYYY-MM-DD")
                
                x.timestamp = days && days > 0 ? (days + (days < 1 ? ' Day Ago' : ' Days Ago')) : (hours && hours > 0 && hours <= 24 ? (hours + (hours < 1 ? ' Hour Ago' : ' Hours Ago')) : (mins && mins > 0 && mins <= 60 ? (mins + (mins < 1 ? ' Minute Ago' : ' Minutes Ago')) : dates))
              }
            }
            this.M_Notif.push(x)
          }
        })
      },
      updateNotification(data) {
        var param = {
          option_function_cd: "UpdateNotifStatus",
          module_cd: "SS",
          ss_portfolio_id: this.getDataUser().portfolio_id,
          ss_notification_id: data.id,
          user_id: this.getDataUser().user_id,
          user_edit: this.getDataUser().user_id,
        };
        
        this.CallFunction(param).then(response => {
          if (response == null) return
          
          if (data.link_url != null)
            this.$router.push(data.link_url);
        })
      },
      onDeleteNotif(data) {
        this.alertConfirmation("Are You Sure Want To Delete This Notification ?").then(
        ress => {
          if (ress.value) {
            var param = {
              option_function_cd: "DelUserNotification",
              module_cd: "SS",
              row_id: data.row_id,
              lastupdatestamp: data.lastupdatestamp
            };
            
            this.CallFunction(param).then(response => {
              if (response == null) return
              this.getNotification();
            })
          }
        })
      },
      onNotifClick(data) {
        let param = data;
        param.lastupdatestamp = data.link_lastupdatestamp;
        param.id = data.row_id;
        param.row_id = data.link_id;
        param.isView = true;
        this.$store.commit("setParamPage", param);
        console.log(param)
        if (data.notification_status == 'Y')
          this.$router.push(param.link_url);
        else
          this.updateNotification(param);
      }
    },
    mounted() {
      this.getNotification();
    }
  };
</script>
  
  <style>
.container-refresh {
  float: right;
  color: #215b7d;
}
</style>