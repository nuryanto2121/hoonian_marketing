<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>{{title}} Master Project</span>
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
                          <label><span style="color:red;">* </span>Project Name</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_project_name"
                          v-model="Model.project_name"
                          ref="ref_project_name"
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
                          <label>Company Group</label>
                        </span>
                        <HOODropDown
                          @change="OnCompanyGroupChange"
                          :prop="PI_company_group"
                          v-model="Model.company_group_id"
                          :label="Model.company_group_name"
                          ref="ref_company_group"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Address</label>
                        </span>
                        <ACCTextArea
                          :prop="PI_address"
                          v-model="Model.address"
                          ref="ref_address"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color:red;">* </span>Location</label>
                        </span>
                        <HOODropDown
                          @change="OnLocationChange"
                          :prop="PI_location"
                          v-model="Model.location_id"
                          :label="Model.location_name"
                          ref="ref_location"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Longitude</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_longitude"
                          v-model="Model.longitude"
                          ref="ref_longitude"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Latitude</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_latitude"
                          v-model="Model.latitude"
                          ref="ref_latitude"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color:red;">* </span>Project Category</label>
                        </span>
                        <HOODropDown
                          @change="OnProjectCategoryChange"
                          :prop="PI_project_category"
                          v-model="Model.project_category_id"
                          :label="Model.project_category_name"
                          ref="ref_project_category"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color: red">* </span>Project Type</label>
                        </span>
                        <ACCRadioButton
                          @input="OnProjectTypeChange"
                          :prop="PI_project_type"
                          v-model="Model.project_type"
                          ref="ref_project_type"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color: red">* </span>Token Required</label>
                        </span>
                        <ACCRadioButton
                          @input="OnTokenChange"
                          :prop="PI_token"
                          v-model="Model.token_is_required"
                          ref="ref_token"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Default Marketing Agent Group</label>
                        </span>
                        <HOODropDown
                          @change="OnDefaultMarketingGroupChange"
                          :prop="PI_default_marketing_group_id"
                          v-model="Model.default_marketing_group_id"
                          :label="Model.marketing_group"
                          ref="ref_default_marketing"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Inhouse Marketing Principle</label>
                        </span>
                        <HOODropDown
                          @change="OnInhouseMarketingPrincipleChange"
                          :prop="PI_inhouse_marketing_principle"
                          v-model="Model.internal_marketing_id"
                          :label="Model.principle_name"
                          ref="ref_principle"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Sales Lead Exchange Approval</label>
                        </span>
                        <ACCRadioButton
                          @input="OnSalesLeadExchangeApprovalChange"
                          :prop="PI_sales_lead_exchange_approval"
                          v-model="Model.sales_lead_exchange_need_approval"
                          ref="ref_token"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color: red">* </span>Sales Lead Exchange Source</label>
                        </span>
                        <HOODropDown
                          @change="OnSalesLeadExchangeSourceChange"
                          :prop="PI_sales_lead_exchange_source"
                          v-model="Model.sales_lead_exchange_source"
                          :label="Model.sales_lead_source_name"
                          ref="ref_sales_lead_exchange_source"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Inter Company Referal Comm.</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_inter_company_referal_comm"
                          v-model="Model.inter_company_refferal_comm"
                          ref="ref_inter_company_referal_comm"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Referal Fee</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_referal_fee"
                          v-model="Model.refferal_fee"
                          ref="ref_referal_fee"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Upload Brochure</label>
                        </span>
                        <br />
                        <img id="picture"
                          :src="Model.upload_brochure == '' ?
                          default_pic: urlHoonian + Model.upload_brochure"
                          alt height="150" />
                        <HOOImageUpload
                          :prop="PI_upload_brochure"
                          @change="onUploadBrochureChange"
                          v-model="Model.upload_brochure"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Publish Date</label>
                        </span>
                        <HOODateTime
                          :prop="PI_publish_date"
                          @input="OnPublishDateChange"
                          v-model="Model.publish_date"
                          ref="ref_publish_date"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Remarks</label>
                        </span>
                        <ACCTextArea
                          :prop="PI_remarks"
                          v-model="Model.remarks"
                          ref="ref_remarks"
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
        project_master_id: "",
        portfolio_id: "",
        project_name: "",
        company_group_id: "",
        company_group_name: "",
        address: "",
        location_id: "",
        location_name: "",
        longitude: "",
        latitude: "",
        project_category_id: "",
        project_category_name: "",
        project_type: "",
        token_is_required: true,
        sales_lead_exchange_need_approval: true,
        sales_lead_exchange_source: "",
        sales_lead_source_name: "",
        default_marketing_group_id: "",
        marketing_group: "",
        internal_marketing_id: "",
        principle_name: "",
        inter_company_refferal_comm: "",
        refferal_fee: "",
        upload_brochure: "",
        publish_date: "",
        remarks: ""
      },
      PI_project_name: {
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
      PI_company_group: {
        dataLookUp: {
          url: "/api/hoonian-website/company-group-lookup",
          param: {}
        },
        cValidate: "",
        cName: "company group",
        ckey: false,
        cOrder: 3,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_address: {
        cValidate: "max:5000",
        cName: "address",
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
      PI_location: {
        dataLookUp: {
          url: "/api/hoonian-website/location-lookup",
          param: {}
        },
        cValidate: "required",
        cName: "location",
        ckey: false,
        cOrder: 3,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_longitude: {
        cValidate: "",
        cName: "longitude",
        cOrder: 4,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_latitude: {
        cValidate: "",
        cName: "latitude",
        cOrder: 5,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_project_category: {
        dataLookUp: {
          url: "/api/hoonian-website/project-category-lookup",
          param: {}
        },
        cValidate: "required",
        cName: "project category",
        ckey: false,
        cOrder: 6,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_project_type: {
        cValidate: "required",
        cName: "project type",
        cId: "rdprojecttype",
        cRadioOptions: [
          { text: "Landed", value: "L" },
          { text: "Highrise", value: "H" },
        ],
        cRadioDefaultOption: "L",
        cOrder: 7,
        cProtect: false,
        cVisible: true,
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus,
        cGroup: false,
      },
      PI_token: {
        cValidate: "required",
        cName: "token",
        cId: "rdtoken",
        cRadioOptions: [
          { text: "Yes", value: true },
          { text: "No", value: false },
        ],
        cRadioDefaultOption: true,
        cOrder: 8,
        cProtect: false,
        cVisible: true,
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus,
        cGroup: false,
      },
      PI_default_marketing_group_id: {
        dataLookUp: {
          url: "/api/hoonian-website/marketing-agent-group-lookup",
          param: {}
        },
        cValidate: "",
        cName: "default marketing",
        ckey: false,
        cOrder: 9,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_inhouse_marketing_principle: {
        dataLookUp: {
          url: "/api/hoonian-website/principle-lookup",
          param: {}
        },
        cValidate: "",
        cName: "inhouse marketing principle",
        ckey: false,
        cOrder: 10,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_sales_lead_exchange_approval: {
        cValidate: "",
        cName: "sales lead exchange approval",
        cId: "rd_sales_lead_exchange_approval",
        cRadioOptions: [
          { text: "Yes", value: true },
          { text: "No", value: false },
        ],
        cRadioDefaultOption: true,
        cOrder: 11,
        cProtect: false,
        cVisible: true,
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus,
        cGroup: false,
      },
      PI_sales_lead_exchange_source: {
        dataLookUp: {
          url: "/api/hoonian-website/sales-lead-lookup",
          param: {}
        },
        cValidate: "required",
        cName: "sales lead exchange source",
        ckey: false,
        cOrder: 12,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_inter_company_referal_comm: {
        cValidate: "",
        cName: "inter company referal comm",
        cOrder: 13,
        cKey: false,
        cType: "decimal",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_referal_fee: {
        cValidate: "",
        cName: "referal fee",
        cOrder: 14,
        cKey: false,
        cType: "decimal",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_upload_brochure: {
        cValidate: "",
        cName: "upload brochure",
        cOrder: 15,
        cTitle: "Add Picture",
        cType: "project",
        cParentForm: "FormEntry"
      },
      PI_publish_date: {
        cValidate: "",
        cName: "publish date",
        cOrder: 16,
        cKey: false,
        cProtect: false,
        cWithTime: true,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry"
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
        project_master_id: "",
        portfolio_id: "",
        project_name: "",
        company_group_id: "",
        company_group_name: "",
        address: "",
        location_id: "",
        location_name: "",
        longitude: "",
        latitude: "",
        project_category_id: "",
        project_category_name: "",
        project_type: "L",
        token_is_required: true,
        sales_lead_exchange_need_approval: true,
        sales_lead_exchange_source: "",
        sales_lead_source_name: "",
        default_marketing_group_id: "",
        marketing_group: "",
        internal_marketing_id: "",
        principle_name: "",
        inter_company_refferal_comm: "",
        refferal_fee: "",
        upload_brochure: "",
        publish_date: "",
        remarks: ""
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
        publish_date: this.momentDateToUnix(this.Model.publish_date, 'YYYY-MM-DD HH:mm'),
      };
      this.postJSON(this.urlHoonian + '/api/hoonian-website/project-master-addedit', param).then((response) => {
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
      this.Model.project_master_id = this.paramFromList.id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/project-master-detail', this.Model).then((response) => {
        if (response == null) return;
        this.Model = response.data.project_master_detail;
        this.Model.project_master_id = this.Model.id;
        this.Model.publish_date = this.momentUnix(this.Model.publish_date, 'YYYY-MM-DD HH:mm');
      });
    },
    OnCompanyGroupChange(data) {
      this.$nextTick(() => {
        this.Model.company_group_id = data.id;
        this.Model.company_group_name = data.label;
      });
    },
    OnLocationChange(data) {
      this.$nextTick(() => {
        this.Model.location_id = data.id;
        this.Model.location_name = data.label;
      });
    },
    OnProjectCategoryChange(data) {
      this.$nextTick(() => {
        this.Model.project_category_id = data.id;
        this.Model.project_category_name = data.label;
      });
    },
    OnProjectTypeChange(data) {
      this.$nextTick(() => {});
    },
    OnTokenChange(data) {
      this.$nextTick(() => {});
    },
    OnDefaultMarketingGroupChange(data) {
      this.$nextTick(() => {
        this.Model.default_marketing_group_id = data.id;
        this.Model.marketing_group = data.label;
      });
    },
    OnInhouseMarketingPrincipleChange(data) {
      this.$nextTick(() => {
        this.Model.internal_marketing_id = data.id;
        this.Model.principle_name = data.label;
      });
    },
    OnSalesLeadExchangeApprovalChange(data) {
      this.$nextTick(() => {});
    },
    OnSalesLeadExchangeSourceChange(data) {
      this.$nextTick(() => {
        this.Model.sales_lead_exchange_source = data.id;
        this.Model.sales_lead_source_name = data.label;
      });
    },
    onUploadBrochureChange(data) {
    },
  },
  mounted() {
    this.M_ClearForm();
    if (this.inputStatus == "edit") {
      this.title = "Edit";
      this.GetDataBy();
    } else {
      this.Model.portfolio_id = this.getDataUser().portfolio_id;
      this.title = "Add";
    }
  },
};
</script>

