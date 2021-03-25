<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>{{title}} Block Floor</span>
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
                          <label><span style="color:red;">* </span>Block Floor Name</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_block_floor_name"
                          v-model="Model.block_floor_name"
                          ref="ref_block_floor_name"
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
                          <label>Floor Plan</label>
                        </span>
                        <br />
                        <img id="floor_plan"
                          :src="Model.floor_plan_image == '' ?
                          default_pic: urlHoonian + Model.floor_plan_image"
                          alt height="150" />
                        <HOOImageUpload
                          :prop="PI_floor_plan_image"
                          @change="onFloorPlanChange"
                          v-model="Model.floor_plan_image"
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
        block_floor_id: "",
        block_floor_name: "",
        floor_plan_image : "",
        description: "",
        project_id: "",
        tower_cluster_id: ""
      },
      PI_block_floor_name: {
        cValidate: "required|max:100",
        cName: "Floor Block Name",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_floor_plan_image: {
        cValidate: "",
        cName: "floor_plan_image",
        cOrder: 2,
        cTitle: "Floor Plan",
        cType: "block_floor",
        cParentForm: "FormEntry"
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
      if (param.ForBlockFloor.isEdit && param.ForBlockFloor.isEdit === true) {
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
        block_floor_id: "",
        block_floor_name: "",
        floor_plan_image : "",
        description: "",
        project_id: "",
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
      this.Model.project_id = this.paramFromList.id;
      this.Model.tower_cluster_id = this.paramFromList.ForBlockFloor.tower_cluster_id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/view-block-floor-addedit', this.Model).then((response) => {
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
      this.Model.block_floor_id = this.paramFromList.ForBlockFloor.id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/view-block-floor-detail', this.Model).then((response) => {
        if (response == null) return;
        let data = response.data.project_master_detail;
        this.Model = data;
        this.Model.block_floor_id = data.id;
      });
    },
    onFloorPlanChange(data) {
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

