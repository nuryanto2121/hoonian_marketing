<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body" style="font-family: Poppins !important;">
      <div class="">
        <div class="card" style="font-size: 12px !important;">
          <div class="card__body">
            <b-row>
              <b-col style="color: #4A93B3; font-size: 16px;">
                {{title}} News Feed
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
              <b-col lg="4">
                <b-row v-if="inputStatus == 'edit'">
                  <b-col style="margin-top: 20px;">
                    <span>
                      &nbsp;
                    </span>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="12">
                    <label class="lbl-bold">Title</label>
                    <ACCTextBox
                      :prop="PI_title"
                      v-model="Model.title"
                      ref="ref_promotion_title"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="12">
                    <label class="lbl-bold">Description</label>
                    <ACCTextArea
                      :prop="PI_description"
                      v-model="Model.description"
                      ref="ref_description"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="12">
                    <label class="lbl-bold">Start View Date</label>
                    <HOODateTime
                      :prop="PI_start_view_date"
                      v-model="Model.start_view_at"
                      ref="ref_start_view_date"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="12">
                    <label class="lbl-bold">End View Date</label>
                    <HOODateTime
                      :prop="PI_end_view_date"
                      v-model="Model.end_view_at"
                      ref="ref_end_view_date"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="12">
                    <label class="lbl-bold">URL</label>
                    <ACCTextBox
                      :prop="PI_url"
                      v-model="Model.url"
                      ref="ref_url"
                    />
                  </b-col>
                </b-row>
              </b-col>
              <b-col lg="6">
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
                <b-row style="margin-top: 10px;">
                  <b-col lg="4">
                    <label class="lbl-bold">Photos</label>
                    <HOOImageUpload
                      :prop="PI_upload_photo"
                      @change="onUploadMainPictureChange"
                    />
                  </b-col>
                  <!-- single photo -->
                  <b-col lg="8">
                    <label class="lbl-bold">Preview</label><br />
                    <div style="height: 100px; width: 100px; position: relative;">
                      <img
                        v-if="Model.main_image != ''"
                        :src="Model.main_image == '' ?
                        default_pic: urlHoonian + Model.main_image"
                        alt height="200" width="200" />
                      <b-img v-if="Model.main_image != ''" style="position: absolute; width: 20px; top: -10px; right: -10px; cursor: pointer;" :src="require('@/assets/icon-svg/close_image.svg')" @click="doDeleteClick" alt />
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row style="margin-top: 10px;">
              <b-col offset="5" md="4">
                <ABSButton
                  :text="'Confirm'"
                  classButton="btn btn--default"
                  classIcon="icon-style-default"
                  @click="doSave"
                  styleButton="height: 40px;width: 100%;"
                />
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
        title: "",
        description: "",
        start_view_at: "",
        end_view_at: "",
        main_image: "",
        url: ""
      },
      PI_title: {
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
      PI_description: {
        cValidate: "max:5000",
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
      PI_start_view_date: {
        cValidate: "required",
        cName: "start view date",
        cOrder: 3,
        cKey: false,
        cProtect: false,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_end_view_date: {
        cValidate: "required",
        cName: "end view date",
        cOrder: 4,
        cKey: false,
        cProtect: false,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_url: {
        cValidate: "required",
        cName: "url",
        cOrder: 5,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },      
      PI_upload_photo: {
        cValidate: "",
        cName: "upload photo",
        cOrder: 6,
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
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/news/detail",
        param
      ).then((response) => {
        if (response == null) return;
        let data = response.data;
        this.Model = {
          ...data,
          start_view_at: this.momentUnix(data.start_view_at, "YYYY-MM-DD"),
          end_view_at: this.momentUnix(data.end_view_at, "YYYY-MM-DD"),
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
        start_view_at: this.momentDateToUnix(this.Model.start_view_at, 'YYYY-MM-DD'),
        end_view_at: this.momentDateToUnix(this.Model.end_view_at, 'YYYY-MM-DD'),
      }
      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard/operation-detail/news/add_edit', param).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
    onUploadMainPictureChange(data) {
      this.Model.main_image = data.url;
    },
    doDeleteClick() {
      this.Model.main_image = '';
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