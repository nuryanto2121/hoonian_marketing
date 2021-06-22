<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row>
        <b-col style="text-shadow: 0.5px 0px; font-size: 22px; padding-left: 10px !important;">
          {{ $t('search_project_by_location') }}
        </b-col>
      </b-row>
      <b-row style="margin-top: 10px;">
        <b-col style="overflow-x: auto; white-space: nowrap; display: block !important;">
          <template v-for="(item, index) in Location">
            <b-row v-bind:key="index" style="display: inline-block !important; width: 17%;">
              <b-col>
                <b-img :src="urlHoonian + item.picture" alt="" :style="item.id == locationId? 'height: 133px;': 'height: 121px;'" style="cursor: pointer;" fluid-grow @error="onImageLoadFailure($event)" @click="doProjectByLocation(item)" rounded/>
                <div style="position: absolute; bottom: 0; color: white; font-weight: bold; font-size: 14px; margin-bottom: 5px; margin-left: 5px;">
                  {{item.location}}
                </div>
              </b-col>
            </b-row>
          </template>
        </b-col>
      </b-row>
      <b-row style="margin-top: 20px;">
        <b-col sm="4" v-for="item in Model.data" :key="item.id" style="">
          <div class="card">
            <div class="card__body" style="padding: unset !important;">
              <b-row>
                <b-col style="padding: unset !important;">
                  <b-img :src="urlHoonian + item.main_pic" alt=""
                  :style="`height: 273px; cursor: pointer;`"
                  fluid-grow @error="onImageLoadFailure($event)" @click="doViewDetail(item)" />
                </b-col>
              </b-row>
              <b-row style="padding: 10px !important;">
                <b-col style="font-size: 14px; text-shadow: 0.5px 0px;">
                  {{item.project_name}}
                </b-col>
                <b-col md="2" style="font-size: 14px; text-align: right; text-shadow: 0.5px 0px;">
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
                <b-col style="">
                  {{ item.remarks }}
                </b-col>
              </b-row>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row style="margin-top: 10px;">
        <b-col>
          <b-pagination
            align="center"
            v-model="current_page"
            @input="changePagination"
            :total-rows="Model.Total"
            :per-page="per_page"
            :limit="limit"
            style="margin-bottom: 0px"
            :class="isPoppins ? 'font-poppins': ''"
            :disabled="false"
          ></b-pagination>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current_page: 1,
      totalRows: 0,
      per_page: 12,
      limit: 2,

      Model: {
        Total: 1,
        Current_Page: 1,
        Last_Page: 1,
        DefineColumn: "",
        ExportToken: "",
        AllColumn: "",
        DefineSize: "",
        Error: false,
        data: [],
      },
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
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    doViewDetail(data) {
      console.log(data);
    },
    changePagination() {
      this.getData();
    },
    getData() {
      let param = {
        current_page: this.current_page,
        per_page: this.per_page,
        sort_by: "desc",
        company_group_id: this.company_group_id,
        principle_id: this.getDataUser().principle_id,
        project_id: this.projectId,
        location_id: this.locationId,
        project_status: this.projectStatus,
      };
      this.postJSON(
        this.urlHoonian + "/api/marketing-website/dashboard/project-all",
        param
      ).then((response) => {
        if (response == null) return;
        this.Model = response;
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
    this.$store.commit("setTitleMenu", "All Project");
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