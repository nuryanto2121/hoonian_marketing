<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body" style="font-family: Poppins !important;">
      <div class="">
        <div class="card" style="font-size: 12px !important;">
          <div class="card__body">
            <b-row>
              <b-col style="color: #4A93B3; font-size: 16px;">
                Sales Cancellation
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
                    Buyer
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
                        <b-img :src="urlHoonian + Model.pic" alt="" style="cursor: pointer;"
                          @error="onImageLoadFailure($event)" width="100" height="70" @click="showImage(Model.pic)" />
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                
                <b-row>
                  <b-col lg="2" style="color: #4A93B3; font-size: 16px;" class="poppins">
                    Project Details
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
                            Agreement No
                          </b-col>
                        </b-row>
                        <hr />
                        <b-row>
                          <b-col class="lbl-bold">
                            {{Model.agreement_no}}
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col class="border-gray">
                        <b-row>
                          <b-col style="color: gray;">
                            Purchase Date
                          </b-col>
                        </b-row>
                        <hr />
                        <b-row>
                          <b-col class="lbl-bold">
                            {{momentUnix(Model.purchased_date, 'DD MMM YYYY')}}
                          </b-col>
                        </b-row>
                      </b-col>
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
                      <b-col class="border-gray">
                        <b-row>
                          <b-col style="color: gray;">
                            Payment Method
                          </b-col>
                        </b-row>
                        <hr />
                        <b-row>
                          <b-col class="lbl-bold">
                            {{Model.payment_method_name}}
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
                            {{ isCurrency(Model.price, decimal) }}
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
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
    <ABSModalImage id="Modal_Image" ref="Modal_Image" size="md" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      
      Model: {
        id: "",
        name: null,
        id_no: null,
        marketing_name: "",
        principle_name: "",
        pic: null,
        project_name: "",
        tower_cluster_name: "",
        block_floor_name: "",
        unit_type_name: "",
        unit_no: "",
        purchased_date: 0,
        project_release_event_name: null,
        payment_method_name: "",
        price: "0",
        last_edit: "",
        updated_at: 0,

        cancel_reason_cd: "",
        cancel_reason_cdLabel: "",
        cancel_date: "",
        cancel_description: "",
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
        cOrder: 1,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
        cClearable: false,
        isShow: true,
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
      PI_cancel_description: {
        cValidate: "max:5000",
        cName: "cancel description",
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
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
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
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/cancellation/detail",
        param
      ).then((response) => {
        if (response == null) return;

        let data = response.data;
        this.Model = data;        
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
        cancel_reason: this.Model.cancel_reason_cd,
        cancel_date: this.momentDateToUnix(this.Model.cancel_date, 'YYYY-MM-DD HH:mm'),
        cancel_description: this.Model.cancel_description,
      };
      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard/operation-detail/cancellation/action', param).then((response) => {
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