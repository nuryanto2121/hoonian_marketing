<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col lg="12" xl="12" style="background: white;">
          <b-row style="font-size: 15px !important; margin-top: 20px;">
            <b-col sm="4" style="padding-left: unset !important;">
              <b-row>
                <b-col>
                  <label class="lbl-poppins">{{ $t('id_no') }}</label>
                </b-col>
                <b-col style="color: #4A93B3;">
                  {{dataBuyerDetail.info.id_no}}
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <label class="lbl-poppins">{{ $t('buyer_name') }}</label>
                </b-col>
                <b-col style="color: #4A93B3;">
                  {{dataBuyerDetail.info.name}}
                </b-col>
              </b-row>
              <b-row>
                <b-col>
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
                <b-col>
                  <label class="lbl-poppins">{{ $t('project_name') }}</label>
                </b-col>
                <b-col style="color: #4A93B3;">
                  {{dataBuyerDetail.info.project_name}}
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <label class="lbl-poppins">{{ $t('unit_no') }}</label>
                </b-col>
                <b-col style="color: #4A93B3;">
                  {{dataBuyerDetail.info.unit_no}}
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <label class="lbl-poppins">{{ $t('unit_type') }}</label>
                </b-col>
                <b-col style="color: #4A93B3;">
                  {{dataBuyerDetail.info.unit_type_name}}
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <label class="lbl-poppins">{{ $t('date') }}</label>
                </b-col>
                <b-col style="color: #4A93B3;">
                  {{momentUnix(dataBuyerDetail.info.purchase_date, "DD MMM YYYY")}}
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <label class="lbl-poppins">{{ $t('price') }}</label>
                </b-col>
                <b-col style="color: #4A93B3;">
                  {{ isCurrency(dataBuyerDetail.info.price, 0) }}
                </b-col>
              </b-row>
              <b-row>
                <b-col>
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
                <b-col>
                  <label class="lbl-poppins">{{ $t('booking_fee') }}</label>
                </b-col>
                <b-col style="color: #4A93B3;">
                  {{ isCurrency(dataBuyerDetail.info.booking_fee, 0) }}
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <label class="lbl-poppins">{{ $t('tower') }}</label>
                </b-col>
                <b-col style="color: #4A93B3;">
                  {{ dataBuyerDetail.info.tower_cluster_name }}
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <label class="lbl-poppins">{{ $t('floor') }}</label>
                </b-col>
                <b-col style="color: #4A93B3;">
                  {{ dataBuyerDetail.info.block_floor_name }}
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <label class="lbl-poppins">{{ $t('commission') }}</label>
                </b-col>
                <b-col style="color: #4A93B3;">
                  {{ isCurrency(dataBuyerDetail.info.marketing_commission, 0) }}
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

          <b-row style="margin-top: 20px;">
            <b-col>
              <span class="title-primary"> {{ $t('log_book') }} </span>
            </b-col>
          </b-row>
          
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
export default {
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
      dataBuyerDetail: { info: {}, virtual_accounts: [],},
    }
  },
  methods: {
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
  },
};
</script>

<style scoped>
</style>
