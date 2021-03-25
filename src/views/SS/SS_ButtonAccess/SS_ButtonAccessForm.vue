<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>{{title}} Button Access</span>
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
              <b-form :data-vv-scope="'SS_ButtonAccessForm'" :data-vv-value-path="'SS_ButtonAccessForm'">
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
                          <label><span style="color:red;">* </span>Option Url</label>
                        </span>
                        <ACCTextBox :prop="PI_option_url" v-model="M_ButtonAccess.option_url" ref="ref_option_url" />
                      </b-col>
                      <b-col style="text-align: right;" v-show="inputStatus=='edit'">
                        {{M_ButtonAccess.user_name}} <br>
                        {{momentDateFormatting(new Date(M_ButtonAccess.time_edit), "DD MMM YYYY")}}
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color:red;">* </span>Menu Url</label>
                        </span>
                        <ACCTextBox :prop="PI_menu_url" v-model="M_ButtonAccess.menu_url" ref="ref_menu_url" />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color:red;">* </span>Form Name</label>
                        </span>
                        <ACCTextBox :prop="PI_display_form" v-model="M_ButtonAccess.display_form" ref="ref_display_form" />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color:red;">* </span>Button Id</label>
                        </span>
                        <ACCTextBox :prop="PI_button_id" v-model="M_ButtonAccess.button_id" ref="ref_button_id" />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color:red;">* </span>Button Name</label>
                        </span>
                        <ACCTextBox :prop="PI_display_button" v-model="M_ButtonAccess.display_button" ref="ref_display_button" />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color:red;">* </span>Sequence Form</label>
                        </span>
                        <ACCTextBox :prop="PI_sequence_form" v-model="M_ButtonAccess.sequence_form" ref="ref_sequence_form" />
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

      M_ButtonAccess: {
        option_url: "",
        menu_url: "",
        display_form: "",
        button_id: "",
        display_button: "",
        sequence_form: 0,

        user_input: "",
        user_edit: "",
        time_input: "",
        time_edit: "",
        row_id: 0,
        lastupdatestamp: 0,
      },
      PI_option_url: {
        cValidate: "required",
        cName: "option_url",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "SS_ButtonAccessForm",
        cInputStatus: this.inputStatus,
      },
      PI_menu_url: {
        cValidate: "required",
        cName: "menu_url",
        cOrder: 2,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "SS_ButtonAccessForm",
        cInputStatus: this.inputStatus,
      },
      PI_display_form: {
        cValidate: "required",
        cName: "display_form",
        cOrder: 3,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "SS_ButtonAccessForm",
        cInputStatus: this.inputStatus,
      },
      PI_button_id: {
        cValidate: "required",
        cName: "button_id",
        cOrder: 4,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "SS_ButtonAccessForm",
        cInputStatus: this.inputStatus,
      },
      PI_display_button: {
        cValidate: "required",
        cName: "display_button",
        cOrder: 5,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "SS_ButtonAccessForm",
        cInputStatus: this.inputStatus,
      },
      PI_sequence_form: {
        cValidate: "required",
        cName: "sequence_form",
        cOrder: 6,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "SS_ButtonAccessForm",
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
      this.M_ButtonAccess = {
        option_url: "",
        menu_url: "",
        display_form: "",
        button_id: "",
        display_button: "",

        user_input: "",
        user_edit: "",
        time_input: "",
        time_edit: "",
        row_id: 0,
        lastupdatestamp: 0,
      };
    },

    doSave() {
      this.$validator._base.validateAll("SS_ButtonAccessForm").then((result) => {
        if (!result) return;
        this.alertConfirmation("Are You Sure Want To Save This Data ?").then(
          (ress) => {
            if (ress.value) {
              this.$validator.errors.clear("SS_ButtonAccessForm");
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
        option_url: "/SS/SS_ButtonAccess",
        line_no: 0,

        menu_url: this.M_ButtonAccess.menu_url,
        button_id: this.M_ButtonAccess.button_id,
        user_input: this.getDataUser().user_id,
        options_url: this.M_ButtonAccess.option_url,
        display_form: this.M_ButtonAccess.display_form,
        display_button: this.M_ButtonAccess.display_button,
        sequence_form: this.M_ButtonAccess.sequence_form,
        ss_menu_dashboard_id: 'NULL',
      };

      this.postJSON(this.getUrlCRUD(), param).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
    M_Update() {
      var param = {
        option_url: "/SS/SS_ButtonAccess",
        line_no: 0,

        ss_menu_button_id: this.M_ButtonAccess.row_id,
        menu_url: this.M_ButtonAccess.menu_url,
        button_id: this.M_ButtonAccess.button_id,
        lastupdatestamp: this.paramFromList.lastupdatestamp,
        user_edit: this.getDataUser().user_id,
        options_url: this.M_ButtonAccess.option_url,
        display_form: this.M_ButtonAccess.display_form,
        display_button: this.M_ButtonAccess.display_button,
        sequence_form: this.M_ButtonAccess.sequence_form,
        ss_menu_dashboard_id: 'NULL',
      };

      this.putJSON(this.getUrlCRUD(), param).then((response) => {
        if (response == null) return;
        if (this.inputStatus == "new") {
          this.doBack();
        } else {
          this.$router.replace({ name: "SS_ButtonAccess" });
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
        option_url: "/SS/SS_ButtonAccess",
        line_no: 0,
        id: this.paramFromList.row_id,
        lastupdatestamp: this.paramFromList.lastupdatestamp,
      };

      this.getJSON(this.getUrlCRUD(), param).then((response) => {
        // response from API
        if (response == null) return;

        var data = response.Data[0];

        this.M_ButtonAccess = {
          option_url: data.option_url,
          menu_url: data.menu_url,
          display_form: data.display_form,
          button_id: data.button_id,
          display_button: data.display_button,
          sequence_form: data.sequence_form,

          user_input: data.user_input,
          user_edit: data.user_edit,
          time_input: data.time_input,
          time_edit: data.time_edit,
          row_id: data.row_id,
          lastupdatestamp: data.lastupdatestamp,
        };
        this.getUserInfo(data.user_edit).then((response) => {
          if (response == null) return;
          this.M_ButtonAccess.user_name = response.user_name;
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
      this.PI_button_id.cProtect = true;
    } else {
      this.title = "Add";
    }
  },
};
</script>

