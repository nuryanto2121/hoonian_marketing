<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body" style="font-family: Poppins !important;">
      <div class="">
        <div class="card" style="font-size: 12px !important;">
          <div class="card__body">
            <b-row>
              <b-col md="2" lg="2" style="color: #4A93B3; font-size: 16px;">
                Project Detail
              </b-col>
              <b-col style="text-align: right;">
                <ABSButton
                  :text="'Back'"
                  classButton="button button--back"
                  classIcon="icon-style-1"
                  @click="$router.go(-1)"
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
                <div style="
                  height: 120px;
                  background: #FFFFFF;
                  border: 1px solid rgba(45, 71, 175, 0.15);
                  box-sizing: border-box;
                  border-radius: 6px;">
                    <b-img :src="Model.icon_project == '' ?
                      default_pic: urlHoonian + Model.icon_project" alt=""
                      @error="onImageLoadFailure($event)"
                      style="height: 60px;
                      width: 60px;
                      position: relative;
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);" />
                </div>
                <HOOImageUpload
                  :prop="PI_icon_project"
                  @change="onUploadIconProjectChange"
                  v-model="Model.icon_project"
                />
              </b-col>
              <b-col lg="10">
                <b-row>
                  <b-col lg="5">
                    <label class="lbl-bold">Project Name</label>
                    <ACCTextBox
                      :prop="PI_project_name"
                      v-model="Model.project_name"
                      ref="ref_project_name"
                    />
                  </b-col>
                  <b-col lg="5">
                    <b-row>
                      <b-col lg="6" style="padding-left: unset !important;">
                        <label class="lbl-bold">Project Code</label>
                        <ACCTextBox
                          :prop="PI_project_code"
                          v-model="Model.refference_code"
                          ref="ref_project_code"
                        />
                      </b-col>
                      <b-col lg="6" style="padding-right: unset !important;">
                        <label class="lbl-bold">Launching</label>
                        <ACCTextBox
                          :prop="PI_launching"
                          v-model="Model.project_start"
                          ref="ref_launching"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="5">
                    <label class="lbl-bold">Company Name</label>
                    <ACCTextBox
                      :prop="PI_company_name"
                      v-model="Model.company_name"
                      ref="ref_project_name"
                    />
                  </b-col>
                  <b-col lg="5">
                    <label class="lbl-bold">Project Address</label>
                    <ACCTextBox
                      :prop="PI_project_address"
                      v-model="Model.address"
                      ref="ref_project_address"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="5">
                    <label class="lbl-bold">Group Name</label>
                    <ACCTextBox
                      :prop="PI_group_name"
                      v-model="Model.company_group_name"
                      ref="ref_group_name"
                    />
                  </b-col>
                  <b-col lg="5">
                    <b-row>
                      <b-col lg="6" style="padding-left: unset !important;">
                        <label class="lbl-bold">Location</label>
                        <ACCTextBox
                          :prop="PI_location"
                          v-model="Model.location_name"
                          ref="ref_location"
                        />
                      </b-col>
                      <b-col lg="6" style="padding-right: unset !important;">
                        <label class="lbl-bold">Category</label>
                        <ACCTextBox
                          :prop="PI_category"
                          v-model="Model.project_type_desc"
                          ref="ref_category"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="5">
                    <label class="lbl-bold">Publish Date</label>
                    <ACCTextBox
                      :prop="PI_publish_date"
                      v-model="Model.publish_date"
                      ref="ref_publish_Date"
                    />
                  </b-col>
                  <b-col lg="5">
                    <b-row>
                      <b-col lg="6" style="padding-left: unset !important;">
                        <label class="lbl-bold" style="margin-bottom: 12px !important;">Token Required</label>
                        <ACCRadioButton
                          @input="OnTokenRequiredChange"
                          :prop="PI_token_required"
                          v-model="Model.token_is_required"
                          ref="ref_token_required"
                        />
                      </b-col>
                      <b-col lg="6" style="padding-right: unset !important;">
                        <label class="lbl-bold" style="margin-bottom: 12px !important;">Refer Lead Approval</label>
                        <ACCRadioButton
                          @input="OnReferLeadApprovalChange"
                          :prop="PI_refer_lead_approval"
                          v-model="Model.sales_lead_exchange_need_approval"
                          ref="ref_refer_lead_approval"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="5">
                    <label class="lbl-bold">Referral Fee Rate</label>
                    <ACCTextBox
                      :prop="PI_referral_fee_rate"
                      v-model="Model.referral_fee_rate"
                      ref="ref_referral_fee_rate"
                    />
                  </b-col>
                  <b-col lg="5">
                    <label class="lbl-bold">Referral Fee (%)</label>
                    <ACCTextBox
                      :prop="PI_referral_fee"
                      v-model="Model.refferal_fee"
                      ref="ref_referral_fee"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="5">
                    <HOOImageUpload
                      :prop="PI_upload_main_picture"
                      @change="onUploadMainPictureChange"
                      v-model="Model.main_pic"
                    />
                    <img
                      :src="Model.main_pic == '' ?
                      default_pic: urlHoonian + Model.main_pic"
                      alt height="150" />
                  </b-col>
                  <b-col lg="5">
                    <HOOImageUpload
                      :prop="PI_upload_brochure"
                      @change="onUploadBrochureChange"
                      v-model="Model.upload_brochure"
                    />
                    <img
                      :src="Model.upload_brochure == '' ?
                      default_pic: urlHoonian + Model.upload_brochure"
                      alt height="150" />
                  </b-col>
                </b-row>
                <b-row style="margin-top: 10px;">
                  <b-col lg="10">
                    <label class="lbl-bold">Remarks</label>
                    <ACCTextArea
                      :prop="PI_remarks"
                      v-model="Model.remarks"
                      ref="ref_remarks"
                    />
                  </b-col>
                </b-row>
                <b-row style="margin-top: 10px;">
                  <b-col offset="3" md="4">
                    <ABSButton
                      :text="'Confirm'"
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
      Model: {
        id: "",
        project_name: "",
        location_name: "",
        main_pic: "",
        company_name: "",
        company_group_name: "",
        icon_project: "",
        publish_date: "",
        refference_code: "",
        project_start: "",
        referral_fee_rate: "",
        address: "",
        token_is_required: false,
        sales_lead_exchange_need_approval: false,
        refferal_fee: "",
        project_type_desc: "",
        upload_brochure: "",
        remarks: "",
      },
      PI_icon_project: {
        cValidate: "",
        cName: "icon project",
        cOrder: 1,
        cTitle: "Edit Logo",
        cType: "project",
        cParentForm: "FormEntry",
        cStyle: "background-color: rgb(74, 147, 179) !important; color: white !important; font-family: Poppins !important;"
      },
      PI_project_name: {
        cValidate: "",
        cName: "project name",
        cOrder: 2,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      PI_project_code: {
        cValidate: "required",
        cName: "project code",
        cOrder: 3,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      PI_launching: {
        cValidate: "",
        cName: "launching",
        cOrder: 4,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      PI_company_name: {
        cValidate: "",
        cName: "company name",
        cOrder: 5,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      PI_project_address: {
        cValidate: "",
        cName: "project address",
        cOrder: 6,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      PI_group_name: {
        cValidate: "",
        cName: "group name",
        cOrder: 7,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      PI_location: {
        cValidate: "",
        cName: "location",
        cOrder: 8,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      PI_category: {
        cValidate: "",
        cName: "category",
        cOrder: 9,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      PI_publish_date: {
        cValidate: "",
        cName: "publish date",
        cOrder: 10,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      PI_token_required: {
        cValidate: "required",
        cName: "token required",
        cId: "rdtokenrequired",
        cRadioOptions: [
          { text: "Yes", value: true },
          { text: "No", value: false },
        ],
        cRadioDefaultOption: "Y",
        cOrder: 11,
        cProtect: false,
        cVisible: true,
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus,
        cGroup: false,
      },
      PI_refer_lead_approval: {
        cValidate: "required",
        cName: "refer lead approval",
        cId: "rdreferleadapproval",
        cRadioOptions: [
          { text: "Yes", value: true },
          { text: "No", value: false },
        ],
        cRadioDefaultOption: "Y",
        cOrder: 12,
        cProtect: false,
        cVisible: true,
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus,
        cGroup: false,
      },
      PI_referral_fee_rate: {
        cValidate: "",
        cName: "referral fee rate",
        cOrder: 13,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      PI_referral_fee: {
        cValidate: "required",
        cName: "referral fee",
        cOrder: 14,
        cKey: false,
        cType: "decimal",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      PI_upload_main_picture: {
        cValidate: "",
        cName: "upload main picture",
        cOrder: 15,
        cTitle: "Upload Main Picture",
        cType: "project",
        cParentForm: "FormEntry",
        cStyle: "background-color: rgb(74, 147, 179) !important; color: white !important; font-family: Poppins !important;"
      },
      PI_upload_brochure: {
        cValidate: "",
        cName: "upload brochure",
        cOrder: 16,
        cTitle: "Upload Brochure",
        cType: "project",
        cParentForm: "FormEntry",
        cStyle: "background-color: rgb(74, 147, 179) !important; color: white !important; font-family: Poppins !important;"
      },
      PI_remarks: {
        cValidate: "max:5000",
        cName: "remarks",
        cOrder: 17,
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
    };
  },
  computed: {
    paramFromList() {
      let param = this.$store.getters.getParamPage;
      return param;
    },
  },
  methods: {
    GetDataBy() {
      let param = {
        project_id: this.paramFromList.project_id,
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/project-info/edit/detail",
        param
      ).then((response) => {
        if (response == null) return;
        let data = response.data;
        this.Model = data;
        this.Model.publish_date = this.momentUnix(data.publish_date, 'DD MMM YYYY');
        this.Model.project_start = this.momentDateFormatting(data.project_start, 'DD MMM YYYY');
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
              this.M_Update();
            }
          }
        );
      });
    },
    M_Update() {
      this.Model.project_id = this.Model.id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard/project-info/edit', this.Model).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
  },
  mounted() {
    this.GetDataBy();
  }
};
</script>
<style scoped>
.text {
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 2;
   -webkit-box-orient: vertical;
}
.no-padding {
  padding: unset !important;
}
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>