<template>
  <div style="height: 95%; padding-left: 5px; padding-right: 5px;">
    <b-row>
      <b-col
        v-for="(data, index) in Model" :key="data.id"
        :style="`padding: unset !important; ${index == 0 && Model.length > 1? 'padding-right: 10px !important;': ''} ${index == 1 ? 'padding-left: 10px !important;': ''}`">
        <div class="card" @click="doViewDetail(data)">
          <div class="card__body" style="padding: unset !important;">
            <b-row>
              <b-col style="padding: unset !important;">
                <b-img :src="urlHoonian + data.main_pic" alt=""
                :style="`height: 310px; cursor: pointer;`"
                fluid-grow @error="onImageLoadFailure($event)" />
              </b-col>
            </b-row>
            <b-row style="padding: 10px !important;">
              <b-col style="font-size: 14px; text-shadow: 0.5px 0px;">
                {{data.project_name}}
              </b-col>
              <b-col md="2" style="font-size: 14px; text-align: right; text-shadow: 0.5px 0px;">
                {{data.project_category_name}}
              </b-col>
            </b-row>
            <b-row style="padding: 10px !important;">
              <b-col style="font-size: 14px; text-shadow: 0.5px 0px;">
                {{ $t('start_from') }} IDR {{ isCurrency(data.start_from_price, 0) }}
              </b-col>
            </b-row>
            <b-row style="padding: 0px 10px !important; padding-bottom: 10px;">
              <b-col style="font-size: 12px;">
                IDR {{ isCurrency(data.price_per_meter_square,0) }} / m<sup>2</sup>
              </b-col>
            </b-row>
            <b-row style="padding: 0px 10px !important; padding-bottom: 10px; font-size: 10px;">
              <b-col style="">
                <b-img :src="require('@/assets/icon-svg/map-pin.svg')" alt="" style="" />
                {{data.location_name}}
              </b-col>
              <b-col>
                | &nbsp;
                <b-img :src="require('@/assets/icon-svg/building.svg')" alt="" style="" />
                {{data.project_type == 'H' ? 'High Rise': 'landed'}}
              </b-col>
              <b-col>
                | &nbsp;
                <b-img :src="require('@/assets/icon-svg/house.svg')" alt="" style="" />
                {{data.total_unit}} {{ $t('units') }}
              </b-col>
              <b-col>
                | &nbsp;
                <b-img :src="require('@/assets/icon-svg/bed.svg')" alt="" style="" />
                {{data.unit_type_desc}}
              </b-col>
              <b-col>
                | &nbsp;
                <b-img :src="require('@/assets/icon-svg/resize.svg')" alt="" style="" />
                {{data.unit_area_desc}}
              </b-col>
            </b-row>
          </div>
        </div>
      </b-col>
    </b-row>
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
    doViewDetail(data) {
      this.$store.commit("setParamPage", data);
      this.$router.push({ name: "MK_ProjectDetail" });
    },
    getData() {
      let param = {
        company_group_id: this.company_group_id,
        principle_id: this.getDataUser().principle_id,
      };
      this.postJSON(
        this.urlHoonian + "/api/marketing-website/dashboard/project-big",
        param
      ).then((response) => {
        if (response == null) return;
        this.Model = response.data;
        // this.Model.pop();
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>