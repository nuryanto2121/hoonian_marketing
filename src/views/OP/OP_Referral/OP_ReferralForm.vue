<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important">
            <div class="card__title">
              <b-row class="title-primary">
                <b-col style="max-width: max-content !important">
                  <span>Referral Details</span>
                </b-col>
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
                  <b-col md="8">
                    <b-row class="title-primary">
                        <span>Referred by</span>
                    </b-row>
                    <b-row class="row-bordered">
                        <b-col>
                            <b-row>
                                <b-col style="margin-right: 10px; text-align: center;" class="row-bordered">
                                    <span class="lbl-view poppins">Name</span>
                                    <hr>
                                    <span style="font-size: 20px;" class="lbl-bold poppins">{{Model.referral_name}}</span>
                                </b-col>
                                <b-col style="margin-right: 10px; text-align: center;" class="row-bordered">
                                    <span class="lbl-view poppins">Date</span>
                                    <hr>
                                    <span style="font-size: 20px;" class="lbl-bold poppins">{{Model.refer_date}}</span>
                                </b-col>
                                <b-col style="margin-right: 10px; text-align: center;" class="row-bordered">
                                    <span class="lbl-view poppins">Commission</span>
                                    <hr>
                                    <span style="font-size: 20px;" class="lbl-bold poppins">{{Model.commission}}</span>
                                </b-col>
                                <b-col style="text-align: center;" class="row-bordered">
                                    <span class="lbl-view poppins">Days</span>
                                    <hr>
                                    <span style="font-size: 20px;" class="lbl-bold poppins">{{Model.days}}</span>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col class="row-bordered">
                                    <span class="lbl-view poppins">Notes</span>
                                    <br>
                                    <span style="font-size: 20px;" class="lbl-bold poppins">{{Model.notes}}</span>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                    <b-row class="title-primary">
                        <span>Prospect</span>
                    </b-row>
                    <b-row class="row-bordered">
                        <b-col>
                            <b-row>
                                <b-col style="margin-right: 10px; text-align: center;" class="row-bordered">
                                    <span class="lbl-view poppins">Name</span>
                                    <hr>
                                    <span style="font-size: 20px;" class="lbl-bold poppins">{{Model.prospect_name}}</span>
                                </b-col>
                                <b-col style="margin-right: 10px; text-align: center;" class="row-bordered">
                                    <span class="lbl-view poppins">Handphone</span>
                                    <hr>
                                    <span style="font-size: 20px;" class="lbl-bold poppins">{{Model.handphone}}</span>
                                </b-col>
                                <b-col style="margin-right: 10px; text-align: center;" class="row-bordered">
                                    <span class="lbl-view poppins">Relation</span>
                                    <hr>
                                    <span style="font-size: 20px;" class="lbl-bold poppins">{{Model.relation_name}}</span>
                                </b-col>
                                <b-col style="text-align: center;" class="row-bordered">
                                    <span class="lbl-view poppins">Purchased Unit</span>
                                    <hr>
                                    <span style="font-size: 20px;" class="lbl-bold poppins">{{Model.purchased_unit}}</span>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col style="margin-right: 10px; text-align: center;" class="row-bordered">
                                    <span class="lbl-view poppins">Company Name</span>
                                    <hr>
                                    <span style="font-size: 20px;" class="lbl-bold poppins">{{Model.company_name}}</span>
                                </b-col>
                                <b-col style="margin-right: 10px; text-align: center;" class="row-bordered">
                                    <span class="lbl-view poppins">Industry</span>
                                    <hr>
                                    <span style="font-size: 20px;" class="lbl-bold poppins">{{Model.industry_name}}</span>
                                </b-col>
                                <b-col style="margin-right: 10px; text-align: center;" class="row-bordered">
                                    <span class="lbl-view poppins">Job Title</span>
                                    <hr>
                                    <span style="font-size: 20px;" class="lbl-bold poppins">{{Model.job_title}}</span>
                                </b-col>
                                <b-col style="text-align: center;" class="row-bordered">
                                    <span class="lbl-view poppins">Yearly Income</span>
                                    <hr>
                                    <span style="font-size: 20px;" class="lbl-bold poppins">{{Model.income_range_desc}}</span>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>

                    <b-row>
                      <b-col md="6">
                        <span>
                          <label class="lbl-bold poppins">Marketing Name</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_marketing_agent_name"
                          v-model="Model.marketing_agent_name"
                          ref="ref_marketing_agent_name"
                        />
                      </b-col>
                      <b-col md="6">
                        <span>
                          <label class="lbl-bold poppins"> Assign Date </label>
                        </span>
                        <ACCTextBox
                          :prop="PI_assign_date"
                          v-model="Model.assign_date"
                          ref="ref_assign_date"
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
                    <b-row style="margin-top: 10px">
                      <b-col md="6" offset-md="3">
                        <ABSButton
                          :text="'Confirm'"
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
        project_id: "",
        sales_lead_id: "",
        referral_name: "",
        refer_date: "",
        commission: "",
        days: "",
        notes: "",
        prospect_name: "",
        handphone: "",
        relation_name: "",
        purchased_unit: "",
        company_name: "",
        industry_name: "",
        job_title: "",
        income_range_desc: "",
        marketing_agent_name: "",
        assign_date: "",
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
      
      PI_marketing_agent_name: {
        cValidate: "",
        cName: "marketing_agent_name",
        cOrder: 9,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_assign_date: {
        cValidate: "",
        cName: "assign_date",
        cOrder: 9,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_remarks: {
        cValidate: "max:5000",
        cName: "remarks",
        cOrder: 1,
        cKey: false,
        cProtect: false,
        cResize: false,
        cReadonly: false,
        cRows: 1,
        cMaxRows: 3,
        cSize: "md",
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus
      }
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
    doBack() {
      this.$router.go(-1);
    },
    M_ClearForm() {
      this.Model = {
        project_id: "",
        sales_lead_id: "",
        referral_name: "",
        refer_date: "",
        commission: "",
        days: "",
        notes: "",
        prospect_name: "",
        handphone: "",
        relation_name: "",
        purchased_unit: "",
        company_name: "",
        industry_name: "",
        job_title: "",
        income_range_desc: "",
        marketing_agent_name: "",
        assign_date: "",
        remarks: "",
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
    M_Update() {
      let param = {
        project_id: this.Model.project_id,
        id: this.paramFromList.id,
        marketing_id: this.Model.marketing_agent_id,
        assign_date: this.momentDateToUnix( this.Model.assign_date, "YYYY-MM-DD" ),
        remarks: this.Model.remarks
      }

      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/referral/action",
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
      let param = {
        id: this.paramFromList.id,
        project_id: this.paramFromList.project_id
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/referral/detail",
        param
      ).then((response) => {
        if (response == null) return;
        this.Model = response.data;
        this.Model.project_id = this.paramFromList.project_id;
        this.Model.assign_date = this.Model.assign_date && this.Model.assign_date !== '' ? this.momentUnix(this.Model.assign_date, "DD MMM YYYY") : "";
        this.Model.refer_date = this.Model.refer_date && this.Model.refer_date !== '' ? this.momentUnix(this.Model.refer_date, "DD MMM YYYY") : "";
        this.Model.days = this.momentDiff(response.data.refer_date, new Date(), 'days');
        this.Model.remarks = "";
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

