<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important">
            <div class="card__title">
              <b-row class="title-primary">
                <b-col style="max-width: max-content !important">
                  <span>{{ title }} Reservation</span>
                </b-col>
                <b-col class="col-right">
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
                </b-col>
                <b-col style="max-width: fit-content !important; padding-right: unset !important;" class="col-right">
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
                    <b-row>
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
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label class="lbl-bold poppins">Reservation No</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_reservation_no"
                          v-model="Model.reservation_no"
                          ref="ref_reservation_no"
                        />
                      </b-col>
                      <b-col md="6">
                        <span>
                          <label class="lbl-bold poppins"> Reservation Date </label>
                        </span>
                        <HOODateTime
                          @input="Onreservation_dateChange"
                          :prop="PI_reservation_date"
                          v-model="Model.reservation_date"
                          ref="ref_reservation_date"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="6">
                        <span>
                          <label class="lbl-bold poppins"> Project Name </label>
                        </span>
                        <HOODropDown
                          @change="Onproject_nameChange"
                          :prop="PI_project_name"
                          v-model="Model.project_id"
                          :label="Model.project_name"
                          ref="ref_action"
                        />
                      </b-col>
                      <b-col md="6">
                        <span>
                          <label class="lbl-bold poppins"> Release Date </label>
                        </span>
                        <HOODateTime
                          @input="Onrelease_dateChange"
                          :prop="PI_release_date"
                          v-model="Model.release_date"
                          ref="ref_release_date"
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

                    <b-row v-show="inputStatus == 'edit'">
                    <!-- <b-row> -->
                      <b-col md="12">
                        <!-- <div class="card">
                          <div class="card__title">
                            <b-row>
                              <b-col style="max-width: max-content !important">
                                <span>Reservation Unit</span>
                              </b-col>
                            </b-row>
                          </div>
                          <div class="card__body"> -->
                            <!-- <ACCFormList
                              :prop="UnitpropList"
                              :title="''"
                              cClass="table-style-3_noAct"
                              :cHeader="UnitHeader"
                              @rowClicked="rowPaymentClicked"
                              @onRenderData="UnitDataRender"
                              ref="ref_Unit"
                            > -->
                            <HOOList
                                :prop="UnitpropList"
                                :title="''"
                                cClass="table-style-3_noAct"
                                ButtonBackDisabled
                                SearchDisabled
                                isPoppins
                                isHeaderFixed
                                noCard
                                :cHeader="UnitHeader"
                                ref="ref_Unit"
                                @rowClicked="rowPaymentClicked"
                                @onRenderData="UnitDataRender"
                            >
                              <template slot="is_booked" slot-scope="data">
                                <div style="margin-left: 20px">
                                  <b-form-checkbox
                                    v-model="data.item.is_booked"
                                    :name="'is_booked_' + data.item.id"
                                    size="md"
                                    @input="onChangeBooked(data.item)"
                                  />
                                </div>
                              </template>
                              <template slot="is_sold" slot-scope="data">
                                <div style="margin-left: 20px">
                                  <b-form-checkbox
                                    v-model="data.item.is_sold"
                                    :name="'is_sold_' + data.item.id"
                                    size="md"
                                    @input="onChangeSold(data.item)"
                                  />
                                </div>
                              </template>
                              <template slot="selling_price" slot-scope="data">
                                {{isCurrency(data.item.selling_price, decimal)}}
                              </template>
                              <template slot="head_is_booked" slot-scope="data">
                                Booked
                              </template>
                              <template slot="head_is_sold" slot-scope="data">
                                Sold
                              </template>
                              <!-- <template
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
                              </template> -->
                            <!-- </ACCFormList> -->
                            </HOOList>
                          <!-- </div> -->
                        <!-- </div> -->
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
                    <OPCancel
                      ref="OP_Cancel"
                      :urlAPI="'/api/hoonian-website/dashboard/operation-detail/reservation/cancel'"
                      :id="Model.reservation_id"
                    />
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
import OPCancel from '../OP_Cancel/OP_Cancel';
export default {
  components: {
    OPCancel
  },
  data() {
    return {
      title: "",
      search: "",

      Model: {
        reservation_id: "",
        reservation_no: "",
        reservation_date: "",
        project_id: "",
        project_name: "",
        release_date: "",
        remarks: "",
        last_edit: "",
        updated_at: "",
      },
      UnitHeader: [
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
      UnitItems: [],
      UnitpropList: {
            url: "/api/hoonian-website/dashboard/operation-detail/reservation/units",
            initialWhere: "",
            SortField: "",
            SortBy: "desc",
            ParamWhere: "",
            param: {
                id: "",
                search: ""
            }
        },

      PI_reservation_no: {
        cValidate: "required",
        cName: "reservation_no",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_reservation_date: {
        cValidate: "required",
        cName: "reservation_date",
        cOrder: 2,
        cKey: false,
        cProtect: false,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_project_name: {
        dataLookUp: {
          url: "/api/hoonian-website/project-lookup",
          param: {}
        },
        cValidate: "required",
        cName: "Project Name",
        ckey: false,
        cOrder: 3,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_release_date: {
        cValidate: "",
        cName: "release_date",
        cOrder: 4,
        cKey: false,
        cProtect: false,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_remarks: {
        cValidate: "max:5000",
        cName: "remarks",
        cOrder: 5,
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
    onCancel() {
      this.$refs.OP_Cancel._show();
    },
    onSearchEnter(data) {
      this.$nextTick(() => {
        this.renderList();
      })
    },
    removeSearch() {
      this.search = "";
      this.onSearchEnter("");
    },
    rowPaymentClicked() {},
    UnitDataRender(data) {
        this.UnitItems = data;
    },
    onChangeBooked(data) {
      if (!data.is_booked) {
        data.is_booked = false;
      }
      else {
        data.is_sold = false;
      }
    },
    onChangeSold(data) {
      if (!data.is_sold) {
        data.is_sold = false;
      }
      else {
        data.is_booked = false;
      }
    },
    // onChangeHeaderPick(data) {
    //   for (let i = 0; i < this.UnitItems.length; i++) {
    //     this.UnitItems[i].is_checked = data;
    //     this.onChangeChecked(this.UnitItems[i], i);
    //   }
    // },
    Onproject_nameChange(data) {
      this.$nextTick(() => {
        this.Model.project_id = data.id;
        this.Model.project_name = data.label;
      });
    },
    Onreservation_dateChange(data) {},
    Onrelease_dateChange(data) {},
    doBack() {
      this.$router.go(-1);
    },
    M_ClearForm() {
      this.Model = {
        reservation_id: "",
        reservation_no: "",
        reservation_date: new Date(),
        project_id: "",
        project_name: "",
        release_date: new Date(),
        remarks: "",
        last_edit: "",
        updated_at: "",
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
        reservation_no: this.Model.reservation_no,
        reserved_start_time: this.momentDateToUnix( this.Model.reservation_date, "YYYY-MM-DD" ),
        project_id: this.Model.project_id,
        reserved_until: this.momentDateToUnix( this.Model.release_date, "YYYY-MM-DD" ),
        remarks: this.Model.remarks,
        include: true,
        units: [],
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/reservation/add_edit",
        param
      ).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
    M_Update() {
      let paramD = [];
      this.UnitItems.forEach((data, index) => {
        if (!data.is_booked && !data.is_sold) return;
        let ms = "";
        if (data.is_booked) { ms = "B" }
        else if (data.is_sold) { ms = "S" }

        paramD.push({
          unit_id: data.id,
          marked_status: ms
        });
      });

      let param = {
        id: this.Model.reservation_id,
        reservation_no: this.Model.reservation_no,
        reserved_start_time: this.momentDateToUnix( this.Model.reservation_date, "YYYY-MM-DD" ),
        project_id: this.Model.project_id,
        reserved_until: this.momentDateToUnix( this.Model.release_date, "YYYY-MM-DD" ),
        remarks: this.Model.remarks,
        include: true,
        units: paramD,
      };

      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/reservation/add_edit",
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
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/reservation/detail",
        {id: this.paramFromList.id}
      ).then((response) => {
        if (response == null) return;
        this.Model = response.data;
        this.Model.reservation_date = this.momentUnix( this.Model.reserved_start_time, "YYYY-MM-DD HH:mm" );
        this.Model.release_date = this.momentUnix( this.Model.reserved_until, "YYYY-MM-DD HH:mm" );
        this.Model.reservation_id = this.Model.id;
        this.renderList();
      });
    },
    renderList() {
        this.UnitpropList.initialWhere = this.Model.project_id;
        this.UnitpropList.param.id = this.Model.reservation_id;
        this.$refs.ref_Unit.doGetList("");
    }
  },
  mounted() {
    this.M_ClearForm();
    // this.UnitpropList.initialWhere = 'project_id';
    // this.$refs.ref_Unit.doGetList("");
    if (this.inputStatus == "edit") {
        this.PI_reservation_no.cProtect = true;
        this.PI_reservation_date.cProtect = true;
        this.PI_project_name.cProtect = true;
        this.PI_release_date.cProtect = true;
      this.title = "Edit";
      this.GetDataBy();
    } else {
        this.PI_reservation_no.cProtect = false;
        this.PI_reservation_date.cProtect = false;
        this.PI_project_name.cProtect = false;
        this.PI_release_date.cProtect = false;
      this.title = "Add";
    }
  },
};
</script>

