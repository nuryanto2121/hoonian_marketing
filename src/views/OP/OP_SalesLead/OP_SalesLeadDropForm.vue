<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important">
            <div class="card__title">
              <b-row class="title-primary">
                <b-col style="max-width: max-content !important">
                  <span>Drop Lead Confirmation</span>
                </b-col>
                <!-- <b-col class="col-right">
                    <span>
                        <b-form-input
                        id="txtSearch"
                        v-model="search"
                        type="text"
                        placeholder="Search...."
                        v-shortkey.focus="['f1']"
                        class="text-field-search font-poppins"
                        @keyup.enter.native="onSearchEnter"
                        autocomplete="off"
                        style="margin-bottom: 0px;"
                        ></b-form-input>
                        <span
                        style="position: absolute; right: 12px; cursor: pointer"
                        @click="removeSearch"
                        >&times;</span
                        >
                    </span>
                </b-col> -->
                <b-col class="col-right">
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
                  <b-col md="2" style="text-align: center;">
                    <div>
                      <font-awesome-icon class="icon-style-hoonian" icon="clipboard" size="8x" />
                    </div>
                  </b-col>
                  <b-col md="10">
                    <!-- <b-row>
                      <b-col md="12" class="col-right" v-show="inputStatus == 'edit'">
                        <div class="wrapper-last-edit">
                            <span>
                                {{momentUnix(Model.updated_at, "DD MMM YYYY")}}
                            </span>
                            <span>
                                &nbsp; &nbsp; &nbsp;
                            </span>
                            <span>
                                <b>{{Model.last_edit}}</b>
                            </span>
                        </div>
                        <ABSButton
                            text="Cancel"
                            classButton="button button--new mgn"
                            styleButton="background-color: rgb(74, 147, 179); color: white;"
                            @click="onCancel"
                        />
                      </b-col>
                    </b-row> -->
                    <b-row>
                        <b-col md="6">
                            <span>
                                <label class="lbl-bold poppins">Project Name</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_project_name"
                                v-model="Model.project_name"
                                ref="ref_project_name"
                            />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="6">
                            <span>
                                <label class="lbl-bold poppins">Prospect Name</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_prospect_name"
                                v-model="Model.prospect_name"
                                ref="ref_prospect_name"
                            />
                        </b-col>
                        <b-col md="6">
                            <span>
                                <label class="lbl-bold poppins">Marketing Name</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_marketing_name"
                                v-model="Model.marketing_name"
                                ref="ref_marketing_name"
                            />
                        </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label class="lbl-bold poppins"> Drop Reason </label>
                        </span>
                        <ACCTextArea
                            :prop="PI_drop_reason"
                            v-model="Model.drop_reason"
                            ref="ref_drop_reason"
                        />
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col md="12">
                            <HOOList
                                :prop="LogbookpropList"
                                :title="'Logbook'"
                                cClass="table-style-3_noAct"
                                ButtonBackDisabled
                                SearchDisabled
                                isPoppins
                                isHeaderFixed
                                noCard
                                ref="ref_logbook"
                                @onRenderData="LogbookDataRender"
                            >
                              <template slot="date" slot-scope="data">
                                {{momentUnix(data.item.date, "DD MMM YYYY")}}
                              </template>
                            </HOOList>
                      </b-col>
                    </b-row>
                    
                    <b-row>
                        <b-col md="6">
                            <span>
                                <label class="lbl-bold poppins"> Status </label>
                            </span>
                            <HOODropDown
                                @change="OnstatusChange"
                                :prop="PI_status"
                                v-model="Model.status"
                                :label="Model.statusLabel"
                                ref="ref_status"
                            />
                        </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label class="lbl-bold poppins"> Remarks </label>
                        </span>
                        <ACCTextArea
                            :prop="PI_remarks"
                            v-model="Model.remarks"
                            ref="ref_remarks"
                        />
                      </b-col>
                    </b-row>

                    <b-row style="margin-top: 10px">
                      <b-col md="6" offset-md="3">
                        <ABSButton
                          :text="'Confirmation'"
                          classButton="btn btn--default"
                          classIcon="icon-style-default"
                          @click="doSave"
                          styleButton="height: 40px;width: 100%;"
                        />
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
      search: "",

      Model: {
        id: "",
        project_id: "",
        project_name: "",
        source_id: "",
        sales_lead_id: "",
        marketing_agent_id: "",
        prospect_name: "",
        marketing_name: "",
        drop_reason: "",
        status: "",
        statusLabel: "",
        remarks: "",
      },
      LogbookHeader: [
        {
          key: "no",
          label: "No",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "tower",
          label: "Tower",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "unit_type",
          label: "Unit Type",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "unit_no",
          label: "Unit No",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "selling_price",
          label: "Selling Price",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "is_booked",
          label: "Booked",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
          isCustom: true,
        },
        {
          key: "is_sold",
          label: "Sold",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
          isCustom: true,
        },
      ],
      LogbookItems: [],
      LogbookpropList: {
        url: "/api/hoonian-website/dashboard/operation-detail/sales-lead/logbook",
        initialWhere: "",
        SortField: "",
        SortBy: "desc",
        ParamWhere: "",
        param: {
            project_id: "",
            sales_lead_id: ""
        }
      },

      PI_project_name: {
        cValidate: "",
        cName: "project_name",
        cOrder: 9,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_prospect_name: {
        cValidate: "",
        cName: "prospect_name",
        cOrder: 9,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_marketing_name: {
        cValidate: "",
        cName: "marketing_name",
        cOrder: 9,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_drop_reason: {
        cValidate: "",
        cName: "drop_reason",
        cOrder: 9,
        cKey: false,
        cProtect: true,
        cResize: false,
        cReadonly: false,
        cRows: 1,
        cMaxRows: 3,
        cSize: "md",
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus
      },
      PI_status: {
        dataLookUp: {},
        cValidate: "required",
        cName: "Status",
        ckey: false,
        cOrder: 1,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: true,
        cOption: [
            {id: "archive", label: "Archive"},
            {id: "reassign", label: "Reassign"}
        ],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_remarks: {
        cValidate: "max:5000",
        cName: "remarks",
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
    LogbookDataRender(data) {
        this.LogbookItems = data;
    },
    OnstatusChange(data) {
      this.$nextTick(() => {
        this.Model.status = data.id;
        this.Model.statusLabel = data.label;
      });
    },
    doBack() {
      this.$router.go(-1);
    },
    M_ClearForm() {
      this.Model = {
        id: "",
        project_id: "",
        project_name: "",
        source_id: "",
        sales_lead_id: "",
        marketing_agent_id: "",
        prospect_name: "",
        marketing_name: "",
        drop_reason: "",
        status: "",
        statusLabel: "",
        remarks: ""
      };
    },
    doSave() {
      this.$validator._base.validateAll("FormEntry").then((result) => {
        if (!result) return;
        this.alertConfirmation("Are You Sure Want To Save This Data ?").then(
          (ress) => {
            if (ress.value) {
              this.$validator.errors.clear("FormEntry");
                this.M_Update();
            }
          }
        );
      });
    },
    M_Update() {
        let param = {
            ...this.Model,
            id: this.paramFromList.id
        }
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/sales-lead/drop-action",
        param
      ).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
    GetDataBy() {
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/sales-lead/drop-detail",
        {id: this.paramFromList.id}
      ).then((response) => {
        if (response == null) return;
        this.Model = response.data;
        this.Model.status = "";
        this.Model.statusLabel = "";
        this.Model.remarks = "";
        this.renderList();
      });
    },
    renderList() {
        this.LogbookpropList.param.project_id = this.Model.project_id;
        this.LogbookpropList.param.sales_lead_id = this.Model.sales_lead_id;
        this.$refs.ref_logbook.doGetList("");
    }
  },
  mounted() {
    this.M_ClearForm();
    this.GetDataBy();
  },
};
</script>

