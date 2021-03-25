<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important">
                  <span>{{ title }} Sales Cancellation</span>
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
                            ><span style="color: red">* </span>Unit No</label
                          >
                        </span>
                        <HOODropDown
                          @change="OnUnitIDChange"
                          :prop="PI_unit_id"
                          v-model="Model.unit_id"
                          :label="Model.unit_description"
                          ref="ref_unit_id"
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
        sales_cancellation_id: "",
        project_id: "",
        unit_id: "",
        unit_description: "",
        reason_id: "",
        reason_description: "",
      },
      PI_unit_id: {
        dataLookUp: {
          url: "/api/hoonian-website/unit-lookup",
          param: {},
        },
        cValidate: "required",
        cName: "Unit",
        ckey: false,
        cOrder: 1,
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
        cName: "reason",
        ckey: false,
        cOrder: 2,
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
    OnUnitIDChange(data) {
      this.$nextTick(() => {
        this.Model.unit_id = data.id;
        this.Model.unit_description = data.label;
      });
    },
    doBack() {
      this.$router.go(-1);
    },
    M_ClearForm() {
      this.Model = {
        sales_cancellation_id: "",
        project_id: this.getDataUser().project_id,
        unit_id: "",
        unit_description: "",
        reason_id: "",
        reason_description: "",
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
        this.urlHoonian + "/api/hoonian-website/sales-cancellation-addedit",
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
      this.Model.sales_cancellation_id = this.paramFromList.id;
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/sales-cancellation-detail",
        this.Model
      ).then((response) => {
        if (response == null) return;
        this.Model = response.data.sales_cancellation_detail;
        this.Model.sales_cancellation_id = this.Model.id;
        this.Model.reason_description = ""; // NEXT HAPUS
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

