<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col lg="12" xl="12" style="background: white;">
          <b-row style="margin-top: 10px; margin-bottom: 20px;">
            <b-col sm="2" align-self="center">
              MARKETING
            </b-col>
            <b-col sm="3">
              <HOODropDown
                @change="OnMarketingChange"
                :prop="PI_marketing"
                v-model="marketingId"
                :label="marketingLabel"
                ref="ref_marketing"
              />
            </b-col>
          </b-row>
          <template v-for="(data, index) in Model">
            <b-row style="background: #F8F8F8; padding-top: 10px; padding-bottom: 10px;" :key="data.id">
              <b-col>
                <b-img :src="urlHoonian + data.icon_project" alt=""
                  :style="`height: 80px;`" @error="onImageLoadFailure($event)" />
              </b-col>
              <b-col sm="10">
                <b-row>
                  <b-col>
                    <span style="color: #4A93B3;">
                      {{data.project_name}}
                    </span>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <label class="lbl-poppins">{{ $t('unit_sold') }}</label>
                    <br />
                    <span style="color: #4A93B3;">
                      {{data.unit_sold}}
                      <!-- {{checkNum(data.unit_sold? data.unit_sold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','): "0", data.unit_sold)}}
                      {{checkDigit(data.unit_sold? data.unit_sold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','): "0", true)}} -->
                    </span>
                  </b-col>
                  <b-col>
                    <label class="lbl-poppins">{{ $t('total_sales') }}</label>
                    <br />
                    <span style="color: #4A93B3;">
                      {{checkNum(data.total_sales? data.total_sales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','): "0", data.total_sales)}}
                      {{checkDigit(data.total_sales? data.total_sales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','): "0", true)}}
                    </span>
                  </b-col>
                  <b-col>
                    <label class="lbl-poppins">{{ $t('total_commission') }}</label>
                    <br />
                    <span style="color: #4A93B3;">
                      {{checkNum(data.total_commission? data.total_commission.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','): "0", data.total_commission)}}
                      {{checkDigit(data.total_commission? data.total_commission.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','): "0", true)}}
                    </span>
                  </b-col>
                  <b-col>
                    <label class="lbl-poppins">{{ $t('remaining_commission') }}</label>
                    <br />
                    <span style="color: #4A93B3;">
                      {{checkNum(data.remaining_commission? data.remaining_commission.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','): "0", data.remaining_commission)}}
                      {{checkDigit(data.remaining_commission? data.remaining_commission.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','): "0", true)}}
                    </span>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <HOOList
              :key="data.id"
              :prop="data.propList"
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
              :cHeader="salesHeader"
              :ref="`ref_sales_${index}`"
              @buttonViewClicked="doViewClick"
              ButtonBackDisabled
              SearchDisabled
              isHeaderFixed
              noCard
              removeCardTitle
              removePaddingTopBody
            >
              <template slot="TitleTable">
              </template>
              <template slot="date" slot-scope="data">
                {{momentUnix(data.item.date, "DD MMM YYYY")}}
              </template>
              <template slot="price" slot-scope="data">
                {{checkNum(data.item.price? data.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','): "0", data.item.price)}}
                {{checkDigit(data.item.price? data.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','): "0", true)}}
              </template>
              <template slot="status" slot-scope="data">
                <b-row>
                  <b-col :style="data.item.status == 'Booked'? 'color: #F2C94C;':
                        (data.item.status == 'Sold'? 'color: #F2994A;':
                        (data.item.status == 'Cancelled'? 'color: #EB5757;': 'color: #828282'))">
                    {{ data.item.status? data.item.status: "" }}
                  </b-col>
                  <b-col align-self="center" v-if="data.item.status=='Hold (Waiting for Payment)'" sm="2">
                    <b-img :src="require('@/assets/icon-svg/ic_delete.svg')" alt="" style="" @click.stop="doCancel(data.item)" />
                  </b-col>
                </b-row>
              </template>
            </HOOList>
          </template>
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
      marketingId: "all",
      marketingLabel: "All",
      Model: [],
      salesHeader: [
        {
          key: "no",
          label: "NO",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
        {
          key: "buyer_name",
          label: "BUYER NAME",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
        {
          key: "marketing",
          label: "MARKETING",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
        {
          key: "tower",
          label: "TOWER",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
        {
          key: "unit_no",
          label: "UNIT NO",
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
          key: "price",
          label: "PRICE",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
        {
          key: "status",
          label: "STATUS",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
      ],
      PI_marketing: {
        dataLookUp: {
          url: "/api/hoonian-website/principle-marketing-lookup",
          param: {
            principle_id: '',
          }
        },
        cValidate: "required",
        cName: "Marketing",
        ckey: false,
        cOrder: 1,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
        cClearable: false,
      },
    }
  },
  methods: {
    OnMarketingChange(data) {
      this.$nextTick(() => {
        this.marketingId = data.id;
        this.marketingLabel = data.label;
        this.getSales();
      })
    },
    onCancelSuccess() {
      this.getSales();
    },
    doCancel(data) {
      this.customer_transaction_id = data.id;
      this.$refs.MK_SalesCancel._show();
    },
    rowClicked(data) {
      let param = data;
      param.isEdit = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "MK_SalesDetail" });
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    getSales() {
      let param = {
        company_group_id: this.company_group_id,
        principle_id: this.getDataUser().principle_id,
      };

      this.postJSON(this.urlHoonian + '/api/marketing-website/sales/sales-header', param).then((response) => {
        if (response == null) return;
        let data = response.data;

        this.Model = [];
        for (let i = 0; i < data.length; i++) {
          this.Model.push({
            ...data[i],
            propList: {
              url: "/api/marketing-website/sales/sales-grid",
              initialWhere: "",
              SortField: "",
              SortBy: "desc",
              ParamWhere: "",
              param: {
                principle_id: this.getDataUser().principle_id,
                project_id: data[i].id,
                marketing_id: this.marketingId,
              }
            }
          });
        }
        
        this.$nextTick(() => {
          this.renderList();
        })
      });
    },
    renderList() {
      for (let i = 0; i < this.Model.length; i++) {
        this.$refs['ref_sales_'+i][0].doGetList("");
      }
    },
  },
  mounted() {
    this.getSales();
    this.PI_marketing.dataLookUp.param.principle_id = this.getDataUser().principle_id;
  },
};
</script>

<style scoped>
</style>
