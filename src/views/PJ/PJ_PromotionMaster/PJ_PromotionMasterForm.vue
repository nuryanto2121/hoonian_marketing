<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important">
                  <span>{{ title }} Master Promotion</span>
                </b-col>
                <b-col style="text-align: right">
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
                  <b-col md="2">
                    <div>
                      <img
                        :src="require('@/assets/paper.png')"
                        alt
                        style="width: 70px"
                      />
                    </div>
                  </b-col>
                  <b-col md="10">
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label
                            ><span style="color: red">* </span>Promotion
                            Name</label
                          >
                        </span>
                        <ACCTextBox
                          :prop="PI_promotion_name"
                          v-model="Model.promotion_name"
                          ref="ref_promotion_name"
                        />
                      </b-col>
                      <b-col
                        style="text-align: right"
                        v-show="inputStatus == 'edit'"
                      >
                        {{ Model.user_edit }} <br />
                        {{ momentUnix(Model.updated_at, "DD MMM YYYY") }}
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>
                            <span style="color: red">*</span>
                            Start Date
                          </label>
                        </span>
                        <HOODateTime
                          @input="Onstart_datetimeChange"
                          :prop="PI_start_datetime"
                          v-model="Model.start_datetime"
                          ref="ref_start_datetime"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>
                            <span style="color: red">*</span>
                            End Date
                          </label>
                        </span>
                        <HOODateTime
                          @input="Onend_datetimeChange"
                          :prop="PI_end_datetime"
                          v-model="Model.end_datetime"
                          ref="ref_end_datetime"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>
                            <span style="color: red">*</span>
                            Release Date
                          </label>
                        </span>
                        <HOODateTime
                          @input="Onrelease_datetimeChange"
                          :prop="PI_release_datetime"
                          v-model="Model.release_datetime"
                          ref="ref_release_datetime"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label
                            ><span style="color: red">* </span>Base On</label
                          >
                        </span>
                        <ACCRadioButton
                          @input="Onbased_onChange"
                          :prop="PI_based_on"
                          v-model="Model.based_on"
                          ref="ref_based_on"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label
                            ><span style="color: red">* </span>Picture</label
                          >
                        </span>
                        <br />
                        <img
                          id="picture"
                          :src="
                            Model.picture == ''
                              ? default_pic
                              : urlHoonian + Model.picture
                          "
                          alt
                          height="150"
                        />
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
                          <label>Description</label>
                        </span>
                        <ACCTextArea
                          :prop="PI_description"
                          v-model="Model.description"
                          ref="ref_description"
                        />
                      </b-col>
                    </b-row>
                    <b-row style="margin-top: 10px">
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
        user_id: "",
        promotion_master_id: "",
        project_id: "",
        promotion_name: "",
        start_datetime: 0,
        end_datetime: 0,
        release_datetime: 0,
        based_on: "Selling",
        picture: "",
        description: "",
      },
      PI_promotion_name: {
        cValidate: "required|max:100",
        cName: "promotion_name",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_start_datetime: {
        cValidate: "required",
        cName: "start_datetime",
        cOrder: 2,
        cKey: false,
        cProtect: false,
        cWithTime: true,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_end_datetime: {
        cValidate: "required",
        cName: "end_datetime",
        cOrder: 3,
        cKey: false,
        cProtect: false,
        cWithTime: true,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_release_datetime: {
        cValidate: "required",
        cName: "release_datetime",
        cOrder: 4,
        cKey: false,
        cProtect: false,
        cWithTime: true,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_based_on: {
        cValidate: "required",
        cName: "active",
        cId: "rdactive",
        cRadioOptions: [
          { text: "Selling", value: "Selling" },
          { text: "Booking", value: "Booking" },
        ],
        cRadioDefaultOption: "Selling",
        cOrder: 5,
        cProtect: false,
        cVisible: true,
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus,
        cGroup: false,
      },
      PI_picture: {
        cValidate: "required",
        cName: "picture",
        cOrder: 2,
        cTitle: "Add Picture",
        cType: "location",
        cParentForm: "FormEntry",
      },
      PI_description: {
        cValidate: "max:1000",
        cName: "description",
        cOrder: 7,
        cKey: false,
        cProtect: false,
        cResize: false,
        cReadonly: false,
        cRows: 1,
        cMaxRows: 3,
        cSize: "md",
        cParentForm: "FormEntry",
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
        user_id: "adm",
        promotion_master_id: "",
        project_id: "",
        promotion_name: "",
        start_datetime: 0,
        end_datetime: 0,
        release_datetime: 0,
        based_on: "Selling",
        picture: "",
        description: "",
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
      var param = {
        user_id: this.Model.user_id,
        promotion_master_id: this.Model.promotion_master_id,
        project_id: this.getDataUser().project_id,
        promotion_name: this.Model.promotion_name,
        start_datetime: this.momentDateToUnix(
          this.Model.start_datetime,
          "YYYY-MM-DD HH:mm"
        ),
        end_datetime: this.momentDateToUnix(
          this.Model.end_datetime,
          "YYYY-MM-DD HH:mm"
        ),
        release_datetime: this.momentDateToUnix(
          this.Model.release_datetime,
          "YYYY-MM-DD HH:mm"
        ),
        based_on: this.Model.based_on,
        picture: this.Model.picture,
        description: this.Model.description,
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/promotion-master-addedit",
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
      this.Model.promotion_master_id = this.paramFromList.id;
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/promotion-master-detail",
        this.Model
      ).then((response) => {
        if (response == null) return;
        this.Model = response.data.promotion_master_detail;
        this.Model.promotion_master_id = this.Model.id;
        this.Model.start_datetime = this.momentUnix(
          this.Model.start_datetime,
          "YYYY-MM-DD HH:mm"
        );
        this.Model.end_datetime = this.momentUnix(
          this.Model.end_datetime,
          "YYYY-MM-DD HH:mm"
        );
        this.Model.release_datetime = this.momentUnix(
          this.Model.release_datetime,
          "YYYY-MM-DD HH:mm"
        );
        this.Model.user_id = "adm"; // NEXT HAPUS
      });
    },
    OnPriorityChange(data) {
      this.$nextTick(() => {});
    },
    onPictureChange(data) {},
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