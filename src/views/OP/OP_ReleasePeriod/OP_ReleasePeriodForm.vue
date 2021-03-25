<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>{{title}} Release Period</span>
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
                      <b-col md="6">
                        <span>
                          <label><span style="color:red;">* </span>Event Name</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_event_name"
                          v-model="Model.event_name"
                          ref="ref_event_name"
                        />
                      </b-col>
                      <b-col style="text-align: right;" v-show="inputStatus=='edit'">
                        {{Model.user_edit}} <br>
                        {{momentUnix(Model.updated_at, "DD MMM YYYY")}}
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color:red;">* </span>Start View Date</label>
                        </span>
                        <HOODateTime
                          :prop="PI_start_date"
                          @input="OnStartDateChange"
                          v-model="Model.start_date"
                          ref="ref_start_date"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color:red;">* </span>End View Date</label>
                        </span>
                        <HOODateTime
                          :prop="PI_end_date"
                          @input="OnEndDateChange"
                          v-model="Model.end_date"
                          ref="ref_end_date"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Description</label>
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
                          <label><span style="color:red;">* </span>Booking Type</label>
                        </span>
                        <ACCRadioButton
                          @input="Onbooking_typeChange"
                          :prop="PI_booking_type"
                          v-model="Model.booking_type"
                          ref="ref_booking_type"
                        />
                      </b-col>
                    </b-row>

                    <div class="card">
                      <div class="card__title">
                        <b-row>
                          <b-col style="max-width: max-content !important;">
                            <span>Assign Unit</span>
                          </b-col>
                        </b-row>
                      </div>
                      <div class="card__body">
                        <ACCFormList
                          :prop="{}"
                          :title="''"
                          cStatic
                          cClass="table-style-3_noAct"
                          :cHeader="headerAssignUnit"
                          :cData="dataAssignUnit"
                          ref="ref_event"
                        >
                            <template slot="is_checked" slot-scope="data">
                                <div style="margin-left: 20px">
                                  <b-form-checkbox
                                    v-model="data.item.is_checked"
                                    :name="'is_checked_' + data.item.id"
                                    size="md"
                                    @input="onChangeChecked(data.item)"
                                  />
                                </div>
                            </template>
                            <template slot="head_is_checked" slot-scope="data" >
                                <span style="margin-left: 20px">
                                  Checked Alls
                                </span>
                                <b-form-checkbox
                                  style="display: inline-block"
                                  v-model="isHeaderPick"
                                  :name="'head_is_checked'"
                                  size="sm"
                                  @input="onChangeHeaderPick"
                                />
                            </template>
                        </ACCFormList>
                      </div>
                    </div>

                    <b-row style="margin-top: 10px;">
                      <b-col md="6">
                        <ABSButton
                          :text="'Save'"
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

      headerAssignUnit: [
        {
          key: "is_checked",
          label: "",
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 S th-cus-center",
          isCustom: true,
        },
        {
          key: "tower_cluster",
          label: "Tower Cluster",
          tdClass: "ContentACCList2 notranslate",
          thClass: "HeaderACCList2 L th-cus-center",
        },
        {
          key: "block_floor",
          label: "Block Floor",
          tdClass: "ContentACCList2 notranslate",
          thClass: "HeaderACCList2 L th-cus-center",
        },
        {
          key: "unit_type",
          label: "Unit Type",
          tdClass: "ContentACCList2 notranslate",
          thClass: "HeaderACCList2 L th-cus-center",
        },
        {
          key: "unit_no",
          label: "Unit No",
          tdClass: "ContentACCList2 notranslate",
          thClass: "HeaderACCList2 L th-cus-center",
        },
        {
          key: "status",
          label: "Status",
          tdClass: "ContentACCList2 notranslate",
          thClass: "HeaderACCList2 S th-cus-center",
        },
      ],
      dataAssignUnit: [],

      Model: {
        project_release_id: "",
        project_id: "",
        units: [],
        event_name: "",
        start_date: "",
        end_date: "",
        description: "",
        booking_type: "time"
      },
      PI_event_name: {
        cValidate: "required|max:100",
        cName: "Tower Cluster Name",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_start_date: {
        cValidate: "required",
        cName: "Start Date Time",
        cOrder: 2,
        cKey: false,
        cProtect: false,
        cWithTime: true,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry"
      },
      PI_end_date: {
        cValidate: "required",
        cName: "End Date Time",
        cOrder: 3,
        cKey: false,
        cProtect: false,
        cWithTime: true,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry"
      },
      PI_description: {
        cValidate: "max:5000",
        cName: "Description",
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
      PI_booking_type: {
        cValidate: "required",
        cName: "booking_type",
        cId: "rdbooking_type",
        cRadioOptions: [
          { text: "NUP", value: "nup" },
          { text: "Time", value: "time" },
          { text: "Token", value: "token" },
        ],
        cRadioDefaultOption: "Y",
        cOrder: 4,
        cProtect: false,
        cVisible:  true,
        cParentForm: 'FormEntry',
        cInputStatus: this.inputStatus,
        cGroup: false
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
      if (param.ForReleasePeriod.isEdit && param.ForReleasePeriod.isEdit === true) {
        return "edit";
      } else {
        return "new";
      }
    },
  },
  methods: {
    onChangeChecked(data, index) {
      if (!data.is_checked) {
        data.is_checked = false;
      }
    },
    onChangeHeaderPick(data) {
      for (let i = 0; i < this.dataAssignUnit.length; i++) {
        this.dataAssignUnit[i].is_checked = data;
        this.onChangeChecked(this.dataAssignUnit[i], i);
      }
    },
    doBack() {
      this.$router.go(-1);
    },
    M_ClearForm() {
      this.Model = {
        project_release_id: "",
        project_id: "",
        units: [],
        event_name: "",
        start_date: "",
        end_date: "",
        description: "",
        booking_type: "time"
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
      for (let i = 0; i < this.dataAssignUnit.length; i++) {
        this.Model.units = [];
        if (this.dataAssignUnit[i].is_checked) {
            this.Model.units.push({
                unit_id: this.dataAssignUnit[i].unit_id
            });
        }
      }
      this.Model.project_master_id = this.paramFromList.id;
      let param = {
        ...this.Model,
        project_id: this.paramFromList.id,
        start_datetime: this.momentDateToUnix(this.Model.start_date, 'YYYY-MM-DD HH:mm'),
        end_datetime: this.momentDateToUnix(this.Model.end_date, 'YYYY-MM-DD HH:mm'),
      }
      this.postJSON(this.urlHoonian + '/api/hoonian-website/view-release-period-addedit', param).then((response) => {
        if (response == null) return;
        this.doBack();
      });
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
      this.Model.project_id = this.paramFromList.id;
      this.Model.project_release_id = this.paramFromList.ForReleasePeriod.id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/view-release-period-detail', this.Model).then((response) => {
        if (response == null) return;
        let data = response.data.project_master_detail;
        this.Model = data;
        this.Model.project_release_id = data.id;
        this.Model.block_floor_id = data.id;
        this.dataAssignUnit = response.data.assign_units;
        this.Model.start_date = this.momentUnix(data.start_datetime, 'YYYY-MM-DD HH:mm');
        this.Model.end_date = this.momentUnix(data.end_datetime, 'YYYY-MM-DD HH:mm');
        // this.Model.units = response.data.assign_units;
      });
    },
    getAssignUnit() {
      let param = {
        project_id: this.paramFromList.id,
        tower_cluster_id: "",
        block_floor_id: "",
        unit_type_id: ""
      };
      this.postJSON(this.urlHoonian + '/api/hoonian-website/unit-full-lookup', param).then((response) => {
        if (response == null) return;
        console.log(response);
        // let data = response.data.project_master_detail;
      });
    }
  },
  mounted() {
    this.M_ClearForm();
    this.getAssignUnit();
    if (this.inputStatus == "edit") {
      this.title = "Edit";
      this.GetDataBy();
    } else {
      this.title = "Add";
    }
  },
};
</script>

