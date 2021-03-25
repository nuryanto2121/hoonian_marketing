<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <HOOList
            :prop="propList"
            :title="'Assign Project'"
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
            :WithDeleteButton="true"
            @buttonViewClicked="doViewClick"
            :ButtonAddDisabled="false"
          >
            <template slot="last_block_open_date" slot-scope="data">
              {{ momentUnix(data.item.last_block_open_date, "DD MMM YYYY") }}
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
        url: "/api/hoonian-website/app-setup-all-project",
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
    paramFromList() {
      var param = this.$store.getters.getParamPage;
      return param;
    },
  },
  methods: {
    rowClicked(record, index) {
      // this.doViewClick(record, index);
    },
    doViewClick(record, index) {
      // if (this.ButtonStatus == null) return
      var param = this.paramFromList ? this.paramFromList : {};
      param.ForPrinciple = record;
      param.ForPrinciple.isEdit = true;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "SS_AssignProjectForm" });
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
    this.propList.initialWhere =
      "app_setup_id = '" + this.paramFromList.id + "'";
    this.$refs.ref_list.doGetList("");
  },
  created() {},
};
</script>

<style>
</style>
