<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important">
            <div class="card__title">
              <b-row class="title-primary">
                <b-col style="max-width: max-content !important">
                  <span>Ticket Details</span>
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
                  <span>
                    <ABSButton
                        :text="'Logbook'"
                        classButton="button button--back"
                        classIcon="icon-style-1"
                        @click="doLogbook"
                    />
                  </span>
                  <span>
                    <ABSButton
                        :text="'Back'"
                        classButton="button button--back"
                        classIcon="icon-style-1"
                        @click="doBack"
                    />
                  </span>
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
                    <b-row>
                        <b-col md="6">
                            <span>
                                <label class="lbl-bold poppins">Ticket No</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_ticket_no"
                                v-model="Model.ticket_no"
                                ref="ref_ticket_no"
                            />
                        </b-col>
                        <b-col md="4">
                            <span>
                                <label class="lbl-bold poppins">Date</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_date"
                                v-model="Model.date"
                                ref="ref_date"
                            />
                        </b-col>
                        <b-col md="2">
                            <span>
                                <label class="lbl-bold poppins">Days</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_days"
                                v-model="Model.days"
                                ref="ref_days"
                            />
                        </b-col>
                    </b-row>
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
                        <b-col md="2">
                            <span>
                                <label class="lbl-bold poppins">Tower</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_tower_cluster_name"
                                v-model="Model.tower_cluster_name"
                                ref="ref_tower_cluster_name"
                            />
                        </b-col>
                        <b-col>
                            <span>
                                <label class="lbl-bold poppins">Floor</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_block_floor_name"
                                v-model="Model.block_floor_name"
                                ref="ref_block_floor_name"
                            />
                        </b-col>
                        <b-col lg="2" xl="2">
                            <span>
                                <label class="lbl-bold poppins">Unit No</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_unit_no"
                                v-model="Model.unit_no"
                                ref="ref_unit_no"
                            />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="6">
                            <span>
                                <label class="lbl-bold poppins">Buyer Name</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_name"
                                v-model="Model.name"
                                ref="ref_name"
                            />
                        </b-col>
                        <b-col md="6">
                            <span>
                                <label class="lbl-bold poppins">Handphone No</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_handphone"
                                v-model="Model.handphone"
                                ref="ref_handphone"
                            />
                        </b-col>
                    </b-row>
                    <b-row>
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
                        <b-col md="6">
                            <span>
                                <label class="lbl-bold poppins">Principle Name</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_principle_name"
                                v-model="Model.principle_name"
                                ref="ref_principle_name"
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
                                <label class="lbl-bold poppins">Category</label>
                            </span>
                            <ACCTextBox
                                :prop="PI_ticket_category"
                                v-model="Model.ticket_category"
                                ref="ref_ticket_category"
                            />
                        </b-col>
                    </b-row>
                    
                    <b-row>
                        <b-col md="6">
                            <span>
                                <label class="lbl-bold poppins"> Completed Date </label>
                            </span>
                            <HOODateTime
                                :prop="PI_completed_date"
                                @input="Oncompleted_dateChange"
                                v-model="Model.completed_date"
                                ref="ref_completed_date"
                            />
                        </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label class="lbl-bold poppins"> Resolution </label>
                        </span>
                        <ACCTextArea
                            :prop="PI_resolution"
                            v-model="Model.resolution"
                            ref="ref_resolution"
                        />
                      </b-col>
                    </b-row>

                    <b-row style="margin-top: 10px">
                      <b-col md="6" offset-md="3">
                        <ABSButton
                          :text="'Close Ticket'"
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
        ticket_no: "",
        name: "",
        handphone: "",
        date: "",
        days: "",
        project_name: "",
        tower_cluster_name: "",
        block_floor_name: "",
        unit_no: "",
        marketing_name: "",
        principle_name: "",
        ticket_category: "",
        completed_date: "",
        resolution: "",
      },
      LogbookItems: [],
      LogbookpropList: {
        url: "/api/hoonian-website/dashboard/operation-detail/ticket/logbook-list",
        initialWhere: "",
        SortField: "",
        SortBy: "desc",
        ParamWhere: "",
        param: {
            ticket_id: ""
        }
      },
        PI_ticket_no: {
            cValidate: "",
            cName: "ticket_no",
            cOrder: 9,
            cKey: false,
            cType: "text",
            cProtect: true,
            cParentForm: "FormEntry",
            cDecimal: 2,
            cInputStatus: this.inputStatus,
        },
        PI_date: {
            cValidate: "",
            cName: "date",
            cOrder: 9,
            cKey: false,
            cType: "text",
            cProtect: true,
            cParentForm: "FormEntry",
            cDecimal: 2,
            cInputStatus: this.inputStatus,
        },
        PI_days: {
            cValidate: "",
            cName: "days",
            cOrder: 9,
            cKey: false,
            cType: "text",
            cProtect: true,
            cParentForm: "FormEntry",
            cStyle: "text-align: center; background-color: red; color: white !important; font-weight: bold; font-size: 25px !important;",
            cDecimal: 2,
            cInputStatus: this.inputStatus,
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
        PI_tower_cluster_name: {
            cValidate: "",
            cName: "tower_cluster_name",
            cOrder: 9,
            cKey: false,
            cType: "text",
            cProtect: true,
            cParentForm: "FormEntry",
            cDecimal: 2,
            cInputStatus: this.inputStatus,
        },
        PI_block_floor_name: {
            cValidate: "",
            cName: "block_floor_name",
            cOrder: 9,
            cKey: false,
            cType: "text",
            cProtect: true,
            cParentForm: "FormEntry",
            cDecimal: 2,
            cInputStatus: this.inputStatus,
        },
        PI_unit_no: {
            cValidate: "",
            cName: "unit_no",
            cOrder: 9,
            cKey: false,
            cType: "text",
            cProtect: true,
            cParentForm: "FormEntry",
            cDecimal: 2,
            cInputStatus: this.inputStatus,
        },
        PI_name: {
            cValidate: "",
            cName: "name",
            cOrder: 9,
            cKey: false,
            cType: "text",
            cProtect: true,
            cParentForm: "FormEntry",
            cDecimal: 2,
            cInputStatus: this.inputStatus,
        },
        PI_handphone: {
            cValidate: "",
            cName: "handphone",
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
        PI_principle_name: {
            cValidate: "",
            cName: "principle_name",
            cOrder: 9,
            cKey: false,
            cType: "text",
            cProtect: true,
            cParentForm: "FormEntry",
            cDecimal: 2,
            cInputStatus: this.inputStatus,
        },
        PI_ticket_category: {
            cValidate: "",
            cName: "ticket_category",
            cOrder: 9,
            cKey: false,
            cType: "text",
            cProtect: true,
            cParentForm: "FormEntry",
            cDecimal: 2,
            cInputStatus: this.inputStatus,
        },
        PI_completed_date: {
            cValidate: "required",
            cName: "booked_date",
            cOrder: 5,
            cKey: false,
            cProtect: false,
            cWithTime: false,
            cFormat: "dd/MM/yyyy",
            cParentForm: "FormEntry",
        },
        PI_resolution: {
            cValidate: "max:5000",
            cName: "resolution",
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
    Oncompleted_dateChange(data) {
    },
    doLogbook() {
      this.$router.push({ name: "OP_TicketLogbook" });
    },
    doBack() {
      this.$router.go(-1);
    },
    M_ClearForm() {
      this.Model = {
        ticket_no: "",
        name: "",
        handphone: "",
        date: "",
        days: "",
        project_name: "",
        tower_cluster_name: "",
        block_floor_name: "",
        unit_no: "",
        marketing_name: "",
        principle_name: "",
        ticket_category: "",
        completed_date: "",
        resolution: "",
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
            ticket_id: this.paramFromList.ticket_no
        }
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/ticket/action",
        param
      ).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
    GetDataBy() {
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/ticket/detail",
        {id: this.paramFromList.ticket_no}
      ).then((response) => {
        if (response == null) return;
        if (response.data == null) return;
        this.Model = response.data;
        this.Model.date = this.momentUnix(this.Model.date, "DD MMM YYYY");
        this.Model.days = this.momentDiff(response.data.date, new Date(), 'days');
        this.Model.completed_date = "";
        this.Model.resolution = "";
      });
    },
    renderList() {
        this.LogbookpropList.param.ticket_id = this.paramFromList.ticket_no;
        this.$refs.ref_logbook.doGetList("");
    }
  },
  mounted() {
      // this.paramFromList.ticket_no = "TK-09124";
    this.M_ClearForm();
    this.GetDataBy();
    this.renderList();
  },
};
</script>

