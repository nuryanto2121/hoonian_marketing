<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <template v-for="(data, index) in M_Row">
        <b-row class="dashboardBody" v-bind:key="index" style="margin-bottom: 10px !important; font-family: Poppins !important;">
          <template v-for="(dash, dash_id) in M_Dash.filter(y => y.row == data)">
            <b-col v-if="dash.row == data" v-bind:key="dash_id" :md="M_Dash.filter(y => y.row == data).length == 1 ? '': dash.size">
              <keep-alive>
                <component :ref="'ref_'+dash.name" :is="dash.component" :title="dash.name" />
              </keep-alive>
            </b-col>
          </template>
        </b-row>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      M_Dash: [],
      M_Row: []
    };
  },
  computed: {},
  methods: {
    renderDash2() {
      var Dash = [
        {
          id: 1,
          component: "/DD/dashboard_payment_method",
          name: "Payment Method",
          row: 1,
          col: 1,
          size: 12
        },
        // {
        //   id: 2,
        //   component: "/DD/dashboard_sales_summary",
        //   name: "Sales",
        //   row: 1,
        //   col: 2,
        //   size: 5
        // },
        // {
        //   id: 3,
        //   component: "/DD/dashboard_multi_project",
        //   name: "Project Info",
        //   row: 2,
        //   col: 1,
        //   size: 12
        // },
        // {
        //   id: 4,
        //   component: "/DD/dashboard_principle_analysis_by_unit_value",
        //   name: "Principle",
        //   row: 3,
        //   col: 1,
        //   size: 6
        // },
        // {
        //   id: 4,
        //   component: "Dashboard_Reservation",
        //   name: "Reservation",
        //   row: 3,
        //   col: 2,
        //   size: 6
        // },
        // {
        //   id: 5,
        //   component: "Dashboard_Outstanding",
        //   name: "Outstanding",
        //   row: 4,
        //   col: 1,
        //   size: 12
        // },
        // {
        //   id: 6,
        //   component: "Dashboard_SalesLead",
        //   name: "SalesLead",
        //   row: 5,
        //   col: 1,
        //   size: 6
        // },
        // {
        //   id: 7,
        //   component: "Dashboard_TopSales",
        //   name: "TopSales",
        //   row: 5,
        //   col: 2,
        //   size: 6
        // },
        // {
        //   id: 8,
        //   component: "Dashboard_NUPToken",
        //   name: "NUPToken",
        //   row: 6,
        //   col: 1,
        //   size: 6
        // },
        // {
        //   id: 9,
        //   component: "Dashboard_SalesEvent",
        //   name: "SalesEvent",
        //   row: 6,
        //   col: 2,
        //   size: 6
        // },
        // {
        //   id: 10,
        //   component: "Dashboard_Promotion",
        //   name: "Promotion",
        //   row: 7,
        //   col: 1,
        //   size: 12
        // },
        // {
        //   id: 11,
        //   component: "Dashboard_Progress",
        //   name: "Progress",
        //   row: 8,
        //   col: 1,
        //   size: 12
        // },
      ];
      this.M_Row = [...new Set(Dash.map(x => x.row))]
      for (let i = 0; i < Dash.length; i++) {
        var cmp = () => import("."+Dash[i].component+".vue")
        this.M_Dash.push({
          id: Dash[i].id,
          component: cmp,
          name: Dash[i].name,
          row: Dash[i].row,
          col: Dash[i].col,
          size: Dash[i].size
        })
      }

      this.$forceUpdate();
    },
    renderDash() {
      var param = {
        option_function_cd: "GetUserMenuDashboard",
        module_cd: "MK",
        ss_portfolio_id: this.getDataUser().portfolio_id,
        user_id: this.getDataUser().user_id,
        menu_url: "/DD_Dashboard"
      };
      
      this.CallFunction(param).then(response => {
        if (response == null) return
        
        var Dash = response.Data;
        this.M_Row = [...new Set(Dash.map(x => x.row))]
        for (let i = 0; i < Dash.length; i++) {
          var cmp = () => import("."+Dash[i].component+".vue")
          this.M_Dash.push({
            id: Dash[i].id,
            component: cmp,
            name: Dash[i].name,
            row: Dash[i].row,
            col: Dash[i].col,
            size: Dash[i].size
          })
        }

        this.$forceUpdate();
      })
    }
  },
  mounted() {
    this.renderDash();
  },
  created() {
    this.$store.commit("setParamPage", {});
  }
};
</script>