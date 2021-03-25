<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <!-- <span>Delivery Receipt Report</span> -->
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
              <b-form :data-vv-scope="'SS_DeliveryReceipt_Report'" :data-vv-value-path="'SS_DeliveryReceipt_Report'">
                <b-row>
                  <b-col md="6">
                    <span>
                      <label>Customer Name</label>
                    </span>
                    <ACCDropDown
                        @change="OncustomerChange"
                        :prop="PI_customer"
                        v-model="M_Report.customer"
                        :label="M_Report.customerLabel"
                        ref="ref_customer"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="6">
                    <span>
                      <label>Order No.</label>
                    </span>
                    <ACCDropDown
                        @change="Onorder_noChange"
                        :prop="PI_order_no"
                        v-model="M_Report.order_no_id"
                        :label="M_Report.order_noLabel"
                        ref="ref_order_no"
                    />
                  </b-col>
                </b-row>
                <b-row>
                    <b-col md="6">
                        <span>
                        <label>Pickup Date</label>
                        </span>
                        <ACCDateTime
                            @input="OndateChange"
                            :prop="PI_pickup_date"
                            v-model="M_Report.date"
                            ref="ref_date"
                        />
                    </b-col>
                </b-row>
                <b-row style="margin-top: 10px;">
                  <b-col md="6">
                    <div>
                      <label>&nbsp;</label>
                    </div>
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
        userName: "",
        portfolio_id: "",
        customer: "",
        customerLabel: "",
        order_no_id: "",
        order_no: "",
        order_noLabel: "",
        date: "",
      },
      propReport: {
        reportName: "Delivery_Receipt",
      },
      PI_customer: {
        dataLookUp: {
          LookUpCd: "GetCustomerLookup",
          ColumnDB: "cm_contact_id",
          InitialWhere: "",
          ParamWhere: "",
          OrderBy: "",
          ParamView: "'" + this.getDataUser().portfolio_id + "'",
          SourceField: "",
          DisplayLookUp: "customer_name,address,phone_no",
        },
        cValidate: "",
        cName: "customer",
        ckey: false,
        cAsync: false,
        cOrder: 1,
        cProtect: false,
        cParentForm: "SS_DeliveryReceipt_Report",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "customer_name",
        cInputStatus: this.inputStatus,
      },
      PI_order_no: {
        dataLookUp: {
          LookUpCd: "GetOrderNo",
          ColumnDB: "op_order_id",
          InitialWhere:
            "ss_portfolio_id='" + this.getDataUser().portfolio_id + "' AND order_status not in ('NW','POD') AND category not in ('L','R')",
          ParamWhere: "",
          OrderBy: "",
          ParamView: "",
          SourceField: "",
          DisplayLookUp: "order_no",
        },
        cValidate: "",
        cName: "customer",
        ckey: false,
        cAsync: false,
        cOrder: 2,
        cProtect: false,
        cParentForm: "SS_DeliveryReceipt_Report",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "order_no",
        cInputStatus: this.inputStatus,
      },
      PI_pickup_date: {
        cValidate: "",
        cName: "pickup_date",
        cOrder: 3,
        cKey: false,
        cProtect: false,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "SS_DeliveryReceipt_Report",
        cInputStatus: this.inputStatus,
      },
    };
  },
  methods: {
    doBack() {
      this.$router.push({name: "OP_Dashboard"});
    },
        OncustomerChange(data) {
            this.M_Report.customer = data.id;
            this.M_Report.customerLabel = data.label;
        },
        Onorder_noChange(data) {
            this.M_Report.order_no_id = data.id;
            this.M_Report.order_no = data.order_no;
            this.M_Report.order_noLabel = data.label;
        },
        OndateChange(data) {},
        doPreview() {
          this.$refs.ref_report.preview("");
          this.$validator._base.validateAll("SS_DeliveryReceipt_Report").then(result => {
            // console.log(result)
            if (!result) return;

            let parameter = "&printed_by=" + this.M_Report.userName + "&initial_where=WHERE ss_portfolio_id=" + this.M_Report.portfolio_id;

            if (this.M_Report.customer && this.M_Report.customer !== '' && this.M_Report.customer !== 0) {
                parameter += " AND cm_contact_id='" + this.M_Report.customer + "'";
            }
            
            if (this.M_Report.order_no && this.M_Report.order_no !== '') {
                parameter += " AND order_no='" + this.M_Report.order_no + "'";
            }
            
            if (this.M_Report.date && this.M_Report.date !== '') {
                parameter += " AND pickup_date::date='" + this.M_Report.date + "'";
            }
            console.log(parameter);
            this.$refs.ref_report.preview(parameter);
          });

          // customer
          // quotation
        },
    doPrint() {
      this.$validator._base.validateAll("SS_DeliveryReceipt_Report").then(result => {
        this.$refs.ref_report.print();
      });
    }
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