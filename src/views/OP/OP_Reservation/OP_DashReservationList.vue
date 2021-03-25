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
                            <span style="font-size: 18px; color: #4a93b3;">Reservation List</span>
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
                                    :text="'Add'"
                                    classButton="button button--back"
                                    classIcon="icon-style-1"
                                    @click="doAdd"
                                    styleButton="margin-right: 10px !important;"
                                />
                            </span>
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
                        :ref="'ref_reservation_dashList'+index"
                        @buttonViewClicked="doViewClick"
                        ButtonBackDisabled
                        SearchDisabled
                        isPoppins
                        isHeaderFixed
                      >
                        <template slot="TitleTable">
                          <b-col lg="5" xl="5" style="padding-left: unset !important;" class="title-list-primary">
                            {{data.project_name}}
                          </b-col>
                        </template>
                        <template slot="ToolbarTable">
                          <b-col align-self="center" class="col-right font-poppins lbl-header-list">
                            <b>
                              Total Sold
                            </b>
                          </b-col>
                          <b-col md="1" lg="1" xl="1" align-self="center" class="font-poppins noPadding" style="margin-right: 10px;">
                            <div align-self="center" style="--bgcolor: rgb(25 102 176);" class="badge-header-list">
                              <span style="margin: auto; font-size: 14px;">
                                {{data.total_sold}}
                              </span>
                            </div>
                          </b-col>
                          <b-col style="max-width: max-content;" align-self="center" class="col-right font-poppins lbl-header-list">
                            <b>
                              Total Booked
                            </b>
                          </b-col>
                          <b-col md="1" lg="1" xl="1" align-self="center" class="font-poppins noPadding">
                            <div align-self="center" style="--bgcolor: rgb(25 102 176);" class="badge-header-list">
                              <span style="margin: auto; font-size: 14px;">
                                {{data.total_booked}}
                              </span>
                            </div>
                          </b-col>
                        </template>
                        <template slot="date" slot-scope="data">
                          {{momentUnix(data.item.date, "DD MMM YYYY")}}
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
        let param = ev;
        param.isEdit = true;
        this.$store.commit("setParamPage", param);
        this.$router.push({ name: "OP_DashReservationForm" });
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
    doAdd() {
        this.$router.push({ name: "OP_DashReservationForm" });
    },
    doBack() {
      this.$router.go(-1);
    },
    getProject() {
      let param = {
        project_id: this.Model.project_id
      };

      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard/operation-detail/reservation/header', param).then((response) => {
        if (response == null) return;
        let data = response.data;
        for (let i = 0; i < data.length; i++) {
          this.ModelProject.push({
            ...data[i],
            propList: {
              url: "/api/hoonian-website/dashboard/operation-detail/reservation/grid",
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
          // console.log('ref_reservation_dashList'+i, this.$refs['ref_reservation_dashList'+i])
          this.ModelProject[i].propList.ParamWhere = this.search;
          this.ModelProject[i].propList.param.search = this.search;
          this.$refs['ref_reservation_dashList'+i][0].doGetList("");
        }
      }
      else {
        // let data = this.ModelProject
        this.ModelProject[id].propList.ParamWhere = this.search;
        this.ModelProject[id].propList.param.search = this.search;
        this.$refs['ref_reservation_dashList'+id][0].doGetList("");
      }
    }
  },
  mounted() {
    this.getProject();
    this.$store.commit("setParamPage", {});
  },
};
</script>

<style scoped>
@media (min-width: 992px) {
  .offset-header {
    margin-left: 34%;
  }
}
@media (min-width: 1200px) {
  .offset-header {
    margin-left: 40%;
  }
}
</style>
