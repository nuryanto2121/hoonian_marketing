<template>
  <div class="card" style="height: 100%">
    <div class="card__title-newdash" style="border-bottom: unset !important;">
      <b-row>
        <b-col lg="9" xl="9" style="max-width:max-content !important;">
          <span style="font-size: 16px; color: #333399;">{{title}}</span>
        </b-col>
        <b-col style="text-align: right;">
            <span>
                <ABSButton
                :text="'View All'"
                classButton="button button--back"
                classIcon="icon-style-1"
                :disabled="false"
                @click="doViewNUPToken"
                />
            </span>
        </b-col>
      </b-row>
    </div>
    <div class="card__body">
      <b-row style="width: 100%;
        position: absolute;
        height: 100%;
        padding-right: 20px;
        padding-bottom: 75px;">
        <b-col lg="6" xl="6" style="border: solid 1px #e4e7f5; border-radius: 6px; -webkit-box-flex: 0; flex: 0 0 45%; max-width: 45%; margin-right: 10%;">
          <div class="center">
            <div style="
              width: 110px;
              height: 110px;
              border: 8px solid #33998D;
              box-sizing: border-box;
              border-radius: 50%;
              font-size: 35px;
              color: #33998D;
              margin: auto;
              display: flex; justify-content: center; align-items: center;
              font-weight: bold;">
                {{Model.nup}}
            </div>
            <div style="margin-top: 15px; color: #33998D; font-size: 20px; text-align: center; font-weight: bold;">
              NUP
            </div>
          </div>
        </b-col>
        <b-col lg="6" xl="6" style="border: solid 1px #e4e7f5; border-radius: 6px; -webkit-box-flex: 0; flex: 0 0 45%; max-width: 45%;">
          <div class="center">
            <div style="
              width: 110px;
              height: 110px;
              border: 8px solid #52A0FC;
              box-sizing: border-box;
              border-radius: 50%;
              font-size: 35px;
              color: #52A0FC;
              margin: auto;
              display: flex; justify-content: center; align-items: center;
              font-weight: bold;">
                {{Model.token}}
            </div>
            <div style="margin-top: 15px; color: #52A0FC; font-size: 20px; text-align: center; font-weight: bold;">
              Token
            </div>
          </div>
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
        nup: "305",
        token: "570"
      },
    }
  },
  methods: {
    doViewNUPToken() {
      this.$router.push({ name: "DD_NupToken"});
    },
    renderData() {
      let param = {
        project_id: this.Model.project_id
      };

      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard/dashboard-nup-token', param).then((response) => {
        let data = response.data.data;
        this.Model.nup = data.nup;
        this.Model.token = data.token;
      });
    },
  },
  mounted() {
    this.renderData();
  },
};
</script>