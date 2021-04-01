<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col lg="12" xl="12">
          <b-row>
              <b-col lg="12" xl="12">
                <div class="card">
                    <div class="card__body">
                        <b-row class="title-primary">
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
                                <b-col lg="2" xl="2">
                                    <ABSButton
                                    :text="'Save'"
                                    classButton="button button--hoonian"
                                    classIcon="icon-style-1"
                                    @click="doSave"
                                    styleButton="height: 40px;width: 80%;"
                                    />
                                </b-col>
                                <b-col style="max-width: max-content; padding-top: 8px;">
                                    <span style="font-weight: bold; font-size: 15px;">Refer To Other Project</span>
                                </b-col>
                                <b-col>
                                    <HOODropDown
                                        @change="Onrefer_toChange"
                                        :prop="PI_refer_to"
                                        v-model="Model.refer_to"
                                        :label="Model.refer_toLabel"
                                        ref="ref_refer_to"
                                    />
                                </b-col>
                                <b-col style="max-width: max-content; padding-top: 8px;">
                                    <span style="font-weight: bold; font-size: 15px;">Stop Follow Up</span>
                                </b-col>
                                <b-col>
                                    <HOODropDown
                                        @change="Onstop_followupChange"
                                        :prop="PI_stop_followup"
                                        v-model="Model.stop_followup"
                                        :label="Model.stop_followupLabel"
                                        ref="ref_stop_followup"
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

      <ABSModal id="Modal_Add" ref="Modal_Add" size="sm">
        <template slot="headerTitle">
          <span class="title-primary"> Add Sales Lead </span>
        </template>
        <template slot="content">
          <b-row>
            <b-col md="12">
              <b-form :data-vv-scope="'FormEntry'" :data-vv-value-path="'FormEntry'">
                <b-row>
                  <b-col md="12">
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label class="lbl-poppins">Handphone No</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_handphone_no"
                          v-model="Model.handphone_no"
                          ref="ref_handphone_no"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label class="lbl-poppins">Prospect Name</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_prospect_name"
                          v-model="Model.prospect_name"
                          ref="ref_prospect_name"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label class="lbl-poppins">Email</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_email"
                          v-model="Model.email"
                          ref="ref_email"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label class="lbl-poppins">Description</label>
                        </span>
                        <ACCTextArea
                          :prop="PI_description"
                          v-model="Model.description"
                          ref="ref_description"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label class="lbl-poppins">Name Card</label>
                        </span>
                        <b-img id="name_card_show" :src="urlHoonian + Model.name_card" alt="" height="150" @error="onImageLoadFailure($event)" />
                        <HOOImageUpload
                          :prop="PI_name_card"
                          @change="Onname_cardChange"
                          v-model="Model.name_card"
                        />
                      </b-col>
                    </b-row>
                    <b-row style="margin-top: 10px;">
                      <b-col md="6" offset-md="3">
                        <ABSButton
                          :text="'Save'"
                          classButton="btn btn--default"
                          classIcon="icon-style-1"
                          @click="doSave"
                          styleButton="height: 40px;width: 100%;"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-form>
            </b-col>
          </b-row>
        </template>
      </ABSModal>
    </div>
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

      PI_description: {
        cValidate: "max:5000",
        cName: "Description",
        cOrder: 1,
        cKey: false,
        cProtect: false,
        cResize: false,
        cReadonly: false,
        cRows: 6,
        cMaxRows: 6,
        cSize: "md",
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus
      },
      PI_refer_to: {
        dataLookUp: {
          url: "/api/hoonian-website/project-lookup",
          param: {}
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
        refer_to: this.Model.refer_to,
        stop_followup: this.Model.stop_followup == "Y"
      }
      this.postJSON(this.urlHoonian + '/api/marketing-website/lead/logbook/add', param).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
  },
  mounted() {
    this.propList.initialWhere = this.paramFromList.project_id;
    this.propList.param.sales_lead_id = this.paramFromList.sales_lead_id;
    this.$refs.ref_logbook.doGetList("");
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
