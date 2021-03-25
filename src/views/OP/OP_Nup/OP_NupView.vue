<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>View NUP</span>
                </b-col>
                <b-col style="text-align: right;">
                  <ABSButton
                    :text="'Skip No'"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    @click="doAddSkipNo"
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
                          <label class="lbl-view">NUP Event</label>
                        </span>
                        <br>
                        <span>{{Model.nup_event}}</span>
                      </b-col>
                      <b-col style="text-align: right;" v-show="inputStatus=='edit'">
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
                          <label class="lbl-view">Start DateTime</label>
                        </span>
                        <br>
                        <span>{{Model.start_date}}</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6" class="row-view">
                        <span>
                          <label class="lbl-view">End DateTime</label>
                        </span>
                        <br>
                        <span>{{Model.end_date}}</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6" class="row-view">
                        <span>
                          <label class="lbl-view">Value</label>
                        </span>
                        <br>
                        <span>{{isCurrency(Model.value, decimal)}}</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6" class="row-view">
                        <span>
                          <label class="lbl-view">Refund Date</label>
                        </span>
                        <br>
                        <span>{{Model.refund_date}}</span>
                      </b-col>
                    </b-row>

                    <div class="card">
                      <div class="card__title">
                        <b-row>
                          <b-col style="max-width: max-content !important;">
                            <span>Skip No</span>
                          </b-col>
                          <b-col style="text-align: right;">
                            <span>
                              <ABSButton
                                :text="'View All'"
                                classButton="button button--new"
                                classIcon="icon-style-1"
                                :disabled="false"
                                @click="doViewAllSkipNo"
                              />
                            </span>
                          </b-col>
                        </b-row>
                      </div>
                      <div class="card__body">
                        <ACCFormList
                        :prop="SkipNoList_propList"
                          @rowClicked="doAddSkipNo"
                          cClass="table-style-3_noAct"
                          :cHeader="SkipNoListHeader"
                          cStatic
                          :cData="Model.skip_no"
                          ref="ref_SkipNoList"
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
      SkipNoList_propList: {},
      SkipNoListHeader: [
        {
            key: "skip_sequence_no",
            label: "Sequence No.",
            tdClass: "ContentACCList2 notranslate",
            thClass: "HeaderACCList2 L th-cus-center"
        }
      ],

      Model: {
        nup_id : "",
        project_id: "",
        nup_event: "",
        start_datetime: "",
        end_datetime: "",
        value: "",
        refund_date: "",
        skip_no: []
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
      if (param.ForNUP.isEdit && param.ForNUP.isEdit === true) {
        return "edit";
      } else {
        return "new";
      }
    },
  },
  methods: {
    doAddSkipNo(record = null) {
      var param = this.paramFromList;
      param.ForSkipNo = record == null ? {} : record;
      param.ForSkipNo.nup_id = this.Model.nup_id;
      param.ForSkipNo.isEdit = record == null ? false : true;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_SkipNoForm" });
    },
    doViewAllSkipNo() {
        var param = this.paramFromList;
        param.ForSkipNo.nup_id = this.Model.nup_id;
        this.$store.commit("setParamPage", param);
        this.$router.push({ name: "OP_SkipNo" });
    },
    doEdit() {
      var param = this.paramFromList;
      param.ForNUP.isEdit = true;
      param.ForNUP.isView = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_NupForm" });
    },
    doBack() {
      this.$router.go(-1);
    },
    GetDataBy() {
      this.Model.project_id = this.paramFromList.id;
      this.Model.nup_id = this.paramFromList.ForNUP.id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/view-nup-detail', this.Model).then((response) => {
        if (response == null) return;
        let data = response.data.project_master_detail;
        this.Model = data;
        this.Model.nup_id = data.id;
        this.Model.start_date = this.momentUnix(data.start_datetime, 'YYYY-MM-DD HH:mm');
        this.Model.end_date = this.momentUnix(data.end_datetime, 'YYYY-MM-DD HH:mm');
        this.Model.refund_date = data.refund_date && data.refund_date !== '' ? this.momentUnix(data.refund_date, 'YYYY-MM-DD') : "";
        this.Model.skip_no = response.data.skip_no;
      });
    },
  },
  mounted() {
    this.GetDataBy();
  },
};
</script>

