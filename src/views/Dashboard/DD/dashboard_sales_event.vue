<template>
  <div class="card" style="height: 100%">
    <div class="card__title-newdash" style="border-bottom: unset !important;">
      <b-row>
        <b-col style="max-width: max-content !important">
          <!-- <span style="color: #333399">{{title}}</span>     -->
          <span style="font-size: 16px; color: #333399;">{{title}}</span>      
        </b-col>
        <b-col style="text-align: right">
          <span>
            <ABSButton
              :text="'View All'"
              classButton="button button--back"
              classIcon="icon-style-1"
              @click="doViewAllSalesEventPayment"
            />
          </span>
        </b-col>
      </b-row>
    </div>
    <div class="card__body">
      <ACCFormList
        :prop="SalesEventList_propList"
        @rowClicked="doViewClick"
        :cHeader="SalesEvent.Header"
        cStatic
        cClass="table-no-em"
        :cData="SalesEvent.Data"
        ref="ref_AssignUnitsList"
      >
        <template slot="no" slot-scope="data">
          {{ data.index + 1 }}
        </template>
        <template slot="periode_start" slot-scope="data">
          {{momentUnix(data.item.periode_start, "DD MMM YYYY")}}
        </template>
        
        <template slot="periode_end" slot-scope="data">
          {{momentUnix(data.item.periode_end, "DD MMM YYYY")}}
        </template>

        <!-- <template slot="created_at" slot-scope="data">
          <span>
            <span>{{
              momentUnix(data.item.created_at, "YYYY-MM-DD HH:mm")
            }}</span>
          </span>
        </template> -->
      </ACCFormList>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data() {
    return {
      SalesEventList_propList: {
        url: "",
        initialWhere: "",
        SortField: "",
        SortBy: "",
        ParamWhere: "",
      },
      OverdueLabel: "",
      OnHoldLabel: "",
      SalesEvent: {
        Header: [
          {
            key: "no",
            label: "No",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
          },
          {
            key: "event_name",
            label: "Event Name",
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
            key: "periode_start",
            label: "Start Date",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
          },
          {
            key: "periode_end",
            label: "End Date",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
          },
          {
            key: "unit_sold",
            label: "Unit Sold",
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
      this.getListSalesEventPayment();
    },
  },
  methods: {
    doViewClick(record, index) {
      // var param = record;
      // this.$store.commit("setParamPage", param);
      // this.$router.push({ name: "MK_DashboardSalesEventPaymentInvoice" });
    },
    doViewAllSalesEventPayment() {
      this.$router.push({ name: "DD_SalesEventViewAll" });
    },
    getListSalesEventPayment() {
      var param = {
        project_id: this.getDashboardProjectID(),
      };
      this.postJSON(
        this.urlHoonian +
        "/api/hoonian-website/dashboard/dashboard-sales-event",
        param
      ).then((response) => {
        if (response == null) return;
        this.SalesEvent.Data = response.data.list;
      });
    },
  },
  mounted() {
    this.getListSalesEventPayment();
  },
};
</script>