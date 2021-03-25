<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>View Cluster Tower</span>
                </b-col>
                <b-col style="text-align: right;">
                  <ABSButton
                    :text="'Unit Type'"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    @click="doAddUnitType"
                  />
                  <ABSButton
                    :text="'Block Floor'"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    @click="doAddBlockFloor"
                  />
                  <ABSButton
                    :text="'Payment Scheme'"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    @click="doAddPaymentScheme"
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
                          <label class="lbl-view">Tower Cluster Name</label>
                        </span>
                        <br>
                        <span>{{Model.tower_cluster_name}}</span>
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
                            <span>Unit Type</span>
                          </b-col>
                          <b-col style="text-align: right;">
                            <span>
                              <ABSButton
                                :text="'View All'"
                                classButton="button button--new"
                                classIcon="icon-style-1"
                                :disabled="false"
                                @click="doViewAllUnitType"
                              />
                            </span>
                          </b-col>
                        </b-row>
                      </div>
                      <div class="card__body">
                        <ACCFormList
                        :prop="UnitTypeList_propList"
                          @rowClicked="doAddUnitType"
                          :cHeader="UnitTypeListHeader"
                          cStatic
                          :cData="Model.unit_type"
                          ref="ref_UnitTypeList"
                        >
                        </ACCFormList>
                      </div>
                    </div>

                    <div class="card">
                      <div class="card__title">
                        <b-row>
                          <b-col style="max-width: max-content !important;">
                            <span>Block Floor</span>
                          </b-col>
                          <b-col style="text-align: right;">
                            <span>
                              <ABSButton
                                :text="'View All'"
                                classButton="button button--new"
                                classIcon="icon-style-1"
                                :disabled="false"
                                @click="doViewAllBlockFloor"
                              />
                            </span>
                          </b-col>
                        </b-row>
                      </div>
                      <div class="card__body">
                        <ACCFormList
                        :prop="BlockFloorList_propList"
                          @rowClicked="doAddBlockFloor"
                          :cHeader="BlockFloorListHeader"
                          cStatic
                          :cData="Model.block_floor"
                          ref="ref_BlockFloorList"
                        >
                        </ACCFormList>
                      </div>
                    </div>

                    <div class="card">
                      <div class="card__title">
                        <b-row>
                          <b-col style="max-width: max-content !important;">
                            <span>Payment Scheme</span>
                          </b-col>
                          <b-col style="text-align: right;">
                            <span>
                              <ABSButton
                                :text="'View All'"
                                classButton="button button--new"
                                classIcon="icon-style-1"
                                :disabled="false"
                                @click="doViewAllPaymentScheme"
                              />
                            </span>
                          </b-col>
                        </b-row>
                      </div>
                      <div class="card__body">
                        <ACCFormList
                        :prop="PaymentSchemeList_propList"
                          @rowClicked="doAddPaymentScheme"
                          :cHeader="PaymentSchemeListHeader"
                          cStatic
                          :cData="Model.payment_scheme"
                          ref="ref_PaymentSchemeList"
                        >
                          <template slot="thumbnail_image" slot-scope="data">
                            <img id="picture"
                            :src="data.item.thumbnail_image == '' ?
                            default_pic: urlHoonian + data.item.thumbnail_image"
                            alt height="150" />
                          </template>
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

      Model: {
        project_master_id: "",
        tower_cluster_id: "",
        tower_cluster_name: "",
        description: "",
        unit_type: [],
        block_floor: [],
        payment_scheme: []
      },

      UnitTypeList_propList: {
        url: '',
        initialWhere: '',
        SortField: '',
        SortBy: '',
        ParamWhere: '',
      },
      UnitTypeListHeader: [
        {
          key: "unit_type_name",
          label: "Unit Type Name",
          tdClass: "ContentACCList2 notranslate",
          thClass: "HeaderACCList2 L th-cus-center"
        },
        {
          key: "min_available_reserved_qty",
          label: "Min. Available Reserved Qty",
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 L th-cus-center"
        }
      ],

      BlockFloorList_propList: {
        url: '',
        initialWhere: '',
        SortField: '',
        SortBy: '',
        ParamWhere: '',
      },
      BlockFloorListHeader: [
        {
          key: "block_floor_name",
          label: "Floor Block Name",
          tdClass: "ContentACCList2 notranslate",
          thClass: "HeaderACCList2 L th-cus-center"
        }
      ],

      PaymentSchemeList_propList: {
        url: '',
        initialWhere: '',
        SortField: '',
        SortBy: '',
        ParamWhere: '',
      },
      PaymentSchemeListHeader: [
        {
          key: "thumbnail_image",
          label: "Picture",
          tdClass: "ContentACCList2 notranslate",
          thClass: "HeaderACCList2 L th-cus-center"
        }
      ],
    };
  },
  computed: {
    paramFromList() {
      var param = this.$store.getters.getParamPage;
      return param;
    },
    inputStatus() {
      var param = this.$store.getters.getParamPage;
      if (param.ForCluster.isEdit && param.ForCluster.isEdit === true) {
        return "edit";
      } else {
        return "new";
      }
    },
  },
  methods: {
    doEdit() {
      var param = this.paramFromList;
      param.ForCluster.isEdit = true;
      param.ForCluster.isView = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_TowerClusterForm" });
    },
    doBack() {
      this.$router.go(-1);
    },
    doViewAllUnitType() {
      var param = this.paramFromList;
      param.ForUnitType = {
        tower_cluster_id: this.Model.tower_cluster_id
      };
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_UnitType" });
    },
    doViewAllBlockFloor() {
      var param = this.paramFromList;
      param.ForBlockFloor = {
        tower_cluster_id: this.Model.tower_cluster_id
      };
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_UnitType" });
    },
    doViewAllPaymentScheme() {
      var param = this.paramFromList;
      param.ForPaymentScheme = {
        tower_cluster_id: this.Model.tower_cluster_id
      };
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_UnitType" });
    },
    doAddUnitType(record = null) {
      var param = this.paramFromList;
      param.ForUnitType = record == null ? {} : record;
      param.ForUnitType.tower_cluster_id = record == null ? this.Model.tower_cluster_id : record.tower_cluster_id;
      param.ForUnitType.isEdit = record == null ? false : true;
      this.$store.commit("setParamPage", param);
      if (record == null) {
        this.$router.push({ name: "OP_UnitTypeForm" });
      }
      else {
        this.$router.push({ name: "OP_UnitTypeView" });
      }
    },
    doAddBlockFloor(record = null) {
      var param = this.paramFromList;
      param.ForBlockFloor = record == null ? {} : record;
      param.ForBlockFloor.tower_cluster_id = record == null ? this.Model.tower_cluster_id : record.tower_cluster_id;
      param.ForBlockFloor.isEdit = record == null ? false : true;
      this.$store.commit("setParamPage", param);
      if (record == null) {
        this.$router.push({ name: "OP_BlockFloorForm" });
      }
      else {
        this.$router.push({ name: "OP_BlockFloorView" });
      }
    },
    doAddPaymentScheme(record = null) {
      var param = this.paramFromList;
      param.ForPaymentScheme = record == null ? {} : record;
      param.ForPaymentScheme.isEdit = record == null ? false : true;
      param.ForPaymentScheme.tower_cluster_id = record == null ? this.Model.tower_cluster_id : record.tower_cluster_id;
      this.$store.commit("setParamPage", param);
      if (record == null) {
        this.$router.push({ name: "OP_PaymentSchemeForm" });
      }
      else {
        this.$router.push({ name: "OP_PaymentSchemeView" });
      }
    },
    GetDataBy() {
      this.Model.project_master_id = this.paramFromList.id;
      this.Model.tower_cluster_id = this.paramFromList.ForCluster.id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/view-tower-cluster-detail', this.Model).then((response) => {
        if (response == null) return;
        let data = response.data.tower_cluster_detail;
        this.Model = data;
        this.Model.tower_cluster_id = data.id;
        this.Model.unit_type = response.data.unit_type;
        this.Model.block_floor = response.data.block_floor;
        this.Model.payment_scheme = response.data.payment_scheme;
      });
    },
    OnActiveChange(data) {
      this.$nextTick(() => {
      });
    },
  },
  mounted() {
    this.GetDataBy();
  },
};
</script>

