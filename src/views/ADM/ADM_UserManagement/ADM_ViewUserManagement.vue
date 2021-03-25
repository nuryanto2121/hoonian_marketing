<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important">
                  <span>User Management</span>
                </b-col>
                <b-col style="text-align: right">
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
              <b-form
                :data-vv-scope="'MK_AddQuotation'"
                :data-vv-value-path="'MK_AddQuotation'"
              >
                <b-row>
                  <b-col md="2" style="text-align: center">
                    <div>
                      <img :src="M_UserManagement.path_file" alt width="100%" />
                    </div>
                  </b-col>
                  <b-col md="10">
                    <b-row>
                      <b-col md="12">
                        <b-row>
                          <b-col>
                            <span>
                              <label style="font-size: 15px; color: blue">{{
                                M_UserManagement.user_name
                              }}</label>
                            </span>
                          </b-col>
                          <b-col style="text-align: right">
                            <span>
                              <ABSButton
                                :text="'Edit'"
                                classButton="btn btn--default"
                                classIcon="icon-style-1"
                                @click="doEdit"
                              />
                            </span>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col
                            style="max-width: max-content !important; margin-right: 20px; padding-bottom: 5px"
                            class="row-view"
                          >
                            <span>
                              <label style="margin-bottom: 0px !important;">Status</label>
                            </span>
                            <br />
                            <span style="color: #999999;">{{ M_UserManagement.is_inactive }}</span>
                          </b-col>
                          <b-col
                            style="max-width: max-content !important; margin-right: 20px; padding-bottom: 5px"
                            class="row-view"
                          >
                            <span>
                              <label style="margin-bottom: 0px !important;">Handphone</label>
                            </span>
                            <br />
                            <span style="color: #999999;">{{ M_UserManagement.hand_phone }}</span>
                          </b-col>
                          <b-col
                            style="max-width: max-content !important; margin-right: 20px; padding-bottom: 5px"
                            class="row-view"
                          >
                            <span>
                              <label style="margin-bottom: 0px !important;">Address</label>
                            </span>
                            <br />
                            <span
                              style="color: #999999;"
                            >{{ M_UserManagement.fulladdress}}</span>
                          </b-col>
                          <b-col
                            style="max-width: max-content !important; margin-right: 20px; padding-bottom: 5px"
                            class="row-view"
                          >
                            <span>
                              <label style="margin-bottom: 0px !important;">Role</label>
                            </span>
                            <br />
                            <span style="color: #999999;">{{ M_UserManagement.role }}</span>
                          </b-col>
                          <b-col style="text-align: right;">
                            {{M_UserManagement.user_name_label}} <br>
                            {{momentDateFormatting(new Date(M_UserManagement.time_edit), "DD MMM YYYY")}}
                          </b-col>
                        </b-row>

                        <b-row>
                          <b-col
                            style="max-width: max-content !important; margin-right: 20px; padding-bottom: 5px"
                            class="row-view"
                          >
                            <span>
                              <label style="margin-bottom: 0px !important;">Email</label>
                            </span>
                            <br />
                            <span style="color: #999999;">{{ M_UserManagement.email }}</span>
                          </b-col>
                          <b-col
                            style="max-width: max-content !important; margin-right: 20px; padding-bottom: 5px"
                            class="row-view"
                          >
                            <span>
                              <label style="margin-bottom: 0px !important;">Job Title</label>
                            </span>
                            <br />
                            <span
                              style="color: #999999;"
                            >{{ M_UserManagement.job_title}}</span>
                          </b-col>
                          <b-col
                            style="max-width: max-content !important; margin-right: 20px; padding-bottom: 5px"
                            class="row-view"
                          >
                            <span>
                              <label style="margin-bottom: 0px !important;">Notes</label>
                            </span>
                            <br />
                            <span style="color: #999999;">{{ M_UserManagement.notes }}</span>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <div class="card">
                          <div class="card__title">
                            <b-row>
                              <b-col style="max-width: max-content !important;">
                                <span>Portfolio</span>
                              </b-col>
                            </b-row>
                          </div>
                          <div class="card__body">
                            <b-table
                              :responsive="true"
                              :striped="true"
                              :bordered="true"
                              :outlined="false"
                              :small="false"
                              :hover="false"
                              :dark="false"
                              :fixed="false"
                              :foot-clone="false"
                              :fields="PortfolioHeader"
                              :items="PortfolioItems"
                              class="table-sm table-style-3"
                              thStyle="padding: 5px !important;"
                            >
                              <template v-slot:cell(is_assign)="data">
                                <div style="margin-left: 20px;">
                                  <b-form-checkbox
                                    v-model="data.item.is_assign"
                                    :name="'is_assign_' + data.item.row_id"
                                    size="md"
                                    @input="onChangeAssign(data.item)"
                                  />
                                </div>
                              </template>
                              <template v-slot:cell(is_default)="data">
                                <div style="margin-left: 20px;">
                                  <b-form-checkbox
                                    :disabled="!data.item.is_assign"
                                    v-model="data.item.is_default"
                                    :name="'is_default_' + data.item.row_id"
                                    size="md"
                                    @input="onChangeDefault(data.item, data.index)"
                                  />
                                </div>
                              </template>
                              <template v-slot:cell(row_id)="data">
                                <ABSButton
                                  text="Assign Menu"
                                  classButton="btn btn--default"
                                  classIcon="icon-style-default"
                                  @click="doPortfolio(data.item)"
                                />
                              </template>
                            </b-table>
                            <ABSButton
                              :text="'Save'"
                              classButton="btn btn--default"
                              classIcon="icon-style-default"
                              @click="doSave"
                              styleButton="height: 40px;width: 100%;"
                            />
                          </div>
                        </div>
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
      M_UserManagement: {
        path_file: require("@/assets/default_photo_.png"),
        user_name: "",
        ss_group_id: "",
        hand_phone: "",
        fulladdress: "",
        email: "",
        role: "",
        job_title: "",
        notes: "",
        is_inactive: "",
        dashboard_url: "",
      },
      default_pic: require("@/assets/default_photo_.png"),

      PortfolioHeader: [
        {
          key: "row_number",
          label: "No",
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 th-cus-center",
        },
        {
          key: "name",
          label: "Name",
          tdClass: "notranslate",
          thClass: "HeaderACCList2 S th-cus-center",
        },
        {
          key: "email",
          label: "Email",
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 S th-cus-center",
        },
        {
          key: "phone_no",
          label: "Phone No",
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 S th-cus-center",
        },
        {
          key: "is_assign",
          label: "Assign",
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 S th-cus-center",
        },
        {
          key: "is_default",
          label: "Default",
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 S th-cus-center",
        },
        {
          key: "row_id",
          label: "",
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 S th-cus-center",
        },
      ],
      PortfolioItems: [],
      lastIndexDefault: -1,
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
    ButtonStatus() {
      return this.$store.getters.getButtonStatus;
    },
  },
  methods: {
    onChangeAssign(data) {
      if (!data.is_assign)
        data.is_default = false;
      console.log(data);
    },
    onChangeDefault(data, index) {
      if (data.is_default) {
        this.PortfolioItems[this.lastIndexDefault].is_default = false;
        this.lastIndexDefault = index;
      }
    },
    doSave() {
      this.alertConfirmation("Are You Sure Want To Save This Data ?").then(
        (ress) => {
          if (ress.value) {
            this.$validator.errors.clear("ADM_AddUserManagement");
              this.M_Save();
          }
        }
      );
    },
    M_Save() {
      let paramU = {
        _Method_: "UPDATE",
        _LineNo_: 0,
        ss_user_id: this.paramFromList.row_id,
        ss_portfolio_id: 0
      };
      this.PortfolioItems.forEach((data, index) => {
        if (!data.is_default) return
        paramU.ss_portfolio_id = data.ss_portfolio_id
      });

      let paramD = {
        _Method_: "DELETE",
        _LineNo_: 0,
        user_id: this.M_UserManagement.user_id
      };

      let paramI = [];
      this.PortfolioItems.forEach((data, index) => {
        if (!data.is_assign) return
        paramI.push({
          _Method_: "SAVE",
          _LineNo_: 0,

          user_id: this.M_UserManagement.user_id,
          ss_portfolio_id: data.ss_portfolio_id,
          user_input: this.getDataUser().user_id
        });
      });

      if (paramI.length == 0) {
        this.alertError("Select minimum 1 data Assign to save");
        return;
      }

      if (paramU.ss_portfolio_id == 0) {
        this.alertError("Select 1 data Default to save");
        return;
      }

      let param = {
        option_url: "/ADM/ADM_UserManagement",
        line_no: 0,
        Data: [
          {
            A_Update: paramU,
            B_Delete: paramD,
            C_Looping: paramI
          }
        ]
      };

      this.postJSONMulti(this.getUrlProsesDataPostMulti(), param).then(
        response => {
          if (response == null) return;
          this.getUser();
        }
      );
    },
    doPortfolio(record, index, event) {
      let param = record;
      param.row_id = this.paramFromList.row_id;
      param.user_id = this.paramFromList.user_id;

      this.$store.commit("setParamPage2", param);
      this.$router.push({ name: "ADM_DetailUserManagement" });
    },
    doDeleteList(record, index) {
      this.alertConfirmation("Are You Sure Want To Delete This Data ?").then(
        (ress) => {
          if (ress.value) {
            this.doDeletePortfolio(record, index);
          }
        }
      );
    },
    doDeletePortfolio(record, index) {
      var param = {
        option_url: "/ADM/ADM_UserManagement",
        line_no: 0,
        id: record.row_id,
        lastupdatestamp: record.lastupdatestamp,
      };

      this.deleteJSON(this.getUrlCRUD(), param).then((response) => {
        if (response == null) return;
        this.getUser();
      });
    },
    doBack() {
      this.$router.go(-1);
    },
    doEdit() {
      var param = this.paramFromList;
      param.isEdit = true;
      this.$router.push({ name: "ADM_AddUserManagement", params: param });
    },
    getUser() {
      let param = {
        option_function_cd: "GetUserExternal",
        module_cd: "SS",
        ss_user_id: this.paramFromList.row_id,
        ss_group_login: this.getDataUser().group_id,
      };

      this.CallFunction(param).then((response) => {
        if (response == null) return;
        let data = JSON.parse(response.Data[0].fss_user_external_s)[0];
        console.log(data);

        this.M_UserManagement = {
          user_name: data.user_name,
          ss_group_id: data.ss_group_id,
          hand_phone: data.hand_phone,
          fulladdress: data.address,
          email: data.email,
          role: data.group_descs,
          notes: data.notes,
          job_title: data.job_title,
          path_file:
            data.path_file && data.path_file !== ""
              ? this.url + data.path_file
              : this.default_pic,
          is_inactive:
            data.is_inactive == "N"
              ? "Active"
              : "In Active",
          dashboard_url: data.dashboard_url,
          time_edit: data.time_edit,
          user_id: data.user_id
        };
        this.PortfolioItems = data.detail_portfolio;
        this.PortfolioItems.forEach((dt, index) => {
          if (dt.is_default) {
            this.lastIndexDefault = index;
            return;
          }
        });

        this.getUserInfo(data.user_edit).then((response) => {
          if (response == null) return;
          this.M_UserManagement.user_name_label = response.user_name;
          this.$forceUpdate();
        });
      });
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style scoped>
.list:hover {
  color: #0056b3;
  text-decoration: underline;
}
</style>