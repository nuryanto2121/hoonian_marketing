<template>
  <div class="card" style="height: 100%">
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
              @click="doViewAllPromotion"
            />
          </span>
        </b-col>
      </b-row>
    </div>
    <div class="card__body">
      <b-row style="height: 100%">
        <template v-for="(data, index) in Model">
          <b-col md="3" v-bind:key="index" :style="`box-shadow: 2px 6px 11px -7px black; border-radius: 6px;
            -webkit-box-flex: 0;
            flex: 0 0 21%;
            padding: 0px !important;
            max-width: 21%;` + (index < Model.length-1 ? 'margin-right: 5%;' : '')
          ">
            <b-row>
              <b-col style="height: 18vw; padding: 0px !important;">
                <b-img :src="urlHoonian + data.picture" alt="" style="height: 100%;" fluid-grow rounded @error="onImageLoadFailure($event)" />
                <div style="position: absolute;
                  top: 18px;
                  right: 0%;
                  background: #52A0FC;
                  border-radius: 5px;
                  width: 100px;
                  padding: 5px;
                  text-align: center;
                  font-size: 14px;
                  color: white;">
                  <b>{{data.total_buyer}} Buyers</b>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col style="font-size: 15px; font-weight: bold;">
                {{data.promotion_name}}
              </b-col>
            </b-row>
            <b-row>
              <b-col style="font-size: 12px; color: #52A0FC;">
                {{data.project_name}}
              </b-col>
            </b-row>
            <b-row>
              <b-col style="font-size: 12px; color: #616161; font-weight: bold;">
                {{momentUnix(data.start_datetime, "MMM YYYY")}} - {{momentUnix(data.end_datetime, "MMM YYYY")}}
              </b-col>
            </b-row>
            <!-- <b-row>
              <b-col>
                <div style="
                  margin: auto;
                  width: 90%;
                  background: #52A0FC;
                  border-radius: 4px;
                  font-size: 18px;
                  color: #2A5F9E;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                ">
                  {{data.total_buyer}} Buyers
                </div>
              </b-col>
            </b-row> -->
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
      this.renderData();
    }
  },
  methods: {
    doViewAllPromotion() {
      this.$router.push({ name: "DD_Promotion"});
    },
    renderData() {
      let param = {
        project_id: this.getDashboardProjectID(),
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/dashboard-promotion",
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
    this.renderData();
  },
};
</script>