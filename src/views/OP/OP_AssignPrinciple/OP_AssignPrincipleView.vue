<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>View Assign Principle</span>
                </b-col>
                <b-col style="text-align: right;">
                  <ABSButton
                    :text="'Assign Units'"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    @click="doAddAssignUnits"
                  />
                  <ABSButton
                    :text="'Extra Hold Quota'"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    @click="doAddExtraHoldQuota"
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
                          <label class="lbl-view">Principle Name</label>
                        </span>
                        <br>
                        <span>{{Model.principle_id}}</span>
                      </b-col>
                      <b-col style="text-align: right;" v-show="inputStatus=='edit'">
                        {{Model.user_edit}} <br>
                        {{momentUnix(Model.updated_at, "DD MMM YYYY")}} <br>
                        <ABSButton
                          :text="'Edit'"
                          classButton="btn btn--default"
                          classIcon="icon-style-1"
                          @click="doEdit"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="6" class="row-view">
                            <span>
                                <label class="lbl-view">Broker Group Commission</label>
                            </span>
                            <br>
                            <span>{{Model.broker_group_commission}}</span>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="6" class="row-view">
                            <span>
                                <label class="lbl-view">Principle Comission</label>
                            </span>
                            <br>
                            <span>{{Model.principle_comission}}</span>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="6" class="row-view">
                            <span>
                                <label class="lbl-view">Marketing Agent Comission</label>
                            </span>
                            <br>
                            <span>{{Model.marketing_agent_comission}}</span>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="6" class="row-view">
                            <span>
                                <label class="lbl-view">Principle Cancel Limit</label>
                            </span>
                            <br>
                            <span>{{Model.principle_cancel_limit}}</span>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="6" class="row-view">
                            <span>
                                <label class="lbl-view">Marketing Agent Cancel Limit</label>
                            </span>
                            <br>
                            <span>{{Model.marketing_agent_cancel_limit}}</span>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="6" class="row-view">
                            <span>
                                <label class="lbl-view">Cancellation Cumulative Days</label>
                            </span>
                            <br>
                            <span>{{Model.cancellation_cumulative_days}}</span>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="6" class="row-view">
                            <span>
                                <label class="lbl-view">Maximum Principle Hold Unit</label>
                            </span>
                            <br>
                            <span>{{Model.maximum_principle_hold_unit}}</span>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="6" class="row-view">
                            <span>
                                <label class="lbl-view">Maximum Marketing Agent Hold Unit</label>
                            </span>
                            <br>
                            <span>{{Model.maximum_marketing_agent_hold_unit}}</span>
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
                            <span>Assign Units</span>
                          </b-col>
                          <b-col style="text-align: right;">
                            <span>
                              <ABSButton
                                :text="'View All'"
                                classButton="button button--new"
                                classIcon="icon-style-1"
                                :disabled="false"
                                @click="doViewAllAssignUnits"
                              />
                            </span>
                          </b-col>
                        </b-row>
                      </div>
                      <div class="card__body">
                        <ACCFormList
                        :prop="AssignUnitsList_propList"
                          @rowClicked="doAddAssignUnits"
                          :cHeader="AssignUnitsListHeader"
                          cStatic
                          :cData="Model.assign_units"
                          ref="ref_AssignUnitsList"
                        >
                        </ACCFormList>
                      </div>
                    </div>

                    <div class="card">
                      <div class="card__title">
                        <b-row>
                          <b-col style="max-width: max-content !important;">
                            <span>Extra Hold Quota</span>
                          </b-col>
                          <b-col style="text-align: right;">
                            <span>
                              <ABSButton
                                :text="'View All'"
                                classButton="button button--new"
                                classIcon="icon-style-1"
                                :disabled="false"
                                @click="doViewAllExtraHoldQuota"
                              />
                            </span>
                          </b-col>
                        </b-row>
                      </div>
                      <div class="card__body">
                        <ACCFormList
                        :prop="ExtraHoldQuotaList_propList"
                          @rowClicked="doAddExtraHoldQuota"
                          :cHeader="ExtraHoldQuotaListHeader"
                          cStatic
                          :cData="Model.extra_hold_quota"
                          ref="ref_ExtraHoldQuotaList"
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

      Model: {
        principle_assign_principle_id: "",
        principle_id: "",
        principle_idLabel: "",
        project_id: "",
        broker_group_commission: "0",
        principle_comission: "0",
        marketing_agent_comission: "0",
        principle_cancel_limit: "0",
        marketing_agent_cancel_limit: "0",
        cancellation_cumulative_days: "0",
        maximum_principle_hold_unit: "0",
        maximum_marketing_agent_hold_unit: "0",
        description: "",
        assign_units: [],
        extra_hold_quota: []
      },

      AssignUnitsList_propList: {
        url: '',
        initialWhere: '',
        SortField: '',
        SortBy: '',
        ParamWhere: '',
      },
      AssignUnitsListHeader: [
        {
          key: "tower_cluster",
          label: "Tower Cluster",
          tdClass: "ContentACCList2 notranslate",
          thClass: "HeaderACCList2 L th-cus-center"
        },
        {
          key: "block_floor",
          label: "Block Floor",
          tdClass: "ContentACCList2 notranslate",
          thClass: "HeaderACCList2 L th-cus-center"
        },
        {
          key: "unit_type",
          label: "Unit Type",
          tdClass: "ContentACCList2 notranslate",
          thClass: "HeaderACCList2 L th-cus-center"
        },
        {
          key: "unit_no",
          label: "Unit No",
          tdClass: "ContentACCList2 notranslate",
          thClass: "HeaderACCList2 L th-cus-center"
        },
        {
          key: "exclusive_agent",
          label: "Exclusive Agent",
          tdClass: "ContentACCList2 notranslate",
          thClass: "HeaderACCList2 L th-cus-center"
        },
      ],
      
      ExtraHoldQuotaList_propList: {
        url: '',
        initialWhere: '',
        SortField: '',
        SortBy: '',
        ParamWhere: '',
      },
      ExtraHoldQuotaListHeader: [
        {
          key: "start_date",
          label: "Start Date",
          tdClass: "ContentACCList2 notranslate",
          thClass: "HeaderACCList2 L th-cus-center"
        },
        {
          key: "end_date",
          label: "End Date",
          tdClass: "ContentACCList2 notranslate",
          thClass: "HeaderACCList2 L th-cus-center"
        },
        {
          key: "extra_quantity",
          label: "Extra Quantity",
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
      if (param.ForAssignPrinciple.isEdit && param.ForAssignPrinciple.isEdit === true) {
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
    doViewAllAssignUnits() {
      var param = this.paramFromList;
      param.ForAssignUnits = {
        project_assign_principle_id: this.Model.principle_assign_principle_id,
        principle_id: this.Model.principle_id
      };
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_AssignUnits" });
    },
    doAddAssignUnits(record = null) {
      var param = this.paramFromList;
      param.ForAssignUnits = record == null ? {} : record;
      param.ForAssignUnits.project_assign_principle_id = this.Model.principle_assign_principle_id;
      param.ForAssignUnits.principle_id = record == null ? this.Model.principle_id : record.principle_id;
      param.ForAssignUnits.isEdit = record == null ? false : true;
      this.$store.commit("setParamPage", param);
      if (record == null) {
        this.$router.push({ name: "OP_AssignUnitsForm" });
      }
      else {
        this.$router.push({ name: "OP_AssignUnitsView" });
      }
    },
    doViewAllExtraHoldQuota() {
      var param = this.paramFromList;
      param.ForExtraHold = {
        principle_id: this.Model.principle_id
      };
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_ExtraHold" });
    },
    doAddExtraHoldQuota(record = null) {
      var param = this.paramFromList;
      param.ForExtraHold = record == null ? {} : record;
      param.ForExtraHold.principle_id = record == null ? this.Model.principle_id : record.principle_id;
      param.ForExtraHold.isEdit = record == null ? false : true;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_ExtraHoldForm" });
    },
    GetDataBy() {
      this.Model.principle_assign_principle_id = this.paramFromList.ForAssignPrinciple.id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/view-assign-principle-detail', this.Model).then((response) => {
        if (response == null) return;
        let data = response.data.project_master_detail;
        this.Model = data;
        this.Model.principle_assign_principle_id = data.id;
        this.Model.broker_group_commission = data.broker_group_commission;
        this.Model.principle_comission = data.principle_comission;
        this.Model.marketing_agent_comission = data.marketing_agent_comission;
        this.Model.principle_cancel_limit = data.principle_cancel_limit;
        this.Model.marketing_agent_cancel_limit = data.marketing_agent_cancel_limit;
        this.Model.cancellation_cumulative_days = data.cancellation_cumulative_days;
        this.Model.maximum_principle_hold_unit = data.maximum_principle_hold_unit;
        this.Model.maximum_marketing_agent_hold_unit = data.maximum_marketing_agent_hold_unit;
        // this.Model.units = response.data.assign_units;
        this.Model.assign_units = response.data.assign_units;
        this.Model.extra_hold_quota = response.data.extra_hold_quota;
      });
    },
  },
  mounted() {
    this.GetDataBy();
  },
};
</script>

