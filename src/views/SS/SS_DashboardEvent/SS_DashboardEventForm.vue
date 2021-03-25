<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>{{title}} Dashboard Event</span>
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
                          <label><span style="color:red;">* </span>Event Name</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_event_name"
                          v-model="Model.event_name"
                          ref="ref_event_name"
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
                          <label><span style="color:red;">* </span>Start Date</label>
                        </span>
                        <HOODateTime
                          :prop="PI_start_date"
                          @input="OnStartDateChange"
                          v-model="Model.start_datetime"
                          ref="ref_start_datetime"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color:red;">* </span>End Date</label>
                        </span>
                        <HOODateTime
                          :prop="PI_end_date"
                          @input="OnEndDateChange"
                          v-model="Model.end_datetime"
                          ref="ref_end_datetime"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color:red;">* </span>Main Picture</label>
                        </span>
                        <br />
                        <img id="picture"
                          :src="Model.main_picture == '' ?
                          default_pic: urlHoonian + Model.main_picture"
                          alt height="150" />
                        <HOOImageUpload
                          :prop="PI_main_picture"
                          @change="onMainPictureChange"
                          v-model="Model.main_picture"
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
      default_pic: require("@/assets/default_photo_.png"),

      Model: {
        dashboard_event_id: "",
        event_name: "",
        start_datetime: "",
        end_datetime: "",
        main_picture: "", 
        header_body_text_id: "",
        media_id: ""
      },
      PI_event_name: {
        cValidate: "required|max:100",
        cName: "event name",
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
        cName: "start date",
        cOrder: 2,
        cKey: false,
        cProtect: false,
        cWithTime: true,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry"
      },
      PI_end_date: {
        cValidate: "required",
        cName: "end date",
        cOrder: 3,
        cKey: false,
        cProtect: false,
        cWithTime: true,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry"
      },
      PI_main_picture: {
        cValidate: "required",
        cName: "main picture",
        cOrder: 4,
        cTitle: "Add Picture",
        cType: "event",
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
      this.Model = {
        dashboard_event_id: "",
        event_name: "",
        start_datetime: "",
        end_datetime: "",
        main_picture: "", 
        header_body_text_id: "",
        media_id: ""
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
        start_datetime: this.momentDateToUnix(this.Model.start_datetime, 'YYYY-MM-DD HH:mm'),
        end_datetime: this.momentDateToUnix(this.Model.end_datetime, 'YYYY-MM-DD HH:mm'),
      };
      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard-event-addedit', param).then((response) => {
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
      this.Model.dashboard_event_id = this.paramFromList.id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard-event-detail', this.Model).then((response) => {
        if (response == null) return;
        this.Model = response.data.dashboard_event_detail;
        this.Model.dashboard_event_id = this.Model.id;
        this.Model.start_datetime = this.momentUnix(this.Model.start_datetime, 'YYYY-MM-DD HH:mm');
        this.Model.end_datetime = this.momentUnix(this.Model.end_datetime, 'YYYY-MM-DD HH:mm');
      });
    },
    OnActiveChange(data) {
      this.$nextTick(() => {
      });
    },
    onMainPictureChange(data) {
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

