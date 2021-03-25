<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body" style="font-family: Poppins !important;">
      <div class="">
        <div class="card" style="font-size: 12px !important;">
          <div class="card__body">
            <b-row>
              <b-col style="color: #4A93B3; font-size: 16px;">
                {{title}} Description
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
                    <ABSButton
                      text="Cancel"
                      classButton="button button--new mgn"
                      styleButton="background-color: rgb(74, 147, 179); color: white;"
                      @click="showCancel"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="5">
                    <label class="lbl-bold">Title</label>
                    <ACCTextBox
                      :prop="PI_title"
                      v-model="Model.title"
                      ref="ref_title"
                    />
                  </b-col>
                  <b-col lg="5">
                    <label class="lbl-bold">Sequence No</label>
                    <ACCTextBox
                      :prop="PI_sequence_no"
                      v-model="Model.sequence_no"
                      ref="ref_sequence_no"
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
                <b-row>
                  <b-col lg="2">
                    <label class="lbl-bold">Photos</label>
                    <HOOImageUpload
                      :prop="PI_upload_photo"
                      @change="onUploadMainPictureChange"
                    />
                  </b-col>
                  <b-col :offset="index % 4 == 0 && index > 0 ? '2': '0'" lg="2" v-for="(data, index) in Model.pics" :key="index">
                    <label class="lbl-bold">{{index==0 ? 'Preview': ''}}&nbsp;</label><br />
                    <div style="height: 100px; width: 100px; position: relative;">
                      <img
                        :src="data.image == '' ?
                        default_pic: urlHoonian + data.image"
                        alt height="100" width="100" />
                      <b-img style="position: absolute; width: 20px; top: -10px; right: -10px; cursor: pointer;" :src="require('@/assets/icon-svg/close_image.svg')" @click="doDeleteClick(index)" alt />
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
      <OPCancel
        ref="OP_Cancel"
        :urlAPI="'/api/hoonian-website/dashboard/project-info/description/cancel'"
        :id="Model.id"
      />
    </div>
  </div>
</template>

<script>
import OPCancel from '../../OP_Cancel/OP_Cancel';
export default {
  components: {
    OPCancel
  },
  data() {
    return {
      title: "",
      Model: {
        id: "",
        title: "",
        description: "",
        sequence_no: 0,
        header_body_text_id: "",
        last_edit: "",
        updated_at: "",
        pics: [],
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
      PI_sequence_no: {
        cValidate: "required",
        cName: "sequence no",
        cOrder: 2,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      PI_description: {
        cValidate: "max:5000",
        cName: "description",
        cOrder: 3,
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
        cOrder: 4,
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
    GetDataBy() {
      let param = {
        id: this.paramFromList.DetailList.id,
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/project-info/description/detail",
        param
      ).then((response) => {
        if (response == null) return;
        let data = response.data;
        this.Model = {
          ...data.data,
        };
        this.Model.pics = data.pics;
      });
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    onUploadIconProjectChange(data) {
    },
    OnTokenRequiredChange(data) {
    },
    OnReferLeadApprovalChange(data) {
    },
    onUploadBrochureChange(data) {
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
      this.Model.header_body_text_id = this.paramFromList.header_body_text_id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard/project-info/description/add_edit', this.Model).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
    showCancel() {
      this.$refs.OP_Cancel._show();
    },
    onUploadMainPictureChange(data) {
      this.Model.pics.push({image: data.url});
      this.$forceUpdate();
    },
    doDeleteClick(index) {
      this.Model.pics.splice(index, 1);
      this.$forceUpdate();
    }
  },
  mounted() {
    if (this.inputStatus == "edit") {
      this.title = "Edit";
      this.GetDataBy();
      this.PI_title.cProtect = true;
    } else {
      this.title = "Add";
    }
  }
};
</script>