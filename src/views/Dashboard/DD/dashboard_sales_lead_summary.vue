<template>
  <div class="card" style="height: 100%">
    <div class="card__title-newdash" style="border-bottom: unset !important;">
      <b-row>
        <b-col style="max-width:max-content !important;">
          <span style="font-size: 16px; color: #333399;">{{title}}</span>
        </b-col>
        <b-col style="text-align: right;">
            <span>
                <ABSButton
                :text="'View All'"
                classButton="button button--back"
                classIcon="icon-style-1"
                :disabled="false"
                @click="doViewAllSalesLead"
                />
            </span>
        </b-col>
      </b-row>
    </div>
    <div class="card__body">
      <b-row style="border: solid 1px #e0e3f3; border-radius: 6px; padding-bottom: 5px; margin-bottom: 5px;">
        <b-col lg="4" xl="4">
          <div style="text-align: center; 
              color: #939598;
              margin-bottom: 5px;
              font-size: 12px;
              font-weight: bold;">
            Total
          </div>
          <div style="
            width: 90%;
            height: 65%;
            padding: 5px;
            margin: auto;
            background: linear-gradient(180deg, #2DA8AF 0%, #2D47AF 100%);
            border-radius: 6px;
            font-size: 30px;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
          ">
            {{Model.total}}
          </div>
        </b-col>
        <b-col lg="4" xl="4">
          <div style="text-align: center; 
              color: #939598;
              margin-bottom: 5px;
              font-size: 12px;
              font-weight: bold;">
            Transactions
          </div>
          <div style="
            width: 90%;
            height: 65%;
            padding: 5px;
            margin: auto;
            background: linear-gradient(180deg, #04B6AB 0%, #00820D 100%);
            border-radius: 6px;
            font-size: 30px;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
          ">
            {{Model.hit}}
          </div>
        </b-col>
        <b-col lg="4" xl="4">
          <div style="text-align: center; 
              color: #939598;
              margin-bottom: 5px;
              font-size: 12px;
              font-weight: bold;">
            Conversion
          </div>
          <div style="
            width: 90%;
            height: 65%;
            padding: 5px;
            margin: auto;
            background: linear-gradient(180deg, #FFC700 0%, #FF9900 100%);
            border-radius: 6px;
            font-size: 30px;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
          ">
            {{Model.conversion}}%
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-col>
          <div style="text-align: center; 
              color: #939598;
              margin-bottom: 5px;
              font-size: 14px;
              font-weight: bold;">
            Unattended
          </div>
          <div style="
            background: linear-gradient(180deg, #FFA573 0%, #FF0000 100%);
            border-radius: 6px;
            font-size: 36px;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            cursor: pointer;
          " @click="detailUnattended">
            {{Model.watch_list}}
          </div>
        </b-col>
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
      this.renderData();
    }
  },
  data() {
    return {

      Model: {
        project_id: this.getDashboardProjectID(),
        total: "1200",
        hit: "39",
        conversion: "3",
        watch_list: "35",
      },
    }
  },
  methods: {
    doViewAllSalesLead() {
      this.$router.push({ name: "DD_SalesLeadViewAll" });
    },
    detailUnattended() {
      this.$router.push({ name: "DD_SalesLeadUnattended" });
    },
    renderData() {
      let param = {
        project_id: this.Model.project_id
      };

      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard/dashboard-sales-lead-summary', param).then((response) => {
        let data = response.data.data;
        this.Model.total = data.total;
        this.Model.hit = data.hit;
        this.Model.conversion = data.conversion;
        this.Model.watch_list = data.watch_list;
      });
    },
  },
  mounted() {
    this.renderData();
  },
};
</script>