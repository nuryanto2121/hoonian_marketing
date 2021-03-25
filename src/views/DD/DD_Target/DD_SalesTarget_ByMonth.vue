<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col lg="12" xl="12">
          <b-row>
              <b-col lg="12" xl="12">
                  <div class="card">
                    <div class="card__title" style="padding-bottom: 5px !important;">
                    <b-row>
                        <b-col style="max-width: max-content !important;">
                        <span>Target By Project</span>
                        </b-col>
                        <b-col class="col-right">
                        <span>
                            <ABSButton
                            :text="'Back'"
                            classButton="button button--back"
                            classIcon="icon-style-1"
                            @click="doBack"
                            />
                        </span>
                        </b-col>
                    </b-row>
                    </div>
                </div>
              </b-col>
          </b-row>
          <!-- <template v-for="(data,index) in ModelProject"> -->
              <b-row>
                  <b-col lg="12" xl="12">
                      <div class="card">
                        <div class="card__title" style="padding-bottom: 5px !important; border-bottom: unset !important;">
                          <b-row align-v="end">
                            <b-col>
                              <span style="font-size: 20px; color: #333399;">{{ChartData.month}}</span>
                            </b-col>
                            <b-col lg="2" xl="5" style="text-align: right; bottom: 5px; max-width: max-content;">
                                <span style="font-weight: bold;">
                                    Show &nbsp;&nbsp;
                                </span>
                            </b-col>
                            <b-col xl="2" lg="3" style="text-align: right; margin-right: 15px !important;">
                                <ACCRadioButton
                                    @input="Onshow_byChange"
                                    :prop="PI_show_by"
                                    v-model="Model.show_by"
                                    :ref="'ref_show_by'"
                                />
                            </b-col>
                          </b-row>
                        </div>
                        <div class="card__body">
                            <b-row>
                                <b-col>
                                <!-- <canvas id="bar-chart" width="350" height="100"></canvas> -->
                                <div class="chart-target" style="position: relative; min-height: 95% !important; width:100%">
                                    <canvas responsive :id="'bar-chart'" height="100%"></canvas>
                                </div>
                                <hr style="margin: 5px !important;" />
                                </b-col>
                            </b-row>

                            <b-row>
                                <b-col md="" lg="3" style="padding-right: 0px !important;">
                                    <div style="margin-bottom: 23px;">
                                        <span style="font-size: 20px; color: #333399; font-weight: bolder;">Legend</span>
                                    </div>
                                    <b-row>
                                        <b-col style="max-width:max-content !important;">
                                            <div
                                            class="ChartLegend-Content"
                                            style="background-color: #333399; width: 10px; height: 10px; padding: 10px;"
                                            ></div>
                                        </b-col>
                                        <b-col
                                            class="ChartLegend-Content noPadding"
                                            style="max-width:max-content !important;"
                                        >
                                            <span>Target</span>
                                        </b-col>
                                        </b-row>
                                        <b-row>
                                        <b-col style="max-width:max-content !important;">
                                            <div
                                            class="ChartLegend-Content"
                                            style="background-color: #00cc33; width: 10px; height: 10px; padding: 10px;"
                                            ></div>
                                        </b-col>
                                        <b-col
                                            class="ChartLegend-Content noPadding"
                                            style="max-width:max-content !important; "
                                        >
                                            <span>Achievement</span>
                                        </b-col>
                                        </b-row>
                                </b-col>
                                <!-- <b-col md="3" lg="3" style="text-align: right; margin: auto;">
                                    <b-row style="margin-top: 30px;">
                                        <b-col style="margin: auto;">
                                        <span style="color: #666666; font-weight: bolder; font-size: 13px;">Year To Date</span>
                                        </b-col>
                                    </b-row>
                                    <b-row style="margin-top: 10px;">
                                        <b-col style="margin: auto;">
                                        <span style="color: #333399; font-size: 18px; font-weight: bolder;"> {{momentDateFormatting(new Date(), 'DD MMMM YYYY')}} </span>
                                        </b-col>
                                    </b-row>
                                </b-col> -->
                                <b-col lg="6" xl="6" offset-lg="3" offset-xl="3">
                                    <b-row style="margin-top: 10px;">
                                        <b-col style="text-align: center;" class="noPadding" offset="4" lg="5" offset-lg="2">
                                        <span style="color: #666666; font-weight: bolder; font-size: 13px;">Target</span>
                                        </b-col>
                                        <b-col style="text-align: center;" class="noPadding" lg="5">
                                        <span style="color: #666666; font-weight: bolder; font-size: 13px;">Achievement</span>
                                        </b-col>
                                    </b-row>
                                    <b-row style="margin-top: 5px;">
                                        <b-col style="margin: auto; text-align: center;" lg="2">
                                        <span style="color: #666666; font-size: 13px;">Unit</span>
                                        </b-col>
                                        <b-col style="margin: auto; text-align: center;" lg="5">
                                            <div style="border-radius: 5px; padding: 5px; color: #333399; background: #dcecfe; font-size: 13px; text-align: center; font-weight: bold;">
                                                {{ChartData.unit.target}}
                                            </div>
                                        </b-col>
                                        <b-col style="margin: auto;" lg="5">
                                            <div style="border-radius: 5px; padding: 5px; color: #333399; background: #dcecfe; font-size: 13px; text-align: center; font-weight: bold;">
                                                {{ChartData.unit.achievement}}
                                            </div>
                                        </b-col>
                                    </b-row>
                                    <b-row style="margin-top: 10px;">
                                        <b-col style="margin: auto; text-align: center;" lg="2" class="noPadding">
                                        <span style="color: #666666; font-size: 12px;">Value</span>
                                        </b-col>
                                        <b-col lg="5">
                                            <div style="border-radius: 5px; padding: 5px; color: #FFFFFF; background: #2a5f9e; font-size: 13px; text-align: center; font-weight: bold;">
                                                {{checkNum(ChartData.value.target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), ChartData.value.target)}} {{checkPref(ChartData.value.target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}}
                                            </div>
                                        </b-col>
                                        <b-col lg="5">
                                            <div style="border-radius: 5px; padding: 5px; color: #FFFFFF; background: #2a5f9e; font-size: 13px; text-align: center; font-weight: bold;">
                                                {{checkNum(ChartData.value.achievement.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), ChartData.value.achievement)}} {{checkPref(ChartData.value.achievement.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}}
                                            </div>
                                        </b-col>
                                    </b-row>
                                </b-col>
                            </b-row>
                        </div>
                      </div>
                  </b-col>
              </b-row>
          <!-- </template> -->
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
export default {
  props: ['title'],
  computed: {
    _projectId () {
      return this.$store.getters.getProjectId;
    }
  },
  watch: {
    _projectId (newValue, oldValue) {
      this.getDataChart();
    }
  },
  data() {
    return {
      myBarChart: null,

      Model: {
        project_id: this.getDashboardProjectID(),
        show_by: 'unit'
      },
      ChartData: {},
      PI_show_by: {
        cValidate: "",
        cName: "show_by",
        cId: "rdshow_by",
        cRadioOptions: [
          { text: "By Unit", value: 'unit' },
          { text: "By Value", value: 'value' }
        ],
        cRadioDefaultOption: 'unit',
        cOrder: 1,
        cProtect: false,
        cVisible:  true,
        cParentForm: 'FormEntry',
        cInputStatus: this.inputStatus,
        cGroup: false
      },
    };
  },
  computed: {
    paramFromList() {
      var param = this.$store.getters.getParamPage;
      return param;
    },
  },
  methods: {
    doBack() {
      this.$router.go(-1);
    },
    Onshow_byChange(data) {
      this.myBarChart.destroy();
      this.renderChart();
    },
    ChartClick(evt) {
      // console.log(evt)
      // var x = this.myBarChart.getElementAtEvent(evt);
      // if (x == null || !x || x.length < 1) return;
      // // console.log(x)
      // if (x[0]._datasetIndex == 0) {
      //   this.$router.push({ name: "MK_DashboardTarget_Detail", params: x[0] });
      // }
    },
    onHover(evt) {
      // this.myBarChart.canvas.style.cursor = "default";
      // var x = this.myBarChart.getElementAtEvent(evt);
      // if (x == null || !x || x.length < 1) return;
      // if (x[0]._datasetIndex == 0) {
      //   this.myBarChart.canvas.style.cursor = "pointer";
      // }
      // else {
      //   this.myBarChart.canvas.style.cursor = "default";
      // }
    },
    getDataChart() {
      let param = {
        project_id: this.Model.project_id,
        month: this.paramFromList.month
      };

      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard/management-detail/sales-chart', param).then((response) => {
        if (response == null) return;
        let data = response.data;
        this.ChartData = data;
        
        this.$forceUpdate();
        this.$nextTick(() => {
          this.renderChart();
        })
      });
    },
    renderChart() {
      let datax = this.ChartData,
      tg = [], ac = [], valuelabel = [];

      for (let x = 0; x < datax.graph.length; x++) {
          let xx = datax.graph[x];
          valuelabel.push(xx.project_name);
          if (this.Model.show_by == 'unit') {
            tg.push(Math.round(xx.unit_target));
            ac.push(Math.round(xx.unit_achievement));
          }
          else {
            tg.push(xx.value_target);
            ac.push(xx.value_achievement);
          }

      }

      let max = Math.max.apply(null, tg.concat(ac));

      var valuedata2 = [
        {
          label: "Target",
          backgroundColor: "#333399",
          data: tg,
        },
        {
          label: "Achievement",
          backgroundColor: "#00cc33",
          data: ac,
        }
      ];

      var ctx = document.getElementById("bar-chart").getContext("2d"), vm = this;

      Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
        color: "black",
      });

      this.myBarChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: valuelabel,
          datasets: valuedata2,
        },
        options: {
          // events: ["click", "hover"],
          onClick: this.ChartClick,
          hover: {
            onHover: this.onHover
          },
          tooltips: { enabled: false },
          maintainAspectRatio: false,
          legend: { display: false },
          title: {
            display: false,
            text: "",
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  // display:false
                  // offsetGridLines : true
                },
                ticks: {
                  display: true,
                  fontStyle: 'bold'
                }
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  // display: true,
                  // labelString: 'cek'
                },
                gridLines: {
                  // display:false,
                  // drawBorder: false
                },
                ticks: {
                  display: true,
                  min: 0,
                  stepSize: Math.round(max / 4),
                  max: max + (max/4),
                  callback: function (value, index, values) {
                    console.log('value', value)
                    // console.log('index', index)
                    // console.log('values', values)
                    if (vm.Model.show_by == 'value') {
                      return vm.checkNum(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), value) + ' ' + vm.checkPref(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                    }
                    else {
                      return value;
                    }
                  },
                },
              },
            ],
          },
          animation: {
            duration: 1,
            onProgress: function (x) {
              // console.log(x)
            //   var chartInstance = x.chartInstance;
            //   var ctx = chartInstance.ctx;
            //   var dete = chartInstance.data;
            //   var height = chartInstance.controller.boxes[0].bottom;

            //   ctx.font = Chart.helpers.fontString(
            //     Chart.defaults.global.defaultFontSize,
            //     Chart.defaults.global.defaultFontStyle,
            //     Chart.defaults.global.defaultFontFamily
            //   );
            //   ctx.textAlign = "center";
            //   ctx.textBaseline = "bottom";
            //   // ctx.marg

            //   dete.datasets.forEach(function (dataset, i) {
            //     var meta = chartInstance.controller.getDatasetMeta(i);
            //     meta.data.forEach(function (bar, index) {
            //       var data = dataset.data[index];
            //       // console.log(bar)
            //       ctx.fillText(data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), bar._model.x, bar._model.y);
            //     });
            //   });
            },
          },
          plugins: {
            datalabels: {
              color: "black",
              // display: function(context) {
              //   console.log("Algo: "+context);
              //   return context.dataset.data[context.dataIndex] > 15;
              // },
              // font: {
              //   weight: 'bold'
              // },
              // formatter: function(value, context) {
              //   return context.dataIndex + ': ' + Math.round(value*100) + '%';
              // }
            },
          },
        },
      });

      this.myBarChart.update();
      this.$forceUpdate();
      // }
    },
  },
  mounted() {
    this.getDataChart();
    // console.log(this.paramFromList)
  },
};
</script>

<style scoped>
/* @import "./../../../assets/css/Chart.min.css"; */
.target-wrapper {
  position: absolute;
  height: 60%;
  width: 100%;
  padding-right: 15px;
  /* height: 70%; */
}
.legend-wrapper {
  position: absolute;
  width: 100%;
  bottom: 18px;
  padding-right: 15px;
}
</style>
