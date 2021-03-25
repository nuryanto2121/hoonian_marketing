<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important">
            <div class="card__title">
              <b-row class="title-primary">
                <b-col style="max-width: max-content !important">
                  <span>Pending Sales Confirmation</span>
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
                      <b-col md="12" class="col-right">
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
                            text="Delete"
                            classButton="button button--new mgn"
                            styleButton="background-color: rgb(74, 147, 179); color: white;"
                            @click="onDelete"
                        />
                      </b-col>
                    </b-row> -->
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
                                <label class="lbl-bold poppins">Handphone No</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_handphone_no"
                                v-model="Model.handphone_no"
                                ref="ref_handphone_no"
                            />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="6">
                            <span>
                                <label class="lbl-bold poppins">Source</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_source"
                                v-model="Model.source"
                                ref="ref_source"
                            />
                        </b-col>
                        <b-col md="6">
                            <span>
                                <label class="lbl-bold poppins">Entry Date</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_entry_date"
                                v-model="Model.entry_date"
                                ref="ref_entry_date"
                            />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="6">
                            <span>
                                <label class="lbl-bold poppins">Event Name</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_event_name"
                                v-model="Model.event_name"
                                ref="ref_event_name"
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
        sales_lead_id: "",
        prospect_name: "",
        handphone_no: "",
        source: "",
        event_name: "",
        entry_date: "",
        remarks: "",
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
      PI_handphone_no: {
        cValidate: "",
        cName: "handphone_no",
        cOrder: 9,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_source: {
        cValidate: "",
        cName: "source",
        cOrder: 9,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_entry_date: {
        cValidate: "",
        cName: "entry_date",
        cOrder: 9,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_event_name: {
        cValidate: "",
        cName: "event_name",
        cOrder: 9,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
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
    doBack() {
      this.$router.go(-1);
    },
    M_ClearForm() {
      this.Model = {
        sales_lead_id: "",
        prospect_name: "",
        handphone_no: "",
        source: "",
        event_name: "",
        entry_date: "",
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
            id: this.paramFromList.sales_lead_id
        }
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/sales-lead/pending-action",
        param
      ).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
    GetDataBy() {
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/sales-lead/pending-detail",
        {id: this.paramFromList.sales_lead_id}
      ).then((response) => {
        if (response == null) return;
        this.Model = response.data;
        this.Model.remarks = "";
        this.Model.entry_date = this.momentUnix(this.Model.entry_date, "DD MMM YYYY");
      });
    },
  },
  mounted() {
    this.M_ClearForm();
    this.GetDataBy();
  },
};
</script>

