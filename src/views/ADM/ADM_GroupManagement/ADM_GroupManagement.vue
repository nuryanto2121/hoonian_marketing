<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <ACCList2
            :prop="propList"
            :title="'User Group Management'"
            @rowClicked="rowClicked"
            @buttonDeleteClicked="doDeleteClick"
            @rowDblClicked="doDoubleClick"
            @rowLinkClick="rowLink"
            @pageSize="M_PageSize"
            @pagination="M_Pagination"
            @filter="M_Advance_Filter"
            @headTable="M_Head_Table"
            @refreshColumn="refreshColumn"
            ref="ref_GroupManagement"
            urlAdd="ADM_AddGroupManagement"
            WithDeleteButton
            @buttonViewClicked="doViewClick"
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
        initialWhere: "group_access='E'",
        LineNo: 0,
        PageLevel: 1,
        TabIndex: 1,
        OrderBy: "",
        SourceField: "",
        ParamView: "'" + this.getDataUser().portfolio_id + "'"
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
      this.doViewClick(record, index)
    },
    doViewClick(record, index) {
      if (this.ButtonStatus == null || !this.ButtonStatus.listEditUserGroupManagement) return
      var param = record;
      param.isEdit = true;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "ADM_AddGroupManagement" });
    },
    doDeleteClick(record, index) {
      this.alertConfirmation("Are You Sure Want To Delete This Data ?").then(
        (ress) => {
          if (ress.value) {
            this.M_Delete(record, index);
          }
        }
      );
    },
    M_Delete(record, index) {
      var param = {
        option_url: "/ADM/ADM_GroupManagement",
        line_no: 0,
        id: record.row_id,
        lastupdatestamp: record.lastupdatestamp,
      };
      this.deleteJSON(this.getUrlCRUD(), param).then((response) => {
        // response from API
        if (response == null) return;
        this.$refs.ref_GroupManagement.doGetList("");
      });
    },
    doDoubleClick(record, index) {},
    rowLink(url) {},
    M_PageSize() {},
    M_Pagination() {},
    M_Advance_Filter() {},
    M_Head_Table() {},
    refreshColumn() {}
  },
  mounted() {
    this.$refs.ref_GroupManagement.doGetList("");
  }
};
</script>

<style>
</style>