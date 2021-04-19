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
         <b-row style="padding-top: 10px; background: #F8F8F8;">
           <b-col style="text-shadow: 0.5px 0px; font-size: 22px;">
             {{ $t('unit_details') }}
           </b-col>
           <b-col sm="3">
             <b-row style="text-align: right;">
               <b-col>
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
                <b-col>
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

         <b-row style="background: #F8F8F8; padding-top: 10px;">
           <b-col>
             <HOOList
                :prop="propList"
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
                :cHeader="unitListHeader"
                ref="ref_list"
                @buttonViewClicked="doViewClick"
                ButtonBackDisabled
                SearchDisabled
                isHeaderFixed
                noCard
                removeCardTitle
                removePaddingTopBody
              >
                <template slot="unit_no" slot-scope="data">
                  <span style="color: #4A93B3">
                    {{data.item.unit_no}}
                  </span>
                </template>
                <template slot="head_total_bedroom" slot-scope="data">
                  <b-img :src="require('@/assets/icon-svg/bedroom.svg')" alt="" style=""/>
                </template>
                <template slot="head_total_bathroom" slot-scope="data">
                  <b-img :src="require('@/assets/icon-svg/bathroom.svg')" alt="" style=""/>
                </template>
                <template slot="price" slot-scope="data">
                  {{ isCurrency(data.item.price, 0) }}
                </template>
                <template slot="unit_status" slot-scope="data">
                  <b-row>
                    <b-col align-self="center" sm="4" style="padding-left: unset !important;">
                      Reservation
                    </b-col>
                    <b-col>
                      <ABSButton
                        :text="'Reservation'"
                        classButton="btn btn--default"
                        classIcon="icon-style-1"
                        @click="doReservation"
                        styleButton="height: 40px;"
                      />
                    </b-col>
                  </b-row>
                  <!-- <span v-if="data.item.unit_status == 1" style="color: #219653">
                    AVAILABLE
                    <ABSButton
                      :text="'Reservation'"
                      classButton="btn btn--default"
                      classIcon="icon-style-1"
                      @click="doReservation"
                      styleButton="height: 40px;"
                    />
                  </span>
                  <span v-else-if="data.item.unit_status == 2" style="color: #F2C94C">
                    BOOKED &nbsp;
                    <ABSButton
                      :text="'Waiting List'"
                      classButton="btn btn--default"
                      classIcon="icon-style-1"
                      @click="doWaitingList"
                      styleButton="height: 40px;"
                    />
                  </span>
                  <span v-else style="color: #EB5757">
                    SOLD
                  </span> -->
                </template>
              </HOOList>
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
      propList: {
        url: "/api/marketing-website/project/unit-type/unit-list",
        initialWhere: "",
        SortField: "",
        SortBy: "desc",
        ParamWhere: "",
        param: {
          unit_type_id: "",
          marketing_agent_id: "",
          tower_cluster_id: "",
          type: "",
          lang_id: this.getDataUser().lang_id,
        }
      },
      unitListHeader: [
        {
          key: "unit_no",
          label: "UNIT",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "block_floor_name",
          label: "FLOOR",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
        {
          key: "net_area",
          label: "NET AREA",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
        {
          key: "gross_area",
          label: "SEMI-GROSS",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
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
          key: "direction",
          label: "DIRECTION",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
        {
          key: "price",
          label: "PRICE",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
        {
          key: "unit_status",
          label: "STATUS",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
      ],
      type: "all",
    }
  },
  methods: {
    doReservation() {

    },
    doWaitingList() {

    },
    rowClicked(data) {
      // let param = this.paramFromList;
      // param.projectName = this.Model.data.project_name;
      // param.address = this.Model.data.address;
      // param.availableUnitTypes = data;
      // param.isEdit = false;
      // this.$store.commit("setParamPage", param);
      // this.$router.push({ name: "MK_UnitType" });
    },
    setPropList() {
      this.propList.initialWhere = this.paramFromList.id;
      this.propList.param.unit_type_id = this.paramFromList.availableUnitTypes.id;
      this.propList.param.marketing_agent_id = this.getDataUser().marketing_id;
      this.propList.param.tower_cluster_id = this.Model.data.tower_cluster_id;
      this.propList.param.type = this.type;

      this.$nextTick(() => {
        this.$refs.ref_list.doGetList("");
      })
    },
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

        this.setPropList();
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
