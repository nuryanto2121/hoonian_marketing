<template>
  <div>
    <b-row class="dashboardBody">
      <b-col lg="12" xl="12" style="background: white;">
        <div style="margin-top: 20px; margin-bottom: 20px;">
          <b-row>
            <b-col>
              {{Model.data.project_name}}
            </b-col>
            <b-col sm="3">
              {{ $t('start_from') }} IDR {{ isCurrency(Model.data.start_from_price, 0) }}
            </b-col>
          </b-row>
          <b-row>
            <b-col style="color: #828282; font-size: 12px;">
              {{Model.data.address}}
            </b-col>
            <b-col style="color: #828282; font-size: 12px;" sm="3">
              IDR {{ isCurrency(Model.data.price_per_meter_square,0) }} / m<sup>2</sup>
            </b-col>
          </b-row>
        </div>

        <b-row style="margin-top: 10px;">
          <b-col cols="12" style="padding: unset !important;">
            <b-img :src="urlHoonian + Model.data.main_pic" alt=""
                :style="`height: 310px;`"
                fluid-grow @error="onImageLoadFailure($event)" />
          </b-col>
          <b-col cols="12" style="overflow-x: auto; white-space: nowrap; display: block !important; padding: unset !important; background: black; color: white;">
            <template v-for="(image, index) in Model.image">
              <!-- <b-row v-if="index % 2 == 0" style="margin-top: 10px !important; margin-left: 5px !important; margin-right: 5px !important;">
                <b-col sm="6">
                  <b-img :src="urlHoonian + Model.image[index].thumbnail_image" alt=""
                    :style="`width: 90px; height: 90px; cursor: pointer;`"
                    fluid-grow @error="onImageLoadFailure($event)" @click="changeImage(Model.image[index].thumbnail_image)" />
                </b-col>
                <b-col sm="6" v-if="Model.image.length > (index + 1)">
                  <b-img :src="urlHoonian + Model.image[index + 1].thumbnail_image" alt=""
                    :style="`width: 90px; height: 90px; cursor: pointer;`"
                    fluid-grow @error="onImageLoadFailure($event)" @click="changeImage(Model.image[index + 1].thumbnail_image)" />
                </b-col>
              </b-row> -->
              <b-row style="display: inline-block !important; margin-top: 25px !important; margin-bottom: 20px;" v-bind:key="index">
                <b-col cols="4">
                  <b-img :src="urlHoonian + Model.image[index].thumbnail_image" alt=""
                    :style="`width: 110px !important; height: 100px; cursor: pointer;`" @error="onImageLoadFailure($event)" @click="changeImage(Model.image[index].thumbnail_image)" />
                </b-col>
                <!-- <b-col sm="6" v-if="Model.image.length > (index + 1)">
                  <b-img :src="urlHoonian + Model.image[index + 1].thumbnail_image" alt=""
                    :style="`width: 90px; height: 90px; cursor: pointer;`"
                    fluid-grow @error="onImageLoadFailure($event)" @click="changeImage(Model.image[index + 1].thumbnail_image)" />
                </b-col> -->
              </b-row>
            </template>
          </b-col>
          <b-col cols="12" style="padding: unset !important; background: black; color: white; text-align: center;">
            <b-row style="margin-top: 10px; margin-left: 10px !important; margin-right: 10px !important;">
              <b-col>
                <div style="border: 1px solid #FFFFFF;
                            box-sizing: border-box;">
                  <b-row style="cursor: pointer;" @click="openBuildingPlan">
                    <b-col cols="2" align-self="center">
                      <b-img :src="require('@/assets/icon-svg/building_plan.svg')" alt="" style=""/>
                    </b-col>
                    <b-col cols="8" align-self="center" style="padding: 5px !important;">
                      {{ $t('building_plan') }}
                    </b-col>
                  </b-row>
                </div>
              </b-col>
            </b-row>
            <b-row style="margin-top: 5px; margin-left: 10px !important; margin-right: 10px !important;">
              <b-col>
                <div style="border: 1px solid #FFFFFF;
                            box-sizing: border-box;">
                  <b-row style="cursor: pointer;" @click="open360VR">
                    <b-col cols="2" align-self="center">
                      <b-img :src="require('@/assets/icon-svg/vr.svg')" alt="" style=""/>
                    </b-col>
                    <b-col cols="8" align-self="center" style="padding: 5px !important;">
                      360<sup>o</sup> {{ $t('vr') }}
                    </b-col>
                  </b-row>
                </div>
              </b-col>
            </b-row>
            <b-row style="margin-top: 5px; margin-left: 10px !important; margin-right: 10px !important;">
              <b-col>
                <div style="border: 1px solid #FFFFFF;
                            box-sizing: border-box;">
                  <b-row style="cursor: pointer;" @click="openVideo">
                    <b-col cols="2" align-self="center">
                      <b-img :src="require('@/assets/icon-svg/video.svg')" alt="" style=""/>
                    </b-col>
                    <b-col cols="8" align-self="center" style="padding: 5px !important;">
                      {{ $t('video') }}
                    </b-col>
                  </b-row>
                </div>
              </b-col>
            </b-row>
            <b-row style="margin-top: 5px; margin-left: 10px !important; margin-right: 10px !important;">
              <b-col>
                <div style="border: 1px solid #FFFFFF;
                            box-sizing: border-box;">
                  <b-row style="cursor: pointer;" @click="openBrochure">
                    <b-col cols="2" align-self="center">
                      <b-img :src="require('@/assets/icon-svg/e_brochure.svg')" alt="" style=""/>
                    </b-col>
                    <b-col cols="8" align-self="center" style="padding: 5px !important;">
                      {{ $t('e_brochure') }}
                    </b-col>
                  </b-row>
                </div>
              </b-col>
            </b-row>
            <b-row style="margin-top: 5px; margin-left: 10px !important; margin-right: 10px !important;">
              <b-col>
                <div style="border: 1px solid #FFFFFF;
                            box-sizing: border-box;">
                  <b-row style="cursor: pointer;" @click="openMap">
                    <b-col cols="2" align-self="center">
                      <b-img :src="require('@/assets/icon-svg/map-pin-white.svg')" alt="" style=""/>
                    </b-col>
                    <b-col cols="8" align-self="center" style="padding: 5px !important;">
                      {{ $t('map') }}
                    </b-col>
                  </b-row>
                </div>
              </b-col>
            </b-row>
            <b-row style="margin-top: 20px; margin-bottom: 20px;">
              <b-col cols="2" offset="2">
                <ShareNetwork
                  network="facebook"
                  :url="urlHoonian + Model.data.main_pic"
                  :title="Model.share.title"
                  description="Hoonian"
                  :quote="Model.share.title"
                  hashtags="hoonian"
                >
                  <b-img :src="require('@/assets/icon-svg/facebook_white.svg')" alt="" style=""/>
                </ShareNetwork>
              </b-col>
              <b-col cols="2">
                <ShareNetwork
                  network="twitter"
                  :url="urlHoonian + Model.data.main_pic"
                  :title="Model.share.title"
                  description="Hoonian"
                  :quote="Model.share.title"
                  hashtags="hoonian"
                >
                  <b-img :src="require('@/assets/icon-svg/twitter_white.svg')" alt="" style=""/>
                </ShareNetwork>
              </b-col>
              <b-col cols="2">
                <b-img :src="require('@/assets/icon-svg/whatsapp_white.svg')" alt="" style="cursor: pointer;" @click="doWhatsapp"/>
              </b-col>
              <b-col cols="2">
                <b-img :src="require('@/assets/icon-svg/email_white.svg')" alt="" style="cursor: pointer;" @click="doEmail"/>
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <div style="background: #F8F8F8;">
          <b-row style="padding-top: 10px;">
            <b-col style="color: #828282; font-size: 14px;">
              {{Model.data.project_status}}
              &nbsp;&nbsp; > &nbsp;&nbsp;
              {{Model.data.location_name}}
              &nbsp;&nbsp; > &nbsp;&nbsp;
              {{Model.data.project_name}}
            </b-col>
          </b-row>
          <b-row style="margin-top: 20px; padding-bottom: 20px;">
            <b-col>
              <div style="text-shadow: 1px 0px; font-size: 22px; margin-bottom: 10px;">
                {{ $t('project_information') }}
              </div>
              <template v-for="(info, index) in Model.infos">
                <b-row v-bind:key="index">
                  <b-col>
                    <div style="color: #828282; font-size: 14px;">
                      {{info.header}}
                    </div>
                    <div class="row-view-black text-single" style="padding-left: 10px !important;">
                      {{info.body}}
                    </div>
                  </b-col>
                </b-row>
                <!-- <b-row v-if="index % 2 == 0" :key="index" align-v="baseline">
                  <b-col sm="3" style="padding-left: unset !important; padding-right: unset !important;">
                    <div class="row-view-black text-single" style="text-shadow: 0.7px 0px;">
                      {{Model.infos[index].header}}
                    </div>
                  </b-col>
                  <b-col sm="3" class="row-view-black text-single">
                    <div style="margin-right: 10px !important; padding-left: 10px !important;">
                      {{Model.infos[index].body}}
                    </div>
                  </b-col>
                  <b-col v-if="Model.infos.length > (index + 1)" sm="3" style="padding-left: unset !important; padding-right: unset !important;">
                    <div class="row-view-black text-single" style="margin-left: 10px !important; text-shadow: 0.7px 0px;">
                      {{Model.infos[index + 1].header}}
                    </div>
                  </b-col>
                  <b-col v-if="Model.infos.length > (index + 1)" sm="3" class="row-view-black text-single">
                    <div style="margin-right: 10px !important; padding-left: 10px !important;">
                      {{Model.infos[index + 1].body}}
                    </div>
                  </b-col>
                </b-row> -->
              </template>
            </b-col>
          </b-row>
        </div>
        <div style="height: 20px;">
        </div>
        <div style="background: #F8F8F8; padding-top: 20px; padding-bottom: 20px;">
        <b-row>
          <b-col cols="12">
            <div style="text-shadow: 1px 0px; font-size: 22px;">
              {{ $t('facilities') }}
            </div>
          </b-col>
          <b-col cols="12" style="margin-top: 20px;">
            <div style="overflow-x: auto; white-space: nowrap; display: block !important;">
              <template v-for="(data, index) in Model.facility_images">
                <b-img v-bind:key="index" :src="urlHoonian + data.thumbnail_image" alt="" class="pict_facilites" style="margin-left: 5px;" fluid-grow @error="onImageLoadFailure($event)" @click="doViewDetail(data)" />
              </template>
            </div>
          </b-col>
          <b-col cols="12" style="margin-top: 20px;">
            <template v-for="(facility, index) in Model.facilities">
              <b-row v-bind:key="index">
                <b-col class="row-view-black text-single">
                  {{facility.body}}
                </b-col>
              </b-row>
              <!-- <b-row v-if="index % 2 == 0" :key="index">
                <b-col sm="6" class="row-view-black text-single" style="margin-right: 10px !important; padding-left: unset !important;">
                  {{Model.facilities[index].body}}
                </b-col>
                <b-col class="row-view-black text-single" style="margin-left: 10px !important; padding-left: unset !important;" v-if="Model.facilities.length > (index + 1)">
                  {{Model.facilities[index + 1].body}}
                </b-col>
              </b-row> -->
            </template>
          </b-col>
        </b-row>
        </div>

        <b-row style="margin-top: 20px; padding-bottom: 20px;">
          <b-col>
            <div style="text-shadow: 1px 0px; font-size: 22px;">
              {{ $t('nearby') }}
            </div>
            <template v-for="(near, index) in Model.nearby">
              <div :key="index">
                <b-row style="margin-top: 20px;">
                  <b-col md="12" style="padding: unset !important;">
                    <b-img :src="urlHoonian + near.picture" alt="" style="height: 200px;" fluid-grow @error="onImageLoadFailure($event)" />
                  </b-col>
                </b-row>
                <b-row style="padding-top: 30px; background-color: #F8F8F8; height: 150px;">
                  <b-col md="12">
                    <b-row>
                      <b-col x style="font-size: 16px; text-shadow: 0.5px 0px;" class="text-single">
                        {{near.header}}
                      </b-col>
                    </b-row>
                    <b-row style="margin-top: 5px;">
                      <b-col style="font-size: 11.5px; text-align: justify" class="text-third">
                        {{near.body}}
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </div>
            </template>
          </b-col>
        </b-row>

        <b-row v-if="AvailableUnitTypes.length > 0" style="margin-top: 20px;">
          <template v-for="(data, index) in AvailableUnitTypes">
          <b-col sm="12" :key="data.id">
            <span style="text-shadow: 1px 0px; font-size: 22px;">{{ $t('available_unit_types') }}</span>
            <br />
            <span style="color: #828282; text-shadow: 0.5px 0px;">{{data.tower_cluster_name}}</span>
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
              :cHeader="availableUnitTypesHeader"
              :ref="`ref_available_unit_types_${index}`"
              @buttonViewClicked="doViewClick"
              ButtonBackDisabled
              SearchDisabled
              isHeaderFixed
              noCard
              removeCardTitle
              removePaddingTopBody
              noPaging
              noTitle
            >
              <template slot="gross_area" slot-scope="data">
                {{data.item.gross_area}} m<sup>2</sup>
              </template>
              <template slot="net_area" slot-scope="data">
                {{data.item.net_area}} m<sup>2</sup>
              </template>
              <template slot="start_from" slot-scope="data">
                IDR {{ isCurrency(data.item.start_from, 0) }}
              </template>
              <template slot="unit_type" slot-scope="data">
                <span style="color: #4A93B3">
                  {{data.item.unit_type}}
                </span>
              </template>
              <template slot="head_total_bedroom" slot-scope="data">
                <b-img :src="require('@/assets/icon-svg/bedroom.svg')" alt="" style=""/>
              </template>
              <template slot="head_total_bathroom" slot-scope="data">
                <b-img :src="require('@/assets/icon-svg/bathroom.svg')" alt="" style=""/>
              </template>
            </HOOList>
          </b-col>
          </template>
        </b-row>

        <b-row v-if="Model.nup || Model.vlaunching" style="margin-top: 10px; font-size: 13px;">
          <b-col cols="12" class="nup_launching_card">
            <div style="background: #FFFFFF;
                        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);">
            <b-row>
              <b-col>
                <div style="height: 75%; width: 6px; background: #4A93B3; margin-top: 10px;">
                  &nbsp;
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" class="nup_launching_card" align-self="center" style="padding: 10px 0px;">
                <div style="text-shadow: 0.5px 0px;">
                  {{ $t('purchase_your_nup_now') }}
                </div>
                <div>
                  {{momentUnix(Model.nup.start_datetime, "DD MMM YYYY")}} - {{momentUnix(Model.nup.end_datetime, "DD MMM YYYY")}}
                </div>
              </b-col>
              <b-col cols="12" class="col-right nup_launching_card" style="padding-bottom: 10px; align-self: flex-end;">
                <ABSButton
                  :text="$t('buy_nup')"
                  classButton="button button--hoonian"
                  styleButton="width: 100px;"
                  @click="buyNUP"
                />
              </b-col>
            </b-row>
            <!-- <b-row>
              <b-col cols="12" class="nup_launching_card" align-self="center" class="col-right" style="padding-bottom: 10px;">
                <ABSButton
                  :text="$t('buy_nup')"
                  classButton="button button--hoonian"
                  styleButton="width: 100px;"
                  @click="buyNUP"
                />
              </b-col>
            </b-row> -->
            </div>
          </b-col>
          <b-col cols="12" class="nup_launching_card">
            <div style="background: #FFFFFF;
                        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);">
            <b-row>
              <b-col>
                <div style="height: 75%; width: 6px; background: #4A93B3; margin-top: 10px;">
                  &nbsp;
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col align-self="center" style="padding: 10px 0px;">
                <div style="text-shadow: 0.5px 0px;">
                  {{ $t('virtual_launching') }}
                </div>
                <div>
                  {{momentUnix(Model.vlaunching.start_datetime, "DD MMM YYYY")}} - {{momentUnix(Model.vlaunching.end_datetime, "DD MMM YYYY")}}
                </div>
              </b-col>
            </b-row>
            </div>
          </b-col>
        </b-row>

        <!-- <b-row v-if="Model.vlaunching" style="margin-top: 10px; font-size: 13px;">
          <b-col>
            <div style="background: #FFFFFF;
                        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);">
            <b-row>
              <b-col>
                <div style="height: 75%; width: 6px; background: #4A93B3; margin-top: 10px;">
                  &nbsp;
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col align-self="center" style="padding: 10px 0px;">
                <div style="text-shadow: 0.5px 0px;">
                  {{ $t('virtual_launching') }}
                </div>
                <div>
                  {{momentUnix(Model.vlaunching.start_datetime, "DD MMM YYYY")}} - {{momentUnix(Model.vlaunching.end_datetime, "DD MMM YYYY")}}
                </div>
              </b-col>
            </b-row>
            </div>
          </b-col>
        </b-row> -->

        <b-row v-if="Progress.length > 0" style="margin-top: 10px;">
          <b-col style="text-shadow: 1px 0px; font-size: 22px;">
            {{ $t('progress') }}
          </b-col>
        </b-row>
        <b-row v-if="Progress.length > 0" style="padding-top: 10px; padding-bottom: 20px;">
          <b-col class="noPadding" style="overflow-x: auto; white-space: nowrap; display: block !important;">
          <template v-for="(data, index) in Progress">
            <b-row v-bind:key="index" style="display: inline-block !important;" class="progress_card">
            <b-col v-bind:key="index" @click="showDetailProgress(data, index)">
              <b-row>
                <b-col>
                  <b-img :src="urlHoonian + data.main_image" alt="" style="height: 130px;" fluid-grow @error="onImageLoadFailure($event)" />
                </b-col>
              </b-row>
              <!-- <b-row>
                <b-col style="font-size: 18px; font-weight: bold;">
                  {{data.project_name}}
                </b-col>
              </b-row> -->
              <b-row>
                <b-col style="font-size: 12px; color: #52A0FC;">
                  {{isCurrency(parseInt(data.percentage_completed), 0)}}% {{ $t('completed') }}
                </b-col>
              </b-row>
              <b-row>
                <b-col style="font-size: 12px; color: rgba(159, 162, 174, 0.7);">
                  {{momentUnix(data.created_at, "DD MMM YYYY")}}
                </b-col>
              </b-row>
            </b-col>
            </b-row>
          </template>
          </b-col>
        </b-row>
        <!-- <b-row v-if="Progress.length > 0" style="padding-top: 10px; padding-bottom: 20px;">
        <b-col style="overflow-x: auto; white-space: nowrap; display: block !important;">
          <template v-for="(item, index) in Progress">
            <div v-bind:key="index" style="display: inline-block !important; width: 28%; margin-right: 20px;">
              <b-row @click="showDetailProgress(item)">
                <b-col style="padding: unset !important;">
                  <b-img :src="urlHoonian + item.main_image" alt="" style="height: 150px; cursor: pointer;" fluid-grow @error="onImageLoadFailure($event)" @click="doViewDetail(item)" />
                </b-col>
              </b-row>
              <b-row style="margin-top: 10px;">
                <b-col style="color: #52A0FC; padding: unset !important;">
                  {{ parseInt(item.percentage_completed) }}% {{ $t('completed') }}
                </b-col>
              </b-row>
              <b-row>
                <b-col style="color: #828282; font-size: 12px; padding: unset !important;">
                  {{momentUnix(item.created_at, "DD MMM YYYY")}}
                </b-col>
              </b-row>
            </div>
          </template>
        </b-col>
        </b-row> -->
        
        <ABSModal id="Modal_Progress" ref="Modal_Progress" size="lg">
        <template slot="headerTitle">
          <span class="title-primary"> {{ProgressDetail.info.project_name}} - {{ProgressDetail.info.location_name}} </span>
        </template>
        <template slot="content">
          <b-row>
            <b-col md="12" style="padding-left: unset !important; padding-right: unset !important;">
              <b-row>
                <b-col md="3" style="padding-left: unset !important;">
                  <span class="title-primary"> {{momentUnix(ProgressDetail.info.progress_date, "DD MMM YYYY")}} </span>
                  <div style="height: 90%; margin-top: 10px; padding-left: unset !important; margin-right: 20px; border: solid 1px #dfe3f3; border-radius: 6px; padding: 15px;">
                    <div style="
                        width: 175px;
                        height: 175px;
                        background-color: #FFFFFF;
                        border-radius: 50%;
                        border: 20px solid #ffc700;
                        text-align: center;
                        margin: 0 auto !important;
                    ">
                        <div style="margin-top: 28%;">
                            <span style="color: #333399; font-size: 36px; font-weight: bold;">{{ProgressDetail.info.percentage_completed == null? 0 : parseInt(ProgressDetail.info.percentage_completed)}}%</span>
                        </div>
                    </div>
                    <div class="progress-x" style="text-align: center;">
                        <span style="font-weight: bold; font-size: 20px">Progress</span>
                    </div>
                  </div>
                </b-col>
                <b-col>
                  <span class="title-primary" style="font-size: 14px;">{{ $t('notes') }}</span>
                    <b-row style="margin-top: 10px;">
                    <b-col style="border: solid 1px #dfe3f3; border-radius: 6px;">
                      <div style="width: 100%; padding: 10px; min-height: 80px;">
                        <span style="font-size: 13px;" class="text-third">{{ProgressDetail.info.notes}}</span>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row style="margin-top: 10px;">
                    <b-col style="overflow-x: auto; white-space: nowrap; display: block !important; padding-left: unset !important;">
                      <template v-for="(item, index) in ProgressDetail.medias">
                        <div v-bind:key="index">
                          <b-row>
                            <b-col style="padding-left: unset !important;">
                              <b-img :src="urlHoonian + item.thumbnail_image" alt="" style="height: 150px; width: 150px !important; cursor: pointer;" fluid-grow @error="onImageLoadFailure($event)" @click="showImage(item.thumbnail_image)" />
                            </b-col>
                          </b-row>
                          <b-row style="margin-top: 10px; background: #FFFFFF;">
                            <b-col style="padding-left: unset !important; text-shadow: 0.5px 0px; font-size: 14px;" class="text-single">
                              {{item.remarks}}
                            </b-col>
                          </b-row>
                        </div>
                      </template>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </template>
      </ABSModal>
      <ABSModal id="Modal_FinancialPartners" ref="Modal_FinancialPartners" size="lg">
        <template slot="headerTitle">
          <span class="title-primary">Financial Partner Detail</span>
        </template>
        <template slot="content">
          <b-row>
            <b-col md="12" style="padding: unset !important;">
              <b-row>
                <b-col sm="3">
                  <b-img :src="urlHoonian + FinancialPartnersDetail.bank_logo" alt="" style="height: 100px;" fluid-grow @error="onImageLoadFailure($event)" />
                </b-col>
                <b-col>
                  <b-row>
                    <b-col style="font-size: 14px;">
                      {{FinancialPartnersDetail.bank_name}}
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col style="font-size: 12px; color: #828282;" class="text-third">
                      {{FinancialPartnersDetail.description}}
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <div style="max-height: 200px; overflow-y: scroll; margin-top: 10px;">
                <template v-for="(dataFinancial, index) in FinancialPartnersDetail.header_body">
                  <b-row :key="index" style="margin-bottom: 10px;">
                    <b-col>
                      <span style="font-size: 22px;">{{dataFinancial.header}}</span>
                      <br />
                      {{dataFinancial.body}}
                    </b-col>
                  </b-row>
                </template>
              </div>
            </b-col>
          </b-row>
        </template>
      </ABSModal>
      <ABSModalImage id="Modal_Image" ref="Modal_Image" size="md" />

        <b-row v-if="Promotion.length > 0" style="padding-top: 20px; background: #F8F8F8;">
          <b-col style="text-shadow: 1px 0px; font-size: 22px;">
            {{ $t('promotions') }}
          </b-col>
        </b-row>
        <b-row v-if="Promotion.length > 0" style="padding-top: 10px; background: #F8F8F8; padding-bottom: 20px;">
          <b-col class="noPadding" style="overflow-x: auto; white-space: nowrap; display: block !important; padding-bottom: 10px !important;">
          <template v-for="(data, index) in Promotion">
            <b-row v-bind:key="index" :style="`display: inline-block !important;` + (index < Model.length-1 ? 'margin-right: 5%;' : '')" class="promotion_card">
            <b-col :style="`box-shadow: 2px 6px 11px -7px black; border-radius: 6px;
              -webkit-box-flex: 0;
              flex: 0 0 21%;
              padding: 0px !important;`
            "  @click="doViewDetail(data)">
              <b-row>
                <b-col style="height: 45vw; padding: 0px !important;">
                  <b-img :src="urlHoonian + data.picture" alt="" class="center" style="max-height: 100%;" fluid-grow rounded @error="onImageLoadFailure($event)" />
                  <!-- <div style="position: absolute;
                    top: 18px;
                    right: 0%;
                    background: #52A0FC;
                    border-radius: 5px;
                    width: 100px;
                    padding: 5px;
                    text-align: center;
                    font-size: 14px;
                    color: white;">
                    <b>{{data.total_buyer}} Buyers</b>
                  </div> -->
                </b-col>
              </b-row>
              <b-row style="padding-left: 10px; margin-top: 10px;">
                <b-col style="font-size: 15px; font-weight: bold;">
                  {{cutWord(data.promotion_name, 20)}}
                </b-col>
              </b-row>
              <!-- <b-row>
                <b-col style="font-size: 12px; color: #52A0FC;">
                  {{cutWord(data.project_name,25)}}
                </b-col>
              </b-row> -->
              <b-row style="padding-left: 10px; padding-bottom: 10px;">
                <b-col style="font-size: 12px; color: #616161;">
                  {{momentUnix(data.start_datetime, "DD MMM YYYY")}} - {{momentUnix(data.end_datetime, "DD MMM YYYY")}}
                </b-col>
              </b-row>
            </b-col>
            </b-row>
          </template>
          </b-col>
        </b-row>
        <!-- <b-row v-if="Promotion.length > 0" style="padding-top: 10px; background: #F8F8F8; padding-bottom: 20px;">
        <b-col style="overflow-x: auto; white-space: nowrap; display: block !important;">
          <template v-for="(item, index) in Promotion">
            <div v-bind:key="index" style="display: inline-block !important; width: 40%; margin-right: 10px;">
              <b-row style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);">
                <b-col style="padding: unset !important;">
                  <b-row>
                    <b-col style="padding: unset !important;">
                      <b-img :src="urlHoonian + item.picture" alt="" style="height: 200px; cursor: pointer;" fluid-grow @error="onImageLoadFailure($event)" @click="doViewDetail(item)" />
                    </b-col>
                  </b-row>
                  <b-row style="padding-top: 10px; background: #FFFFFF;">
                    <b-col style="white-space: normal !important; text-shadow: 0.5px 0px; padding-left: 10px !important;">
                      {{item.promotion_name}}
                    </b-col>
                  </b-row>
                  <b-row style="background: #FFFFFF; padding: 10px 0px;">
                    <b-col style="color: #828282; font-size: 12px; padding-left: 10px !important;">
                      {{momentUnix(item.start_datetime, "DD MMM YYYY")}} - {{momentUnix(item.end_datetime, "DD MMM YYYY")}}
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </div>
          </template>
        </b-col>
        </b-row> -->

        <b-row v-if="FinancialPartner.length > 0" style="margin-top: 20px;">
          <b-col style="text-shadow: 1px 0px; font-size: 22px;">
            {{ $t('financial_partners') }}
          </b-col>
        </b-row>
        <b-row v-if="FinancialPartner.length > 0" style="padding-top: 10px; padding-bottom: 20px;">
        <b-col style="overflow-x: auto; white-space: nowrap; display: block !important;">
          <template v-for="(item, index) in FinancialPartner">
            <div v-bind:key="index" style="display: inline-block !important; margin-right: 10px;" class="financial_card" @click="showDetailFinancialPartners(item)">
              <b-row style="background: #FFFFFF;
                            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);">
                <b-col cols="4" style="padding: 10px !important;">
                  <b-img :src="urlHoonian + item.bank_logo" alt="" style="height: 70px; cursor: pointer;" fluid-grow @error="onImageLoadFailure($event)" @click="doViewDetail(item)" />
                </b-col>
                <b-col cols="8" style="padding: 10px !important; cursor: pointer;">
                  <b-row>
                    <b-col style="white-space: normal; font-size: 14px;">
                      {{item.bank_name}}
                    </b-col>
                  </b-row>
                  <b-row style="margin-top: 10px;">
                    <b-col style="font-size: 12px; color: #828282; white-space: normal;" class="text-double">
                      {{item.description}}
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </div>
          </template>
        </b-col>
        </b-row>

        <b-row v-if="News.length > 0" style="padding-top: 20px; background: #F8F8F8;">
          <b-col>
            <div style="text-shadow: 1px 0px; font-size: 22px; margin-bottom: 10px;">
              {{ $t('news') }}
            </div>
            <template v-for="(news, index) in News">
              <b-row :key="index" :style="index > 0 ? 'margin-top: 20px;' : ''">

              <b-col cols="4" style="" @click="showWebsite(News[index])">
                  <b-img :src="urlHoonian + News[index].main_image" alt=""
                  :style="`height: 100px; cursor: pointer;`"
                  fluid-grow @error="onImageLoadFailure($event)" />
              </b-col>
              <b-col  cols="8" style="" align-self="center">
                  <b-row>
                      <b-col style="color: #4A93B3; font-size: 15px;" class="text">
                          {{News[index].title}}
                      </b-col>
                  </b-row>
                  <b-row>
                      <b-col style="color: #BDBDBD; font-size: 12px;">
                          {{momentUnix(News[index].created_at, "DD MMM YYYY")}}
                      </b-col>
                  </b-row>
                  <b-row>
                      <b-col style="color: #BDBDBD; font-size: 12px;">
                          {{getDomainName(News[index].url)}}
                      </b-col>
                  </b-row>
              </b-col>

                <!-- left -->
                <!-- <template v-if="index % 2 == 0">
                <b-col  sm="2" style="" @click="showWebsite(News[index])">
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
                </template> -->
              
              <!-- right -->
              <!-- <template v-if="index % 2 == 0 && News.length > index + 1">
                <b-col  sm="2" style="" @click="showWebsite(News[index + 1])">
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
                </template> -->
              </b-row>
            </template>
          </b-col>
        </b-row>

      </b-col>
    </b-row>
    <ABSModalImage id="Modal_Image" ref="Modal_Image" size="md" />
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
        share: {title: "", body: ""},
        vlaunching: {},
      },
      AvailableUnitTypes: [],
      availableUnitTypesHeader: [
        {
          key: "unit_type",
          label: "UNIT TYPE",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left S poppins",
        },
        {
          key: "gross_area",
          label: "GROSS AREA",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left S poppins",
        },
        {
          key: "net_area",
          label: "NET AREA",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left S poppins",
        },
        {
          key: "total_bedroom",
          label: "",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
          isCustom: true,
        },
        {
          key: "total_bathroom",
          label: "",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
          isCustom: true,
        },
        {
          key: "total",
          label: "TOTAL",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "direction",
          label: "DIRECTION",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
        {
          key: "start_from",
          label: "START FROM",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left M poppins",
        },
      ],
      Progress: [],
      ProgressDetail: {
        info: {},
        medias: [],
      },
      Promotion: [],
      FinancialPartner: [],
      FinancialPartnersDetail: {
        id: "",
        bank_name: "",
        bank_logo: "",
        description: "",
        headerbody: [],
      },
      News: [],
    }
  },
  methods: {
    showWebsite(data) {
      window.open(data.url);
    },
    changeImage(path) {
      this.Model.data.main_pic = path;
    },
    showDetailProgress(data) {
      this.getProgressDetail(data.id);
    },
    showDetailFinancialPartners(data) {
      this.getFinancialPartners(data.id);
    },
    showImage(pathUrl) {
      this.$refs.Modal_Image._show(this.urlHoonian + pathUrl);
    },
    getProgressDetail(id) {
      let param = {
          project_progress_id: id,
      };
      this.postJSON(
          this.urlHoonian + "/api/hoonian-website/dashboard/project-info/progress/detail",
          param
      ).then((response) => {
        if (response == null) return;
        let data = response.data;
        this.ProgressDetail = data;
        this.$refs.Modal_Progress._show();
      });
    },
    getFinancialPartners(id) {
      let param = {
        id: id,
        lang_id: this.getDataUser().lang_id,
      };
      this.postJSON(
        this.urlHoonian + "/api/marketing-website/project/financial-partners-detail",
        param
      ).then((response) => {
        if (response == null) return;
        let data = response.data;
        this.FinancialPartnersDetail = data;
        this.$refs.Modal_FinancialPartners._show();
      });
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
      let msg = this.replaceAllString(this.getBodyMessage(), "\n", "%0D%0A", "string");
      msg = this.replaceAllString(msg, "&nbsp;", "%20", "string");
      let url = "https://api.whatsapp.com/send?text=" + msg;
      window.open(url);
    },
    doEmail() {
      let attachmentUrl = encodeURIComponent(this.getBrochureLink().replace('\\', '/')) + "%0D%0A%0D%0A";
      let email = "";
      window.open(`mailto:${email}?subject=${this.Model.share.title}&body=${this.getBodyMessage()}`);
    },
    getBodyMessage() {
      return this.Model.share.body;
    },
    getBrochureLink() {
      return this.urlHoonian + this.Model.data.upload_brochure;
    },
    buyNUP() {
      let param = this.paramFromList;
      param.projectDetail = this.Model;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "MK_ProjectDetailNUP" });
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    getProject() {
      let param = {
        project_id: this.paramFromList.id,
        lang_id: this.getDataUser().lang_id,
      };

      this.postJSON(this.urlHoonian + '/api/marketing-website/project/detail', param, true).then((response) => {
        if (response == null) return;
        this.Model = response.data;
        this.changeImage(this.Model.image.length > 0? this.Model.image[0].thumbnail_image: '');
      });
    },
    getAvailableUnitTypes() {
      let param = {
        project_id: this.paramFromList.id,
        lang_id: this.getDataUser().lang_id,
      };

      this.postJSON(this.urlHoonian + '/api/marketing-website/project/available-unit-types-header', param, true).then((response) => {
        if (response == null) return;
        let data = response.data;
        if (data.length == 0) this.$store.commit('setStatusLoader', false);

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
                principle_id: this.getDataUser().principle_id,
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
      param.projectName = this.Model.data.project_name;
      param.address = this.Model.data.address;
      param.availableUnitTypes = data;
      param.isEdit = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "MK_UnitType" });
    },
    getProgress() {
      let param = {
        project_id: this.paramFromList.id,
      };

      this.postJSON(this.urlHoonian + '/api/marketing-website/project/progress', param, true).then((response) => {
        if (response == null) return;
        this.Progress = response.data.list;
      });
    },
    getPromotion() {
      let param = {
        project_id: this.paramFromList.id,
      };

      this.postJSON(this.urlHoonian + '/api/marketing-website/project/promotion', param, true).then((response) => {
        if (response == null) return;
        this.Promotion = response.data.list;
      });
    },
    getFinancialPartner() {
      let param = {
        project_id: this.paramFromList.id,
      };

      this.postJSON(this.urlHoonian + '/api/marketing-website/project/financial-partners', param, true).then((response) => {
        if (response == null) return;
        this.FinancialPartner = response.data;
      });
    },
    getNews() {
      let param = {
        project_id: this.paramFromList.id,
      };

      this.postJSON(this.urlHoonian + '/api/marketing-website/project/news', param, true).then((response) => {
        if (response == null) return;
        this.News = response.data.list;
      });
    },
  },
  mounted() {
    this.getProject();
    this.getProgress();
    this.getPromotion();
    this.getFinancialPartner();
    this.getNews();
    this.getAvailableUnitTypes();
  },
};
</script>

<style scoped>
</style>
