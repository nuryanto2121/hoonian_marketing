<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <HOOList
            :prop="propList"
            :title="'Sales Cancellation'"
            @rowClicked="rowClicked"
            @buttonDeleteClicked="doDeleteClick"
            @rowDblClicked="doDoubleClick"
            @rowLinkClick="rowLink"
            @pageSize="M_PageSize"
            @pagination="M_Pagination"
            @filter="M_Advance_Filter"
            @headTable="M_Head_Table"
            @refreshColumn="refreshColumn"
            ref="ref_list"
            urlAdd="OP_SalesCancellationForm"
            :WithDeleteButton="true"
            @buttonViewClicked="doViewClick"
            :ButtonAddDisabled="true"
          >
            <template slot="cancellation_date" slot-scope="data">
              <span>
                {{ momentUnix(data.item.cancellation_date, "YYYY-MM-DD") }}
              </span>
            </template>
          </HOOList>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      propList: {
        url: "/api/hoonian-website/sales-cancellation-list",
        initialWhere: "",
        SortField: "",
        SortBy: "",
        ParamWhere: "",
      },
    };
  },
  computed: {
    ButtonStatus() {
      return this.$store.getters.getButtonStatus;
    },
  },
  methods: {
    rowClicked(record, index) {
      this.doViewClick(record, index);
    },
    doViewClick(record, index) {
      // if (this.ButtonStatus == null) return
      var param = record;
      param.isEdit = true;
      param.isView = true;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_SalesCancellationForm" });
    },
    doDoubleClick(record, index) {},
    doDeleteClick(record, index) {
      this.alertConfirmation("Are You Sure Want To Delete This Data ?").then(
        (ress) => {
          if (ress.value) {
            this.M_Delete(record, index);
          }
        }
      );
    },
    M_Delete(record, index) {},
    rowLink(url) {},
    M_PageSize() {},
    M_Pagination() {},
    M_Advance_Filter() {},
    M_Head_Table() {},
    refreshColumn() {},
  },
  mounted() {
    this.$refs.ref_list.doGetList("");
  },
  created() {
    this.$store.commit("setParamPage", {});
  },
};
</script>

<style>
</style>
