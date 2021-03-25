<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important">
                  <span></span>
                </b-col>
                <b-col style="text-align: right"> </b-col>
              </b-row>
            </div>
            <div class="card__body">
              <b-form
                :data-vv-scope="'SS_Report_Sales_Performance'"
                :data-vv-value-path="'SS_Report_Sales_Performance'"
              >
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
                      <label>Period</label>
                    </span>
                    <ACCDropDown
                      @change="OnPeriodChange"
                      :prop="PI_period"
                      v-model="M_Report.periodId"
                      :label="M_Report.periodLabel"
                      ref="ref_period"
                    />
                  </b-col>
                </b-row>
                <b-row style="margin-top: 10px">
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
                  <b-col style="height: 800px">
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
        userName: "",
        startDate: this.momentDate(new Date()),
        endDate: this.momentDate(new Date()),
        customerId: "",
        customerLabel: "",
        periodId: "M",
        periodLabel: "",
      },
      propReport: {
        reportName: "Sales_Performance",
      },
      PI_start_date: {
        cValidate: "required",
        cName: "start_date",
        cOrder: 1,
        cKey: false,
        cProtect: false,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "SS_Report_Sales_Performance",
      },
      PI_end_date: {
        cValidate: "required",
        cName: "end_date",
        cOrder: 2,
        cKey: false,
        cProtect: false,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "SS_Report_Sales_Performance",
      },
      PI_period: {
        dataLookUp: null,
        cValidate: "",
        cName: "period",
        ckey: false,
        cOrder: 3,
        cProtect: false,
        cParentForm: "SS_Report_Sales_Performance",
        cStatic: true,
        cClearable: false,
        cOption: [
          { id: "M", label: "Monthly" },
          { id: "Y", label: "Yearly" },
        ],
        cDisplayColumn: "action_type,descs",
        cInputStatus: this.inputStatus,
      },
      PI_customer: {
        dataLookUp: {
          LookUpCd: "GetCMContact",
          ColumnDB: "contact_id",
          InitialWhere:
            "ss_portfolio_id='" +
            this.getDataUser().portfolio_id +
            "' AND marketing_user_id='" +
            this.getDataUser().user_id +
            "'",
          ParamWhere: "",
          OrderBy: "",
          ParamView: "",
          SourceField: "",
          DisplayLookUp: "name,contact_person,time_edit",
        },
        cValidate: "",
        cName: "customer",
        ckey: false,
        cOrder: 4,
        cProtect: false,
        cParentForm: "SS_Report_Sales_Performance",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
    };
  },
  methods: {
    OnChangeStartDate() {},
    OnChangeEndDate() {},
    OnCustomerChange(data) {
      this.$nextTick(() => {
        this.M_Report.customerId = data.id;
        this.M_Report.customerLabel = data.label;
      });
    },
    OnPeriodChange(data) {
      this.$nextTick(() => {
        this.M_Report.periodId = data.id;
        this.M_Report.periodLabel = data.label;
      });
    },
    doPreview() {
      this.$refs.ref_report.preview("");
      this.$validator._base
        .validateAll("SS_Report_Sales_Performance")
        .then((result) => {
          // console.log(result)
          if (!result) return;
          
          let parameter =
            "&printed_by=" +
            this.M_Report.userName +
            "&initial_where=select * from fop_sales_performance(" +
            this.M_Report.portfolio_id +
            ",'" +
            this.M_Report.periodId +
            "','" +
            this.momentDateFormatting(this.M_Report.startDate, "MM/DD/YYYY") +
            "','" +
            this.momentDateFormatting(this.M_Report.endDate, "MM/DD/YYYY") +
            "','C'";

          if (
            this.M_Report.customerId != null &&
            this.M_Report.customerId != "" &&
            this.M_Report.customerId != 0
          ) {
            parameter += "," + this.M_Report.customerId + ")";
          } else {
            parameter += ")";
          }
          console.log(parameter);
          this.$refs.ref_report.preview(parameter);
        });
    },
    doPrint() {
      this.$validator._base
        .validateAll("SS_Report_Sales_Performance")
        .then((result) => {
          if (!result) return;
          this.$refs.ref_report.print();
        });
    },
  },
  mounted() {
    this.getUserInfo(this.getDataUser().user_id).then((response) => {
      if (response == null) return;
      this.M_Report.portfolio_id = response.portfolio_id;
      this.M_Report.userName = response.user_name;
    });
  },
  beforeMount() {},
};
</script>

<style>
</style>