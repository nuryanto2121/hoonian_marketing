<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>{{title}} Broker Group</span>
                </b-col>
                <b-col style="text-align: right;">
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
              <b-form :data-vv-scope="'FormEntry'" :data-vv-value-path="'FormEntry'">
                <b-row>
                  <b-col md="2">
                    <div>
                      <img :src="require('@/assets/paper.png')" alt style="width: 70px;" />
                    </div>
                  </b-col>
                  <b-col md="10">
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color:red;">* </span>Broker Group</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_broker_group"
                          v-model="Model.broker_group_name"
                          ref="ref_broker_group"
                        />
                      </b-col>
                      <b-col style="text-align: right;" v-show="inputStatus=='edit'">
                        {{Model.user_edit}} <br>
                        {{momentUnix(Model.updated_at, "DD MMM YYYY")}}
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color:red;">* </span>Broker Group Admin</label>
                        </span>
                        <HOODropDown
                          @change="Onbroker_group_adminChange"
                          :prop="PI_broker_group_admin"
                          v-model="Model.broker_group_admin"
                          :label="Model.broker_group_adminLabel"
                          ref="ref_action"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Description</label>
                        </span>
                        <ACCTextArea
                          :prop="PI_description"
                          v-model="Model.description"
                          ref="ref_description"
                        />
                      </b-col>
                    </b-row>

                    <b-row style="margin-top: 10px;">
                      <b-col md="6">
                        <ABSButton
                          :text="'Save'"
                          classButton="btn btn--default"
                          classIcon="icon-style-default"
                          @click="doSave"
                          styleButton="height: 40px;width: 100%;"
                        />
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
      title: "",

      MasterPrincipleList_propList: {
        url: '/api/hoonian-website/principle-master-list',
        initialWhere: '',
        SortField: '',
        SortBy: '',
        ParamWhere: '',
      },
      
      MasterPrincipleListHeader: [
        {
          key: "principle_name",
          label: "Principle Name",
          tdClass: "ContentACCList2 notranslate",
          thClass: "HeaderACCList2 L th-cus-center"
        },
        {
          key: "principle_admin",
          label: "Principle Admin",
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 L th-cus-center"
        },
        {
          key: "last_open_blocked_date",
          label: "Last Open Blocked Date",
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 L th-cus-center"
        },
      ],

      Model: {
        broker_group_name: "",
        broker_group_admin: "",
        broker_group_adminLabel: "",
        mobile_app_user_id: "",
        description: "",
        principles: []
      },
      PI_broker_group: {
        cValidate: "required|max:100",
        cName: "Broker Group",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_broker_group_admin: {
        dataLookUp: {
          url: "/api/hoonian-website/broker-group-admin-lookup",
          param: {}
        },
        cValidate: "required",
        cName: "Broker Group Admin",
        ckey: false,
        cOrder: 2,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_description: {
        cValidate: "max:5000",
        cName: "description",
        cOrder: 3,
        cKey: false,
        cProtect: false,
        cResize: false,
        cReadonly: false,
        cRows: 1,
        cMaxRows: 3,
        cSize: "md",
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus
      },
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
    Onbroker_group_adminChange(data) {
      this.$nextTick(() => {
        this.Model.broker_group_admin = data.id;
        this.Model.broker_group_adminLabel = data.label;
      });
    },
    MasterPrincipleListClicked(record, index) {
      var param = this.paramFromList;
      param.MasterPrinciple = record;
      param.MasterPrinciple.isEdit = true;
      param.MasterPrinciple.isView = true;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "MK_MasterPricinpleForm" });
    },
    doBack() {
      this.$router.go(-1);
    },
    doEdit() {
      var param = record;
      param.isEdit = true;
      param.isView = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "MK_BrokerGroupView" });
    },
    M_ClearForm() {
      this.Model = {
        broker_group_name: "",
        broker_group_admin: "",
        broker_group_adminLabel: "",
        mobile_app_user_id: "",
        description: "",
        principles: []
      };
    },
    doSave() {
      this.$validator._base.validateAll("FormEntry").then((result) => {
        if (!result) return;
        this.alertConfirmation("Are You Sure Want To Save This Data ?").then(
          (ress) => {
            if (ress.value) {
              this.$validator.errors.clear("FormEntry");
              this.M_Save();
            }
          }
        );
      });
    },
    M_Save() {
      this.postJSON(this.urlHoonian + '/api/hoonian-website/broker-group-addedit', this.Model).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
    doDelete() {
      this.alertConfirmation("Are You Sure Want To Delete This Data ?").then(
        (ress) => {
          if (ress.value) {
            this.M_Delete();
          }
        }
      );
    },
    M_Delete() {
    },
    GetDataBy() {
      this.Model.broker_group_id = this.paramFromList.broker_group_id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/broker-group-detail', this.Model).then((response) => {
        if (response == null) return;
        let data = response.data.broker_group_detail;
        this.Model = data;
        // this.Model.broker_group_adminLabel = data.mobile_app_user_id;
        this.Model.broker_group_id = this.Model.id;
      });
    },
    OnActiveChange(data) {
      this.$nextTick(() => {
      });
    },
  },
  mounted() {
    this.M_ClearForm();
    if (this.inputStatus == "edit") {
      this.title = "Edit";
      this.GetDataBy();
    } else {
      this.title = "Add";
    }
  },
};
</script>

