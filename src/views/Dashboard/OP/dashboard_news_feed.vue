<template>
  <div class="card" style="height: 95%">
    <div class="card__body" style="padding-left: 5px !important; padding-right: 5px !important;">
      <b-row style="margin-bottom: 10px;">
        <b-col style="max-width: max-content !important; margin-left: 5px;">
          <span style="font-size: 16px; color: #333399; font-weight: bold;">News Feed</span>
        </b-col>
        <b-col style="text-align: right">
          <span>
            <ABSButton
              :text="'View All'"
              classButton="button button--back"
              classIcon="icon-style-1"
              @click="doViewAll"
            />
          </span>
        </b-col>
      </b-row>
      <b-row>
        <template v-for="(data, index) in Model">
          <b-col md="2" v-bind:key="index" @click="onClickData(data)">
            <b-row>
              <b-col>
                <b-img :src="urlHoonian + data.main_image" alt="" style="height: 100px;" fluid-grow rounded @error="onImageLoadFailure($event)" />
              </b-col>
            </b-row>
            <b-row>
              <b-col style="font-size: 14px;">
                {{data.title}}
              </b-col>
            </b-row>
            <b-row>
              <b-col style="font-size: 10px; color: rgba(159, 162, 174, 0.7);">
                {{momentUnix(data.created_at, "DD MMM YYYY")}}
              </b-col>
            </b-row>
            <b-row>
              <b-col style="font-size: 10px; color: rgba(0, 0, 0, 0.5);" class="text">
                {{data.description}}
              </b-col>
            </b-row>
          </b-col>
        </template>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Model: [],
    };
  },
  computed: {
    _projectId () {
      return this.$store.getters.getProjectId;
    }
  },
  watch: {
    _projectId (newValue, oldValue) {
      this.getNewsFeed();
    }
  },
  methods: {
    doViewAll() {
      let param = {};
      param.showEdit = true;
      param.project_id = this.getDashboardProjectID();
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_NewsFeed"});
    },
    onClickData(record) {
      let param = {project_id: this.getDashboardProjectID()};
      param.isEdit = record? true: false;
      param.DetailList = record;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_NewsFeedForm" });
    },
    getNewsFeed() {
      let param = {
        project_id: this.getDashboardProjectID(),
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/dashboard-news",
        param
      ).then((response) => {
        if (response == null) return;
        this.Model = response.data.list;
      });
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
  },
  mounted() {
    this.getNewsFeed();
  },
};
</script>
<style scoped>
.text {
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 7;
   -webkit-box-orient: vertical;
   margin-bottom: 5px;
}
</style>