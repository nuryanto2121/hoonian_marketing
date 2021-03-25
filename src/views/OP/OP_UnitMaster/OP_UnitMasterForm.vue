<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>{{title}} Unit Master</span>
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
                          <label><span style="color:red;">* </span>Unit No.</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_unit_no"
                          v-model="Model.unit_no"
                          ref="ref_unit_no"
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
                          <label><span style="color:red;">* </span>Unit Type</label>
                        </span>
                        <HOODropDown
                          @change="Onunit_typeChange"
                          :prop="PI_unit_type"
                          v-model="Model.unit_type"
                          :label="Model.unit_typeLabel"
                          ref="ref_unit_type"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Size</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_size"
                          v-model="Model.size"
                          ref="ref_size"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color:red;">* </span>Price</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_price"
                          v-model="Model.price"
                          ref="ref_price"
                        />
                      </b-col>
                    </b-row>

                    <b-row>
                        <b-col md="1">
                        <ABSButton
                            :text="textButton"
                            classButton="btn btn--default"
                            classIcon="icon-style-1"
                            @click="saveXY"
                            styleButton="height: 40px;width: 100%;"
                        />
                        </b-col>
                        <b-col md="1">
                        <ABSButton
                            :text="'Cancel'"
                            classButton="btn btn--edit"
                            classIcon="icon-style-2"
                            @click="cancel"
                            styleButton="height: 40px;width: 100%;"
                        />
                        </b-col>
                        <b-col md="1">
                        <ABSButton
                            :text="'Clear Shape'"
                            classButton="btn btn--delete"
                            classIcon="icon-style-2"
                            @click="clear"
                            styleButton="height: 40px;width: 100%;"
                        />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col ref="container">
                        <v-stage :config="stageSize" ref="stage">
                            <v-layer @dblclick="onLayerClick">
                            <v-image :config="{
                                image: Model.floor_plan_image
                            }"/>
                            <template v-for="(data, i) in savedShape">
                                <v-line v-bind:key="i" @click="onShapeClick" :config="{
                                    points: data.point_unit,
                                    tension: 0,
                                    fill: 'rgba(74, 147, 179, 0.5)',
                                    stroke: 'red',
                                    closed: true,
                                }"
                                />
                                <!-- closed: true, -->
                            </template>
                            <template v-for="(data, id) in tempCircle">
                                <v-circle v-bind:key="id" :config="{
                                    x: data.x,
                                    y: data.y,
                                    radius: 3,
                                    fill: 'red'
                                }"
                                />
                            </template>
                            </v-layer>
                        </v-stage>
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
const width = window.innerWidth;
const height = window.innerHeight;

export default {
  data() {
    return {
      title: "",

      stageSize: {
        width: width,
        height: height
      },
      textButton: 'Start',
      tempCircle: [],
      savedShape: [],
      displayXY: {},

      Model: {
        unit_id: "",
        unit_no: "",
        unit_type: "",
        unit_typeLabel: "",
        size: "",
        price: "",
        project_id: "",
        floor_plan_mark: "",
        floor_plan_image: ""
      },
      PI_unit_no: {
        cValidate: "required|max:100",
        cName: "Unit No",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_size: {
        cValidate: "max:100",
        cName: "Size",
        cOrder: 2,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_unit_type: {
        dataLookUp: {
          url: "/api/hoonian-website/unit-type-lookup",
          param: {}
        },
        cValidate: "required",
        cName: "Unit Type",
        ckey: false,
        cOrder: 3,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_price: {
        cValidate: "required",
        cName: "Size",
        cOrder: 4,
        cKey: false,
        cType: "decimal",
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
      if (param.ForUnitMaster.isEdit && param.ForUnitMaster.isEdit === true) {
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
    Onunit_typeChange(data) {
        this.$nextTick(() => {
            this.Model.unit_type = data.id;
            this.Model.unit_typeLabel = data.label;
        });
    },
    onLayerClick(data) {
      if (this.textButton != 'Save') return;
      let pos = this.getRelativePointerPosition(data.currentTarget);
      this.tempCircle.push({
        x: pos.x,
        y: pos.y
      })
    },
    saveXY() {
      if (this.M_Image.file_logo_name == "") {
          this.alertError("Please upload image")
          return;
      }
      if (this.textButton == 'Start') {
        this.textButton = 'Save';
      } else {
        if (this.tempCircle.length == 1) {
          this.alertError("Must Point minimum 2 circle")
          return;
        }
        this.textButton = 'Start';
        
        let arrayShaped = [];
        for (let idx = 0; idx < this.tempCircle.length; idx++) {
          arrayShaped.push(this.tempCircle[idx].x);
          arrayShaped.push(this.tempCircle[idx].y);
        }
        this.savedShape.push({point_unit: arrayShaped});
        this.tempCircle = [];
      }
    },
    cancel() {
      this.textButton = 'Start';
      this.tempCircle = [];
    },
    clear() {
      this.cancel();
      this.savedShape = [];
    },
    onShapeClick() {
      console.log('coy');
    },

    M_ClearForm() {
      this.Model = {
        unit_id: "",
        unit_no: "",
        unit_type: "",
        unit_typeLabel: "",
        size: "",
        price: "",
        project_id: this.getDataUser().project_id,
        floor_plan_mark: "",
        floor_plan_image: ""
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
      this.postJSON(this.urlHoonian + '/api/hoonian-website/view-unit-master-addedit', this.Model).then((response) => {
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
      this.Model.unit_id = this.paramFromList.ForUnitMaster.id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/view-unit-master-detail', this.Model).then((response) => {
        if (response == null) return;
        let data = response.data.project_master_detail;
        this.Model = data;
        this.Model.unit_id = data.id;
        this.Model.floor_plan_image = this.paramFromList.ForUnitMaster.floor_plan_image;
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

    this.PI_unit_type.dataLookUp.param = {
        project_id: this.paramFromList.id,
        tower_cluster_id: this.paramFromList.ForUnitMaster.tower_cluster_id
    };
    const image = new window.Image();
    image.src = this.urlHoonian + this.paramFromList.ForUnitMaster.floor_plan_image;
    image.onload = () => {
      this.Model.floor_plan_image = image;
      this.stageSize.width = image.width;
      this.stageSize.height = image.height;
    };
    console.log(this.Model)
  },
};
</script>

