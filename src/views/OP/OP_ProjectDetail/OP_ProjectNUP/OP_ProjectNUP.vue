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
                      NUP Detail
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
                <template slot="TitleTable">
                  <b-col lg="7" xl="7" style="padding-left: 10px !important; padding-top: 10px !important;" class="title-list-primary">
                    {{paramFromList.project_name}}
                  </b-col>
                </template>
                <template slot="ToolbarTable">
                  <b-col align-self="center" style="padding-top: 10px !important;" class="col-right font-poppins lbl-header-list">
                    <b>
                      Total NUP
                    </b>
                  </b-col>
                  <b-col md="1" lg="1" xl="1" align-self="center" class="font-poppins" style="margin-right: 5px; padding-top: 10px !important;">
                    <div align-self="center" style="background-color: #028A20;" class="badge-header-list">
                      <span style="margin: auto; font-size: 14px;">
                        {{paramFromList.DetailList.total_purchased}}
                      </span>
                    </div>
                  </b-col>
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
  data() {
    return {
      search: "",
      propList: {
        url: '/api/hoonian-website/dashboard/operation-detail/nup/principle-list',
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
    onSearchEnter(data) {
      this.$nextTick(() => {
        this.renderList(-1);
      })
    },
    removeSearch() {
      this.search = "";
      this.onSearchEnter("");
    },
    rowClicked(record, index) {
      this.doViewClick(record, index);
    },
    doViewClick(record, index) {
      let param = this.paramFromList;
      param.isEdit = record? true: false;
      param.DetailList2 = record;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_ProjectNUPForm" });
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
      this.propList.ParamWhere = this.search;
      this.propList.param.search = this.search;
      this.$refs.ref_list.doGetList("");
    },
  },
  mounted() {
    this.propList.initialWhere = this.paramFromList.project_id;
    this.propList.param = {
      nup_id: this.paramFromList.DetailList.nup_id,
    }
    this.renderList();
  },
};
</script>
