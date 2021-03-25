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
                        <b-col style="max-width: max-content !important;">
                          <span style="font-size: 18px; color: #4a93b3;">Details Payment Method</span>
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
                        :title="paramFromList.payment_method_name"
                        @rowClicked="rowClicked"
                        @buttonDeleteClicked="doDeleteClick"
                        @rowDblClicked="doDoubleClick"
                        @rowLinkClick="rowLink"
                        @pageSize="M_PageSize"
                        @pagination="M_Pagination"
                        @filter="M_Advance_Filter"
                        @headTable="M_Head_Table"
                        @refreshColumn="refreshColumn"
                        :ref="'ref_payment_method'"
                        @buttonViewClicked="doViewClick"
                        ButtonBackDisabled
                        SearchDisabled
                        isPoppins
                        isHeaderFixed
                        @onRenderData="onRenderData"
                    >
                    <template slot="TitleTable">
                        <b-col lg="7" xl="7" style="font-size: 16px; color: #4a93b3;">
                        {{paramFromList.payment_method_name}}
                        </b-col>
                    </template>
                    <template slot="ToolbarTable">
                        <b-col align-self="center" class="col-right font-poppins lbl-header-list">
                            <b>
                              Total Buyer
                            </b>
                          </b-col>
                          <b-col md="1" lg="1" xl="1" align-self="center" class="font-poppins noPadding" style="margin-right: 10px;">
                            <div align-self="center" style="--bgcolor: #333399;" class="badge-header-list">
                              <span style="margin: auto; font-size: 14px;">
                                {{DataHeader.total_buyer}}
                              </span>
                            </div>
                          </b-col>
                          <b-col style="max-width: max-content;" align-self="center" class="col-right font-poppins lbl-header-list">
                            <b>
                              Value
                            </b>
                          </b-col>
                          <b-col md="1" lg="1" xl="1" align-self="center" class="font-poppins noPadding">
                            <div align-self="center" style="--bgcolor: #333399;" class="badge-header-list">
                              <span style="margin: auto; font-size: 14px;">
                                {{checkNum(DataHeader.total_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), DataHeader.total_value)}}
                                {{checkPref(DataHeader.total_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}}
                              </span>
                            </div>
                          </b-col>
                    </template>

                    <template slot="total_sales_amount" slot-scope="data">
                        <span>
                            {{ isCurrency(data.item.total_sales_amount, decimal) }}
                        </span>
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
        url: "/api/hoonian-website/dashboard/management-detail/payment-method",
        initialWhere: "",
        SortField: "",
        SortBy: "desc",
        ParamWhere: "",
        param: {
            search: "",
            payment_method_id: ""
        }
      },
      
      DataList: {},
      DataHeader: {
        total_buyer: 0,
        total_value: 0
      }
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
        this.propList.initialWhere = this.Model.project_id;
        this.propList.param.search = this.search;
        this.propList.param.payment_method_id = this.paramFromList.payment_method_id;
        this.$refs.ref_payment_method.doGetList("");
    },
    onRenderData(data) {
        let x = this.$refs.ref_payment_method.responses;
        this.DataHeader.total_buyer = x.Header.total_buyer;
        this.DataHeader.total_value = x.Header.total_value;
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
