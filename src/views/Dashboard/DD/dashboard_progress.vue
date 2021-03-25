<template>
  <div class="card" style="height: 95%">
    <div class="card__title-newdash">
      <b-row>
        <b-col style="max-width: max-content !important">
          <span style="font-size: 16px; color: #333399;">{{title}}</span>
        </b-col>
        <b-col style="text-align: right">
          <span>
            <ABSButton
              :text="'View All'"
              classButton="button button--back"
              classIcon="icon-style-1"
              @click="doViewAllProgress"
            />
          </span>
        </b-col>
      </b-row>
    </div>
    <div class="card__body">
      <b-row>
        <template v-for="(data, index) in Model">
          <b-col md="2" v-bind:key="index" @click="onClickData(data)">
            <b-row>
              <b-col>
                <b-img :src="urlHoonian + data.main_image" alt="" style="height: 100px;" fluid-grow rounded @error="onImageLoadFailure($event)" />
              </b-col>
            </b-row>
            <b-row>
              <b-col style="font-size: 18px; font-weight: bold;">
                {{data.project_name}}
              </b-col>
            </b-row>
            <b-row>
              <b-col style="font-size: 12px; color: #52A0FC;">
                {{data.percentage_completed}}% Completed
              </b-col>
            </b-row>
            <b-row>
              <b-col style="font-size: 12px; color: rgba(159, 162, 174, 0.7);">
                {{momentUnix(data.created_at, "DD MMM YYYY")}}
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
  props: ['title'],
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
      this.getProgress();
    }
  },
  methods: {
    doViewAllProgress() {
      this.$router.push({ name: "DD_Progress"});
    },
    onClickData(data) {
      console.log(data)
      let param = data;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "DD_ProgressDetail"});
    },
    getProgress() {
      let param = {
        project_id: this.getDashboardProjectID(),
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/dashboard-project-progress",
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
    this.getProgress();
  },
};
</script>