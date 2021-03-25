<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>{{title}} Assign Principle</span>
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
                          <label><span style="color:red;">* </span>Principle Name</label>
                        </span>
                        <HOODropDown
                          @change="Onprinciple_nameChange"
                          :prop="PI_principle_name"
                          v-model="Model.principle_id"
                          :label="Model.principle_idLabel"
                          ref="ref_action"
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
                                <label><span style="color: red;">* </span>Broker Group Commission</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_broker_group_commission"
                                v-model="Model.broker_group_commission"
                                ref="ref_broker_group_commission"
                            />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="6">
                            <span>
                                <label><span style="color: red;">* </span>Principle Comission</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_principle_comission"
                                v-model="Model.principle_comission"
                                ref="ref_principle_comission"
                            />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="6">
                            <span>
                                <label><span style="color: red;">* </span>Marketing Agent Comission</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_marketing_agent_comission"
                                v-model="Model.marketing_agent_comission"
                                ref="ref_marketing_agent_comission"
                            />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="6">
                            <span>
                                <label><span style="color: red;">* </span>Principle Cancel Limit</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_principle_cancel_limit"
                                v-model="Model.principle_cancel_limit"
                                ref="ref_principle_cancel_limit"
                            />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="6">
                            <span>
                                <label><span style="color: red;">* </span>Marketing Agent Cancel Limit</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_marketing_agent_cancel_limit"
                                v-model="Model.marketing_agent_cancel_limit"
                                ref="ref_marketing_agent_cancel_limit"
                            />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="6">
                            <span>
                                <label><span style="color: red;">* </span>Cancellation Cumulative Days</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_cancellation_cumulative_days"
                                v-model="Model.cancellation_cumulative_days"
                                ref="ref_cancellation_cumulative_days"
                            />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="6">
                            <span>
                                <label><span style="color: red;">* </span>Maximum Principle Hold Unit</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_maximum_principle_hold_unit"
                                v-model="Model.maximum_principle_hold_unit"
                                ref="ref_maximum_principle_hold_unit"
                            />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="6">
                            <span>
                                <label><span style="color: red;">* </span>Maximum Marketing Agent Hold Unit</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_maximum_marketing_agent_hold_unit"
                                v-model="Model.maximum_marketing_agent_hold_unit"
                                ref="ref_maximum_marketing_agent_hold_unit"
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

      Model: {
        principle_assign_principle_id: "",
        principle_id: "",
        principle_idLabel: "",
        project_id: "",
        broker_group_commission: "0",
        principle_comission: "0",
        marketing_agent_comission: "0",
        principle_cancel_limit: "0",
        marketing_agent_cancel_limit: "0",
        cancellation_cumulative_days: "0",
        maximum_principle_hold_unit: "0",
        maximum_marketing_agent_hold_unit: "0",
        description: ""
      },
      PI_principle_name: {
        dataLookUp: {
          url: "/api/hoonian-website/principle-lookup",
          param: {}
        },
        cValidate: "required",
        cName: "Principle Name",
        ckey: false,
        cOrder: 1,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_broker_group_commission: {
        cValidate: "required",
        cName: "Broker Group Commission",
        cOrder: 2,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_principle_comission: {
        cValidate: "required",
        cName: "Principle Comission",
        cOrder: 3,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_marketing_agent_comission: {
        cValidate: "required",
        cName: "Marketing Agent Comission",
        cOrder: 4,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_principle_cancel_limit: {
        cValidate: "required",
        cName: "Principle Cancel Limit",
        cOrder: 5,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_marketing_agent_cancel_limit: {
        cValidate: "required",
        cName: "Marketing Agent Cancel Limit",
        cOrder: 6,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_cancellation_cumulative_days: {
        cValidate: "required",
        cName: "Cancellation Cumulative Days",
        cOrder: 7,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_maximum_principle_hold_unit: {
        cValidate: "required",
        cName: "Maximum Principle Hold Unit",
        cOrder: 8,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_maximum_marketing_agent_hold_unit: {
        cValidate: "required",
        cName: "Maximum Marketing Agent Hold Unit",
        cOrder: 9,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_description: {
        cValidate: "max:5000",
        cName: "description",
        cOrder: 10,
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
      if (param.ForAssignPrinciple.isEdit && param.ForAssignPrinciple.isEdit === true) {
        return "edit";
      } else {
        return "new";
      }
    },
  },
  methods: {
    doBack() {
      this.$router.go(-1);
    },
    Onprinciple_nameChange(data) {
        this.$nextTick(() => {
            this.Model.principle_id = data.id;
            this.Model.principle_idLabel = data.label;
        })
    },
    M_ClearForm() {
      this.Model = {
        principle_assign_principle_id: "",
        principle_id: "",
        principle_idLabel: "",
        project_id: "",
        broker_group_commission: "0",
        principle_comission: "0",
        marketing_agent_comission: "0",
        principle_cancel_limit: "0",
        marketing_agent_cancel_limit: "0",
        cancellation_cumulative_days: "0",
        maximum_principle_hold_unit: "0",
        maximum_marketing_agent_hold_unit: "0",
        description: ""
      }
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
        this.Model.project_id = this.paramFromList.id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/view-assign-principle-addedit', this.Model).then((response) => {
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
      this.Model.principle_assign_principle_id = this.paramFromList.ForAssignPrinciple.id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/view-assign-principle-detail', this.Model).then((response) => {
        if (response == null) return;
        let data = response.data.project_master_detail;
        this.Model = data;
        this.Model.principle_assign_principle_id = data.id;
        this.Model.broker_group_commission = data.broker_group_commission;
        this.Model.principle_comission = data.principle_comission;
        this.Model.marketing_agent_comission = data.marketing_agent_comission;
        this.Model.principle_cancel_limit = data.principle_cancel_limit;
        this.Model.marketing_agent_cancel_limit = data.marketing_agent_cancel_limit;
        this.Model.cancellation_cumulative_days = data.cancellation_cumulative_days;
        this.Model.maximum_principle_hold_unit = data.maximum_principle_hold_unit;
        this.Model.maximum_marketing_agent_hold_unit = data.maximum_marketing_agent_hold_unit;
        // this.Model.units = response.data.assign_units;
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

