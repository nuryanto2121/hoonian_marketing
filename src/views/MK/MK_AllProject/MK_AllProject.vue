<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row>
        <b-col sm="4" v-for="item in Model.data" :key="item.id" style="">
          <div class="card">
            <div class="card__body" style="padding: unset !important;">
              <b-row>
                <b-col style="padding: unset !important;">
                  <b-img :src="urlHoonian + item.main_pic" alt=""
                  :style="`height: 310px; cursor: pointer;`"
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
                  {{ item.unit_type_desc }}
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