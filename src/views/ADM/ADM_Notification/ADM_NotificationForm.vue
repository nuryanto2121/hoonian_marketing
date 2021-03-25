<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>{{title}} Notification</span>
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
              <b-form :data-vv-scope="'ADM_FormNotification'" :data-vv-value-path="'ADM_FormNotification'">
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
                          <label><span style="color:red;">* </span>Menu Url</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_menu_url"
                          v-model="M_ADM_Notification.menu_url"
                          ref="ref_menu_url"
                        />
                      </b-col>
                      <b-col style="text-align: right;" v-show="inputStatus=='edit'">
                        {{M_ADM_Notification.user_name}} <br>
                        {{momentDateFormatting(new Date(M_ADM_Notification.time_edit), "DD MMM YYYY")}}
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color:red;">* </span>Description</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_descs"
                          v-model="M_ADM_Notification.descs"
                          ref="ref_descs"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color:red;">* </span>Source From</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_source_from"
                          v-model="M_ADM_Notification.sp"
                          ref="ref_descs"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color:red;">* </span>Link URL</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_link_url"
                          v-model="M_ADM_Notification.link_url"
                          ref="ref_descs"
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

      M_ADM_Notification: {
        notification_id: 0,
        menu_url: "",
        descs: "",
        sp: "",
        link_url: "",

        user_input: "",
        user_edit: "",
        time_input: "",
        time_edit: "",
        row_id: 0,
        lastupdatestamp: 0,
      },
      PI_menu_url: {
        cValidate: "required",
        cName: "menu_url",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "ADM_FormNotification",
        cInputStatus: this.inputStatus,
      },
      PI_descs: {
        cValidate: "required",
        cName: "descs",
        cOrder: 2,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "ADM_FormNotification",
        cInputStatus: this.inputStatus,
      },
      PI_source_from: {
        cValidate: "required",
        cName: "source_from",
        cOrder: 3,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "ADM_FormNotification",
        cInputStatus: this.inputStatus,
      },
      PI_link_url: {
        cValidate: "required",
        cName: "link_url",
        cOrder: 4,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "ADM_FormNotification",
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
      this.M_ADM_Notification = {
        notification_id: 0,
        menu_url: "",
        descs: "",
        sp: "",
        link_url: "",

        user_input: "",
        user_edit: "",
        time_input: "",
        time_edit: "",
        row_id: 0,
        lastupdatestamp: 0,
      };
    },

    doSave() {
      this.$validator._base.validateAll("ADM_FormNotification").then((result) => {
        if (!result) return;
        this.alertConfirmation("Are You Sure Want To Save This Data ?").then(
          (ress) => {
            if (ress.value) {
              this.$validator.errors.clear("ADM_FormNotification");
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
        option_url: "/ADM/ADM_Notification",
        line_no: 0,
        ss_portfolio_id: this.getDataUser().portfolio_id,
        menu_url: this.M_ADM_Notification.menu_url,
        descs: this.M_ADM_Notification.descs,
        sp: this.M_ADM_Notification.sp,
        link_url: this.M_ADM_Notification.link_url,
        user_input: this.getDataUser().user_id,
      };

      this.postJSON(this.getUrlCRUD(), param).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
    M_Update() {
      var param = {
        option_url: "/ADM/ADM_Notification",
        line_no: 0,
        ss_notification_mstr_id: this.M_ADM_Notification.notification_id,
        ss_portfolio_id: this.getDataUser().portfolio_id,
        menu_url: this.M_ADM_Notification.menu_url,
        descs: this.M_ADM_Notification.descs,
        sp: this.M_ADM_Notification.sp,
        link_url: this.M_ADM_Notification.link_url,
        lastupdatestamp: this.paramFromList.lastupdatestamp,
        user_edit: this.getDataUser().user_id,
      };

      this.putJSON(this.getUrlCRUD(), param).then((response) => {
        if (response == null) return;
        if (this.inputStatus == "new") {
          this.doBack();
        } else {
          this.$router.replace({ name: "ADM_Notification" });
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
        option_url: "/ADM/ADM_Notification",
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
        option_url: "/ADM/ADM_Notification",
        line_no: 0,
        id: this.paramFromList.row_id,
        lastupdatestamp: this.paramFromList.lastupdatestamp,
      };

      this.getJSON(this.getUrlCRUD(), param).then((response) => {
        // response from API
        if (response == null) return;

        var data = response.Data[0];

        this.M_ADM_Notification = {
          notification_id: data.ss_notification_mstr_id,
          ss_portfolio_id: data.ss_portfolio_id,
          menu_url: data.menu_url,
          descs: data.descs,
          sp: data.sp,
          link_url: data.link_url,

          user_input: data.user_input,
          user_edit: data.user_edit,
          time_input: data.time_input,
          time_edit: data.time_edit,
          row_id: data.row_id,
          lastupdatestamp: data.lastupdatestamp,
        };
        this.getUserInfo(data.user_edit).then((response) => {
          if (response == null) return;
          this.M_ADM_Notification.user_name = response.user_name;
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
    } else {
      this.title = "Add";
    }
  },
};
</script>

