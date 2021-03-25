<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body" style="font-family: Poppins !important;">
      <div class="">
        <div class="card" style="font-size: 12px !important;">
          <div class="card__body">
            <b-row>
              <b-col style="color: #4A93B3; font-size: 16px;">
                {{title == 'Add'? '': title}} Event
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
                    <label class="lbl-bold">Event Name</label>
                    <ACCTextBox
                      :prop="PI_event_name"
                      v-model="Model.event_name"
                      ref="ref_event_name"
                    />
                  </b-col>
                  <b-col lg="5">
                    <label class="lbl-bold">Booking Type</label>
                    <HOODropDown
                      @change="OnBookingTypeChange"
                      :prop="PI_booking_type"
                      v-model="Model.booking_type"
                      :label="Model.booking_typeLabel"
                      ref="ref_booking_type"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="10">
                    <label class="lbl-bold">Description</label>
                    <ACCTextArea
                      :prop="PI_description"
                      v-model="Model.description"
                      ref="ref_description"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="5">
                    <label class="lbl-bold">Start Date</label>
                    <HOODateTime
                      :prop="PI_start_date"
                      @input="OnStartDateChange"
                      v-model="Model.start_datetime"
                      ref="ref_start_datetime"
                    />
                  </b-col>
                  <b-col lg="5">
                    <label class="lbl-bold">End Date</label>
                    <HOODateTime
                      :prop="PI_end_date"
                      @input="OnEndDateChange"
                      v-model="Model.end_datetime"
                      ref="ref_end_datetime"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="5">
                    <label class="lbl-bold" style="margin-bottom: 12px !important;">Virtual Launching</label>
                    <ACCRadioButton
                      @input="OnVirtualLaunchingChange"
                      :prop="PI_virtual_launching"
                      v-model="Model.is_virtual_launching"
                      ref="ref_virtual_launching"
                    />
                  </b-col>
                  <b-col lg="5">
                    <label class="lbl-bold">Interval (Minute)</label>
                    <ACCTextBox
                      :prop="PI_interval"
                      v-model="Model.selection_interval"
                      ref="ref_sinterval"
                    />
                  </b-col>
                </b-row>

                <b-row>
                  <b-col lg="10" style="padding-left: unset !important; padding-right: unset !important;">
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
                
                <template v-if="inputStatus == 'edit'">
                  <b-row style="margin-bottom: 10px;">
                    <b-col>
                      <div class="wrapper-status">
                        {{Model.status}}
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col lg="5">
                      <label class="lbl-bold">Confirmation Date</label>
                      <HOODateTime
                        :prop="PI_confirmation_date"
                        @input="OnConfirmationDateChange"
                        v-model="Model.confirmed_date"
                        ref="ref_confirmation_date"
                      />
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col lg="10">
                      <label class="lbl-bold">Remarks</label>
                      <ACCTextArea
                        :prop="PI_remarks"
                        v-model="Model.remarks"
                        ref="ref_remarks"
                      />
                    </b-col>
                  </b-row>
                </template>
                
                <b-row style="margin-top: 10px;">
                  <b-col offset="3" md="4">
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
      },
      PI_event_name: {
        cValidate: "required",
        cName: "event name",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      PI_booking_type: {
        dataLookUp: null,
        cValidate: "required",
        cName: "booking type",
        ckey: false,
        cOrder: 2,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: true,
        cOption: [
          { id: "NUP", label: "NUP" },
          { id: "Time", label: "Time" },
          { id: "Token", label: "Token" },
        ],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
      PI_description: {
        cValidate: "max:5000",
        cName: "description",
        cOrder: 3,
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
      PI_start_date: {
        cValidate: "required",
        cName: "start_date",
        cOrder: 4,
        cKey: false,
        cProtect: false,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_end_date: {
        cValidate: "required",
        cName: "end_date",
        cOrder: 5,
        cKey: false,
        cProtect: false,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_virtual_launching: {
        cValidate: "required",
        cName: "virtual launching",
        cId: "rdvirtuallaunching",
        cRadioOptions: [
          { text: "Yes", value: true },
          { text: "No", value: false },
        ],
        cRadioDefaultOption: true,
        cOrder: 6,
        cProtect: false,
        cVisible: true,
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus,
        cGroup: false,
      },
      PI_interval: {
        cValidate: "required",
        cName: "interval",
        cOrder: 7,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      AssignUnitPropList: {
        url: "/api/hoonian-website/dashboard/operation-detail/event-release-period/units",
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
      PI_confirmation_date: {
        cValidate: "required",
        cName: "confirmation date",
        cOrder: 8,
        cKey: false,
        cProtect: false,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_remarks: {
        cValidate: "max:5000",
        cName: "remarks",
        cOrder: 9,
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
          start_datetime: this.momentUnix(data.start_date, "YYYY-MM-DD"),
          end_datetime: this.momentUnix(data.end_date, "YYYY-MM-DD"),
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
      let paramD = [];
      for (let i = 0; i < this.assignUnitItems.length; i++) {
        if (this.assignUnitItems[i].selected)
          paramD.push({
            unit_id: this.assignUnitItems[i].id,
          });
      }

      let param = {
        ...this.Model,
        id: this.paramFromList.DetailList ? this.paramFromList.DetailList.id: "",
        start_datetime: this.momentDateToUnix(this.Model.start_datetime, 'YYYY-MM-DD HH:mm'),
        end_datetime: this.momentDateToUnix(this.Model.end_datetime, 'YYYY-MM-DD HH:mm'),
        confirmed_date: this.momentDateToUnix(this.Model.confirmed_date, 'YYYY-MM-DD HH:mm'),
        project_id: this.paramFromList.project_id,
        units: paramD,
        include: true,
      };
      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard/operation-detail/event-release-period/add_edit', param).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
  },
  mounted() {
    if (this.inputStatus == "edit") {
      this.title = "Edit";
      this.GetDataBy();
      this.PI_event_name.cProtect = true;
    } else {
      this.title = "Add";
    }
    this.AssignUnitPropList.param.id = this.paramFromList.DetailList ? this.paramFromList.DetailList.id: "";
    this.AssignUnitPropList.initialWhere = this.paramFromList.project_id;
    this.$refs.ref_list.doGetList("");
  }
};
</script>