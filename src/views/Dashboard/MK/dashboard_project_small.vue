<template>
  <div style="height: 95%">
    <b-row style="margin-top: 30px;">
      <b-col v-if="Location.length > 0" style="padding-left: 10px !important; text-shadow: 0.5px 0px; font-size: 22px;">
        Search Project By Location
      </b-col>
      <b-col style="text-align: right; text-shadow: 0.5px 0px; font-size: 18px;">
        <span style="position: absolute; width: 8px; height: 8px; background: #4A93B3; margin-top: 10px;">
          &nbsp;
        </span>
        <span style="text-shadow: 0.5px 0px; padding-right: 5px;">
          &nbsp;&nbsp;&nbsp;&nbsp; {{Location.length > 0 ? Location[0].company_group_name: ""}}
        </span>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <vue-horizontal-list
          v-if="Location.length > 0"
          :items="Location"
          :options="optionsLocation"
        >
          <template v-slot:nav-prev>
          </template>

          <template v-slot:nav-next>
          </template>

          <template v-slot:start>
          </template>

          <template v-slot:end>
          </template>

          <template v-slot:default="{item}">
            <b-row>
              <b-col>
                <b-img :src="urlHoonian + item.picture" alt="" :style="item.id == locationId? 'height: 133px;': 'height: 121px;'" style="cursor: pointer;" fluid-grow @error="onImageLoadFailure($event)" @click="doProjectByLocation(item)" rounded/>
                <div style="position: absolute; bottom: 0; color: white; font-weight: bold; font-size: 14px; margin-bottom: 5px; margin-left: 5px;">
                  {{item.location}}
                </div>
              </b-col>
            </b-row>
          </template>
        </vue-horizontal-list>
      </b-col>
    </b-row>
    <br />
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
                    <b-img :src="urlHoonian + item.main_pic" alt=""
                    :style="`height: 310px; cursor: pointer;`"
                    fluid-grow @error="onImageLoadFailure($event)" @click="doViewDetail(item)" rounded />
                  </b-col>
                </b-row>
                <b-row style="padding: 10px !important;">
                  <b-col style="font-size: 14px; text-shadow: 0.5px 0px;" class="text-single">
                    {{item.project_name}}
                  </b-col>
                  <b-col md="4" style="font-size: 14px; text-align: right; text-shadow: 0.5px 0px;">
                    {{item.project_category_name}}
                  </b-col>
                </b-row>
                <b-row style="padding: 0px 10px !important; padding-bottom: 10px; font-size: 10px;">
                  <b-col style="">
                    <b-img :src="require('@/assets/icon-svg/map-pin.svg')" alt="" style="" />
                    {{item.location_name}}
                  </b-col>
                </b-row>
                <b-row style="padding: 0px 10px !important; padding-bottom: 10px; font-size: 10px;">
                  <b-col style="min-height: 60px;" class="text-fourth">
                    {{ item.remarks }}
                  </b-col>
                </b-row>
              </div>
            </div>
          </template>
        </vue-horizontal-list>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="Model2.length > 0" style="padding-left: 50px; padding-right: 50px;">
        <vue-horizontal-list
          :items="Model2"
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
                    <b-img :src="urlHoonian + item.main_pic" alt=""
                    :style="`height: 310px; cursor: pointer;`"
                    fluid-grow @error="onImageLoadFailure($event)" @click="doViewDetail(item)" rounded />
                  </b-col>
                </b-row>
                <b-row style="padding: 10px !important;">
                  <b-col style="font-size: 14px; text-shadow: 0.5px 0px;" class="text-single">
                    {{item.project_name}}
                  </b-col>
                  <b-col md="4" style="font-size: 14px; text-align: right; text-shadow: 0.5px 0px;">
                    {{item.project_category_name}}
                  </b-col>
                </b-row>
                <b-row style="padding: 0px 10px !important; padding-bottom: 10px; font-size: 10px;">
                  <b-col style="">
                    <b-img :src="require('@/assets/icon-svg/map-pin.svg')" alt="" style="" />
                    {{item.location_name}}
                  </b-col>
                </b-row>
                <b-row style="padding: 0px 10px !important; padding-bottom: 10px; font-size: 10px;">
                  <b-col style="min-height: 60px;" class="text-fourth">
                    {{ item.remarks }}
                  </b-col>
                </b-row>
              </div>
            </div>
          </template>
        </vue-horizontal-list>
      </b-col>
    </b-row>
    <div v-if="Model.length > 0" style="text-align: center; color: #4A93B3; cursor: pointer; margin-top: 10px;" @click="showMore">
      {{ $t('show_more') }}
    </div>
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
        //   // 1200 because @media (min-width: 1200px) and therefore I want to switch to windowed mode
          windowed: 100,

        //   // Because: #app {padding: 80px 24px;}
        //   padding: 24,
        },
        responsive: [
          // { end: 576, size: 1 },
          // { start: 576, end: 768, size: 2 },
          // { start: 768, end: 992, size: 3 },
          // { size: 4 },
          { end: 576, size: 2 },
          { start: 576, end: 768, size: 3 },
          { start: 768, end: 992, size: 3 },
          { start: 992, end: 1200, size: 3 },
          { start: 1200, size: 4 },
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
      Model2: [],
      projectId: "all",
      locationId: "all",
      projectStatus: "all",
      Location: [],
      optionsLocation: {
        // item: {
        //   // css class to inject into each individual item
        //   class: "",
        //   // padding between each item
        //   padding: 12,
        // },
        list: {
        //   // 1200 because @media (min-width: 1200px) and therefore I want to switch to windowed mode
          windowed: 100,

        //   // Because: #app {padding: 80px 24px;}
        //   padding: 24,
        },
        responsive: [
          { end: 576, size: 3 },
          { start: 576, end: 768, size: 4 },
          { start: 768, end: 992, size: 6 },
          { size: 8 },
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
    };
  },
  methods: {
    showMore() {
      this.$router.push({ name: "MK_AllProject" });
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    doViewDetail(data) {
      this.$store.commit("setParamPage", data);
      this.$router.push({ name: "MK_ProjectDetail" });
    },
    getData() {
      let param = {
        company_group_id: this.company_group_id,
        principle_id: this.getDataUser().principle_id,
        project_id: this.projectId,
        location_id: this.locationId,
        project_status: this.projectStatus,
      };
      this.postJSON(
        this.urlHoonian + "/api/marketing-website/dashboard/project-small",
        param
      ).then((response) => {
        if (response == null) return;
        let data = response.data;
        this.Model = [];
        this.Model2 = [];
        for (let x = 0; x < data.length; x++) {
          if (x % 2 == 0) {
            this.Model.push(data[x]);
          } else {
            this.Model2.push(data[x]);
          }
        }
      });
    },
    getLocation() {
      let param = {
        company_group_id: this.company_group_id,
        principle_id: this.getDataUser().principle_id,
      };
      this.postJSON(
        this.urlHoonian + "/api/marketing-website/dashboard/location",
        param
      ).then((response) => {
        if (response == null) return;
        this.Location = response.data;
      });
    },
    doProjectByLocation(data) {
      // this.projectId = data.id;
      this.locationId = data.id;
      // this.projectStatus = data.id;
      this.getData();
    },
  },
  mounted() {
    this.getLocation();
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