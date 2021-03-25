<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>{{title}} Reason</span>
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
              <b-form :data-vv-scope="'ADM_FormReason'" :data-vv-value-path="'ADM_FormReason'">
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
                          <label><span style="color:red;">* </span>Reason Cd</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_reason_cd"
                          v-model="M_ADMReason.reason_cd"
                          ref="ref_reason_cd"
                        />
                      </b-col>
                      <b-col style="text-align: right;" v-show="inputStatus=='edit'">
                        {{M_ADMReason.user_name}} <br>
                        {{momentDateFormatting(new Date(M_ADMReason.time_edit), "DD MMM YYYY")}}
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color:red;">* </span>Description</label>
                        </span>
                        <ACCTextBox :prop="PI_descs" v-model="M_ADMReason.descs" ref="ref_descs" />
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

      M_ADMReason: {
        cm_reason_id: 0,
        ss_portfolio_id: 0,
        reason_cd: "",
        descs: "",
        user_input: "",
        user_edit: "",
        time_input: "",
        time_edit: "",
        row_id: 0,
        lastupdatestamp: 0,
      },
      PI_reason_cd: {
        cValidate: "required",
        cName: "reason_cd",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "ADM_FormReason",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_descs: {
        cValidate: "required",
        cName: "descs",
        cOrder: 2,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "ADM_FormReason",
        cDecimal: 2,
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

    M_ClearForm() {
      this.M_ADMReason = {
        cm_reason_id: 0,
        ss_portfolio_id: 0,
        reason_cd: "",
        descs: "",
        user_input: "",
        user_edit: "",
        time_input: "",
        time_edit: "",
        row_id: 0,
        lastupdatestamp: 0,
      };
    },

    doSave() {
      this.$validator._base.validateAll("ADM_FormReason").then((result) => {
        if (!result) return;
        this.alertConfirmation("Are You Sure Want To Save This Data ?").then(
          (ress) => {
            if (ress.value) {
              this.$validator.errors.clear("ADM_FormReason");
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
        option_url: "/ADM/ADM_Reason",
        line_no: 0,
        ss_portfolio_id: this.getDataUser().portfolio_id,
        reason_cd: this.M_ADMReason.reason_cd,
        descs: this.M_ADMReason.descs,
        user_input: this.getDataUser().user_id,
      };

      this.postJSON(this.getUrlCRUD(), param).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
    M_Update() {
      var param = {
        option_url: "/ADM/ADM_Reason",
        line_no: 0,
        cm_reason_id: this.M_ADMReason.cm_reason_id,
        ss_portfolio_id: this.getDataUser().portfolio_id,
        reason_cd: this.M_ADMReason.reason_cd,
        descs: this.M_ADMReason.descs,
        lastupdatestamp: this.paramFromList.lastupdatestamp,
        user_edit: this.getDataUser().user_id,
      };

      this.putJSON(this.getUrlCRUD(), param).then((response) => {
        if (response == null) return;
        if (this.inputStatus == "new") {
          this.doBack();
        } else {
          this.$router.replace({ name: "ADM_Reason" });
        }
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
        option_url: "/ADM/ADM_Reason",
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
        option_url: "/ADM/ADM_Reason",
        line_no: 0,
        id: this.paramFromList.row_id,
        lastupdatestamp: this.paramFromList.lastupdatestamp,
      };

      this.getJSON(this.getUrlCRUD(), param).then((response) => {
        // response from API
        if (response == null) return;

        var data = response.Data[0];

        this.M_ADMReason = {
          cm_reason_id: data.cm_reason_id,
          ss_portfolio_id: data.ss_portfolio_id,
          reason_cd: data.reason_cd,
          descs: data.descs,
          user_input: data.user_input,
          user_edit: data.user_edit,
          time_input: data.time_input,
          time_edit: data.time_edit,
          row_id: data.row_id,
          lastupdatestamp: data.lastupdatestamp,
        };
        this.getUserInfo(data.user_edit).then((response) => {
          if (response == null) return;
          this.M_ADMReason.user_name = response.user_name;
          this.$forceUpdate();
        });
      });
    },
  },
  mounted() {
    this.M_ClearForm();
    if (this.inputStatus == "edit") {
      this.title = "Edit";
      this.GetDataBy();
      this.PI_reason_cd.cProtect = true;
    } else {
      this.title = "Add";
    }
  },
};
</script>

