<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important">
                  <span>{{ title }} Marketing Agent Group</span>
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
                :data-vv-scope="'FormEntry'"
                :data-vv-value-path="'FormEntry'"
              >
                <b-row>
                  <b-col md="2">
                    <div>
                      <img
                        :src="require('@/assets/paper.png')"
                        alt
                        style="width: 70px"
                      />
                    </div>
                  </b-col>
                  <b-col md="10">
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label
                            ><span style="color: red">* </span>Marketing
                            Group</label
                          >
                        </span>
                        <ACCTextBox
                          :prop="PI_marketing_group"
                          v-model="Model.marketing_group"
                          ref="ref_marketing_group"
                        />
                      </b-col>
                      <b-col
                        style="text-align: right"
                        v-show="inputStatus == 'edit'"
                      >
                        {{ Model.user_edit }} <br />
                        {{ momentUnix(Model.updated_at, "DD MMM YYYY") }}
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
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label
                            ><span style="color: red">* </span>Priority</label
                          >
                        </span>
                        <ACCDropDown
                          @change="OnPriorityChange"
                          :prop="PI_priority"
                          v-model="Model.priority"
                          :label="Model.priorityLabel"
                          ref="ref_priority"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <span style="color: red">* </span
                          ><label> Sales Lead Multiplier</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_sales_lead_multiplier"
                          v-model="Model.sales_lead_multiplier"
                          ref="ref_sales_lead_multiplier"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <span style="color: red">* </span
                          ><label> Monthly Sales Lead</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_monthly_sales_lead"
                          v-model="Model.monthly_sales_lead"
                          ref="ref_monthly_sales_lead"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <span style="color: red">* </span
                          ><label> Monthly Sales Target</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_monthly_sales_target"
                          v-model="Model.monthly_sales_target"
                          ref="ref_monthly_sales_target"
                        />
                      </b-col>
                    </b-row>

                    <b-row style="margin-top: 10px">
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
        user_id: "",
        marketing_agent_group_id: "",
        project_id: "",
        marketing_group: "",
        priority: 0,
        description: "",
        sales_lead_multiplier: 0,
        monthly_sales_lead: 0,
        monthly_sales_target: 0,
      },
      PI_marketing_group: {
        cValidate: "required|max:100",
        cName: "marketing_group name",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_description: {
        cValidate: "max:1000",
        cName: "description",
        cOrder: 2,
        cKey: false,
        cProtect: false,
        cResize: false,
        cReadonly: false,
        cRows: 1,
        cMaxRows: 3,
        cSize: "md",
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus,
      },
      PI_priority: {
        dataLookUp: null,
        cValidate: "required",
        cName: "priority",
        ckey: false,
        cOrder: 11,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: true,
        cOption: [
          { id: 1, label: "1" },
          { id: 2, label: "2" },
          { id: 3, label: "3" },
          { id: 4, label: "4" },
          { id: 5, label: "5" },
          { id: 6, label: "6" },
          { id: 7, label: "7" },
          { id: 8, label: "8" },
          { id: 9, label: "9" },
          { id: 10, label: "10" },
          // { id: "E", label: "Entertaintment" }
        ],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
      PI_sales_lead_multiplier: {
        cValidate: "required",
        cName: "sales_lead_multiplier",
        cOrder: 4,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_monthly_sales_lead: {
        cValidate: "required",
        cName: "monthly_sales_lead",
        cOrder: 4,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_monthly_sales_target: {
        cValidate: "required",
        cName: "monthly_sales_target",
        cOrder: 4,
        cKey: false,
        cType: "decimal",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
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
    doBack() {
      this.$router.go(-1);
    },
    M_ClearForm() {
      this.Model = {
        user_id: "adm",
        marketing_agent_group_id: "",
        project_id: this.getDataUser().project_id,
        marketing_group: "",
        priority: 1,
        description: "",
        sales_lead_multiplier: 0,
        monthly_sales_lead: 0,
        monthly_sales_target: 0,
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
      var param = {
        user_id: this.Model.user_id,
        marketing_agent_group_id: this.Model.marketing_agent_group_id,
        project_id: this.getDataUser().project_id,
        marketing_group: this.Model.marketing_group,
        description: this.Model.description,
        priority: this.Model.priority,
        sales_lead_multiplier: parseFloat(
          this.Model.sales_lead_multiplier
            ? this.replaceAllString(
                this.Model.sales_lead_multiplier,
                ",",
                "",
                "number"
              )
            : 0
        ),
        monthly_sales_lead: parseFloat(
          this.Model.monthly_sales_lead
            ? this.replaceAllString(
                this.Model.monthly_sales_lead,
                ",",
                "",
                "number"
              )
            : 0
        ),
        monthly_sales_target: parseFloat(
          this.Model.monthly_sales_target
            ? this.replaceAllString(
                this.Model.monthly_sales_target,
                ",",
                "",
                "number"
              )
            : 0
        ),
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/marketing-agent-group-addedit",
        param
      ).then((response) => {
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
    M_Delete() {},
    GetDataBy() {
      this.Model.marketing_agent_group_id = this.paramFromList.id;
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/marketing-agent-group-detail",
        this.Model
      ).then((response) => {
        if (response == null) return;
        this.Model = response.data.marketing_agent_group_detail;
        this.Model.marketing_agent_group_id = this.Model.id;
        this.Model.user_id = "adm"; // NEXT HAPUS
      });
    },
    OnPriorityChange(data) {
      this.$nextTick(() => {});
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

