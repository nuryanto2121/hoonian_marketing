<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col lg="12" xl="12" style="background: white;">
         <b-row>
           <b-col>
             {{paramFromList.projectName}}
           </b-col>
         </b-row>
         <b-row>
           <b-col style="color: #828282; font-size: 12px;">
             {{paramFromList.address}}
           </b-col>
         </b-row>
         <b-row style="margin-top: 10px; padding-top: 10px; background: #F8F8F8;">
           <b-col style="color: #828282;">
             {{Model.data.project_status}}
             &nbsp;&nbsp; > &nbsp;&nbsp;
             {{Model.data.location_name}}
             &nbsp;&nbsp; > &nbsp;&nbsp;
             {{Model.data.project_name}}
             &nbsp;&nbsp; > &nbsp;&nbsp;
             {{Model.data.tower_cluster_name}}
             &nbsp;&nbsp; > &nbsp;&nbsp;
             {{Model.data.unit_type_name}}
           </b-col>
         </b-row>
         <b-row style="background: #F8F8F8;">
           <b-col style="text-shadow: 0.5px 0px; font-size: 22px;">
             {{ $t('unit_details') }}
           </b-col>
           <b-col sm="3">
             <b-row style="text-align: right;">
               <b-col>
                <ShareNetwork
                  network="facebook"
                  :url="getBrochureLink()"
                  :title="Model.data.tower_cluster_name"
                  description="Hoonian"
                  :quote="Model.data.tower_cluster_name"
                  hashtags="hoonian"
                >
                  <b-img :src="require('@/assets/icon-svg/facebook_white.svg')" alt="" style=""/>
                </ShareNetwork>
                </b-col>
                <b-col>
                  <ShareNetwork
                  network="twitter"
                  :url="getBrochureLink()"
                  :title="Model.data.tower_cluster_name"
                  description="Hoonian"
                  :quote="Model.data.tower_cluster_name"
                  hashtags="hoonian"
                >
                  <b-img :src="require('@/assets/icon-svg/twitter_white.svg')" alt="" style=""/>
                </ShareNetwork>
                </b-col>
                <b-col>
                  <b-img :src="require('@/assets/icon-svg/whatsapp_white.svg')" alt="" style="cursor: pointer;" @click="doWhatsapp"/>
                </b-col>
                <b-col>
                  <b-img :src="require('@/assets/icon-svg/email_white.svg')" alt="" style="cursor: pointer;" @click="doEmail"/>
                </b-col>
             </b-row>
           </b-col>
         </b-row>
         
         <b-row style="background: #F8F8F8; padding-top: 10px;">
           <b-col sm="4" style="padding: unset !important; padding-right: 5px !important;">
             <b-row class="row-view-black">
               <b-col>
                 {{ $t('total_units') }}
               </b-col>
               <b-col sm="4">
                 {{Model.data.count}}
               </b-col>
             </b-row>
             <b-row class="row-view-black">
               <b-col>
                 {{ $t('bedrooms') }}
               </b-col>
               <b-col sm="4">
                 {{Model.data.total_bedroom}} <b-img :src="require('@/assets/icon-svg/bedroom.svg')" alt="" />
               </b-col>
             </b-row>
             <b-row class="row-view-black">
               <b-col>
                 {{ $t('bathrooms') }}
               </b-col>
               <b-col sm="4">
                 {{Model.data.total_bathroom}} <b-img :src="require('@/assets/icon-svg/bathroom.svg')" alt="" />
               </b-col>
             </b-row>
             <b-row class="row-view-black">
               <b-col>
                 {{ $t('net_area') }}
               </b-col>
               <b-col sm="4">
                 {{Model.data.net_area}} m <sup>2</sup>
               </b-col>
             </b-row>
             <b-row class="row-view-black">
               <b-col>
                 {{ $t('gross_area') }}
               </b-col>
               <b-col sm="4">
                 {{Model.data.gross_area}} m <sup>2</sup>
               </b-col>
             </b-row>
             <b-row style="margin-top: 40px; color: white;">
               <b-col>
                 <div style="background: rgba(0, 0, 0, 0.2);">
                  <b-row style="cursor: pointer;" @click="openFloorPlan">
                    <b-col sm="2" align-self="center">
                      <b-img :src="require('@/assets/icon-svg/floor_plan.svg')" alt="" style=""/>
                    </b-col>
                    <b-col style="padding: 5px !important; text-align: center;">
                      {{ $t('floor_plan') }}
                    </b-col>
                  </b-row>
                 </div>
               </b-col>
               <b-col>
                 <div style="background: rgba(0, 0, 0, 0.2);">
                  <b-row style="cursor: pointer;" @click="openLayout">
                    <b-col sm="2" align-self="center">
                      <b-img :src="require('@/assets/icon-svg/layout.svg')" alt="" style=""/>
                    </b-col>
                    <b-col style="padding: 5px !important; text-align: center;">
                      {{ $t('layout') }}
                    </b-col>
                  </b-row>
                 </div>
               </b-col>
             </b-row>
             <b-row style="margin-top: 5px; color: white;">
               <b-col>
                 <div style="background: rgba(0, 0, 0, 0.2);">
                  <b-row style="cursor: pointer;" @click="open360VR">
                    <b-col sm="2" align-self="center">
                      <b-img :src="require('@/assets/icon-svg/vr.svg')" alt="" style=""/>
                    </b-col>
                    <b-col style="padding: 5px !important; text-align: center;">
                      360<sup>o</sup> {{ $t('vr') }}
                    </b-col>
                  </b-row>
                 </div>
               </b-col>
               <b-col>
                 <div style="background: rgba(0, 0, 0, 0.2);">
                  <b-row style="cursor: pointer;" @click="openBrochure">
                    <b-col sm="2" align-self="center">
                      <b-img :src="require('@/assets/icon-svg/e_brochure.svg')" alt="" style=""/>
                    </b-col>
                    <b-col style="padding: 5px !important; text-align: center;">
                      {{ $t('e_brochure') }}
                    </b-col>
                  </b-row>
                 </div>
               </b-col>
             </b-row>
           </b-col>
           <b-col sm="5" style="">
             <b-img :src="urlHoonian + Model.data.layout_image" alt=""
                :style="`height: 310px;`"
                fluid-grow @error="onImageLoadFailure($event)" />
           </b-col>
           <b-col sm="3" style="padding: unset !important;">
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
      },
    }
  },
  methods: {
    openFloorPlan() {
      let param = this.paramFromList;
      param.tower_cluster_id = this.Model.data.tower_cluster_id;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "MK_FloorPlan" });
    },
    openLayout() {
      window.open(this.urlHoonian + this.Model.data.layout_image);
    },
    open360VR() {
      window.open(this.Model.data.dimension_360_link);
    },
    openBrochure() {
      window.open(this.getBrochureLink());
    },
    doWhatsapp() {
      let phoneNo = "+6287880406400";
      let msg = this.replaceAllString(this.getBodyMessage(), "\n", "%0D%0A", "string");
      msg = this.replaceAllString(msg, "&nbsp;", "%20", "string");
      let url = "https://api.whatsapp.com/send?text=" + msg;
      window.open(url);
    },
    doEmail() {
      let attachmentUrl = encodeURIComponent(this.getBrochureLink().replace('\\', '/')) + "%0D%0A%0D%0A";
      let email = "";
      window.open(`mailto:${email}?subject=${this.Model.data.tower_cluster_name}&body=${this.Model.data.tower_cluster_name} ${attachmentUrl}`);
    },
    getBodyMessage() {
      return this.Model.data.tower_cluster_name + "\n" + this.getBrochureLink();
    },
    getBrochureLink() {
      return this.urlHoonian + this.Model.data.upload_brochure;
    },
    buyNUP() {

    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    getUnitTypeDetail() {
      let param = {
        unit_type_id: this.paramFromList.availableUnitTypes.id,
      };

      this.postJSON(this.urlHoonian + '/api/marketing-website/project/unit-type/detail', param).then((response) => {
        if (response == null) return;
        this.Model = response.data;
      });
    },
  },
  mounted() {
    this.getUnitTypeDetail();
  },
};
</script>

<style scoped>
</style>
