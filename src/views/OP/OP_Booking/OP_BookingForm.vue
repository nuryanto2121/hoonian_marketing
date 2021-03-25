<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body" style="font-family: Poppins !important;">
      <div class="">
        <div class="card" style="font-size: 12px !important;">
          <div class="card__body">
            <b-row>
              <b-col style="color: #4A93B3; font-size: 16px;">
                {{isBookingConfirmation() ? 'Booking Confirmation': 'Hold Unit Cancellation'}}
              </b-col>
              <b-col style="text-align: right;">
                <ABSButton
                  :text="'Logbook'"
                  classButton="button button--back"
                  classIcon="icon-style-1"
                  @click="doLogBook"
                />
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
                    Project Details
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
                            Project Name
                          </b-col>
                        </b-row>
                        <hr />
                        <b-row>
                          <b-col class="lbl-bold">
                            {{Model.project_name}}
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col class="border-gray">
                        <b-row>
                          <b-col style="color: gray;">
                            Tower
                          </b-col>
                        </b-row>
                        <hr />
                        <b-row>
                          <b-col class="lbl-bold">
                            {{Model.tower_cluster_name}}
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col class="border-gray">
                        <b-row>
                          <b-col style="color: gray;">
                            Floor
                          </b-col>
                        </b-row>
                        <hr />
                        <b-row>
                          <b-col class="lbl-bold">
                            {{Model.block_floor_name}}
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col class="border-gray">
                        <b-row>
                          <b-col style="color: gray;">
                            Unit Type
                          </b-col>
                        </b-row>
                        <hr />
                        <b-row>
                          <b-col class="lbl-bold">
                            {{Model.unit_type_name}}
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col class="border-gray">
                        <b-row>
                          <b-col style="color: gray;">
                            Unit No
                          </b-col>
                        </b-row>
                        <hr />
                        <b-row>
                          <b-col class="lbl-bold">
                            {{Model.unit_no}}
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                    <b-row style="text-align: center;">
                      <b-col class="border-gray">
                        <b-row>
                          <b-col style="color: gray;">
                            Event Name
                          </b-col>
                        </b-row>
                        <hr />
                        <b-row>
                          <b-col class="lbl-bold">
                            {{Model.project_release_event_name}}
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col class="border-gray" @click="showImage(Model.promotion_picture)">
                        <b-row>
                          <b-col style="color: gray;">
                            Promotion
                            <b-img style="position: absolute; top: 0%; left: 86%; cursor: pointer;" :src="require('@/assets/icon-svg/carbon_information.svg')" alt="" />
                          </b-col>
                        </b-row>
                        <hr />
                        <b-row>
                          <b-col class="lbl-bold">
                            {{Model.promotion_name}}
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col class="border-gray">
                        <b-row>
                          <b-col style="color: gray;">
                            Hold Date
                          </b-col>
                        </b-row>
                        <hr />
                        <b-row>
                          <b-col class="lbl-bold">
                            {{momentUnix(Model.payment_hold_until, "DD MMM YYYY")}}
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col class="border-gray">
                        <b-row>
                          <b-col style="color: gray;">
                            {{isBookingConfirmation()? 'Days': 'Hours'}}
                          </b-col>
                        </b-row>
                        <hr />
                        <b-row>
                          <b-col class="lbl-bold" :style="isBookingConfirmation()? (isDaysRed? 'color: red;': ''): ''">
                            {{Model.daysOrHours}}
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col class="border-gray">
                        <b-row>
                          <b-col style="color: gray;">
                            Price
                          </b-col>
                        </b-row>
                        <hr />
                        <b-row>
                          <b-col class="lbl-bold">
                            IDR {{isCurrency(Model.price, decimal)}}
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col style="color: #4A93B3; font-size: 16px;" class="poppins">
                    Buyer
                    <span v-if="paramFromList.status == 1" style="
                      margin-left: 20px;
                      background: #4A93B3;
                      padding: 0px 20px;
                      border: 1px solid #4A93B3;
                      box-sizing: border-box;
                      border-radius: 4px;
                      color: white;
                      font-size: 12px;">
                      Pending
                    </span>
                    <span v-if="paramFromList.status == 3" style="
                      margin-left: 20px;
                      background: #FF0045;
                      padding: 0px 20px;
                      border: 1px solid #FF0045;
                      box-sizing: border-box;
                      border-radius: 4px;
                      color: white;
                      font-size: 12px;">
                      Pending
                    </span>
                  </b-col>
                </b-row>
                <b-row style="margin-right: 10px !important; margin-bottom: 10px;">
                  <b-col lg="12" class="poppins border-gray" style="margin-left: 5px; margin-top: 10px;">
                    <b-row style="text-align: center; margin-bottom: 10px;">
                      <b-col class="border-gray">
                        <b-row>
                          <b-col style="color: gray;">
                            Name
                          </b-col>
                        </b-row>
                        <hr />
                        <b-row>
                          <b-col class="lbl-bold">
                            {{Model.name}}
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col class="border-gray">
                        <b-row>
                          <b-col style="color: gray;">
                            ID No
                          </b-col>
                        </b-row>
                        <hr />
                        <b-row>
                          <b-col class="lbl-bold">
                            {{Model.id_no}}
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col class="border-gray">
                        <b-row>
                          <b-col style="color: gray;">
                            Principle Name
                          </b-col>
                        </b-row>
                        <hr />
                        <b-row>
                          <b-col class="lbl-bold">
                            {{Model.principle_name}}
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col class="border-gray">
                        <b-row>
                          <b-col style="color: gray;">
                            Marketing Agent
                          </b-col>
                        </b-row>
                        <hr />
                        <b-row>
                          <b-col class="lbl-bold">
                            {{Model.marketing_name}}
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col class="border-gray">
                        <b-row>
                          <b-col>
                            <b-img :src="urlHoonian + Model.pic" alt="" rounded style="height: 60px; cursor: pointer;" @error="onImageLoadFailure($event)" @click="showImage(Model.pic)" />
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>

                <template v-if="isBookingConfirmation()">
                  <b-row>
                    <b-col lg="4">
                      <label class="lbl-bold">Status</label>
                      <HOODropDown
                        @change="OnStatusChange"
                        :prop="PI_status"
                        v-model="Model.status"
                        :label="Model.statusLabel"
                        ref="ref_status"
                      />
                    </b-col>
                    <b-col lg="4">
                      <label class="lbl-bold">Sales and Purchase Date</label>
                      <HOODateTime
                        :prop="PI_purchase_date"
                        v-model="Model.purchase_date"
                        ref="ref_purchase_date"
                      />
                    </b-col>
                    <b-col lg="4">
                      <label class="lbl-bold">Event Name</label>
                      <HOODropDown
                        @change="OnEventNameChange"
                        :prop="PI_event_name"
                        v-model="Model.event_name"
                        :label="Model.event_nameLabel"
                        ref="ref_status"
                      />
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col lg="4">
                      <label class="lbl-bold">Payment Method</label>
                      <HOODropDown
                        @change="OnPaymentMethodChange"
                        :prop="PI_payment_method"
                        v-model="Model.payment_method_id"
                        :label="Model.payment_method_name"
                        ref="ref_payment_method"
                      />
                    </b-col>
                    <b-col lg="4">
                      <label class="lbl-bold">Promotion Code</label>
                      <HOODropDown
                        @change="OnPromotionCodeChange"
                        :prop="PI_promotion_code"
                        v-model="Model.promotion_id"
                        :label="Model.promotion_name"
                        ref="ref_promotion_code"
                      />
                    </b-col>
                  </b-row>
                </template>
                <template v-else>
                  <b-row>
                    <b-col lg="5">
                      <label class="lbl-bold">Cancel Hold</label>
                      <ACCRadioButton
                        @input="OnCancelHoldChange"
                        :prop="PI_cancel_hold"
                        v-model="Model.cancel_hold"
                        ref="ref_cancel_hold"
                      />
                    </b-col>
                  </b-row>
                </template>

                <b-row>
                  <b-col lg="4">
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
                
                <b-row>
                  <b-col lg="12" style="padding-left: unset !important; padding-right: unset !important;">
                    <label class="lbl-bold" style="margin-bottom: unset !important; margin-left: 5px;">Log Book</label>
                    <HOOList
                      :prop="LogBookPropList"
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
                      <template slot="date" slot-scope="data">
                        {{momentUnix(data.item.date, "DD MMM YYYY")}}
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
    <ABSModalImage id="Modal_Image" ref="Modal_Image" size="md" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      
      Model: {
        agreement_no: "",
        block_floor_name: "",
        booking_date: 0,
        id: "",
        id_no: "",
        marketing_name: "",
        mobile_app_user_id: "",
        name: "",
        payment_hold_until: "",
        payment_method_id: "",
        payment_method_name: "",
        pic: "",
        price: "",
        principle_name: "",
        project_name: "",
        project_release_event_name: "",
        promotion_id: "",
        promotion_name: "",
        promotion_picture: "",
        customer_transaction_id: "",
        tower_cluster_name: "",
        unit_no: "",
        unit_type_name: "",

        last_edit: "",
        updated_at: 0,

        status: "",
        statusLabel: "",
        purchase_date: "",
        event_name: "",
        event_nameLabel: "",

        cancel_hold: true,
        cancel_reason_cd: "",
        cancel_description: "",

        daysOrHours: "",
        isDaysRed: false,
      },
      
      LogBookPropList: {
        url: "/api/hoonian-website/dashboard/operation-detail/booking/logbook-list",
        initialWhere: "",
        SortField: "",
        SortBy: "",
        ParamWhere: "",
        param: {
          customer_transaction_id: "",
        }
      },
      PI_cancel_hold: {
        cValidate: "",
        cName: "cancel hold",
        cId: "rdcancelhold",
        cRadioOptions: [
          { text: "Yes", value: true },
          { text: "No", value: false },
        ],
        cRadioDefaultOption: true,
        cOrder: 1,
        cProtect: false,
        cVisible: true,
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus,
        cGroup: false,
      },
      PI_status: {
        dataLookUp: {},
        cValidate: "required",
        cName: "Status",
        ckey: false,
        cOrder: 1,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: true,
        cOption: [
            {id: 1, label: "Sales and Purchase Agreement"},
            {id: 2, label: "Cancelled Booking"}
        ],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_purchase_date: {
        cValidate: "required",
        cName: "purchase date",
        cOrder: 2,
        cKey: false,
        cProtect: false,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_event_name: {
        dataLookUp: {
          url: "/api/hoonian-website/project-release-event-lookup",
          param: {
          }
        },
        cValidate: "required",
        cName: "event name",
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
      PI_payment_method: {
        dataLookUp: {
          url: "/api/hoonian-website/payment-method-lookup",
          param: {
            project_id: '',
          }
        },
        cValidate: "required",
        cName: "payment method",
        ckey: false,
        cOrder: 4,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
        cClearable: false,
        isShow: true,
      },
      PI_promotion_code: {
        dataLookUp: {
          url: "/api/hoonian-website/promotion-lookup",
          param: {
          }
        },
        cValidate: "required",
        cName: "promotion code",
        ckey: false,
        cOrder: 5,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
        cClearable: false,
        isShow: true,
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
        cOrder: 6,
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
        cOrder: 7,
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
    showImage(pathUrl) {
      this.$refs.Modal_Image._show(this.urlHoonian + pathUrl);
    },
    doLogBook() {
      let param = this.paramFromList;
      param.customer_transaction_id = this.Model.id;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_BookingLogBook"});
    },
    OnStatusChange(data) {
      this.$nextTick(() => {
        this.Model.status = data.id;
        this.Model.statusLabel = data.label;
      })
    },
    OnEventNameChange(data) {
      this.$nextTick(() => {
        this.Model.event_name = data.id;
        this.Model.event_nameLabel = data.label;
      })
    },
    OnPaymentMethodChange(data) {
      this.$nextTick(() => {
        this.Model.payment_method_id = data.id;
        this.Model.payment_method_name = data.label;
      })
    },
    OnPromotionCodeChange(data) {
      this.$nextTick(() => {
        this.Model.promotion_id = data.id;
        this.Model.promotion_name = data.label;
      })
    },
    OnCancelHoldChange(data) {
      
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    OnCancelReasonChange(data) {
      this.$nextTick(() => {
        this.Model.cancel_reason_cd = data.id;
        this.Model.cancel_reason_cdLabel = data.label;
      })
    },
    isBookingConfirmation() {
      if (this.paramFromList.status == 1 || this.paramFromList.status == 3) {
        return true;
      }
      return false;
    },
    GetDataBy() {
      let param = {
        id: this.paramFromList.id,
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/booking/detail",
        param
      ).then((response) => {
        if (response == null) return;

        let data = response.data;
        this.Model = {
          ...this.Model,
          ...data
        }
        
        const now = this.momentDateToUnix(this.momentDateFormatting(new Date(), 'YYYY-MM-DD HH:mm:ss'), 'YYYY-MM-DD HH:mm:ss');
        if (this.isBookingConfirmation()) {
          this.Model.daysOrHours = this.unixTimeDifference(now, this.Model.payment_hold_until).days + ' days';
          this.Model.isDaysRed = this.unixTimeDifference(now, this.Model.kpi_confirm_by_developer).days > 0;
        } else {
          this.Model.daysOrHours = this.unixTimeDifference(now, this.Model.payment_hold_until).hours + ' hours';
        }
        this.LogBookPropList.param.customer_transaction_id = data.id;
        this.LogBookPropList.initialWhere = data.project_id;
        this.$refs.ref_list.doGetList("");

        this.PI_event_name.dataLookUp.param.project_id = data.project_id;
        this.PI_payment_method.dataLookUp.param.project_id = data.project_id;
        this.PI_promotion_code.dataLookUp.param.project_id = data.project_id;
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
        project_id: this.paramFromList.project_id,
        id: this.paramFromList ? this.paramFromList.id: "",
        promotion_id: this.Model.promotion_id,
        purchase_date: this.momentDateToUnix(this.Model.purchase_date, 'YYYY-MM-DD'),
        project_release_event_name: this.Model.project_release_event_name,
        project_release_id: this.Model.event_name,
        payment_method_id: this.Model.payment_method_id,
        payment_method_name: this.Model.payment_method_name,
        cancel_date: this.momentDateToUnix(this.momentDateFormatting(new Date(), 'YYYY-MM-DD'), 'YYYY-MM-DD'),
        cancel_reason: this.Model.cancel_reason_cd,
        cancel_description: this.Model.cancel_description,
      };
      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard/operation-detail/booking/action', param).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
  },
  mounted() {
    this.GetDataBy();
  }
};
</script>

<style scoped>
hr {
  margin-top: 10px !important;
  margin-bottom: 10px !important;
}
</style>