<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important">
                  <span>Group Management Internal</span>
                </b-col>
                <b-col style="text-align: right">
                  <ABSButton
                    v-show="inputStatus == 'edit'"
                    :text="'Portfolio'"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    @click="addPortfolio"
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
              <b-form
                :data-vv-scope="'ADM_AddGroupManagement'"
                :data-vv-value-path="'ADM_AddGroupManagement'"
              >
                <b-row>
                  <b-col md="1">
                    <span>
                      <label><span style="color: red">*</span> Group</label>
                    </span>
                  </b-col>
                  <b-col md="2">
                    <ACCTextBox
                      :prop="PI_short_descs"
                      v-model="M_GroupManagement.short_descs"
                      ref="ref_short_descs"
                    />
                  </b-col>
                  <b-col md="4">
                    <ACCTextBox
                      :prop="PI_descs"
                      v-model="M_GroupManagement.descs"
                      ref="ref_descs"
                    />
                  </b-col>
                  <b-col style="text-align: right;" v-show="inputStatus=='edit'">
                    {{M_GroupManagement.user_name}} <br>
                    {{momentDateFormatting(new Date(M_GroupManagement.time_edit), "DD MMM YYYY")}}
                  </b-col>
                </b-row>
                <b-row class="row-view">
                  <b-col md="1">
                    <span>
                      <label><span style="color: red">*</span> Group Access</label>
                    </span>
                  </b-col>
                  <b-col md="7">
                    <ACCRadioButton
                      @input="onChangeGroupAccess"
                      :prop="PI_group_access"
                      v-model="M_GroupManagement.group_access"
                      ref="ref_group_access"
                    />
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
                          @row-clicked="doPortfolio"
                          thStyle="padding: 5px !important;"
                        >
                          <template v-slot:cell(row_id)="data">
                            <ABSButton
                              text="Assign Menu"
                              classButton="btn btn--default"
                              classIcon="icon-style-default"
                              @click="doPortfolio(data.item)"
                            />
                            <ABSButton
                              :icon="'trash'"
                              classButton="button button--delete"
                              classIcon="icon-style-1"
                              @click="doDeleteList(data.item, data.index)"
                            />
                          </template>
                        </b-table>
                      </div>
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="6" offset="3">
                    <ABSButton
                      :text="'Save Group Management Internal'"
                      classButton="btn btn--default"
                      classIcon="icon-style-default"
                      @click="doSave"
                      styleButton="height: 40px;width: 100%;"
                    />
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
      PI_short_descs: {
        cValidate: "required",
        cName: "short_descs",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "ADM_AddGroupManagement",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_descs: {
        cValidate: "required",
        cName: "descs",
        cOrder: 2,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "ADM_AddGroupManagement",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_group_access: {
        cValidate: "",
        cName: "group_access",
        cId: "rdbgroup_access",
        cRadioOptions: [
          { text: "Customer", value: "E" },
          { text: "Admin Hoonian", value: "I" },
        ],
        cRadioDefaultOption: "E",
        cOrder: 3,
        cProtect: false,
        cVisible:  true,
        cParentForm: 'ADM_AddGroupManagement',
        cInputStatus: 'new',
        cGroup: true
      },
      M_GroupManagement: {
        short_descs: "",
        descs: "",
        group_access: "E",
        group_access_saved: "E",
      },
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
          key: "row_id",
          label: "",
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 S th-cus-center",
        },
      ],
      PortfolioItems: [],
    };
  },
  computed: {
    paramFromList() {
      var param = this.$store.getters.getParamPage;
      return param;
    },
    inputStatus() {
      var param = this.$store.getters.getParamPage;
      if (param.isEdit && param.isEdit === true) {
        return "edit";
      } else {
        return "new";
      }
    },
  },
  methods: {
    onChangeGroupAccess(data) {
      // if (this.PortfolioItems != undefined) {
      //   if (this.PortfolioItems.length > 1 && this.M_GroupManagement.group_access == 'E') {
      //     this.alertError("Only 1 portfolio allow for customer").then(() => {
      //       this.M_GroupManagement.group_access = 'I';
      //     });
      //     return;
      //   }
      // }
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
        option_url: "/ADM/ADM_GroupManagementInternal",
        line_no: 1,
        id: record.row_id,
        lastupdatestamp: record.lastupdatestamp,
      };

      this.deleteJSON(this.getUrlCRUD(), param).then((response) => {
        if (response == null) return;
        this.GetDataBy();
      });
    },
    doPortfolio(record) {
      let param = {};
      param.DetailList = record;
      param.row_id = this.paramFromList.row_id;
      param.ss_group_id = this.paramFromList.row_id;
      param.group_access = this.M_GroupManagement.group_access_saved;

      this.$store.commit("setParamPage2", param);
      this.$router.push({ name: "ADM_DetailGroupManagementInternal" });
    },
    doBack() {
      this.$router.go(-1);
    },
    addPortfolio() {
      // if (this.PortfolioItems != undefined) {
      //   if (this.PortfolioItems.length > 0 && this.M_GroupManagement.group_access == 'E') {
      //     this.alertError("Only 1 portfolio allow for customer").then(() => {
      //     });
      //     return;
      //   }
      // }
      this.$router.push({ name: "ADM_AddPortfolioGroupManagementInternal" });
    },
    M_ClearForm() {
      this.M_GroupManagement = {
        short_descs: "",
        descs: "",
        group_access: "E",
        group_access_saved: "E"
      };
    },
    doSave() {
      this.$validator._base
        .validateAll("ADM_AddGroupManagement")
        .then((result) => {
          if (!result) return;
          this.alertConfirmation("Are You Sure Want To Save This Data ?").then(
            (ress) => {
              if (ress.value) {
                this.$validator.errors.clear("ADM_AddGroupManagement");
                // console.log(this.defaultDashboard)
                if (this.inputStatus == "edit") {
                  this.M_Update();
                } else {
                  this.M_Save();
                }
              }
            }
          );
        });
    },
    M_Save() {
      var param = {
        option_url: "/ADM/ADM_GroupManagementInternal",
        line_no: 0,
        ss_portfolio_id: this.getDataUser().portfolio_id,
        descs: this.M_GroupManagement.descs,
        short_descs: this.M_GroupManagement.short_descs,
        user_type: this.M_GroupManagement.group_access,
        dashboard_url: '',
        group_access: this.M_GroupManagement.group_access,
        user_input: this.getDataUser().user_id,
      };

      this.postJSON(this.getUrlCRUD(), param).then((response) => {
        if (response == null) return;
        
        let data = {
          row_id: response.Data[0].row_id,
          ss_group_id: response.Data[0].row_id,
          ss_portfolio_id: this.getDataUser().portfolio_id,
          isEdit: true,
        }
        this.$store.commit("setParamPage", data);
        this.init();
      });
    },
    GetDataBy() {
      var param = {
        option_url: "/ADM/ADM_GroupManagementInternal",
        line_no: 0,
        id: this.paramFromList.row_id,
        lastupdatestamp: 0,
      };

      this.getJSON(this.getUrlCRUD(), param).then((response) => {
        // response from API
        if (response == null) return;
        this.$store.commit("setStatusLoader", true);
        var data = JSON.parse(response.Data[0].fss_group_internal_s)[0];

        this.M_GroupManagement = {
          short_descs: data.short_descs,
          descs: data.descs,
          group_access: data.group_access,
          group_access_saved: data.group_access,
          time_edit: data.time_edit
        };

        this.getUserInfo(data.user_edit).then((response) => {
          if (response == null) return;
          this.M_GroupManagement.user_name = response.user_name;
          this.$forceUpdate();
        });

        this.PortfolioItems = data.detail_portfolio;

        setTimeout(() => {
          this.$store.commit("setStatusLoader", false);
        }, 3000);
      });
    },
    
    M_Update() {
      var param = {
        option_url: "/ADM/ADM_GroupManagementInternal",
        line_no: 0,
        ss_group_id: this.paramFromList.row_id,
        ss_portfolio_id: this.getDataUser().portfolio_id,
        descs: this.M_GroupManagement.descs,
        short_descs: this.M_GroupManagement.short_descs,
        dashboard_url: '',
        user_type: this.M_GroupManagement.group_access,
        group_access: this.M_GroupManagement.group_access,
        lastupdatestamp: 0,
        user_edit: this.getDataUser().user_id,
      };

      this.putJSON(this.getUrlCRUD(), param).then((response) => {
        // console.log(response)
        if (response == null) return;
        this.init();
      });
    },
    init() {
      this.M_ClearForm();
      if (this.inputStatus == "edit")
        this.GetDataBy();
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
.list:hover {
  color: #0056b3;
  text-decoration: underline;
}
</style>