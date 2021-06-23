<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <template v-for="(data, index) in M_Row">
        <b-row class="dashboardBody" v-bind:key="index" style="font-family: Poppins !important;">
          <template v-for="(dash, dash_id) in M_Dash.filter(y => y.row == data)">
            <b-col v-if="dash.row == data" v-bind:key="dash_id" :md="M_Dash.filter(y => y.row == data).length == 1 ? '': dash.size">
              <keep-alive>
                <component :ref="'ref_'+dash.name" :is="dash.component"/>
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
          component: "/MK_Common/dashboard_announcement",
          name: "Announcement",
          row: 1,
          col: 1,
          size: 12
        },
        {
          id: 2,
          component: "/MK_Common/dashboard_project_big",
          name: "ProjectBig",
          row: 2,
          col: 1,
          size: 12
        },
        {
          id: 3,
          component: "/MK_Common/dashboard_project_small",
          name: "ProjectSmall",
          row: 3,
          col: 1,
          size: 12
        },
        {
          id: 4,
          component: "/MK_Common/dashboard_promotion",
          name: "Promotion",
          row: 4,
          col: 1,
          size: 12
        },
        {
          id: 5,
          component: "/MK_Common/dashboard_news",
          name: "News",
          row: 5,
          col: 1,
          size: 12
        },
        // {
        //   id: 2,
        //   component: "Dashboard_Booking",
        //   name: "Booking",
        //   row: 2,
        //   col: 1,
        //   size: 12
        // },
        // {
        //   id: 3,
        //   component: "Dashboard_Reservation",
        //   name: "Reservation",
        //   row: 3,
        //   col: 1,
        //   size: 6
        // },
        // {
        //   id: 4,
        //   component: "Dashboard_SalesLead",
        //   name: "SalesLead",
        //   row: 3,
        //   col: 2,
        //   size: 6
        // },
        // {
        //   id: 4,
        //   component: "Dashboard_Ticket",
        //   name: "Ticket",
        //   row: 4,
        //   col: 1,
        //   size: 6
        // },
        // {
        //   id: 5,
        //   component: "Dashboard_Referral",
        //   name: "Referral",
        //   row: 4,
        //   col: 2,
        //   size: 6
        // },
        // {
        //   id: 6,
        //   component: "Dashboard_Principle",
        //   name: "Principle",
        //   row: 5,
        //   col: 1,
        //   size: 12
        // },
        // {
        //   id: 7,
        //   component: "Dashboard_Progress",
        //   name: "Progress",
        //   row: 6,
        //   col: 1,
        //   size: 12
        // },
        // {
        //   id: 8,
        //   component: "Dashboard_NewsFeed",
        //   name: "NewsFeed",
        //   row: 7,
        //   col: 1,
        //   size: 12
        // }
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
  },
  mounted() {
    if (this.getSession()) {
      this.$router.replace({
        path: '/MK_Dashboard'
      })
    } else {
      this.renderDash2();
    }
    this.$store.commit("setBackButton", false);
  },
  created() {
    this.$store.commit("setParamPage", {});
  }
};
</script>