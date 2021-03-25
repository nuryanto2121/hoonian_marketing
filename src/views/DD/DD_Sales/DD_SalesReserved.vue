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
                          <span style="font-size: 18px; color: #4a93b3;">Reserved By Project</span>
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
          <template v-for="(data,index) in ModelProject">
              <b-row v-bind:key="index">
                  <b-col lg="12" xl="12">
                      <HOOList
                        :prop="data.propList"
                        :title="data.project_name"
                        @rowClicked="rowClicked($event,index)"
                        @buttonDeleteClicked="doDeleteClick($event,index)"
                        @rowDblClicked="doDoubleClick($event,index)"
                        @rowLinkClick="rowLink($event,index)"
                        @pageSize="M_PageSize($event,index)"
                        @pagination="M_Pagination($event,index)"
                        @filter="M_Advance_Filter($event,index)"
                        @headTable="M_Head_Table($event,index)"
                        @refreshColumn="refreshColumn($event,index)"
                        :ref="'ref_sales_reserved_'+index"
                        @buttonViewClicked="doViewClick"
                        ButtonBackDisabled
                        SearchDisabled
                        isPoppins
                        isHeaderFixed
                      >
                        <template slot="TitleTable">
                          <b-col lg="4" xl="4" style="font-size: 16px; color: #4a93b3;">
                            {{data.project_name}}
                          </b-col>
                        </template>
                        <template slot="ToolbarTable">
                          <b-col align-self="center" class="col-right font-poppins lbl-header-list">
                            <b>
                              Total Reserved Units
                            </b>
                          </b-col>
                          <b-col md="1" lg="1" xl="1" align-self="center" class="font-poppins noPadding">
                            <div align-self="center" style="--bgcolor: rgb(82 160 252);" class="badge-header-list">
                              <span style="margin: auto; font-size: 14px;">
                                {{data.total_unit}}
                              </span>
                            </div>
                          </b-col>
                        </template>
                      </HOOList>
                  </b-col>
              </b-row>
          </template>
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
    }
  },
  watch: {
    _projectId (newValue, oldValue) {
      this.getProject();
    }
  },
  data() {
    return {
      Model: {
        project_id: this.getDashboardProjectID(),
      },
      search: "",
      
      ModelProject: []
    };
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
    rowClicked(ev, id) {
      console.log(ev, id)
    },
    doDeleteClick(ev, id) {
      console.log(ev, id)
    },
    doDoubleClick(ev, id) {
      console.log(ev, id)
    },
    rowLink(ev, id) {
      console.log(ev, id)
    },
    M_PageSize(ev, id) {
      console.log(ev, id)
    },
    M_Pagination(ev, id) {
      console.log(ev, id)
    },
    M_Advance_Filter(ev, id) {
      console.log(ev, id)
    },
    M_Head_Table(ev, id) {
      console.log(ev, id)
    },
    refreshColumn(ev, id) {
      console.log(ev, id)
    },
    doBack() {
      this.$router.go(-1);
    },
    getProject() {
      let param = {
        project_id: this.Model.project_id
      };

      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard/management-detail/sales/header/reserved', param).then((response) => {
        if (response == null) return;
        let data = response.data;
        for (let i = 0; i < data.length; i++) {
          this.ModelProject.push({
            ...data[i],
            propList: {
              url: "/api/hoonian-website/dashboard/management-detail/sales/grid/reserved",
              initialWhere: data[i].id,
              SortField: "",
              SortBy: "desc",
              ParamWhere: "",
              param: {
                search: this.search
              }
            }
          });
        }
        
        this.$nextTick(() => {
          this.renderList(-1);
        })
        this.$forceUpdate();
      });
    },
    renderList(id = -1) {
      if (id < 0) {
        for (let i = 0; i < this.ModelProject.length; i++) {
          // console.log('ref_sales_reserved_'+i, this.$refs['ref_sales_reserved_'+i])
          this.ModelProject[i].propList.ParamWhere = this.search;
          this.ModelProject[i].propList.param.search = this.search;
          this.$refs['ref_sales_reserved_'+i][0].doGetList("");
        }
      }
      else {
        // let data = this.ModelProject
        this.ModelProject[id].propList.ParamWhere = this.search;
        this.ModelProject[id].propList.param.search = this.search;
        this.$refs['ref_sales_reserved_'+id][0].doGetList("");
      }
    }
  },
  mounted() {
    this.getProject();
  },
};
</script>

<style scoped>
@media (min-width: 992px) {
  .offset-header {
    margin-left: 22%;
  }
}
@media (min-width: 1200px) {
  .offset-header {
    margin-left: 37%;
  }
}
</style>
