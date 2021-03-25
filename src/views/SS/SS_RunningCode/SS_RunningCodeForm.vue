<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>{{title}} Running Code</span>
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
              <b-form :data-vv-scope="'SS_RunningCodeForm'" :data-vv-value-path="'SS_RunningCodeForm'">
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
                          <label><span style="color:red;">* </span>Running Code</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_running_cd"
                          v-model="M_SS_RunningCode.running_cd"
                          ref="ref_running_code"
                        />
                      </b-col>
                      <b-col style="text-align: right;" v-show="inputStatus=='edit'">
                        {{M_SS_RunningCode.user_name}} <br>
                        {{momentDateFormatting(new Date(M_SS_RunningCode.time_edit), "DD MMM YYYY")}}
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color:red;">* </span>Description</label>
                        </span>
                        <ACCTextBox :prop="PI_descs" v-model="M_SS_RunningCode.descs" ref="ref_descs" />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Reset Number On</label>
                        </span>
                        <ACCRadioButton
                          @input="OnChangeResetNumberOn"
                          :prop="PI_reset_number_on"
                          v-model="M_SS_RunningCode.resetNumberOn"
                          ref="ref_resetNumberOn"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color:red;">* </span>Number of digit</label>
                        </span>
                        <ACCTextBox
                          @input="fn_changeLength"
                          :prop="PI_number_of_digit"
                          v-model="M_SS_RunningCode.numberOfDigit"
                          ref="ref_number_of_digit"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="4">
                        <span>
                          <label><span style="color:red;">* </span>Format</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_format"
                          @input="OnChangeFormat"
                          v-model="M_SS_RunningCode.format"
                          ref="ref_format"
                        />
                      </b-col>
                      <b-col md="2">
                        <span>
                          <label>&nbsp;</label>
                        </span>
                        <div style="margin-top: 8px;">
                          <label>Output Length {{M_SS_RunningCode.outPutlength}}</label>
                        </div>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6" v-show="err1 || err2 || err3">
                        <b-row v-show="err1">
                          <b-col><label style="color:red"> Format Must Contain $N </label></b-col>
                        </b-row>
                        <b-row v-show="err2">
                          <b-col><label style="color:red"> If Reset Number On Monthly, Format Must Contain $Y And $M</label></b-col>
                        </b-row>
                        <b-row v-show="err3">
                          <b-col><label style="color:red"> If Reset Number On Yearly, Format Must Contain $Y </label></b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        $D(Day) $M(Month) $Y(Year)
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        $N(Running Number)
                      </b-col>
                    </b-row>
                    <b-row style="margin-top: 10px;">
                      <b-col md="6">
                        <span>
                          <label>Year Format</label>
                        </span>
                        <ACCRadioButton
                          @input="fn_changeLength"
                          :prop="PI_year_format"
                          v-model="M_SS_RunningCode.yearFormat"
                          ref="ref_yearFormat"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Module</label>
                        </span>
                        <ACCDropDown
                          @change="OnModuleChange"
                          :prop="PI_module"
                          v-model="M_SS_RunningCode.module"
                          :label="M_SS_RunningCode.moduleLabel"
                          ref="ref_module"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Remarks</label>
                        </span>
                        <ACCTextBox :prop="PI_remarks" v-model="M_SS_RunningCode.remarks" ref="ref_remarks" />
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

      error: false,
      err1: false,
      err2: false,
      err3: false,

      M_SS_RunningCode: {
        outPutlength: 0,
        running_cd_id: 0,
        running_cd: "",
        descs: "",
        resetNumberOn: "N",
        numberOfDigit: 0,
        format: "",
        yearFormat: "4",
        module: 0,
        moduleLabel: "",
        remarks:"",
        in_use: "",
        
        user_input: "",
        user_edit: "",
        time_input: "",
        time_edit: "",
        row_id: 0,
        lastupdatestamp: 0,
      },
      PI_running_cd: {
        cValidate: "required|max:6",
        cName: "running_cd",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "SS_RunningCodeForm",
        cInputStatus: this.inputStatus,
      },
      PI_descs: {
        cValidate: "required",
        cName: "descs",
        cOrder: 2,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "SS_RunningCodeForm",
        cInputStatus: this.inputStatus,
      },
      PI_reset_number_on: {
        cValidate: "",
        cName: "resetNumberOn",
        cId: "rdbresetNumberOn",
        cRadioOptions: [
          { text: "Month", value: "M" },
          { text: "Year", value: "Y" },
          { text: "Never", value: "N" },
        ],
        cRadioDefaultOption: "N",
        cOrder: 3,
        cProtect: false,
        cVisible: true,
        cGroup: false,
        cParentForm: "SS_RunningCodeForm",
        cInputStatus: this.inputStatus,
      },
      PI_number_of_digit: {
        cValidate: "required",
        cName: "number_of_digit",
        cOrder: 4,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "SS_RunningCodeForm",
        cInputStatus: this.inputStatus,
      },
      PI_format: {
        cValidate: "required",
        cName: "format",
        cOrder: 5,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "SS_RunningCodeForm",
        cInputStatus: this.inputStatus,
      },
      PI_year_format: {
        cValidate: "",
        cName: "yearFormat",
        cId: "rdbYearFormat",
        cRadioOptions: [
          { text: "4 Digit", value: "4" },
          { text: "2 Digit", value: "2" },
        ],
        cRadioDefaultOption: "4",
        cOrder: 6,
        cProtect: false,
        cVisible: true,
        cGroup: false,
        cParentForm: "SS_RunningCodeForm",
        cInputStatus: this.inputStatus,
      },
      PI_module: {
        dataLookUp: null,
        cValidate: "",
        cName: "module",
        ckey: false,
        cOrder: 7,
        // cDefault: '',
        cProtect: false,
        cParentForm: "SS_RunningCodeForm",
        cStatic: true,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
      PI_remarks: {
        cValidate: "",
        cName: "remarks",
        cOrder: 8,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "SS_RunningCodeForm",
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
    isValidate() {
      if (!this.M_SS_RunningCode.format.includes('$N')) return false;
      if (this.M_SS_RunningCode.resetNumberOn == 'Y') {
        if (!this.M_SS_RunningCode.format.includes('$Y')) {
          return false;
        }
      }
      if (this.M_SS_RunningCode.resetNumberOn == 'M') {
        if (!this.M_SS_RunningCode.format.includes('$Y') || !this.M_SS_RunningCode.format.includes('$M')) {
          return false;
        }
      }
      return true;
    },
    OnChangeResetNumberOn() {
      this.OnChangeFormat(this.M_SS_RunningCode.format);
    },
    OnChangeFormat(data) {
      this.fn_changeLength();                
      if (!data.includes('$N')) {
        this.error = true;
        this.err1 = true;
      } else {
        this.err1 = false;
        this.error = false;
      }      

      if (this.M_SS_RunningCode.resetNumberOn == 'M') {
          if (!data.includes('$Y') || !data.includes('$M')) {
            this.err2 = true;
            this.error = true;
          } else {
            this.err2 = false;
            this.error = false;
          }
      }
      else {
          this.err2 = false;
          this.error = false;
      }

      if (this.M_SS_RunningCode.resetNumberOn == 'Y') {
          if (!data.includes('$Y')) {
            this.err3 = true;
            this.error = true;
          }
          else {
            this.err3 = false;
            this.error = false;
          }
      }
      else {
        this.err3 = false;
        this.error = false;
      }
    },
    OnModuleChange(data) {
      this.$nextTick(() => {
        this.M_SS_RunningCode.module = data.id;
        this.M_SS_RunningCode.moduleLabel = data.label;
      });
      this.$forceUpdate();
    },

    M_ClearForm() {
      this.M_SS_RunningCode = {
        outPutlength: 0,
        running_cd_id: 0,
        running_cd: "",
        descs: "",
        resetNumberOn: "N",
        numberOfDigit: 0,
        format: "",
        yearFormat: "4",
        module: 0,
        moduleLabel: "",
        remarks:"",
        in_use: "",
        
        user_input: "",
        user_edit: "",
        time_input: "",
        time_edit: "",
        row_id: 0,
        lastupdatestamp: 0,
      };
    },

    doSave() {
      this.$validator._base.validateAll("SS_RunningCodeForm").then((result) => {
        if (!result) return;
        if (!this.isValidate()) return;
        if (this.M_SS_RunningCode.outPutlength > 20) {
          this.alertError('Max Output Length is 20');
          return;
        }
        this.alertConfirmation("Are You Sure Want To Save This Data ?").then(
          (ress) => {
            if (ress.value) {
              this.$validator.errors.clear("SS_RunningCodeForm");
              if (this.inputStatus == "edit") {
                this.M_Update();
              } else {
                this.M_Save();
              }
            }
          }
        );
      });
    },
    M_Save() {
      var param = {
        option_url: "/SS/SS_RunningCode",
        line_no: 0,
        ss_portfolio_id: this.getDataUser().portfolio_id,
        ss_subportfolio_id: this.getDataUser().portfolio_id,
        running_cd: this.M_SS_RunningCode.running_cd,
        descs: this.M_SS_RunningCode.descs,
        base_on: "P",
        reset_on: this.M_SS_RunningCode.resetNumberOn,
        number_digit: this.M_SS_RunningCode.numberOfDigit,
        format_type: this.M_SS_RunningCode.format,
        year_format: this.M_SS_RunningCode.yearFormat,
        ss_module_id: this.M_SS_RunningCode.module,
        remarks: this.M_SS_RunningCode.remarks,
        control_sequence_no: 0,
        user_input: this.getDataUser().user_id,
      };

      this.postJSON(this.getUrlCRUD(), param).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
    M_Update() {
      var param = {
        option_url: "/SS/SS_RunningCode",
        line_no: 0,
        ss_running_cd_id: this.M_SS_RunningCode.running_cd_id,
        ss_portfolio_id: this.getDataUser().portfolio_id,
        ss_subportfolio_id: this.getDataUser().portfolio_id,
        running_cd: this.M_SS_RunningCode.running_cd,
        descs: this.M_SS_RunningCode.descs,
        base_on: "P",
        reset_on: this.M_SS_RunningCode.resetNumberOn,
        number_digit: this.M_SS_RunningCode.numberOfDigit,
        format_type: this.M_SS_RunningCode.format,
        year_format: this.M_SS_RunningCode.yearFormat,
        ss_module_id: this.M_SS_RunningCode.module,
        remarks: this.M_SS_RunningCode.remarks,
        control_sequence_no: 0,
        lastupdatestamp: this.M_SS_RunningCode.lastupdatestamp,
        user_edit: this.getDataUser().user_id,
      };

      this.putJSON(this.getUrlCRUD(), param).then((response) => {
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
      var param = {
        option_url: "/SS/SS_RunningCode",
        line_no: { LineNo },
        id: this.paramFromList.row_id,
        lastupdatestamp: this.paramFromList.lastupdatestamp,
      };
      this.deleteJSON(this.getUrlCRUD(), param).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
    GetDataBy() {
      var param = {
        option_url: "/SS/SS_RunningCode",
        line_no: 0,
        id: this.paramFromList.row_id,
        lastupdatestamp: 0,
      };

      this.getJSON(this.getUrlCRUD(), param).then((response) => {
        // response from API
        if (response == null) return;

        var data = response.Data[0];

        this.M_SS_RunningCode = {          
          running_cd_id: data.ss_running_cd_id,
          running_cd: data.running_cd,
          descs: data.descs,
          resetNumberOn: data.reset_on,
          numberOfDigit: data.number_digit,
          format: data.format_type,
          yearFormat: data.year_format,
          module: data.ss_module_id,
          moduleLabel: data.module_descs,
          remarks: data.remarks,
          in_use: data.in_use,

          user_input: data.user_input,
          user_edit: data.user_edit,
          time_input: data.time_input,
          time_edit: data.time_edit,
          row_id: data.row_id,
          lastupdatestamp: data.lastupdatestamp,
        };

        if (data.in_use) {
          if (data.in_use.toUpperCase() == 'Y') {
            this.PI_reset_number_on.cProtect = true;
          }
        }
        this.getUserInfo(data.user_edit).then((response) => {
          if (response == null) return;
          this.M_SS_RunningCode.user_name = response.user_name;
          this.$forceUpdate();
        });
      });
    },
    getDataModule() {
      var param = "/datalist";
      this.getJSON(this.getUrlSsModule() + param).then(response => {
        if (response == null) return;
        var data = response.Data;
        let modules = [];
        if (data.length > 0) {
          data.forEach((dt, idx) => {
            modules.push({
              label: dt.descs,
              id: dt.ss_module_id
            });
          });
          this.PI_module.cOption = modules;
          // });
        }
      });
    },
    fn_changeLength() {
      let ln = 0
      let data = this.M_SS_RunningCode.format;
      if (data == '') {
        ln = 0;
      } else {
        ln = data.length;
      }
      if (data.includes('$N')) {
        if (this.M_SS_RunningCode.numberOfDigit > 2) {
            ln += this.M_SS_RunningCode.numberOfDigit - 2;
        }
      }
      if (data.includes('$Y')) {
        if (this.M_SS_RunningCode.yearFormat == '4') {
            ln += 2;
        }
      }
      this.M_SS_RunningCode.outPutlength = ln;
    },
  },
  async mounted() {
    this.M_ClearForm();
    await this.getDataModule();
    if (this.inputStatus == "edit") {
      this.title = "Edit";
      this.GetDataBy();
      this.PI_running_cd.cProtect = true;
    } else {
      this.title = "Add";
    }
  },
};
</script>

