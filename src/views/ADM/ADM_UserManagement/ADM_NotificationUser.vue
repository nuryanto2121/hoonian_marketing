<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>User Management Notification</span>
                </b-col>
                <b-col style="text-align: right;">
                  <span>
                    <ABSButton
                      :text="'Back'"
                      classButton="button button--back"
                      classIcon="icon-style-1"
                      @click="$router.go(-1)"
                    />
                  </span>
                </b-col>
              </b-row>
            </div>
            <div class="card__body">
              <b-row>
                <b-col>
                  <span>User ID: {{paramFromList.user_id}}</span>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <ACCFormList
                    :prop="propList"
                    @rowClicked="rowClicked"
                    ref="ref_UserManagementNotification"
                  >
                    <template slot="is_access" slot-scope="data">
                      <b-form-checkbox
                        :id="'is_access_'+data.index"
                        :name="'is_access_'+data.index"
                        v-model="data.item.is_access"
                        :value="true"
                        :unchecked-value="false"
                        style="min-height:15px !important;padding-top:0px !important;"
                      />
                    </template>
                  </ACCFormList>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="6" offset="3">
                  <ABSButton
                    :text="'Save'"
                    classButton="btn btn--default"
                    classIcon="icon-style-default"
                    @click="doSave"
                    styleButton="height: 40px;width: 100%;"
                  />
                </b-col>
              </b-row>
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
      propList: {
        OptionUrl: "/ADM/ADM_NotificationUser",
        initialWhere: "",
        LineNo: 0,
        PageLevel: 1,
        TabIndex: 1,
        OrderBy: "ss_notification_mstr_id",
        SourceField: "",
        ParamView: "",
        PerPage: 1000,
      },
    };
  },
  computed: {
    paramFromList() {
      var param = this.$store.getters.getParamPage;
      if (param == null || param == undefined) {
        this.doBack();
      } else {
        if (Object.keys(param).length < 1) {
          this.doBack();
        } else {
          return param;
        }
      }
    },
  },
  methods: {
    doBack() {
      this.$router.go(-1);
    },
    doSave() {
      this.alertConfirmation("Are You Sure Want To Save This Data ?").then(
        (ress) => {
          if (ress.value) {
            this.M_Save();
          }
        }
      );
    },
    M_Save() {
      console.log(this.paramFromList);
      let items = this.$refs.ref_UserManagementNotification.items;
      var param_Delete = {
          _Method_: "DELETE",
          _LineNo_: 0,
          user_id: this.paramFromList.user_id,
          ss_portfolio_id: this.paramFromList.portfolio_id,
        },
        param_Save = [];

      for (let i = 0; i < items.length; i++) {
        if (items[i].is_access == true) {
          param_Save.push({
            _Method_: "SAVE",
            _LineNo_: 0,
            ss_portfolio_id: items[i].ss_portfolio_id,
            ss_notification_mstr_id: items[i].ss_notification_mstr_id,
            user_id: this.paramFromList.user_id,
            user_input: this.getDataUser().user_id,
          });
        }
      }

      var param = {
        option_url: "/ADM/ADM_NotificationUser",
        line_no: 2,
        Data: [
          {
            A_Delete: param_Delete,
            B_Looping: param_Save,
          },
        ],
      };

      this.postJSONMulti(this.getUrlProsesDataPostMulti(), param).then(
        (response) => {
          if (response == null) return;
          this.doBack();
        }
      );
    },
    rowClicked(record, index) {},
    doViewClick(record, index) {},
    doDoubleClick(record, index) {},
  },
  mounted() {
    this.propList.ParamView = "'" +
      this.getDataUser().portfolio_id + "','" +
      this.paramFromList.user_id + "'"

    this.$refs.ref_UserManagementNotification.doGetList("");
  },
};
</script>

<style>
</style>