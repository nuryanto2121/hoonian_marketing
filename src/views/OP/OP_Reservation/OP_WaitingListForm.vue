<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important">
            <div class="card__title">
              <b-row class="title-primary">
                <b-col style="max-width: max-content !important">
                  <span>Release Unit</span>
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
                    <!-- <b-row>
                      <b-col md="12" class="col-right" v-show="inputStatus == 'edit'">
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
                      </b-col>
                    </b-row> -->
                    <b-row>
                        <b-col style="margin-right: 10px; text-align: center;" class="row-bordered">
                            <span class="lbl-view poppins">Tower</span>
                            <hr>
                            <span style="font-size: 20px;" class="lbl-bold poppins">{{Model.tower}}</span>
                        </b-col>
                        <b-col style="margin-right: 10px; text-align: center;" class="row-bordered">
                            <span class="lbl-view poppins">Floor</span>
                            <hr>
                            <span style="font-size: 20px;" class="lbl-bold poppins">{{Model.floor}}</span>
                        </b-col>
                        <b-col style="text-align: center;" class="row-bordered">
                            <span class="lbl-view poppins">Unit No</span>
                            <hr>
                            <span style="font-size: 20px;" class="lbl-bold poppins">{{Model.unit_no}}</span>
                        </b-col>
                    </b-row>

                    <b-row>
                      <b-col md="6">
                        <span>
                          <label class="lbl-bold poppins">Reservation No</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_reservation_no"
                          v-model="Model.reservation_no"
                          ref="ref_reservation_no"
                        />
                      </b-col>
                      <b-col md="6">
                        <span>
                          <label class="lbl-bold poppins"> Reservation Date </label>
                        </span>
                        <HOODateTime
                          @input="Onreservation_dateChange"
                          :prop="PI_reservation_date"
                          v-model="Model.reservation_date"
                          ref="ref_reservation_date"
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
                          <label class="lbl-bold poppins"> Release Date </label>
                        </span>
                        <HOODateTime
                          @input="Onrelease_dateChange"
                          :prop="PI_release_date"
                          v-model="Model.release_date"
                          ref="ref_release_date"
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
                      <b-col md="6">
                        <span>
                          <label class="lbl-bold poppins"> Release Date </label>
                        </span>
                        <HOODateTime
                          @input="Onrelease_date_iChange"
                          :prop="PI_release_date_i"
                          v-model="Model.release_date_i"
                          ref="ref_release_date_i"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label class="lbl-bold poppins"> Reason </label>
                        </span>
                        <ACCTextArea
                          :prop="PI_reason"
                          v-model="Model.reason"
                          ref="ref_reason"
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

      Model: {
        reservation_id: "",
        reservation_no: "",
        reservation_date: "",
        project_name: "",
        release_date: "",
        remarks: "",
        release_date_i: new Date(),
        reason: "",
      },
      
      PI_reservation_no: {
        cValidate: "",
        cName: "reservation_no",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_reservation_date: {
        cValidate: "",
        cName: "reservation_date",
        cOrder: 2,
        cKey: false,
        cProtect: true,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_project_name: {
        cValidate: "",
        cName: "project_name",
        cOrder: 3,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_release_date: {
        cValidate: "",
        cName: "release_date",
        cOrder: 4,
        cKey: false,
        cProtect: true,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_remarks: {
        cValidate: "max:5000",
        cName: "remarks",
        cOrder: 5,
        cKey: false,
        cProtect: true,
        cResize: false,
        cReadonly: false,
        cRows: 1,
        cMaxRows: 3,
        cSize: "md",
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus
      },
      PI_release_date_i: {
        cValidate: "required",
        cName: "release_date_i",
        cOrder: 6,
        cKey: false,
        cProtect: false,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_reason: {
        cValidate: "max:5000",
        cName: "reason",
        cOrder: 5,
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
    Onrelease_date_iChange(data) {},
    doBack() {
      this.$router.go(-1);
    },
    M_ClearForm() {
      this.Model = {
        reservation_no: "",
        reservation_date: "",
        project_name: "",
        release_date: "",
        remarks: "",
        release_date_i: new Date(),
        reason: "",
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
        reservation_id: this.paramFromList.id,
        unit_id: this.paramFromList.unit_id,
        release_date: this.momentDateToUnix( this.Model.release_date_i, "YYYY-MM-DD" ),
        release_description: this.Model.reason
      }

      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/waiting-list/release",
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
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/waiting-list/detail",
        {unit_id: this.paramFromList.unit_id}
      ).then((response) => {
        if (response == null) return;
        let data = response.data;
        this.Model.reservation_id = data.reservation_id;
        this.Model.reservation_no = data.reservation_no;
        this.Model.tower = data.tower;
        this.Model.floor = data.floor;
        this.Model.unit_no = data.unit_no;
        this.Model.reservation_date = this.momentUnix(data.reserved_start_time, "YYYY-MM-DD");
        this.Model.project_name = data.project_name;
        this.Model.release_date = this.momentUnix(data.reserved_until, "YYYY-MM-DD");
        this.Model.remarks = data.remarks;
      });
    },
  },
  mounted() {
    this.M_ClearForm();
    this.GetDataBy();
  },
};
</script>

