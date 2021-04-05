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
                                    <b-col style="text-align: center">
                                        <span style="font-size: 20px; font-weight: bold;">{{$t('current_nup_no')}}</span> <br>
                                        <div style="height: 80px; background-color: rgb(248 248 248); color: rgb(242 153 74); font-size: 35px; font-weight: bold; line-height: 100px;">
                                            <span v-if="paramFromList.status == 'w'">
                                                {{Model.current_nup_no}}
                                            </span>
                                            <span v-else> - </span>
                                        </div>
                                    </b-col>
                                    <b-col style="text-align: center">
                                        <span style="font-size: 20px; font-weight: bold;">{{$t('time')}} {{$t('remain')}}</span> <br>
                                        <div style="height: 80px; background-color: rgb(248 248 248); color: rgb(235 87 87); font-size: 35px; font-weight: bold; line-height: 100px;">
                                            <template v-if="paramFromList.status == 'w'">
                                                <div v-if="!Model.inDays">
                                                    <span style="font-size: 20px;"> {{Model.h_left}} </span>
                                                    <span style="font-size: 15px;">{{ $t('hours') }}</span> &nbsp;
                                                    <span style="font-size: 20px;"> {{Model.m_left}} </span>
                                                    <span style="font-size: 15px;">{{ $t('minutes') }}</span>
                                                </div>
                                                <div v-else>
                                                    <span style="font-size: 20px;"> {{Model.d_left}} </span>
                                                    <span style="font-size: 15px;">{{ $t('days') }}</span>
                                                </div>
                                            </template>
                                            <template v-else> - </template>
                                        </div>
                                    </b-col>
                                    <b-col style="text-align: center">
                                        <span style="font-size: 20px; font-weight: bold;">{{$t('next_nup_no')}}</span> <br>
                                        <div style="height: 80px; background-color: rgb(248 248 248); color: rgb(47 128 237); font-size: 35px; font-weight: bold; line-height: 100px;">
                                            <span v-if="paramFromList.status == 'w'">
                                                {{Model.next_nup_no}}
                                            </span>
                                            <span v-else> - </span>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                        <!-- <b-row>
                            <b-col lg="12" xl="12" class="noPadding">
                                <HOOList
                                    :prop="propList"
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
                                    :ref="'ref_logbook'"
                                    @buttonViewClicked="doViewClick"
                                    ButtonBackDisabled
                                    SearchDisabled
                                    isPoppins
                                    isHeaderFixed
                                    noCard
                                    removeCardTitle
                                    removePaddingTopBody
                                    noPaging
                                    >
                                    <template slot="date" slot-scope="data">
                                        {{momentUnix(data.item.date, "DD MMM YYYY")}}
                                    </template>
                                </HOOList>
                            </b-col>
                        </b-row> -->
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
      propList: {
        url: "/api/marketing-website/lead/logbook/list",
        initialWhere: "",
        SortField: "",
        SortBy: "desc",
        ParamWhere: "",
        param: {
          sales_lead_id: ""
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
      }
    };
  },
  methods: {
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    rowClicked(ev, id) {
      console.log(ev, id)
    },
    doDeleteClick(ev, id) {
      console.log(ev, id)
    },
    doDoubleClick(ev, id) {
      console.log(ev, id)
    },
    rowLink(ev, id) {
      console.log(ev, id)
    },
    M_PageSize(ev, id) {
      console.log(ev, id)
    },
    M_Pagination(ev, id) {
      console.log(ev, id)
    },
    M_Advance_Filter(ev, id) {
      console.log(ev, id)
    },
    M_Head_Table(ev, id) {
      console.log(ev, id)
    },
    refreshColumn(ev, id) {
      console.log(ev, id)
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
      };
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
      let param = {
        project_id: this.paramFromList.project_id,
        sales_lead_id: this.paramFromList.sales_lead_id,
        marketing_agent_id: this.getDataUser().marketing_id,
        marketing_agent_name: this.getDataUser().user_name,
        description: this.Model.description,
        refer_to: this.Model.refer_to,
        stop_followup: this.Model.stop_followup == "Y"
      }
      this.postJSON(this.urlHoonian + '/api/marketing-website/lead/logbook/add', param).then((response) => {
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
            if (this.paramFromList.status == 'w') {
                if (this.momentDiff(new Date(), this.momentUnix(this.Model.end_datetime), 'days') <= 1) {
                    h_left = parseInt(this.momentDiffFormat(new Date(), data.end_datetime, 'hh:mm').split(':')[0]);
                    m_left = parseInt(this.momentDiffFormat(new Date(), data.end_datetime, 'hh:mm').split(':')[1]);
                }
                else {
                    inDays = true;
                    d_left = parseInt(this.momentDiffFormat(new Date(), data.end_datetime, 'DD'));
                }
            }

            this.Model.inDays = inDays;
            this.Model.h_left = h_left;
            this.Model.m_left = m_left;
            this.Model.d_left = d_left;
        });
    }
  },
  mounted() {
      this.getDataBy();
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
