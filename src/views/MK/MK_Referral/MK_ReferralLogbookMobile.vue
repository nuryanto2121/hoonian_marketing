<template>
  <div>
    <b-row class="dashboardBody">
      <b-col lg="12" xl="12">
        <b-row>
            <b-col lg="12" xl="12">
              <div class="card">
                  <div class="card__body">
                      <b-row class="title-primary row-view">
                          <b-col>
                              <span style="font-weight: bold; font-size: 18px;">Log Book</span>
                          </b-col>
                      </b-row>
                      <b-form :data-vv-scope="'FormEntry'" :data-vv-value-path="'FormEntry'">
                          <b-row>
                              <b-col md="12">
                                  <!-- <span>
                                      <label class="lbl-poppins">Description</label>
                                  </span> -->
                                  <ACCTextArea
                                      :prop="PI_description"
                                      v-model="Model.description"
                                      ref="ref_description"
                                  />
                              </b-col>
                          </b-row>
                          <b-row>
                              <b-col style="max-width: max-content; padding-top: 8px;">
                                  <span style="font-weight: bold; font-size: 15px;">{{momentDateFormatting(new Date(), "dddd, DD MMM YYYY")}}</span>
                              </b-col>
                              <b-col cols="12" class="referral-btnSave">
                                  <ABSButton
                                  :text="'Save'"
                                  classButton="button button--hoonian"
                                  classIcon="icon-style-1"
                                  @click="doSave"
                                  styleButton="height: 40px;width: 100%;"
                                  />
                              </b-col>
                          </b-row>
                      </b-form>
                      <b-row>
                          <b-col lg="12" xl="12" class="noPadding">
                              <HOOList
                                  :prop="propList"
                                  :title="''"
                                  @rowClicked="rowClicked"
                                  @buttonDeleteClicked="doDeleteClick"
                                  @rowDblClicked="doDoubleClick"
                                  @rowLinkClick="rowLink"
                                  @pageSize="M_PageSize"
                                  @pagination="M_Pagination"
                                  @filter="M_Advance_Filter"
                                  @headTable="M_Head_Table"
                                  @refreshColumn="refreshColumn"
                                  :ref="'ref_logbook'"
                                  @buttonViewClicked="doViewClick"
                                  ButtonBackDisabled
                                  SearchDisabled
                                  isPoppins
                                  isHeaderFixed
                                  noCard
                                  removeCardTitle
                                  removePaddingTopBody
                                  noPaging
                                  :cHeader="Headers"
                                  >
                                  <template slot="date" slot-scope="data">
                                      {{momentUnix(data.item.date, "DD MMM YYYY")}}
                                  </template>
                              </HOOList>
                          </b-col>
                      </b-row>
                  </div>
              </div>
            </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  props: ['title'],
  computed: {
    paramFromList() {
      var param = this.$store.getters.getParamPage;
      return param;
    },
  },
  watch: {
  },
  data() {
    return {
      propList: {
        url: "/api/marketing-website/lead/logbook/list",
        initialWhere: "",
        SortField: "",
        SortBy: "desc",
        ParamWhere: "",
        param: {
          sales_lead_id: ""
        }
      },
      Model: {
        description: "",
        refer_to: "",
        refer_toLabel: "",
        stop_followup: "N",
        stop_followupLabel: "No",
      },

      ModelProject: [],
      selectedProject: 0,

      Headers: [
        {
          key: "no",
          label: "NO",
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
          key: "date",
          label: this.$t('date').toUpperCase(),
          thClass: "HeaderACCList2Poppins S th-cus-left",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "responder",
          label: this.$t('responder').toUpperCase(),
          thClass: "HeaderACCList2Poppins M th-cus-left",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "notes",
          label: this.$t('notes').toUpperCase(),
          thClass: "HeaderACCList2Poppins M th-cus-left",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
      ],

      PI_description: {
        cValidate: "max:60",
        cName: "Description",
        cOrder: 1,
        cKey: false,
        cProtect: false,
        cResize: false,
        cReadonly: false,
        cRows: 3,
        cMaxRows: 3,
        cSize: "md",
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus
      },
      PI_refer_to: {
        dataLookUp: {
          url: "/api/hoonian-website/marketing-lead-refer-project-lookup",
          param: {
            company_group_id: '',
            sales_lead_id: ''
          }
        },
        cValidate: "required",
        cName: "Refer To",
        ckey: false,
        cOrder: 2,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_stop_followup: {
        dataLookUp: {},
        cValidate: "required",
        cName: "stop_followup",
        ckey: false,
        cOrder: 3,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: true,
        cOption: [
            {id: "Y", label: "Yes"},
            {id: "N", label: "No"}
        ],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
    };
  },
  methods: {
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    rowClicked(ev, id) {
      console.log(ev, id)
    },
    doDeleteClick(ev, id) {
      console.log(ev, id)
    },
    doDoubleClick(ev, id) {
      console.log(ev, id)
    },
    rowLink(ev, id) {
      console.log(ev, id)
    },
    M_PageSize(ev, id) {
      console.log(ev, id)
    },
    M_Pagination(ev, id) {
      console.log(ev, id)
    },
    M_Advance_Filter(ev, id) {
      console.log(ev, id)
    },
    M_Head_Table(ev, id) {
      console.log(ev, id)
    },
    refreshColumn(ev, id) {
      console.log(ev, id)
    },
    doBack() {
      this.$router.go(-1);
    },
    Onstop_followupChange(data) {
      this.$nextTick(() => {
        this.Model.stop_followup = data.id;
        this.Model.stop_followupLabel = data.label;
      })
    },
    Onrefer_toChange(data) {
      this.$nextTick(() => {
        this.Model.refer_to = data.id;
        this.Model.refer_toLabel = data.label;
      })
    },
    M_ClearForm() {
      this.Model = {
        description: "",
        refer_to: "",
        refer_toLabel: "",
        stop_followup: "N",
        stop_followupLabel: "No",
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
      let param = {
        project_id: this.paramFromList.project_id,
        sales_lead_id: this.paramFromList.sales_lead_id,
        marketing_agent_id: this.getDataUser().marketing_id,
        marketing_agent_name: this.getDataUser().user_name,
        description: this.Model.description,
        refer_to: "",
        stop_followup: false
      }
      this.postJSON(this.urlHoonian + '/api/marketing-website/lead/logbook/add', param).then((response) => {
        if (response == null) return;
        // this.doBack();
        this.propList.initialWhere = this.paramFromList.project_id;
        this.propList.param.sales_lead_id = this.paramFromList.sales_lead_id;
        this.$refs.ref_logbook.doGetList("");

        this.PI_refer_to.dataLookUp.param = {
          company_group_id: this.company_group_id,
          sales_lead_id: this.paramFromList.sales_lead_id
        };
      });
    },
  },
  mounted() {
    this.propList.initialWhere = this.paramFromList.project_id;
    this.propList.param.sales_lead_id = this.paramFromList.sales_lead_id;
    this.$refs.ref_logbook.doGetList("");

    this.PI_refer_to.dataLookUp.param = {
      company_group_id: this.company_group_id,
      sales_lead_id: this.paramFromList.sales_lead_id
    };
  },
};
</script>

<style scoped>
@media (min-width: 992px) {
  .offset-header {
    margin-left: 4%;
  }
}
@media (min-width: 1200px) {
  .offset-header {
    margin-left: 20%;
  }
}
.activate {
  box-shadow: 0px 5px 5px 2px #ccc;
}
</style>
