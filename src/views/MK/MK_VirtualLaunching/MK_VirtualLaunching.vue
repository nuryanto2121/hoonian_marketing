<template>
    <div class="dashboard-page-chart">
        <div class="dashboard-page-chart__body">
            <b-row class="dashboardBody poppins">
                <b-col lg="12" xl="12">
                    <div class="card">
                        <!-- <div class="card__title">
                        <b-row>
                            <b-col style="max-width: max-content !important">
                            <span>Project List</span>
                            </b-col>
                        </b-row>
                        </div> -->
                        <div class="card__body">
                            <span style="color: black !important;" class="title-primary">Project List</span>
                        </div>
                     </div>
                    <div class="card">
                        <div class="card__body">
                            <b-row>
                                <b-col xl="4" lg="4"
                                    v-for="(data, index) in Model" :key="data.id"
                                    :style="`padding: unset !important; ${index == 0 && Model.length > 1? 'padding-right: 10px !important;': ''} ${index == 1 ? 'padding-left: 10px !important;': ''}`">
                                    <div class="card" @click="OnLaunchingClick(data)">
                                        <div class="card__body" style="padding: unset !important;">
                                            <b-row>
                                                <b-col style="padding: unset !important;">
                                                    <b-img :src="urlHoonian + data.main_pic" alt=""
                                                    :style="`height: 310px; cursor: pointer;`"
                                                    fluid-grow @error="onImageLoadFailure($event)" />
                                                </b-col>
                                            </b-row>
                                            <b-row style="padding: 10px 10px 10px 10px !important;">
                                                <b-col style="font-size: 14px; text-shadow: 0.5px 0px;">
                                                    {{data.project_name}}
                                                </b-col>
                                                <b-col md="2" style="font-size: 14px; text-align: right; text-shadow: 0.5px 0px;">
                                                    {{data.project_category_name}}
                                                </b-col>
                                            </b-row>
                                            <b-row style="padding: 0px 10px 0px 10px !important;">
                                                <b-col style="font-size: 14px; text-shadow: 0.5px 0px;">
                                                    {{ $t('start_from') }} IDR {{ isCurrency(data.start_from_price, 0) }}
                                                </b-col>
                                            </b-row>
                                            <b-row style="padding: 0px 10px !important; padding-bottom: 10px;">
                                                <b-col style="font-size: 12px; color: #828282;">
                                                    IDR {{ isCurrency(data.price_per_meter_square,0) }} / m<sup>2</sup>
                                                </b-col>
                                            </b-row>
                                            <b-row style="padding: 0px 10px !important; padding-bottom: 10px; font-size: 10px;">
                                                <b-col style="">
                                                    <b-img :src="require('@/assets/icon-svg/map-pin.svg')" alt="" style="" />
                                                    {{data.location_name}}
                                                </b-col>
                                                <b-col style="text-align: right;">
                                                    {{data.project_type == 'H' ? 'High Rise' : 'Landed'}}
                                                </b-col>
                                            </b-row>
                                            <b-row style="padding: 0px 10px !important; padding-bottom: 10px; font-size: 10px;">
                                                <b-col style="padding-right: 0px !important;" lg="3" xl="4">
                                                    <b-img :src="require('@/assets/icon-svg/house.svg')" alt="" style="" />
                                                    {{data.total_unit}} {{ $t('units') }}
                                                </b-col>
                                                <b-col lg="4" class="col-bd-room" style="padding-right: 0px !important; padding-left: 0px !important;">
                                                    &nbsp; | &nbsp;
                                                    <b-img :src="require('@/assets/icon-svg/bed.svg')" alt="" style="" />
                                                    {{data.unit_type_desc}}
                                                </b-col>
                                                <b-col style="padding-left: 0px !important;">
                                                    &nbsp; | &nbsp;
                                                    <b-img :src="require('@/assets/icon-svg/resize.svg')" alt="" style="" />
                                                    {{data.unit_area_desc}}
                                                </b-col>
                                            </b-row>

                                            <template v-if="data.status == 'w'">
                                                <template v-if="!data.inDays">
                                                    <!-- kurang sehari -->
                                                    <b-row style="height: 30px;">
                                                        <b-col style="font-size: 15px; text-align: center; font-weight: bold;">
                                                            {{ $t('time_to_launching') }}
                                                        </b-col>
                                                    </b-row>
                                                    <b-row style="padding: 0px 10px 0px 10px !important;">
                                                        <b-col style="padding-right: 10px !important; text-align: center; color: rgb(155 81 224); font-weight: bold; margin: 10px; background-color: #f2f2f2;">
                                                            <span style="font-size: 40px;"> {{data.h_left}} </span>
                                                            <span style="font-size: 20px;">{{ $t('hours') }}</span>
                                                        </b-col>
                                                        <b-col style="text-align: center; color: rgb(155 81 224); font-weight: bold; margin: 10px; background-color: #f2f2f2;">
                                                            <span style="font-size: 40px;"> {{data.m_left}} </span>
                                                            <span style="font-size: 20px;">{{ $t('minutes') }}</span>
                                                        </b-col>
                                                    </b-row>
                                                </template>
                                                <template v-else>
                                                    <b-row style="height: 30px;">
                                                        <b-col style="font-size: 15px; text-align: center; font-weight: bold;">
                                                            {{ $t('day_to_launching') }}
                                                        </b-col>
                                                    </b-row>
                                                    <b-row style="padding: 0px 10px 0px 10px !important;">
                                                        <b-col style="text-align: center; color: rgb(155 81 224); font-weight: bold; margin: 10px; background-color: #f2f2f2;">
                                                            <span style="font-size: 40px;"> {{data.d_left}} </span>
                                                            <span style="font-size: 20px;">{{ $t('days') }}</span>
                                                        </b-col>
                                                    </b-row>
                                                </template>
                                            </template>
                                            <template v-else>
                                                <b-row style="padding: 0px 10px 10px 10px !important; margin-top: 20px;">
                                                    <b-col style="height: 70px; background-color: red; color: white; font-size: 17px; text-align: center; line-height: 50px;">
                                                        <div style="width: 100%;" class="center">
                                                            {{ $t('v_launching') }} {{ $t('in_progress') }}
                                                        </div>
                                                    </b-col>
                                                </b-row>
                                            </template>
                                        </div>
                                    </div>
                                </b-col>
                            </b-row>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      Model: [],
    };
  },
  methods: {
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    OnLaunchingClick(data) {
      var param = data;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "MK_VirtualLaunchingDetail" });
    },
    doViewDetail(data) {
    //   console.log(data);
    },
    getData() {
      let param = {
        company_group_id: this.company_group_id,
        principle_id: this.getDataUser().principle_id,
      };
      this.postJSON(
        this.urlHoonian + "/api/marketing-website/v-launching/list",
        param
      ).then((response) => {
        if (response == null) return;
        this.Model = [];
        for (let i = 0; i < response.data.length; i++) {
          const data = response.data[i];
          let h_left = 0, m_left = 0, d_left = 0, status = 'w', inDays = false;
        //   console.log(new Date(this.momentUnix(data.start_datetime, "YYYY-MM-DD HH:mm")))
        //   console.log(this.momentDiff(new Date(), new Date(this.momentUnix(data.start_datetime, "YYYY-MM-DD HH:mm")), 'days'))
          if (this.momentDateToUnix(new Date()) < data.start_datetime) {
            status = 'w';
            if (this.momentDiff(new Date(), new Date(this.momentUnix(data.start_datetime, "YYYY-MM-DD HH:mm")), 'days') < 1) {
                // console.log(new Date(), new Date(this.momentUnix(data.start_datetime, "YYYY-MM-DD HH:mm")))
                // console.log(this.momentDiffFormat(new Date(), new Date(this.momentUnix(data.start_datetime, "YYYY-MM-DD HH:mm")), 'HH:mm'))
              h_left = parseInt(this.momentDiffFormat(new Date(this.momentUnix(data.start_datetime, "YYYY-MM-DD HH:mm")), new Date(), 'HH:mm').split(':')[0]);
              m_left = parseInt(this.momentDiffFormat(new Date(this.momentUnix(data.start_datetime, "YYYY-MM-DD HH:mm")), new Date(), 'HH:mm').split(':')[1]);
            }
            else {
              inDays = true;
            //   console.log(this.momentDiffFormat(new Date(), new Date(this.momentUnix(data.start_datetime, "YYYY-MM-DD HH:mm")), 'HH:mm'))
              d_left = parseInt(this.momentDiff(new Date(), new Date(this.momentUnix(data.start_datetime, "YYYY-MM-DD HH:mm")), 'days'));
            }
          }
          else {
            status = 'i';
          }
          this.Model.push({
            ...data,
            status: status,
            inDays: inDays,
            h_left: h_left,
            m_left: m_left,
            d_left: d_left
          })
        }

        // console.log(this.Model)
      });
    },
  },
  mounted() {
    this.getData();
    this.$store.commit("setTitleMenu", "Virtual Launching");
    this.$store.commit("setBackButton", false);
  },
};
</script>

<style scoped>
@media (min-width: 992px) {
    .col-bd-room {
        flex: 0 0 36%;
        max-width: 36%;
    }
}
</style>