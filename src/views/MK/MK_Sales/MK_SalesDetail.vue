<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col lg="12" xl="12" style="background: white;">
          <b-row style="font-size: 15px !important; margin-top: 20px;">
            <b-col sm="6" style="padding-left: unset !important;">
              <b-row>
                <b-col sm="4">
                  <label class="lbl-poppins">{{ $t('id_no') }}</label>
                </b-col>
                <b-col style="color: #4A93B3;">
                  {{dataBuyerDetail.info.id_no}}
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label class="lbl-poppins">{{ $t('buyer_name') }}</label>
                </b-col>
                <b-col style="color: #4A93B3;">
                  {{dataBuyerDetail.info.name}}
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label class="lbl-poppins">{{ $t('handphone_no') }}</label>
                </b-col>
                <b-col style="color: #4A93B3;">
                  {{dataBuyerDetail.info.handphone}}
                </b-col>
              </b-row>
            </b-col>
            <b-col>
              <label class="lbl-poppins">{{ $t('id_picture') }}</label>
              <br />
              <b-img :src="urlHoonian + dataBuyerDetail.info.ktp_image" alt="" width="100%" @error="onImageLoadFailure($event)" />
            </b-col>
          </b-row>
          <b-row class="row-view" style="margin-top: 20px;">
            <b-col>
              <span class="title-primary"> {{ $t('unit_details') }} </span>
            </b-col>
          </b-row>
          <b-row style="font-size: 15px !important;">
            <b-col sm="6" style="padding-left: unset !important;">
              <b-row>
                <b-col sm="4">
                  <label class="lbl-poppins">{{ $t('project_name') }}</label>
                </b-col>
                <b-col style="color: #4A93B3;">
                  {{dataBuyerDetail.info.project_name}}
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label class="lbl-poppins">{{ $t('unit_no') }}</label>
                </b-col>
                <b-col style="color: #4A93B3;">
                  {{dataBuyerDetail.info.unit_no}}
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label class="lbl-poppins">{{ $t('unit_type') }}</label>
                </b-col>
                <b-col style="color: #4A93B3;">
                  {{dataBuyerDetail.info.unit_type_name}}
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label class="lbl-poppins">{{ $t('date') }}</label>
                </b-col>
                <b-col style="color: #4A93B3;">
                  {{momentUnix(dataBuyerDetail.info.purchase_date, "DD MMM YYYY")}}
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label class="lbl-poppins">{{ $t('price') }}</label>
                </b-col>
                <b-col style="color: #4A93B3;">
                  IDR {{ isCurrency(dataBuyerDetail.info.price, 0) }}
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label class="lbl-poppins">{{ $t('status') }}</label>
                </b-col>
                <b-col :style="dataBuyerDetail.info.status == 'available'? 'color: #219653;':
                        (dataBuyerDetail.info.status == 'sold'? 'color: #EB5757;': 'color: #F2C94C;')">
                  {{ dataBuyerDetail.info.status? dataBuyerDetail.info.status.toUpperCase(): "" }}
                </b-col>
              </b-row>
            </b-col>
            <b-col>
              <b-row>
                <b-col sm="4">
                  <label class="lbl-poppins">{{ $t('booking_fee') }}</label>
                </b-col>
                <b-col style="color: #4A93B3;">
                  IDR {{ isCurrency(dataBuyerDetail.info.booking_fee, 0) }}
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label class="lbl-poppins">{{ $t('tower') }}</label>
                </b-col>
                <b-col style="color: #4A93B3;">
                  {{ dataBuyerDetail.info.tower_cluster_name }}
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label class="lbl-poppins">{{ $t('floor') }}</label>
                </b-col>
                <b-col style="color: #4A93B3;">
                  {{ dataBuyerDetail.info.block_floor_name }}
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label class="lbl-poppins">{{ $t('commission') }}</label>
                </b-col>
                <b-col style="color: #4A93B3;">
                  IDR {{ isCurrency(dataBuyerDetail.info.marketing_commission, 0) }}
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <ABSButton
                    :text="'Booking Cancellation'"
                    classButton="btn btn--default"
                    classIcon="icon-style-1"
                    @click="doCancel"
                    styleButton="height: 40px; width: 30%;"
                  />
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row class="row-view" style="margin-top: 20px;">
            <b-col>
              <span class="title-primary"> {{ $t('virtual_account') }} </span>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="4" v-for="(data, index) in dataBuyerDetail.virtual_accounts" :key="index">
              <div style="background: #FFFFFF; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);">
                <b-row style="margin-top: 10px;">
                  <b-col md="6" style="padding: 10px;">
                    <b-img :src="urlHoonian + data.bank_icon" alt="" width="100%" @error="onImageLoadFailure($event)" />
                  </b-col>
                  <b-col align-self="center" md="6">
                    <div>{{data.bank_name}}</div>
                    <div style="color: #4A93B3;">{{data.virtual_account_no}}</div>
                  </b-col>
                </b-row>
              </div>
            </b-col>
          </b-row>

          <b-row class="row-view" style="margin-top: 20px;">
            <b-col>
              <span class="title-primary"> {{ $t('log_book') }} </span>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form :data-vv-scope="'FormEntry'" :data-vv-value-path="'FormEntry'">
                <span>
                  <label class="lbl-poppins">{{ $t('Description') }}</label>
                </span>
                <ACCTextArea
                  :prop="PI_description"
                  v-model="Model.description"
                  ref="ref_description"
                />
              </b-form>
            </b-col>
          </b-row>
          <b-row style="margin-top: 10px;">
            <b-col>
              <span style="font-weight: bold; font-size: 15px;">{{momentDateFormatting(new Date(), "dddd, DD MMM YYYY")}}</span>
              &nbsp; &nbsp; &nbsp;
              <ABSButton
                :text="'Save'"
                classButton="btn btn--default"
                classIcon="icon-style-1"
                @click="doSave"
                styleButton="height: 40px;width: 20%;"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <HOOList
                :prop="propList"
                :title="''"
                @rowClicked="rowClicked"
                @buttonDeleteClicked="doDeleteClick"
                @rowDblClicked="doDoubleClick"
                @rowLinkClick="rowLink"
                @pageSize="M_PageSize"
                @pagination="M_Pagination"
                @filter="M_Advance_Filter"
                @headTable="M_Head_Table"
                @refreshColumn="refreshColumn"
                :cHeader="logBookHeader"
                ref="ref_list"
                @buttonViewClicked="doViewClick"
                ButtonBackDisabled
                SearchDisabled
                isHeaderFixed
                noCard
                removeCardTitle
                removePaddingTopBody
                noPaging
              >
                <template slot="date" slot-scope="data">
                  {{momentUnix(data.item.date, "DD MMM YYYY")}}
                </template>
              </HOOList>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
    <MKSalesCancel
      ref="MK_SalesCancel"
      :urlAPI="'/api/marketing-website/sales/sales-cancellation'"
      :id="customer_transaction_id"
      @onCancelSuccess="onCancelSuccess"
    />
  </div>
</template>
<script>
import MKSalesCancel from './MK_SalesCancel';
export default {
  components: {
    MKSalesCancel
  },
  computed: {
    paramFromList() {
      let param = this.$store.getters.getParamPage;
      if (param == null || param == undefined) {
        this.doBack();
      } else {
        if (Object.keys(param).length < 1) {
          this.doBack();
        } else {
      return param;
        }
      }
    },
  },
  watch: {
  },
  data() {
    return {
      customer_transaction_id: "",
      Model: {
        description: "",
      },
      dataBuyerDetail: { info: {}, virtual_accounts: [],},
      PI_description: {
        cValidate: "required|max:5000",
        cName: "Description",
        cOrder: 1,
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
      propList: {
        url: "/api/marketing-website/sales/sales-logbook-list",
        initialWhere: "",
        SortField: "",
        SortBy: "desc",
        ParamWhere: "",
        param: {
          customer_transaction_id: "",
        }
      },
      logBookHeader: [
        {
          key: "no",
          label: "NO",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
        {
          key: "date",
          label: "DATE",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
        {
          key: "responder",
          label: "RESPONDER",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
        {
          key: "notes",
          label: "NOTES",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
      ],
    }
  },
  methods: {
    doCancel() {
      this.$refs.MK_SalesCancel._show();
    },
    onCancelSuccess() {
      this.doBack();
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
        project_id: this.dataBuyerDetail.info.project_id,
        customer_transaction_id: this.paramFromList.id,
        marketing_agent_id: this.getDataUser().marketing_id,
        marketing_agent_name: this.getDataUser().user_name,
        description: this.Model.description
      }
      this.postJSON(this.urlHoonian + '/api/marketing-website/sales/sales-logbook-add', param).then((response) => {
        if (response == null) return;
        
        this.Model.description = "";
        this.$refs.ref_list.doGetList("");
      });
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    getSales() {
      console.log(this.paramFromList)
      let param = {
        customer_transaction_id: this.paramFromList.id,
        marketing_agent_id: this.getDataUser().marketing_id,
      };

      this.postJSON(this.urlHoonian + '/api/marketing-website/sales/sales-detail', param).then((response) => {
        if (response == null) return;
        this.dataBuyerDetail = response.data;
      });
    },
  },
  mounted() {
    this.getSales();
    this.propList.param.customer_transaction_id = this.paramFromList.id;
    this.customer_transaction_id = this.paramFromList.id;
    this.$refs.ref_list.doGetList("");
    this.$store.commit("setTitleMenu", "Buyer Details");
  },
};
</script>

<style scoped>
</style>
