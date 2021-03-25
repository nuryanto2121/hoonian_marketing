<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important">
            <div class="card__title">
              <b-row class="title-primary">
                <b-col style="max-width: max-content !important">
                  <span>Unattended Re-Assignment</span>
                </b-col>
                <!-- <b-col class="col-right">
                    <span>
                        <b-form-input
                        id="txtSearch"
                        v-model="search"
                        type="text"
                        placeholder="Search...."
                        v-shortkey.focus="['f1']"
                        class="text-field-search font-poppins"
                        @keyup.enter.native="onSearchEnter"
                        autocomplete="off"
                        style="margin-bottom: 0px;"
                        ></b-form-input>
                        <span
                        style="position: absolute; right: 12px; cursor: pointer"
                        @click="removeSearch"
                        >&times;</span
                        >
                    </span>
                </b-col> -->
                <b-col class="col-right">
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
                  <b-col md="2" style="text-align: center;">
                    <div>
                      <font-awesome-icon class="icon-style-hoonian" icon="clipboard" size="8x" />
                    </div>
                  </b-col>
                  <b-col md="10">
                    <b-row>
                      <b-col md="12" class="col-right">
                        <div class="wrapper-last-edit">
                            <span>
                                {{momentUnix(Model.updated_at, "DD MMM YYYY")}}
                            </span>
                            <span>
                                &nbsp; &nbsp; &nbsp;
                            </span>
                            <span>
                                <b>{{Model.last_edit}}</b>
                            </span>
                        </div>
                        <ABSButton
                            text="Delete"
                            classButton="button button--new mgn"
                            styleButton="background-color: rgb(74, 147, 179); color: white;"
                            @click="onDelete"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="6">
                            <span>
                                <label class="lbl-bold poppins">Project Name</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_project_name"
                                v-model="Model.project_name"
                                ref="ref_project_name"
                            />
                        </b-col>
                        <b-col md="6">
                            <span>
                                <label class="lbl-bold poppins">Prospect Name</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_prospect_name"
                                v-model="Model.prospect_name"
                                ref="ref_prospect_name"
                            />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="6">
                            <span>
                                <label class="lbl-bold poppins">Last Contact Date</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_last_contact_date"
                                v-model="Model.last_contact_date"
                                ref="ref_last_contact_date"
                            />
                        </b-col>
                        <b-col md="6">
                            <span>
                                <label class="lbl-bold poppins">Days</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_days"
                                v-model="Model.days"
                                ref="ref_days"
                            />
                        </b-col>
                    </b-row>

                    <b-row>
                      <b-col md="12">
                            <HOOList
                                :prop="LogbookpropList"
                                :title="'Logbook'"
                                cClass="table-style-3_noAct"
                                ButtonBackDisabled
                                SearchDisabled
                                isPoppins
                                isHeaderFixed
                                noCard
                                ref="ref_logbook"
                                @onRenderData="LogbookDataRender"
                            >
                              <template slot="date" slot-scope="data">
                                {{momentUnix(data.item.date, "DD MMM YYYY")}}
                              </template>
                            </HOOList>
                      </b-col>
                    </b-row>
                    
                    <b-row>
                        <b-col md="6">
                            <span>
                                <label class="lbl-bold poppins">Current Marketing</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_current_marketing"
                                v-model="Model.current_marketing"
                                ref="ref_current_marketing"
                            />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="6">
                            <span>
                                <label class="lbl-bold poppins"> Re-Assign To </label>
                            </span>
                            <HOODropDown
                              @change="Onmarketing_idChange"
                              :prop="PI_marketing_id"
                              v-model="Model.marketing_id"
                              :label="Model.marketing_idLabel"
                              ref="ref_marketing_id"
                            />
                        </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label class="lbl-bold poppins"> Remarks </label>
                        </span>
                        <ACCTextArea
                            :prop="PI_remarks"
                            v-model="Model.remarks"
                            ref="ref_remarks"
                        />
                      </b-col>
                    </b-row>

                    <b-row style="margin-top: 10px">
                      <b-col md="6" offset-md="3">
                        <ABSButton
                          :text="'Confirmation'"
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
      search: "",

      Model: {
        id: "",
        project_id: "",
        project_name: "",
        source_id: "",
        sales_lead_id: "",
        marketing_agent_id: "",
        prospect_name: "",
        current_marketing: "",
        last_contact_date: "",
        days: "",
        last_edit: "",
        updated_at: "",
        marketing_id: "",
        marketing_idLabel: "",
        remarks: "",
      },
      LogbookItems: [],
      LogbookpropList: {
        url: "/api/hoonian-website/dashboard/operation-detail/sales-lead/logbook",
        initialWhere: "",
        SortField: "",
        SortBy: "desc",
        ParamWhere: "",
        param: {
            project_id: "",
            sales_lead_id: ""
        }
      },

      PI_project_name: {
        cValidate: "",
        cName: "project_name",
        cOrder: 9,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_prospect_name: {
        cValidate: "",
        cName: "prospect_name",
        cOrder: 9,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_last_contact_date: {
        cValidate: "",
        cName: "last_contact_date",
        cOrder: 9,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_days: {
        cValidate: "",
        cName: "days",
        cOrder: 9,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_current_marketing: {
        cValidate: "",
        cName: "current_marketing",
        cOrder: 9,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_marketing_id: {
        dataLookUp: {
          url: "/api/hoonian-website/internal-marketing-lookup",
          param: {
            project_id: ""
          }
        },
        cValidate: "required",
        cName: "marketing_id",
        ckey: false,
        cOrder: 1,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_remarks: {
        cValidate: "max:5000",
        cName: "remarks",
        cOrder: 2,
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
    LogbookDataRender(data) {
        this.LogbookItems = data;
    },
    Onmarketing_idChange(data) {
      this.$nextTick(() => {
        this.Model.marketing_id = data.id;
        this.Model.marketing_idLabel = data.label;
      });
    },
    doBack() {
      this.$router.go(-1);
    },
    M_ClearForm() {
      this.Model = {
        id: "",
        project_id: "",
        project_name: "",
        source_id: "",
        sales_lead_id: "",
        marketing_agent_id: "",
        prospect_name: "",
        current_marketing: "",
        last_contact_date: "",
        days: "",
        last_edit: "",
        updated_at: "",
        marketing_id: "",
        marketing_idLabel: "",
        remarks: ""
      };
    },
    doSave() {
      this.$validator._base.validateAll("FormEntry").then((result) => {
        if (!result) return;
        this.alertConfirmation("Are You Sure Want To Save This Data ?").then(
          (ress) => {
            if (ress.value) {
              this.$validator.errors.clear("FormEntry");
                this.M_Update();
            }
          }
        );
      });
    },
    onDelete() {
        this.alertConfirmation("Are You Sure Want To Delete ?").then(
          (ress) => {
            if (ress.value) {
                this.M_Delete();
            }
          }
        );
    },
    M_Delete() {
        this.postJSON(
            this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/sales-lead/unattended-delete",
            {id: this.paramFromList.id}
        ).then((response) => {
            if (response == null) return;
            this.doBack();
        });
    },
    M_Update() {
        let param = {
            ...this.Model,
            id: this.paramFromList.id,
            description: this.Model.remarks
        }
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/sales-lead/unattended-reassign",
        param
      ).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
    GetDataBy() {
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/sales-lead/unattended-detail",
        {id: this.paramFromList.id}
      ).then((response) => {
        if (response == null) return;
        this.Model = response.data;
        this.Model.marketing_id = "";
        this.Model.marketing_idLabel = "";
        this.Model.remarks = "";
        this.Model.days = (this.Model.days && this.Model.days !== '' ? this.Model.days : "0") + (this.Model.days > 1 ? " Days" : " Day");
        this.Model.last_contact_date = this.momentUnix(this.Model.last_contact_date, "DD MMM YYYY");

        this.PI_marketing_id.dataLookUp.param.project_id = this.Model.project_id;
        this.renderList();
      });
    },
    renderList() {
        this.LogbookpropList.param.project_id = this.Model.project_id;
        this.LogbookpropList.param.sales_lead_id = this.Model.sales_lead_id;
        this.$refs.ref_logbook.doGetList("");
    }
  },
  mounted() {
    this.M_ClearForm();
    this.GetDataBy();
  },
};
</script>

