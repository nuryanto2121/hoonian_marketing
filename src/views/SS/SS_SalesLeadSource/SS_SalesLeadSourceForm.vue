<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important">
                  <span>{{ title }} Sales Lead Source</span>
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
                            ><span style="color: red">* </span>Sales Lead
                            Source</label
                          >
                        </span>
                        <ACCTextBox
                          :prop="PI_source_name"
                          v-model="Model.source_name"
                          ref="ref_source_name"
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
                          <label><span style="color: red">* </span>Type</label>
                        </span>
                        <ACCRadioButton
                          @input="OnTypeChange"
                          :prop="PI_type"
                          v-model="Model.type"
                          ref="ref_type"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
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
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label
                            ><span style="color: red">* </span>Active</label
                          >
                        </span>
                        <ACCRadioButton
                          @input="OnActiveChange"
                          :prop="PI_active"
                          v-model="Model.is_active"
                          ref="ref_active"
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
        sales_lead_id: "",
        source_name: "",
        type: "I",
        description: "",
        is_active: true,
      },
      PI_source_name: {
        cValidate: "required|max:100",
        cName: "source_name name",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_description: {
        cValidate: "max:1000",
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
        cInputStatus: this.inputStatus,
      },
      PI_type: {
        cValidate: "required",
        cName: "type",
        cId: "rdtype",
        cRadioOptions: [
          { text: "Internal", value: "I" },
          { text: "External", value: "E" },
        ],
        cRadioDefaultOption: "I",
        cOrder: 2,
        cProtect: false,
        cVisible: true,
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus,
        cGroup: false,
      },
      PI_active: {
        cValidate: "required",
        cName: "active",
        cId: "rdactive",
        cRadioOptions: [
          { text: "Yes", value: true },
          { text: "No", value: false },
        ],
        cRadioDefaultOption: true,
        cOrder: 4,
        cProtect: false,
        cVisible: true,
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus,
        cGroup: false,
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
        user_id: "adm",
        sales_lead_id: "",
        source_name: "",
        type: "I",
        description: "",
        is_active: true,
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
        this.urlHoonian + "/api/hoonian-website/sales-lead-addedit",
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
      this.Model.sales_lead_id = this.paramFromList.id;
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/sales-lead-detail",
        this.Model
      ).then((response) => {
        if (response == null) return;
        this.Model = response.data.prospect_source_detail;
        this.Model.sales_lead_id = this.Model.id;
        this.Model.user_id = "adm"; // NEXT HAPUS
      });
    },
    OnActiveChange(data) {
      this.$nextTick(() => {});
    },
    OnTypeChange(data) {
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

