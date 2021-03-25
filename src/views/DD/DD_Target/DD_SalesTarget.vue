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
          <template v-for="(data,index) in ModelProject">
              <b-row v-bind:key="index">
                  <b-col lg="12" xl="12">
                      <div class="card">
                        <div class="card__title" style="padding-bottom: 5px !important; border-bottom: unset !important;">
                          <b-row align-v="end">
                            <b-col>
                              <span style="font-size: 20px; color: #333399;">{{data.project}}</span>
                            </b-col>
                            <b-col lg="2" xl="5" style="text-align: right; bottom: 5px; max-width: max-content;">
                                <span style="font-weight: bold;">
                                    Show &nbsp;&nbsp;
                                </span>
                            </b-col>
                            <b-col xl="2" lg="3" style="text-align: right; margin-right: 15px !important;">
                                <ACCRadioButton
                                    @input="Onshow_byChange($event, index)"
                                    :prop="data.PI_show_by"
                                    v-model="data.M_show_by"
                                    :ref="'ref_show_by_' + index"
                                />
                            </b-col>
                          </b-row>
                        <!-- <b-row>
                            <b-col style="max-width: max-content !important;">
                                <span>{{data.project}}</span>
                            </b-col>
                                <b-col lg="2" xl="3" style="text-align: right; bottom: 5px; max-width: max-content;">
                                    <span style="font-weight: bold;">
                                        Show &nbsp;&nbsp;
                                    </span>
                                </b-col>
                                <b-col lg="5" xl="4">
                                    <ACCRadioButton
                                        @input="Onshow_byChange($event, index)"
                                        :prop="data.PI_show_by"
                                        v-model="data.M_show_by"
                                        :ref="'ref_show_by_' + index"
                                    />
                                </b-col>
                        </b-row> -->
                        </div>
                        <div class="card__body">
                            <b-row>
                                <b-col>
                                <!-- <canvas id="bar-chart" width="350" height="100"></canvas> -->
                                <div class="chart-target" style="position: relative; min-height: 95% !important; width:100%">
                                    <canvas responsive :id="'bar-chart_'+index" height="100%"></canvas>
                                </div>
                                <hr style="margin: 5px !important;" />
                                </b-col>
                            </b-row>

                            <b-row>
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
                                        <span style="color: #333399; font-size: 18px; font-weight: bolder;"> {{momentDateFormatting(new Date(), 'DD MMMM YYYY')}} </span>
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
                                        <span style="color: #666666; font-size: 13px;">Unit</span>
                                        </b-col>
                                        <b-col style="margin: auto; text-align: center;" lg="5">
                                            <div style="border-radius: 5px; padding: 5px; color: #333399; background: #dcecfe; font-size: 13px; text-align: center; font-weight: bold;">
                                                {{data.unit.target}}
                                            </div>
                                        </b-col>
                                        <b-col style="margin: auto;" lg="5">
                                            <div style="border-radius: 5px; padding: 5px; color: #333399; background: #dcecfe; font-size: 13px; text-align: center; font-weight: bold;">
                                                {{data.unit.achievement}}
                                            </div>
                                        </b-col>
                                    </b-row>
                                    <b-row style="margin-top: 10px;">
                                        <b-col style="margin: auto; text-align: center;" lg="2" class="noPadding">
                                        <span style="color: #666666; font-size: 12px;">Value</span>
                                        </b-col>
                                        <b-col lg="5">
                                            <div style="border-radius: 5px; padding: 5px; color: #FFFFFF; background: #2a5f9e; font-size: 13px; text-align: center; font-weight: bold;">
                                                {{checkNum(data.value.target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), data.value.target)}} {{checkPref(data.value.target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}}
                                            </div>
                                        </b-col>
                                        <b-col lg="5">
                                            <div style="border-radius: 5px; padding: 5px; color: #FFFFFF; background: #2a5f9e; font-size: 13px; text-align: center; font-weight: bold;">
                                                {{checkNum(data.value.achievement.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), data.value.achievement)}} {{checkPref(data.value.achievement.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}}
                                            </div>
                                        </b-col>
                                    </b-row>
                                </b-col>
                            </b-row>
                        </div>
                      </div>
                  </b-col>
              </b-row>
          </template>
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
      this.getProject();
    }
  },
  data() {
    return {
      myBarChart: [],

      Model: {
        project_id: this.getDashboardProjectID(),
      },
      ModelChart: [],
      ModelProject: [],
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
    doBack() {
      this.$router.go(-1);
    },
    Onshow_byChange(data, index) {
        console.log(data, index)
        this.renderChart2(data, index);
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
    getProject() {
      let param = {
        project_id: this.Model.project_id
      };

      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard/management-detail/sales-target', param).then((response) => {
        if (response == null) return;
        let data = response.data;
        for (let i = 0; i < data.length; i++) {
          this.ModelProject.push({
            ...data[i],
            PI_show_by: {
                ...this.PI_show_by,
                cName: "show_by_" + i,
                cId: "rdshow_by_" + i,
                cOrder: (i+1)
            },
            M_show_by: "unit"
          });

          this.$forceUpdate();
          
          this.$nextTick(() => {
            this.renderChart();
          })
        }
      });
    },
    renderChart: async function() {
      let data = this.ModelProject ;
      for (let i = 0; i < data.length; i++) {
        let datax = data[i],
        tg = [], ac = [];

        for (let x = 0; x < datax.graph.length; x++) {
            let xx = datax.graph[x];

            tg.push(Math.round(xx.unit_target));
            ac.push(Math.round(xx.unit_achievement));
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

        console.log(valuedata2)

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

        var ctx = document.getElementById("bar-chart_" + i).getContext("2d"), vm = this;

        Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
          color: "black",
        });

        var myBarChart_ = new Chart(ctx, {
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
                      // return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                      if (data[0].M_show_by == 'value') {
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

        myBarChart_.update();
        this.myBarChart.push(myBarChart_);
        this.$forceUpdate();
        }
    },
    renderChart2: async function(show_by, index) {
      let data = this.ModelProject, i = index ;
      console.log(data[i])
      // for (let i = 0; i < data.length; i++) {
        let datax = data[i],
        tg = [], ac = [];

        for (let x = 0; x < datax.graph.length; x++) {
            let xx = datax.graph[x];
            if (show_by == 'unit') {
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

        console.log(valuedata2)

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

        var ctx = document.getElementById("bar-chart_" + i).getContext("2d"), vm = this;

        Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
          color: "black",
        });

        this.myBarChart[index].destroy();

        this.myBarChart[index] = new Chart(ctx, {
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
                      // console.log('value', value)
                      // console.log('index', index)
                      // console.log('values', values)
                      // console.log('data', data)
                      if (data[0].M_show_by == 'value') {
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

        this.myBarChart[index].update();
        this.$forceUpdate();
        // }
    },
  },
  mounted() {
    this.getProject();
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
