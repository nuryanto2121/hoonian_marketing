<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col lg="12" xl="12">
          <b-row>
              <b-col lg="12" xl="12">
                  <div class="card">
                    <div class="card__title" style="padding-bottom: 5px !important; padding-left: 20px !important;">
                    <b-row class="title-primary">
                        <b-col style="max-width: max-content !important;">
                        <span>Promotion</span>
                        </b-col>
                        <b-col class="col-right">
                        <span>
                            <ABSButton
                            :text="'Back'"
                            classButton="button button--back"
                            classIcon="icon-style-1"
                            @click="doBack"
                            />
                        </span>
                        </b-col>
                    </b-row>
                    </div>
                </div>
              </b-col>
          </b-row>
          <b-row>
            <b-col lg="12" xl="12">
                <template v-for="(dataPromotion, id) in Model">
                    <div class="card" v-bind:key="id" style="margin-bottom: 20px;">
                        <div class="card__body" style="padding: 20px;">
                            <b-row style="margin-bottom: 10px;">
                                <b-col>
                                    <span style="font-weight: bold; font-size: 23px; color: #4a93b3;"> {{dataPromotion.project_name}} </span>
                                </b-col>
                            </b-row>
                            <b-row style="height: 100%">
                                <template v-for="(dataMedia, idm) in dataPromotion.details">
                                    <b-col md="3" v-bind:key="idm" :style="`max-width: 20%;` + (idm < dataPromotion.details.length-1 ? 'margin-right: 5%;' : '')">
                                        <div :style="`margin-top: 10px; box-shadow: 2px 6px 11px -7px black; border-radius: 6px;
                                            -webkit-box-flex: 0;
                                            flex: 0 0 21%;
                                            padding: 0px !important;`
                                        ">
                                          <b-row>
                                            <b-col style="height: 18vw; padding: 0px !important; margin-top: 10px;">
                                                <b-img :src="urlHoonian + dataMedia.picture" alt="" style="height: 100%;" fluid-grow rounded @error="onImageLoadFailure($event)" />
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
                                                    <b>{{dataMedia.total_buyer}} Buyers</b>
                                                </div>
                                            </b-col>
                                          </b-row>
                                          <b-row>
                                              <b-col style="font-size: 15px; font-weight: bold;">
                                                  {{dataMedia.promotion_name}}
                                              </b-col>
                                          </b-row>
                                          <b-row>
                                              <b-col style="font-size: 12px; color: #52A0FC;">
                                                  {{dataPromotion.project_name}}
                                              </b-col>
                                          </b-row>
                                          <b-row>
                                              <b-col style="font-size: 12px; color: #616161; font-weight: bold;">
                                                  {{momentUnix(dataMedia.start_datetime, "MMM YYYY")}} - {{momentUnix(dataMedia.end_datetime, "MMM YYYY")}}
                                              </b-col>
                                          </b-row>
                                        </div>
                                        <b-row v-if="paramFromList.showEdit" style="margin-top: 10px;">
                                          <b-col>
                                            <ABSButton
                                              text="Edit"
                                              classButton="button button--new mgn"
                                              styleButton="background-color: rgb(74, 147, 179); color: white; width: 100%;"
                                              @click="showEdit(dataMedia)"
                                            />
                                          </b-col>
                                        </b-row>
                                    </b-col>
                                </template>
                            </b-row>
                        </div>
                    </div>
                </template>
            </b-col>
          </b-row>
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
      this.getDataDetail();
    }
  },
  data() {
    return {
        M_project_id: this.getDashboardProjectID(),
        Model: [],
    };
  },
  computed: {
    paramFromList() {
      var param = this.$store.getters.getParamPage;
      return param;
    },
  },
  methods: {
    doBack() {
      this.$router.go(-1);
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    getDataPromotion() {
        let param = {
            project_id: this.M_project_id,
        };
        this.postJSON(
            this.urlHoonian + "/api/hoonian-website/dashboard/dashboard-all-promotion",
            param
        ).then((response) => {
            if (response == null) return;

            this.Model = response.data;
        });
    },
    showEdit(record) {
        console.log(record)
        let param = this.paramFromList;
        param.isEdit = true;
        param.DetailList = record;
        this.$store.commit("setParamPage", param);
        this.$router.push({ name: "OP_ProjectPromotionForm" });
    }
  },
  mounted() {
    this.getDataPromotion();
  },
};
</script>

<style scoped>
@media (min-width: 992px) {
    .precentage {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        
        width: 175px;
        height: 175px;
        background-color: #FFFFFF;
        border-radius: 50%;
        border: 20px solid #ffc700;
        text-align: center;

        padding-top: 20%;

        color: #333399; font-size: 40px; font-weight: bold;
    }
    .progress-x {
        position: absolute;
        /* top: 225px; */
        bottom: 10%;
        left: 50%;
        transform: translate(-50%, -50%);

        text-align: center;
        font-weight: bold; font-size: 20px
    }
    .offset-right {
        margin-left: 29%;
    }
}
@media (min-width: 1200px) {
    .precentage {
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);

        width: 200px;
        height: 200px;
        background-color: #FFFFFF;
        border-radius: 50%;
        border: 25px solid #ffc700;
        text-align: center;

        padding-top: 13%;
        
        color: #333399; font-size: 50px; font-weight: bold;
    }
    .progress-x {
        position: absolute;
        /* top: 85%; */
        bottom: 0;
        left: 50%;
        transform: translate(-50%, -50%);

        text-align: center;
        font-weight: bold; font-size: 25px
    }
    .offset-right {
        margin-left: 19%;
    }
}
</style>
