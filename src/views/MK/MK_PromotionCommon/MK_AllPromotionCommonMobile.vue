<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col lg="12" xl="12" style="background: white;">
          <template v-for="(promotion, index) in Model">
            
            <b-row :key="index" style="margin-top: 20px;">
              <b-col style="font-size: 19px; color: #4A93B3">
                {{ promotion.project_name }}
              </b-col>
            </b-row>

            <template v-for="(detail, indexDetail) in promotion.details">
              <b-row :key="indexDetail">
                <template v-if="indexDetail % 2 == 0">
                  <b-col sm="6" :key="indexDetail">
                    <div class="card">
                      <div class="card__body" style="padding: unset !important;">
                        <b-row align-h="center">
                          <b-col sm="8" style="height: 45vw; padding: unset !important;">
                            <b-img :src="urlHoonian + promotion.details[indexDetail].picture" alt=""
                            :style="`max-height: 100%; cursor: pointer; position: relative;`"
                            fluid-grow @error="onImageLoadFailure($event)" @click="doViewDetail(promotion.details[indexDetail])" />
                            <!-- <span style="position: absolute; width: 87%; left: 20px; top: 10px; background: rgba(0, 0, 0, 0.3); color: white; padding: 5px 10px; font-size: 12px;">
                              {{promotion.details[indexDetail].promotion_name}}
                            </span> -->
                          </b-col>
                        </b-row>
                        <b-row style="padding: 10px !important;">
                          <b-col style="font-size: 14px; text-shadow: 0.5px 0px;">
                            {{promotion.details[indexDetail].promotion_name}}
                          </b-col>
                        </b-row>
                        <b-row style="padding: 0px 10px !important; padding-bottom: 10px; font-size: 10px;">
                          <b-col style="">
                            {{momentUnix(promotion.details[indexDetail].start_datetime, "MMM YYYY")}} - {{momentUnix(promotion.details[indexDetail].end_datetime, "MMM YYYY")}}
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-col>

                  <b-col sm="6" :key="indexDetail" v-if="promotion.details.length > indexDetail + 1">
                    <div class="card">
                      <div class="card__body" style="padding: unset !important;">
                        <b-row align-h="center">
                          <b-col sm="8" style="height: 45vw; padding: unset !important;">
                            <b-img :src="urlHoonian + promotion.details[indexDetail + 1].picture" alt=""
                            :style="`max-height: 100%; cursor: pointer; position: relative;`"
                            fluid-grow @error="onImageLoadFailure($event)" @click="doViewDetail(promotion.details[indexDetail + 1])" />
                            <!-- <span style="position: absolute; width: 87%; left: 20px; top: 10px; background: rgba(0, 0, 0, 0.3); color: white; padding: 5px 10px; font-size: 12px;">
                              {{promotion.details[indexDetail + 1].promotion_name}}
                            </span> -->
                          </b-col>
                        </b-row>
                        <b-row style="padding: 10px !important;">
                          <b-col style="font-size: 14px; text-shadow: 0.5px 0px;">
                            {{promotion.details[indexDetail + 1].promotion_name}}
                          </b-col>
                        </b-row>
                        <b-row style="padding: 0px 10px !important; padding-bottom: 10px; font-size: 10px;">
                          <b-col style="">
                            {{momentUnix(promotion.details[indexDetail + 1].start_datetime, "MMM YYYY")}} - {{momentUnix(promotion.details[indexDetail + 1].end_datetime, "MMM YYYY")}}
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-col>
                </template>
              </b-row>
            </template>
            <hr />

          </template>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    paramFromList() {
      let param = this.$store.getters.getParamPage;
      if (param == null || param == undefined) {
        this.doBack();
      } else {
        if (Object.keys(param).length < 1) {
          this.doBack();
        } else {
      return param;
        }
      }
    },
  },
  watch: {
  },
  data() {
    return {
      Model: {
        
      },
    }
  },
  methods: {
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    getAllPromotion() {
      let param = {
        company_group_id: this.company_group_id,
        // principle_id: this.getDataUser().principle_id,
      };

      this.postJSON(this.urlHoonian + '/api/marketing-website/common/dashboard/all-promotion', param, false, false).then((response) => {
        if (response == null) return;
        this.Model = response.data;
      });
    },
  },
  mounted() {
    this.getAllPromotion();
  },
};
</script>

<style scoped>
</style>
