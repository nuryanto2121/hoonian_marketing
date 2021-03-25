<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important">
                  <span>{{ title }} Token and NUP Refund</span>
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
                          <label><span style="color: red">* </span>Type</label>
                        </span>
                        <ACCRadioButton
                          @input="OntypeChange"
                          :prop="PI_type"
                          v-model="Model.type"
                          ref="ref_type"
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
                          <label>Customer Name</label>
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
                          <label>Purchased By</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_purchased_by"
                          v-model="Model.purchased_by"
                          ref="ref_purchased_by"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label> Purchased Date </label>
                        </span>
                        <HOODateTime
                          @input="Onpurchased_dateChange"
                          :prop="PI_purchased_date"
                          v-model="Model.purchased_date"
                          ref="ref_purchased_date"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>
                            <span style="color: red">*</span>
                            Refund Date
                          </label>
                        </span>
                        <HOODateTime
                          @input="Onrefund_dateChange"
                          :prop="PI_refund_date"
                          v-model="Model.refund_date"
                          ref="ref_refund_date"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Price</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_price"
                          v-model="Model.price"
                          ref="ref_price"
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
        id: "",
        project_id: "",
        type: "T",
        price: 0,
        refund_date: null,
        customer_name: "",
        purchased_by: "",
        purchased_date: null,
      },
      PI_type: {
        cValidate: "required",
        cName: "active",
        cId: "rdactive",
        cRadioOptions: [
          { text: "NUP", value: "N" },
          { text: "Token", value: "T" },
        ],
        cRadioDefaultOption: "T",
        cOrder: 1,
        cProtect: false,
        cVisible: true,
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus,
        cGroup: false,
      },
      PI_customer_name: {
        cValidate: "",
        cName: "customer_name",
        cOrder: 2,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_purchased_by: {
        cValidate: "",
        cName: "purchased_by",
        cOrder: 3,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_purchased_date: {
        cValidate: "",
        cName: "purchased_date",
        cOrder: 4,
        cKey: false,
        cProtect: true,
        cWithTime: true,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_refund_date: {
        cValidate: "required",
        cName: "refund_date",
        cOrder: 5,
        cKey: false,
        cProtect: false,
        cWithTime: true,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_price: {
        cValidate: "",
        cName: "price",
        cOrder: 6,
        cKey: false,
        cType: "decimal",
        cProtect: true,
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
    OntypeChange(data) {},
    doBack() {
      this.$router.go(-1);
    },
    M_ClearForm() {
      this.Model = {
        user_id: "",
        id: "",
        project_id: this.getDataUser().project_id,
        type: "T",
        price: 0,
        refund_date: null,
        customer_name: "",
        purchased_by: "",
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
        id: this.Model.id,
        project_id: this.getDataUser().project_id,
        type: this.Model.type,
        price: this.Model.price,
        refund_date: this.momentDateToUnix(
          this.Model.refund_date,
          "YYYY-MM-DD HH:mm"
        ),
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/nup-token-refund-edit",
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
      this.Model.id = this.paramFromList.id;
      this.Model.type = this.paramFromList.type == "Token" ? "T" : "N";
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/nup-token-refund-detail",
        this.Model
      ).then((response) => {
        if (response == null) return;
        this.Model = response.data.reservation_detail;
        this.Model.id = this.Model.id;
        this.Model.purchased_date = this.momentUnix(
          this.Model.purchased_date,
          "YYYY-MM-DD HH:mm"
        );
        this.Model.refund_date = this.momentUnix(
          this.Model.refund_date,
          "YYYY-MM-DD HH:mm"
        );
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