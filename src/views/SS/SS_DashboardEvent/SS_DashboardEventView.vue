<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>View Dashboard Event</span>
                </b-col>
                <b-col style="text-align: right;">
                  <ABSButton
                    :text="'Event'"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    @click="rowClickedEvent"
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
                      <img :src="urlHoonian + Model.dashboard_event_detail.main_picture" alt style="width: 70px;" />
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
                              <label class="lbl-view" style="margin-bottom: 0px !important;">Event Name</label>
                            </span>
                            <br />
                            <span>{{ Model.dashboard_event_detail.event_name }}</span>
                          </b-col>
                          <b-col
                            style="max-width: max-content !important; margin-right: 20px; padding-bottom: 5px"
                            class="row-view"
                          >
                            <span>
                              <label class="lbl-view" style="margin-bottom: 0px !important;">Start - End Date Time</label>
                            </span>
                            <br />
                            <span>{{momentUnix(Model.dashboard_event_detail.start_datetime, "DD MMM YYYY HH:mm")
                                  + ' - ' +
                                  momentUnix(Model.dashboard_event_detail.end_datetime, "DD MMM YYYY HH:mm")}}
                            </span>
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
                        {{Model.dashboard_event_detail.user_edit}} <br>
                        {{momentUnix(Model.dashboard_event_detail.updated_at, "DD MMM YYYY")}}
                      </b-col>
                    </b-row>
                    <hr />
                    <div class="card">
                      <div class="card__title">
                        <b-row>
                          <b-col style="max-width: max-content !important;">
                            <span>Event</span>
                          </b-col>
                          <b-col style="text-align: right;">
                            <span>
                              <ABSButton
                                :text="'View All'"
                                classButton="button button--new"
                                classIcon="icon-style-1"
                                :disabled="false"
                                @click="doViewAllEvent"
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
                          :cHeader="headerEvent"
                          :cData="Model.dashboard_event_view_detail"
                          @rowClicked="rowClickedEvent"
                          ref="ref_event"
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
                          cClass="table-style-3_noAct"
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
                          cClass="table-style-3_noAct"
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
                          cClass="table-style-3_noAct"
                          :cHeader="header3d360v"
                          :cData="Model._3d360v"
                          @rowClicked="rowClicked3d360v"
                          ref="ref_3d360v"
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
      Model: {
        dashboard_event_detail: {
          dashboard_event_id: "",
          event_name: "",
          start_datetime: "",
          end_datetime: "",
          main_picture: "", 
          header_body_text_id: "",
          media_id: ""
        },
        dashboard_event_view_detail: [],
        picture: [],
        youtube: [],
        _3d360v: [],
      },
      headerEvent: [
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
      this.Model.dashboard_event_id = this.paramFromList.id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard-event-detail', this.Model).then((response) => {
        if (response == null) return;
        this.Model = response.data;
      });
    },
    doEdit() {
      var param = this.Model.dashboard_event_detail;
      param.isEdit = true;
      param.isView = true;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "SS_DashboardEventForm" });
    },
    rowClickedEvent(record, index) {
      let param = this.paramFromList;
      param.isEdit = record == null ? false : true;
      param.DetailList = record;
      param.ForNew = this.Model.dashboard_event_detail;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "SS_DashboardEventDetailForm" });
    },
    rowClickedPicture(record, index) {
      let param = this.paramFromList;
      param.isEdit = record == null ? false : true;
      param.DetailList = record;
      param.ForNew = this.Model.dashboard_event_detail;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "SS_DashboardEventPictureForm" });
    },
    rowClickedYoutube(record, index) {
      let param = this.paramFromList;
      param.isEdit = record == null ? false : true;
      param.DetailList = record;
      param.ForNew = this.Model.dashboard_event_detail;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "SS_DashboardEventYoutubeForm" });
    },
    rowClicked3d360v(record, index) {
      let param = this.paramFromList;
      param.isEdit = record == null ? false : true;
      param.DetailList = record;
      param.ForNew = this.Model.dashboard_event_detail;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "SS_DashboardEvent3D360VForm" });
    },
    doViewAllEvent() {
      let param = this.paramFromList;
      param.isEdit = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "SS_DashboardEventDetail" });
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
  },
  mounted() {
    this.GetDataBy();
  },
};
</script>

