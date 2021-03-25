<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important">
                  <span>{{ title }} Offline Sales by Developer</span>
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
                            ><span style="color: red">* </span>Marketing
                            Agent</label
                          >
                        </span>
                        <HOODropDown
                          @change="Onmarketing_idChange"
                          :prop="PI_marketing_id"
                          v-model="Model.marketing_id"
                          :label="Model.marketing_name"
                          ref="ref_marketing_id"
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
                          <label
                            ><span style="color: red">* </span>Sales Date</label
                          >
                        </span>
                        <HOODateTime
                          :prop="PI_sales_date"
                          @input="Onsales_dateChange"
                          v-model="Model.sales_date"
                          ref="ref_sales_date"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label
                            ><span style="color: red">* </span>Tower
                            Cluster</label
                          >
                        </span>
                        <HOODropDown
                          @change="Ontower_cluster_idChange"
                          :prop="PI_tower_cluster_id"
                          v-model="Model.tower_cluster_id"
                          :label="Model.tower_cluster_name"
                          ref="ref_tower_cluster_id"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label
                            ><span style="color: red">* </span>Block
                            Floor</label
                          >
                        </span>
                        <HOODropDown
                          @change="Onblock_floor_idChange"
                          :prop="PI_block_floor_id"
                          v-model="Model.block_floor_id"
                          :label="Model.block_floor_name"
                          ref="ref_block_floor_id"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label
                            ><span style="color: red">* </span>Unit Type</label
                          >
                        </span>
                        <HOODropDown
                          @change="Onunit_type_idChange"
                          :prop="PI_unit_type_id"
                          v-model="Model.unit_type_id"
                          :label="Model.unit_type_name"
                          ref="ref_unit_type_id"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label
                            ><span style="color: red">* </span>Unit No</label
                          >
                        </span>
                        <HOODropDown
                          @change="Onunit_idChange"
                          :prop="PI_unit_id"
                          v-model="Model.unit_id"
                          :label="Model.unit_no"
                          ref="ref_unit_id"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label
                            ><span style="color: red">* </span>Payment
                            Method</label
                          >
                        </span>
                        <HOODropDown
                          @change="Onpayment_method_idChange"
                          :prop="PI_payment_method_id"
                          v-model="Model.payment_method_id"
                          :label="Model.payment_method_name"
                          ref="ref_payment_method_id"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <span style="color: red">* </span
                          ><label> Customer Name</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_customer_name"
                          v-model="Model.customer_name"
                          ref="ref_customer_name"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <span style="color: red">* </span
                          ><label> Handphone</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_handphone"
                          v-model="Model.handphone"
                          ref="ref_handphone"
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
        offline_sales_by_developer_id: "",
        project_id: "",
        marketing_id: "M",
        marketing_name: "M",
        unit_id: "",
        unit_no: "",
        payment_method_id: "",
        payment_method_name: "",
        customer_name: "",
        handphone: "",
        sales_date: "",
        tower_cluster_id: "",
        tower_cluster_name: "",
        block_floor_id: "",
        block_floor_name: "",
        unit_type_id: "",
        unit_type_name: "",
      },
      PI_marketing_id: {
        dataLookUp: {
          url: "/api/hoonian-website/internal-marketing-lookup",
          param: { project_id: this.getDataUser().project_id },
        },
        cValidate: "required",
        cName: "marketing_id",
        ckey: false,
        cOrder: 1,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
      PI_sales_date: {
        cValidate: "",
        cName: "sales_date",
        cOrder: 2,
        cKey: false,
        cProtect: false,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_tower_cluster_id: {
        dataLookUp: {
          url: "/api/hoonian-website/tower-cluster-lookup",
          param: { project_id: this.getDataUser().project_id },
        },
        cValidate: "required",
        cName: "tower_cluster_id",
        ckey: false,
        cOrder: 3,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
      PI_block_floor_id: {
        dataLookUp: {
          url: "/api/hoonian-website/block-floor-lookup",
          param: { project_id: this.getDataUser().project_id },
        },
        cValidate: "required",
        cName: "block_floor_id",
        ckey: false,
        cOrder: 4,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
      PI_unit_type_id: {
        dataLookUp: {
          url: "/api/hoonian-website/unit-type-lookup",
          param: { project_id: this.getDataUser().project_id },
        },
        cValidate: "required",
        cName: "unit_type_id",
        ckey: false,
        cOrder: 5,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
      PI_unit_id: {
        dataLookUp: {
          url: "/api/hoonian-website/unit-lookup",
          param: { project_id: this.getDataUser().project_id },
        },
        cValidate: "required",
        cName: "unit_id",
        ckey: false,
        cOrder: 6,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
      PI_payment_method_id: {
        dataLookUp: {
          url: "/api/hoonian-website/payment-method-lookup",
          param: { project_id: this.getDataUser().project_id },
        },
        cValidate: "required",
        cName: "payment_method_id",
        ckey: false,
        cOrder: 7,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
      PI_customer_name: {
        cValidate: "required|max:100",
        cName: "customer_name",
        cOrder: 8,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_handphone: {
        cValidate: "required|max:100",
        cName: "handphone",
        cOrder: 9,
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
    Onsales_dateChange(data) {},
    Onmarketing_idChange(data) {
      this.$nextTick(() => {
        this.Model.marketing_id = data.id;
        this.Model.marketing_name = data.label;
      });
    },
    Ontower_cluster_idChange(data) {
      this.$nextTick(() => {
        this.Model.tower_cluster_id = data.id;
        this.Model.tower_cluster_name = data.label;

        // this.PI_tower_cluster_id.dataLookUp.param = {
        //   project_id: this.getDataUser().project_id,
        //   tower_cluster_id: data.id,
        // };

        this.PI_block_floor_id.dataLookUp.param = {
          project_id: this.getDataUser().project_id,
          tower_cluster_id: data.id,
        };
        // console.log(this.PI_block_floor_id.dataLookUp.param);

        this.PI_unit_type_id.dataLookUp.param = {
          project_id: this.getDataUser().project_id,
          tower_cluster_id: data.id,
        };

        this.PI_unit_id.dataLookUp.param = {
          project_id: this.getDataUser().project_id,
          tower_cluster_id: data.id,
        };
      });
    },
    Onblock_floor_idChange(data) {
      this.$nextTick(() => {
        this.Model.block_floor_id = data.id;
        this.Model.block_floor_name = data.label;

        this.PI_unit_id.dataLookUp.param = {
          project_id: this.getDataUser().project_id,
          tower_cluster_id: this.Model.tower_cluster_id,
          block_floor_id: data.id,
          unit_type_id: this.Model.unit_type_id,
        };
      });
    },
    Onunit_type_idChange(data) {
      this.$nextTick(() => {
        this.Model.unit_type_id = data.id;
        this.Model.unit_type_name = data.label;

        this.PI_unit_id.dataLookUp.param = {
          project_id: this.getDataUser().project_id,
          tower_cluster_id: this.Model.tower_cluster_id,
          block_floor_id: this.Model.block_floor_id,
          unit_type_id: data.id,
        };
      });
    },
    Onunit_idChange(data) {
      this.$nextTick(() => {
        this.Model.unit_id = data.id;
        this.Model.unit_no = data.label;
      });
    },
    Onpayment_method_idChange(data) {
      this.$nextTick(() => {
        this.Model.payment_method_id = data.id;
        this.Model.payment_method_name = data.label;
      });
    },
    doBack() {
      this.$router.go(-1);
    },
    M_ClearForm() {
      this.Model = {
        offline_sales_by_developer_id: "",
        project_id: this.getDataUser().project_id,
        marketing_id: "",
        marketing_name: "",
        unit_id: "",
        payment_method_id: "",
        payment_method_name: "",
        customer_name: "",
        handphone: "",
        sales_date: new Date(),
        tower_cluster_id: "",
        tower_cluster_name: "",
        block_floor_id: "",
        block_floor_name: "",
        unit_type_id: "",
        unit_type_name: "",
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
        marketing_id: this.Model.marketing_id,
        marketing_name: this.Model.marketing_name,
        unit_id: this.Model.unit_id,
        payment_method_id: this.Model.payment_method_id,
        payment_method_name: this.Model.payment_method_name,
        customer_name: this.Model.customer_name,
        handphone: this.Model.handphone,
        project_id: this.getDataUser().project_id,
        sales_date: this.momentDateToUnix(this.Model.sales_date, "YYYY-MM-DD"),
      };
      this.postJSON(
        this.urlHoonian +
          "/api/hoonian-website/offline-sales-by-developer-addedit",
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
      this.Model.offline_sales_by_developer_id = this.paramFromList.id;
      this.postJSON(
        this.urlHoonian +
          "/api/hoonian-website/offline-sales-by-developer-detail",
        this.Model
      ).then((response) => {
        if (response == null) return;
        this.Model = response.data.offline_sales_by_developer_detail;
        this.Model.sales_date = this.momentUnix(
          this.Model.sales_date,
          "YYYY-MM-DD HH:mm"
        );
        this.Model.marketing_name = this.Model.marketing_name;
        this.Model.customer_name = this.Model.name; // NEXT HAPUS
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

