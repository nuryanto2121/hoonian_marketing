<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col lg="12" xl="12" style="background: white;">
          <b-row>
            <b-col lg="8" xl="8">
              <span style="color: black;" class="title-primary">Last 12 Months</span>
            </b-col>
            <b-col style="max-width: max-content;">
              <b-row>
                <b-col lg="3" xl="5" style="text-align: right; max-width: max-content;">
                    <span style="font-weight: bold; font-size: 13px;">
                        Show By &nbsp;&nbsp;
                    </span>
                </b-col>
                <b-col style="text-align: right; margin-right: 15px !important;">
                    <ACCRadioButton
                        @input="Onshow_byChange"
                        :prop="PI_show_by"
                        v-model="show_by"
                        :ref="'ref_show_by'"
                    />
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row style="margin-top: 10px; margin-bottom: 20px;">
            <b-col>
              <div class="chart-target" style="position: relative; min-height: 95% !important; width:100%">
                <canvas responsive :id="'line-chart'" height="100%"></canvas>
              </div>
            </b-col>
          </b-row>
          <b-row style="margin-top: 10px; margin-bottom: 20px;">
            <b-col sm="2" align-self="center">
              MARKETING
            </b-col>
            <b-col sm="3">
              <HOODropDown
                @change="OnMarketingChange"
                :prop="PI_marketing"
                v-model="marketingId"
                :label="marketingLabel"
                ref="ref_marketing"
              />
            </b-col>
          </b-row>
          <template v-for="(data, index) in Model">
            <b-row style="background: #F8F8F8; padding-top: 10px; padding-bottom: 10px;" :key="data.id">
              <b-col>
                <b-img :src="urlHoonian + data.icon_project" alt=""
                  :style="`height: 80px;`" @error="onImageLoadFailure($event)" />
              </b-col>
              <b-col sm="10">
                <b-row>
                  <b-col>
                    <span style="color: #4A93B3;">
                      {{data.project_name}}
                    </span>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <label class="lbl-poppins">{{ $t('unit_sold') }}</label>
                    <br />
                    <span style="color: #4A93B3;">
                      {{data.unit_sold}}
                      <!-- {{checkNum(data.unit_sold? data.unit_sold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','): "0", data.unit_sold)}}
                      {{checkDigit(data.unit_sold? data.unit_sold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','): "0", true)}} -->
                    </span>
                  </b-col>
                  <b-col>
                    <label class="lbl-poppins">{{ $t('total_sales') }}</label>
                    <br />
                    <span style="color: #4A93B3;">
                      {{checkNum(data.total_sales? data.total_sales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','): "0", data.total_sales)}}
                      {{checkDigit(data.total_sales? data.total_sales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','): "0", true)}}
                    </span>
                  </b-col>
                  <b-col>
                    <label class="lbl-poppins">{{ $t('total_commission') }}</label>
                    <br />
                    <span style="color: #4A93B3;">
                      {{checkNum(data.total_commission? data.total_commission.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','): "0", data.total_commission)}}
                      {{checkDigit(data.total_commission? data.total_commission.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','): "0", true)}}
                    </span>
                  </b-col>
                  <b-col>
                    <label class="lbl-poppins">{{ $t('remaining_commission') }}</label>
                    <br />
                    <span style="color: #4A93B3;">
                      {{checkNum(data.remaining_commission? data.remaining_commission.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','): "0", data.remaining_commission)}}
                      {{checkDigit(data.remaining_commission? data.remaining_commission.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','): "0", true)}}
                    </span>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <HOOList
              :key="data.id"
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
              :cHeader="salesHeader"
              :ref="`ref_sales_${index}`"
              @buttonViewClicked="doViewClick"
              ButtonBackDisabled
              SearchDisabled
              isHeaderFixed
              noCard
              removeCardTitle
              removePaddingTopBody
            >
              <template slot="TitleTable">
              </template>
              <template slot="date" slot-scope="data">
                {{momentUnix(data.item.date, "DD MMM YYYY")}}
              </template>
              <template slot="price" slot-scope="data">
                {{checkNum(data.item.price? data.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','): "0", data.item.price)}}
                {{checkDigit(data.item.price? data.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','): "0", true)}}
              </template>
              <template slot="status" slot-scope="data">
                <b-row>
                  <b-col :style="data.item.status == 'Booked'? 'color: #F2C94C;':
                        (data.item.status == 'Sold'? 'color: #F2994A;':
                        (data.item.status == 'Cancelled'? 'color: #EB5757;': 'color: #828282'))">
                    {{ data.item.status? data.item.status: "" }}
                  </b-col>
                  <b-col align-self="center" v-if="data.item.status=='Hold (Waiting for Payment)'" sm="2">
                    <b-img :src="require('@/assets/icon-svg/ic_delete.svg')" alt="" style="" @click.stop="doCancel(data.item)" />
                  </b-col>
                </b-row>
              </template>
            </HOOList>
          </template>
        </b-col>
      </b-row>
    </div>
    <MKSalesCancel
      ref="MK_SalesCancel"
      :urlAPI="'/api/marketing-website/sales/sales-cancellation'"
      :id="customer_transaction_id"
      @onCancelSuccess="onCancelSuccess"
    />
  </div>
</template>
<script>
import MKSalesCancel from './MK_SalesCancel';
export default {
  components: {
    MKSalesCancel
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
      customer_transaction_id: "",
      marketingId: "all",
      marketingLabel: "All",
      Model: [],

      myLineChart: null,
      ChartData: {},
      show_by: "unit",
      PI_show_by: {
        cValidate: "",
        cName: "show_by",
        cId: "rdshow_by",
        cRadioOptions: [
          { text: "Unit", value: 'unit' },
          { text: "Value", value: 'value' }
        ],
        cRadioDefaultOption: 'unit',
        cOrder: 1,
        cProtect: false,
        cVisible:  true,
        cParentForm: 'FormEntry',
        cInputStatus: "new",
        cGroup: false
      },

      salesHeader: [
        {
          key: "no",
          label: "NO",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
        {
          key: "buyer_name",
          label: "BUYER NAME",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
        {
          key: "marketing",
          label: "MARKETING",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
        {
          key: "tower",
          label: "TOWER",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
        {
          key: "unit_no",
          label: "UNIT NO",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
        {
          key: "date",
          label: "DATE",
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
          key: "status",
          label: "STATUS",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
      ],
      PI_marketing: {
        dataLookUp: {
          url: "/api/hoonian-website/marketing-website-sales-lookup",
          param: {
            principle_id: '',
          }
        },
        cValidate: "required",
        cName: "Marketing",
        ckey: false,
        cOrder: 1,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
        cClearable: false,
      },
    }
  },
  methods: {
    Onshow_byChange(data) {
      this.myLineChart.destroy();
      this.renderChart();
    },
    OnMarketingChange(data) {
      this.$nextTick(() => {
        this.marketingId = data.id;
        this.marketingLabel = data.label;
        this.getSales();
      })
    },
    onCancelSuccess() {
      this.getSales();
    },
    doCancel(data) {
      this.customer_transaction_id = data.id;
      this.$refs.MK_SalesCancel._show();
    },
    rowClicked(data) {
      let param = data;
      param.isEdit = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "MK_SalesDetail" });
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    getSales() {
      let param = {
        company_group_id: this.company_group_id,
        principle_id: this.getDataUser().principle_id,
        marketing_id: this.marketingId,
      };

      this.postJSON(this.urlHoonian + '/api/marketing-website/sales/sales-header', param).then((response) => {
        if (response == null) return;
        let data = response.data;

        this.Model = [];
        for (let i = 0; i < data.length; i++) {
          this.Model.push({
            ...data[i],
            propList: {
              url: "/api/marketing-website/sales/sales-grid",
              initialWhere: "",
              SortField: "",
              SortBy: "desc",
              ParamWhere: "",
              param: {
                principle_id: this.getDataUser().principle_id,
                project_id: data[i].id,
                marketing_id: this.marketingId,
              }
            }
          });
        }
        
        this.$nextTick(() => {
          this.renderList();
          this.getChart();
        })
      });
    },
    renderList() {
      for (let i = 0; i < this.Model.length; i++) {
        this.$refs['ref_sales_'+i][0].doGetList("");
      }
    },
    getChart() {
      let param = {
        company_group_id: this.company_group_id,
        principle_id: this.getDataUser().principle_id,
        marketing_id: this.marketingId
      };

      this.postJSON(this.urlHoonian + '/api/marketing-website/sales/graph', param).then((response) => {
        if (response == null) return;
        this.ChartData = response.data[0];

        this.$forceUpdate();
        this.$nextTick(() => {
          this.renderChart();
        })
      });
    },
    renderChart() {
      let datax = this.ChartData,
      ac = [];

      for (let x = 0; x < datax.graph.length; x++) {
          let xx = datax.graph[x];
          // valuelabel.push(xx.project_name);
          if (this.show_by == 'unit') {
            ac.push(Math.round(xx.unit_achievement));
          }
          else {
            ac.push(xx.value_achievement);
          }

      }

      let max = Math.max.apply(null, ac);

      var valuedata2 = [
        {
          label: "Target",
          // backgroundColor: "rgba(14, 156, 255, 0.3)",
          data: ac,
        },
        // {
        //   label: "Achievement",
        //   backgroundColor: "#00cc33",
        //   data: ac,
        // }
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

      var ctx = document.getElementById("line-chart").getContext("2d"), vm = this;

      Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
        color: "black",
      });

      this.myLineChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: valuelabel,
          datasets: valuedata2,
        },
        options: {
          elements: {
            line: {
              backgroundColor: function() {
                if (vm.show_by == 'unit') {
                  return "rgba(14, 156, 255, 0.3)";
                }
                else {
                  return "rgba(246, 186, 133, 0.3)";
                }
              },
              fill: true,
            },
            point: {
              backgroundColor: function() {
                if (vm.show_by == 'unit') {
                  return "#0e9cff";
                }
                else {
                  return "#f6ba85";
                }
              }
            }
          },
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
                  fontSize: 15,
                  fontStyle: 'bold',
                  fontColor: "black"
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
                  fontColor: "black",
                  min: 0,
                  stepSize: Math.round(max / 4),
                  // max: max + (max/4),
                  callback: function (value, index, values) {
                    // console.log('value', value)
                    // console.log('index', index)
                    // console.log('values', values)
                    if (vm.show_by == 'value') {
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
              var chartInstance = x.chartInstance;
              var ctx = chartInstance.ctx;
              var dete = chartInstance.data;
              var height = chartInstance.controller.boxes[0].bottom;

              ctx.font = Chart.helpers.fontString(
                Chart.defaults.global.defaultFontSize,
                Chart.defaults.global.defaultFontStyle,
                Chart.defaults.global.defaultFontFamily
              );
              ctx.textAlign = "center";
              ctx.textBaseline = "bottom";

              if (vm.show_by == 'unit') {
                ctx.fillStyle = "#0e9cff";
              }
              else {
                ctx.fillStyle = "#f6ba85";
              }

              dete.datasets.forEach(function (dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function (bar, index) {
                  var data = dataset.data[index];
                  // console.log(bar)
                  ctx.fillText(data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), bar._model.x, (bar._model.y - 5));
                });
              });
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

      this.myLineChart.update();
      this.$forceUpdate();
      // }
    },
  },
  mounted() {
    this.getSales();
    this.PI_marketing.dataLookUp.param.principle_id = this.getDataUser().principle_id;
    this.$store.commit("setTitleMenu", "Sales");
    this.$store.commit("setBackButton", false);
  },
};
</script>

<style scoped>
</style>
