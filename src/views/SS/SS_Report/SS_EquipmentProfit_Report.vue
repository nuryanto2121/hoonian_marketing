<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <!-- <span>Equpment Profit Report</span> -->
                </b-col>
                <b-col style="text-align: right;">
                </b-col>
              </b-row>
            </div>
            <div class="card__body">
              <b-form :data-vv-scope="'SS_EquipmentProfit_Report'" :data-vv-value-path="'SS_EquipmentProfit_Report'">
                <b-row>
                  <b-col md="3">
                    <span>
                      <label>From Order Date</label>
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
                      <label>To Order Date</label>
                    </span>
                    <ACCDateTime
                      @input="OnChangeEndDate"
                      :prop="PI_end_date"
                      v-model="M_Report.endDate"
                      ref="ref_end_date"
                    />
                  </b-col>
                </b-row>
                <!-- <b-row>
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
                </b-row> -->
                <b-row>
                  <b-col md="6">
                    <span>
                      <label>Fleet Status</label>
                    </span>
                    <ACCRadioButton
                      @input="Onfleet_statusChange"
                      :prop="PI_fleet_status"
                      v-model="M_Report.fleet_status"
                      ref="ref_fleet_status"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="6">
                    <span>
                      <label>Fleet Type</label>
                    </span>
                    <ACCDropDown
                        @change="Onfleet_typeChange"
                        :prop="PI_fleet_type"
                        v-model="M_Report.fleet_type"
                        :label="M_Report.fleet_typeLabel"
                        ref="ref_fleet_type"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="6">
                    <span>
                      <label>License Plate No</label>
                    </span>
                    <ACCDropDown
                        @change="Onlicense_plate_noChange"
                        :prop="PI_license_plate_no"
                        v-model="M_Report.license_plate_no_id"
                        :label="M_Report.license_plate_noLabel"
                        ref="ref_license_plate_no"
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
              startDate: "",
              endDate: "",
              fleet_status: "",
              customer: "",
              customerLabel: "",
              fleet_type: "",
              fleet_typeLabel: "",
              license_plate_no_id: "",
              license_plate_no: "",
              license_plate_noLabel: "",
            },
            propReport: {
                reportName: "Equipment_Profit",
            },
            PI_start_date: {
                cValidate: "",
                cName: "start_date",
                cOrder: 1,
                cKey: false,
                cProtect: false,
                cWithTime: false,
                cFormat: "dd/MM/yyyy",
                cParentForm: "SS_EquipmentProfit_Report",
            },
            PI_end_date: {
                cValidate: "",
                cName: "end_date",
                cOrder: 2,
                cKey: false,
                cProtect: false,
                cWithTime: false,
                cFormat: "dd/MM/yyyy",
                cParentForm: "SS_EquipmentProfit_Report",
            },
            PI_fleet_status: {
              cValidate: "",
              cName: "fleet_status",
              cId: "rdbfleet_status",
              cRadioOptions: [
                { text: "All", value: "" },
                { text: "Internal", value: "I" },
                { text: "Externall", value: "E" }
              ],
              cRadioDefaultOption: "",
              cOrder: 3,
              cProtect: false,
              cVisible:  true,
              cParentForm: 'SS_EquipmentProfit_Report',
              cInputStatus: this.inputStatus,
              cGroup: false
            },
            PI_customer: {
                dataLookUp: {
                LookUpCd: "GetCustomer",
                ColumnDB: "cm_contact_id",
                InitialWhere:
                    "ss_portfolio_id='" + this.getDataUser().portfolio_id + "'",
                ParamWhere: "",
                OrderBy: "",
                ParamView: "",
                SourceField: "",
                DisplayLookUp: "customer_name",
                },
                cValidate: "",
                cName: "customer",
                ckey: false,
                cAsync: false,
                cOrder: 4,
                cProtect: false,
                cParentForm: "SS_EquipmentProfit_Report",
                cStatic: false,
                cOption: [],
                cDisplayColumn: "customer_name",
                cInputStatus: this.inputStatus,
            },
            PI_fleet_type: {
                dataLookUp: {
                LookUpCd: "GetFleetType",
                ColumnDB: "fleet_type_id",
                InitialWhere:
                    "ss_portfolio_id='" + this.getDataUser().portfolio_id + "'",
                ParamWhere: "",
                OrderBy: "",
                ParamView: "",
                SourceField: "",
                DisplayLookUp: "descs",
                },
                cValidate: "",
                cName: "fleet_type",
                ckey: false,
                cAsync: false,
                cOrder: 5,
                cProtect: false,
                cParentForm: "SS_EquipmentProfit_Report",
                cStatic: false,
                cOption: [],
                cDisplayColumn: "descs",
                cInputStatus: this.inputStatus,
            },
            PI_license_plate_no: {
                dataLookUp: {
                LookUpCd: "GetFleetMstrAll",
                ColumnDB: "fm_fleet_mstr_id",
                InitialWhere:
                    "ss_portfolio_id='" + this.getDataUser().portfolio_id + "'",
                ParamWhere: "",
                OrderBy: "",
                ParamView: "",
                SourceField: "",
                DisplayLookUp: "license_plate_no",
                },
                cValidate: "",
                cName: "license_plate_no",
                ckey: false,
                cAsync: false,
                cOrder: 6,
                cProtect: false,
                cParentForm: "SS_EquipmentProfit_Report",
                cStatic: false,
                cOption: [],
                cDisplayColumn: "license_plate_no",
                cInputStatus: this.inputStatus,
            },
        };
    },
    computed: {
      protectDate() {
        let ret = false;
        if (
          (this.M_Report.startDate && this.M_Report.startDate !== "") ||
          (this.M_Report.endDate && this.M_Report.endDate !== "")
        ) {
          ret = true;
        }

        return ret;
      }
    },
    methods: {
        OnChangeStartDate(data) {
          console.log(data)
          if (
            (this.M_Report.endDate && this.M_Report.endDate !== "" && this.M_Report.endDate !== "Invalid date") ||
            (data && data !== "" && data !== "Invalid date")
          ) {
            this.PI_start_date.cValidate = 'required';
            this.PI_end_date.cValidate = 'required';
            // this.$forceUpdate();
          }
          else {
            this.PI_start_date.cValidate = '';
            this.PI_end_date.cValidate = '';
            // this.$forceUpdate();
          }
        },
        OnChangeEndDate(data) {
          console.log(data)
          if (
            (this.M_Report.startDate && this.M_Report.startDate !== "" && this.M_Report.startDate !== "Invalid date") ||
            (data && data !== "" && data !== "Invalid date")
          ) {
            this.PI_start_date.cValidate = 'required';
            this.PI_end_date.cValidate = 'required';
            // this.$forceUpdate();
          }
          else {
            this.PI_start_date.cValidate = '';
            this.PI_end_date.cValidate = '';
            // this.$forceUpdate();
          }
        },
        OncustomerChange(data) {
            this.M_Report.customer = data.id;
            this.M_Report.customerLabel = data.label;
        },
        Onfleet_typeChange(data) {
            this.M_Report.fleet_type = data.id;
            this.M_Report.fleet_typeLabel = data.label;
        },
        Onlicense_plate_noChange(data) {
          console.log(data)
            this.M_Report.license_plate_no_id = data.id;
            this.M_Report.license_plate_no = data.license_plate_no;
            this.M_Report.license_plate_noLabel = data.label;
        },
        doPreview() {
            this.$refs.ref_report.preview("");
            this.$validator._base.validateAll("SS_EquipmentProfit_Report").then(result => {
                // console.log(result)
                if (!result) return;
                let parameter = "&printed_by=" + this.M_Report.userName + "&initial_where=WHERE ss_portfolio_id=" + this.M_Report.portfolio_id + " AND license_plate_no is not null";

                if (
                  (this.M_Report.startDate && this.M_Report.startDate !== "") ||
                  (this.M_Report.endDate && this.M_Report.endDate !== "")
                ) {
                  parameter += " AND order_date::date BETWEEN '" + this.M_Report.startDate + "' AND '" + this.M_Report.endDate + "'";
                }

                if (this.M_Report.fleet_status != null && this.M_Report.fleet_status != "") {
                    parameter += " AND assign_fleet_status = '" + this.M_Report.fleet_status + "'";
                }

                if (this.M_Report.fleet_type != null && this.M_Report.fleet_type != "" && this.M_Report.fleet_type != 0) {
                    parameter += " AND fm_fleet_type_id = '" + this.M_Report.fleet_type + "'";
                }

                if (this.M_Report.license_plate_no != null && this.M_Report.license_plate_no != "" && this.M_Report.license_plate_no != 0) {
                    parameter += " AND license_plate_no = '" + this.M_Report.license_plate_no + "'";
                }

                console.log(parameter);
                this.$refs.ref_report.preview(parameter);
            });
        },
        doPrint() {
            this.$validator._base.validateAll("SS_EquipmentProfit_Report").then(result => {
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