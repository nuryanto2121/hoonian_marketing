<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col lg="12" xl="12">
          <b-row>
              <b-col lg="12" xl="12">
                <div class="card">
                    <div class="card__body poppins">
                        <b-row>
                            <b-col lg="6" xl="6">
                                <template v-if="paramFromList.status == 'w'">
                                    <template v-if="!paramFromList.inDays">
                                        <!-- kurang sehari -->
                                        <!-- <b-row style="height: 30px;">
                                            <b-col style="font-size: 15px; text-align: center; font-weight: bold;">
                                                {{ $t('time_to_launching') }}
                                            </b-col>
                                        </b-row> -->
                                        <b-row>
                                            <b-col style="font-size: 15px; text-align: center; font-weight: bold;">
                                                {{ $t('time_to_launching') }}
                                            </b-col>
                                            <b-col style="padding-right: 10px !important; text-align: center; color: rgb(155 81 224); font-weight: bold;">
                                                <span style="font-size: 20px;"> {{paramFromList.h_left}} </span>
                                                <span style="font-size: 15px;">{{ $t('hours') }}</span>
                                            </b-col>
                                            <b-col style="text-align: center; color: rgb(155 81 224); font-weight: bold;">
                                                <span style="font-size: 20px;"> {{paramFromList.m_left}} </span>
                                                <span style="font-size: 15px;">{{ $t('minutes') }}</span>
                                            </b-col>
                                        </b-row>
                                    </template>
                                    <template v-else>
                                        <!-- <b-row style="height: 30px;">
                                            <b-col style="font-size: 15px; text-align: center; font-weight: bold;">
                                                {{ $t('day_to_launching') }}
                                            </b-col>
                                        </b-row> -->
                                        <b-row>
                                            <b-col style="font-size: 15px; text-align: center; font-weight: bold;">
                                                {{ $t('day_to_launching') }}
                                            </b-col>
                                            <b-col style="text-align: center; color: rgb(155 81 224); font-weight: bold;">
                                                <span style="font-size: 20px;"> {{paramFromList.d_left}} </span>
                                                <span style="font-size: 15px;">{{ $t('days') }}</span>
                                            </b-col>
                                        </b-row>
                                    </template>
                                </template>
                                <template v-else>
                                    <b-row>
                                        <b-col style="height: 50px; background-color: red; color: white; font-size: 18px; text-align: center; line-height: 50px;">
                                            {{ $t('v_launching') }} {{ $t('in_progress') }}
                                        </b-col>
                                    </b-row>
                                </template>
                            </b-col>
                            <b-col>
                                <span style="font-size: 20px; font-weight: bold;">
                                    {{Model.project_name}}
                                </span> <br>
                                <span style="color: #828282; font-size: 15px;">
                                    {{Model.address}}
                                </span>
                            </b-col>
                        </b-row>
                        <b-row style="margin-top: 20px;">
                            <b-col>
                                <span class="title-primary" style="font-size: 20px;"> {{$t('units')}} {{$t('selection')}} {{$t('in_progress')}} </span>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col style="border: solid 1px black;">
                                <b-row style="padding: 10px 5px 10px 5px;">
                                    <b-col style="text-align: center; margin-right: 25px;">
                                        <span style="font-size: 20px; font-weight: bold;">{{$t('current_nup_no')}}</span> <br>
                                        <div style="height: 80px; background-color: rgb(248 248 248); color: rgb(242 153 74); font-size: 35px; font-weight: bold; line-height: 100px;">
                                            <span v-if="paramFromList.status == 'i'">
                                                {{Model.current_nup_no}}
                                            </span>
                                            <span v-else> - </span>
                                        </div>
                                    </b-col>
                                    <b-col style="text-align: center">
                                        <span style="font-size: 20px; font-weight: bold;">{{$t('time')}} {{$t('remain')}}</span> <br>
                                        <div style="height: 80px; background-color: rgb(248 248 248); color: rgb(235 87 87); line-height: 100px;">
                                            <template v-if="paramFromList.status == 'i'">
                                                <template v-if="!Model.inDays">
                                                    <span style="font-weight: bold; font-size: 35px;"> {{Model.h_left}} </span>
                                                    <span style="font-weight: bold; font-size: 20px;">{{ $t('hours') }}</span> &nbsp;
                                                    <span style="font-weight: bold; font-size: 35px;"> {{Model.m_left}} </span>
                                                    <span style="font-weight: bold; font-size: 20px;">{{ $t('minutes') }}</span>
                                                </template>
                                                <template v-else>
                                                    <span style="font-weight: bold; font-size: 35px;"> {{Model.d_left}} </span>
                                                    <span style="font-weight: bold; font-size: 20px;">{{ $t('days') }}</span>
                                                </template>
                                            </template>
                                            <template v-else> - </template>
                                        </div>
                                    </b-col>
                                    <b-col style="text-align: center; margin-left: 25px;">
                                        <span style="font-size: 20px; font-weight: bold;">{{$t('next_nup_no')}}</span> <br>
                                        <div style="height: 80px; background-color: rgb(248 248 248); color: rgb(47 128 237); font-size: 35px; font-weight: bold; line-height: 100px;">
                                            <span v-if="paramFromList.status == 'i'">
                                                {{Model.next_nup_no}}
                                            </span>
                                            <span v-else> - </span>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col lg="6" xl="6" class="noPadding">
                                <HOOList
                                    :prop="propList_buyer"
                                    :title="''"
                                    :ref="'ref_buyer'"
                                    ButtonBackDisabled
                                    SearchDisabled
                                    isPoppins
                                    isHeaderFixed
                                    noCard
                                    removePaddingTopBody
                                >
                                    <template slot="TitleTable">
                                        <b-col lg="6" xl="6">
                                            <span class="title-primary" style="font-size: 18px;"> {{ $t('nup_buyer_list') }} </span>
                                        </b-col>
                                    </template>
                                </HOOList>
                            </b-col>
                            <b-col lg="6" xl="6" class="noPadding">
                                <HOOList
                                    :prop="propList_unit"
                                    :title="''"
                                    :ref="'ref_unit'"
                                    ButtonBackDisabled
                                    SearchDisabled
                                    isPoppins
                                    isHeaderFixed
                                    noCard
                                    removePaddingTopBody
                                    @onRenderData="UnitDataRender"
                                >
                                    <template slot="TitleTable">
                                        <b-col lg="6" xl="6">
                                            <span class="title-primary" style="font-size: 18px;"> {{ $t('available_units') }} </span>
                                        </b-col>
                                    </template>
                                    <template slot="ToolbarTable">
                                        <b-col align-self="center" class="col-right">
                                            <ABSButton
                                                text="Confirmation"
                                                classButton="button button--hoonian"
                                                @click="doSave"
                                                :disabled="paramFromList.status !== 'i'"
                                            />
                                        </b-col>
                                    </template>
                                    <template slot="price" slot-scope="data">
                                        {{isCurrency(data.item.price, decimal)}}
                                    </template>
                                    <template slot="status" slot-scope="data">
                                        <div style="margin-left: 20px">
                                            <b-form-checkbox
                                                v-model="data.item.status"
                                                :name="'status_' + data.index"
                                                size="md"
                                                :disabled="paramFromList.status !== 'i'"
                                                @input="OnStatusClick(data.item)"
                                            />
                                        </div>
                                    </template>
                                    <template slot="head_status" slot-scope="data">
                                        Select
                                    </template>
                                </HOOList>
                            </b-col>
                        </b-row>
                    </div>
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
    paramFromList() {
      var param = this.$store.getters.getParamPage;
      return param;
    },
  },
  watch: {
  },
  data() {
    return {
      propList_buyer: {
        url: "/api/marketing-website/v-launching/buyer",
        initialWhere: "",
        SortField: "",
        SortBy: "desc",
        ParamWhere: "",
        param: {
          release_period_id: "",
          marketing_agent_id: ""
        }
      },
      propList_unit: {
        url: "/api/marketing-website/v-launching/unit",
        initialWhere: "",
        SortField: "",
        SortBy: "desc",
        ParamWhere: "",
        param: {
          release_period_id: "",
          marketing_agent_id: ""
        }
      },
      Model: {
        id: "",
        project_id: "",
        start_datetime: "",
        end_datetime: "",
        project_name: "",
        address: "",
        event_name: "",
        description: "",
        current_nup_no: "",
        time_remain: "",
        next_nup_no: "",
        unit_id: "",
        unit_no: "",
        price: 0,
      },
      AvailableUnits: []
    };
  },
  methods: {
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    doBack() {
      this.$router.go(-1);
    },
    M_ClearForm() {
      this.Model = {
        id: "",
        project_id: "",
        start_datetime: "",
        end_datetime: "",
        project_name: "",
        address: "",
        event_name: "",
        description: "",
        current_nup_no: "",
        time_remain: "",
        next_nup_no: "",
        unit_id: "",
        unit_no: "",
        price: 0,
      };
    },
    UnitDataRender(data) {
        this.AvailableUnits = data;
    },
    OnStatusClick(data) {
      if (data.status) {
        this.Model.unit_id = data.unit_id;
        this.Model.unit_no = data.unit_no;
        this.Model.price = parseFloat(data.price);
      }
    },
    doSave() {
      this.$validator._base.validateAll("FormEntry").then((result) => {
        if (!result) return;
        this.alertConfirmation("Are You Sure Want To Save This Data ?").then(
          (ress) => {
            if (ress.value) {
              this.$validator.errors.clear("FormEntry");
              this.M_Save();
            }
          }
        );
      });
    },
    M_Save() {
    //   let paramD = [], price = 0;
    //   this.AvailableUnits.forEach((data, index) => {
    //     if (data.status) {
    //         price += parseFloat(data.price);
    //         paramD.push({
    //           unit_id: data.unit_id,
    //           unit_no: data.unit_no,
    //         });
    //     }
    //   });

      let param = {
        marketing_agent_id: this.getDataUser().marketing_id,
        nup_no: this.Model.next_nup_no,
        price: this.Model.price,
        unit_id: this.Model.unit_id,
        unit_no: this.Model.unit_no,
      };

      this.postJSON(
        this.urlHoonian + "/api/marketing-website/v-launching/confirmation",
        param
      ).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
    getDataBy() {
        this.postJSON(
            this.urlHoonian + "/api/marketing-website/v-launching/detail",
            {release_period_id: this.paramFromList.id}
        ).then((response) => {
            if (response == null) return;
            this.Model = response.data;
            let h_left = 0, m_left = 0, d_left = 0, inDays = false;
            // console.log(this.momentUnix(this.Model.end_datetime), new Date())
            // console.log(this.momentDiff(this.momentUnix(this.Model.end_datetime), new Date(), 'days'))
            if (this.paramFromList.status == 'i') {
                if (this.momentDiff(new Date(), this.momentUnix(this.Model.end_datetime, "DD/MM/YYYY HH:mm:ss"), 'days') > 0 && this.momentDiff(new Date(), this.momentUnix(this.Model.end_datetime, "DD/MM/YYYY HH:mm:ss"), 'days') <= 1) {
                    // h_left = parseInt(this.momentDiffFormat(this.Model.end_datetime, new Date()).hour);
                    // m_left = parseInt(this.momentDiffFormat(this.Model.end_datetime, new Date()).minute);
                    h_left = this.momentDiff(new Date(), this.momentUnix(this.Model.end_datetime, "DD/MM/YYYY HH:mm:ss"), 'hours');
                    m_left = this.momentDiff(new Date(), this.momentUnix(this.Model.end_datetime, "DD/MM/YYYY HH:mm:ss"), 'minutes');
                }
                else if (this.momentDiff(new Date(), this.momentUnix(this.Model.end_datetime, "DD/MM/YYYY HH:mm:ss"), 'days') < 0) {
                    //
                }
                else {
                    inDays = true;
                    // d_left = parseInt(this.momentDiffFormat(this.Model.end_datetime, new Date()).day);
                    d_left = this.momentDiff(new Date(), this.momentUnix(this.Model.end_datetime, "DD/MM/YYYY HH:mm:ss"), 'days');
                }
            }

            this.Model.inDays = inDays;
            this.Model.h_left = h_left;
            this.Model.m_left = m_left;
            this.Model.d_left = d_left;

            this.$refs.ref_buyer.doGetList("");
            this.$refs.ref_unit.perPage = 20;
            this.$refs.ref_unit.doGetList("");
        });
    }
  },
  mounted() {
    this.getDataBy();
    this.propList_buyer.param.release_period_id = this.paramFromList.id;
    this.propList_buyer.param.marketing_agent_id = this.getDataUser().marketing_id;
    this.propList_unit.param.release_period_id = this.paramFromList.id;
    this.propList_unit.param.marketing_agent_id = this.getDataUser().marketing_id;
  },
};
</script>

<style scoped>
@media (min-width: 992px) {
  .offset-header {
    margin-left: 4%;
  }
}
@media (min-width: 1200px) {
  .offset-header {
    margin-left: 20%;
  }
}
.activate {
  box-shadow: 0px 5px 5px 2px #ccc;
}
</style>
