<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>Running Code Maintenance</span>
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
                        <ACCDropDown
                          @change="OnChangeRunningCd"
                          :prop="PI_running_code"
                          v-model="M_SS_RunningCode.running_id"
                          :label="M_SS_RunningCode.running_cd"
                          ref="ref_running_code"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Year</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_year"
                          v-model="M_SS_RunningCode.year"
                          ref="ref_year"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Month</label>
                        </span>
                        <ACCTextBox
                          @onBlur="onMonthBlur"
                          :prop="PI_month"
                          v-model="M_SS_RunningCode.month"
                          ref="ref_month"
                        />
                      </b-col>
                    </b-row>
                    <b-row align-v="center">
                      <b-col md="6">
                        <span>
                          <label>Current</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_current"
                          v-model="M_SS_RunningCode.current"
                          ref="ref_current"
                        />
                      </b-col>
                      <b-col align-self="center">
                        {{M_SS_RunningCode.formatCurrent}}
                      </b-col>
                    </b-row>
                    <b-row align-v="center">
                      <b-col md="6">
                        <span>
                          <label>Next</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_next"
                          v-model="M_SS_RunningCode.next"
                          ref="ref_next"
                        />
                      </b-col>
                      <b-col align-self="center">
                        {{M_SS_RunningCode.formatNext}}
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
      M_SS_RunningCode: {
        running_id: 0,
        running_cd: "",

        date: null,
        year: null,
        month: null,
        current: null,
        next: null,
        format_type: null,
        reset_on: null,
        year_format: null,
        number_digit: 0,
        
        formatCurrent: "",
        formatNext: "",
        
        user_input: "",
        user_edit: "",
        time_input: "",
        time_edit: "",
        row_id: 0,
        lastupdatestamp: 0,
      },
      PI_running_code: {
        dataLookUp: {
          LookUpCd: "GetRunningCd",
          ColumnDB: "running_cd",
          InitialWhere: "ss_portfolio_id='" + this.getDataUser().portfolio_id + "'",
          ParamWhere: "",
          OrderBy: "",
          ParamView: "",
          SourceField: "",
          DisplayLookUp: "",
        },
        cValidate: "required",
        cName: "running_code",
        ckey: false,
        cOrder: 1,
        cProtect: false,
        cParentForm: "SS_RunningCodeForm",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
      PI_year: {
        cValidate: "max:4|greater:2000",
        cName: "year",
        cOrder: 2,
        cKey: false,
        cType: "tel",
        cProtect: false,
        cParentForm: "SS_RunningCodeForm",
        cInputStatus: this.inputStatus,
      },
      PI_month: {
        cValidate: "max:2|greater:0",
        cName: "month",
        cOrder: 3,
        cKey: false,
        cType: "tel",
        cProtect: false,
        cParentForm: "SS_RunningCodeForm",
        cInputStatus: this.inputStatus,
      },
      PI_current: {
        cValidate: "max:9|greater:0",
        cName: "current",
        cOrder: 4,
        cKey: false,
        cType: "tel",
        cProtect: false,
        cParentForm: "SS_RunningCodeForm",
        cInputStatus: this.inputStatus,
      },
      PI_next: {
        cValidate: "max:9|greater:0",
        cName: "next",
        cOrder: 5,
        cKey: false,
        cType: "tel",
        cProtect: true,
        cParentForm: "SS_RunningCodeForm",
        cInputStatus: this.inputStatus,
      },
    };
  },
  computed: {
  },
  methods: {
    OnChangeRunningCd(data) {
      this.M_SS_RunningCode.running_id = data.id;
      this.M_SS_RunningCode.running_cd = data.label;

      this.M_SS_RunningCode.format_type = data.format_type;
      this.M_SS_RunningCode.reset_on = data.reset_on;
      this.M_SS_RunningCode.year_format = data.year_format;
      this.M_SS_RunningCode.number_digit = data.number_digit;

      this.getRunningCdDtl(this.M_SS_RunningCode.running_id);
    },
    onMonthBlur() {
      this.getRunningCdDtl(this.M_SS_RunningCode.running_id, this.M_SS_RunningCode.month);
    },
    getRunningCdDtl(id, month = null) {
      let param = {
        option_function_cd: "GetRunningCdDtl",
        module_cd: "SS",
        ss_running_cd_id: id,
        month: month,
      };

      this.CallFunction(param).then(response => {
        if (response == null) return
        let resp = response.Data;

        let formatType = this.M_SS_RunningCode.format_type;
        
        if (resp.length == 0) {          
          let dt = new Date();
          this.M_SS_RunningCode.date = this.padWithZeroes(dt.getDate(), 2);
          this.M_SS_RunningCode.month = month == null ? this.padWithZeroes(dt.getMonth() + 1, 2): month;
          this.M_SS_RunningCode.year = dt.getFullYear();

          this.M_SS_RunningCode.current = 0;
          this.M_SS_RunningCode.next = 1;

          this.M_SS_RunningCode.formatCurrent = 'Not in Use';
          this.M_SS_RunningCode.formatNext = '';
        } else {
          let mth = this.M_SS_RunningCode.reset_on == 'Y' ? this.padWithZeroes(new Date().getMonth() + 1, 2) : this.padWithZeroes(resp[0].running_month, 2);
          this.M_SS_RunningCode.date = this.padWithZeroes(new Date().getDate(), 2);
          this.M_SS_RunningCode.month = mth;
          this.M_SS_RunningCode.year = this.padWithZeroes(resp[0].running_year, 2);

          this.M_SS_RunningCode.current = parseInt(resp[0].running_no);
          this.M_SS_RunningCode.next = parseInt(resp[0].running_no) + 1;
          
          this.M_SS_RunningCode.formatCurrent = formatType.replace("$M", this.M_SS_RunningCode.month);
          this.M_SS_RunningCode.month = parseInt(this.M_SS_RunningCode.month);
          this.M_SS_RunningCode.formatCurrent = this.M_SS_RunningCode.formatCurrent.replace("$Y", this.M_SS_RunningCode.year_format == 4 ? this.M_SS_RunningCode.year : this.M_SS_RunningCode.year.toString().substring(2));
          this.M_SS_RunningCode.formatCurrent = this.M_SS_RunningCode.formatCurrent.replace("$D", this.M_SS_RunningCode.date);
          this.M_SS_RunningCode.formatNext = this.M_SS_RunningCode.formatCurrent.replace("$N", this.padWithZeroes(this.M_SS_RunningCode.next, this.M_SS_RunningCode.number_digit));
          this.M_SS_RunningCode.formatCurrent = this.M_SS_RunningCode.formatCurrent.replace("$N", this.padWithZeroes(this.M_SS_RunningCode.current, this.M_SS_RunningCode.number_digit));
      
        }
        switch (this.M_SS_RunningCode.reset_on) {
          case "M":
            this.PI_month.cProtect = false
            this.PI_year.cProtect = false
            break
          case "Y":
            this.PI_month.cProtect = true
            this.PI_year.cProtect = false
            break
          case "N":
            this.PI_month.cProtect = true
            this.PI_year.cProtect = true
            break
        }
      })
    },
    padWithZeroes(number, length) {
        var my_string = '' + number;
        while (my_string.length < length) {
            my_string = '0' + my_string;
        }
        return my_string;
    },
    doBack() {
      this.$router.go(-1);
    },

    M_ClearForm() {
      this.M_SS_RunningCode = {
        running_id: 0,
        running_cd: "",
        
        date: null,
        year: null,
        month: null,
        current: null,
        next: null,
        format_type: null,
        reset_on: null,
        year_format: null,
        number_digit: 0,
        
        formatCurrent: "",
        formatNext: "",
        
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
        this.alertConfirmation("Are You Sure Want To Save This Data ?").then(
          (ress) => {
            if (ress.value) {
              this.$validator.errors.clear("SS_RunningCodeForm");
              this.M_Save();
            }
          }
        );
      });
    },
    M_Save() {
      var param = {
        option_url: "/SS/SS_RunningCdMaintenance",
        line_no: 0,
        ss_portfolio_id: this.getDataUser().portfolio_id,
        ss_subportfolio_id: this.getDataUser().subportfolio_id,
        ss_running_cd_id: this.M_SS_RunningCode.running_id,
        running_year: this.M_SS_RunningCode.year,
        running_month: this.M_SS_RunningCode.month,
        running_no: this.M_SS_RunningCode.current,
        user_input: this.getDataUser().user_id,
      };

      this.postJSON(this.getUrlCRUD(), param).then((response) => {
        if (response == null) return;
        this.M_ClearForm();
      });
    },    
  },
  async mounted() {
    
  },
};
</script>

