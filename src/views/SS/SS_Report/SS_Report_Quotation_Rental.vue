<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span></span>
                </b-col>
                <b-col style="text-align: right;">
                </b-col>
              </b-row>
            </div>
            <div class="card__body">
              <b-form :data-vv-scope="'SS_Report_Quotation_Rental'" :data-vv-value-path="'SS_Report_Quotation_Rental'">
                <b-row>
                  <b-col md="3">
                    <span>
                      <label>Start Date</label>
                    </span>
                    <ACCDateTime
                      @input="OnChangeStartDate"
                      :prop="PI_start_date"
                      v-model="M_Report.startDate"
                      ref="ref_start_date"
                    />
                  </b-col>
                  <b-col md="3">
                    <span>
                      <label>End Date</label>
                    </span>
                    <ACCDateTime
                      @input="OnChangeEndDate"
                      :prop="PI_end_date"
                      v-model="M_Report.endDate"
                      ref="ref_end_date"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="6">
                    <span>
                      <label>Customer</label>
                    </span>
                    <ACCDropDown
                      @change="OnCustomerChange"
                      :prop="PI_customer"
                      v-model="M_Report.customerId"
                      :label="M_Report.customerLabel"
                      ref="ref_customer"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="6">
                    <span>
                      <label>Quotation</label>
                    </span>
                    <ACCDropDown
                      @change="OnQuotationChange"
                      :prop="PI_quotation"
                      v-model="M_Report.quotationId"
                      :label="M_Report.quotationLabel"
                      ref="ref_quotation"
                    />
                  </b-col>
                </b-row>
                <b-row style="margin-top: 10px;">
                  <b-col>
                    <ABSButton
                      :text="'Preview'"
                      classButton="button button--back"
                      classIcon="icon-style-1"
                      @click="doPreview"
                    />
                    <ABSButton
                      :text="'Print'"
                      classButton="button button--back"
                      classIcon="icon-style-1"
                      @click="doPrint"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col style="height: 800px;">
                    <ACCReportViewer :prop="propReport" ref="ref_report" />
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
      M_Report: {
        portfolio_id: 0,
        startDate: "",
        endDate: "",
        customerId: "",
        customerLabel: "",
        quotationId: "",
        quotationLabel: "",
      },
      propReport: {
        reportName: "Quotation_Rental",
      },
      PI_start_date: {
        cValidate: "",
        cName: "start_date",
        cOrder: 1,
        cKey: false,
        cProtect: false,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "SS_Report_Quotation_Rental",
      },
      PI_end_date: {
        cValidate: "",
        cName: "end_date",
        cOrder: 2,
        cKey: false,
        cProtect: false,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "SS_Report_Quotation_Rental",
      },
      PI_customer: {
        dataLookUp: {
          LookUpCd: "GetCMContact",
          ColumnDB: "contact_id",
          InitialWhere: "ss_portfolio_id='" + this.getDataUser().portfolio_id + "' AND marketing_user_id='" + this.getDataUser().user_id + "'",
          ParamWhere: "",
          OrderBy: "",
          ParamView: "",
          SourceField: "",
          DisplayLookUp: "name,contact_person,time_edit"
        },
        cValidate: "",
        cName: "customer",
        ckey: false,
        cOrder: 1,
        cProtect: false,
        cParentForm: "SS_Report_Quotation_Rental",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_quotation: {
        dataLookUp: {
          LookUpCd: "GetQuotationFilterCategory",
          ColumnDB: "mk_quotation_id",
          InitialWhere: "ss_portfolio_id='" + this.getDataUser().portfolio_id + "' AND category='R'",
          ParamWhere: "",
          OrderBy: "",
          ParamView: "",
          SourceField: "",
          DisplayLookUp: ""
        },
        cValidate: "",
        cName: "quotation",
        ckey: false,
        cOrder: 1,
        cProtect: false,
        cParentForm: "SS_Report_Quotation_Rental",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
    };
  },
  methods: {
    OnChangeStartDate() {
      console.log(this.M_Report.startDate);
      if (this.M_Report.startDate == null || this.M_Report.startDate == "") {
        this.PI_end_date.cValidate = '';
      } else {
        this.PI_end_date.cValidate = 'required';
      }
    },
    OnChangeEndDate() {
      console.log(this.M_Report.endDate);
      if (this.M_Report.endDate == null || this.M_Report.endDate == "") {
        this.PI_start_date.cValidate = '';
      } else {
        this.PI_start_date.cValidate = 'required';
      }
    },
    OnCustomerChange(data) {
      this.$nextTick(() => {
        this.M_Report.customerId = data.id;
        this.M_Report.customerLabel = data.label;
      });
    },
    OnQuotationChange(data) {
      this.$nextTick(() => {
        this.M_Report.quotationId = data.id;
        this.M_Report.quotationLabel = data.label;
      });
    },
    doPreview() {
      this.$refs.ref_report.preview("");
      this.$validator._base.validateAll("SS_Report_Quotation_Rental").then(result => {
        // console.log(result)
        if (!result) return;
        
        let parameter = "&initial_where=WHERE ss_portfolio_id = " + this.M_Report.portfolio_id;

        if (this.M_Report.startDate != null && this.M_Report.startDate != "" && this.M_Report.startDate != 0 &&
            this.M_Report.endDate != null && this.M_Report.endDate != "" && this.M_Report.endDate != 0) {
          parameter += " AND quotation_date::date BETWEEN '" + this.M_Report.startDate + "' AND '" + this.M_Report.endDate + "'";
        }

        if (this.M_Report.quotationId != null && this.M_Report.quotationId != "" && this.M_Report.quotationId != 0) {
          parameter += " AND mk_quotation_id =" + this.M_Report.quotationId;
        }

        if (this.M_Report.customerId != null && this.M_Report.customerId != "" && this.M_Report.customerId != 0) {
          parameter += " AND cm_contact_id = " + this.M_Report.customerId;
        }
        console.log(parameter);
        this.$refs.ref_report.preview(parameter);
      });
    },
    doPrint() {
      this.$validator._base.validateAll("SS_Report_Quotation_Rental").then(result => {
        if (!result) return;
        this.$refs.ref_report.print();
      });
    }
  },
  mounted() {
    this.getUserInfo(this.getDataUser().user_id).then((response) => {
      if (response == null) return;
      this.M_Report.portfolio_id = response.portfolio_id;
    });
  },
  beforeMount() {},
};
</script>

<style>
</style>