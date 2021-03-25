<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important">
                  <span>{{ title }} Assign Project</span>
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
                            ><span style="color: red">* </span>Project
                            Name</label
                          >
                        </span>
                        <HOODropDown
                          @change="Onproject_idChange"
                          :prop="PI_project_id"
                          v-model="Model.project_id"
                          :label="Model.project_id_name"
                          ref="ref_action"
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
        app_setup_id: "",
        project_id: "",
        project_id_name: "",
      },
      PI_project_id: {
        dataLookUp: {
          url: "/api/hoonian-website/project-lookup",
          param: {},
        },
        cValidate: "required",
        cName: "project_id",
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
      if (param == null || param == undefined) {
        this.doBack();
      } else {
        if (Object.keys(param).length < 1) {
          this.doBack();
        } else {
          if (
            param.ForAssignProject == null ||
            param.ForAssignProject == undefined
          ) {
            this.doBack();
          } else {
            return param;
          }
        }
      }
    },
    inputStatus() {
      var param = this.$store.getters.getParamPage;
      if (
        param.ForAssignProject.isEdit &&
        param.ForAssignProject.isEdit === true
      ) {
        return "edit";
      } else {
        return "new";
      }
    },
  },
  methods: {
    Onproject_idChange(data) {
      this.$nextTick(() => {
        this.Model.project_id = data.id;
        this.Model.project_id_name = data.label;
      });
    },
    doBack() {
      this.$router.go(-1);
    },
    M_ClearForm() {
      this.Model = {
        app_setup_id: "",
        project_id: "",
        project_id_name: "",
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
      this.Model.app_setup_id = this.paramFromList.id;
      // let param = {
      //   app_setup_id :
      // }
      console.log(this.Model);
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/app-setup-project-add",
        // param
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
      this.Model.app_setup_id = this.paramFromList.ForAssignProject.id;
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/principle-master-detail",
        this.Model
      ).then((response) => {
        if (response == null) return;
        this.Model = response.data.broker_group_detail;
        this.Model.app_setup_id = this.Model.id;
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

