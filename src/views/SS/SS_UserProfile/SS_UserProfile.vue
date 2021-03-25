<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>Profile</span>
                </b-col>
                <b-col style="text-align: right;">
                  <ABSButton
                    :text="'Change Password'"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    @click="doChangePassword"
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
              <b-form :data-vv-scope="'parent'" :data-vv-value-path="'parent'">
                <b-row>
                  <b-col md="2">
                    <div class="image">
                      <img
                        :src="M_UserProfile.path_file"
                        alt
                        style="width: 100%; border-radius: 50px;"
                      />
                    </div>
                  </b-col>
                  <b-col md="10">
                    <b-row class="row-view">
                      <b-col>
                        <span>
                          <label>Name</label>
                        </span>
                        <br />
                        <span>
                          <label>{{M_UserProfile.user_name}}</label>
                        </span>
                      </b-col>
                    </b-row>
                    <b-row class="row-view">
                      <b-col>
                        <span>
                          <label>Job Title</label>
                        </span>
                        <br />
                        <span>
                          <label>{{M_UserProfile.job_title}}</label>
                        </span>
                      </b-col>
                    </b-row>
                    <b-row class="row-view">
                      <b-col>
                        <span>
                          <label>Address</label>
                        </span>
                        <br />
                        <span>
                          <label>{{M_UserProfile.address}}</label>
                        </span>
                      </b-col>
                    </b-row>
                    <b-row class="row-view">
                      <b-col>
                        <span>
                          <label>Email</label>
                        </span>
                        <br />
                        <span>
                          <label>{{M_UserProfile.email}}</label>
                        </span>
                      </b-col>
                    </b-row>
                    <b-row class="row-view">
                      <b-col>
                        <span>
                          <label>Phone No.</label>
                        </span>
                        <br />
                        <span>
                          <label>{{M_UserProfile.phone_no}}</label>
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
      <div class="dashboard-page-chart__body">
        <b-row class="dashboardBody">
          <b-col md="12">
            <ACCList4
              :prop="propList"
              :title="'Shorcut Menu'"
              @rowClicked="rowClicked"
              @rowDblClicked="doDoubleClick"
              ref="ref_OpCostType"
              urlAdd="SS_UserShorcutForm"
              WithDeleteButton
              @buttonDeleteClicked="doDeleteClick"
              SearchDisabled
              ButtonBackDisabled
            />
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      propList: {
        OptionUrl: "/SS/SS_Shortcut",
        initialWhere:
          "ss_portfolio_id='" + this.getDataUser().portfolio_id + "' AND user_id='" + this.getDataUser().user_id + "'",
        LineNo: 0,
        PageLevel: 1,
        TabIndex: 1,
        OrderBy: "row_no ASC",
        SourceField: "",
        ParamView: "",
      },
      M_UserProfile: {
        user_name: "",
        address: "",
        phone_no: "",
        email: "",
        website: "",
        job_title: "",
        path_file: "",
      },
      M_GetDataBy: null,
    };
  },
  computed: {
    paramFromList() {
      var param = this.$route.params;
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
    rowClicked(record, index) {
      this.doViewClick(record, index);
    },
    doViewClick(record, index) {
      var param = record;
      param.isEdit = true;
      param.isView = true;
      console.log("doViewClick", param);
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "SS_UserShorcutForm" });
    },
    doDoubleClick(record, index) {},
    doDeleteClick(record, index) {
      this.alertConfirmation("Are You Sure Want To Delete This Data ?").then(
        (ress) => {
          if (ress.value) {
            this.M_Delete(record, index);
          }
        }
      );
    },
    M_Delete(record, index) {
      let param = {
          option_function_cd: "DelFavoriteMenu",
          module_cd: "SS",
          ss_portfolio_id: this.getDataUser().portfolio_id,
          user_id: this.getDataUser().user_id,
          ss_menu_id: record.ss_menu_id,
      };
      
      this.CallFunction(param).then(response => {
        if (response == null) return

        localStorage.lsShortcutMenu = JSON.stringify(response.Data);
        this.$store.commit("setFavoriteMenu", this.getShortcitMenu());
        this.$refs.ref_OpCostType.doGetList("");
      })
    },
    doChangePassword() {
      this.$router.push({ name: "SS_UserChangePassword" });
    },
    doBack() {
      this.$router.go(-1);
    },
    doEdit() {},

    GetDataBy() {
      var param = {
        option_function_cd: "GetUserInfo",
        module_cd: "SS",
        user_id: this.getDataUser().user_id,
      };

      this.CallFunction(param).then((response) => {
        // response from API
        if (response == null) return;

        var data = response.Data[0];
        this.M_GetDataBy = data;

        this.M_UserProfile = {
          user_name: data.user_name,

          address: data.address,
          phone_no: data.hand_phone,
          email: data.email,
          job_title: data.job_title,

          // path_file: this.url + data.path_file
        };
        if (data.path_file == "" || data.path_file == null) {
          this.M_UserProfile.path_file = require("@/assets/default_photo_.png");
        } else {
          this.M_UserProfile.path_file = this.url + data.path_file;
        }

        this.$refs.ref_OpCostType.doGetList("");
      });
    },
  },
  mounted() {
    this.GetDataBy();
  },
  beforeMount() {},
};
</script>

<style>
</style>