<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important">
            <div class="card__title">
              <b-row class="title-primary">
                <b-col style="max-width: max-content !important">
                  <span>{{ title }} Reservation - Offline Sales</span>
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
                        <!-- <ABSButton
                            text="Cancel"
                            classButton="button button--new mgn"
                            styleButton="background-color: rgb(74, 147, 179); color: white;"
                            @click="onCancel"
                        /> -->
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label class="lbl-bold poppins">Sales Ref No</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_sales_ref_no"
                          v-model="Model.sales_ref_no"
                          ref="ref_sales_ref_no"
                        />
                      </b-col>
                      <b-col md="6">
                        <span>
                          <label class="lbl-bold poppins"> Sales Date </label>
                        </span>
                        <HOODateTime
                          @input="Onsales_dateChange"
                          :prop="PI_sales_date"
                          v-model="Model.sales_date"
                          ref="ref_sales_date"
                        />
                      </b-col>
                    </b-row>
                    <b-row class="title-primary">
                      <b-col>
                        <span>
                          Buyer
                        </span>
                      </b-col>
                    </b-row>
                    <b-row class="row-bordered">
                      <b-col md="8">
                        <b-row>
                          <b-col md="6">
                            <span>
                              <label class="lbl-bold poppins"> Name </label>
                            </span>
                            <ACCTextBox
                              :prop="PI_customer_name"
                              v-model="Model.customer_name"
                              ref="ref_customer_name"
                            />
                          </b-col>
                          <b-col md="6">
                            <span>
                              <label class="lbl-bold poppins"> ID No </label>
                            </span>
                            <ACCTextBox
                              :prop="PI_id_no"
                              v-model="Model.id_no"
                              ref="ref_id_no"
                            />
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col md="6">
                            <span>
                              <label class="lbl-bold poppins"> Handphone </label>
                            </span>
                            <ACCTextBox
                              :prop="PI_handphone"
                              v-model="Model.handphone"
                              ref="ref_handphone"
                            />
                          </b-col>
                          <b-col md="6">
                            <span>
                              <label class="lbl-bold poppins"> Payment Method </label>
                            </span>
                            <HOODropDown
                              @change="Onpayment_methodChange"
                              :prop="PI_payment_method"
                              v-model="Model.payment_method_id"
                              :label="Model.payment_method_name"
                              ref="ref_payment_method"
                            />
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col md="4">
                        <b-row>
                          <b-col>
                            <span>
                              <label class="lbl-bold poppins"> Upload ID </label>
                            </span>
                            <br />
                            <b-img
                              :src="urlHoonian + Model.thumbnail_image"
                              @error="onImageLoadFailure($event)"
                              @click="onPreviewImg(Model.thumbnail_image)"
                              alt height="115" />
                            <HOOImageUpload
                              :prop="PI_thumbnail_image"
                              @change="onUploadIDChange"
                              v-model="Model.thumbnail_image"
                              v-show="inputStatus == 'new'"
                            />
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                    <b-row class="title-primary">
                      <b-col>
                        <span>
                          Unit
                        </span>
                      </b-col>
                    </b-row>
                    <b-row class="row-bordered">
                      <b-col md="8">
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
                              ref="ref_project_name"
                            />
                          </b-col>
                          <b-col md="6">
                            <span>
                              <label class="lbl-bold poppins"> Tower </label>
                            </span>
                            <HOODropDown
                              @change="OntowerChange"
                              :prop="PI_tower"
                              v-model="Model.tower_cluster_id"
                              :label="Model.tower_cluster_name"
                              ref="ref_tower"
                            />
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col md="6">
                            <span>
                              <label class="lbl-bold poppins"> Floor </label>
                            </span>
                            <HOODropDown
                              @change="OnfloorChange"
                              :prop="PI_floor"
                              v-model="Model.block_floor_id"
                              :label="Model.block_floor_name"
                              ref="ref_floor"
                            />
                          </b-col>
                          <b-col md="6">
                            <span>
                              <label class="lbl-bold poppins"> Unit No </label>
                            </span>
                            <HOODropDown
                              @change="OnunitChange"
                              :prop="PI_unit"
                              v-model="Model.unit_id"
                              :label="Model.unit_no"
                              ref="ref_unit"
                            />
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col md="6">
                            <span>
                              <label class="lbl-bold poppins"> Gross Area </label>
                            </span>
                            <ACCTextBox
                              :prop="PI_gross_area"
                              v-model="Model.gross_area"
                              ref="ref_gross_area"
                            />
                          </b-col>
                          <b-col md="6">
                            <span>
                              <label class="lbl-bold poppins"> Selling Price </label>
                            </span>
                            <ACCTextBox
                              :prop="PI_selling_price"
                              v-model="Model.selling_price"
                              ref="ref_selling_price"
                            />
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                    <b-row class="title-primary">
                      <b-col>
                        <span>
                          Principle
                        </span>
                      </b-col>
                    </b-row>
                    <b-row class="row-bordered">
                      <b-col md="8">
                        <b-row>
                          <b-col md="6">
                            <span>
                              <label class="lbl-bold poppins"> Principle Name </label>
                            </span>
                            <HOODropDown
                              @change="OnprincipleChange"
                              :prop="PI_principle"
                              v-model="Model.principle_id"
                              :label="Model.principle_name"
                              ref="ref_principle"
                            />
                          </b-col>
                          <b-col md="6">
                            <span>
                              <label class="lbl-bold poppins"> Marketing Agent </label>
                            </span>
                            <HOODropDown
                              @change="Onmarketing_idChange"
                              :prop="PI_marketing_id"
                              v-model="Model.marketing_id"
                              :label="Model.marketing_name"
                              ref="ref_marketing_id"
                            />
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col md="6">
                            <span>
                              <label class="lbl-bold poppins"> Event Name </label>
                            </span>
                            <HOODropDown
                              @change="Onevent_nameChange"
                              :prop="PI_event_name"
                              v-model="Model.project_release_id"
                              :label="Model.project_release_event_name"
                              ref="ref_event_name"
                            />
                          </b-col>
                          <b-col md="6">
                            <span>
                              <label class="lbl-bold poppins"> Promotion Code </label>
                            </span>
                            <HOODropDown
                              @change="Onpromotion_idChange"
                              :prop="PI_promotion_id"
                              v-model="Model.promotion_id"
                              :label="Model.promotion_name"
                              ref="ref_promotion_id"
                            />
                          </b-col>
                        </b-row>
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
                <ABSModalImage id="Modal_Image" ref="Modal_Image" size="md" />
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
  computed: {
    _projectId () {
      return this.$store.getters.getProjectId;
    }
  },
  watch: {
    _projectId (newValue, oldValue) {
      // this.getProject();
    }
  },
  data() {
    return {
      title: "",
      project_id: this.getDashboardProjectID(),

      Model: {
        id: "",
        sales_ref_no: "",
        sales_date: new Date(),
        customer_name: "",
        id_no: "",
        handphone: "",
        payment_method_id: "",
        payment_method_name: "",
        project_id: "",
        project_name: "",
        tower_cluster_id: "",
        tower_cluster_name: "",
        block_floor_id: "",
        block_floor_name: "",
        unit_id: "",
        unit_no: "",
        gross_area: "",
        selling_price: "",
        principle_id: "",
        principle_name: "",
        marketing_id: "",
        marketing_name: "",
        project_release_id: "",
        project_release_event_name: "",
        promotion_id: "",
        promotion_name: "",
        remarks: "",
        last_edit: "",
        updated_at: "",
      },
      PI_sales_ref_no: {
        cValidate: "required",
        cName: "sales_ref_no",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_sales_date: {
        cValidate: "required",
        cName: "sales_date",
        cOrder: 2,
        cKey: false,
        cProtect: false,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_customer_name: {
        cValidate: "required",
        cName: "customer_name",
        cOrder: 3,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_id_no: {
        cValidate: "required",
        cName: "id_no",
        cOrder: 4,
        cKey: false,
        cType: "tel",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_handphone: {
        cValidate: "required",
        cName: "handphone",
        cOrder: 5,
        cKey: false,
        cType: "tel",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_payment_method: {
        dataLookUp: {
          url: "/api/hoonian-website/payment-method-lookup",
          param: {
            project_id: this.project_id
          }
        },
        cValidate: "required",
        cName: "payment_method",
        ckey: false,
        cOrder: 6,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_thumbnail_image: {
        cValidate: "",
        cName: "upload_id",
        cOrder: 6,
        cTitle: "Upload ID",
        cType: "OfflineSales_ID",
        cParentForm: "FormEntry"
      },
      PI_project_name: {
        dataLookUp: {
          url: "/api/hoonian-website/project-lookup",
          param: {}
        },
        cValidate: "required",
        cName: "project_name",
        ckey: false,
        cOrder: 7,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_tower: {
        dataLookUp: {
          url: "/api/hoonian-website/tower-cluster-lookup",
          param: {}
        },
        cValidate: "required",
        cName: "tower",
        ckey: false,
        cOrder: 8,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_floor: {
        dataLookUp: {
          url: "/api/hoonian-website/block-floor-lookup",
          param: {}
        },
        cValidate: "required",
        cName: "floor",
        ckey: false,
        cOrder: 9,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_unit: {
        dataLookUp: {
          url: "/api/hoonian-website/unit-lookup",
          param: {}
        },
        cValidate: "required",
        cName: "unit_id",
        ckey: false,
        cOrder: 10,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_gross_area: {
        cValidate: "required",
        cName: "gross_area",
        cOrder: 11,
        cKey: false,
        cType: "tel",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_selling_price: {
        cValidate: "required",
        cName: "selling_price",
        cOrder: 12,
        cKey: false,
        cType: "numeric",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_principle: {
        dataLookUp: {
          url: "/api/hoonian-website/principle-lookup",
          param: {}
        },
        cValidate: "required",
        cName: "principle_id",
        ckey: false,
        cOrder: 13,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_marketing_id: {
        dataLookUp: {
          url: "/api/hoonian-website/principle-marketing-lookup",
          param: {}
        },
        cValidate: "required",
        cName: "marketing_id",
        ckey: false,
        cOrder: 14,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_event_name: {
        dataLookUp: {
          url: "/api/hoonian-website/project-release-event-lookup",
          param: {}
        },
        cValidate: "required",
        cName: "event_name",
        ckey: false,
        cOrder: 15,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_promotion_id: {
        dataLookUp: {
          url: "/api/hoonian-website/promotion-lookup",
          param: {}
        },
        cValidate: "required",
        cName: "promotion_id",
        ckey: false,
        cOrder: 16,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_remarks: {
        cValidate: "max:5000",
        cName: "remarks",
        cOrder: 17,
        cKey: false,
        cProtect: false,
        cResize: false,
        cReadonly: false,
        cRows: 1,
        cMaxRows: 3,
        cSize: "md",
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus
      }
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
    onPreviewImg(img) {
      let url = this.urlHoonian + img;
      this.$refs.Modal_Image._show(url);
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    Onpayment_methodChange(data) {
      this.$nextTick(() => {
        this.Model.payment_method_id = data.id;
        this.Model.payment_method_name = data.label;
      });
    },
    Onproject_nameChange(data) {
      this.$nextTick(() => {
        this.Model.project_id = data.id;
        this.Model.project_name = data.label;

        this.PI_tower.dataLookUp.param = {
          project_id: data.id
        }

        this.PI_floor.dataLookUp.param = {
          project_id: data.id,
          tower_cluster_id: ""
        }

        this.PI_unit.dataLookUp.param = {
          project_id: data.id,
          tower_cluster_id: "",
          block_floor_id: "",
          unit_type_id: ""
        }

        this.PI_event_name.dataLookUp.param = {
          project_id: data.id
        }

        this.PI_promotion_id.dataLookUp.param = {
          project_id: data.id
        }

        // this.PI_payment_method.dataLookUp.param = {
        //   project_id: data.id
        // }
      });
    },
    OntowerChange(data) {
      this.$nextTick(() => {
        this.Model.tower_cluster_id = data.id;
        this.Model.tower_cluster_name = data.label;
        this.PI_floor.dataLookUp.param = {
          project_id: this.Model.project_id,
          tower_cluster_id: data.id
        }

        this.PI_unit.dataLookUp.param = {
          project_id: this.Model.project_id,
          tower_cluster_id: data.id,
          block_floor_id: "",
          unit_type_id: ""
        }
      });
    },
    OnfloorChange(data) {
      this.$nextTick(() => {
        this.Model.block_floor_id = data.id;
        this.Model.block_floor_name = data.label;
        this.PI_unit.dataLookUp.param = {
          project_id: this.Model.project_id,
          tower_cluster_id: this.Model.tower_cluster_id,
          block_floor_id: data.id,
          unit_type_id: ""
        }
      });
    },
    OnunitChange(data) {
      this.$nextTick(() => {
        this.Model.unit_id = data.id;
        this.Model.unit_no = data.label;
        this.doGetUnitDetail();
      });
    },
    OnprincipleChange(data) {
      this.$nextTick(() => {
        this.Model.principle_id = data.id;
        this.Model.principle_name = data.label;
        this.PI_marketing_id.dataLookUp.param = {
          principle_id: data.id
        }
      });
    },
    Onmarketing_idChange(data) {
      this.$nextTick(() => {
        this.Model.marketing_id = data.id;
        this.Model.marketing_name = data.label;
      });
    },
    Onevent_nameChange(data) {
      this.$nextTick(() => {
        this.Model.project_release_id = data.id;
        this.Model.project_release_event_name = data.label;
      });
    },
    Onpromotion_idChange(data) {
      this.$nextTick(() => {
        this.Model.promotion_id = data.id;
        this.Model.promotion_name = data.label;
      });
    },
    Onsales_dateChange(data) {},
    onUploadIDChange(data) {},
    doGetUnitDetail() {
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/view-unit-master-detail",
        {unit_id: this.Model.unit_id}
      ).then((response) => {
        if (response == null) return;
        let data = response.data.project_master_detail;
        this.Model.gross_area = data.gross_area;
        this.Model.selling_price = this.isCurrency(data.price, this.decimal);
      });
    },
    doBack() {
      this.$router.go(-1);
    },
    M_ClearForm() {
      this.Model = {
        id: "",
        sales_ref_no: "",
        sales_date: new Date(),
        customer_name: "",
        id_no: "",
        handphone: "",
        payment_method_id: "",
        payment_method_name: "",
        project_id: "",
        project_name: "",
        tower_cluster_id: "",
        tower_cluster_name: "",
        block_floor_id: "",
        block_floor_name: "",
        unit_id: "",
        unit_no: "",
        gross_area: "",
        selling_price: "",
        principle_id: "",
        principle_name: "",
        marketing_id: "",
        marketing_name: "",
        project_release_id: "",
        project_release_event_name: "",
        promotion_id: "",
        promotion_name: "",
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
      let param = {
        ...this.Model,
        sales_date: this.momentDateToUnix( this.Model.sales_date, "YYYY-MM-DD" ),
        price: this.replaceAllString(this.Model.selling_price, ',', '', 'number')
      }

      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/offline-sales/add_edit",
        param
      ).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
    M_Update() {
      let param = {
        ...this.Model,
        sales_date: this.momentDateToUnix( this.Model.sales_date, "YYYY-MM-DD" ),
        price: this.replaceAllString(this.Model.selling_price, ',', '', 'number')
      }

      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/offline-sales/add_edit",
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
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/offline-sales/detail",
        {id: this.paramFromList.id}
      ).then((response) => {
        if (response == null) return;
        let data = response.data;
        this.Model = data;
        this.Model.id = this.paramFromList.id;
        this.Model.sales_date = this.momentUnix( data.sales_date, "YYYY-MM-DD" );
        this.Model.tower_cluster_name = data.tower;
        this.Model.block_floor_name = data.floor;
        this.Model.selling_price = this.isCurrency(data.selling_price, this.decimal);
      });
    },
  },
  mounted() {
    this.M_ClearForm();
    this.PI_payment_method.dataLookUp.param = {
      project_id: this.project_id
    }
    if (this.inputStatus == "edit") {
        this.PI_sales_ref_no.cProtect = true;
        this.PI_sales_date.cProtect = true;
        this.PI_customer_name.cProtect = true;
        this.PI_id_no.cProtect = true;
        this.PI_handphone.cProtect = true;
        this.PI_payment_method.cProtect = true;
        this.PI_project_name.cProtect = true;
        this.PI_tower.cProtect = true;
        this.PI_floor.cProtect = true;
        this.PI_unit.cProtect = true;
        this.PI_principle.cProtect = true;
        this.PI_marketing_id.cProtect = true;
        this.PI_event_name.cProtect = true;
        this.PI_promotion_id.cProtect = true;
        this.title = "Edit";
        this.GetDataBy();
    } else {
        this.PI_sales_ref_no.cProtect = false;
        this.PI_sales_date.cProtect = false;
        this.PI_customer_name.cProtect = false;
        this.PI_id_no.cProtect = false;
        this.PI_handphone.cProtect = false;
        this.PI_payment_method.cProtect = false;
        this.PI_project_name.cProtect = false;
        this.PI_tower.cProtect = false;
        this.PI_floor.cProtect = false;
        this.PI_unit.cProtect = false;
        this.PI_principle.cProtect = false;
        this.PI_marketing_id.cProtect = false;
        this.PI_event_name.cProtect = false;
        this.PI_promotion_id.cProtect = false;
        this.title = "Add";
    }
  },
};
</script>

