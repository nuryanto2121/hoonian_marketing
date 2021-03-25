<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body" style="font-family: Poppins !important;">
      <div class="">
        <div class="card" style="font-size: 12px !important;">
          <div class="card__body">
            <b-row>
              <b-col style="color: #4A93B3; font-size: 16px;">
                Principle {{title == 'Add' ? '': ' Details'}}
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
        </div>
      </div>
      <div class="card">
        <div class="card__body">
          <b-form :data-vv-scope="'FormEntry'" :data-vv-value-path="'FormEntry'">
            <b-row style="margin-top: 10px;">
              <b-col lg="2">
                <b-img :src="require(inputStatus == 'edit'? '@/assets/icon-svg/edit.svg': '@/assets/icon-svg/add.svg')" alt="" />
              </b-col>
              <b-col lg="10">
                <b-row v-if="inputStatus == 'edit'">
                  <b-col style="text-align: right; padding-right: unset !important;">
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
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="5">
                    <label class="lbl-bold">Principle Name</label>
                    <HOODropDown
                      @change="OnPrincipleNameChange"
                      :prop="PI_principle_name"
                      v-model="Model.principle_id"
                      :label="Model.principle_name"
                      ref="ref_principle_name"
                    />
                  </b-col>
                </b-row>
                
                <b-row>
                  <b-col lg="8" style="padding-left: unset !important; padding-right: unset !important;">
                    <label class="lbl-bold" style="margin-left: 5px; margin-top: 5px;">Commission</label>
                    <b-row style="margin-right: 10px !important;">
                      <b-col lg="12" class="border-gray">
                        <b-row>
                          <b-col lg="4">
                            <label class="lbl-bold">Broker Group (%)</label>
                            <ACCTextBox
                              :prop="PI_broker_group"
                              v-model="Model.broker_group_commission"
                              ref="ref_broker_group"
                            />
                          </b-col>
                          <b-col offset="1">
                            <label class="lbl-bold">Principle (%)</label>
                            <ACCTextBox
                              :prop="PI_principle"
                              v-model="Model.principle_comission"
                              ref="ref_principle"
                            />
                          </b-col>
                          <b-col>
                            <label class="lbl-bold">Marketing Agent (%)</label>
                            <ACCTextBox
                              :prop="PI_marketing_agent"
                              v-model="Model.marketing_agent_comission"
                              ref="ref_marketing_agent"
                            />
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                    <b-row style="margin-right: 10px !important; margin-top: 10px;">
                      <b-col lg="12" class="border-gray">
                        <b-row>
                          <b-col lg="3">
                            &nbsp;
                          </b-col>
                          <b-col offset="2">
                            <label class="lbl-bold">Principle</label>
                          </b-col>
                          <b-col>
                            <label class="lbl-bold">Marketing Agent</label>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col lg="5" align-self="center">
                            <label class="lbl-bold">Booking Cancellation Limit</label>
                          </b-col>
                          <b-col>
                            <ACCTextBox
                              :prop="PI_booking_principle"
                              v-model="Model.principle_cancel_limit"
                              ref="ref_booking_principle"
                            />
                          </b-col>
                          <b-col>
                            <ACCTextBox
                              :prop="PI_booking_marketing_agent"
                              v-model="Model.marketing_agent_cancel_limit"
                              ref="ref_booking_marketing_agent"
                            />
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col lg="5" align-self="center">
                            <label class="lbl-bold">Cumulative Days</label>
                          </b-col>
                          <b-col>
                            <ACCTextBox
                              :prop="PI_cumulative_days"
                              v-model="Model.cancellation_cumulative_days"
                              ref="ref_cumulative_days"
                            />
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col lg="5" align-self="center">
                            <label class="lbl-bold">Hold Unit Limit</label>
                          </b-col>
                          <b-col>
                            <ACCTextBox
                              :prop="PI_hold_principle"
                              v-model="Model.maximum_principle_hold_unit"
                              ref="ref_hold_principle"
                            />
                          </b-col>
                          <b-col>
                            <ACCTextBox
                              :prop="PI_hold_marketing_agent"
                              v-model="Model.maximum_marketing_agent_hold_unit"
                              ref="ref_hold_marketing_agent"
                            />
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>

                    <b-row style="margin-top: 5px;">
                      <b-col lg="12">
                        <label class="lbl-bold">Description</label>
                        <ACCTextArea
                          :prop="PI_description"
                          v-model="Model.description"
                          ref="ref_description"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col lg="4">
                    <label class="lbl-bold" style="margin-left: 5px; margin-top: 5px;">&nbsp;</label>
                    <b-row>
                      <b-col class="border-gray poppins">
                        <b-row>
                          <b-col lg="4">
                            <label class="lbl-bold">Info</label>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col lg="8">
                            <label class="lbl-bold" style="color: rgba(51, 51, 153, 0.7);">Total Agent</label>
                          </b-col>
                          <b-col lg="4">
                            {{Model.total_agent}}
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col lg="8">
                            <label class="lbl-bold" style="color: rgba(51, 51, 153, 0.7);">Total NUP</label>
                          </b-col>
                          <b-col lg="4">
                            {{Model.total_nup}}
                          </b-col>
                        </b-row>

                        <b-row style="margin-top: 20px;">
                          <b-col lg="4">
                            <label class="lbl-bold">Sales</label>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col lg="9">
                            <label class="lbl-bold" style="color: rgba(51, 51, 153, 0.7);">Total Commission</label>
                          </b-col>
                          <b-col lg="3">
                            {{checkNum((Model.total_commission && Model.total_commission !== '' ? Model.total_commission : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), (Model.total_commission && Model.total_commission !== '' ? Model.total_commission : 0))}} 
                            {{checkDigit((Model.total_commission && Model.total_commission !== '' ? Model.total_commission : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), true)}}
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col lg="9">
                            <label class="lbl-bold" style="color: rgba(51, 51, 153, 0.7);">Paid Commission</label>
                          </b-col>
                          <b-col lg="3">
                            {{checkNum((Model.paid_commission && Model.paid_commission !== '' ? Model.paid_commission : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), (Model.paid_commission && Model.paid_commission !== '' ? Model.paid_commission : 0))}} 
                            {{checkDigit((Model.paid_commission && Model.paid_commission !== '' ? Model.paid_commission : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), true)}}
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col lg="9">
                            <label class="lbl-bold" style="color: rgba(51, 51, 153, 0.7);">Outstanding Commission</label>
                          </b-col>
                          <b-col lg="3">
                            {{checkNum((Model.outstd_commission && Model.outstd_commission !== '' ? Model.outstd_commission : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), (Model.outstd_commission && Model.outstd_commission !== '' ? Model.outstd_commission : 0))}} 
                            {{checkDigit((Model.outstd_commission && Model.outstd_commission !== '' ? Model.outstd_commission : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), true)}}
                          </b-col>
                        </b-row>

                        <b-row style="margin-top: 20px;">
                          <b-col lg="4">
                            <label class="lbl-bold">Units</label>
                          </b-col>
                        </b-row>
                        <b-row style="color: rgba(2, 138, 32, 0.7);">
                          <b-col lg="8">
                            <label class="lbl-bold">Total Assigned Units</label>
                          </b-col>
                          <b-col lg="4">
                            {{Model.total_assigned_units}}
                          </b-col>
                        </b-row>
                        <b-row style="color: #FFC700">
                          <b-col lg="8">
                            <label class="lbl-bold">Total Booked Units</label>
                          </b-col>
                          <b-col lg="4">
                            {{Model.total_booked_units}}
                          </b-col>
                        </b-row>
                        <b-row style="color: #FF0045;">
                          <b-col lg="8">
                            <label class="lbl-bold">Total Sold Units</label>
                          </b-col>
                          <b-col lg="4">
                            {{Model.total_sold_units}}
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col lg="12" style="padding-left: unset !important; padding-right: unset !important;">
                    <label class="lbl-bold" style="margin-bottom: unset !important; margin-left: 5px;">Assign Units</label>
                    <HOOList
                      :prop="AssignUnitPropList"
                      :title="''"
                      cClass="table-style-3_noAct"
                      ButtonBackDisabled
                      SearchDisabled
                      noCard
                      isPoppins
                      isHeaderFixed
                      :cHeader="assignUnitHeader"
                      ref="ref_list"
                      @rowClicked="rowClicked"
                      removeCardTitle
                      removePaddingTopBody
                      @onRenderData="eventDataRender"
                    >
                      <template slot="selected" slot-scope="data">
                        <div style="margin-left: 20px">
                          <b-form-checkbox
                            v-model="data.item.selected"
                            :name="'selected_' + data.item.id"
                            size="md"
                            @input="onChangeSelected(data.item)"
                          />
                        </div>
                      </template>
                      <template slot="selling_price" slot-scope="data">
                        {{isCurrency(data.item.selling_price, decimal)}}
                      </template>
                      <template slot="head_selected" slot-scope="data">
                        <span style="margin-left: 20px;">
                          Assign
                        </span>
                        <b-form-checkbox
                          style="display: inline-block;"
                          v-model="isHeaderSelected"
                          :name="'head_selected'"
                          size="sm"
                          @input="onChangeHeaderSelected"
                        />
                      </template>
                    </HOOList>
                  </b-col>
                </b-row>

                <b-row style="margin-top: 10px;">
                  <b-col offset="4" md="4">
                    <ABSButton
                      :text="'Confirm'"
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      isHeaderSelected: false,
      Model: {
        principle_id: "",
        principle_name: "",
        project_id: "",
        description: "",
        broker_group_commission: "",
        principle_comission: "",
        marketing_agent_comission: "",
        principle_cancel_limit: 0,
        marketing_agent_cancel_limit: 0,
        cancellation_cumulative_days: 0,
        maximum_principle_hold_unit: 0,
        maximum_marketing_agent_hold_unit: 0,
        
        total_agent: 0,
        total_nup: 0,

        paid_commission: 0,
        outstd_commission: 0,

        total_assigned_units: 0,
        total_booked_units: 0,
        total_sold_units: 0,

        last_edit: "",
        updated_at: 0,
      },
      PI_principle_name: {
        dataLookUp: {
          url: "/api/hoonian-website/dashboard/operation-detail/principle/lookup",
          param: {
            project_id: "",
          }
        },
        cValidate: "required",
        cName: "principle name",
        ckey: false,
        cOrder: 1,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
        callback: this.callbackDropdown,
        cClearable: false,
      },
      PI_broker_group: {
        cValidate: "required",
        cName: "broker group",
        cOrder: 2,
        cKey: false,
        cType: "decimal",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      PI_principle: {
        cValidate: "required",
        cName: "principle",
        cOrder: 3,
        cKey: false,
        cType: "decimal",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      PI_marketing_agent: {
        cValidate: "required",
        cName: "marketing agent",
        cOrder: 4,
        cKey: false,
        cType: "decimal",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      PI_booking_principle: {
        cValidate: "required",
        cName: "booking principle",
        cOrder: 5,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      PI_booking_marketing_agent: {
        cValidate: "required",
        cName: "booking marketing agent",
        cOrder: 6,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      PI_cumulative_days: {
        cValidate: "required",
        cName: "cumulative days",
        cOrder: 7,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      PI_hold_principle: {
        cValidate: "required",
        cName: "hold principle",
        cOrder: 8,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      PI_hold_marketing_agent: {
        cValidate: "required",
        cName: "hold marketing agent",
        cOrder: 9,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      PI_description: {
        cValidate: "max:5000",
        cName: "description",
        cOrder: 10,
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
      AssignUnitPropList: {
        url: "/api/hoonian-website/dashboard/operation-detail/principle/units",
        initialWhere: "",
        SortField: "",
        SortBy: "",
        ParamWhere: "",
        param: {
          id: "",
        }
      },
      assignUnitHeader: [
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
          key: "floor",
          label: "Floor",
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
          key: "gross_area",
          label: "Gross Area",
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
          key: "status",
          label: "Status",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "selected",
          label: "Assign",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
          isCustom: true,
        },
      ],
      assignUnitItems: [],
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
    onChangeHeaderSelected(data) {
      for (let i = 0; i < this.assignUnitItems.length; i++) {
        this.assignUnitItems[i].selected = data;
      }
    },
    onChangeSelected(data) {
    },
    eventDataRender(data) {
      this.assignUnitItems = data;
    },
    GetDataBy() {
      let param = {
        project_id: this.paramFromList.project_id,
        principle_id: this.paramFromList.DetailList.id,
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/principle/detail",
        param
      ).then((response) => {
        if (response == null) return;

        let data = response.data;
        this.Model = data;
        this.AssignUnitPropList.param.id = data.id;
        this.$refs.ref_list.doGetList("");
      });
    },
    OnPrincipleNameChange(data) {
      this.$nextTick(() => {
        this.Model.principle_id = data.id;
        this.Model.principle_name = data.label;
      })
    },
    OnConfirmationDateChange(data) {
    },
    rowClicked(record, index) {
      this.doViewClick(record, index);
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
      let paramD = [];
      for (let i = 0; i < this.assignUnitItems.length; i++) {
        if (this.assignUnitItems[i].selected)
          paramD.push({
            unit_id: this.assignUnitItems[i].id,
          });
      }

      let param = {
        ...this.Model,
        project_id: this.paramFromList.project_id,
        units: paramD,
        include: true,
      };
      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard/operation-detail/principle/add_edit', param).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
  },
  mounted() {
    this.AssignUnitPropList.initialWhere = this.paramFromList.project_id;
    this.PI_principle_name.dataLookUp.param.project_id = this.paramFromList.project_id;
    if (this.inputStatus == "edit") {
      this.title = "Edit";
      this.GetDataBy();
      this.PI_principle_name.cProtect = true;
    } else {
      this.title = "Add";
      this.$refs.ref_list.doGetList("");
    }
  }
};
</script>