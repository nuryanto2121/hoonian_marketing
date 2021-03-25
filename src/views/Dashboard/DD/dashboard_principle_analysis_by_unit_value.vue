<template>
  <div class="card" style="height: 100%">
    <div class="card__title-newdash" style="border-bottom: unset !important;">
      <b-row>
        <b-col lg="4" xl="5">
          <span style="font-size: 15px; color: #333399; letter-spacing: -0.8px;">{{title}}</span>
        </b-col>
        <!-- <b-col style="text-align: right;">
            <span>
                <label>Show</label>
            </span>
        </b-col> -->
        <b-col>
            <ACCRadioButton
                @input="Onshow_byChange"
                :prop="PI_show_by"
                v-model="Model.show_by"
                ref="ref_show_by"
            />
        </b-col>
        <b-col lg="3" xl="2" style="text-align: right; max-width: max-content;">
            <span>
                <ABSButton
                :text="'View All'"
                classButton="button button--back"
                classIcon="icon-style-1"
                :disabled="false"
                @click="doViewAllPrinciple"
                />
            </span>
        </b-col>
      </b-row>
    </div>
    <div class="card__body">
      <b-row>
        <!-- <b-col lg="12" xl="6"> -->
          <b-col lg="12" xl="12">
            <div id="pie-unit" style="min-height: 300px;">
                <fusioncharts
                    :dataSource="unitConfigs"
                >
                </fusioncharts>
            </div>
            <!-- <v-chart :options="chart_unit_option"></v-chart> -->
        </b-col>
        <!-- <b-col lg="12" xl="6"> -->
          <!-- <b-col md="6">
            <div id="pie-value">
                <fusioncharts
                    :dataSource="valueConfigs"
                >
                </fusioncharts>
            </div>
        </b-col> -->
      </b-row>
      <!-- <b-row>
          <b-col>
            
          </b-col>
      </b-row> -->
    </div>
  </div>
</template>

<script>

const width = window.innerWidth;
const height = window.innerHeight;
// console.log(width, height);
// import * as echarts from 'echarts';
export default {
  props: ['title'],
  computed: {
    _projectId () {
      return this.$store.getters.getProjectId;
    }
  },
  watch: {
    _projectId (newValue, oldValue) {
      this.renderChart();
    }
  },
  data() {
    return {

      PI_show_by: {
        cValidate: "",
        cName: "pie_show_by",
        cId: "rdpie_show_by",
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

      unit_chart: null,
      value_chart: null,

      unitConfigs: {
        renderAt: "pie-unit",
        chart: {
          // bgColor: "transparent",
          // bgAlpha: "0",
            // caption: "By Unit",   //Set the chart caption
            subCaption: "",
            showPercentValues: true,
            showPercentInTooltip: false,
            showlabels: true, // can in data source too
            numberPrefix: "",
            showTooltip: false,
            defaultCenterLabel: "",
            centerLabel: "",            //"Revenue from $label: $value",
            centerLabelBold: false,
            showValues: true,
            valuePosition: "inside",
            baseFontSize: width > 1024 ? "" : "12",
            bgalpha: "0,0",
            canvasBgAlpha: "0",
            legendBgAlpha:"0",
            // labelFontSize: "1vw",
            // subCaption: "In MMbbl = One Million barrels",            //Set the chart subcaption
            // xAxisName: "Country",             //Set the x-axis name
            // yAxisName: "Reserves (MMbbl)",    //Set the y-axis name
            // numberSuffix: "K",
            showLegend: false,
            interactiveLegend: false,
            // plotHighlightEffect: "fadeout", // "fadeout|color=#7f7f7f, alpha=60"
            
            theme: "fusion",                   //Set the theme for your chart

            // "labelFont": "Arial",
            // "labelFontColor": "0075c2",
            // "labelFontSize": "15",
            // "labelFontBold": "1",
            // "lableFontItalic": "1",
            // "labelAlpha": "70",
            // "canvasPadding": "30",
            // "labelBorderPadding": "5",
            // "labelBorderRadius": "2",
            // "labelBorderDashed": "1",
            // "labelBorderDashGap": "2",
            // "labelBorderDashLen": "3",
            // "labelBorderThickness": "2",
            // "labelBorderColor": "#00ffaa",
            // "labelBorderAlpha": "60",

        },
        data: []
      },
      valueConfigs: {
        renderAt: "pie-value",
        chart: {
            // caption: "By Value",   //Set the chart caption
            subCaption: "",
            showPercentValues: true,
            showPercentInTooltip: false,
            showlabels: true, // can in data source too
            numberPrefix: "",
            showTooltip: false,
            defaultCenterLabel: "",
            centerLabel: "",            //"Revenue from $label: $value",
            centerLabelBold: false,
            showValues: true,
            valuePosition: "inside",
            baseFontSize: "11",
            labelFontSize: "1vw",
            // subCaption: "In MMbbl = One Million barrels",            //Set the chart subcaption
            // xAxisName: "Country",             //Set the x-axis name
            // yAxisName: "Reserves (MMbbl)",    //Set the y-axis name
            // numberSuffix: "K",
            showLegend: false,
            interactiveLegend: false,
            // plotHighlightEffect: "fadeout", // "fadeout|color=#7f7f7f, alpha=60"
            
            theme: "fusion",                   //Set the theme for your chart

            // "labelFont": "Arial",
            // "labelFontColor": "0075c2",
            // "labelFontSize": "15",
            // "labelFontBold": "1",
            // "lableFontItalic": "1",
            // "labelAlpha": "70",
            // "canvasPadding": "30",
            // "labelBorderPadding": "5",
            // "labelBorderRadius": "2",
            // "labelBorderDashed": "1",
            // "labelBorderDashGap": "2",
            // "labelBorderDashLen": "3",
            // "labelBorderThickness": "2",
            // "labelBorderColor": "#00ffaa",
            // "labelBorderAlpha": "60",

        },
        data: []
      },

      Model: {
        show_by: 'unit',
        project_id: this.getDashboardProjectID(),
        prefix: ''
      },
    }
  },
  methods: {
    doViewAllPrinciple() {
      this.$router.push({ name: "DD_SalesPrinciple"});
    },
    Onshow_byChange() {
      this.renderChart();
    },
    renderChart() {
        let param = {
          project_id: this.Model.project_id
        };

        this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard/dashboard-principle-by-unit-value', param).then((response) => {
          let dataUnit = this.Model.show_by == 'unit' ? response.data.by_unit : response.data.by_value;

            let unit_data = [], value_data = [], colors = ['#FFE6DA','#D6EBE8', 'D4DFEC', '#A8D0FD', '#FEBACC'];
            for (let i = 0; i < dataUnit.length; i++) {
                // let lbl = "<div style='background-color: " + colors[i] + "; width: 10px; height: 10px; padding: 10px; margin-bottom: 5px;' ></div>  <span>" + dataUnit[i].name + " <br> " + dataUnit[i].value + " U</span>";
                let v = '', p = '';
                if (this.Model.show_by == 'unit') {
                  v = dataUnit[i].value;
                  p = 'U';
                }
                else {
                  v = this.checkNum(dataUnit[i].value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), dataUnit[i].value);
                  p = this.checkPref(dataUnit[i].value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                }
                unit_data.push({
                    label: dataUnit[i].name + ' <br> ' + v + ' ' + p,
                    value: dataUnit[i].value,
                    color: colors[i],
                    // showlabels: true,
                })
            }

            // for (let i = 0; i < dataValue.length; i++) {
            //     value_data.push({
            //         label: dataUnit[i].name + ' <br> ' + dataUnit[i].value + ' B',
            //         value: dataValue[i].value,
            //         color: colors[i],
            //         // showlabels: true,
            //     })
            // }

            // if (this.Model.show_by == 'unit') {
            //   this.unitConfigs.chart.caption = 'By Unit';
            // }
            // else {
            //   this.unitConfigs.chart.caption = 'By Value';
            // }

            this.unitConfigs.data = unit_data;
            // this.valueConfigs.data = value_data;

            let vm = this;

            this.unit_chart = new FusionCharts({
                type: "pie2d",
                id: 'pie-unit-chart',
                renderAt: "pie-unit",
                containerBackgroundOpacity : '0',
                width: "110%",
                height: "110%",
                dataFormat: "json",
                dataSource: this.unitConfigs,
                events:{
                    'renderComplete': function(eventObj, args) {
                        // console.log(eventObj, args)
                        // console.log(eventObj.eventType + " was raised by the chart whose ID is " + eventObj.sender.id);
                        // console.log(FusionCharts.getObjectReference(eventObj.sender.id))
                    },
                    "rendered": function(evt, arg) {
                        // var sum = 0;
                        // console.log(vm.unitConfigs)
                        // //Calculate the total values
                        // for (let i = 0; i < vm.unitConfigs.data.length; i++) {
                        // //console.log(vm.unitConfigs.data[i].value);
                        // sum += parseInt(vm.unitConfigs.data[i].value);
                        // }
                        
                        // //Find the percentage of each data object and assign to "displayValue" attribute
                        // for (let i = 0; i < vm.unitConfigs.data.length; i++) {
                        
                        // // percent = (Math.round((vm.unitConfigs.data[i].value / sum * 125) * 10) / 10);

                        // vm.unitConfigs.data[i].displayvalue = vm.unitConfigs.data[i].label + " KONTOL";
                        // }

                        // console.log(vm.unitConfigs);

                        // evt.sender.setJSONData(vm.unitConfigs);
                    }
                },
            }).render();

            // this.value_chart = new FusionCharts({
            //     type: "pie2d",
            //     id: 'pie-value-chart',
            //     renderAt: "pie-value",
            //     width: "120%",
            //     dataFormat: "json",
            //     dataSource: this.valueConfigs
            // }).render();
            this.changeFontSize();
            this.$forceUpdate();
        });
    },
    changeFontSize() {
      setTimeout(() => {
        let tspan = document.getElementsByTagName('tspan');
        for (let i = 0; i < tspan.length; i++) {
          tspan[i].style.fontSize = 14;
        }
      }, 2 * 1000)

    },
    // resize() {}
  },
  mounted() {
    this.renderChart();
    // window.addEventListener("resize", this.resize());
  },
};
</script>

<style scoped>
@import "./../../../assets/css/Chart.min.css";
</style>
