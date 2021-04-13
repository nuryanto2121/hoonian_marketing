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
                  <b-row style="cursor: pointer;" @click="openBuildingPlan">
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
                  <b-row style="cursor: pointer;" @click="open360VR">
                    <b-col sm="2" align-self="center">
                      <b-img :src="require('@/assets/icon-svg/vr.svg')" alt="" style=""/>
                    </b-col>
                    <b-col align-self="center" style="padding: 5px !important;">
                      360<sup>o</sup> {{ $t('vr') }}
                    </b-col>
                  </b-row>
                 </div>
               </b-col>
             </b-row>
             <b-row style="margin-top: 5px;">
               <b-col>
                 <div style="border: 1px solid #FFFFFF;
                            box-sizing: border-box;">
                  <b-row style="cursor: pointer;" @click="openVideo">
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
                  <b-row style="cursor: pointer;" @click="openBrochure">
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
                  <b-row style="cursor: pointer;" @click="openMap">
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
                <ShareNetwork
                  network="facebook"
                  :url="getBrochureLink()"
                  :title="Model.data.project_name"
                  description="Hoonian"
                  :quote="Model.data.project_name"
                  hashtags="hoonian"
                >
                  <b-img :src="require('@/assets/icon-svg/facebook_white.svg')" alt="" style=""/>
                </ShareNetwork>
               </b-col>
               <b-col>
                 <ShareNetwork
                  network="twitter"
                  :url="getBrochureLink()"
                  :title="Model.data.project_name"
                  description="Hoonian"
                  :quote="Model.data.project_name"
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
             <vue-horizontal-list
              v-if="Model.facility_images.length > 0"
              :items="Model.facility_images"
              :options="optionsFacilities"
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
                    <b-img :src="urlHoonian + item.thumbnail_image" alt="" style="height: 310px; cursor: pointer;" fluid-grow @error="onImageLoadFailure($event)" @click="doViewDetail(item)" />
                  </b-col>
                </b-row>
              </template>
            </vue-horizontal-list>
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

         <b-row v-if="AvailableUnitTypes.length > 0" style="margin-top: 10px;">
           <template v-for="(data, index) in AvailableUnitTypes">
            <b-col sm="12" :key="data.id">
              <span @click="rowClicked(data)" style="text-shadow: 0.5px 0px; font-size: 22px;">Available Unit Types</span>
              <HOOList
                :prop="data.propList"
                :title="''"
                @rowClicked="rowClicked"
                @buttonDeleteClicked="doDeleteClick"
                @rowDblClicked="doDoubleClick"
                @rowLinkClick="rowLink"
                @pageSize="M_PageSize"
                @pagination="M_Pagination"
                @filter="M_Advance_Filter"
                @headTable="M_Head_Table"
                @refreshColumn="refreshColumn"
                :ref="`ref_available_unit_types_${index}`"
                @buttonViewClicked="doViewClick"
                ButtonBackDisabled
                SearchDisabled
                isHeaderFixed
                noCard
                removeCardTitle
                removePaddingTopBody
                noPaging
              >
                <template slot="TitleTable">
                  <b-col lg="3" xl="3" style="padding-left: unset !important; color: #828282; font-size: 14px;">
                    {{data.tower_cluster_name}}
                  </b-col>
                </template>
                <!-- <template slot="date" slot-scope="data">
                  {{momentUnix(data.item.date, "DD MMM YYYY")}}
                </template> -->
                <!-- <template slot="logbook" slot-scope="data">
                  <ABSButton
                    text="Logbook"
                    classButton="button button--hoonian"
                    icon="wallet"
                    @click="doLogbook(data.item)"
                  />
                </template> -->
              </HOOList>
            </b-col>
           </template>
         </b-row>

         <b-row style="margin-top: 10px; font-size: 13px;">
           <b-col offset-md="2" md="4">
             <div style="background: #FFFFFF;
                          box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);">
              <b-row>
                <b-col sm="1">
                  <div style="height: 75%; width: 6px; background: #4A93B3; margin-top: 10px;">
                    &nbsp;
                  </div>
                </b-col>
                <b-col align-self="center" style="padding: 15px 0px;">
                  <div>
                    {{ $t('purchase_your_nup_now') }}
                  </div>
                  <div style="color: #828282">
                    {{momentUnix(Model.nup.start_datetime, "DD MMM YYYY")}} - {{momentUnix(Model.nup.end_datetime, "DD MMM YYYY")}}
                  </div>
                </b-col>
                <b-col sm="4" align-self="center" class="col-right">
                  <ABSButton
                    :text="$t('buy_nup')"
                    classButton="button button--hoonian"
                    @click="buyNUP"
                  />
                </b-col>
              </b-row>
             </div>
           </b-col>
           <b-col md="4">
             <div style="background: #FFFFFF;
                          box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);">
              <b-row>
                <b-col sm="1">
                  <div style="height: 75%; width: 6px; background: #4A93B3; margin-top: 10px;">
                    &nbsp;
                  </div>
                </b-col>
                <b-col align-self="center" style="padding: 15px 0px;">
                  <div style="text-shadow: 0.5px 0px;">
                    {{ $t('virtual_launching') }}
                  </div>
                  <div style="color: #828282">
                    {{momentUnix(Model.vlaunching.start_datetime, "DD MMM YYYY")}} - {{momentUnix(Model.vlaunching.end_datetime, "DD MMM YYYY")}}
                  </div>
                </b-col>
              </b-row>
             </div>
           </b-col>
         </b-row>

         <b-row v-if="Progress.length > 0" style="margin-top: 10px;">
           <b-col style="text-shadow: 0.5px 0px; font-size: 22px;">
             Progress
           </b-col>
         </b-row>
         <b-row v-if="Progress.length > 0" style="margin-top: 10px;">
           <b-col>
             <vue-horizontal-list
              :items="Progress"
              :options="optionsProgress"
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
                    <b-img :src="urlHoonian + item.main_image" alt="" style="height: 150px; cursor: pointer;" fluid-grow @error="onImageLoadFailure($event)" @click="doViewDetail(item)" />
                  </b-col>
                </b-row>
                <b-row style="margin-top: 10px;">
                  <b-col style="color: #52A0FC">
                    {{ isCurrency(item.percentage_completed, 0) }}% {{ $t('completed') }}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col style="color: #828282; font-size: 12px;">
                    {{momentUnix(item.created_at, "DD MMM YYYY")}}
                  </b-col>
                </b-row>
              </template>
            </vue-horizontal-list>
           </b-col>
         </b-row>

         <b-row v-if="Promotion.length > 0" style="margin-top: 10px;">
           <b-col style="text-shadow: 0.5px 0px; font-size: 22px;">
             Promotions
           </b-col>
         </b-row>
         <b-row v-if="Promotion.length > 0" style="margin-top: 10px; background: #F8F8F8;">
           <b-col>
             <vue-horizontal-list
              :items="Promotion"
              :options="optionsPromotion"
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
                <b-row style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);">
                  <b-col>
                    <b-row>
                      <b-col>
                        <b-img :src="urlHoonian + item.picture" alt="" style="height: 150px; cursor: pointer;" fluid-grow @error="onImageLoadFailure($event)" @click="doViewDetail(item)" />
                      </b-col>
                    </b-row>
                    <b-row style="margin-top: 10px; background: #FFFFFF;">
                      <b-col>
                        {{item.promotion_name}}
                      </b-col>
                    </b-row>
                    <b-row style="background: #FFFFFF; padding: 10px 0px;">
                      <b-col style="color: #828282; font-size: 12px;">
                        {{momentUnix(item.start_datetime, "DD MMM YYYY")}} - {{momentUnix(item.end_datetime, "DD MMM YYYY")}}
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </template>
            </vue-horizontal-list>
           </b-col>
         </b-row>

         <b-row v-if="FinancialPartner.length > 0" style="margin-top: 10px;">
           <b-col style="text-shadow: 0.5px 0px; font-size: 22px;">
             Financial Partners
           </b-col>
         </b-row>
         <b-row v-if="FinancialPartner.length > 0" style="margin-top: 10px;">
           <b-col>
             <vue-horizontal-list
              :items="FinancialPartner"
              :options="optionsFinancialPartner"
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
                <b-row style="background: #FFFFFF;
                              box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);">
                  <b-col sm="6" style="padding: 10px !important;">
                    <b-img :src="urlHoonian + item.bank_logo" alt="" style="height: 100px; cursor: pointer;" fluid-grow @error="onImageLoadFailure($event)" @click="doViewDetail(item)" />
                  </b-col>
                  <b-col sm="6" style="padding: 10px !important;">
                    <b-row>
                      <b-col>
                        {{item.bank_name}}
                      </b-col>
                    </b-row>
                    <b-row style="margin-top: 10px;">
                      <b-col style="font-size: 12px; color: #828282">
                        {{item.description}}
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </template>
            </vue-horizontal-list>
           </b-col>
         </b-row>

         <b-row style="margin-top: 10px; background: #F8F8F8;">
           <b-col>
             <div style="text-shadow: 0.5px 0px; font-size: 22px; margin-bottom: 10px;">
               News
             </div>
             <template v-for="(news, index) in News">
               <b-row :key="index" style="margin-top: 10px;">

                 <!-- left -->
                 <template v-if="index % 2 == 0">
                  <b-col  sm="2" style="">
                    <b-img :src="urlHoonian + News[index].main_image" alt=""
                    :style="`height: 100px; cursor: pointer;`"
                    fluid-grow @error="onImageLoadFailure($event)" />
                  </b-col>
                  <b-col  sm="4" style="" align-self="center">
                    <b-row>
                      <b-col style="color: #4A93B3">
                        {{News[index].title}}
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col style="color: #BDBDBD;">
                        {{momentUnix(News[index].created_at, "DD MMM YYYY")}}
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col style="color: #BDBDBD;">
                        {{getDomainName(News[index].url)}}
                      </b-col>
                    </b-row>
                  </b-col>
                 </template>
                
                <!-- right -->
                <template v-if="index % 2 == 0 && News.length > index + 1">
                  <b-col  sm="2" style="">
                    <b-img :src="urlHoonian + News[index + 1].main_image" alt=""
                    :style="`height: 100px; cursor: pointer;`"
                    fluid-grow @error="onImageLoadFailure($event)" />
                  </b-col>
                  <b-col  sm="4" style="" align-self="center">
                    <b-row>
                      <b-col style="color: #4A93B3">
                        {{News[index + 1].title}}
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col style="color: #BDBDBD;">
                        {{momentUnix(News[index + 1].created_at, "DD MMM YYYY")}}
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col style="color: #BDBDBD;">
                        {{getDomainName(News[index + 1].url)}}
                      </b-col>
                    </b-row>
                  </b-col>
                 </template>
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
      },
      AvailableUnitTypes: [],
      Progress: [],
      Promotion: [],
      FinancialPartner: [],
      News: [],

      optionsFacilities: {
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
          { size: 1 },
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
      optionsProgress: {
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
          { size: 4 },
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
      optionsPromotion: {
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
          { size: 3 },
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
      optionsFinancialPartner: {
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
          { size: 3 },
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
    }
  },
  methods: {
    getDomainName(url) {
      if (url)
        return url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
      else ""
    },
    openBuildingPlan() {
      window.open(this.urlHoonian + this.Model.data.building_plan);
    },
    open360VR() {
      window.open(this.Model.data.dimension_360_link);
    },
    openVideo() {
      window.open(this.Model.data.promotional_videos);
    },
    openBrochure() {
      window.open(this.getBrochureLink());
    },
    openMap() {
      let url = `https://www.google.com/maps/search/?api=1&query=${this.Model.data.latitude},${this.Model.data.longitude}`;
      window.open(url);
    },
    doWhatsapp() {
      let phoneNo = "+6287880406400";
      let msg = this.replaceAllString(this.getBodyMessage(), "\n", "%0D%0A", "string");
      msg = this.replaceAllString(msg, "&nbsp;", "%20", "string");
      let url = "https://api.whatsapp.com/send?phone=" + phoneNo + "&text=" + msg;
      window.open(url);
    },
    doEmail() {
      let attachmentUrl = encodeURIComponent(this.getBrochureLink().replace('\\', '/')) + "%0D%0A%0D%0A";
      let email = "customer@gmail.com";
      window.open(`mailto:${email}?subject=${this.Model.data.project_name}&body=${this.Model.data.project_name} ${attachmentUrl}`);
    },
    getBodyMessage() {
      return this.Model.data.project_name + "\n" + this.getBrochureLink();
    },
    getBrochureLink() {
      return this.urlHoonian + this.Model.data.upload_brochure;
    },
    buyNUP() {

    },
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
    getAvailableUnitTypes() {
      let param = {
        project_id: this.paramFromList.id,
        lang_id: this.getDataUser().lang_id,
      };

      this.postJSON(this.urlHoonian + '/api/marketing-website/project/available-unit-types-header', param).then((response) => {
        if (response == null) return;
        let data = response.data;

        for (let i = 0; i < data.length; i++) {
          this.AvailableUnitTypes.push({
            ...data[i],
            propList: {
              url: "/api/marketing-website/project/available-unit-types-grid",
              initialWhere: "",
              SortField: "",
              SortBy: "desc",
              ParamWhere: "",
              param: {
                tower_cluster_id: data[i].id,
                lang_id: this.getDataUser().lang_id,
              }
            }
          });
        }
        
        this.$nextTick(() => {
          this.renderList();
        })
      });
    },
    renderList() {
      for (let i = 0; i < this.AvailableUnitTypes.length; i++) {
        this.$refs['ref_available_unit_types_'+i][0].doGetList("");
      }
    },
    rowClicked(data) {
      let param = this.paramFromList;
      param._project_detail = this.Model; // hardcode
      param.unit_type_id = "unit_type_id1"; // hardcode
      param.isEdit = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "MK_UnitType" });
    },
    getProgress() {
      let param = {
        project_id: this.paramFromList.id,
      };

      this.postJSON(this.urlHoonian + '/api/marketing-website/project/progress', param).then((response) => {
        if (response == null) return;
        this.Progress = response.data.list;
      });
    },
    getPromotion() {
      let param = {
        project_id: this.paramFromList.id,
      };

      this.postJSON(this.urlHoonian + '/api/marketing-website/project/promotion', param).then((response) => {
        if (response == null) return;
        this.Promotion = response.data.list;
      });
    },
    getFinancialPartner() {
      let param = {
        project_id: this.paramFromList.id,
      };

      this.postJSON(this.urlHoonian + '/api/marketing-website/project/financial-partners', param).then((response) => {
        if (response == null) return;
        this.FinancialPartner = response.data;
      });
    },
    getNews() {
      let param = {
        project_id: this.paramFromList.id,
      };

      this.postJSON(this.urlHoonian + '/api/marketing-website/project/news', param).then((response) => {
        if (response == null) return;
        this.News = response.data.list;
      });
    },
  },
  mounted() {
    this.getProject();
    this.getAvailableUnitTypes();
    this.getProgress();
    this.getPromotion();
    this.getFinancialPartner();
    this.getNews();
  },
};
</script>

<style scoped>
</style>
