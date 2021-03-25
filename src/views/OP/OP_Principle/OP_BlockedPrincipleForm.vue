<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col lg="12" xl="12">
            <div class="card">
                <div class="card__title" style="padding-bottom: 5px !important;">
                <b-row class="title-primary">
                    <b-col style="max-width: max-content !important;">
                    <span style="font-size: 18px; color: #4a93b3;">Open Principle Booking</span>
                    </b-col>
                    <b-col class="col-right">
                        <span>
                            <ABSButton
                                :text="'Back'"
                                classButton="button button--back"
                                classIcon="icon-style-1"
                                @click="doBack"
                                styleButton="margin-right: unset !important;"
                            />
                        </span>
                    </b-col>
                </b-row>
                </div>
            </div>
            <div class="card">
                <div class="card__body">
                    <b-form
                        :data-vv-scope="'FormEntry'"
                        :data-vv-value-path="'FormEntry'"
                    >
                    <b-row>
                        <b-col lg="2" xl="2">
                            <b-row style="margin-bottom: 10px;">
                                <b-col lg="12" xl="12" style="margin-right: 20px; border: solid 1px #dfe3f3; border-radius: 6px; padding: 15px !important; text-align: center;">
                                    <b-img :src="urlHoonian + Model.main_pic" alt="" style="height: 120px !important; width: 120px !important;" fluid-grow rounded @error="onImageLoadFailure($event)" />
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col style="border: solid 1px #dfe3f3; border-radius: 6px; padding: 15px !important; text-align: center;">
                            <b-row>
                                <b-col lg="6" xl="6">
                                    <div class="principle-name">
                                        <span>{{Model.principle_name}}</span>
                                    </div>
                                </b-col>
                                <b-col lg="5" xl="5" offset-lg="1" offset-xl="1">
                                    <div class="principle-name" style="font-size: 15px;">
                                        <span>Sales</span>
                                    </div>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col lg="3" xl="3">
                                    <!-- <div class="principle-name">
                                        <span>{{data.principle_name}}</span>
                                    </div> -->
                                    <b-row style="margin-bottom: 10px;">
                                        <b-col lg="6" xl="6" class="label">
                                            <span>PIC</span>
                                        </b-col>
                                        <b-col lg="6" xl="6" class="label-text-bold">
                                            <span style="margin-left: 10px;">{{Model.pic}}</span>
                                        </b-col>
                                    </b-row>
                                    <b-row style="margin-bottom: 10px;">
                                        <b-col lg="6" xl="6" class="label">
                                            <span>Total Agent</span>
                                        </b-col>
                                        <b-col lg="6" xl="6" class="label-text">
                                            <span style="margin-left: 10px;">{{Model.total_agent}}</span>
                                        </b-col>
                                    </b-row>
                                    <b-row style="margin-bottom: 10px;">
                                        <b-col lg="6" xl="6" class="label">
                                            <span>Total NUP</span>
                                        </b-col>
                                        <b-col lg="6" xl="6" class="label-text">
                                            <span style="margin-left: 10px;">{{Model.total_nup}}</span>
                                        </b-col>
                                    </b-row>
                                </b-col>
                                <b-col lg="4" xl="4">
                                    <b-row style="margin-bottom: 10px;">
                                        <b-col lg="9" xl="9" class="label-assigned">
                                            <span>Total Assigned Units</span>
                                        </b-col>
                                        <b-col lg="2" xl="2" class="label-text-assigned">
                                            <span>{{Model.total_assigned_units}}</span>
                                        </b-col>
                                    </b-row>
                                    <b-row style="margin-bottom: 10px;">
                                        <b-col lg="9" xl="9" class="label-booked">
                                            <span>Total Booked Units</span>
                                        </b-col>
                                        <b-col lg="2" xl="2" class="label-text-booked">
                                            <span>{{Model.total_booked_units}}</span>
                                        </b-col>
                                    </b-row>
                                    <b-row style="margin-bottom: 10px;">
                                        <b-col lg="9" xl="9" class="label-sold">
                                            <span>Total Sold Units</span>
                                        </b-col>
                                        <b-col lg="2" xl="2" class="label-text-sold">
                                            <span>{{Model.total_sold_units}}</span>
                                        </b-col>
                                    </b-row>
                                </b-col>
                                <b-col lg="5" xl="5">
                                    <!-- <div class="principle-name">
                                        <span>Sales</span>
                                    </div> -->
                                    <b-row style="margin-bottom: 10px;">
                                        <b-col lg="8" xl="8" class="label">
                                            <span>Total Commission</span>
                                        </b-col>
                                        <b-col lg="4" xl="4" class="label-text">
                                            <span>
                                                {{checkNum((Model.total_commission && Model.total_commission !== '' ? Model.total_commission : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), (Model.total_commission && Model.total_commission !== '' ? Model.total_commission : 0))}} 
                                                {{checkDigit((Model.total_commission && Model.total_commission !== '' ? Model.total_commission : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}}
                                            </span>
                                        </b-col>
                                    </b-row>
                                    <b-row style="margin-bottom: 10px;">
                                        <b-col lg="8" xl="8" class="label">
                                            <span>Paid Commission</span>
                                        </b-col>
                                        <b-col lg="4" xl="4" class="label-text">
                                            <span>
                                                {{checkNum((Model.paid_commission && Model.paid_commission !== '' ? Model.paid_commission : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), (Model.paid_commission && Model.paid_commission !== '' ? Model.paid_commission : 0))}} 
                                                {{checkDigit((Model.paid_commission && Model.paid_commission !== '' ? Model.paid_commission : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}}
                                            </span>
                                        </b-col>
                                    </b-row>
                                    <b-row style="margin-bottom: 10px;">
                                        <b-col lg="8" xl="8" class="label">
                                            <span>Outstanding Commission</span>
                                        </b-col>
                                        <b-col lg="4" xl="4" class="label-text">
                                            <span>
                                                {{checkNum((Model.outstd_commission && Model.outstd_commission !== '' ? Model.outstd_commission : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), (Model.outstd_commission && Model.outstd_commission !== '' ? Model.outstd_commission : 0))}} 
                                                {{checkDigit((Model.outstd_commission && Model.outstd_commission !== '' ? Model.outstd_commission : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}}
                                            </span>
                                        </b-col>
                                    </b-row>
                                </b-col>
                            </b-row>

                            <hr style="border-color: #ededed; margin: 0 !important;" />

                            <b-row style="margin-top: 20px;" class="poppins">
                                <b-col style="margin-right: 10px; border: solid 1px #dfe3f3; border-radius: 6px; padding: 10px !important; text-align: center;">
                                    <div class="progress-x">
                                        <span>Contribution</span>
                                    </div>
                                    <b-row>
                                        <b-col style="margin-right: 10px; min-height: 90px; background: #2d5aaf; border-radius: 4px; color: white; text-align: center;">
                                            <div class="center" style="font-size: 35px; font-weight: bold;">
                                                {{Model.contribution_percentage}}<span style="font-size: 18px;">%</span>
                                            </div>
                                        </b-col>
                                        <b-col style="margin-right: 10px; min-height: 90px; background: #ffbd01; border-radius: 4px; color: white; text-align: center;">
                                            <div class="center" style="font-size: 35px; font-weight: bold; width: 100%">
                                                {{checkNum((Model.contribution_value && Model.contribution_value !== '' ? Model.contribution_value : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), (Model.contribution_value && Model.contribution_value !== '' ? Model.contribution_value : 0))}}
                                                {{checkPref((Model.contribution_value && Model.contribution_value !== '' ? Model.contribution_value : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}}
                                            </div>
                                        </b-col>
                                        <b-col style="min-height: 90px; background: #fe714f; border-radius: 4px; color: white; text-align: center;">
                                            <div class="center" style="font-size: 35px; font-weight: bold;">
                                                {{Model.token}}
                                                <div class="token-text">
                                                    <span>Token</span>
                                                </div>
                                            </div>
                                        </b-col>
                                    </b-row>
                                </b-col>
                                <b-col lg="7" xl="7">
                                    <b-row>
                                        <b-col style="margin-right: 10px; text-align: center;" class="row-bordered">
                                            <span class="lbl-view poppins">Blocked Date</span>
                                            <hr>
                                            <span style="font-size: 15px;" class="lbl-bold poppins">{{Model.blocked_date}}</span>
                                        </b-col>
                                        <b-col style="margin-right: 10px; text-align: center;" class="row-bordered">
                                            <span class="lbl-view poppins">Blocked Agent</span>
                                            <hr>
                                            <span style="font-size: 15px;" class="lbl-bold poppins">{{Model.blocked_agent}}</span>
                                        </b-col>
                                        <b-col style="margin-right: 10px; text-align: center;" class="row-bordered">
                                            <span class="lbl-view poppins">Total Blocked</span>
                                            <hr>
                                            <span style="font-size: 15px;" class="lbl-bold poppins">{{Model.total_blocked}}</span>
                                        </b-col>
                                        <b-col style="text-align: center;" class="row-bordered">
                                            <span class="lbl-view poppins">Last 3 Month</span>
                                            <hr>
                                            <span style="font-size: 15px;" class="lbl-bold poppins">{{Model.last_three_month}}</span>
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col md="12" class="row-bordered" style="text-align: left;">
                                            <span class="lbl-view poppins">Reason</span>
                                            <br>
                                            <span style="font-size: 15px;" class="lbl-bold poppins">{{Model.reason}}</span>
                                        </b-col>
                                    </b-row>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                    <b-row style="margin-top: 5px;">
                      <b-col md="6" offset-md="2">
                        <span>
                          <label class="lbl-bold poppins"> Open Date </label>
                        </span>
                        <HOODateTime
                          @input="Onopen_dateChange"
                          :prop="PI_open_date"
                          v-model="Model.open_date"
                          ref="ref_open_date"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="10" offset-md="2">
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
                      <b-col md="6" offset-md="4">
                        <ABSButton
                          :text="'Confirmation'"
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
  props: ['title'],
  computed: {
    paramFromList() {
      var param = this.$store.getters.getParamPage;
      return param;
    },
  },
  data() {
    return {
      Model: {
        principle_name: "",
        principle_id: "",
        pic: "",
        main_pic: "",
        total_agent: "",
        total_nup: "",
        total_commission: "",
        paid_commission: "",
        outstd_commission: "",
        total_assigned_units: "",
        total_booked_units: "",
        total_sold_units: "",
        contribution_percentage: "",
        contribution_value: "",
        token: "",
        blocked_date: "",
        blocked_agent: "",
        reason: "",
        total_blocked: "",
        last_three_month: "",
        open_date: "",
        remarks: ""
      },
      search: "",
      
      ModelProject: [],
      
      PI_open_date: {
        cValidate: "required",
        cName: "open_date",
        cOrder: 1,
        cKey: false,
        cProtect: false,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_remarks: {
        cValidate: "max:5000",
        cName: "remarks",
        cOrder: 2,
        cKey: false,
        cProtect: false,
        cResize: false,
        cReadonly: false,
        cRows: 3,
        cMaxRows: 3,
        cSize: "md",
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus
      }
    };
  },
  methods: {
    doBack() {
      this.$router.go(-1);
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    GetDataBy() {
        let param = {
            project_id: this.paramFromList.project_id,
            id: this.paramFromList.id
        }
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/blocking/principle/detail",
        param
      ).then((response) => {
        if (response == null) return;
        if (response.data == null) return;
        this.Model = response.data;
        this.Model.blocked_date = this.momentUnix(this.Model.blocked_date, "DD MMM YYYY");
      });
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
        id: this.paramFromList.id,
        principle_id: this.Model.principle_id,
        unblock_date: this.momentDateToUnix( this.Model.open_date, "YYYY-MM-DD" ),
        unblock_remarks: this.Model.remarks
      }

      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/blocking/principle/action",
        param
      ).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
  },
  mounted() {
    this.GetDataBy();
  },
};
</script>

<style scoped>
.progress-x {
    text-align: center;
    font-weight: bold; font-size: 15px;
    margin-bottom: 20px;
    font-family: "Poppins";
}
.token-text {
    text-align: center;
    font-weight: bold; font-size: 13px;
    /* margin-top: 10px; */
    font-family: "Poppins";
}
.principle-name {
    text-align: left;
    font-weight: bold; font-size: 20px;
    margin-bottom: 10px;
    font-family: "Poppins";
}
.label {
    padding: 0 !important;
    text-align: left;
    font-weight: bold; font-size: 11px;
    color: #7070b8;
    font-family: "Poppins";
}
.label-assigned {
    padding: 0 !important;
    text-align: left;
    font-weight: bold; font-size: 11px;
    color: #4ead63;
    font-family: "Poppins";
}
.label-booked {
    padding: 0 !important;
    text-align: left;
    font-weight: bold; font-size: 11px;
    color: #ffd84d;
    font-family: "Poppins";
}
.label-sold {
    padding: 0 !important;
    text-align: left;
    font-weight: bold; font-size: 11px;
    color: #ff4d7d;
    font-family: "Poppins";
}
.label-text {
    padding: 0 !important;
    text-align: left;
    font-size: 11px;
    font-family: "Poppins";
}
.label-text-bold {
    padding: 0 !important;
    text-align: left;
    font-weight: bold; font-size: 11px;
    font-family: "Poppins";
}
.label-text-assigned {
    padding: 0 !important;
    text-align: left;
    font-weight: bold; font-size: 11px;
    color: #028a20;
    font-family: "Poppins";
}
.label-text-booked {
    padding: 0 !important;
    text-align: left;
    font-weight: bold; font-size: 11px;
    color: #ffc700;
    font-family: "Poppins";
}
.label-text-sold {
    padding: 0 !important;
    text-align: left;
    font-weight: bold; font-size: 11px;
    color: #ff9fb9;
    font-family: "Poppins";
}
@media (min-width: 992px) {
}
@media (min-width: 1200px) {
}
</style>
