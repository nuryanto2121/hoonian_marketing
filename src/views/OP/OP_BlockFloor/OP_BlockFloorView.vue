<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>View Block Floor</span>
                </b-col>
                <b-col style="text-align: right;">
                  <ABSButton
                    :text="'Unit Master'"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    @click="rowClickedUnitMaster"
                  />
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
                      <b-col md="6" class="row-view">
                        <span>
                          <label class="lbl-view">Block Floor Name</label>
                        </span>
                        <br>
                        <span>{{Model.block_floor_name}}</span>
                      </b-col>
                      <b-col style="text-align: right;">
                        {{Model.user_edit}} <br>
                        {{momentUnix(Model.updated_at, "DD MMM YYYY")}} <br>
                        <ABSButton
                            @click="doEdit"
                            text="Edit"
                            classButton="btn btn--default"
                            classIcon="icon-style-1"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6" class="row-view">
                        <span>
                          <label class="lbl-view">Floor Plan</label>
                        </span>
                        <br />
                        <img id="floor_plan"
                          :src="Model.floor_plan_image == '' ?
                          default_pic: urlHoonian + Model.floor_plan_image"
                          alt height="150" />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6" class="row-view">
                        <span>
                          <label class="lbl-view">Description</label>
                        </span>
                        <br>
                        <span>{{Model.description}}</span>
                      </b-col>
                    </b-row>
                    
                    <div class="card">
                      <div class="card__title">
                        <b-row>
                          <b-col style="max-width: max-content !important;">
                            <span>Unit Master</span>
                          </b-col>
                          <b-col style="text-align: right;">
                            <span>
                              <ABSButton
                                :text="'View All'"
                                classButton="button button--new"
                                classIcon="icon-style-1"
                                :disabled="false"
                                @click="doViewAllUnitMaster"
                              />
                            </span>
                          </b-col>
                        </b-row>
                      </div>
                      <div class="card__body">
                        <ACCFormList
                          :prop="{}"
                          :title="''"
                          cStatic
                          cClass="table-style-3_noAct"
                          :cHeader="headerUnitMaster"
                          :cData="dataUnitMaster"
                          @rowClicked="rowClickedUnitMaster"
                          ref="ref_unit_master"
                        >
                        </ACCFormList>
                      </div>
                    </div>
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
      headerUnitMaster: [
        {
          key: "unit_no",
          label: "Unit No",
          tdClass: "ContentACCList2 notranslate th-cus-left",
          thClass: "HeaderACCList2 S th-cus-center"
        },
        {
          key: "unit_type",
          label: "Unit Type",
          tdClass: "ContentACCList2 notranslate th-cus-left",
          thClass: "HeaderACCList2 S th-cus-center"
        }
      ],
      dataUnitMaster: [],

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
        cType: "location",
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
      doEdit() {
        var param = this.paramFromList;
        param.ForBlockFloor.isEdit = true;
        param.ForBlockFloor.isView = false;
        this.$store.commit("setParamPage", param);
        this.$router.push({ name: "OP_BlockFloorForm" });
      },
    doBack() {
      this.$router.go(-1);
    },
    GetDataBy() {
      this.Model.block_floor_id = this.paramFromList.ForBlockFloor.id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/view-block-floor-detail', this.Model).then((response) => {
        if (response == null) return;
        let data = response.data.project_master_detail;
        this.Model = data;
        this.Model.block_floor_id = data.id;
        this.dataUnitMaster = response.data.unit_master;
      });
    },
    onFloorPlanChange(data) {
    },
    doViewAllUnitMaster() {
      var param = this.paramFromList;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_UnitMaster" });
    },
    rowClickedUnitMaster(record, index) {
      let param = this.paramFromList;
      param.ForUnitMaster = record == null ? {} : record;
      param.ForUnitMaster.isEdit = record == null ? false : true;
      param.ForUnitMaster.tower_cluster_id = param.ForBlockFloor.tower_cluster_id;
      param.ForUnitMaster.floor_plan_image = this.Model.floor_plan_image;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_UnitMasterForm" });
    },
  },
  mounted() {
    this.GetDataBy();
  },
};
</script>

