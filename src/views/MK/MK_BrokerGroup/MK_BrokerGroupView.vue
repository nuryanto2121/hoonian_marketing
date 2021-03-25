<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>View Broker Group</span>
                </b-col>
                <b-col style="text-align: right;">
                  <ABSButton
                    :text="'Principle Master'"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    @click="doAddPrinciple"
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
                          <label class="lbl-view">Broker Group</label>
                        </span>
                        <br>
                        <span>{{Model.broker_group_name}}</span>
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
                          <label class="lbl-view">Broker Group Admin</label>
                        </span>
                        <br>
                        <span>{{Model.mobile_app_user_id}}</span>
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
                            <span>Principle Master</span>
                          </b-col>
                          <b-col style="text-align: right;">
                            <span>
                              <ABSButton
                                :text="'View All'"
                                classButton="button button--new"
                                classIcon="icon-style-1"
                                :disabled="false"
                                @click="doViewAllPrinciple"
                              />
                            </span>
                          </b-col>
                        </b-row>
                      </div>
                      <div class="card__body">
                        <ACCFormList
                          :prop="MasterPrincipleList_propList"
                          @rowClicked="doAddPrinciple"
                          :cHeader="MasterPrincipleListHeader"
                          cStatic
                          :cData="Model.principles"
                          @onRenderData="onRenderData_MasterPrincipleList"
                          ref="ref_MasterPrincipleList"
                        >
                          <!-- <template slot="no" slot-scope="data">
                            {{ data.index + 1 }}
                          </template>
                          <template slot="display_form" slot-scope="data">
                            <div style="text-align: left;">
                              {{ data.item.display_form }}
                            </div>
                          </template>
                          <template slot="is_access" slot-scope="data">
                            <b-form-checkbox
                              :id="'is_access_' + data.index"
                              :name="'is_access_' + data.index"
                              v-model="data.item.is_access"
                              :value="true"
                              :unchecked-value="false"
                              style="
                                min-height: 15px !important;
                                padding-top: 0px !important;
                              "
                              :disabled="data.item.is_disabled"
                              @input="onAccessCheck(data.index, data.item.is_access, data.item.display_button)"
                            />
                          </template> -->
                          <template slot="last_block_open_date" slot-scope="data">
                            {{momentUnix(data.item.last_block_open_date, "DD MMM YYYY")}}
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

      MasterPrincipleList_propList: {
        url: '/api/hoonian-website/principle-master-list',
        initialWhere: '',
        SortField: '',
        SortBy: '',
        ParamWhere: '',
      },
      
      MasterPrincipleListHeader: [
        {
          key: "principle_name",
          label: "Principle Name",
          tdClass: "ContentACCList2 notranslate",
          thClass: "HeaderACCList2 L th-cus-center"
        },
        {
          key: "principle_admin",
          label: "Principle Admin",
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 L th-cus-center"
        },
        {
          key: "last_block_open_date",
          label: "Last Open Blocked Date",
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 L th-cus-center"
        },
      ],

      Model: {
        broker_group_name: "",
        mobile_app_user_id: "",
        mobile_app_user_idLabel: "",
        description: "",
        principles: []
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
    doViewAllPrinciple() {
      let param = this.paramFromList;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "MK_MasterPrinciple" });
    },
    doAddPrinciple(record = null) {
      var param = this.paramFromList;
      param.ForPrinciple = record == null ? {} : record;
      param.ForPrinciple.isEdit = record == null ? false : true;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "MK_MasterPrincipleForm" });
    },
    doBack() {
      this.$router.go(-1);
    },
    doEdit() {
        var param = this.paramFromList;
        param.isEdit = true;
        param.isView = false;
        this.$store.commit("setParamPage", param);
        this.$router.push({ name: "MK_BrokerGroupForm" });
    },
    GetDataBy() {
      this.Model.broker_group_id = this.paramFromList.broker_group_id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/broker-group-detail', this.Model).then((response) => {
        if (response == null) return;
        let data = response.data.broker_group_detail;
        this.Model = data;
        this.Model.mobile_app_user_idLabel = data.mobile_app_user_id;
        this.Model.broker_group_id = this.Model.id;
        this.Model.principles = response.data.principles;
      });
    }
  },
  mounted() {
    this.GetDataBy();
  },
};
</script>

