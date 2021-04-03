<template>
  <div v-if="Model.length > 0" style="height: 95%; background: #F8F8F8; margin-top: 20px;">
    <b-row>
      <b-col style="padding-left: 12px !important;">
        {{ $t('promotions') }}
      </b-col>
      <b-col style="text-align: right; padding-right: 12px !important; color: #4A93B3;">
        {{ $t('view_all') }}
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="Model.length > 0" style="padding-left: 50px; padding-right: 50px;">
        <vue-horizontal-list
          :items="Model"
          :options="options"
        >
          <template v-slot:nav-prev>
            <!-- <div>
              <b-img :src="require('@/assets/icon-svg/chevron_left.svg')" alt="" style="cursor: pointer; margin-top: 8px; margin-left: unset !important;" />
            </div> -->
          </template>

          <template v-slot:nav-next>
            <!-- <div>
              <b-img :src="require('@/assets/icon-svg/chevron_right.svg')" alt="" style="cursor: pointer; margin-top: 8px; margin-right: unset !important;" />
            </div> -->
          </template>

          <template v-slot:start>
            <!-- <div>First Item</div> -->
          </template>

          <template v-slot:end>
            <!-- <div>Last Item</div> -->
          </template>
          <template v-slot:default="{item}">
            <div class="card">
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
        </vue-horizontal-list>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {
        // item: {
        //   // css class to inject into each individual item
        //   class: "",
        //   // padding between each item
        //   padding: 12,
        // },
        // list: {
        //   // 1200 because @media (min-width: 1200px) and therefore I want to switch to windowed mode
        //   // windowed: 1200,

        //   // Because: #app {padding: 80px 24px;}
        //   padding: 24,
        // },
        responsive: [
          // { end: 576, size: 1 },
          // { start: 576, end: 768, size: 2 },
          // { start: 768, end: 992, size: 3 },
          // { size: 4 },
          { end: 576, size: 2 },
          // { start: 576, end: 768, size: 3 },
          { start: 576, end: 1500, size: 3 },
          // { start: 992, end: 1200, size: 4 },
          { start: 1500, size: 4 },
        ],
        position: {
          start: -1,
        },
        navigation: {
          // when to show navigation
          start: 5000,
        },
        // autoplay: { play: true, repeat: true, speed: 3000 },
      },
      Model: [],
    };
  },
  methods: {
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