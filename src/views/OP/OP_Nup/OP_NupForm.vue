<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>{{title}} NUP</span>
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
                          <label><span style="color:red;">* </span>NUP Event</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_nup_event"
                          v-model="Model.nup_event"
                          ref="ref_nup_event"
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
                          <label><span style="color:red;">* </span>Start DateTime</label>
                        </span>
                        <HOODateTime
                          :prop="PI_start_date"
                          @input="OnStartDateChange"
                          v-model="Model.start_date"
                          ref="ref_start_date"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color:red;">* </span>End DateTime</label>
                        </span>
                        <HOODateTime
                          :prop="PI_end_date"
                          @input="OnEndDateChange"
                          v-model="Model.end_date"
                          ref="ref_end_date"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color:red;">* </span>Value</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_value"
                          v-model="Model.value"
                          ref="ref_value"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Refund Date</label>
                        </span>
                        <HOODateTime
                          :prop="PI_refund_date"
                          @input="Onrefund_dateChange"
                          v-model="Model.refund_date"
                          ref="ref_refund_date"
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
        nup_id : "",
        project_id: "",
        nup_event: "",
        start_datetime: "",
        end_datetime: "",
        value: "",
        refund_date: ""
      },
      PI_nup_event: {
        cValidate: "required|max:100",
        cName: "NUP Event",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_start_date: {
        cValidate: "required",
        cName: "Start Date Time",
        cOrder: 2,
        cKey: false,
        cProtect: false,
        cWithTime: true,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry"
      },
      PI_end_date: {
        cValidate: "required",
        cName: "End Date Time",
        cOrder: 3,
        cKey: false,
        cProtect: false,
        cWithTime: true,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry"
      },
      PI_value: {
        cValidate: "required",
        cName: "Value",
        cOrder: 4,
        cKey: false,
        cType: "decimal",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_refund_date: {
        cValidate: "",
        cName: "Refund Date",
        cOrder: 3,
        cKey: false,
        cProtect: false,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry"
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
      if (param.ForNUP.isEdit && param.ForNUP.isEdit === true) {
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
        nup_id : "",
        project_id: "",
        nup_event: "",
        start_datetime: "",
        end_datetime: "",
        value: "",
        refund_date: ""
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
      let param = {
        ...this.Model,
        project_id: this.paramFromList.id,
        start_datetime: this.momentDateToUnix(this.Model.start_date, 'YYYY-MM-DD HH:mm'),
        end_datetime: this.momentDateToUnix(this.Model.end_date, 'YYYY-MM-DD HH:mm'),
        refund_date: this.Model.refund_date,
        value: this.replaceAllString(this.Model.value, ',', '', 'number')
      }
      this.postJSON(this.urlHoonian + '/api/hoonian-website/view-nup-addedit', param).then((response) => {
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
      this.Model.project_id = this.paramFromList.id;
      this.Model.nup_id = this.paramFromList.ForNUP.id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/view-nup-detail', this.Model).then((response) => {
        if (response == null) return;
        let data = response.data.project_master_detail;
        this.Model = data;
        this.Model.nup_id = data.id;
        this.Model.start_date = this.momentUnix(data.start_datetime, 'YYYY-MM-DD HH:mm');
        this.Model.end_date = this.momentUnix(data.end_datetime, 'YYYY-MM-DD HH:mm');
        this.Model.refund_date = data.refund_date;
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

