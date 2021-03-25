<template>
  <div class="card" style="height: 95%">
    <div class="card__body">
      <b-row style="margin-bottom: 10px;">
        <b-col style="max-width: max-content !important">
          <span style="font-size: 16px; color: #333399; font-weight: bold;">Referral</span>
        </b-col>
        <b-col style="text-align: right; padding: unset !important;">
          <span>
            <ABSButton
              :text="'View All'"
              classButton="button button--back"
              classIcon="icon-style-1"
              @click="doViewAllReferralPayment"
            />
          </span>
        </b-col>
      </b-row>
      <ACCFormList
        :prop="ReferralList_propList"
        @rowClicked="doViewClick"
        :cHeader="Referral.Header"
        cStatic
        :cData="Referral.Data"
        ref="ref_AssignUnitsList"
      >
        <template slot="no" slot-scope="data">
          {{ data.index + 1 }}
        </template>
        <template slot="created_at" slot-scope="data">
          {{ momentUnix(data.item.created_at, "DD MMM YYYY") }}
        </template>
      </ACCFormList>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ReferralList_propList: {
        url: "",
        initialWhere: "",
        SortField: "",
        SortBy: "",
        ParamWhere: "",
      },
      OverdueLabel: "",
      OnHoldLabel: "",
      Referral: {
        Header: [
          {
            key: "no",
            label: "No",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
          },
          {
            key: "project_name",
            label: "Prospect Name",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
          },
          {
            key: "referred_by_name",
            label: "Reffered By",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
          },
          {
            key: "created_at",
            label: "Refer Date",
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
      this.getListReferralPayment();
    },
  },
  methods: {
    doViewClick(record, index) {
      var param = record;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_ReferralForm" });
    },
    doViewAllReferralPayment() {
      this.$router.push({ name: "OP_ReferralList" });
    },
    getListReferralPayment() {
      var param = {
        project_id: this.getDashboardProjectID(),
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/dashboard-referral",
        param
      ).then((response) => {
        if (response == null) return;
        this.Referral.Data = response.data.list;
      });
    },
  },
  mounted() {
    this.getListReferralPayment();
  },
};
</script>