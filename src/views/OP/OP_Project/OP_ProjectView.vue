<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>View Project Master</span>
                </b-col>
                <b-col style="text-align: right;">
                  <ABSButton
                    :text="'Detail'"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    @click="rowClickedDetail"
                  />
                  <ABSButton
                    :text="'Picture'"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    @click="rowClickedPicture"
                  />
                  <ABSButton
                    :text="'Youtube'"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    @click="rowClickedYoutube"
                  />
                  <ABSButton
                    :text="'3D360V'"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    @click="rowClicked3d360v"
                  />
                  <ABSButton
                    :text="'Tower Cluster'"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    @click="rowClickedTowerCluster"
                  />
                  <ABSButton
                    :text="'Release Period'"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    @click="rowClickedReleasePeriod"
                  />
                  <ABSButton
                    :text="'Nup'"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    @click="rowClickedNup"
                  />
                  <ABSButton
                    :text="'Assign Principle'"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    @click="rowClickedAssignPrinciple"
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
                    <b-row style="margin-bottom: -15px;">
                      <b-col md="8">
                        <b-row>
                          <b-col
                            style="max-width: max-content !important; margin-right: 20px; padding-bottom: 5px"
                            class="row-view"
                          >
                            <span>
                              <label class="lbl-view" style="margin-bottom: 0px !important;">Project Name</label>
                            </span>
                            <br />
                            <span>{{ Model.project_master_detail.project_name }}</span>
                          </b-col>
                          <b-col
                            style="max-width: max-content !important; margin-right: 20px; padding-bottom: 5px"
                            class="row-view"
                          >
                            <span>
                              <label class="lbl-view" style="margin-bottom: 0px !important;">Project Type</label>
                            </span>
                            <br />
                            <span>{{ Model.project_master_detail.project_type == 'L' ? 'Landed' : 'Highrise' }}</span>
                          </b-col>
                          <b-col
                            style="max-width: max-content !important; margin-right: 20px; padding-bottom: 5px"
                            class="row-view"
                          >
                            <span>
                              <label class="lbl-view" style="margin-bottom: 0px !important;">Project Category Name</label>
                            </span>
                            <br />
                            <span>{{ Model.project_master_detail.project_category_name }}</span>
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col style="text-align: right; margin-right: -5px;">
                        <ABSButton
                          :text="'Edit'"
                          classButton="btn btn--default"
                          classIcon="icon-style-1"
                          @click="doEdit"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col style="text-align: right;">
                        {{Model.project_master_detail.user_edit}} <br>
                        {{momentUnix(Model.project_master_detail.updated_at, "DD MMM YYYY")}}
                      </b-col>
                    </b-row>
                    <hr />
                    <div class="card">
                      <div class="card__title">
                        <b-row>
                          <b-col style="max-width: max-content !important;">
                            <span>Detail</span>
                          </b-col>
                          <b-col style="text-align: right;">
                            <span>
                              <ABSButton
                                :text="'View All'"
                                classButton="button button--new"
                                classIcon="icon-style-1"
                                :disabled="false"
                                @click="doViewAllDetail"
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
                          cClass="table-style-3"
                          :cHeader="headerDetail"
                          :cData="Model.detail"
                          @rowClicked="rowClickedDetail"
                          ref="ref_detail"
                        >
                        </ACCFormList>
                      </div>
                    </div>

                    <div class="card">
                      <div class="card__title">
                        <b-row>
                          <b-col style="max-width: max-content !important;">
                            <span>Picture</span>
                          </b-col>
                          <b-col style="text-align: right;">
                            <span>
                              <ABSButton
                                :text="'View All'"
                                classButton="button button--new"
                                classIcon="icon-style-1"
                                :disabled="false"
                                @click="doViewAllPicture"
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
                          cClass="table-style-3"
                          :cHeader="headerPicture"
                          :cData="Model.picture"
                          @rowClicked="rowClickedPicture"
                          ref="ref_picture"
                        >
                        </ACCFormList>
                      </div>
                    </div>

                    <div class="card">
                      <div class="card__title">
                        <b-row>
                          <b-col style="max-width: max-content !important;">
                            <span>Youtube</span>
                          </b-col>
                          <b-col style="text-align: right;">
                            <span>
                              <ABSButton
                                :text="'View All'"
                                classButton="button button--new"
                                classIcon="icon-style-1"
                                :disabled="false"
                                @click="doViewAllYoutube"
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
                          cClass="table-style-3"
                          :cHeader="headerYoutube"
                          :cData="Model.youtube"
                          @rowClicked="rowClickedYoutube"
                          ref="ref_youtube"
                        >
                        </ACCFormList>
                      </div>
                    </div>
                    
                    <div class="card">
                      <div class="card__title">
                        <b-row>
                          <b-col style="max-width: max-content !important;">
                            <span>3D360V</span>
                          </b-col>
                          <b-col style="text-align: right;">
                            <span>
                              <ABSButton
                                :text="'View All'"
                                classButton="button button--new"
                                classIcon="icon-style-1"
                                :disabled="false"
                                @click="doViewAll3d360v"
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
                          cClass="table-style-3"
                          :cHeader="header3d360v"
                          :cData="Model._3d360v"
                          @rowClicked="rowClicked3d360v"
                          ref="ref_3d360v"
                        >
                        </ACCFormList>
                      </div>
                    </div>
                    
                    <div class="card">
                      <div class="card__title">
                        <b-row>
                          <b-col style="max-width: max-content !important;">
                            <span>Tower Cluster</span>
                          </b-col>
                          <b-col style="text-align: right;">
                            <span>
                              <ABSButton
                                :text="'View All'"
                                classButton="button button--new"
                                classIcon="icon-style-1"
                                :disabled="false"
                                @click="doViewAllTowerCluster"
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
                          cClass="table-style-3"
                          :cHeader="headerTowerCluster"
                          :cData="Model.tower_cluster"
                          @rowClicked="rowClickedTowerCluster"
                          ref="ref_tower_cluster"
                        >
                        </ACCFormList>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card__title">
                        <b-row>
                          <b-col style="max-width: max-content !important;">
                            <span>Release Period</span>
                          </b-col>
                          <b-col style="text-align: right;">
                            <span>
                              <ABSButton
                                :text="'View All'"
                                classButton="button button--new"
                                classIcon="icon-style-1"
                                :disabled="false"
                                @click="doViewAllReleasePeriod"
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
                          cClass="table-style-3"
                          :cHeader="headerReleasePeriod"
                          :cData="Model.release_period"
                          @rowClicked="rowClickedReleasePeriod"
                          ref="ref_release_period"
                        >
                        </ACCFormList>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card__title">
                        <b-row>
                          <b-col style="max-width: max-content !important;">
                            <span>Nup</span>
                          </b-col>
                          <b-col style="text-align: right;">
                            <span>
                              <ABSButton
                                :text="'View All'"
                                classButton="button button--new"
                                classIcon="icon-style-1"
                                :disabled="false"
                                @click="doViewAllNup"
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
                          cClass="table-style-3"
                          :cHeader="headerNup"
                          :cData="Model.nup"
                          @rowClicked="rowClickedNup"
                          ref="ref_nup"
                        >
                        </ACCFormList>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card__title">
                        <b-row>
                          <b-col style="max-width: max-content !important;">
                            <span>Assign Principle</span>
                          </b-col>
                          <b-col style="text-align: right;">
                            <span>
                              <ABSButton
                                :text="'View All'"
                                classButton="button button--new"
                                classIcon="icon-style-1"
                                :disabled="false"
                                @click="doViewAllAssignPrinciple"
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
                          cClass="table-style-3"
                          :cHeader="headerAssignPrinciple"
                          :cData="Model.project_assign_principle"
                          @rowClicked="rowClickedAssignPrinciple"
                          ref="ref_assign_principle"
                        >
                        </ACCFormList>
                      </div>
                    </div>

                    <!-- <div class="card">
                      <div class="card__title">
                        <b-row>
                          <b-col style="max-width: max-content !important;">
                            <span>Tower Cluster</span>
                          </b-col>
                          <b-col style="text-align: right;">
                            <span>
                              <ABSButton
                                :text="'View All'"
                                classButton="button button--new"
                                classIcon="icon-style-1"
                                :disabled="false"
                                @click="doViewAllTowerCluster"
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
                          cClass="table-style-3"
                          :cHeader="headerTowerCluster"
                          :cData="Model.TowerCluster"
                          @rowClicked="rowClickedTowerCluster"
                          ref="ref_TowerCluster"
                        >
                        </ACCFormList>
                      </div>
                    </div>

                    <div class="card">
                      <div class="card__title">
                        <b-row>
                          <b-col style="max-width: max-content !important;">
                            <span>Release Period</span>
                          </b-col>
                          <b-col style="text-align: right;">
                            <span>
                              <ABSButton
                                :text="'View All'"
                                classButton="button button--new"
                                classIcon="icon-style-1"
                                :disabled="false"
                                @click="doViewAllReleasePeriod"
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
                          cClass="table-style-3"
                          :cHeader="headerReleasePeriod"
                          :cData="Model.ReleasePeriod"
                          @rowClicked="rowClickedReleasePeriod"
                          ref="ref_ReleasePeriod"
                        >
                        </ACCFormList>
                      </div>
                    </div> -->

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
      Model: {
        project_master_detail: {
          project_master_id: "",
          id: "",
          portfolio_id: "",
          project_name: "",
          company_group_id: "",
          company_group_name: "",
          address: "",
          location_id: "",
          location_name: "sef",
          longitude: "",
          latitude: "",
          project_category_id: "",
          project_category_name: "",
          project_type: "",
          token_is_required: true,
          sales_lead_exchange_need_approval: true,
          sales_lead_exchange_source: "",
          default_marketing_group_id: "",
          internal_marketing_id: "",
          inter_company_refferal_comm: "",
          refferal_fee_type: null,
          refferal_fee: "",
          upload_brochure: "",
          publish_date: "",
          header_body_text_id: "",
          remarks: "",
          media_id: "",
          user_input: "",
          user_edit: "",
          created_at: 0,
          updated_at: 0
        },
        detail: [],
        picture: [],
        youtube: [],
        _3d360v: [],
        TowerCluster: [],
        ReleasePeriod: [],
        nup: [],
        project_assign_principle: [],
      },
      headerDetail: [
        {
          key: "title",
          label: "Title",
          tdClass: "ContentACCList2 notranslate th-cus-left",
          thClass: "HeaderACCList2 S th-cus-center"
        },
        {
          key: "picture",
          label: "Picture",
          tdClass: "ContentACCList2 notranslate th-cus-left",
          thClass: "HeaderACCList2 S th-cus-center"
        },
      ],
      headerPicture: [
        {
          key: "thumbnail_image",
          label: "Picture",
          tdClass: "ContentACCList2 notranslate th-cus-left",
          thClass: "HeaderACCList2 S th-cus-center"
        },
      ],
      headerYoutube: [
        {
          key: "link",
          label: "Link",
          tdClass: "ContentACCList2 notranslate th-cus-left",
          thClass: "HeaderACCList2 S th-cus-center"
        },
      ],
      header3d360v: [
        {
          key: "link",
          label: "Link",
          tdClass: "ContentACCList2 notranslate th-cus-left",
          thClass: "HeaderACCList2 S th-cus-center"
        },
        {
          key: "thumbnail_image",
          label: "Picture",
          tdClass: "ContentACCList2 notranslate th-cus-left",
          thClass: "HeaderACCList2 S th-cus-center"
        },
      ],
      headerTowerCluster: [
        {
          key: "tower_cluster_name",
          label: "Tower Cluster Name",
          tdClass: "ContentACCList2 notranslate th-cus-left",
          thClass: "HeaderACCList2 S th-cus-center"
        },
      ],
      headerReleasePeriod: [
        {
          key: "event_name",
          label: "Event Name",
          tdClass: "ContentACCList2 notranslate th-cus-left",
          thClass: "HeaderACCList2 S th-cus-center"
        },
        {
          key: "start_datetime",
          label: "Start Datetime",
          tdClass: "ContentACCList2 notranslate th-cus-left",
          thClass: "HeaderACCList2 S th-cus-center"
        },
        {
          key: "end_datetime",
          label: "End Datetime",
          tdClass: "ContentACCList2 notranslate th-cus-left",
          thClass: "HeaderACCList2 S th-cus-center"
        },
      ],
      headerNup: [
        {
          key: "nup_event",
          label: "Nup Event",
          tdClass: "ContentACCList2 notranslate th-cus-left",
          thClass: "HeaderACCList2 S th-cus-center"
        },
        {
          key: "start_datetime",
          label: "Start Datetime",
          tdClass: "ContentACCList2 notranslate th-cus-left",
          thClass: "HeaderACCList2 S th-cus-center"
        },
        {
          key: "end_datetime",
          label: "End Datetime",
          tdClass: "ContentACCList2 notranslate th-cus-left",
          thClass: "HeaderACCList2 S th-cus-center"
        },
      ],
      headerAssignPrinciple: [
        {
          key: "principle_name",
          label: "Principle Name",
          tdClass: "ContentACCList2 notranslate th-cus-left",
          thClass: "HeaderACCList2 S th-cus-center"
        },
        {
          key: "broker_group_name",
          label: "Broker Group Name",
          tdClass: "ContentACCList2 notranslate th-cus-left",
          thClass: "HeaderACCList2 S th-cus-center"
        },
      ],
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
    doBack() {
      this.$router.go(-1);
    },
    M_ClearForm() {
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
      this.Model.project_master_id = this.paramFromList.id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/project-master-detail', this.Model).then((response) => {
        if (response == null) return;
        this.Model = response.data;
        this.Model.project_master_id = this.Model.id;
        this.Model.project_master_detail.publish_date = this.momentUnix(this.Model.publish_date, 'YYYY-MM-DD HH:mm');
      });
    },
    doEdit() {
      var param = this.Model.project_master_detail;
      param.isEdit = true;
      param.isView = true;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_ProjectForm" });
    },
    rowClickedDetail(record, index) {
      let param = this.paramFromList;
      param.isEdit = record == null ? false : true;
      param.DetailList = record;
      param.ForNew = this.Model.project_master_detail;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "SS_DashboardEventDetailForm" });
    },
    rowClickedPicture(record, index) {
      let param = this.paramFromList;
      param.isEdit = record == null ? false : true;
      param.DetailList = record;
      param.ForNew = this.Model.project_master_detail;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "SS_DashboardEventPictureForm" });
    },
    rowClickedYoutube(record, index) {
      let param = this.paramFromList;
      param.isEdit = record == null ? false : true;
      param.DetailList = record;
      param.ForNew = this.Model.project_master_detail;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "SS_DashboardEventYoutubeForm" });
    },
    rowClicked3d360v(record, index) {
      let param = this.paramFromList;
      param.isEdit = record == null ? false : true;
      param.DetailList = record;
      param.ForNew = this.Model.project_master_detail;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "SS_DashboardEvent3D360VForm" });
    },
    rowClickedTowerCluster(record, index) {
      let param = this.paramFromList;
      param.ForCluster = record == null ? {} : record;
      param.ForCluster.isEdit = record == null ? false : true;
      param.ForCluster.project_master_id = this.Model.project_master_detail.id;
      param.ForNew = this.Model.project_master_detail;
      this.$store.commit("setParamPage", param);
      if (record == null) {
        this.$router.push({ name: "OP_TowerClusterForm" });
      }
      else {
        this.$router.push({ name: "OP_TowerClusterView" });
      }
    },
    rowClickedReleasePeriod(record, index) {
      let param = this.paramFromList;
      param.ForReleasePeriod = record == null ? {} : record;
      param.ForReleasePeriod.isEdit = record == null ? false : true;
      param.ForReleasePeriod.project_master_id = this.Model.project_master_detail.id;
      param.ForNew = this.Model.project_master_detail;
      this.$store.commit("setParamPage", param);
      if (record == null) {
        this.$router.push({ name: "OP_ReleasePeriodForm" });
      }
      else {
        this.$router.push({ name: "OP_ReleasePeriodView" });
      }
    },
    rowClickedNup(record, index) {
      let param = this.paramFromList;
      param.ForNUP = record == null ? {} : record;
      param.ForNUP.isEdit = record == null ? false : true;
      param.ForNew = this.Model.project_master_detail;
      this.$store.commit("setParamPage", param);
      if (record == null) {
        this.$router.push({ name: "OP_NupForm" });
      }
      else {
        this.$router.push({ name: "OP_NupView" });
      }
    },
    rowClickedAssignPrinciple(record, index) {
      let param = this.paramFromList;
      param.ForAssignPrinciple = record == null ? {} : record;
      param.ForAssignPrinciple.isEdit = record == null ? false : true;
      param.ForAssignPrinciple.project_master_id = this.Model.project_master_detail.id;
      param.ForNew = this.Model.project_master_detail;
      this.$store.commit("setParamPage", param);
      if (record == null) {
        this.$router.push({ name: "OP_AssignPrincipleForm" });
      }
      else {
        this.$router.push({ name: "OP_AssignPrincipleView" });
      }
    },
    doViewAllDetail() {
      let param = this.paramFromList;
      param.isEdit = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "XXX" });
    },
    doViewAllPicture() {
      let param = this.paramFromList;
      param.isEdit = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "SS_DashboardEventPicture" });
    },
    doViewAllYoutube() {
      let param = this.paramFromList;
      param.isEdit = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "SS_DashboardEventYoutube" });
    },
    doViewAll3d360v() {
      let param = this.paramFromList;
      param.isEdit = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "SS_DashboardEvent3D360V" });
    },
    doViewAllTowerCluster() {
      let param = this.paramFromList;
      param.isEdit = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_TowerCluster" });
    },
    doViewAllReleasePeriod() {
      let param = this.paramFromList;
      param.isEdit = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_ReleasePeriod" });
    },
    doViewAllNup() {
      let param = this.paramFromList;
      param.isEdit = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_Nup" });
    },
    doViewAllAssignPrinciple() {
      let param = this.paramFromList;
      param.isEdit = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_AssignPrinciple" });
    },
  },
  mounted() {
    this.GetDataBy();
  },
};
</script>

