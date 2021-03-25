<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="4" @click="onPricingCostingClick">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col>
                  <span style="float: left !important;">Standard Pricing & Costing</span> &nbsp;
                </b-col>
              </b-row>
            </div>
            <div class="card__body">
              <div class="card__body__menu">
                <font-awesome-icon style="color: rgb(74, 147, 179);" icon="calculator" size="6x" />
                <br />
                <br />
                <span style="width: 75%">Standard Pricing & Costing Setup</span>
              </div>
            </div>
          </div>
        </b-col>
        <b-col md="4" @click="onCostTypeClick">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col>
                  <span style="float: left !important;">Cost Type</span> &nbsp;
                </b-col>
              </b-row>
            </div>
            <div class="card__body">
              <div class="card__body__menu">
                <font-awesome-icon style="color: rgb(74, 147, 179);" icon="coins" size="6x" />
                <br />
                <br />
                <span style="width: 75%">Cost Type Setup</span>
              </div>
            </div>
          </div>
        </b-col>
        <b-col md="4" @click="onZoneClick">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col>
                  <span style="float: left !important;">Zone</span> &nbsp;
                </b-col>
              </b-row>
            </div>
            <div class="card__body">
              <div class="card__body__menu">
                <font-awesome-icon style="color: rgb(74, 147, 179);" icon="map-marked-alt" size="6x" />
                <br />
                <br />
                <span style="width: 75%">Zone Setup</span>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row class="dashboardBody">
        <b-col md="4" @click="onQuotationCostingAdjusmentClick">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col>
                  <span style="float: left !important;">Quotation Costing Adjusment</span> &nbsp;
                </b-col>
              </b-row>
            </div>
            <div class="card__body">
              <div class="card__body__menu">
                <font-awesome-icon style="color: rgb(74, 147, 179);" icon="sliders-h" size="6x" />
                <br />
                <br />
                <span style="width: 75%">Quotation Costing Adjusment</span>
              </div>
            </div>
          </div>
        </b-col>
        <b-col md="4" @click="onVendorQuotationClick">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col>
                  <span style="float: left !important;">Vendor Quotation</span> &nbsp;
                </b-col>
              </b-row>
            </div>
            <div class="card__body">
              <div class="card__body__menu">
                <font-awesome-icon style="color: rgb(74, 147, 179);" icon="file" size="6x" />
                <br />
                <br />
                <span style="width: 75%">Vendor Quotation</span>
              </div>
            </div>
          </div>
        </b-col>
        <b-col md="4" @click="onOverBudgetApprovalClick">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col>
                  <span style="float: left !important;">Over Budget Approval</span> &nbsp;
                </b-col>
              </b-row>
            </div>
            <div class="card__body">
              <div class="card__body__menu">
                <font-awesome-icon style="color: rgb(74, 147, 179);" icon="clipboard-check" size="6x" />
                <br />
                <br />
                <span style="width: 75%">Over Budget Approval</span>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row class="dashboardBody">
        <b-col md="4" @click="onCustomerStandartCostingClick">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col>
                  <span style="float: left !important;">Customer Standart Costing</span> &nbsp;
                </b-col>
              </b-row>
            </div>
            <div class="card__body">
              <div class="card__body__menu">
                <font-awesome-icon style="color: rgb(74, 147, 179);" icon="dollar-sign" size="6x" />
                <br />
                <br />
                <span style="width: 75%">Customer Standart Costing</span>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {
    onPricingCostingClick() {
      this.$router.push({ name: "OP_PricingCosting" });
    },
    onCostTypeClick() {
      this.$router.push({ name: "OP_CostType" });
    },
    onZoneClick() {
      this.$router.push({ name: "OP_Zone" });
    },
    onQuotationCostingAdjusmentClick() {
      this.$router.push({ name: "MK_QuotationCosting" });
    },
    onVendorQuotationClick() {
      this.$router.push({ name: "OP_VendorQuotation" });
    },
    onOverBudgetApprovalClick() {
      this.$router.push({ name: "OP_OverBudgetApproval" });
    },
    onCustomerStandartCostingClick() {
      this.$router.push({ name: "MK_CustomerStandartCosting" });
    },
  },
  mounted() {},
};
</script>