<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <ACCList2
            :prop="propList"
            :title="'Runnning Code'"
            @rowClicked="rowClicked"
            @buttonDeleteClicked="doDeleteClick"
            @rowDblClicked="doDoubleClick"
            @rowLinkClick="rowLink"
            @pageSize="M_PageSize"
            @pagination="M_Pagination"
            @filter="M_Advance_Filter"
            @headTable="M_Head_Table"
            @refreshColumn="refreshColumn"
            ref="ref_RunningCode"
            urlAdd="SS_RunningCodeForm"
            :WithDeleteButton="true"
            @buttonViewClicked="doViewClick"
            :ButtonAddDisabled="false"
          />
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
        initialWhere: "ss_portfolio_id='" + this.getDataUser().portfolio_id + "'",
        LineNo: 0,
        PageLevel: 1,
        TabIndex: 1,
        OrderBy: "",
        SourceField: "",
        ParamView: ""
      }
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
      if (this.ButtonStatus == null || !this.ButtonStatus.btnEdit) return
      var param = record;
      param.isEdit = true;
      param.isView = true;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "SS_RunningCodeForm" });
    },
    doDoubleClick(record, index) {},
    doDeleteClick(record, index) {
      this.alertConfirmation("Are You Sure Want To Delete This Data ?").then(
        ress => {
          if (ress.value) {
            this.M_Delete(record, index);
          }
        }
      );
    },
    M_Delete(record, index) {
      var param = {
        option_url: "/SS/SS_RunningCode",
        line_no: 0,
        id: record.row_id,
        lastupdatestamp: record.lastupdatestamp
      };
      this.deleteJSON(this.getUrlCRUD(), param).then(response => {
        // response from API
        if (response == null) return;
        this.$refs.ref_RunningCode.doGetList("");
      });
    },
    rowLink(url) {},
    M_PageSize() {},
    M_Pagination() {},
    M_Advance_Filter() {},
    M_Head_Table() {},
    refreshColumn() {}
  },
  mounted() {
    this.$refs.ref_RunningCode.doGetList("");
  },
  created() {
    this.$store.commit("setParamPage", {});
  }
};
</script>

<style>
</style>
