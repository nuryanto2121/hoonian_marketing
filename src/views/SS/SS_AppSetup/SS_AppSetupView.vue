<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12" class="row-view">
          <div class="card" style="font-size: 12px !important">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important">
                  <span>View App Setup</span>
                </b-col>
                <b-col style="text-align: right">
                  <ABSButton
                    :text="'Assign Project'"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    @click="doAddSetupProject"
                  />
                  <ABSButton
                    @click="doEdit"
                    text="Edit"
                    classButton="button button--back"
                    classIcon="icon-style-1"
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
              <b-form
                :data-vv-scope="'FormEntry'"
                :data-vv-value-path="'FormEntry'"
              >
                <b-row>
                  <b-col style="text-align: right">
                    {{ Model.user_edit }} <br />
                    {{ momentUnix(Model.updated_at, "DD MMM YYYY") }}
                  </b-col>
                </b-row>
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
                  <b-col md="5">
                    <!-- Kiri -->
                    <b-row>
                      <b-col md="12" class="row-view">
                        <span>
                          <label class="lbl-view">App Name</label>
                        </span>
                        <br />
                        <span>{{ Model.app_name }}</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12" class="row-view">
                        <span>
                          <label class="lbl-view">CustomerName</label>
                        </span>
                        <br />
                        <span>{{ Model.customer_name }}</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12" class="row-view">
                        <span>
                          <label class="lbl-view">Android App ID</label>
                        </span>
                        <br />
                        <span>{{ Model.android_app_id }}</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12" class="row-view">
                        <span>
                          <label class="lbl-view">IOS App ID</label>
                        </span>
                        <br />
                        <span>{{ Model.ios_app_id }}</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12" class="row-view">
                        <span>
                          <label class="lbl-view">Token use per App</label>
                        </span>
                        <br />
                        <span>{{
                          Model.token_use_per_app ? "Yes" : "No"
                        }}</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12" class="row-view">
                        <span>
                          <label class="lbl-view">Token Value</label>
                        </span>
                        <br />
                        <span>{{ Model.token_value }}</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12" class="row-view">
                        <span>
                          <label class="lbl-view">Appointment Alert</label>
                        </span>
                        <br />
                        <span>{{ Model.appointment_alert }}</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12" class="row-view">
                        <span>
                          <label class="lbl-view"
                            >Appointment Alert same day</label
                          >
                        </span>
                        <br />
                        <span>{{ Model.appointment_alert_same_day }}</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12" class="row-view">
                        <span>
                          <label class="lbl-view">Sales Lead Source</label>
                        </span>
                        <br />
                        <span>{{ Model.source_name }}</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12" class="row-view">
                        <span>
                          <label class="lbl-view">Description</label>
                        </span>
                        <br />
                        <span>{{ Model.description }}</span>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col md="5">
                    <!-- kanan -->
                    <b-row>
                      <b-col md="12" class="row-view">
                        <span>
                          <label class="lbl-view">Anonymous ACL</label>
                        </span>
                        <br />
                        <span>{{
                          Model.anonymous_acl_name == null
                            ? ""
                            : Model.anonymous_acl_name
                        }}</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12" class="row-view">
                        <span>
                          <label class="lbl-view">Hoonian Management ACL</label>
                        </span>
                        <br />
                        <span>{{ Model.hoonian_management_acl_name }}</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12" class="row-view">
                        <span>
                          <label class="lbl-view">Hoonian Admin ACL</label>
                        </span>
                        <br />
                        <span>{{ Model.hoonian_admin_acl_name }}</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12" class="row-view">
                        <span>
                          <label class="lbl-view"
                            >Developer Management ACL</label
                          >
                        </span>
                        <br />
                        <span>{{ Model.hoonian_management_acl_name }}</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12" class="row-view">
                        <span>
                          <label class="lbl-view">Developer Admin ACL</label>
                        </span>
                        <br />
                        <span>{{ Model.developer_admin_acl_name }}</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12" class="row-view">
                        <span>
                          <label class="lbl-view">Broker Group ACL</label>
                        </span>
                        <br />
                        <span>{{ Model.broker_group_acl_name }}</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12" class="row-view">
                        <span>
                          <label class="lbl-view">Principle ACL</label>
                        </span>
                        <br />
                        <span>{{ Model.principle_acl_name }}</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12" class="row-view">
                        <span>
                          <label class="lbl-view"
                            >Marketing Agent Internal ACL</label
                          >
                        </span>
                        <br />
                        <span>{{
                          Model.marketing_agent_internal_acl_name
                        }}</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12" class="row-view">
                        <span>
                          <label class="lbl-view"
                            >Marketing Agent External ACL</label
                          >
                        </span>
                        <br />
                        <span>{{
                          Model.marketing_agent_external_acl_name
                        }}</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12" class="row-view">
                        <span>
                          <label class="lbl-view">Customer ACL</label>
                        </span>
                        <br />
                        <span>{{ Model.customer_acl_name }}</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12" class="row-view">
                        <span>
                          <label class="lbl-view">Referral ACL</label>
                        </span>
                        <br />
                        <span>{{ Model.referral_acl_name }}</span>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 10px">
                  <b-col md="12">
                    <div class="card">
                      <div class="card__title">
                        <b-row>
                          <b-col style="max-width: max-content !important">
                            <span>Assign Project</span>
                          </b-col>
                          <b-col style="text-align: right">
                            <span>
                              <ABSButton
                                :text="'View All'"
                                classButton="button button--new"
                                classIcon="icon-style-1"
                                :disabled="false"
                                @click="doViewAllSetupProject"
                              />
                            </span>
                          </b-col>
                        </b-row>
                      </div>
                      <div class="card__body">
                        <ACCFormList
                          :prop="SetupProjectList_propList"
                          @rowClicked="doAddSetupProject"
                          :cHeader="SetupProjectHeader"
                          cStatic
                          :cData="Model.app_setup_projects"
                          @onRenderData="onRenderData_SetupProjectList"
                          ref="ref_SetupProjectList"
                        >
                          <template slot="project_id" slot-scope="data">
                            <ABSButton
                              :icon="'trash'"
                              classButton="button button--delete"
                              classIcon="icon-style-1"
                              @click="doDeleteList(data.item, data.index)"
                            />
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

      SetupProjectList_propList: {
        url: "/api/hoonian-website/principle-master-list",
        initialWhere: "",
        SortField: "",
        SortBy: "",
        ParamWhere: "",
      },

      SetupProjectHeader: [
        {
          key: "project_name",
          label: "Project Name",
          tdClass: "ContentACCList2 notranslate",
          thClass: "HeaderACCList2 L th-cus-center",
        },
        {
          key: "project_id",
          label: "Delete",
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 L th-cus-center",
        },
      ],

      Model: {
        app_setup_id: "",
        app_name: "",
        customer_name: "",
        android_app_id: "",
        ios_app_id: "",
        token_use_per_app: true,
        token_value: 0,
        appointment_alert: 0,
        appointment_alert_same_day: 0,
        sales_lead_source_id: "",
        source_name: "",
        description: "",
        anonymous_acl: "",
        anonymous_acl_name: "",
        hoonian_management_acl: "",
        hoonian_management_acl_name: "",
        hoonian_admin_acl: "",
        hoonian_admin_acl_name: "",
        developer_management_acl: "",
        developer_management_acl_name: "",
        developer_admin_acl: "",
        developer_admin_acl_name: "",
        broker_group_acl: "",
        broker_group_acl_name: "",
        principle_acl: "",
        principle_acl_name: "",
        marketing_agent_internal_acl: "",
        marketing_agent_internal_acl_name: "",
        marketing_agent_external_acl: "",
        marketing_agent_external_acl_name: "",
        customer_acl: "",
        customer_acl_name: "",
        referral_acl: "",
        referral_acl_name: "",
        app_setup_projects: [],
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
    doDeleteList(data, index) {
      let param = {
        app_setup_id: this.paramFromList.id,
        project_id: data.project_id,
      };

      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/app-setup-project-delete",
        param
      ).then((response) => {
        if (response == null) return;
        this.GetDataBy();
      });
    },
    doViewAllSetupProject() {
      let param = this.paramFromList;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "SS_AssignProject" });
    },
    doAddSetupProject(record = null) {
      if (record != null) {
        return;
      }
      var param = this.paramFromList;
      param.ForAssignProject = record == null ? {} : record;
      param.ForAssignProject.isEdit = record == null ? false : true;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "SS_AssignProjectForm" });
    },
    doBack() {
      this.$router.go(-1);
    },
    doEdit() {
      var param = this.paramFromList;
      param.isEdit = true;
      param.isView = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "SS_AppSetupForm" });
    },
    GetDataBy() {
      this.Model.app_setup_id = this.paramFromList.id;
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/app-setup-detail",
        this.Model
      ).then((response) => {
        if (response == null) return;
        let data = response.data.app_setup_detail;
        this.Model = data;
        this.Model.mobile_app_user_idLabel = data.mobile_app_user_id;
        this.Model.broker_group_id = this.Model.id;
        this.Model.app_setup_projects = response.data.app_setup_projects;
      });
    },
  },
  mounted() {
    this.GetDataBy();
  },
};
</script>

