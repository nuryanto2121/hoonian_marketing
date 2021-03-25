<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important">
                  <span>{{ title }} App Setup</span>
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
                  <b-col md="5">
                    <!-- Kiri -->
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label
                            ><span style="color: red">* </span>App Name</label
                          >
                        </span>
                        <ACCTextBox
                          :prop="PI_app_name"
                          v-model="Model.app_name"
                          ref="ref_app_name"
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
                      <b-col md="12">
                        <span>
                          <label
                            ><span style="color: red">* </span>Customer
                            Name</label
                          >
                        </span>
                        <ACCTextBox
                          :prop="PI_customer_name"
                          v-model="Model.customer_name"
                          ref="ref_customer_name"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label>Android App ID</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_android_app_id"
                          v-model="Model.android_app_id"
                          ref="ref_android_app_id"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label>IOS App ID</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_ios_app_id"
                          v-model="Model.ios_app_id"
                          ref="ref_ios_app_id"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label
                            ><span style="color: red">* </span> Token use per
                            App
                          </label>
                        </span>
                        <ACCRadioButton
                          @input="Ontoken_use_per_appChange"
                          :prop="PI_token_use_per_app"
                          v-model="Model.token_use_per_app"
                          ref="ref_token_use_per_app"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label>Token Value</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_token_value"
                          v-model="Model.token_value"
                          ref="ref_token_value"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label>Appointment Alert</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_appointment_alert"
                          v-model="Model.appointment_alert"
                          ref="ref_appointment_alert"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label>Appointment Alert same day</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_appointment_alert_same_day"
                          v-model="Model.appointment_alert_same_day"
                          ref="ref_appointment_alert_same_day"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label>Sales Lead Source</label>
                        </span>
                        <HOODropDown
                          @change="Onsales_lead_source_idChange"
                          :prop="PI_sales_lead_source_id"
                          v-model="Model.sales_lead_source_id"
                          :label="Model.source_name"
                          ref="ref_sales_lead_source_id"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
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
                  </b-col>
                  <b-col md="5">
                    <!-- kanan -->
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label
                            ><span style="color: red">* </span> Anonymous
                            ACL</label
                          >
                        </span>
                        <HOODropDown
                          @change="Onanonymous_aclChange"
                          :prop="PI_anonymous_acl"
                          v-model="Model.anonymous_acl"
                          :label="Model.anonymous_acl_name"
                          ref="ref_anonymous_acl"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label
                            ><span style="color: red">* </span> Hoonian
                            Management ACL</label
                          >
                        </span>
                        <HOODropDown
                          @change="Onhoonian_management_aclChange"
                          :prop="PI_hoonian_management_acl"
                          v-model="Model.hoonian_management_acl"
                          :label="Model.hoonian_management_acl_name"
                          ref="ref_hoonian_management_acl"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label
                            ><span style="color: red">* </span>Hoonian Admin
                            ACL</label
                          >
                        </span>
                        <HOODropDown
                          @change="Onhoonian_admin_aclChange"
                          :prop="PI_hoonian_admin_acl"
                          v-model="Model.hoonian_admin_acl"
                          :label="Model.hoonian_admin_acl_name"
                          ref="ref_hoonian_admin_acl"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label
                            ><span style="color: red">* </span>Developer
                            Management ACL</label
                          >
                        </span>
                        <HOODropDown
                          @change="Ondeveloper_management_aclChange"
                          :prop="PI_developer_management_acl"
                          v-model="Model.developer_management_acl"
                          :label="Model.developer_management_acl_name"
                          ref="ref_developer_management_acl"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label
                            ><span style="color: red">* </span>Developer Admin
                            ACL</label
                          >
                        </span>
                        <HOODropDown
                          @change="Ondeveloper_admin_aclChange"
                          :prop="PI_developer_admin_acl"
                          v-model="Model.developer_admin_acl"
                          :label="Model.developer_admin_acl_name"
                          ref="ref_developer_admin_acl"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label
                            ><span style="color: red">* </span>Broker Group
                            ACL</label
                          >
                        </span>
                        <HOODropDown
                          @change="Onbroker_group_aclChange"
                          :prop="PI_broker_group_acl"
                          v-model="Model.broker_group_acl"
                          :label="Model.broker_group_acl_name"
                          ref="ref_broker_group_acl"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label
                            ><span style="color: red">* </span>Principle
                            ACL</label
                          >
                        </span>
                        <HOODropDown
                          @change="Onprinciple_aclChange"
                          :prop="PI_principle_acl"
                          v-model="Model.principle_acl"
                          :label="Model.principle_acl_name"
                          ref="ref_principle_acl"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label
                            ><span style="color: red">* </span>Marketing Agent
                            Internal ACL</label
                          >
                        </span>
                        <HOODropDown
                          @change="Onmarketing_agent_internal_aclChange"
                          :prop="PI_marketing_agent_internal_acl"
                          v-model="Model.marketing_agent_internal_acl"
                          :label="Model.marketing_agent_internal_acl_name"
                          ref="ref_marketing_agent_internal_acl"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label
                            ><span style="color: red">* </span>Marketing Agent
                            External ACL</label
                          >
                        </span>
                        <HOODropDown
                          @change="Onmarketing_agent_external_aclChange"
                          :prop="PI_marketing_agent_external_acl"
                          v-model="Model.marketing_agent_external_acl"
                          :label="Model.marketing_agent_external_acl_name"
                          ref="ref_marketing_agent_external_acl"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label
                            ><span style="color: red">* </span>Customer
                            ACL</label
                          >
                        </span>
                        <HOODropDown
                          @change="Oncustomer_aclChange"
                          :prop="PI_customer_acl"
                          v-model="Model.customer_acl"
                          :label="Model.customer_acl_name"
                          ref="ref_customer_acl"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label
                            ><span style="color: red">* </span>Referral
                            ACL</label
                          >
                        </span>
                        <HOODropDown
                          @change="Onreferral_aclChange"
                          :prop="PI_referral_acl"
                          v-model="Model.referral_acl"
                          :label="Model.referral_acl_name"
                          ref="ref_referral_acl"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 10px">
                  <b-col offset="2" md="10" style="text-align: center">
                    <ABSButton
                      :text="'Save'"
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

      MasterPrincipleList_propList: {
        url: "/api/hoonian-website/principle-master-list",
        initialWhere: "",
        SortField: "",
        SortBy: "",
        ParamWhere: "",
      },

      Model: {
        app_setup_id: "",
        app_name: "",
        customer_name: "",
        android_app_id: "",
        ios_app_id: "",
        token_use_per_app: true,
        token_value: 0,
        appointment_alert: 0,
        appointment_alert_same_day: 0,
        sales_lead_source_id: "",
        source_name: "",
        description: "",
        anonymous_acl: "",
        anonymous_acl_name: "",
        hoonian_management_acl: "",
        hoonian_management_acl_name: "",
        hoonian_admin_acl: "",
        hoonian_admin_acl_name: "",
        developer_management_acl: "",
        developer_management_acl_name: "",
        developer_admin_acl: "",
        developer_admin_acl_name: "",
        broker_group_acl: "",
        broker_group_acl_name: "",
        principle_acl: "",
        principle_acl_name: "",
        marketing_agent_internal_acl: "",
        marketing_agent_internal_acl_name: "",
        marketing_agent_external_acl: "",
        marketing_agent_external_acl_name: "",
        customer_acl: "",
        customer_acl_name: "",
        referral_acl: "",
        referral_acl_name: "",
      },
      PI_app_name: {
        cValidate: "required|max:100",
        cName: "app_name",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_customer_name: {
        cValidate: "required|max:100",
        cName: "customer_name",
        cOrder: 2,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_android_app_id: {
        cValidate: "max:100",
        cName: "android_app_id",
        cOrder: 3,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_ios_app_id: {
        cValidate: "max:100",
        cName: "ios_app_id",
        cOrder: 4,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_token_use_per_app: {
        cValidate: "required",
        cName: "token_use_per_app",
        cId: "rdtoken_use_per_app",
        cRadioOptions: [
          { text: "Yes", value: true },
          { text: "No", value: false },
        ],
        cRadioDefaultOption: true,
        cOrder: 5,
        cProtect: false,
        cVisible: true,
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus,
        cGroup: false,
      },
      PI_token_value: {
        cValidate: "",
        cName: "token_value",
        cOrder: 6,
        cKey: false,
        cType: "decimal",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_appointment_alert: {
        cValidate: "",
        cName: "appointment_alert",
        cOrder: 7,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_appointment_alert_same_day: {
        cValidate: "",
        cName: "appointment_alert_same_day",
        cOrder: 8,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_sales_lead_source_id: {
        dataLookUp: {
          url: "/api/hoonian-website/sales-lead-lookup",
          param: {},
        },
        cValidate: "required",
        cName: "sales_lead_source_id",
        ckey: false,
        cOrder: 9,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
      PI_description: {
        cValidate: "max:1000",
        cName: "description",
        cOrder: 10,
        cKey: false,
        cProtect: false,
        cResize: false,
        cReadonly: false,
        cRows: 3,
        cMaxRows: 3,
        cSize: "md",
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus,
      },
      PI_anonymous_acl: {
        dataLookUp: {
          url: "/api/hoonian-website/acl-lookup",
          param: {},
        },
        cValidate: "required",
        cName: "anonymous_acl",
        ckey: false,
        cOrder: 11,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
      PI_hoonian_management_acl: {
        dataLookUp: {
          url: "/api/hoonian-website/acl-lookup",
          param: {},
        },
        cValidate: "required",
        cName: "hoonian_management_acl",
        ckey: false,
        cOrder: 12,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
      PI_hoonian_admin_acl: {
        dataLookUp: {
          url: "/api/hoonian-website/acl-lookup",
          param: {},
        },
        cValidate: "required",
        cName: "hoonian_admin_acl",
        ckey: false,
        cOrder: 13,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
      PI_developer_management_acl: {
        dataLookUp: {
          url: "/api/hoonian-website/acl-lookup",
          param: {},
        },
        cValidate: "required",
        cName: "developer_management_acl",
        ckey: false,
        cOrder: 14,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
      PI_developer_admin_acl: {
        dataLookUp: {
          url: "/api/hoonian-website/acl-lookup",
          param: {},
        },
        cValidate: "required",
        cName: "developer_admin_acl",
        ckey: false,
        cOrder: 15,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
      PI_broker_group_acl: {
        dataLookUp: {
          url: "/api/hoonian-website/acl-lookup",
          param: {},
        },
        cValidate: "required",
        cName: "broker_group_acl",
        ckey: false,
        cOrder: 16,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
      PI_principle_acl: {
        dataLookUp: {
          url: "/api/hoonian-website/acl-lookup",
          param: {},
        },
        cValidate: "required",
        cName: "principle_acl",
        ckey: false,
        cOrder: 17,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
      PI_marketing_agent_internal_acl: {
        dataLookUp: {
          url: "/api/hoonian-website/acl-lookup",
          param: {},
        },
        cValidate: "required",
        cName: "marketing_agent_internal_acl",
        ckey: false,
        cOrder: 18,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
      PI_marketing_agent_external_acl: {
        dataLookUp: {
          url: "/api/hoonian-website/acl-lookup",
          param: {},
        },
        cValidate: "required",
        cName: "marketing_agent_external_acl",
        ckey: false,
        cOrder: 19,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
      PI_customer_acl: {
        dataLookUp: {
          url: "/api/hoonian-website/acl-lookup",
          param: {},
        },
        cValidate: "required",
        cName: "customer_acl",
        ckey: false,
        cOrder: 20,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
      PI_referral_acl: {
        dataLookUp: {
          url: "/api/hoonian-website/acl-lookup",
          param: {},
        },
        cValidate: "required",
        cName: "referral_acl",
        ckey: false,
        cOrder: 21,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
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
    Onsales_lead_source_idChange(data) {
      this.$nextTick(() => {
        this.Model.sales_lead_source_id = data.id;
        this.Model.source_name = data.label;
      });
    },
    Onanonymous_aclChange(data) {
      this.$nextTick(() => {
        this.Model.anonymous_acl = data.id;
        this.Model.anonymous_acl_name = data.label;
      });
    },
    Onhoonian_management_aclChange(data) {
      this.$nextTick(() => {
        this.Model.hoonian_management_acl = data.id;
        this.Model.hoonian_management_acl_name = data.label;
      });
    },
    Onhoonian_admin_aclChange(data) {
      this.$nextTick(() => {
        this.Model.hoonian_admin_acl = data.id;
        this.Model.hoonian_admin_acl_name = data.label;
      });
    },
    Ondeveloper_management_aclChange(data) {
      this.$nextTick(() => {
        this.Model.developer_management_acl = data.id;
        this.Model.developer_management_acl_name = data.label;
      });
    },
    Ondeveloper_admin_aclChange(data) {
      this.$nextTick(() => {
        this.Model.developer_admin_acl = data.id;
        this.Model.developer_admin_acl_name = data.label;
      });
    },
    Onbroker_group_aclChange(data) {
      this.$nextTick(() => {
        this.Model.broker_group_acl = data.id;
        this.Model.broker_group_acl_name = data.label;
      });
    },
    Onprinciple_aclChange(data) {
      this.$nextTick(() => {
        this.Model.principle_acl = data.id;
        this.Model.principle_acl_name = data.label;
      });
    },
    Onmarketing_agent_internal_aclChange(data) {
      this.$nextTick(() => {
        this.Model.marketing_agent_internal_acl = data.id;
        this.Model.marketing_agent_internal_acl_name = data.label;
      });
    },
    Onmarketing_agent_external_aclChange(data) {
      this.$nextTick(() => {
        this.Model.marketing_agent_external_acl = data.id;
        this.Model.marketing_agent_external_acl_name = data.label;
      });
    },
    Oncustomer_aclChange(data) {
      this.$nextTick(() => {
        this.Model.customer_acl = data.id;
        this.Model.customer_acl_name = data.label;
      });
    },
    Onreferral_aclChange(data) {
      this.$nextTick(() => {
        this.Model.referral_acl = data.id;
        this.Model.referral_acl_name = data.label;
      });
    },

    doBack() {
      this.$router.go(-1);
    },
    doEdit() {
      var param = record;
      param.isEdit = true;
      param.isView = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "MK_BrokerGroupView" });
    },
    M_ClearForm() {
      this.Model = {
        app_setup_id: "",
        app_name: "",
        customer_name: "",
        android_app_id: "",
        ios_app_id: "",
        token_use_per_app: true,
        token_value: 0,
        appointment_alert: 0,
        appointment_alert_same_day: 0,
        sales_lead_source_id: "",
        source_name: "",
        description: "",
        anonymous_acl: "",
        anonymous_acl_name: "",
        hoonian_management_acl: "",
        hoonian_management_acl_name: "",
        hoonian_admin_acl: "",
        hoonian_admin_acl_name: "",
        developer_management_acl: "",
        developer_management_acl_name: "",
        developer_admin_acl: "",
        developer_admin_acl_name: "",
        broker_group_acl: "",
        broker_group_acl_name: "",
        principle_acl: "",
        principle_acl_name: "",
        marketing_agent_internal_acl: "",
        marketing_agent_internal_acl_name: "",
        marketing_agent_external_acl: "",
        marketing_agent_external_acl_name: "",
        customer_acl: "",
        customer_acl_name: "",
        referral_acl: "",
        referral_acl_name: "",
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
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/app-setup-addedit",
        this.Model
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
      this.Model.app_setup_id = this.paramFromList.id;
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/app-setup-detail",
        this.Model
      ).then((response) => {
        if (response == null) return;
        let data = response.data.app_setup_detail;
        this.Model = data;
        // this.Model.app_name_adminLabel = data.mobile_app_user_id;
        this.Model.app_setup_id = this.paramFromList.id;
      });
    },
    OnActiveChange(data) {
      this.$nextTick(() => {});
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

