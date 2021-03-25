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
                      Drop Sales Lead
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
          <template v-for="(data,index) in ModelDrop">
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
                  :ref="'ref_drop_'+index"
                  @buttonViewClicked="rowClicked"
                  ButtonBackDisabled
                  SearchDisabled
                  isPoppins
                  isHeaderFixed
                >
                    <template slot="TitleTable">
                        <b-col lg="7" xl="7" style="padding-left: unset !important;" class="title-list-primary text-single">
                            {{data.project_name}}
                        </b-col>
                    </template>
                    <template slot="last_update" slot-scope="data">
                        {{momentUnix(data.item.last_update, "YYYY-MM-DD")}}
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
  data() {
    return {
      search: '',
      Model: {
        project_id: this.getDashboardProjectID(),
      },
      ModelDrop: []
    };
  },
  methods: {
    onSearchEnter(data) {
      this.$nextTick(() => {
        this.renderList();
      })
    },
    removeSearch() {
      this.search = "";
      this.onSearchEnter("");
    },
    rowClicked(ev, id) {
      let param = ev;
      param.project_id = this.ModelDrop[id].id;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_SalesLeadDropForm" });
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
    getHeader() {
      let param = {
        project_id: this.Model.project_id
      };

      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard/management-detail/header/sales-lead', param).then((response) => {
        if (response == null) return;
        let data = response.data;
        this.ModelDrop = [];
        for (let i = 0; i < data.length; i++) {
          this.ModelDrop.push({
            ...data[i],
            propList: {
              url: "/api/hoonian-website/dashboard/operation-detail/sales-lead/drop-list",
              initialWhere: data[i].id,
              SortField: "",
              SortBy: "desc",
              ParamWhere: "",
            }
          });
        }
        this.$nextTick(() => {
          this.renderList();
        })
      });
    },
    renderList() {
      for (let i = 0; i < this.ModelDrop.length; i++) {
        this.ModelDrop[i].propList.ParamWhere = this.search;
        this.$refs['ref_drop_'+i][0].doGetList("");
      }
    }
  },
  mounted() {
    this.getHeader();
  },
};
</script>
