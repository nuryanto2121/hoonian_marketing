<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col lg="12" xl="12">
            <div class="card">
                <div class="card__title" style="padding-bottom: 5px !important;">
                <b-row class="title-primary">
                    <b-col style="max-width: max-content !important;">
                      <span style="font-size: 18px; color: #4a93b3;">Commission Payment</span>
                    </b-col>
                    <b-col class="col-right">
                        <span>
                            <ABSButton
                                :text="'Back'"
                                classButton="button button--back"
                                classIcon="icon-style-1"
                                @click="doBack"
                                styleButton="margin-right: unset !important;"
                            />
                        </span>
                    </b-col>
                </b-row>
                </div>
            </div>
            <div class="card">
                <div class="card__body">
                    <b-form
                        :data-vv-scope="'FormEntry'"
                        :data-vv-value-path="'FormEntry'"
                    >
                    <b-row>
                        <b-col lg="2" xl="2">
                            <b-row style="margin-bottom: 10px;">
                                <b-col lg="12" xl="12" style="margin-right: 20px; border: solid 1px #dfe3f3; border-radius: 6px; padding: 15px !important; text-align: center;">
                                    <b-img :src="urlHoonian + Model.main_pic" alt="" style="height: 120px !important; width: 120px !important;" fluid-grow rounded @error="onImageLoadFailure($event)" />
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col style="border: solid 1px #dfe3f3; border-radius: 6px; padding: 15px !important; text-align: center;">
                            <b-row>
                                <b-col lg="6" xl="6">
                                    <div class="principle-name">
                                        <span>{{Model.principle_name}}</span>
                                    </div>
                                </b-col>
                                <b-col lg="5" xl="5" offset-lg="1" offset-xl="1">
                                    <div class="principle-name" style="font-size: 15px;">
                                        <span>Sales</span>
                                    </div>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col lg="3" xl="3">
                                    <!-- <div class="principle-name">
                                        <span>{{data.principle_name}}</span>
                                    </div> -->
                                    <b-row style="margin-bottom: 10px;">
                                        <b-col lg="6" xl="6" class="label">
                                            <span>PIC</span>
                                        </b-col>
                                        <b-col lg="6" xl="6" class="label-text-bold">
                                            <span style="margin-left: 10px;">{{Model.name}}</span>
                                        </b-col>
                                    </b-row>
                                    <b-row style="margin-bottom: 10px;">
                                        <b-col lg="6" xl="6" class="label">
                                            <span>Total Agent</span>
                                        </b-col>
                                        <b-col lg="6" xl="6" class="label-text">
                                            <span style="margin-left: 10px;">{{Model.total_agent}}</span>
                                        </b-col>
                                    </b-row>
                                    <b-row style="margin-bottom: 10px;">
                                        <b-col lg="6" xl="6" class="label">
                                            <span>Total NUP</span>
                                        </b-col>
                                        <b-col lg="6" xl="6" class="label-text">
                                            <span style="margin-left: 10px;">{{Model.total_nup}}</span>
                                        </b-col>
                                    </b-row>
                                </b-col>
                                <b-col lg="4" xl="4">
                                    <b-row style="margin-bottom: 10px;">
                                        <b-col lg="9" xl="9" class="label-assigned">
                                            <span>Total Assigned Units</span>
                                        </b-col>
                                        <b-col lg="2" xl="2" class="label-text-assigned">
                                            <span>{{Model.total_unit_assigned}}</span>
                                        </b-col>
                                    </b-row>
                                    <b-row style="margin-bottom: 10px;">
                                        <b-col lg="9" xl="9" class="label-booked">
                                            <span>Total Booked Units</span>
                                        </b-col>
                                        <b-col lg="2" xl="2" class="label-text-booked">
                                            <span>{{Model.total_unit_booked}}</span>
                                        </b-col>
                                    </b-row>
                                    <b-row style="margin-bottom: 10px;">
                                        <b-col lg="9" xl="9" class="label-sold">
                                            <span>Total Sold Units</span>
                                        </b-col>
                                        <b-col lg="2" xl="2" class="label-text-sold">
                                            <span>{{Model.total_unit_sold}}</span>
                                        </b-col>
                                    </b-row>
                                </b-col>
                                <b-col lg="5" xl="5">
                                    <!-- <div class="principle-name">
                                        <span>Sales</span>
                                    </div> -->
                                    <b-row style="margin-bottom: 10px;">
                                        <b-col lg="8" xl="8" class="label">
                                            <span>Total Commission</span>
                                        </b-col>
                                        <b-col lg="4" xl="4" class="label-text">
                                            <span>
                                                {{checkNum((Model.total_commssion && Model.total_commssion !== '' ? Model.total_commssion : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), (Model.total_commssion && Model.total_commssion !== '' ? Model.total_commssion : 0))}} 
                                                {{checkDigit((Model.total_commssion && Model.total_commssion !== '' ? Model.total_commssion : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}}
                                            </span>
                                        </b-col>
                                    </b-row>
                                    <b-row style="margin-bottom: 10px;">
                                        <b-col lg="8" xl="8" class="label">
                                            <span>Paid Commission</span>
                                        </b-col>
                                        <b-col lg="4" xl="4" class="label-text">
                                            <span>
                                                {{checkNum((Model.paid_commssion && Model.paid_commssion !== '' ? Model.paid_commssion : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), (Model.paid_commssion && Model.paid_commssion !== '' ? Model.paid_commssion : 0))}} 
                                                {{checkDigit((Model.paid_commssion && Model.paid_commssion !== '' ? Model.paid_commssion : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}}
                                            </span>
                                        </b-col>
                                    </b-row>
                                    <b-row style="margin-bottom: 10px;">
                                        <b-col lg="8" xl="8" class="label">
                                            <span>Outstanding Commission</span>
                                        </b-col>
                                        <b-col lg="4" xl="4" class="label-text">
                                            <span>
                                                {{checkNum((Model.outstanding_commssion && Model.outstanding_commssion !== '' ? Model.outstanding_commssion : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), (Model.outstanding_commssion && Model.outstanding_commssion !== '' ? Model.outstanding_commssion : 0))}} 
                                                {{checkDigit((Model.outstanding_commssion && Model.outstanding_commssion !== '' ? Model.outstanding_commssion : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}}
                                            </span>
                                        </b-col>
                                    </b-row>
                                </b-col>
                            </b-row>

                            <hr style="border-color: #ededed; margin: 0 !important;" />

                            <b-row style="margin-top: 20px;" class="poppins">
                                <b-col style="margin-right: 10px; border: solid 1px #dfe3f3; border-radius: 6px; padding: 10px !important; text-align: center;">
                                    <div class="progress-x">
                                        <span>Contribution</span>
                                    </div>
                                    <b-row>
                                        <b-col style="margin-right: 10px; min-height: 90px; background: #2d5aaf; border-radius: 4px; color: white; text-align: center;">
                                            <div class="center" style="font-size: 35px; font-weight: bold;">
                                                {{Model.contribution_percent}}<span style="font-size: 18px;">%</span>
                                            </div>
                                        </b-col>
                                        <b-col style="margin-right: 10px; min-height: 90px; background: #ffbd01; border-radius: 4px; color: white; text-align: center;">
                                            <div class="center" style="font-size: 35px; font-weight: bold; width: 100%">
                                                {{checkNum((Model.contribution_value && Model.contribution_value !== '' ? Model.contribution_value : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), (Model.contribution_value && Model.contribution_value !== '' ? Model.contribution_value : 0))}}
                                                {{checkPref((Model.contribution_value && Model.contribution_value !== '' ? Model.contribution_value : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}}
                                            </div>
                                        </b-col>
                                        <b-col style="min-height: 90px; background: #fe714f; border-radius: 4px; color: white; text-align: center;">
                                            <div class="center" style="font-size: 35px; font-weight: bold;">
                                                {{Model.total_token}}
                                                <div class="token-text">
                                                    <span>Token</span>
                                                </div>
                                            </div>
                                        </b-col>
                                    </b-row>
                                </b-col>
                                <b-col lg="6" xl="6" style="margin-right: 10px; border: solid 1px #dfe3f3; border-radius: 6px; padding: 10px !important; text-align: center;">
                                    <!-- <div class="progress-x">
                                        <span>NUP Value</span>
                                    </div> -->
                                    <div style="margin-top: 20px;">
                                        <span class="label" style="font-size: 30px;">IDR {{checkNum((Model.paid_commssion && Model.paid_commssion !== '' ? Model.paid_commssion : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), (Model.paid_commssion && Model.paid_commssion !== '' ? Model.paid_commssion : 0))}}</span>
                                    </div>
                                    <hr>
                                    <span style="font-size: 15px;" class="label"> Release Commission </span>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                    <b-row style="margin-top: 5px;">
                      <b-col md="5" offset-md="2">
                        <span>
                          <label class="lbl-bold poppins"> Payment Date </label>
                        </span>
                        <HOODateTime
                          @input="Onpayment_dateChange"
                          :prop="PI_payment_date"
                          v-model="Model.payment_date"
                          ref="ref_payment_date"
                        />
                      </b-col>
                      <b-col md="5">
                          <span>
                          <label class="lbl-bold poppins"> Reference No </label>
                        </span>
                        <ACCTextBox
                          :prop="PI_reference_no"
                          v-model="Model.reference_no"
                          ref="ref_reference_no"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="10" offset-md="2">
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
                    <b-row>
                        <b-col md="10" offset-md="2">
                            <span>
                                <label class="lbl-bold poppins"> Sales Detail </label>
                            </span>
                            <HOOList
                                :prop="SalesDetailPropList"
                                :title="''"
                                cClass="table-style-3_noAct"
                                ButtonBackDisabled
                                SearchDisabled
                                noCard
                                isPoppins
                                isHeaderFixed
                                :cHeader="SalesDetailHeader"
                                ref="ref_list"
                                @rowClicked="rowClicked"
                                removeCardTitle
                                removePaddingTopBody
                                @onRenderData="eventDataRender"
                            >
                                <template slot="paid" slot-scope="data">
                                    <div style="margin-left: 20px">
                                    <b-form-checkbox
                                        v-model="data.item.paid"
                                        :name="'paid_' + data.item.id"
                                        size="md"
                                        @input="onChangeSelected(data.item)"
                                    />
                                    </div>
                                </template>
                                <template slot="selling_price" slot-scope="data">
                                    {{isCurrency(data.item.selling_price, decimal)}}
                                </template>
                                <template slot="commission" slot-scope="data">
                                    {{isCurrency(data.item.commission, decimal)}}
                                </template>
                                <!-- <template slot="sales_date" slot-scope="data">
                                    {{isCurrency(data.item.sales_date, decimal)}}
                                </template> -->
                                <template slot="head_paid" slot-scope="data">
                                    <span style="margin-left: 20px;">
                                    Paid
                                    </span>
                                    <b-form-checkbox
                                    style="display: inline-block;"
                                    v-model="isHeaderSelected"
                                    :name="'head_paid'"
                                    size="sm"
                                    @input="onChangeHeaderSelected"
                                    />
                                </template>
                                </HOOList>
                        </b-col>
                    </b-row>
                    <b-row style="margin-top: 10px">
                      <b-col md="6" offset-md="4">
                        <ABSButton
                          :text="'Confirm'"
                          classButton="btn btn--default"
                          classIcon="icon-style-default"
                          @click="doSave"
                          styleButton="height: 40px;width: 100%;"
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
export default {
  props: ['title'],
  computed: {
    paramFromList() {
      var param = this.$store.getters.getParamPage;
      return param;
    },
  },
  data() {
    return {
    isHeaderSelected: false,
      Model: {
        payment_date: "",
        reference_no: "",
        remarks: ""
      },
      search: "",
      
      ModelProject: [],
      
      PI_payment_date: {
        cValidate: "required",
        cName: "payment_date",
        cOrder: 1,
        cKey: false,
        cProtect: false,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_reference_no: {
        cValidate: "",
        cName: "reference_no",
        cOrder: 2,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_remarks: {
        cValidate: "max:5000",
        cName: "remarks",
        cOrder: 3,
        cKey: false,
        cProtect: false,
        cResize: false,
        cReadonly: false,
        cRows: 3,
        cMaxRows: 3,
        cSize: "md",
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus
      },
      SalesDetailPropList: {
        url: "/api/hoonian-website/dashboard/operation-detail/principle/unpaid",
        initialWhere: "",
        SortField: "",
        SortBy: "",
        ParamWhere: "",
        param: {
          principe_id: "",
        }
      },
      SalesDetailHeader: [
        {
          key: "no",
          label: "No",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "project_name",
          label: "Project Name",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "unit_no",
          label: "Unit No",
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
          key: "sales_date",
          label: "Sales Date",
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
          key: "commission",
          label: "Commission",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "paid",
          label: "Paid",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
          isCustom: true,
        },
      ],
      SalesDetailItems: [],
    };
  },
  methods: {
    doBack() {
      this.$router.go(-1);
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    onChangeHeaderSelected(data) {
        console.log(data)
      for (let i = 0; i < this.SalesDetailItems.length; i++) {
        this.SalesDetailItems[i].paid = data;
      }

      this.$refs.ref_list.reRender();
    },
    onChangeSelected(data) {
    },
    GetDataBy() {
        let param = {
            project_id: this.paramFromList.project_id,
            principle_id: this.paramFromList.principle_id
        }
        this.SalesDetailPropList.param.principle_id = this.paramFromList.principle_id;

      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/principle/header",
        param
      ).then((response) => {
        if (response == null) return;
        if (response.data == null) return;
        this.Model = response.data[0];
        this.$refs.ref_list.doGetList("");
      });
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
      let paramD = [];
      for (let i = 0; i < this.SalesDetailItems.length; i++) {
        if (this.SalesDetailItems[i].paid)
          paramD.push({
            id: this.SalesDetailItems[i].id,
          });
      }

      let param = {
        principle_id: this.paramFromList.principle_id,
        include: true,
        payment_date: this.momentDateToUnix(this.Model.payment_date, "YYYY-MM-DD"),
        reference_no: this.Model.reference_no,
        remarks: this.Model.remarks,
        transactions: paramD
      };
      
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/principle/release",
        param
      ).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
    eventDataRender(data) {
        this.SalesDetailItems = data;
    },
  },
  mounted() {
    this.GetDataBy();
  },
};
</script>

<style scoped>
.progress-x {
    text-align: center;
    font-weight: bold; font-size: 13px;
    margin-bottom: 20px;
    font-family: "Poppins";
}
.token-text {
    text-align: center;
    font-weight: bold; font-size: 13px;
    /* margin-top: 10px; */
    font-family: "Poppins";
}
.principle-name {
    text-align: left;
    font-weight: bold; font-size: 20px;
    margin-bottom: 10px;
    font-family: "Poppins";
}
.label {
    padding: 0 !important;
    text-align: left;
    font-weight: bold; font-size: 11px;
    color: #7070b8;
    font-family: "Poppins";
}
.label-assigned {
    padding: 0 !important;
    text-align: left;
    font-weight: bold; font-size: 11px;
    color: #4ead63;
    font-family: "Poppins";
}
.label-booked {
    padding: 0 !important;
    text-align: left;
    font-weight: bold; font-size: 11px;
    color: #ffd84d;
    font-family: "Poppins";
}
.label-sold {
    padding: 0 !important;
    text-align: left;
    font-weight: bold; font-size: 11px;
    color: #ff4d7d;
    font-family: "Poppins";
}
.label-text {
    padding: 0 !important;
    text-align: left;
    font-size: 11px;
    font-family: "Poppins";
}
.label-text-bold {
    padding: 0 !important;
    text-align: left;
    font-weight: bold; font-size: 11px;
    font-family: "Poppins";
}
.label-text-assigned {
    padding: 0 !important;
    text-align: left;
    font-weight: bold; font-size: 11px;
    color: #028a20;
    font-family: "Poppins";
}
.label-text-booked {
    padding: 0 !important;
    text-align: left;
    font-weight: bold; font-size: 11px;
    color: #ffc700;
    font-family: "Poppins";
}
.label-text-sold {
    padding: 0 !important;
    text-align: left;
    font-weight: bold; font-size: 11px;
    color: #ff9fb9;
    font-family: "Poppins";
}
@media (min-width: 992px) {
}
@media (min-width: 1200px) {
}
</style>
