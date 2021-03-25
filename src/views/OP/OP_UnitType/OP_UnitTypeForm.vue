<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>{{title}} Unit Type</span>
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
                          <label><span style="color:red;">* </span>Unit Type Name</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_unit_type_name"
                          v-model="Model.unit_type_name"
                          ref="ref_unit_type_name"
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
                          <label><span style="color:red;">* </span>Min. Available Reserved Qty</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_min_reserved"
                          v-model="Model.min_available_reserved_qty"
                          ref="ref_min_reserved"
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

      Model: {
        unit_type_id :"",
        unit_type_name: "",
        min_available_reserved_qty : "",
        description : "",
        tower_cluster_id: ""
      },
      PI_unit_type_name: {
        cValidate: "required|max:100",
        cName: "Unit Type Name",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_min_reserved: {
        cValidate: "required",
        cName: "Min. Available Reserved Qty",
        cOrder: 2,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_description: {
        cValidate: "max:5000",
        cName: "Description",
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
      }
    };
  },
  computed: {
    paramFromList() {
      var param = this.$store.getters.getParamPage;
      return param;
    },
    inputStatus() {
      var param = this.$store.getters.getParamPage;
      if (param.ForUnitType.isEdit && param.ForUnitType.isEdit === true) {
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
        unit_type_id :"",
        unit_type_name: "",
        min_available_reserved_qty : "",
        description : "",
        tower_cluster_id: ""
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
      this.Model.tower_cluster_id = this.paramFromList.ForUnitType.tower_cluster_id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/view-unit-type-addedit', this.Model).then((response) => {
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
      this.Model.unit_type_id = this.paramFromList.ForUnitType.id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/view-unit-type-detail', this.Model).then((response) => {
        if (response == null) return;
        let data = response.data.project_master_detail;
        this.Model = data;
        this.Model.unit_type_id = data.id;
      });
    },
    OnActiveChange(data) {
      this.$nextTick(() => {
      });
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

