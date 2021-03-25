<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>{{title}} Event Detail</span>
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
                          <label>Title</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_title"
                          v-model="Model.title"
                          ref="ref_title"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Description</label>
                        </span>
                        <ACCTextArea
                          :prop="PI_description"
                          v-model="Model.description"
                          ref="ref_description"
                        />
                      </b-col>
                    </b-row>      
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Picture</label>
                        </span>
                        <br />
                        <img id="picture"
                          :src="Model.picture == '' ?
                          default_pic: urlHoonian + Model.picture"
                          alt height="150" />
                        <HOOImageUpload
                          :prop="PI_picture"
                          @change="onPictureChange"
                          v-model="Model.picture"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Youtube</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_youtube"
                          v-model="Model.youtube"
                          ref="ref_youtube"
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
        id: "",
        header_body_text_id : "",
        title: "",
        description: "",
        picture: "",
        youtube: "",
      },
      PI_title: {
        cValidate: "max:100",
        cName: "event name",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_description: {
        cValidate: "max:1000",
        cName: "description",
        cOrder: 2,
        cKey: false,
        cProtect: false,
        cResize: false,
        cReadonly: false,
        cRows: 1,
        cMaxRows: 3,
        cSize: "md",
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus
      },
      PI_picture: {
        cValidate: "",
        cName: "picture",
        cOrder: 3,
        cTitle: "Add Picture",
        cType: "event",
        cParentForm: "FormEntry"
      },
      PI_youtube: {
        cValidate: "max:200",
        cName: "youtube",
        cOrder: 4,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
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
      this.Model = {
        id: "",
        header_body_text_id : "",
        title: "",
        description: "",
        picture: "",
        youtube: "",
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
      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard-event-view-addedit', this.Model).then((response) => {
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
      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard-event-view-detail', this.Model).then((response) => {
        if (response == null) return;
        this.Model = response.data.dashboard_event_view_detail;
        // this.Model.dashboard_event_id = this.Model.id;
        // this.Model.start_datetime = this.momentUnix(this.Model.start_datetime, 'YYYY-MM-DD HH:mm');
        // this.Model.end_datetime = this.momentUnix(this.Model.end_datetime, 'YYYY-MM-DD HH:mm');
      });
    },
    OnActiveChange(data) {
      this.$nextTick(() => {
      });
    },
    onPictureChange(data) {
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
    this.Model.header_body_text_id = this.paramFromList.ForNew.header_body_text_id;
    this.Model.id = this.paramFromList.DetailList.id;
  },
};
</script>

