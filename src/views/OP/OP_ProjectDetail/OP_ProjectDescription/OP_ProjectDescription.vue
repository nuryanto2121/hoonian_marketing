<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col lg="12" xl="12">
          <b-row>
            <b-col lg="12" xl="12">
              <div class="card">
                <div class="card__title" style="">
                  <b-row class="title-primary">
                    <b-col style="max-width: max-content !important; padding-left: unset !important;">
                      Description
                    </b-col>
                    <b-col class="col-right">
                    </b-col>
                    <b-col style="max-width: fit-content !important; padding-right: unset !important;" class="col-right">
                      <span>
                        <ABSButton
                          :text="'Add'"
                          classButton="button button--back"
                          classIcon="icon-style-1"
                          @click="rowClicked"
                        />
                        <ABSButton
                          :text="'Back'"
                          classButton="button button--back"
                          classIcon="icon-style-1"
                          @click="doBack"
                          styleButton="margin-right: unset !important;"
                        />
                      </span>
                    </b-col>
                  </b-row>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="12" xl="12">
              <HOOList
                :prop="propList"
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
                ref="ref_list"
                @buttonViewClicked="rowClicked"
                ButtonBackDisabled
                SearchDisabled
                isPoppins
                isHeaderFixed
                removeCardTitle
              >
              </HOOList>
            </b-col>
          </b-row>
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
        url: '/api/hoonian-website/dashboard/project-info/description/list',
        initialWhere: '',
        SortField: '',
        SortBy: '',
        ParamWhere: '',
      },
    };
  },
  computed: {
    paramFromList() {
      let param = this.$store.getters.getParamPage;
      return param;
    },
  },
  methods: {
    rowClicked(record, index) {
      this.doViewClick(record, index);
    },
    doViewClick(record, index) {
      let param = this.paramFromList;
      param.isEdit = record? true: false;
      param.DetailList = record;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_ProjectDescriptionForm" });
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
    },
    rowLink(url) {},
    M_PageSize() {},
    M_Pagination() {},
    M_Advance_Filter() {},
    M_Head_Table() {},
    refreshColumn() {},
    renderList() {
      this.$refs.ref_list.doGetList("");
    },
  },
  mounted() {
    this.propList.initialWhere = this.paramFromList.project_id;
    this.propList.param = {
      header_body_text_id: this.paramFromList.header_body_text_id
    }
    this.renderList();
  },
};
</script>
