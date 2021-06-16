<template>
  <div style="height: 95%">
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
            <b-row>
              <b-col md="8">
                <b-img :src="urlHoonian + item.image" alt="" style="height: 310px;" fluid-grow @error="onImageLoadFailure($event)" @click="doViewDetail(item)" rounded />
              </b-col>
              <b-col md="4" style="background-color: #F8F8F8; min-height: 310px;">
                <b-row>
                  <b-col style="font-size: 18px; text-shadow: 0.5px 0px;">
                    {{item.header}}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col style="font-size: 14px;" class="text-eight">
                    {{item.content}}
                  </b-col>
                </b-row>
                <b-row align-v="end" style="position: absolute; bottom: 0; width: 100%; padding-right: 8px;">
                  <b-col align-self="end" style="font-size: 18px; text-shadow: 0.5px 0px; text-align: right;" class="text">
                    {{item.title}}
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
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
        list: {
          // 1200 because @media (min-width: 1200px) and therefore I want to switch to windowed mode
          windowed: 100,

          // Because: #app {padding: 80px 24px;}
          // padding: 24,
        },
        responsive: [
          { size: 1 },
        ],
        position: {
          start: -1,
        },
        navigation: {
          // when to show navigation
          start: 5000,
        },
        autoplay: { play: true, repeat: true, speed: 3000 },
      },
      Model: [],
    };
  },
  methods: {
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    doViewDetail(data) {
      // this.$store.commit("setParamPage", data);
      // this.$router.push({ name: "MK_ProjectDetail" });
    },
    getData() {
      let param = {
        company_group_id: this.company_group_id,
      };
      this.postJSON(
        this.urlHoonian + "/api/marketing-website/dashboard/announcement",
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