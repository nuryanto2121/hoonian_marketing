<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body" style="font-family: Poppins !important;">
      <div class="">
        <div class="card" style="font-size: 12px !important;">
          <div class="card__body">
            <b-row>
              <b-col style="color: #4A93B3; font-size: 16px;">
                Event Details
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
              <b-col lg="12">
                <b-row>
                  <b-col lg="2" style="color: #4A93B3; font-size: 16px;" class="poppins">
                    Information
                  </b-col>
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
                
                <b-row style="margin-right: 10px !important; margin-bottom: 10px;">
                  <b-col lg="12" class="poppins border-gray" style="margin-left: 5px; margin-top: 10px;">
                    <b-row style="text-align: center; margin-bottom: 10px;">
                      <b-col class="border-gray">
                        <b-row>
                          <b-col style="color: gray;">
                            Event Name
                          </b-col>
                        </b-row>
                        <hr />
                        <b-row>
                          <b-col class="lbl-bold">
                            {{Model.event_name}}
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col class="border-gray">
                        <b-row>
                          <b-col style="color: gray;">
                            Booking Type
                          </b-col>
                        </b-row>
                        <hr />
                        <b-row>
                          <b-col class="lbl-bold">
                            {{Model.booking_type}}
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col class="border-gray">
                        <b-row>
                          <b-col style="color: gray;">
                            Start Date
                          </b-col>
                        </b-row>
                        <hr />
                        <b-row>
                          <b-col class="lbl-bold">
                            {{momentUnix(Model.start_date, "DD MMM YYYY")}}
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col class="border-gray">
                        <b-row>
                          <b-col style="color: gray;">
                            End Date
                          </b-col>
                        </b-row>
                        <hr />
                        <b-row>
                          <b-col class="lbl-bold">
                            {{momentUnix(Model.end_date, "DD MMM YYYY")}}
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col class="border-gray">
                        <b-row>
                          <b-col style="color: gray;">
                            Confirmed Date
                          </b-col>
                        </b-row>
                        <hr />
                        <b-row>
                          <b-col class="lbl-bold">
                            {{momentUnix(Model.confirmed_date, "DD MMM YYYY")}}
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                    <b-row style="text-align: center;">
                      <b-col class="border-gray">
                        <b-row>
                          <b-col style="color: gray;">
                            Virtual Launching
                          </b-col>
                        </b-row>
                        <hr />
                        <b-row>
                          <b-col class="lbl-bold">
                            {{Model.virtual_launching? 'Yes': 'No'}}
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col class="border-gray">
                        <b-row>
                          <b-col style="color: gray;">
                            Interval
                          </b-col>
                        </b-row>
                        <hr />
                        <b-row>
                          <b-col class="lbl-bold">
                            {{Model.selection_interval}} Mins
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col lg="7" class="border-gray" style="margin-left: 8px !important; text-align: left;">
                        <b-row>
                          <b-col style="color: gray;">
                            Description
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col class="lbl-bold">
                            {{Model.description}}
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                
                <b-row>
                  <b-col lg="12">
                    <label class="lbl-bold">Remarks</label>
                    <ACCTextArea
                      :prop="PI_remarks"
                      v-model="Model.remarks"
                      ref="ref_remarks"
                    />
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
                      isPoppins
                      isHeaderFixed
                      noCard
                      ref="ref_list"
                      @rowClicked="rowClicked"
                      removeCardTitle
                      removePaddingTopBody
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

                <b-row>
                  <b-col lg="5">
                    <label class="lbl-bold">Cancel Date</label>
                    <HOODateTime
                      :prop="PI_cancel_date"
                      @input="OnCancelDateChange"
                      v-model="Model.cancel_date"
                      ref="ref_cancel_date"
                    />
                  </b-col>
                </b-row>

                <b-row>
                  <b-col lg="5">
                    <label class="lbl-bold">Cancel Reason</label>
                    <HOODropDown
                      @change="OnCancelReasonChange"
                      :prop="PI_cancel_reason"
                      v-model="Model.cancel_reason_cd"
                      :label="Model.cancel_reason_cdLabel"
                      ref="ref_cancel_reason"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="10">
                    <label class="lbl-bold">Cancel Description</label>
                    <ACCTextArea
                      :prop="PI_cancel_description"
                      v-model="Model.cancel_description"
                      ref="ref_cancel_description"
                    />
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
      
      Model: {
        id: "",
        project_id: "",
        event_name: "",
        description: "",
        start_datetime: "",
        end_datetime: "",
        booking_type: "",
        booking_typeLabel: "",
        is_virtual_launching: true,
        selection_interval: 0,
        remarks: "",
        confirmed_date: "",
        include: true,
        
        last_edit: "",
        updated_at: 0,
        status: "",

        cancel_date: "",
        cancel_reason_cd: "",
        cancel_description: "",
      },
      
      AssignUnitPropList: {
        url: "/api/hoonian-website/dashboard/operation-detail/event-release-period/units/assigned",
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
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 th-cus-center",
        },
        {
          key: "tower",
          label: "Tower",
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 th-cus-center",
        },
        {
          key: "floor",
          label: "Floor",
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 th-cus-center",
        },
        {
          key: "unit_type",
          label: "Unit Type",
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 th-cus-center",
        },
        {
          key: "unit_no",
          label: "Unit No",
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 th-cus-center",
        },
        {
          key: "gross_area",
          label: "Gross Area",
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 th-cus-center",
        },
        {
          key: "selling_price",
          label: "Selling Price",
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 th-cus-center",
        },
        {
          key: "status",
          label: "Status",
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 th-cus-center",
        },
      ],
      assignUnitItems: [],
      PI_remarks: {
        cValidate: "max:5000",
        cName: "remarks",
        cOrder: 1,
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
      PI_cancel_date: {
        cValidate: "required",
        cName: "cancel date",
        cOrder: 2,
        cKey: false,
        cProtect: false,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_cancel_reason: {
        dataLookUp: {
          url: "/api/hoonian-website/reason-lookup",
          param: {
          }
        },
        cValidate: "required",
        cName: "cancel reason",
        ckey: false,
        cOrder: 3,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
        cClearable: false,
        isShow: true,
      },
      PI_cancel_description: {
        cValidate: "max:5000",
        cName: "cancel description",
        cOrder: 4,
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
    OnCancelReasonChange(data) {
      this.$nextTick(() => {
        this.Model.cancel_reason_cd = data.id;
        this.Model.cancel_reason_cdLabel = data.label;
      })
    },
    GetDataBy() {
      let param = {
        id: this.paramFromList.DetailList.id,
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/event-release-period/detail",
        param
      ).then((response) => {
        if (response == null) return;

        let data = response.data;
        this.Model = data;
        this.Model = {
          ...this.Model,
          is_virtual_launching: data.virtual_launching,
          start_datetime: this.momentUnix(data.start_date, " YYYY-MM-DD"),
          end_datetime: this.momentUnix(data.end_date, " YYYY-MM-DD"),
        }
        
      });
    },
    OnBookingTypeChange(data) {
      this.$nextTick(() => {
        this.Model.booking_type = data.id;
        this.Model.booking_typeLabel = data.label;
      })
    },
    OnStartDateChange(data) {
      this.PI_end_date.cValidate = "required|min_date:" + this.momentDate(new Date(data));
    },
    OnEndDateChange(data) {
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
      let param = {
        id: this.paramFromList.DetailList ? this.paramFromList.DetailList.id: "",
        cancel_date: this.momentDateToUnix(this.Model.cancel_date, 'YYYY-MM-DD HH:mm'),
        cancel_reason_cd: this.Model.cancel_reason_cd,
        cancel_description: this.Model.cancel_description,
      };
      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard/operation-detail/event-release-period/cancel', param).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
  },
  mounted() {
    this.GetDataBy();
    this.AssignUnitPropList.param.id = this.paramFromList.DetailList ? this.paramFromList.DetailList.id: "";
    this.AssignUnitPropList.initialWhere = this.paramFromList.project_id;
    this.$refs.ref_list.doGetList("");
  }
};
</script>

<style scoped>
hr {
  margin-top: 10px !important;
  margin-bottom: 10px !important;
}
</style>