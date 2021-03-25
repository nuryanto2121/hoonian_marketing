<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body" style="font-family: Poppins !important;">
      <div class="">
        <div class="card" style="font-size: 12px !important;">
          <div class="card__body">
            <b-row>
              <b-col style="color: #4A93B3; font-size: 16px;">
                {{title}} Promotion
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
        </div>
      </div>
      <div class="card">
        <div class="card__body">
          <b-form :data-vv-scope="'FormEntry'" :data-vv-value-path="'FormEntry'">
            <b-row style="margin-top: 10px;">
              <b-col lg="2">
                <b-img :src="require(inputStatus == 'edit'? '@/assets/icon-svg/edit.svg': '@/assets/icon-svg/add.svg')" alt="" />
              </b-col>
              <b-col lg="10">
                <b-row v-if="inputStatus == 'edit'">
                  <b-col style="text-align: right; padding-right: unset !important;">
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
                </b-row>
                <b-row>
                  <b-col lg="5">
                    <label class="lbl-bold">Title</label>
                    <ACCTextBox
                      :prop="PI_promotion_title"
                      v-model="Model.promotion_name"
                      ref="ref_promotion_title"
                    />
                  </b-col>
                  <b-col lg="5">
                    <label class="lbl-bold">Reference No</label>
                    <ACCTextBox
                      :prop="PI_reference_no"
                      v-model="Model.reference_no"
                      ref="ref_reference_no"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="5">
                    <label class="lbl-bold">Start Date</label>
                    <HOODateTime
                      :prop="PI_start_date"
                      v-model="Model.start_datetime"
                      ref="ref_start_date"
                    />
                  </b-col>
                  <b-col lg="5">
                    <label class="lbl-bold">End Date</label>
                    <HOODateTime
                      :prop="PI_end_date"
                      v-model="Model.end_datetime"
                      ref="ref_end_date"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="5">
                    <label class="lbl-bold">Release Date</label>
                    <HOODateTime
                      :prop="PI_release_date"
                      v-model="Model.release_datetime"
                      ref="ref_release_date"
                    />
                  </b-col>
                  <b-col lg="5">
                    <label class="lbl-bold">Base On</label>
                    <HOODropDown
                      @change="OnBaseOnChange"
                      :prop="PI_base_on"
                      v-model="Model.based_on"
                      :label="Model.based_onLabel"
                      ref="ref_base_on"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="10">
                    <label class="lbl-bold">Description</label>
                    <ACCTextArea
                      :prop="PI_description"
                      v-model="Model.description"
                      ref="ref_description"
                    />
                  </b-col>
                </b-row>
                <b-row cols="10">
                  <b-col lg="2">
                    <label class="lbl-bold">Photos</label>
                    <HOOImageUpload
                      :prop="PI_upload_photo"
                      @change="onUploadMainPictureChange"
                    />
                  </b-col>
                  <!-- single photo -->
                  <b-col lg="2">
                    <label class="lbl-bold">Preview</label><br />
                    <div style="height: 100px; width: 100px; position: relative;">
                      <img
                        v-if="Model.picture != ''"
                        :src="Model.picture == '' ?
                        default_pic: urlHoonian + Model.picture"
                        alt height="100" width="100" />
                      <b-img v-if="Model.picture != ''" style="position: absolute; width: 20px; top: -10px; right: -10px; cursor: pointer;" :src="require('@/assets/icon-svg/close_image.svg')" @click="doDeleteClick" alt />
                    </div>
                  </b-col>
                </b-row>
                
                <b-row style="margin-top: 10px;">
                  <b-col offset="3" md="4">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      Model: {
        id: "",
        project_id: "",
        promotion_name: "",
        start_datetime: "",
        end_datetime: "",
        release_datetime: "",
        based_on: "",
        based_onLabel: "",
        picture: "",
        description: "",
        reference_no: "",
      },
      PI_promotion_title: {
        cValidate: "required",
        cName: "title",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      PI_reference_no: {
        cValidate: "required",
        cName: "reference no",
        cOrder: 2,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      PI_start_date: {
        cValidate: "required",
        cName: "start date",
        cOrder: 3,
        cKey: false,
        cProtect: false,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_end_date: {
        cValidate: "required",
        cName: "end date",
        cOrder: 4,
        cKey: false,
        cProtect: false,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_release_date: {
        cValidate: "required",
        cName: "release date",
        cOrder: 5,
        cKey: false,
        cProtect: false,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_base_on: {
        dataLookUp: null,
        cValidate: "required",
        cName: "base on",
        ckey: false,
        cOrder: 6,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: true,
        cOption: [
          { id: "selling", label: "Selling Date" },
          { id: "booking", label: "Booking Date" },
        ],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
      PI_description: {
        cValidate: "max:5000",
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
        cInputStatus: this.inputStatus
      },
      PI_upload_photo: {
        cValidate: "",
        cName: "upload photo",
        cOrder: 8,
        cTitle: "",
        cType: "project",
        cParentForm: "FormEntry",
        cStyle: "background-color: rgb(74, 147, 179) !important; color: white !important; font-family: Poppins !important;",
        cIconPhoto: true,
      },
    };
  },
  computed: {
    paramFromList() {
      let param = this.$store.getters.getParamPage;
      return param;
    },
    inputStatus() {
      let param = this.$store.getters.getParamPage;
      if (param.isEdit && param.isEdit === true) {
        return "edit";
      } else {
        return "new";
      }
    },
  },
  methods: {
    OnBaseOnChange(data) {
      this.$nextTick(() => {
        this.Model.based_on = data.id;
        this.Model.based_onLabel = data.label;
      })
    },
    GetDataBy() {
      let param = {
        id: this.paramFromList.DetailList.id,
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/promotion/detail",
        param
      ).then((response) => {
        if (response == null) return;
        let data = response.data;
        this.Model = {
          ...data,
          start_datetime: this.momentUnix(data.start_datetime, "YYYY-MM-DD"),
          end_datetime: this.momentUnix(data.end_datetime, "YYYY-MM-DD"),
          release_datetime: this.momentUnix(data.release_datetime, "YYYY-MM-DD"),
        };
      });
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
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
        id: this.inputStatus == "edit"? this.paramFromList.DetailList.id: "",
        project_id: this.paramFromList.project_id,
        start_datetime: this.momentDateToUnix(this.Model.start_datetime, 'YYYY-MM-DD'),
        end_datetime: this.momentDateToUnix(this.Model.end_datetime, 'YYYY-MM-DD'),
        release_datetime: this.momentDateToUnix(this.Model.release_datetime, 'YYYY-MM-DD'),
      }
      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard/operation-detail/promotion/add_edit', param).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
    onUploadMainPictureChange(data) {
      this.Model.picture = data.url;
    },
    doDeleteClick() {
      this.Model.picture = '';
      // this.$forceUpdate();
    }
  },
  mounted() {
    if (this.inputStatus == "edit") {
      this.title = "Edit";
      this.GetDataBy();
      this.PI_promotion_title.cProtect = true;
    } else {
      this.title = "Add";
    }
  }
};
</script>