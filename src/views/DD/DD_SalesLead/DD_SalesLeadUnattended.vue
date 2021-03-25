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
                      Unattended List
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
          <template v-for="(data,index) in ModelSalesLead">
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
                  :ref="'ref_sales_lead_'+index"
                  @buttonViewClicked="rowClicked"
                  ButtonBackDisabled
                  SearchDisabled
                  isPoppins
                  isHeaderFixed
                >
                  <template slot="TitleTable">
                    <b-col lg="7" xl="7" style="padding-left: unset !important;" class="title-list-primary">
                      {{data.project_name}}
                    </b-col>
                  </template>
                  <template slot="ToolbarTable">
                    <b-col style="margin-right: 10px; font-size: 14px; color: rgba(0, 0, 0, 0, 0.5); text-shadow: 0.5px 0px;" align-self="center" class="col-right font-poppins">
                      <b>
                        Total Unattended
                      </b>
                    </b-col>
                    <b-col md="1" lg="1" xl="1" align-self="center" style="
                      background: linear-gradient(180deg, #FFA573 0%, #FF0000 100%);
                      border-radius: 4px;
                      color: white;
                      text-align: center;"
                      class="font-poppins"
                    >
                      <span style="margin: auto; font-size: 14px;">
                      {{data.total_unattended}}
                      </span>
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
  data() {
    return {
      search: '',
      Model: {
        project_id: this.getDashboardProjectID(),
      },
      ModelSalesLead: []
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
    getHeader() {
      let param = {
        project_id: this.Model.project_id
      };

      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard/management-detail/header/unattended', param).then((response) => {
        if (response == null) return;
        let data = response.data;
        this.ModelSalesLead = [];
        for (let i = 0; i < data.length; i++) {
          this.ModelSalesLead.push({
            ...data[i],
            propList: {
              url: "/api/hoonian-website/dashboard/management-detail/grid/unattended",
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
      for (let i = 0; i < this.ModelSalesLead.length; i++) {
        this.ModelSalesLead[i].propList.ParamWhere = this.search;
        this.$refs['ref_sales_lead_'+i][0].doGetList("");
      }
    }
  },
  mounted() {
    this.getHeader();
  },
};
</script>
