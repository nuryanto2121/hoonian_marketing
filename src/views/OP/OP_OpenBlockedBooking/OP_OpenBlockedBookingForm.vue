<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important">
                  <span>{{ title }} Open Blocked Booking</span>
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
                          <label>Blocking Type</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_blocking_type"
                          v-model="Model.blocking_type_label"
                          ref="ref_blocking_type"
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
                          <label>Blocker</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_blocker"
                          v-model="Model.blocker"
                          ref="ref_blocker"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label
                            ><span style="color: red">* </span>Reason</label
                          >
                        </span>
                        <HOODropDown
                          @change="OnReasonDescriptionChange"
                          :prop="PI_reason_id"
                          v-model="Model.reason_id"
                          :label="Model.reason_description"
                          ref="ref_reason_description"
                        />
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
        user_id: "",
        open_blocked_booking_id: "",
        project_id: "",
        blocking_type: "M",
        blocking_type_label: "M",
        principle_id: "",
        marketing_agent_id: "",
        reason_id: "",
        reason_description: "",
        block_date: "",
        unblock_date: "",
        blocker: "",
      },
      PI_blocking_type: {
        cValidate: "required|max:100",
        cName: "blocking_type",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_blocker: {
        cValidate: "required|max:100",
        cName: "blocker",
        cOrder: 2,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_reason_id: {
        dataLookUp: {
          url: "/api/hoonian-website/reason-lookup",
          param: {},
        },
        cValidate: "required",
        cName: "reason name",
        ckey: false,
        cOrder: 3,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
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
        user_id: "adm",
        open_blocked_booking_id: "",
        project_id: this.getDataUser().project_id,
        blocking_type: "M",
        blocking_type_label: "M",
        principle_id: "e409RYclphZlDJOy0dqv",
        marketing_agent_id: "",
        reason_id: "",
        reason_description: "",
        block_date: new Date(),
        unblock_date: new Date(),
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
      var param = {
        open_blocked_booking_id: this.Model.open_blocked_booking_id,
        project_id: this.getDataUser().project_id,
        blocking_type: this.Model.blocking_type,
        principle_id: this.Model.principle_id,
        marketing_agent_id: this.Model.marketing_agent_id,
        reason_id: this.Model.reason_id,
        reason_description: this.Model.reason_description,
        block_date: this.momentDateToUnix(this.Model.block_date, "YYYY-MM-DD"),
        unblock_date: this.momentDateToUnix(
          this.Model.unblock_date,
          "YYYY-MM-DD"
        ),
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/open-blocked-booking-addedit",
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
      this.Model.open_blocked_booking_id = this.paramFromList.id;
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/open-blocked-booking-detail",
        this.Model
      ).then((response) => {
        if (response == null) return;
        this.Model = response.data.open_blocked_booking_detail;
        if (this.Model.blocking_type == "M") {
          this.Model.blocking_type_label = "Marketing Agent";
        } else if (this.Model.blocking_type == "P") {
          this.Model.blocking_type_label = "Principle";
        }
        this.Model.open_blocked_booking_id = this.Model.id;
        this.Model.reason_description = ""; // NEXT HAPUS
      });
    },
    OnActiveChange(data) {
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

