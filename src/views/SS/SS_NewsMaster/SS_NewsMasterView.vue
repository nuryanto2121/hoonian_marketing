<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>View News Master</span>
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
                      <b-col md="6" class="row-view">
                        <span>
                          <label class="lbl-view">Title</label>
                        </span>
                        <br>
                        <span>{{Model.title}}</span>
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
                    <b-row>
                      <b-col md="6" class="row-view">
                        <span>
                          <label class="lbl-view">Active</label>
                        </span>
                        <br>
                        <span>{{Model.is_active}}</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6" class="row-view">
                        <span>
                          <label class="lbl-view">Start View Date</label>
                        </span>
                        <br>
                        <span>{{Model.start_view_at}}</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6" class="row-view">
                        <span>
                          <label class="lbl-view">End View Date</label>
                        </span>
                        <br>
                        <span>{{Model.end_view_at}}</span>
                      </b-col>
                    </b-row>
                    <b-row style="margin-top: 10px;">
                      <b-col>
                        <ACCFormList
                          :prop="NewsDetailList_propList"
                          @rowClicked="NewsDetailListClicked"
                          :cHeader="NewsDetailListHeader"
                          cStatic
                          :cData="Model.details"
                          @onRenderData="onRenderData_NewsDetailList"
                          ref="ref_NewsDetailList"
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
                        </ACCFormList>
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

      NewsDetailList_propList: {
        url: '/api/hoonian-website/principle-master-list',
        initialWhere: '',
        SortField: '',
        SortBy: '',
        ParamWhere: '',
      },
      
      NewsDetailListHeader: [
        {
          key: "title",
          label: "Title",
          tdClass: "ContentACCList2 notranslate",
          thClass: "HeaderACCList2 L th-cus-center"
        },
        {
          key: "picture",
          label: "Picture",
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 L th-cus-center"
        }
      ],

      Model: {
        news_id: "",
        project_id: "",
        title: "",
        description: "",
        start_view_at: "",
        end_view_at: "",
        header_body_text_id: "",
        is_active: true,
        details: []
      },
      PI_title: {
        cValidate: "required|max:100",
        cName: "Title",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_description: {
        cValidate: "max:5000",
        cName: "Description",
        cOrder: 2,
        cKey: false,
        cProtect: false,
        cResize: false,
        cReadonly: false,
        cRows: 1,
        cMaxRows: 3,
        cSize: "md",
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus
      },
      PI_active: {
        cValidate: "required",
        cName: "Active",
        cId: "rdactive",
        cRadioOptions: [
          { text: "Yes", value: true },
          { text: "No", value: false },
        ],
        cRadioDefaultOption: "Y",
        cOrder: 3,
        cProtect: false,
        cVisible:  true,
        cParentForm: 'FormEntry',
        cInputStatus: this.inputStatus,
        cGroup: false
      },
      PI_start_date: {
        cValidate: "required",
        cName: "Start View At",
        cOrder: 4,
        cKey: false,
        cProtect: false,
        cWithTime: true,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry"
      },
      PI_end_date: {
        cValidate: "required",
        cName: "End View At",
        cOrder: 5,
        cKey: false,
        cProtect: false,
        cWithTime: true,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry"
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
    OnStartDateChange(data) {},
    OnEndDateChange(data) {},
    NewsDetailListClicked(record, index) {
    //   var param = this.paramFromList;
    //   param.NewsDetail = record;
    //   param.NewsDetail.isEdit = true;
    //   param.NewsDetail.isView = true;
    //   this.$store.commit("setParamPage", param);
    //   this.$router.push({ name: "SS_MasterPricinpleForm" });
    },
    doBack() {
      this.$router.go(-1);
    },
    doEdit() {
      var param = this.paramFromList;
      param.isEdit = true;
      param.isView = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "SS_NewsMasterForm" });
    },
    GetDataBy() {
      this.Model.news_id = this.paramFromList.id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/news-master-detail', this.Model).then((response) => {
        if (response == null) return;
        let data = response.data.news_detail;
        this.Model = data;
        this.Model.news_id = data.id;
        this.Model.start_view_at = this.momentUnix(data.start_view_at, 'YYYY-MM-DD HH:mm');
        this.Model.end_view_at = this.momentUnix(data.end_view_at, 'YYYY-MM-DD HH:mm');
        this.Model.details = [];
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

