<template>
  <div v-if="Model.length > 0" style="height: 95%; background: #F8F8F8; margin-top: 20px;">
    <b-row>
      <b-col style="padding-left: 12px !important; text-shadow: 0.5px 0px; font-size: 22px;">
        {{ $t('promotions') }}
      </b-col>
      <b-col style="text-align: right; padding-right: 12px !important; color: #4A93B3; cursor: pointer;">
        <span @click="viewAll">
          {{ $t('view_all') }}
        </span>
      </b-col>
    </b-row>
    <b-row v-if="Model.length > 0" style="padding-top: 10px; background: #F8F8F8; padding-bottom: 20px;">
        <b-col class="noPadding" style="overflow-x: auto; white-space: nowrap; display: block !important;">
      <template v-for="(data, index) in Model">
        <b-row v-bind:key="index" style="display: inline-block !important; width: 80%;">
        <b-col :style="`box-shadow: 2px 6px 11px -7px black; border-radius: 6px;
          -webkit-box-flex: 0;
          flex: 0 0 21%;
          padding: 0px !important;` + (index < Model.length-1 ? 'margin-right: 5%;' : '')
        "  @click="doViewDetail(data)">
          <b-row>
            <b-col style="height: 45vw; padding: 0px !important;">
              <b-img :src="urlHoonian + data.picture" alt="" class="center" style="max-height: 100%;" fluid-grow rounded @error="onImageLoadFailure($event)" />
              <span class="highlight-project">
                {{data.project_name}}
              </span>
              <!-- <div style="position: absolute;
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
              </div> -->
            </b-col>
          </b-row>
          <b-row style="padding-left: 10px; margin-top: 10px;">
            <b-col style="font-size: 15px; font-weight: bold;">
              {{cutWord(data.promotion_name, 20)}}
            </b-col>
          </b-row>
          <!-- <b-row>
            <b-col style="font-size: 12px; color: #52A0FC;">
              {{cutWord(data.project_name,25)}}
            </b-col>
          </b-row> -->
          <b-row style="padding-left: 10px; padding-bottom: 10px;">
            <b-col style="font-size: 12px; color: #616161;">
              {{momentUnix(data.start_datetime, "MMM YYYY")}} - {{momentUnix(data.end_datetime, "MMM YYYY")}}
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      </template>
    </b-col>
    </b-row>
    <!-- <b-row v-if="Model.length > 0" style="margin-top: 10px;">
      <b-col style="overflow-x: auto; white-space: nowrap; display: block !important;">
        <template v-for="(item, index) in Model">
          <div class="card" v-bind:key="index" style="display: inline-block !important; width: 35%; margin-right: 10px;">
            <div class="card__body" style="padding: unset !important;">
              <b-row>
                <b-col style="padding: unset !important;">
                  <b-img :src="urlHoonian + item.picture" alt="" class="img-h"
                  :style="`cursor: pointer; position: relative;`"
                  fluid-grow @error="onImageLoadFailure($event)" @click="doViewDetail(item)" />
                  <span style="position: absolute; width: 87%; left: 20px; top: 10px; background: rgba(0, 0, 0, 0.3); color: white; padding: 5px 10px; font-size: 12px;">
                    {{item.project_name}}
                  </span>
                </b-col>
              </b-row>
              <b-row style="padding: 10px !important;">
                <b-col style="font-size: 14px; text-shadow: 0.5px 0px;">
                  {{item.promotion_name}}
                </b-col>
              </b-row>
              <b-row style="padding: 0px 10px !important; padding-bottom: 10px; font-size: 10px;">
                <b-col style="">
                  {{momentUnix(item.start_datetime, "MMM YYYY")}} - {{momentUnix(item.end_datetime, "MMM YYYY")}}
                </b-col>
              </b-row>
            </div>
          </div>
        </template>
      </b-col>
    </b-row> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      Model: [],
    };
  },
  methods: {
    viewAll() {
      this.$router.push({ name: "MK_AllPromotionCommon" });
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    doViewDetail(data) {
      console.log(data);
    },
    getData() {
      let param = {
        company_group_id: this.company_group_id,
        // principle_id: this.getDataUser().principle_id,
      };
      this.postJSON(
        this.urlHoonian + "/api/marketing-website/common/dashboard/promotion",
        param,
        false,
        false,
      ).then((response) => {
        if (response == null) return;
        this.Model = response.data;
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style scoped>
.text {
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 3; /* number of lines to show */
   -webkit-box-orient: vertical;
}

.highlight-project {
    position: absolute;
    width: 87%;
    left: 50%;
    top: 20%;
    background: rgba(0, 0, 0, 0.3);
    color: white;
    padding: 5px 10px;
    font-size: 12px;
    transform: translate(-50%, -50%);
}

@media (min-width: 992px) {
  .img-h {
    height: 170px;
  }

  .highlight-project {
    position: absolute;
    width: 87%;
    left: 50%;
    top: 20%;
    background: rgba(0, 0, 0, 0.3);
    color: white;
    padding: 5px 10px;
    font-size: 12px;
    transform: translate(-50%, -50%);
  }
}
@media (min-width: 1200px) {
  .img-h {
    height: 240px;
  }
  
  .highlight-project {
    position: absolute;
    width: 87%;
    left: 50%;
    top: 10%;
    background: rgba(0, 0, 0, 0.3);
    color: white;
    padding: 5px 10px;
    font-size: 12px;
    transform: translate(-50%, -50%);
  }
}

</style>