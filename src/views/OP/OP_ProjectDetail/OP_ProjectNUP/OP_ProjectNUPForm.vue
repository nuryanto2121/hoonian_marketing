<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body" style="font-family: Poppins !important;">
      <div class="">
        <div class="card" style="font-size: 12px !important;">
          <div class="card__body">
            <b-row>
              <b-col style="color: #4A93B3; font-size: 16px;">
                NUP Refund
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
                <div style="
                  height: 140px;
                  background: #FFFFFF;
                  border: 1px solid rgba(45, 71, 175, 0.15);
                  box-sizing: border-box;
                  border-radius: 6px;">
                    <b-img :src="urlHoonian + Model.main_pic" alt=""
                      @error="onImageLoadFailure($event)"
                      style="height: 80px;
                      width: 80px;
                      position: relative;
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);" />
                </div>
              </b-col>
              <b-col lg="10">
                <b-row style="margin-right: 10px !important; margin-bottom: 10px;">
                  <b-col lg="12" class="poppins border-gray" style="margin-left: 5px;">
                    <b-row style="margin-bottom: 10px;">
                      <b-col>
                        <b-row>
                          <b-col lg="7" class="lbl-bold" style="font-size: 16px;">
                            {{Model.principle_name}}
                          </b-col>
                          <b-col lg="5" class="lbl-bold" style="font-size: 16px;">
                            Sales
                          </b-col>
                        </b-row>
                        <b-row style="margin-bottom: 10px;">
                          <b-col lg="2" style="color: rgba(51, 51, 153, 0.7)">
                            PIC
                          </b-col>
                          <b-col lg="1">
                            {{Model.pic}}
                          </b-col>
                          <b-col lg="3" style="color: rgba(2, 138, 32, 0.7)">
                            Total Assigned Units
                          </b-col>
                          <b-col lg="1" style="color: rgba(2, 138, 32, 0.7)">
                            {{Model.total_assigned_units}}
                          </b-col>
                          <b-col lg="3" style="color: rgba(51, 51, 153, 0.7)">
                            Total Commission
                          </b-col>
                          <b-col lg="2">
                            {{checkNum((Model.total_commission && Model.total_commission !== '' ? Model.total_commission : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), (Model.total_commission && Model.total_commission !== '' ? Model.total_commission : 0))}} 
                            {{checkDigit((Model.total_commission && Model.total_commission !== '' ? Model.total_commission : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}}
                          </b-col>
                        </b-row>
                        
                        <b-row style="margin-bottom: 10px;">
                          <b-col lg="2" style="color: rgba(51, 51, 153, 0.7)">
                            Total Agent
                          </b-col>
                          <b-col lg="1">
                            {{Model.total_agent}}
                          </b-col>
                          <b-col lg="3" style="color: rgba(255, 199, 0, 0.7)">
                            Total Booked Units
                          </b-col>
                          <b-col lg="1" style="color: rgba(255, 199, 0, 0.7)">
                            {{Model.total_booked_units}}
                          </b-col>
                          <b-col lg="3" style="color: rgba(51, 51, 153, 0.7)">
                            Paid Commission
                          </b-col>
                          <b-col lg="2">
                            {{checkNum((Model.paid_commission && Model.paid_commission !== '' ? Model.paid_commission : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), (Model.paid_commission && Model.paid_commission !== '' ? Model.paid_commission : 0))}} 
                            {{checkDigit((Model.paid_commission && Model.paid_commission !== '' ? Model.paid_commission : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}}
                          </b-col>
                        </b-row>

                        <b-row style="margin-bottom: 10px;">
                          <b-col lg="2" style="color: rgba(51, 51, 153, 0.7)">
                            Total NUP
                          </b-col>
                          <b-col lg="1">
                            {{Model.total_nup}}
                          </b-col>
                          <b-col lg="3" style="color: rgba(255, 0, 69, 0.7)">
                            Total Sold Units
                          </b-col>
                          <b-col lg="1" style="color: rgba(255, 0, 69, 0.7)">
                            {{Model.total_sold_units}}
                          </b-col>
                          <b-col lg="3" style="color: rgba(51, 51, 153, 0.7)">
                            Outstanding Commission
                          </b-col>
                          <b-col lg="2">
                            {{checkNum((Model.outstd_commission && Model.outstd_commission !== '' ? Model.outstd_commission : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), (Model.outstd_commission && Model.outstd_commission !== '' ? Model.outstd_commission : 0))}} 
                            {{checkDigit((Model.outstd_commission && Model.outstd_commission !== '' ? Model.outstd_commission : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}}
                          </b-col>
                        </b-row>

                        <hr />
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col class="border-gray" style="text-align: center;">
                        <b-row>
                          <b-col class="lbl-bold">
                            Contribution
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col lg="4">
                            <div style="background: linear-gradient(180deg, #2DA8AF 0%, #2D47AF 100%); border-radius: 10px; width: 80px; height: 80px; color: white; font-size: 17px;">
                              <div class="center">
                                {{Model.contribution_percentage}}%
                              </div>
                            </div>
                          </b-col>
                          <b-col lg="4">
                            <div style="background: linear-gradient(180deg, #FFC700 0%, #FF9900 100%); border-radius: 10px; width: 80px; height: 80px; color: white; font-size: 17px;">
                              <div class="center">
                                {{checkNum((Model.contribution_value && Model.contribution_value !== '' ? Model.contribution_value : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), (Model.contribution_value && Model.contribution_value !== '' ? Model.contribution_value : 0))}} 
                                {{checkDigit((Model.contribution_value && Model.contribution_value !== '' ? Model.contribution_value : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), true)}}
                              </div>
                            </div>
                          </b-col>
                          <b-col lg="4">
                            <div style="background: linear-gradient(180deg, #FF5151 0%, #FE8D4D 100%); border-radius: 10px; width: 80px; height: 80px; color: white; font-size: 17px;">
                              <div class="center">
                                {{Model.token}}
                                <br />
                                <span style="font-size: 12px;">Token</span>
                              </div>
                            </div>
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col class="border-gray" style="text-align: center;">
                        <b-row>
                          <b-col class="lbl-bold">
                            NUP Value
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col class="lbl-bold" style="font-size: 20px; color: #4A93B3; margin-bottom: 0px !important;">
                            IDR {{Model.nup_value && Model.nup_value !== '' ? isCurrency(Model.nup_value, 0) : 0}}
                          </b-col>
                        </b-row>
                        <hr />
                        <b-row>
                          <b-col class="lbl-bold" style="color: #4A93B3; margin-bottom: 0px !important;">
                            IDR {{Model.total_nup && Model.total_nup !== '' ? isCurrency(Model.total_nup, 0) : 0}} / NUP
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="6">
                    <label class="lbl-bold">Refund Date</label>
                    <HOODateTime
                      :prop="PI_refund_date"
                      @input="OnRefundDateChange"
                      v-model="Model.refund_date"
                      ref="ref_refund_date"
                    />
                  </b-col>
                  <b-col lg="6">
                    <label class="lbl-bold">Reference No</label>
                    <ACCTextBox
                      :prop="PI_reference_no"
                      v-model="Model.reference_no"
                      ref="ref_referencece_no"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="12">
                    <label class="lbl-bold">Remarks</label>
                    <ACCTextArea
                      :prop="PI_remarks"
                      v-model="Model.remarks"
                      ref="ref_remarks"
                    />
                  </b-col>
                </b-row>

                <b-row>
                  <b-col lg="12" style="padding-left: unset !important; padding-right: unset !important;">
                    <label class="lbl-bold" style="margin-bottom: unset !important; margin-left: 5px;">Buyer Details</label>
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
                          Refund
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      isHeaderSelected: false,
      Model: {
        main_pic: "",
        contribution_percentage: "",
        contribution_value: 0,
        nup_value: 0,
        outstd_commission: 0,
        paid_commission: 0,
        pic: "",
        principle_id: "",
        principle_name: "",
        token: 0,
        total_agent: 0,
        total_assigned_units: 0,
        total_booked_units: 0,
        total_commission: 0,
        total_nup: 0,
        total_sold_units: 0,
        value: "",

        refund_date: "",
        reference_no: "",
        remarks: "",
      },
      PI_refund_date: {
        cValidate: "required",
        cName: "refund date",
        cOrder: 1,
        cKey: false,
        cProtect: false,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_reference_no: {
        cValidate: "required",
        cName: "reference no",
        cOrder: 2,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      PI_remarks: {
        cValidate: "max:5000",
        cName: "remarks",
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
      AssignUnitPropList: {
        url: "/api/hoonian-website/dashboard/operation-detail/nup/buyer-list",
        initialWhere: "",
        SortField: "",
        SortBy: "",
        ParamWhere: "",
        param: {
          nup_id: "",
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
          key: "buyer_name",
          label: "Buyer Name",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "id_no",
          label: "ID No",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "handphone",
          label: "Handphone",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "nup_event",
          label: "NUP Event",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        // {
        //   key: "nup_date",
        //   label: "NUP Date",
        //   tdClass: "ContentACCList2 notranslate th-cus-center poppins",
        //   thClass: "HeaderACCList2 th-cus-center poppins",
        // },
        {
          key: "total_nup",
          label: "Total NUP",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "selected",
          label: "Refund",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
          isCustom: true,
        },
      ],
      assignUnitItems: [],
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
        project_id: this.paramFromList.project_id,
        principle_id: this.paramFromList.DetailList2.id,
        nup_id: this.paramFromList.DetailList.nup_id,
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/nup/detail",
        param
      ).then((response) => {
        if (response == null) return;
        let data = response.data;
        this.Model = {
          ...this.Model,
          ...data,
        };
      });
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
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
      // this.Model.header_body_text_id = this.paramFromList.header_body_text_id;
      let paramD = [];
      for (let i = 0; i < this.assignUnitItems.length; i++) {
        if (this.assignUnitItems[i].selected)
          paramD.push({
            nup_no: this.assignUnitItems[i].nup_no,
          });
      }

      let param = {
        nup_id: this.paramFromList.DetailList ? this.paramFromList.DetailList.nup_id: "",
        refund_date: this.momentDateToUnix(this.Model.refund_date, 'YYYY-MM-DD HH:mm'),
        reference_no: this.Model.reference_no,
        remarks: this.Model.remarks,
        nup: paramD,
        include: true,
      };
      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard/operation-detail/nup/refund', param).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
  },
  mounted() {
    if (this.inputStatus == "edit") {
      this.title = "Edit";
      this.GetDataBy();
    } else {
      this.title = "Add";
    }
    this.AssignUnitPropList.param.nup_id = this.paramFromList.DetailList ? this.paramFromList.DetailList.nup_id: "";
    this.AssignUnitPropList.param.principle_id = this.paramFromList.DetailList2.id;
    this.AssignUnitPropList.initialWhere = this.paramFromList.project_id;
    this.$refs.ref_list.doGetList("");
  }
};
</script>
<style scoped>
.center {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>