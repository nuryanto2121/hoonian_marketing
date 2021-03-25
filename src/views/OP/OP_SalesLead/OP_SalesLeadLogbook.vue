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
                            Logbook
                        </b-col>
                        <b-col class="col-right">
                            <span>
                                <b-form-input
                                id="txtSearch"
                                v-model="search"
                                type="text"
                                placeholder="Search...."
                                v-shortkey.focus="['f1']"
                                class="text-field-search font-poppins"
                                @keyup.enter.native="onSearchEnter"
                                autocomplete="off"
                                style="margin-bottom: 0px;"
                                ></b-form-input>
                                <span
                                style="position: absolute; right: 12px; cursor: pointer"
                                @click="removeSearch"
                                >&times;</span
                                >
                            </span>
                        </b-col>
                        <b-col style="max-width: fit-content !important; padding-right: unset !important;" class="col-right">
                            <span>
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
                        :ref="'ref_sales_lead_logbook'"
                        ButtonBackDisabled
                        SearchDisabled
                        isPoppins
                        isHeaderFixed
                        @onRenderData="onRenderData"
                    >
                        <template slot="date" slot-scope="data">
                          {{momentUnix(data.item.date, "YYYY-MM-DD")}}
                        </template>
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
  props: ['title'],
  computed: {
    _projectId () {
      return this.$store.getters.getProjectId;
    },
    paramFromList() {
      var param = this.$store.getters.getParamPage;
      return param;
    },
  },
  watch: {
    _projectId (newValue, oldValue) {
      this.getDataList();
    }
  },
  data() {
    return {
      Model: {
        project_id: this.getDashboardProjectID(),
      },
      search: "",

      propList: {
        url: "/api/hoonian-website/dashboard/operation-detail/sales-lead/logbook",
        initialWhere: "",
        SortField: "",
        SortBy: "desc",
        ParamWhere: "",
        param: {
            search: "",
            project_id: "",
            sales_lead_id: ""
        }
      },
      
      DataList: []
    };
  },
  methods: {
    onSearchEnter(data) {
      this.$nextTick(() => {
        this.getDataList();
      })
    },
    removeSearch() {
      this.search = "";
      this.onSearchEnter("");
    },
    rowClicked(record, index) {
      console.log(record, index)
    },
    doDeleteClick(record, index) {
      console.log(record, index)
    },
    doDoubleClick(record, index) {
      console.log(record, index)
    },
    rowLink(record, index) {
      console.log(record, index)
    },
    M_PageSize(record, index) {
      console.log(record, index)
    },
    M_Pagination(record, index) {
      console.log(record, index)
    },
    M_Advance_Filter(record, index) {
      console.log(record, index)
    },
    M_Head_Table(record, index) {
      console.log(record, index)
    },
    refreshColumn(record, index) {
      console.log(record, index)
    },
    doBack() {
      this.$router.go(-1);
    },
    getDataList() {
        this.propList.param.search = this.search;
        this.propList.param.project_id = this.paramFromList.project_id;
        this.propList.param.sales_lead_id = this.paramFromList.sales_lead_id;
        this.$refs.ref_sales_lead_logbook.doGetList("");
    },
    onRenderData(data) {
        this.DataList = data;
    }
  },
  mounted() {
    this.getDataList();
  },
  beforeMount() {
  }
};
</script>

<style scoped>
@media (min-width: 992px) {
  .offset-header {
    margin-left: 38%;
  }
}
@media (min-width: 1200px) {
  .offset-header {
    margin-left: 40%;
  }
}
</style>
