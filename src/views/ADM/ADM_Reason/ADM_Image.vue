<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <b-row>
            <b-col md="4" offset="4">
              <!-- <img id="logo" :src="M_Image.file_show" alt /> -->
              <ACCImageUpload
                :prop="PI_logo"
                @change="onlogoChange"
                v-model="M_Image.file_logo"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col md="1">
              <ABSButton
                :text="textButton"
                classButton="btn btn--default"
                classIcon="icon-style-1"
                @click="saveXY"
                styleButton="height: 40px;width: 100%;"
              />
            </b-col>
            <b-col md="1">
              <ABSButton
                :text="'Cancel'"
                classButton="btn btn--edit"
                classIcon="icon-style-2"
                @click="cancel"
                styleButton="height: 40px;width: 100%;"
              />
            </b-col>
            <b-col md="1">
              <ABSButton
                :text="'Clear Shape'"
                classButton="btn btn--delete"
                classIcon="icon-style-2"
                @click="clear"
                styleButton="height: 40px;width: 100%;"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col ref="container">
              <v-stage :config="stageSize" ref="stage">
                <v-layer @dblclick="onLayerClick">
                  <v-image :config="{
                    image: image
                  }"/>
                  <template v-for="data in savedShape">
                    <v-line @click="onShapeClick" :config="{
                        points: data.point_unit,
                        tension: 0,
                        fill: 'rgba(74, 147, 179, 0.5)',
                        stroke: 'red',
                        closed: true,
                      }"
                    />
                      <!-- closed: true, -->
                  </template>
                  <template v-for="data in tempCircle">
                    <v-circle :config="{
                        x: data.x,
                        y: data.y,
                        radius: 3,
                        fill: 'red'
                      }"
                    />
                  </template>
                </v-layer>
              </v-stage>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight;
// const width = 1000;
// const height = 300;

export default {
  data() {
    return {
      PI_logo: {
        cName: "Logo",
        cAccept: ".jpg, .png, .gif",
        cTitle: "Upload Image",
        cModule: "HOO"
      },
      M_Image: {
        file_show: require("@/assets/default_photo_.png"),
        file_logo: "",
        file_logo_name: "",
        file_logo_path: "",
      },
      
      stageSize: {
        width: width,
        height: height
      },
      image: null,
      textButton: 'Start',
      tempCircle: [],
      // savedShape: [],
      savedShape: [],
      displayXY: {},
    };
  },
  computed: {
    
  },
  methods: {
    onlogoChange(data) {
      this.M_Image.file_show = this.url + data.path;
      this.M_Image.file_logo_name = data.name;
      this.M_Image.file_logo_path = data.path;

      // const image = new window.Image(1000, 300);
      const image = new window.Image();
      // image.src = "http://acc.api.absoluteconnection.co.id:1006/FileUpload/HOO/637456269013692041.png";
      image.src = this.M_Image.file_show;
      image.onload = () => {
        this.image = image;

        console.log(image.width + "X" + image.height)
        this.stageSize.width = image.width;
        this.stageSize.height = image.height;
      };
    },
    getRelativePointerPosition(node) {
      var transform = node.getAbsoluteTransform().copy();
      transform.invert();
      var pos = node.getStage().getPointerPosition();
      return transform.point(pos);
    },
    onLayerClick(data) {
      if (this.textButton != 'Save') return;
      let pos = this.getRelativePointerPosition(data.currentTarget);
      this.tempCircle.push({
        x: pos.x,
        y: pos.y
      })
    },
    saveXY() {
      if (this.M_Image.file_logo_name == "") {
          this.alertError("Please upload image")
          return;
      }
      if (this.textButton == 'Start') {
        this.textButton = 'Save';
      } else {
        if (this.tempCircle.length == 1) {
          this.alertError("Must Point minimum 2 circle")
          return;
        }
        this.textButton = 'Start';
        
        let arrayShaped = [];
        for (let idx = 0; idx < this.tempCircle.length; idx++) {
          arrayShaped.push(this.tempCircle[idx].x);
          arrayShaped.push(this.tempCircle[idx].y);
        }
        this.savedShape.push({point_unit: arrayShaped});
        this.tempCircle = [];
      }
    },
    cancel() {
      this.textButton = 'Start';
      this.tempCircle = [];
    },
    clear() {
      this.cancel();
      this.savedShape = [];
    },
    onShapeClick() {
      console.log('coy');
    },
    changeRect: function() {
      const container = this.$refs.container;

      if (!container) {
        return;
      }

      const height = container.offsetHeight;
      const width = container.offsetWidth;

      // console.log(height, height);
      // this.stageSize.width = width;
      // this.stageSize.height = height;
    }
  },
  mounted() {
    // data from API
    let dt = {
      sketch_points: [
        {
          status: 1,
          point_unit: [
            {
              x: 124,
              y: 26
            },
            {
              x: 207,
              y: 25
            },
            {
              x: 210,
              y: 87
            },
            {
              x: 125,
              y: 91
            },
          ]
        },
        {
          status: 0,
          point_unit: [
            {
              x: 234,
              y: 110
            },
            {
              x: 312,
              y: 115
            },
            {
              x: 313,
              y: 184
            },
            {
              x: 231,
              y: 184
            },
          ]
        },
      ]
    };
    let arrToDisplay = [];
    for (let x = 0; x < dt.sketch_points.length; x++) {
      let arrXY = [];
      for (let idx = 0; idx < dt.sketch_points[x].point_unit.length; idx++) {
        arrXY.push(dt.sketch_points[x].point_unit[idx].x);
        arrXY.push(dt.sketch_points[x].point_unit[idx].y);
      }
      arrToDisplay.push({point_unit: arrXY});
    }
    this.savedShape = arrToDisplay;
  },
  created() {
    this.$store.commit("setParamPage", {});
    // window.addEventListener("resize", this.changeRect);
    // this.changeRect();
  }
};
</script>

<style>
</style>
