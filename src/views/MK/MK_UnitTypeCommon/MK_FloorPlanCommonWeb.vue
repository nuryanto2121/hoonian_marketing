<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col lg="12" xl="12" style="background: white;">
          <b-row>
            <b-col sm="2">
              <span>
                {{ $t('select_floor') }}
                </span>
                <HOODropDown
                  @change="Onblock_floorChange"
                  :prop="PI_block_floor"
                  v-model="Model.block_floor"
                  :label="Model.block_floorLabel"
                  noAuth
                  ref="ref_block_floor"
                />
            </b-col>
            <b-col style="color: #4A93B3; text-align: right;">
              <br />
              <span style="text-shadow: 0.5px 0px;">{{Model.tower_cluster_name}}</span>
              <br />
              <span style="font-size: 14px;">{{Model.block_floorLabel}}</span>
            </b-col>
          </b-row>
          <!-- <b-row>
            <b-col>
              <b-img :src="urlHoonian + Model.floor_plan_image" alt=""
                :style="`height: 600px;`"
                fluid-grow @error="onImageLoadFailure($event)" />
            </b-col>
          </b-row> -->

          <b-row>
            <b-col align-self="center" sm="1" style="text-align: center;">
              <b-img :src="require('@/assets/icon-svg/left_floor_plan.svg')" alt="" style="cursor: pointer;" @click="onLeft" />
            </b-col>
            <b-col sm="10" ref="container">
              <v-stage :config="stageSize" ref="stage">
                <v-layer>
                  <v-image :config="{
                    image: image,
                    width: 1000,
                    height: 490,
                  }"/>
                  <!-- <template v-for="data in savedShape">
                    <v-line @click="showBuyerDetails(data)" :config="{
                        points: data.point_unit,
                        tension: 0,
                        fill: data.color_cd + '80',
                        closed: true,
                      }" -->
                    />
                    <!-- <v-text :config="{
                      x: data.point_unit[0],
                      y: data.point_unit[1],
                      text: data.unit_type_name,
                      fontSize: 24,
                      fill: 'white',
                      align: 'center'
                    }"
                    />
                    <v-text :config="{
                      x: data.point_unit[0],
                      y: data.point_unit[1] + 25,
                      text: data.unit_no,
                      fontSize: 24,
                      fill: 'white',
                      align: 'center'
                    }"
                    />
                    <v-text :config="{
                      x: data.point_unit[0],
                      y: data.point_unit[1] + 50,
                      text: data.unit_status,
                      fontSize: 24,
                      fill: 'white',
                      align: 'center'
                    }" -->
                    <!-- />
                  </template> -->
                </v-layer>
              </v-stage>
            </b-col>
            <b-col align-self="center" sm="1" style="text-align: center;">
              <b-img :src="require('@/assets/icon-svg/right_floor_plan.svg')" alt="" style="cursor: pointer;" @click="onRight" />
            </b-col>
            <MKBuyerDetailReserve ref="Modal_BuyerDetailReserve" />
          </b-row>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import MKBuyerDetailReserve from "./MK_BuyerDetailReserveCommon";
// const width = window.innerWidth;
const width = 1000;
const height = 500;
export default {
  components: {
    MKBuyerDetailReserve
  },
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
        block_floor: "",
        block_floorLabel: "",
      },
      stageSize: {
        width: width,
        height: height
      },
      image: null,
      savedShape: [],
      PI_block_floor: {
        dataLookUp: {
          url: "/api/marketing-website/common/project/block-floor-lookup",
          param: {
            project_id: "",
            tower_cluster_id: "",
            lang_id: "",
          }
        },
        cValidate: "",
        cName: "block_floor",
        ckey: false,
        cOrder: 1,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
        callback: this.callbackDropdown,
      },
      index: -1,
      tempFloor: [],
    }
  },
  methods: {
    showBuyerDetails(data) {
      const param = {
        id: data.unit_id,
        status: data.unit_status,
        block_floor_name: this.Model.block_floorLabel,
        unit_no: data.unit_no,
        booking_type: data.booking_type,
        tower_cluster_name: this.Model.tower_cluster_name,
        unit_type_name: data.unit_type_name,
      };
      this.$refs.Modal_BuyerDetailReserve.doReservationOrBooked(param);
    },
    callbackDropdown(data) {
      if (data.length > 0) {
        this.tempFloor = data;
        this.index = 0;
        this.Onblock_floorChange(this.tempFloor[0]);
      } else {
        this.tempFloor = [];
      }
    },
    onLeft() {
      if (this.index <= 0) return;
      this.Onblock_floorChange(this.tempFloor[this.index - 1]);
    },
    onRight() {
      if (this.index == -1 || this.index == this.tempFloor.length - 1) return;
      this.Onblock_floorChange(this.tempFloor[this.index + 1]);
    },
    Onblock_floorChange(data) {
      this.$nextTick(() => {
        this.Model.block_floor = data.id;
        this.Model.block_floorLabel = data.label;

        for (let x = 0; x < this.tempFloor.length; x++) {
          if (this.tempFloor[x].id == data.id) {
            this.index = x;
            break;
          }
        }

        this.getFloorPlan();
      })
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    getFloorPlan() {
      let param = {
        // principle_id: this.getDataUser().principle_id,
        lang_id: "en",//this.getDataUser().lang_id,
        block_floor_id: this.Model.block_floor,
        unit_type_id: this.paramFromList.availableUnitTypes.id,
      };

      this.postJSON(this.urlHoonian + '/api/marketing-website/common/project/unit-type/floor-plan', param, false, false).then((response) => {
        if (response == null) return;
        this.Model = {
          ...this.Model,
          ...response.data
        }

        let units = response.data.units;
        let arrToDisplay = [];
        for (let x = 0; x < units.length; x++) {
          let arrXY = [];
          for (let idx = 0; idx < units[x].points.length; idx++) {
            arrXY.push(units[x].points[idx].x_point);
            arrXY.push(units[x].points[idx].y_point);
          }
          arrToDisplay.push({
            booking_type: units[x].booking_type,
            color_cd: units[x].color_cd,
            point_unit: arrXY,
            unit_id: units[x].unit_id,
            unit_no: units[x].unit_no,
            unit_status: units[x].unit_status,
            unit_type_name: units[x].unit_type_name,
          });
        }
        this.savedShape = arrToDisplay;

        const image = new window.Image();
        image.src = this.urlHoonian + response.data.floor_plan_image;;
        image.onload = () => {
          this.image = image;

          // console.log(image.width + "X" + image.height)
          // this.stageSize.width = image.width;
          // this.stageSize.height = image.height;
        };
      });
    },
  },
  mounted() {
    this.$store.commit("setTitleMenu", this.$t('floor_plan_label'));
    this.PI_block_floor.dataLookUp.param.project_id = this.paramFromList.id;
    this.PI_block_floor.dataLookUp.param.tower_cluster_id = this.paramFromList.tower_cluster_id;
    this.PI_block_floor.dataLookUp.param.lang_id = this.getLanguageCommon().lang_id,
    this.$refs.ref_block_floor.getData();
  }
};
</script>

<style scoped>
</style>
