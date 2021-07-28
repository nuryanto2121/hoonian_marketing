<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col lg="12" xl="12" style="background: white;">
          <b-row class="row-view" style="margin-top: 20px;">
            <b-col>
              <span class="title-primary" style="font-weight: bold;"> {{ $t('buyer_details') }} </span>
            </b-col>
          </b-row>
          <b-row style="font-size: 15px !important; margin-top: 20px;">
            <b-col cols="12" style="padding-left: unset !important;">
              <b-row>
                <b-col cols="12">
                  <div class="lbl-poppins">{{ $t('buyer_name') }}</div>
                  <div style="color: #4A93B3;">
                    {{dataBuyerDetail.info.name}}
                  </div>
                </b-col>
              </b-row>
              <b-row style="margin-top: 10px;">
                <b-col cols="12">
                  <div class="lbl-poppins">{{ $t('handphone_no') }}</div>
                  <div style="color: #4A93B3;">
                    {{dataBuyerDetail.info.handphone}}
                  </div>
                </b-col>
              </b-row>
              <b-row style="margin-top: 10px;">
                <b-col cols="12">
                  <div class="lbl-poppins">{{ $t('id_no') }}</div>
                  <div style="color: #4A93B3;">
                    {{dataBuyerDetail.info.id_no}}
                  </div>
                </b-col>
              </b-row>
              <b-row style="margin-top: 10px;">
                <b-col cols="12">
                  <b-img :src="urlHoonian + dataBuyerDetail.info.ktp_image" alt="" width="100%" @error="onImageLoadFailure($event)" />
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row class="row-view" style="margin-top: 20px;">
            <b-col>
              <span class="title-primary" style="font-weight: bold;"> {{ $t('unit') }} </span>
            </b-col>
          </b-row>
          <b-row style="font-size: 15px !important;">
            <b-col cols="12" style="padding-left: unset !important;">
              <b-row>
                <b-col cols="12">
                  <div class="lbl-poppins">{{ $t('project_name') }}</div>
                  <div style="color: #4A93B3;">
                    {{dataBuyerDetail.info.project_name}}
                  </div>
                </b-col>
              </b-row>
              <b-row style="margin-top: 10px;">
                <b-col cols="12">
                  <div class="lbl-poppins">{{ $t('tower') }}</div>
                  <div style="color: #4A93B3;">
                    {{ dataBuyerDetail.info.tower_cluster_name }}
                  </div>
                </b-col>
              </b-row>
              <b-row style="margin-top: 10px;">
                <b-col cols="12">
                  <div class="lbl-poppins">{{ $t('unit_type') }}</div>
                  <div style="color: #4A93B3;">
                    {{dataBuyerDetail.info.unit_type_name}}
                  </div>
                </b-col>
              </b-row>
              <b-row style="margin-top: 10px;">
                <b-col cols="5" sm="3">
                  <div class="lbl-poppins">{{ $t('unit_no') }}</div>
                  <div style="color: #4A93B3;">
                    {{dataBuyerDetail.info.unit_no}}
                  </div>
                </b-col>
                <b-col cols="7" sm="9">
                  <div class="lbl-poppins">{{ $t('floor') }}</div>
                  <div style="color: #4A93B3;">
                    {{ dataBuyerDetail.info.block_floor_name }}
                  </div>
                </b-col>
              </b-row>
              <b-row style="margin-top: 10px;">
                <b-col cols="12">
                  <div class="lbl-poppins">{{ $t('date') }}</div>
                  <div style="color: #4A93B3;">
                    {{momentUnix(dataBuyerDetail.info.purchase_date, "DD MMM YYYY")}}
                  </div>
                </b-col>
              </b-row>
              <b-row style="margin-top: 10px;">
                <b-col cols="12">
                  <div class="lbl-poppins">{{ $t('price') }}</div>
                  <div style="color: #4A93B3;">
                    IDR {{ isCurrency(dataBuyerDetail.info.price, 0) }}
                  </div>
                </b-col>
              </b-row>
              <b-row style="margin-top: 10px;">
                <b-col cols="12">
                  <div class="lbl-poppins">{{ $t('booking_fee') }}</div>
                  <div style="color: #4A93B3;">
                    IDR {{ isCurrency(dataBuyerDetail.info.booking_fee, 0) }}
                  </div>
                </b-col>
              </b-row>
              <b-row style="margin-top: 10px;">
                <b-col cols="12">
                  <div class="lbl-poppins">{{ $t('commission') }}</div>
                  <div style="color: #4A93B3;">
                    IDR {{ isCurrency(dataBuyerDetail.info.marketing_commission, 0) }}
                  </div>
                </b-col>
              </b-row>
              <b-row style="margin-top: 10px;">
                <b-col cols="12">
                  <div class="lbl-poppins">{{ $t('status') }}</div>
                  <div :style="dataBuyerDetail.info.status == 'available'? 'color: #219653;':
                          (dataBuyerDetail.info.status == 'sold'? 'color: #EB5757;': 'color: #F2C94C;')">
                    {{ dataBuyerDetail.info.status? dataBuyerDetail.info.status.toUpperCase(): "" }}
                  </div>
                </b-col>
              </b-row>
              <b-row style="margin-top: 20px;">
                <b-col cols="12">
                  <ABSButton
                    :text="$t('booking_cancellation')"
                    classButton="btn btn--default"
                    classIcon="icon-style-1"
                    @click="doCancel"
                    styleButton="height: 40px; width: 100%;"
                  />
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row class="row-view" style="margin-top: 20px;">
            <b-col>
              <span class="title-primary" style="font-weight: bold;"> {{ $t('virtual_account') }} </span>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="8" sm="4" v-for="(data, index) in dataBuyerDetail.virtual_accounts" :key="index">
              <div style="background: #FFFFFF; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);">
                <b-row style="margin-top: 10px;">
                  <b-col cols="5" sm="4" style="padding: 10px;">
                    <b-img :src="urlHoonian + data.bank_icon" alt="" width="70px" height="70px" @error="onImageLoadFailure($event)" />
                  </b-col>
                  <b-col cols="7" sm="8" align-self="center">
                    <div>{{data.bank_name}}</div>
                    <div style="color: #4A93B3;">{{data.virtual_account_no}}</div>
                  </b-col>
                </b-row>
              </div>
            </b-col>
          </b-row>

          <b-row class="row-view" style="margin-top: 20px;">
            <b-col>
              <span class="title-primary" style="font-weight: bold;"> {{ $t('log_book') }} </span>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
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
            </b-col>
          </b-row>
          <b-row style="margin-top: 10px;">
            <b-col>
              <ABSButton
                :text="$t('save')"
                classButton="btn btn--default"
                classIcon="icon-style-1"
                @click="doSave"
                styleButton="height: 40px;width: 100%;"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
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
        cValidate: "required|max:60",
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
          thClass: "HeaderACCList2 th-cus-left poppins XS",
        },
        {
          key: "date",
          label: this.$t('date').toUpperCase(),
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins S",
        },
        {
          key: "responder",
          label: this.$t('responder').toUpperCase(),
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
        {
          key: "notes",
          label: this.$t('notes').toUpperCase(),
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
      ],
    }
  },
  methods: {
    doCancel() {
      this.alertConfirmation("Confirm Project Selection ?").then(
        (ress) => {
          if (ress.value) {
            this.$refs.MK_SalesCancel._show();
          }
        }
      );
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
    this.$store.commit("setTitleMenu", this.$t('buyer_details'));
  },
};
</script>

<style scoped>
</style>
