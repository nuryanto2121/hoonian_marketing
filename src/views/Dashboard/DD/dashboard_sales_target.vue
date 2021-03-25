<template>
  <div class="card" style="height: 100%">
    <div class="card__title-newdash" style="border-bottom: unset !important;">
      <b-row align-v="end">
        <b-col lg="3" xl="2">
          <span style="font-size: 20px; color: #333399;">{{title}}</span>
        </b-col>
        <b-col lg="2" xl="3" style="text-align: right; bottom: 5px; max-width: max-content;">
            <span style="font-weight: bold;">
                Show &nbsp;&nbsp;
            </span>
        </b-col>
        <b-col>
            <ACCRadioButton
                @input="Onshow_byChange"
                :prop="PI_show_by"
                v-model="Model.show_by"
                ref="ref_show_by"
            />
        </b-col>
        <b-col lg="3" xl="3" style="text-align: right; max-width: max-content;" class="col-right noPadding">
            <span>
                <ABSButton
                :text="'View All'"
                classButton="button button--back"
                classIcon="icon-style-1"
                :disabled="false"
                @click="doViewAllTarget"
                />
            </span>
        </b-col>
      </b-row>
    </div>
    <div class="card__body">
      <b-row class="target-wrapper">
        <b-col>
          <!-- <canvas id="bar-chart" width="350" height="100"></canvas> -->
          <div class="chart-target" style="position: relative; min-height: 95% !important; width:100%">
            <canvas responsive id="bar-chart" height="100%"></canvas>
          </div>
          <hr style="margin: 5px !important;" />
        </b-col>
      </b-row>

      <b-row class="legend-wrapper">
          <b-col md="" lg="3" style="padding-right: 0px !important;">
              <div style="margin-bottom: 10px;">
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
          <b-col md="3" lg="3" style="text-align: right; margin: auto;">
              <b-row style="margin-top: 30px;">
                <b-col style="margin: auto;">
                  <span style="color: #666666; font-weight: bolder; font-size: 13px;">Year To Date</span>
                </b-col>
              </b-row>
              <b-row style="margin-top: 10px;">
                <b-col style="margin: auto;">
                  <span style="color: #333399; font-size: 0.92vw; font-weight: bolder;"> {{momentDateFormatting(new Date(), 'DD MMMM YYYY')}} </span>
                </b-col>
              </b-row>
          </b-col>
          <b-col md="6">
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
                <span style="color: #666666; font-size: 11px;">Unit</span>
                </b-col>
                <b-col style="margin: auto; text-align: center;" lg="5">
                    <div style="border-radius: 5px; padding: 5px; color: #333399; background: #dcecfe; font-size: 11px; text-align: center; font-weight: bold;">
                        {{Model.total_target_unit}}
                    </div>
                </b-col>
                <b-col style="margin: auto;" lg="5">
                    <div style="border-radius: 5px; padding: 5px; color: #333399; background: #dcecfe; font-size: 11px; text-align: center; font-weight: bold;">
                        {{Model.total_achievement_unit}}
                    </div>
                </b-col>
            </b-row>
            <b-row style="margin-top: 10px;">
                <b-col style="margin: auto; text-align: center;" lg="2" class="noPadding">
                <span style="color: #666666; font-size: 12px;">Value</span>
                </b-col>
                <b-col lg="5">
                    <div style="border-radius: 5px; padding: 5px; color: #FFFFFF; background: #2a5f9e; font-size: 11px; text-align: center; font-weight: bold;">
                        {{Model.total_target_value}} {{Model.target_pref}}
                        <!-- {{checkNum(Model.total_target_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), Model.total_target_value)}} {{checkPref(Model.total_target_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}} -->
                    </div>
                </b-col>
                <b-col lg="5">
                    <div style="border-radius: 5px; padding: 5px; color: #FFFFFF; background: #2a5f9e; font-size: 11px; text-align: center; font-weight: bold;">
                        {{Model.total_achievement_value}} {{Model.achievement_pref}}
                        <!-- {{checkNum(Model.total_achievement_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), Model.total_achievement_value)}} {{checkPref(Model.total_achievement_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}} -->
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
  props: ['title'],
  computed: {
    _projectId () {
      return this.$store.getters.getProjectId;
    }
  },
  watch: {
    _projectId (newValue, oldValue) {
      this.renderChart2();
    }
  },
  data() {
    return {
      myBarChart: null,
      ChartData: [],

      Model: {
        show_by: 'unit',
        project_id: this.getDashboardProjectID(),
      },
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
  methods: {
    doViewAllTarget() {
      this.$router.push({ name: "DD_SalesTarget" });
    },
    Onshow_byChange() {
        this.renderChart2();
    },
    ChartClick(evt) {
      var x = this.myBarChart.getElementAtEvent(evt);
      if (x == null || !x || x.length < 1) return;
      let param = {
        ...x[0],
        ...this.ChartData[x[0]._index]
      };
      if (x[0]._datasetIndex <= 1 || x[0]._datasetIndex >= 0) {
        this.$store.commit("setParamPage", param);
        this.$router.push({ name: "DD_SalesTarget_ByMonth"});
      }
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
    renderChart2() {
        let param = {
            show_by: this.Model.show_by,
            project_id: this.Model.project_id
        };

        this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard/dashboard-sales-target', param).then((response) => {
            if (response == null) return;
            this.Model.total_target_unit = response.data.unit.target;
            this.Model.total_achievement_unit = response.data.unit.achievement;
            this.Model.total_target_value = this.checkNum(response.data.value.target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), response.data.value.target); //Math.round(response.data.value.target / 1000000);
            this.Model.total_achievement_value = this.checkNum(response.data.value.achievement.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), response.data.value.achievement); //Math.round(response.data.value.achievement / 1000000);
            this.Model.target_pref = this.checkPref(response.data.value.target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            this.Model.achievement_pref = this.checkPref(response.data.value.achievement.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            var data = response.data.list,
            isMonth = new Date().getMonth(),
            tg = [],
            tg2 = [],
            ac = [],
            ac2 = [], vv = this;

            this.ChartData = data;

            for (let i = 0; i < data.length; i++) {
                // if (i <= isMonth) {
                //     tg2.push(Math.round(data[i].target));
                //     ac2.push(Math.round(data[i].achievement));
                // }
                tg.push(Math.round(data[i].target));
                ac.push(Math.round(data[i].achievement));
            }

            var max = Math.max.apply(null, tg.concat(ac)),
            sumtg = tg.reduce(function (a, b) {
                return a + b;
            }, 0),
            sumac = ac.reduce(function (a, b) {
                return a + b;
            }, 0);
            
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
                },
            ];

            var valuelabel = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ];

            var ctx = document.getElementById("bar-chart").getContext("2d");

            this.myBarChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: valuelabel,
                // datasets: [
                //   {
                //     label: "Population (millions)",
                //     backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                //     data: valuedata
                //   }
                // ]
                datasets: valuedata2,
            },
            options: {
                // events: ["click", "hover"],
                // onClick: ChartClick,
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
                                // return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                if (vv.Model.show_by == 'value') {
                                  return vv.checkNum(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), value) + ' ' + vv.checkPref(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
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
                    // var chartInstance = x.chartInstance;
                    // var ctx = chartInstance.ctx;
                    // var dete = chartInstance.data;

                    // ctx.font = Chart.helpers.fontString(
                    //     Chart.defaults.global.defaultFontSize,
                    //     Chart.defaults.global.defaultFontStyle,
                    //     Chart.defaults.global.defaultFontFamily
                    // );
                    // ctx.textAlign = "center";
                    // ctx.textBaseline = "bottom";

                    // ctx.font = Chart.helpers.fontString(
                    // Chart.defaults.global.defaultFontSize,
                    // Chart.defaults.global.defaultFontStyle,
                    // Chart.defaults.global.defaultFontFamily
                    // );
                    // ctx.textAlign = "center";
                    // ctx.textBaseline = "bottom";

                    // dete.datasets.forEach(function (dataset, i) {
                    //     var meta = chartInstance.controller.getDatasetMeta(i);
                    //     meta.data.forEach(function (bar, index) {
                    //         var data = dataset.data[index];
                    //         ctx.fillText(data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), bar._model.x, bar._model.y);
                    //     });
                    // });
                },
                },
                plugins: {
                datalabels: {
                    color: "yellow",
                    // display: function(context) {
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
        });
    },
  },
  mounted() {
    this.renderChart2();
  },
};
</script>

<style scoped>
@import "./../../../assets/css/Chart.min.css";
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
