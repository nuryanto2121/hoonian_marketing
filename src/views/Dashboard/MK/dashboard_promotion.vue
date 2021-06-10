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
    <b-row v-if="Model.length > 0" style="margin-top: 10px;">
      <b-col style="overflow-x: auto; white-space: nowrap; display: block !important;">
        <template v-for="(item, index) in Model">
          <div class="card" v-bind:key="index" style="display: inline-block !important; width: 35%; margin-right: 10px;">
            <div class="card__body" style="padding: unset !important;">
              <b-row>
                <b-col style="padding: unset !important;">
                  <b-img :src="urlHoonian + item.picture" alt=""
                  :style="`height: 160px; cursor: pointer; position: relative;`"
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
    </b-row>
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
      this.$router.push({ name: "MK_AllPromotion" });
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
        principle_id: this.getDataUser().principle_id,
      };
      this.postJSON(
        this.urlHoonian + "/api/marketing-website/dashboard/promotion",
        param
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
</style>