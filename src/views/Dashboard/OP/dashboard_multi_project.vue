<template>
  <div :style="!isDashboardDev ? 'padding: 7px;': ''">
    <div v-if="isShowAll" :style="!isDashboardDev ? 'background: #C7C7C7; border-radius: 6px; padding-top: 12px; padding-bottom: 17px;': 'background: #FFFFFF'">
      <b-row>
        <b-col :style="!isDashboardDev ? '': 'padding: unset !important;'">
          <div :style="!isDashboardDev ?
          'margin-left: 12px; width: 130px; height: 40px; background: #333399; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 6px; padding: 5px 10px; font-size: 18px; color: #FFFFFF; text-align: center;'
          : 'margin-left: 5px; font-size: 18px; color: #333399; font-weight: bold;'
          ">
            Project Info
          </div>
        </b-col>
      </b-row>
      <!-- <b-row style="margin-top: 30px;" >
        <div style="width: 53px; margin: auto 0;">
          <b-img v-if="projectInfos.length > 4" :src="require('@/assets/icon-svg/chevron_left.svg')" alt="" style="cursor: pointer;" @click="onLeftClick"/>
        </div>
        <b-col style="padding: unset !important;">
          <b-row>
            <template v-for="data in tempInfos">
              <b-col lg="3" xl="3">
                <div style="background: linear-gradient(0deg, #FFFFFF, #FFFFFF), #FFFFFF; box-shadow: 2px 6px 11px -7px rgba(0, 0, 0, 0.29); border-radius: 6px; padding-bottom: 10px;">
                  <b-row>
                    <b-col class="no-padding">
                      <b-img :src="urlHoonian + data.pic" alt="" style="height: 15vw; cursor: pointer;" fluid-grow rounded="top" @error="onImageLoadFailure($event)" @click="doViewDetail(data)" />
                      <div style="position: absolute;
                        top: 18px;
                        right: 0%;
                        background: rgba(45, 71, 175, 0.7);
                        width: 50px;
                        height: 20px;
                        text-align: center;
                        font-size: 14px;
                        color: white;">
                        <b>{{data.progress_percentage.split(".")[0]}}%</b>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row style="padding-top: 8px; padding-left: 0px;">
                    <b-col class="no-padding">
                      <b-row>
                        <b-col lg="8" xl="8">
                          <b-row style="background: rgba(196, 196, 196, .2); border-radius: 4px; padding: 7px 0px 4px 0px; min-height: 50px;">
                            <b-col class="no-padding">
                              <b-row>
                                <b-col style="font-size: 0.83vw; height: 2.2vw;">
                                  <b class="text">{{data.project_name}}</b>
                                </b-col>
                              </b-row>
                              <b-row style="margin-top: 7px; font-size: 0.73vw;">
                                <b-col style="padding-right: 0px !important;">
                                  Since {{getFullYear(data.project_start)}}
                                </b-col>
                                <b-col class="text-single" style="text-align: right;">
                                  {{data.location_name}}
                                </b-col>
                              </b-row>
                            </b-col>
                          </b-row>
                        </b-col>
                        <b-col lg="4" xl="4">
                          <b-row align-v="center" style="background: #333399; border-radius: 4px; color: white; text-align: center; height: 100%;">
                            <b-col>
                              <div style="font-size: 17px;">
                                <b>{{data.total_unit}}</b>
                              </div>
                              <div style="font-size: 0.7vw; color: rgba(255, 255, 255, .5)">
                                Total
                              </div>
                            </b-col>
                          </b-row>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                  <b-row style="margin-top: 10px;">
                    <b-col class="no-padding">
                      <b-row>
                        <b-col lg="4">
                          <b-row align-v="center" style="min-height: 50px; background: #028A20; border-radius: 4px; color: white; text-align: center;">
                            <b-col>
                              <div style="font-size: 17px;">
                                <b>{{data.total_available}}</b>
                              </div>
                              <div style="font-size: 0.7vw; color: rgba(255, 255, 255, .87)">
                                Available
                              </div>
                            </b-col>
                          </b-row>
                        </b-col>
                        <b-col lg="4">
                          <b-row align-v="center" style="min-height: 50px; background: #FFC700; border-radius: 4px; color: white; text-align: center;">
                            <b-col>
                              <div style="font-size: 17px;">
                                <b>{{data.total_booked}}</b>
                              </div>
                              <div style="font-size: 0.7vw; color: rgba(255, 255, 255, .7)">
                                Booking
                              </div>
                            </b-col>
                          </b-row>
                        </b-col>
                        <b-col lg="4">
                          <b-row align-v="center" style="min-height: 50px; background: #FF0045; border-radius: 4px; color: white; text-align: center;">
                            <b-col>
                              <div style="font-size: 17px;">
                                <b>{{data.total_sold}}</b>
                              </div>
                              <div style="font-size: 0.7vw; color: rgba(255, 255, 255, .7)">
                                Sold
                              </div>
                            </b-col>
                          </b-row>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </div>
              </b-col>
            </template>
          </b-row>
        </b-col>
        <div style="width: 53px; text-align: right; margin: auto 0;">
          <b-img v-if="projectInfos.length > 4" :src="require('@/assets/icon-svg/chevron_right.svg')" alt="" style="cursor: pointer;"  @click="onRightClick" />
        </div>
      </b-row> -->
      <div v-if="projectInfos.length > 0" style="padding-left: 30px; padding-right: 30px;">
        <vue-horizontal-list
          :items="projectInfos"
          :options="options"
        >
          <template v-slot:nav-prev>
            <div>
              <b-img :src="require('@/assets/icon-svg/chevron_left.svg')" alt="" style="cursor: pointer; margin-top: 8px; margin-left: unset !important;" />
            </div>
          </template>

          <template v-slot:nav-next>
            <div>
              <b-img :src="require('@/assets/icon-svg/chevron_right.svg')" alt="" style="cursor: pointer; margin-top: 8px; margin-right: unset !important;" />
            </div>
          </template>

          <template v-slot:start>
            <!-- <div>First Item</div> -->
          </template>

          <template v-slot:end>
            <!-- <div>Last Item</div> -->
          </template>
          <template v-slot:default="{item}">
            <div class="item" style="background: linear-gradient(0deg, #FFFFFF, #FFFFFF), #FFFFFF; box-shadow: 2px 6px 11px -7px rgba(0, 0, 0, 0.29); border-radius: 6px; padding-bottom: 10px;">
              <b-row>
                <b-col class="no-padding">
                  <b-img :src="urlHoonian + item.pic" alt="" style="height: 15vw; cursor: pointer;" fluid-grow rounded="top" @error="onImageLoadFailure($event)" @click="doViewDetail(item)" />
                  <div style="position: absolute;
                    top: 18px;
                    right: 0%;
                    background: rgba(45, 71, 175, 0.7);
                    width: 50px;
                    height: 20px;
                    text-align: center;
                    font-size: 14px;
                    color: white;">
                    <b>{{item.progress_percentage.split(".")[0]}}%</b>
                  </div>
                </b-col>
              </b-row>
              <b-row style="padding-top: 8px; padding-left: 0px;">
                <b-col class="no-padding">
                  <b-row>
                    <b-col cols="8">
                      <b-row style="background: rgba(196, 196, 196, .2); border-radius: 4px; padding: 7px 0px 4px 0px; min-height: 50px;">
                        <b-col class="no-padding">
                          <b-row>
                            <b-col style="font-size: 0.83vw; height: 2.2vw;">
                              <b class="text">{{item.project_name}}</b>
                            </b-col>
                          </b-row>
                          <b-row style="margin-top: 7px; font-size: 0.73vw;">
                            <b-col style="padding-right: 0px !important;">
                              Since {{getFullYear(item.project_start)}}
                            </b-col>
                            <b-col class="text-single" style="text-align: right;">
                              {{item.location_name}}
                            </b-col>
                          </b-row>
                        </b-col>
                      </b-row>
                    </b-col>
                    <b-col cols="4">
                      <b-row align-v="center" style="background: #333399; border-radius: 4px; color: white; text-align: center; height: 100%;">
                        <b-col>
                          <div style="font-size: 17px;">
                            <b>{{item.total_unit}}</b>
                          </div>
                          <div style="font-size: 0.7vw; color: rgba(255, 255, 255, .5)">
                            Total
                          </div>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <b-row style="margin-top: 10px;">
                <b-col class="no-padding">
                  <b-row>
                    <b-col cols="4">
                      <b-row align-v="center" style="min-height: 50px; background: #028A20; border-radius: 4px; color: white; text-align: center;">
                        <b-col>
                          <div style="font-size: 17px;">
                            <b>{{item.total_available}}</b>
                          </div>
                          <div style="font-size: 0.7vw; color: rgba(255, 255, 255, .87)">
                            Available
                          </div>
                        </b-col>
                      </b-row>
                    </b-col>
                    <b-col cols="4">
                      <b-row align-v="center" style="min-height: 50px; background: #FFC700; border-radius: 4px; color: white; text-align: center;">
                        <b-col>
                          <div style="font-size: 17px;">
                            <b>{{item.total_booked}}</b>
                          </div>
                          <div style="font-size: 0.7vw; color: rgba(255, 255, 255, .7)">
                            Booking
                          </div>
                        </b-col>
                      </b-row>
                    </b-col>
                    <b-col cols="4">
                      <b-row align-v="center" style="min-height: 50px; background: #FF0045; border-radius: 4px; color: white; text-align: center;">
                        <b-col>
                          <div style="font-size: 17px;">
                            <b>{{item.total_sold}}</b>
                          </div>
                          <div style="font-size: 0.7vw; color: rgba(255, 255, 255, .7)">
                            Sold
                          </div>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </div>
          </template>
        </vue-horizontal-list>
      </div>
    </div>
    <div v-else :style="!isDashboardDev ? 'background: #C7C7C7; border-radius: 6px; padding: 7px;': 'background: #FFFFFF;'">
      <div :style="!isDashboardDev ? 'background: #FFFFFF; padding: 5px 5px 10px 5px; border-radius: 6px;': ''">
        <b-row>
          <b-col>
            <div :style="!isDashboardDev ?
            'width: 130px; height: 40px; background: #333399; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 6px; padding: 5px 10px; font-size: 18px; color: #FFFFFF; text-align: center;'
            : 'font-size: 18px; color: #333399; font-weight: bold;'
            ">
              Project Info
            </div>
          </b-col>
          <b-col style="text-align: right;">
            <ABSButton
              :text="'View Details'"
              classButton="button button--back"
              classIcon="icon-style-1"
              @click="doViewDetail"
            />
          </b-col>
        </b-row>
        <b-row style="margin-top: 10px;">
          <b-col lg="2" align-self="center">
            <div style="
              height: 160px;
              background: #FFFFFF;
              border: 1px solid rgba(45, 71, 175, 0.15);
              box-sizing: border-box;
              border-radius: 6px;">
                <b-img :src="urlHoonian + projectInfos.icon_project" alt=""
                  @error="onImageLoadFailure($event)"
                  style="height: 80px;
                  width: 80px;
                  position: relative;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);" />
            </div>
          </b-col>
          <b-col lg="2" align-self="center">
            <div style="height: 160px;
              background: #FFFFFF;
              border: 1px solid rgba(45, 71, 175, 0.15);
              box-sizing: border-box;
              border-radius: 6px;">
              
              <div style="
                width: 90px;
                height: 90px;
                border: 12px solid #333399;
                border-radius: 50%;
                position: relative;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);">
                <div style="
                  position: relative;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  text-align: center;
                  color: #333399;
                  font-size: 26px;">
                    <b>{{projectInfos.progress_percentage.split(".")[0]}}%</b>
                </div>
              </div>
              <div style="text-align: center; margin-top: 40px; color: rgba(0, 0, 0, 0.8); font-size: 11px;">
                <b>Progress</b>
              </div>
            </div>

            
          </b-col>
          <b-col lg="5" align-self="center">
            <div style="height: 160px;
              background: #FFFFFF;
              border: 1px solid rgba(45, 71, 175, 0.15);
              box-sizing: border-box;
              border-radius: 6px;
              padding: 5px;
              font-size: 11px;
              letter-spacing: 0.5px;">
              
              <b-row>
                <b-col style="font-size: 18px;">
                  <b>{{projectInfos.company_group_name}}</b>
                </b-col>
              </b-row>
              <b-row style="margin-top: 5px;">
                <b-col lg="5" xl="4" style="color: rgba(51, 51, 153, 0.7);">
                  <b>Project Code</b>
                </b-col>
                <b-col lg="7" xl="8" style="">
                  <b>{{projectInfos.refference_code}}</b>
                </b-col>
              </b-row>
              <b-row style="margin-top: 5px;">
                <b-col lg="5" xl="4" style="color: rgba(51, 51, 153, 0.7);">
                  <b>Company Name</b>
                </b-col>
                <b-col lg="7" xl="8" style="" class="text">
                  {{projectInfos.project_name}}
                </b-col>
              </b-row>
              <b-row style="margin-top: 5px;">
                <b-col lg="5" xl="4" style="color: rgba(51, 51, 153, 0.7);">
                  <b>Launching Date</b>
                </b-col>
                <b-col lg="7" xl="8" style="">
                  {{momentDateFormatting(projectInfos.project_start, 'DD MMMM YYYY')}}
                </b-col>
              </b-row>
              <b-row style="margin-top: 5px;">
                <b-col lg="5" xl="4" style="color: rgba(51, 51, 153, 0.7);">
                  <b>Location</b>
                </b-col>
                <b-col lg="7" xl="8" style="">
                  {{projectInfos.location_name}}
                </b-col>
              </b-row>
              <b-row style="margin-top: 5px;">
                <b-col lg="5" xl="4" style="color: rgba(51, 51, 153, 0.7);">
                  <b>Category</b>
                </b-col>
                <b-col lg="7" xl="8" style="">
                  {{projectInfos.project_type_desc}}
                </b-col>
              </b-row>
            </div>
          </b-col>
          <b-col lg="3" align-self="center">
            <b-img :src="urlHoonian + projectInfos.main_pic" alt=""
              rounded
              fluid-grow
              @error="onImageLoadFailure($event)"
              style="height: 160px;" />
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isDashboardDev: false,
  },
  data() {
    return {
      projectInfos: [],
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
          { start: 576, end: 768, size: 3 },
          { start: 768, end: 992, size: 4 },
          { start: 992, end: 1200, size: 4 },
          { start: 1200, size: 5 },
        ],
        position: {
          start: -1,
        },
        // navigation: {
        //   // when to show navigation
        //   start: 992 
        // }
        // autoplay: { play: true, repeat: true, speed: 2500 },
      },
      isShowAll: true,
    };
  },
  computed: {
    _projectId () {
      return this.$store.getters.getProjectId;
    }
  },
  watch: {
    _projectId (newValue, oldValue) {
      this.isShowAll = this.getDashboardProjectID() == "all";
      this.callAPI();
    }
  },
  methods: {
    getProjectInfoMulti() {
      let param = {
        project_id: this.getDashboardProjectID(),
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/multi-project-info",
        param
      ).then((response) => {
        if (response == null) return;
        this.projectInfos = response.data.list;
      });
    },
    getProjectInfoSingle() {
      let param = {
        project_id: this.getDashboardProjectID(),
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/single-project-info",
        param
      ).then((response) => {
        if (response == null) return;
        this.projectInfos = response.data;
      });
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    doViewDetail(project = null) {
      let param = {};
      if (project == null) {
        param.project_id = this.projectInfos.id;
        param.project_name = this.projectInfos.project_name;
      } else {
        param.project_id = project.id;
        param.project_name = project.project_name;
      }
      param.isDashboardDev = this.isDashboardDev;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_ProjectDetail" });
    },
    callAPI() {
      if (this.isShowAll) {
        this.getProjectInfoMulti();
      } else {
        this.getProjectInfoSingle();
      }
    },
  },
  mounted() {
    this.isShowAll = this.getDashboardProjectID() == "all";
    this.callAPI();
  }
};
</script>
<style scoped>
.text {
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 2;
   -webkit-box-orient: vertical;
}
.text-single {
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 1;
   -webkit-box-orient: vertical;
}
.no-padding {
  padding: unset !important;
}
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>