<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>{{title}} Extra Hold Quota</span>
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
                          <label>Tower Cluster</label>
                        </span>
                        <HOODropDown
                          @change="Ontower_clusterChange"
                          :prop="PI_tower_cluster"
                          v-model="Model.tower_cluster"
                          :label="Model.tower_clusterLabel"
                          ref="ref_tower_cluster"
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
                            <label>Block Floor</label>
                            </span>
                            <HOODropDown
                                @change="Onblock_floorChange"
                                :prop="PI_block_floor"
                                v-model="Model.block_floor"
                                :label="Model.block_floorLabel"
                                ref="ref_block_floor"
                            />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="6">
                            <span>
                            <label>Unit Type</label>
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
                            <label><span style="color:red;">* </span>Unit No.</label>
                            </span>
                            <HOODropDown
                            @change="Onunit_idChange"
                            :prop="PI_unit_id"
                            v-model="Model.unit_id"
                            :label="Model.unit_idLabel"
                            ref="ref_unit_id"
                            />
                        </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Exclusive Agent</label>
                        </span>
                        <ACCRadioButton
                          @input="Onis_exclusive_agentChange"
                          :prop="PI_is_exclusive_agent"
                          v-model="Model.is_exclusive_agent"
                          ref="ref_is_exclusive_agent"
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
        assign_principle_unit_id:"",
        project_assign_principle_id : "",
        principle_id: "",
        project_id: "",
        tower_cluster: "",
        tower_clusterLabel: "",
        block_floor: "",
        block_floorLabel: "",
        unit_type: "",
        unit_typeLabel: "",
        unit_id: "",
        unit_idLabel: "",
        is_exclusive_agent: true
      },
      PI_tower_cluster: {
        dataLookUp: {
          url: "/api/hoonian-website/tower-cluster-lookup",
          param: {
            project_id: ""
          }
        },
        cValidate: "",
        cName: "tower_cluster",
        ckey: false,
        cOrder: 1,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_block_floor: {
        dataLookUp: {
          url: "/api/hoonian-website/block-floor-lookup",
          param: {
            project_id: "",
            tower_cluster_id: ""
          }
        },
        cValidate: "",
        cName: "block_floor",
        ckey: false,
        cOrder: 2,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_unit_type: {
        dataLookUp: {
          url: "/api/hoonian-website/unit-type-lookup",
          param: {
            project_id: "",
            tower_cluster_id: "",
            // block_floor_id: ""
          }
        },
        cValidate: "",
        cName: "unit_type",
        ckey: false,
        cOrder: 3,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_unit_id: {
        dataLookUp: {
          url: "/api/hoonian-website/unit-lookup",
          param: {
            project_id: "",
            tower_cluster_id: "",
            block_floor_id: "",
            unit_type_id: ""
          }
        },
        cValidate: "required",
        cName: "Unit Id",
        ckey: false,
        cOrder: 4,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_is_exclusive_agent: {
        cValidate: "",
        cName: "booking_type",
        cId: "rdbooking_type",
        cRadioOptions: [
          { text: "Yes", value: true },
          { text: "No", value: false }
        ],
        cRadioDefaultOption: true,
        cOrder: 5,
        cProtect: false,
        cVisible:  true,
        cParentForm: 'FormEntry',
        cInputStatus: this.inputStatus,
        cGroup: false
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
      if (param.ForAssignUnits.isEdit && param.ForAssignUnits.isEdit === true) {
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
    Ontower_clusterChange(data) {
        this.$nextTick(() => {
            this.Model.tower_cluster = data.id;
            this.Model.tower_clusterLabel = data.label;
            this.setWhereUnit();
        })
    },
    Onblock_floorChange(data) {
        this.$nextTick(() => {
            this.Model.block_floor = data.id;
            this.Model.block_floorLabel = data.label;
            this.setWhereUnit();
        })
    },
    Onunit_typeChange(data) {
        this.$nextTick(() => {
            this.Model.unit_type = data.id;
            this.Model.unit_typeLabel = data.label;
            this.setWhereUnit();
        })
    },
    Onunit_idChange(data) {
        this.$nextTick(() => {
            this.Model.unit_id = data.id;
            this.Model.unit_idLabel = data.label;
        })
    },
    setWhereUnit() {
        this.PI_block_floor.dataLookUp.param.tower_cluster_id = this.Model.tower_cluster;

        this.PI_unit_type.dataLookUp.param.tower_cluster_id = this.Model.tower_cluster;
        // this.PI_unit_type.dataLookUp.param.block_floor_id = this.Model.block_floor;

        this.PI_unit_id.dataLookUp.param.tower_cluster_id = this.Model.tower_cluster;
        this.PI_unit_id.dataLookUp.param.block_floor_id = this.Model.block_floor;
        this.PI_unit_id.dataLookUp.param.unit_type_id = this.Model.unit_type;
    },
    M_ClearForm() {
      this.Model = {
        assign_principle_unit_id:"",
        project_assign_principle_id : "",
        principle_id: "",
        project_id: "",
        tower_cluster: "",
        tower_clusterLabel: "",
        block_floor: "",
        block_floorLabel: "",
        unit_type: "",
        unit_typeLabel: "",
        unit_id: "",
        unit_idLabel: "",
        is_exclusive_agent: true
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
      this.Model.project_assign_principle_id = this.paramFromList.ForAssignUnits.project_assign_principle_id;
      this.Model.principle_id = this.paramFromList.ForAssignUnits.principle_id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/view-assign-principle-unit-addedit', this.Model).then((response) => {
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
      this.Model.assign_principle_unit_id = this.paramFromList.ForAssignUnits.id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/view-assign-principle-unit-detail', this.Model).then((response) => {
        if (response == null) return;
        let data = response.data.project_master_detail;
        this.Model = data;
        this.Model.assign_principle_unit_id = data.id;
      });
    },
  },
  mounted() {
    this.M_ClearForm();
    this.PI_tower_cluster.dataLookUp.param.project_id = this.paramFromList.id;
    this.PI_block_floor.dataLookUp.param.project_id = this.paramFromList.id;
    this.PI_unit_type.dataLookUp.param.project_id = this.paramFromList.id;
    this.PI_unit_id.dataLookUp.param.project_id = this.paramFromList.id;
    if (this.inputStatus == "edit") {
      this.title = "Edit";
      this.GetDataBy();
    } else {
      this.title = "Add";
    }
  },
};
</script>

