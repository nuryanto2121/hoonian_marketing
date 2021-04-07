<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col lg="12" xl="12" style="background: white;">
         <b-row>
           <b-col>
             {{Model.data.project_name}}
           </b-col>
           <b-col sm="3">
             {{ $t('start_from') }} {{ isCurrency(Model.data.start_from_price, 0) }}
           </b-col>
         </b-row>
         <b-row>
           <b-col>
             {{Model.data.address}}
           </b-col>
           <b-col sm="3">
             {{ isCurrency(Model.data.price_per_meter_square,0) }} / m<sup>2</sup>
           </b-col>
         </b-row>
         <b-row>
           <b-col sm="6" style="padding: unset !important;">
             <b-img :src="urlHoonian + Model.data.main_pic" alt=""
                :style="`height: 310px; cursor: pointer;`"
                fluid-grow @error="onImageLoadFailure($event)" />
           </b-col>
           <b-col sm="3" style="padding: unset !important; background: black; color: white;">
            <div v-for="(image, index) in Model.image" :key="index">
              <b-row v-if="index % 2 == 0" style="margin-top: 10px !important; margin-left: 5px !important; margin-right: 5px !important;">
                <b-col>
                  <b-img :src="urlHoonian + Model.image[index].thumbnail_image" alt=""
                    :style="`width: 90px; height: 90px; cursor: pointer;`"
                    fluid-grow @error="onImageLoadFailure($event)" />
                </b-col>
                <b-col v-if="Model.image.length > (index + 1)">
                  <b-img :src="urlHoonian + Model.image[index + 1].thumbnail_image" alt=""
                    :style="`width: 90px; height: 90px; cursor: pointer;`"
                    fluid-grow @error="onImageLoadFailure($event)" />
                </b-col>
              </b-row>
            </div>
           </b-col>
           <b-col sm="3" style="padding: unset !important; background: black; color: white; text-align: center;">
             <b-row style="margin-top: 10px;">
               <b-col>
                 <div style="border: 1px solid #FFFFFF;
                            box-sizing: border-box;">
                  <b-row>
                    <b-col sm="2" align-self="center">
                      <b-img :src="require('@/assets/icon-svg/building_plan.svg')" alt="" style=""/>
                    </b-col>
                    <b-col align-self="center" style="padding: 5px !important;">
                      {{ $t('building_plan') }}
                    </b-col>
                  </b-row>
                 </div>
               </b-col>
             </b-row>
             <b-row style="margin-top: 5px;">
               <b-col>
                 <div style="border: 1px solid #FFFFFF;
                            box-sizing: border-box;">
                  <b-row>
                    <b-col sm="2" align-self="center">
                      <b-img :src="require('@/assets/icon-svg/vr.svg')" alt="" style=""/>
                    </b-col>
                    <b-col align-self="center" style="padding: 5px !important;">
                      {{ $t('vr') }}
                    </b-col>
                  </b-row>
                 </div>
               </b-col>
             </b-row>
             <b-row style="margin-top: 5px;">
               <b-col>
                 <div style="border: 1px solid #FFFFFF;
                            box-sizing: border-box;">
                  <b-row>
                    <b-col sm="2" align-self="center">
                      <b-img :src="require('@/assets/icon-svg/video.svg')" alt="" style=""/>
                    </b-col>
                    <b-col align-self="center" style="padding: 5px !important;">
                      {{ $t('video') }}
                    </b-col>
                  </b-row>
                 </div>
               </b-col>
             </b-row>
             <b-row style="margin-top: 5px;">
               <b-col>
                 <div style="border: 1px solid #FFFFFF;
                            box-sizing: border-box;">
                  <b-row>
                    <b-col sm="2" align-self="center">
                      <b-img :src="require('@/assets/icon-svg/e_brochure.svg')" alt="" style=""/>
                    </b-col>
                    <b-col align-self="center" style="padding: 5px !important;">
                      {{ $t('e_brochure') }}
                    </b-col>
                  </b-row>
                 </div>
               </b-col>
             </b-row>
             <b-row style="margin-top: 5px;">
               <b-col>
                 <div style="border: 1px solid #FFFFFF;
                            box-sizing: border-box;">
                  <b-row>
                    <b-col sm="2" align-self="center">
                      <b-img :src="require('@/assets/icon-svg/map-pin-white.svg')" alt="" style=""/>
                    </b-col>
                    <b-col align-self="center" style="padding: 5px !important;">
                      {{ $t('map') }}
                    </b-col>
                  </b-row>
                 </div>
               </b-col>
             </b-row>
             <b-row style="margin-top: 40px;">
               <b-col>
                 <b-img :src="require('@/assets/icon-svg/facebook_white.svg')" alt="" style=""/>
               </b-col>
               <b-col>
                 <b-img :src="require('@/assets/icon-svg/twitter_white.svg')" alt="" style=""/>
               </b-col>
               <b-col>
                 <b-img :src="require('@/assets/icon-svg/whatsapp_white.svg')" alt="" style=""/>
               </b-col>
               <b-col>
                 <b-img :src="require('@/assets/icon-svg/email_white.svg')" alt="" style=""/>
               </b-col>
             </b-row>
           </b-col>
         </b-row>

         <b-row style="margin-top: 10px;">
           <b-col>
             <div style="text-shadow: 0.5px 0px; font-size: 22px;">
               Project Information
             </div>
             <template v-for="(info, index) in Model.infos">
               <b-row v-if="index % 4 == 0" :key="index">
                <b-col sm="3" class="row-view-black" style="padding-left: unset !important;">
                  {{Model.infos[index].body}}
                </b-col>
                <b-col sm="3" class="row-view-black" v-if="Model.infos.length > (index + 1)" style="margin-right: 10px !important; padding-left: unset !important;">
                  {{Model.infos[index + 1].body}}
                </b-col>
                <b-col sm="3" class="row-view-black" v-if="Model.infos.length > (index + 2)" style="margin-left: 10px !important; padding-left: unset !important;">
                  {{Model.infos[index + 2].body}}
                </b-col>
                <b-col sm="3" class="row-view-black" v-if="Model.infos.length > (index + 3)" style="margin-left: 10px !important; padding-left: unset !important;">
                  {{Model.infos[index + 3].body}}
                </b-col>
               </b-row>
             </template>
           </b-col>
         </b-row>

         <b-row style="margin-top: 10px;">
           <b-col sm="6">
             <div style="text-shadow: 0.5px 0px; font-size: 22px;">
               Facilities
             </div>
             <template v-for="(facility, index) in Model.facilities">
               <b-row v-if="index % 2 == 0" :key="index">
                <b-col sm="6" class="row-view-black" style="margin-right: 10px !important; padding-left: unset !important;">
                  {{Model.facilities[index].body}}
                </b-col>
                <b-col class="row-view-black" style="margin-left: 10px !important; padding-left: unset !important;" v-if="Model.facilities.length > (index + 1)">
                  {{Model.facilities[index + 1].body}}
                </b-col>
               </b-row>
             </template>
           </b-col>
           <b-col sm="6">
             <!-- array disini -->
             <b-img :src="urlHoonian + Model.data.main_pic" alt=""
                :style="`height: 310px; cursor: pointer;`"
                fluid-grow @error="onImageLoadFailure($event)" />
           </b-col>
         </b-row>

         <b-row style="margin-top: 10px;">
           <b-col>
             <div style="text-shadow: 0.5px 0px; font-size: 22px; margin-bottom: 10px;">
               Nearby
             </div>
             <template v-for="(near, index) in Model.nearby">
               <b-row :key="index" style="background: #F8F8F8;">

                 <!-- left -->
                <b-col v-if="index % 2 == 0" sm="6" style="padding-left: unset !important; padding-right: unset !important;">
                  <b-img :src="urlHoonian + near.picture" alt=""
                  :style="`height: 310px; cursor: pointer;`"
                  fluid-grow @error="onImageLoadFailure($event)" />
                </b-col>
                <b-col align-self="center" v-if="index % 2 == 0" style="padding-left: 30px !important; padding-right: unset !important;">
                  {{near.header}}
                  <br />
                  {{near.body}}
                </b-col>

                <!-- right -->
                <b-col align-self="center" v-if="index % 2 == 1" sm="6" style="padding-left: 30px !important; padding-right: unset !important;">
                  {{near.header}}
                  <br />
                  {{near.body}}
                </b-col>
                <b-col v-if="index % 2 == 1" style="padding-left: unset !important; padding-right: unset !important;">
                  <b-img :src="urlHoonian + near.picture" alt=""
                  :style="`height: 310px; cursor: pointer;`"
                  fluid-grow @error="onImageLoadFailure($event)" />
                </b-col>
               </b-row>
             </template>
           </b-col>
         </b-row>
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
        data: {},
        facilities: [],
        facility_images: [],
        image: [],
        infos: [],
        nearby: [],
        nup: {},
        vlaunching: {},
      }
    }
  },
  methods: {
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    getProject() {
      let param = {
        project_id: this.paramFromList.id,
        lang_id: this.getDataUser().lang_id,
      };

      this.postJSON(this.urlHoonian + '/api/marketing-website/project/detail', param).then((response) => {
        if (response == null) return;
        this.Model = response.data;
      });
    },
  },
  mounted() {
    this.getProject();
  },
};
</script>

<style scoped>
</style>
