<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important">
                  <span>{{ title }} Reservation</span>
                </b-col>
                <b-col style="text-align: right">
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
                  <b-col md="2">
                    <div>
                      <img
                        :src="require('@/assets/paper.png')"
                        alt
                        style="width: 70px"
                      />
                    </div>
                  </b-col>
                  <b-col md="10">
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label
                            ><span style="color: red">* </span> Marked
                            Status</label
                          >
                        </span>
                        <ACCRadioButton
                          @input="Onmarked_statusChange"
                          :prop="PI_marked_status"
                          v-model="Model.marked_status"
                          ref="ref_marked_status"
                        />
                      </b-col>
                      <b-col
                        style="text-align: right"
                        v-show="inputStatus == 'edit'"
                      >
                        {{ Model.user_edit }} <br />
                        {{ momentUnix(Model.updated_at, "DD MMM YYYY") }}
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Reserved Time Minutes</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_reserved_time_minutes"
                          v-model="Model.reserved_time_minutes"
                          ref="ref_reserved_time_minutes"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label> Reserved Until </label>
                        </span>
                        <HOODateTime
                          @input="Onreserved_untilChange"
                          :prop="PI_reserved_until"
                          v-model="Model.reserved_until"
                          ref="ref_reserved_until"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label
                            ><span style="color: red">* </span> Active
                          </label>
                        </span>
                        <ACCRadioButton
                          @input="OnActiveChange"
                          :prop="PI_is_active"
                          v-model="Model.is_active"
                          ref="ref_is_active"
                        />
                      </b-col>
                    </b-row>
                    <b-row v-show="title == 'Edit'">
                      <b-col md="12">
                        <div class="card">
                          <div class="card__title">
                            <b-row>
                              <b-col style="max-width: max-content !important">
                                <span>Reservation Unit</span>
                              </b-col>
                            </b-row>
                          </div>
                          <div class="card__body">
                            <ACCFormList
                              :prop="{}"
                              :title="''"
                              cStatic
                              cClass="table-style-3_noAct"
                              :cHeader="UnitHeader"
                              :cData="UnitItems"
                              @rowClicked="rowPaymentClicked"
                              ref="ref_Payment"
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
                              <template
                                slot="head_is_checked"
                                slot-scope="data"
                              >
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
                      </b-col>
                    </b-row>
                    <b-row style="margin-top: 10px">
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

      Model: {
        reservation_id: "",
        project_id: "",
        marked_status: "B",
        marked_status_label: "Booked",
        reserved_time_minutes: "",
        reserved_until: "",
        is_active: true,
      },
      UnitItems: [],
      PI_marked_status: {
        cValidate: "required",
        cName: "marked_status",
        cId: "rdmarked_status",
        cRadioOptions: [
          { text: "Booked", value: "B" },
          { text: "Sold", value: "S" },
        ],
        cRadioDefaultOption: "Y",
        cOrder: 6,
        cProtect: false,
        cVisible: true,
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus,
        cGroup: false,
      },
      PI_reserved_time_minutes: {
        cValidate: "",
        cName: "blocker",
        cOrder: 2,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_reserved_until: {
        cValidate: "",
        cName: "reserved_until",
        cOrder: 3,
        cKey: false,
        cProtect: false,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_is_active: {
        cValidate: "required",
        cName: "is_active",
        cId: "rdis_active",
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
      UnitHeader: [
        {
          key: "is_checked",
          label: "Checked",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 L th-cus-center poppins",
          isCustom: true,
        },
        {
          key: "tower_cluster_name",
          label: "Tower Cluster",
          tdClass: "ContentACCList2 notranslate poppins",
          thClass: "HeaderACCList2 L th-cus-center poppins",
        },
        {
          key: "block_floor_name",
          label: "Block Floor",
          tdClass: "ContentACCList2 notranslate poppins",
          thClass: "HeaderACCList2 L th-cus-center poppins",
        },
        {
          key: "unit_type_name",
          label: "Unit Type",
          tdClass: "ContentACCList2 notranslate poppins",
          thClass: "HeaderACCList2 L th-cus-center poppins",
        },
        {
          key: "unit_no",
          label: "Unit No",
          tdClass: "ContentACCList2 notranslate poppins",
          thClass: "HeaderACCList2 L th-cus-center poppins",
        },
      ],
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
    rowPaymentClicked() {},
    onChangeChecked(data, index) {
      if (!data.is_checked) {
        data.is_checked = false;
      }
    },
    onChangeHeaderPick(data) {
      for (let i = 0; i < this.UnitItems.length; i++) {
        this.UnitItems[i].is_checked = data;
        this.onChangeChecked(this.UnitItems[i], i);
      }
    },
    OnReasonDescriptionChange(data) {
      this.$nextTick(() => {
        this.Model.reason_id = data.id;
        this.Model.reason_description = data.label;
      });
    },
    doBack() {
      this.$router.go(-1);
    },
    M_ClearForm() {
      this.Model = {
        reservation_id: "",
        project_id: this.getDataUser().project_id,
        marked_status: "B",
        marked_status_label: "Booked",
        reserved_time_minutes: "",
        reserved_until: "",
        is_active: true,
      };
    },
    doSave() {
      this.$validator._base.validateAll("FormEntry").then((result) => {
        if (!result) return;
        this.alertConfirmation("Are You Sure Want To Save This Data ?").then(
          (ress) => {
            if (ress.value) {
              this.$validator.errors.clear("FormEntry");
              if (this.inputStatus == "new") {
                this.M_Save();
              } else {
                this.M_Update();
              }
            }
          }
        );
      });
    },
    M_Save() {
      var param = {
        reservation_id: "",
        project_id: this.getDataUser().project_id,
        marked_status: this.Model.marked_status,
        reserved_time_minutes: this.Model.reserved_time_minutes,
        reserved_until: this.momentDateToUnix(
          this.Model.reserved_until,
          "YYYY-MM-DD"
        ),
        is_active: this.Model.is_active,
        units: [],
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/reservation-addedit",
        param
      ).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
    M_Update() {
      let paramD = [];
      this.UnitItems.forEach((data, index) => {
        if (!data.is_checked) return;
        paramD.push({
          unit_id: data.unit_id,
        });
      });
      var param = {
        reservation_id: this.Model.reservation_id,
        project_id: this.getDataUser().project_id,
        marked_status: this.Model.marked_status,
        reserved_time_minutes: this.Model.reserved_time_minutes,
        reserved_until: this.momentDateToUnix(
          this.Model.reserved_until,
          "YYYY-MM-DD"
        ),
        is_active: this.Model.is_active,
        units: paramD,
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/reservation-addedit",
        param
      ).then((response) => {
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
    M_Delete() {},
    GetDataBy() {
      this.Model.reservation_id = this.paramFromList.id;
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/reservation-detail",
        this.Model
      ).then((response) => {
        if (response == null) return;
        this.Model = response.data.reservation_detail;
        this.Model.reserved_until = this.momentUnix(
          this.Model.reserved_until,
          "YYYY-MM-DD HH:mm"
        );
        this.Model.reservation_id = this.Model.id;
        this.Model.reason_description = ""; // NEXT HAPUS
        this.UnitItems = response.data.reservation_units;
      });
    },
    OnActiveChange(data) {
      this.$nextTick(() => {});
    },
    Onmarked_statusChange(data) {
      this.$nextTick(() => {});
    },
  },
  mounted() {
    this.M_ClearForm();
    if (this.inputStatus == "edit") {
      this.title = "Edit";
      this.GetDataBy();
    } else {
      this.title = "Add";
    }
  },
};
</script>

