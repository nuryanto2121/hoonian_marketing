<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body" style="font-family: Poppins !important;">
      <div class="">
        <div class="card" style="font-size: 12px !important;">
          <div class="card__body">
            <b-row>
              <b-col md="2" lg="2" style="color: #4A93B3; font-size: 16px;">
                News
              </b-col>
              <b-col style="text-align: right;">
                <ABSButton
                  :text="'Back'"
                  classButton="button button--back"
                  classIcon="icon-style-1"
                  @click="$router.go(-1)"
                />
              </b-col>
            </b-row>
          </div>
        </div>
      </div>
      <div class="card" v-for="(data, index) in Model">
        <div :class="'card__title'" style="border-bottom: unset !important;">
          <b-row>
            <b-col style="color: #4A93B3;" class="font-poppins">
              {{data.project_name}}
            </b-col>
          </b-row>
        </div>
        <div class="card__body" style="padding-left: 15px !important; padding-right: 5px !important;">
          <b-row>
            <template v-for="(detail, indexDetail) in data.details">
              <b-col md="2">
                <b-row>
                  <b-col>
                    <b-img :src="urlHoonian + detail.main_image" alt="" style="height: 100px;" fluid-grow rounded @error="onImageLoadFailure($event)" />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col style="font-size: 14px;">
                    {{detail.title}}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col style="font-size: 10px; color: rgba(159, 162, 174, 0.7);">
                    {{momentUnix(detail.created_at, "DD MMM YYYY")}}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col style="font-size: 10px; color: rgba(0, 0, 0, 0.5);" class="text">
                    {{detail.description}}
                  </b-col>
                </b-row>
                <b-row style="margin-top: 10px;">
                  <b-col>
                    <ABSButton
                      text="Edit"
                      classButton="button button--new mgn"
                      styleButton="background-color: rgb(74, 147, 179); color: white; width: 100%;"
                      @click="showNewsFeed(detail, indexDetail)"
                    />
                  </b-col>
                </b-row>
              </b-col>
            </template>
          </b-row>
        </div>
      </div>
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
    paramFromList() {
      let param = this.$store.getters.getParamPage;
      return param;
    },
  },
  methods: {
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    showNewsFeed(record, index) {
      let param = this.paramFromList;
      param.isEdit = record? true: false;
      param.DetailList = record;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_NewsFeedForm" });
    },
    getDataNewsFeed() {
      let param = {
        project_id: this.paramFromList.project_id,
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/dashboard-all-news",
        param
      ).then((response) => {
        if (response == null) return;

        this.Model = response.data;
      });
    },
  },
  mounted() {
    this.getDataNewsFeed();
  }
};
</script>
<style scoped>
.text {
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 2;
   -webkit-box-orient: vertical;
}
.no-padding {
  padding: unset !important;
}
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>