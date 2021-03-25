<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important">
                  <span>{{ title }} Booking Confirmation</span>
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
                          <label>Tower Cluster</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_tower_cluster_name"
                          v-model="Model.tower_cluster_name"
                          ref="ref_tower_cluster_name"
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
                          <label>Block Floor</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_block_floor_name"
                          v-model="Model.block_floor_name"
                          ref="ref_block_floor_name"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Unit Type</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_unit_type_name"
                          v-model="Model.unit_type_name"
                          ref="ref_unit_type_name"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Unit No</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_unit_no"
                          v-model="Model.unit_no"
                          ref="ref_unit_no"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Booked Date</label>
                        </span>
                        <HOODateTime
                          :prop="PI_booked_date"
                          @input="OnBookedDateChange"
                          v-model="Model.booked_date"
                          ref="ref_booked_date"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label
                            ><span style="color: red">* </span>Status</label
                          >
                        </span>
                        <ACCRadioButton
                          @input="OnStatusChange"
                          :prop="PI_status"
                          v-model="Model.status"
                          ref="ref_status"
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
                          @change="OnPaymentMethodChange"
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
                          <label
                            ><span style="color: red">* </span>Reason</label
                          >
                        </span>
                        <HOODropDown
                          @change="OnReasonDescriptionChange"
                          :prop="PI_reason_id"
                          v-model="Model.reason_id"
                          :label="Model.reason_description"
                          ref="ref_reason_id"
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
        booking_confirmation_id: "",
        project_id: this.getDataUser().project_id,
        tower_cluster_name: "",
        status: "",
        payment_method_id: "",
        payment_method_name: "",
        reason_id: "",
        reason_description: "",
        tower_cluster_name: "",
        block_floor_name: "",
        unit_type_name: "",
        unit_no: "",
        booked_date: "",
      },
      PI_tower_cluster_name: {
        cValidate: "required|max:100",
        cName: "tower_cluster_name",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_block_floor_name: {
        cValidate: "required|max:100",
        cName: "block_floor_name",
        cOrder: 2,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_unit_type_name: {
        cValidate: "required|max:100",
        cName: "unit_type_name",
        cOrder: 3,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_unit_no: {
        cValidate: "required|max:100",
        cName: "unit_no",
        cOrder: 4,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_booked_date: {
        cValidate: "",
        cName: "booked_date",
        cOrder: 5,
        cKey: false,
        cProtect: true,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_status: {
        cValidate: "required",
        cName: "status",
        cId: "rdstatus",
        cRadioOptions: [
          { text: "New", value: 1 },
          { text: "Confirm", value: 2 },
          { text: "Cancel", value: 3 },
        ],
        cRadioDefaultOption: "Y",
        cOrder: 6,
        cProtect: false,
        cVisible: true,
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus,
        cGroup: false,
      },
      PI_payment_method_id: {
        dataLookUp: {
          url: "/api/hoonian-website/payment-method-lookup",
          param: {
            project_id: this.getDataUser().project_id,
          },
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
      PI_reason_id: {
        dataLookUp: {
          url: "/api/hoonian-website/reason-lookup",
          param: {},
        },
        cValidate: "required",
        cName: "reason_id",
        ckey: false,
        cOrder: 8,
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
    OnReasonDescriptionChange(data) {
      this.$nextTick(() => {
        this.Model.reason_id = data.id;
        this.Model.reason_description = data.label;
      });
    },
    OnPaymentMethodChange(data) {
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
        booking_confirmation_id: "",
        project_id: this.getDataUser().project_id,
        tower_cluster_name: "",
        status: 1,
        payment_method_id: "",
        payment_method_name: "",
        reason_id: "",
        reason_description: "",
        tower_cluster_name: "",
        block_floor_name: "",
        unit_type_name: "",
        unit_no: "",
        booked_date: "",
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
        booking_confirmation_id: this.Model.booking_confirmation_id,
        project_id: this.getDataUser().project_id,
        customer_transaction_id: this.Model.customer_transaction_id,
        status: this.Model.status,
        payment_method_id: this.Model.payment_method_name,
        payment_method_name: this.Model.payment_method_name,
        reason_id: this.Model.reason_id,
        reason_description: this.Model.reason_description,
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/booking-confirmation-addedit",
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
      this.Model.booking_confirmation_id = this.paramFromList.id;
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/booking-confirmation-detail",
        this.Model
      ).then((response) => {
        if (response == null) return;
        this.Model = response.data.booking_confirmation_detail;
        this.Model.booking_confirmation_id = this.Model.id;
        this.Model.user_id = "adm"; // NEXT HAPUS
        this.Model.status = 1;
        this.Model.payment_method_id = "";
        this.Model.payment_method_name = "";
        this.Model.reason_id = "";
        this.Model.reason_description = "";
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

