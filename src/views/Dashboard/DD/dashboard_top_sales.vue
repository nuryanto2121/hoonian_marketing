<template>
  <div class="card" style="height: 100%">
    <div class="card__title-newdash" style="border-bottom: unset !important;">
      <b-row>
        <b-col style="max-width: max-content !important">
          <!-- <span style="color: #333399">{{title}}</span> -->
          <span style="font-size: 16px; color: #333399;">{{title}}</span>     
        </b-col>
        <b-col style="text-align: right">
          <span>
            <ABSButton
              :text="'View All'"
              classButton="button button--back"
              classIcon="icon-style-1"
              @click="doViewAllTopSales"
            />
          </span>
        </b-col>
      </b-row>
    </div>
    <div class="card__body">
      <ACCFormList
        :prop="TopSalesList_propList"
        @rowClicked="doViewClick"
        :cHeader="TopSales.Header"
        cStatic
        cClass="table-no-em"
        :cData="TopSales.Data"
        ref="ref_AssignUnitsList"
      >
        <template slot="no" slot-scope="data">
          {{ data.index + 1 }}
        </template>

        <template slot="value" slot-scope="data">
          <span>
            <span>{{ fn_money(data.item.value) }}</span>
          </span>
        </template>
      </ACCFormList>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data() {
    return {
      TopSalesList_propList: {
        url: "",
        initialWhere: "",
        SortField: "",
        SortBy: "",
        ParamWhere: "",
      },
      OverdueLabel: "",
      OnHoldLabel: "",
      TopSales: {
        Header: [
          {
            key: "no",
            label: "No",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
          },
          {
            key: "marketing_name",
            label: "Marketing Agent",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
          },
          {
            key: "project_name",
            label: "Project Name",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
          },
          {
            key: "sold_unit",
            label: "Unit Sold",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
          },
          {
            key: "value",
            label: "Value",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
          },
        ],
        Data: [],
      },
    };
  },
  computed: {
    _projectId() {
      return this.$store.getters.getProjectId;
    },
  },
  watch: {
    _projectId(newValue, oldValue) {
      this.projectId = newValue;
      this.getListTopSales();
    },
  },
  methods: {
    fn_money(value) {
      let dd = "";
      if (parseFloat(value / 1000000000) > 1) {
        dd = this.isCurrency(parseFloat(value / 1000000000), 0) + " B";
        // console.log((value/1000000000)+' B' )
      } else {
        dd = this.isCurrency(parseFloat(value / 100000000), 0) + " M";
        // console.log(value/1000000 + ' M')
      }
      return dd;
    },
    doViewClick(record, index) {
      // var param = record;
      // this.$store.commit("setParamPage", param);
      // this.$router.push({ name: "MK_DashboardTopSalesInvoice" });
    },
    doViewAllTopSales() {
      this.$router.push({ name: "DD_InternalMarketingViewAll" });
    },
    getListTopSales() {
      var param = {
        project_id: this.getDashboardProjectID(),
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/dashboard-top-sales",
        param
      ).then((response) => {
        if (response == null) return;
        this.TopSales.Data = response.data.list;
      });
    },
  },
  mounted() {
    this.getListTopSales();
  },
};
</script>