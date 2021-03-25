<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body" style="font-family: Poppins !important;">
      <div class="">
        <div class="card" style="font-size: 12px !important;">
          <div class="card__body">
            <b-row>
              <b-col style="color: #4A93B3; font-size: 16px;">
                Import
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
                <b-img :src="require('@/assets/icon-svg/add.svg')" alt="" />
              </b-col>
              <b-col lg="6">
                <b-row>
                  <b-col lg="12">
                    <label class="lbl-bold">Project Name</label>
                    <HOODropDown
                      @change="OnProjectNameChange"
                      :prop="PI_project_name"
                      v-model="Model.project_name"
                      :label="Model.project_nameLabel"
                      ref="ref_project_name"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="12">
                    <label class="lbl-bold">Source Data</label>
                    <HOODropDown
                      @change="OnSourceDataChange"
                      :prop="PI_source_data"
                      v-model="Model.source_data"
                      :label="Model.source_dataLabel"
                      ref="ref_source_data"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="12">
                    <HOOImportExcel
                      :prop="PI_excel"
                      @change="onExcelChange"
                      v-model="Model.excel_file"
                    />

                    <div style="background: #FFFFFF;
                      border: 1px solid #9FA2AE;
                      box-sizing: border-box;
                      border-radius: 6px;
                      padding-top: 20px;
                      padding-bottom: 20px;">
                      <div style="text-align: center;">
                        <b-img :src="require('@/assets/icon-svg/xls.svg')" alt="" />
                        <div class="lbl-bold" style="margin-top: 10px;">
                          {{Model.excel_file_name}}
                        </div>
                      </div>
                    </div>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 10px;">
                  <b-col lg="12">
                    <ABSButton
                      :text="'Import Data'"
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
      title: "",
      Model: {
        project_name: "",
        project_nameLabel: "",
        source_data: "",
        source_dataLabel: "",
        excel_file: "",
        excel_file_name: "",
      },
      PI_project_name: {
        dataLookUp: {
          url: "/api/hoonian-website/project-lookup",
          param: {
            project_id: this.getDataUser().project_id,
          },
        },
        cValidate: "required",
        cName: "project name",
        ckey: false,
        cOrder: 1,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
      PI_source_data: {
        dataLookUp: {
          url: "/api/hoonian-website/sales-lead-lookup",
          param: {
            project_id: this.getDataUser().project_id,
          },
        },
        cValidate: "required",
        cName: "sales lead",
        ckey: false,
        cOrder: 2,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
      PI_excel: {
        cName: "Excel",
        cTitle: "Select File",
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
    OnProjectNameChange(data) {
      this.$nextTick(() => {
        this.Model.project_name = data.id;
        this.Model.project_nameLabel = data.label;
      })
    },
    OnSourceDataChange(data) {
      this.$nextTick(() => {
        this.Model.source_data = data.id;
        this.Model.source_dataLabel = data.label;
      })
    },
    onExcelChange(data) {
      this.Model.excel_file = data[0];
      this.Model.excel_file_name = data[0].name;
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
      let param = new FormData();
      param.append("sales_lead", this.Model.excel_file);
      this.postFormData(this.urlHoonian + `/api/hoonian-website/dashboard/operation-detail/sales-lead/import?project_id=${this.Model.project_name}&sales_lead_source_id=${this.Model.source_data}`, param).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
  },
  mounted() {
  }
};
</script>