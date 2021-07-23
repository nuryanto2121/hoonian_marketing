<template>
  <div style="height: 95%">
    <b-row style="margin-top: 20px;">
      <b-col v-if="Location.length > 0" style="padding-left: 10px !important; text-shadow: 0.5px 0px; font-size: 11px;">
        {{ $t('search_project_by_location') }}
      </b-col>
      <b-col style="text-align: right; text-shadow: 0.5px 0px; font-size: 12px;">
        <span style="position: absolute; width: 8px; height: 8px; background: #4A93B3; margin-top: 5px;">
          &nbsp;
        </span>
        <span style="text-shadow: 0.5px 0px; padding-right: 5px;">
          &nbsp;&nbsp;&nbsp;&nbsp; {{Location.length > 0 ? Location[0].company_group_name: ""}}
        </span>
      </b-col>
    </b-row>
    <b-row style="margin-top: 10px;">
      <b-col style="overflow-x: auto; white-space: nowrap; display: block !important;">
        <template v-for="(item, index) in Location">
          <b-row v-bind:key="index" class="width_project_small_potrait-sm width_project_small_landscape-md" style="display: inline-block !important; overflow: hidden; padding-bottom: 5px;">
            <b-col>
              <b-img :src="urlHoonian + item.picture" alt="" :style="item.id == locationId? 'height: 87px;': 'height: 75px;'" style="cursor: pointer;" fluid-grow @error="onImageLoadFailure($event)" @click="doProjectByLocation(item)" rounded/>
              <div style="position: absolute; bottom: 0; color: white; font-weight: bold; font-size: 14px; margin-bottom: 5px; margin-left: 5px;">
                {{item.location}}
              </div>
            </b-col>
          </b-row>
        </template>
      </b-col>
    </b-row>
    <b-row v-if="Model.length > 0" style="margin-top: 10px;">
      <b-col style="overflow-x: auto; white-space: nowrap; display: block !important;">
        <template v-for="(item, index) in Model">
          <div class="card" v-bind:key="index" style="display: inline-block !important; width: 30%;">
            <div class="card__body" style="padding: unset !important;">
              <b-row>
                <b-col style="padding: unset !important;">
                  <b-img :src="urlHoonian + item.main_pic" alt=""
                  :style="`height: 273px; cursor: pointer;`"
                  fluid-grow @error="onImageLoadFailure($event)" @click="doViewDetail(item)" rounded />
                </b-col>
              </b-row>
              <b-row style="padding: 10px !important;">
                <b-col style="font-size: 14px; text-shadow: 0.5px 0px; white-space: normal !important;" class="text-single">
                  {{item.project_name}}
                </b-col>
                <b-col sm="4" xl="3" style="font-size: 14px; text-align: right; text-shadow: 0.5px 0px;">
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
                <b-col style="min-height: 30px; white-space: normal !important;" class="text-double">
                  {{ item.remarks }}
                </b-col>
              </b-row>
            </div>
          </div>
        </template>
      </b-col>
    </b-row>
    <b-row v-if="Model2.length > 0" style="margin-top: 10px;">
      <b-col style="overflow-x: auto; white-space: nowrap; display: block !important;">
        <template v-for="(item, index) in Model2">
          <div class="card" v-bind:key="index" style="display: inline-block !important; width: 30%;">
            <div class="card__body" style="padding: unset !important;">
              <b-row>
                <b-col style="padding: unset !important;">
                  <b-img :src="urlHoonian + item.main_pic" alt=""
                  :style="`height: 273px; cursor: pointer;`"
                  fluid-grow @error="onImageLoadFailure($event)" @click="doViewDetail(item)" rounded />
                </b-col>
              </b-row>
              <b-row style="padding: 10px !important;">
                <b-col style="font-size: 14px; text-shadow: 0.5px 0px; white-space: normal !important;" class="text-single">
                  {{item.project_name}}
                </b-col>
                <b-col sm="4" xl="3" style="font-size: 14px; text-align: right; text-shadow: 0.5px 0px;">
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
                <b-col style="min-height: 30px; white-space: normal !important;" class="text-double">
                  {{ item.remarks }}
                </b-col>
              </b-row>
            </div>
          </div>
        </template>
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
      Model: [],
      Model2: [],
      projectId: "all",
      locationId: "all",
      projectStatus: "all",
      Location: [],
    };
  },
  methods: {
    showMore() {
      this.$router.push({ name: "MK_AllProjectCommon" });
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    doViewDetail(data) {
      this.$store.commit("setParamPage", data);
      this.$router.push({ name: "MK_ProjectDetailCommon" });
    },
    getData() {
      let param = {
        company_group_id: this.company_group_id,
        // principle_id: this.getDataUser().principle_id,
        project_id: this.projectId,
        location_id: this.locationId,
        project_status: this.projectStatus,
      };
      this.postJSON(
        this.urlHoonian + "/api/marketing-website/common/dashboard/project-small",
        param,
        false,
        false,
      ).then((response) => {
        if (response == null) return;
        let data = response.data;
        this.Model = [];
        this.Model2 = [];
        if (data.length <= 8) {
          this.Model = data;
          return;
        }
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
        // principle_id: this.getDataUser().principle_id,
      };
      this.postJSON(
        this.urlHoonian + "/api/marketing-website/common/dashboard/location",
        param,
        false,
        false,
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