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
                                            <b-col style="font-size: 20px; text-align: center; font-weight: bold;">
                                                {{ $t('time_to_launching') }}
                                            </b-col>
                                            <b-col style="padding-right: 10px !important; text-align: center; color: rgb(155 81 224); font-weight: bold; margin: 10px; background-color: #f2f2f2;">
                                                <span style="font-size: 40px;"> {{Model.up_h_left}} </span>
                                                <span style="font-size: 20px;">{{ $t('hours') }}</span>
                                            </b-col>
                                            <b-col style="text-align: center; color: rgb(155 81 224); font-weight: bold; margin: 10px; background-color: #f2f2f2;">
                                                <span style="font-size: 40px;"> {{Model.up_m_left}} </span>
                                                <span style="font-size: 20px;">{{ $t('minutes') }}</span>
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
                                            <b-col style="font-size: 20px; text-align: center; font-weight: bold;">
                                                <span class="center">
                                                  {{ $t('day_to_launching') }}
                                                </span>
                                            </b-col>
                                            <b-col style="text-align: center; color: rgb(155 81 224); font-weight: bold; margin: 10px; background-color: #f2f2f2;">
                                                <span style="font-size: 40px;"> {{Model.up_d_left}} </span>
                                                <span style="font-size: 20px;">{{ $t('days') }}</span>
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
                                <span class="title-primary" style="font-size: 20px;"> {{$t('units_selection_in_progress')}} </span>
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
                                        <span style="font-size: 20px; font-weight: bold;">{{$t('time_remain')}}</span> <br>
                                        <div style="height: 80px; background-color: rgb(248 248 248); color: rgb(235 87 87); font-size: 35px; font-weight: bold; line-height: 100px;">
                                          <template v-if="Model.reserve_status">
                                            <template v-if="paramFromList.status == 'i'">
                                                <template v-if="!Model.inDays">
                                                    <span style="font-weight: bold; font-size: 35px;"> {{Model.h_left}} </span>
                                                    <span style="font-weight: bold; font-size: 20px;">{{ Model.h_left > 1 ? $t('hours') : $t('hour') }}</span> &nbsp;
                                                    <span style="font-weight: bold; font-size: 35px;"> {{Model.m_left}} </span>
                                                    <span style="font-weight: bold; font-size: 20px;">{{ Model.m_left > 1 ? $t('minutes') : $t('minute') }}</span>
                                                </template>
                                                <template v-else>
                                                    <span style="font-weight: bold; font-size: 35px;"> {{Model.d_left}} </span>
                                                    <span style="font-weight: bold; font-size: 20px;">{{ Model.d_left > 1 ? $t('days') : $t('day') }}</span>
                                                </template>
                                            </template>
                                            <template v-else> - </template>
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
                                    :cHeader="BuyerHeader"
                                    @onRenderData="BuyerDataRender"
                                >
                                    <template slot="TitleTable">
                                      <b-col lg="6" xl="6" style="height: 35px;">
                                        <span class="title-primary" style="font-size: 18px;"> {{ $t('nup_buyer_list') }} </span>
                                      </b-col>
                                    </template>
                                    <!-- <template slot="no" slot-scope="data">
                                      <div :style="data.item.status == 'On Progress' ? 'background-color: #f2994a;' : (data.item.status == 'Next No' ? 'background-color: #2d9cdb;' : 'background-color: #2d9cdb;')">
                                        {{data.item.no}}
                                      </div>
                                    </template>
                                    <template slot="nup_no" slot-scope="data">
                                      <div :style="data.item.status == 'On Progress' ? 'background-color: #f2994a;' : (data.item.status == 'Next No' ? 'background-color: #2d9cdb;' : 'background-color: #2d9cdb;')">
                                        {{data.item.nup_no}}
                                      </div>
                                    </template>
                                    <template slot="buyer_name" slot-scope="data">
                                      <div :style="data.item.status == 'On Progress' ? 'background-color: #f2994a;' : (data.item.status == 'Next No' ? 'background-color: #2d9cdb;' : 'background-color: #2d9cdb;')">
                                        {{data.item.buyer_name}}
                                      </div>
                                    </template> -->
                                    <template slot="status" slot-scope="data">
                                      <!-- <div :style="data.item.status == 'On Progress' ? 'background-color: #f2994a;' : (data.item.status == 'Next No' ? 'background-color: #2d9cdb;' : 'background-color: #2d9cdb;')"> -->
                                        <template v-if="data.item.status == 'Unit Selected'">
                                          <span style="color: #219653;">
                                            {{data.item.status}}
                                          </span>
                                        </template>
                                        <template v-else-if="data.item.status == 'Missed'">
                                          <span style="color: #eb5757;">
                                            {{data.item.status}}
                                          </span>
                                        </template>
                                        <template v-else-if="data.item.status == 'On Progress' || data.item.status == 'Next No'">
                                          <span style="color: #FFFFFF;">
                                            {{data.item.status}}
                                          </span>
                                        </template>
                                        <template v-else>
                                          <span style="color: #f2c94c;">
                                            {{checkHM(data.item.status)}}
                                          </span>
                                        </template>
                                      <!-- </div> -->
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
                                    :cHeader="UnitHeader"
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
                                                :text="$t('confirmation_s')"
                                                classButton="button button--hoonian"
                                                @click="doSave"
                                                :disabled="paramFromList.status !== 'i' || !(Model.active_nup && Model.active_nup !== '')"
                                                styleButton="background-color: #414040 !important; color: #FFF !important; width: 150px; height: 35px; font-size: 15px !important;"
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
        SortBy: "",
        ParamWhere: "",
        param: {
          project_id: "",
          release_period_id: "",
          marketing_agent_id: ""
        }
      },
      BuyerHeader: [
        {
          key: "no",
          label: "NO",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "nup_no",
          label: this.$t('nup_no').toUpperCase(),
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "buyer_name",
          label: this.$t('buyer_name').toUpperCase(),
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "status",
          label: this.$t('status').toUpperCase(),
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
      ],
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
      UnitHeader: [
        {
          key: "no",
          label: "NO",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "tower",
          label: this.$t('tower').toUpperCase(),
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "floor",
          label: this.$t('floor').toUpperCase(),
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "unit_no",
          label: this.$t('unit_no').toUpperCase(),
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "price",
          label: this.$t('price').toUpperCase(),
          tdClass: "ContentACCList2 notranslate th-cus-right poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "status",
          label: this.$t('select').toUpperCase(),
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
      ],
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
        reserve_status: true,
        active_nup: ""
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
    renderTdClass(value, key, item) {
      console.log(item)
      let cls = "ContentACCList2 notranslate th-cus-center poppins";
      return cls
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
        reserve_status: true,
        active_nup: "",
      };
    },
    checkHM(num) {
      let ret = "";
      if (Number.isNaN(parseInt(num))) {
        return num;
      }
      else {
        let number = parseInt(num);
        let hr = number / 60;
        var rhr = Math.floor(hr);
        var mn = (hr - rhr) * 60;
        var rmn = Math.round(mn);

        ret = (rhr > 0 ? (rhr + " Hours ") : "") + (rmn + " Minutes") ;
        return ret;
      }
    },
    UnitDataRender(data) {
      this.AvailableUnits = data;
    },
    BuyerDataRender(data) {
      for (let x = 0; x < this.$refs.ref_buyer.items.length; x++ ) {
        if (this.$refs.ref_buyer.items[x].status == 'On Progress') {
          this.$refs.ref_buyer.items[x]._rowVariant = 'belang1';
        }
        else if (this.$refs.ref_buyer.items[x].status == 'Next No') {
          this.$refs.ref_buyer.items[x]._rowVariant = 'belang2';
        }
        // data.item.status == 'On Progress' ? 'background-color: #f2994a;' : (data.item.status == 'Next No' ? 'background-color: #2d9cdb;'
        // this.$refs.ref_buyer.items[x]._rowVariant = checked;
      }
    },
    OnStatusClick(data) {
      this.Model.unit_id = data.unit_id;
      this.Model.unit_no = data.unit_no;
      this.Model.price = parseFloat(data.price);
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
        nup_no: this.Model.current_nup_no,
        price: this.Model.price,
        unit_id: this.Model.unit_id,
        unit_no: this.Model.unit_no,
        release_period_id: this.paramFromList.id,
        principle_id: this.getDataUser().principle_id,
        project_id: this.Model.project_id
      };

      this.postJSON(
        this.urlHoonian + "/api/marketing-website/v-launching/confirmation",
        param
      ).then((response) => {
        if (response == null) {
          this.getDataBy();
          return;
        }
        window.open(response.data.payment.redirect_url);
        this.doBack();
      });
    },
    getDataBy() {
      // console.log(this.paramFromList)
      this.postJSON(
        this.urlHoonian + "/api/marketing-website/v-launching/detail",
        { release_period_id: this.paramFromList.id, marketing_id: this.getDataUser().marketing_id }
      ).then((response) => {
        if (response == null) return;
        this.Model = response.data;
        this.propList_buyer.param.project_id = this.Model.project_id;
        let h_left = 0, m_left = 0, d_left = 0, inDays = false, reserve_status = true;
          // console.log(new Date(this.momentUnix(this.Model.start_datetime, "YYYY-MM-DD HH:mm")))
          let today = new Date();
          // console.log(this.momentUnix(this.Model.time_remain, "YYYY-MM-DD HH:mm"))
          // console.log(new Date(this.momentUnix(this.Model.time_remain, "YYYY-MM-DD HH:mm")))
          // console.log(new Date(today.setDate(today.getDate() + 1)))
          // console.log(this.momentDiff(new Date(this.momentUnix(this.Model.time_remain, "YYYY-MM-DD HH:mm")), new Date(today.setDate(today.getDate() + 1)), 'days'))
          // console.log(this.momentDiffFormat(new Date(this.momentUnix(this.Model.time_remain, "YYYY-MM-DD HH:mm")), new Date(), 'DD'))
          // console.log(this.momentDiffFormat(new Date(this.momentUnix(this.Model.time_remain, "YYYY-MM-DD HH:mm")), new Date(), 'HH:mm'))
          // console.log(new Date(this.momentUnix(this.Model.end_datetime, "YYYY-MM-DD HH:mm")))
          // console.log(new Date(this.momentUnix(this.paramFromList.start_datetime, "YYYY-MM-DD HH:mm")))
          // console.log(new Date(this.momentUnix(this.paramFromList.end_datetime, "YYYY-MM-DD HH:mm")))
          // console.log(new Date(this.momentUnix(this.Model.end_datetime, "YYYY-MM-DD HH:mm")))
          // console.log(this.momentDiff(new Date(), new Date(this.momentUnix(this.Model.start_datetime, "YYYY-MM-DD HH:mm")), 'days'))
          // console.log(this.momentDiff(new Date(this.momentUnix(this.Model.end_datetime, "YYYY-MM-DD HH:mm")), new Date(), 'days'))
          // console.log(this.momentDiffFormat(new Date(), new Date(this.momentUnix(this.Model.start_datetime, "YYYY-MM-DD HH:mm")), 'YYYY-MM-DD HH:mm'))

        if (this.paramFromList.status == 'i') {
          if (this.momentDiff(new Date(), new Date(this.momentUnix(this.Model.time_remain, "YYYY-MM-DD HH:mm")), 'days') == 0) {
            let st_dt = new Date(this.momentUnix(this.Model.time_remain, "YYYY-MM-DD HH:mm"));
            let today = new Date();
            let st_dt_sec = (st_dt.getHours()*60) + st_dt.getMinutes();
            let today_sec = (today.getHours()*60) + today.getMinutes();
            let diff = st_dt - today;
            // console.log(diff)
            // console.log('sec', diff/1000)
            // console.log('min', (diff/1000)/60)
            // console.log('hour', ((diff/1000)/60)/60)
            // console.log('sec', diff)
            // console.log(st_dt.getHours(), st_dt.getMinutes())
            // console.log(today.getHours(), today.getMinutes())
            // console.log((st_dt.getHours()*60) + st_dt.getMinutes(), (today.getHours()*60) + today.getMinutes())
            // console.log(today_sec, st_dt_sec)
            if (today > st_dt) {
              reserve_status = false;
            }
            else if (today == st_dt) {
              console.log('=', this.momentDiffFormat(new Date(), new Date(this.momentUnix(this.Model.time_remain, "YYYY-MM-DD HH:mm")), 'HH:mm'))
              h_left = parseInt(this.momentDiffFormat(new Date(), new Date(this.momentUnix(this.Model.time_remain, "YYYY-MM-DD HH:mm")), 'HH:mm').split(':')[0]);
              m_left = parseInt(this.momentDiffFormat(new Date(), new Date(this.momentUnix(this.Model.time_remain, "YYYY-MM-DD HH:mm")), 'HH:mm').split(':')[1]);
            }
            else {
              console.log('<', this.momentDiffFormat(new Date(this.momentUnix(this.Model.time_remain, "YYYY-MM-DD HH:mm")), new Date(), 'HH:mm'))
              h_left = parseInt(this.momentDiffFormat(new Date(this.momentUnix(this.Model.time_remain, "YYYY-MM-DD HH:mm")), new Date(), 'HH:mm').split(':')[0]);
              m_left = parseInt(this.momentDiffFormat(new Date(this.momentUnix(this.Model.time_remain, "YYYY-MM-DD HH:mm")), new Date(), 'HH:mm').split(':')[1]);
            }
          }
          else if (this.momentDiff(new Date(), new Date(this.momentUnix(this.Model.time_remain, "YYYY-MM-DD HH:mm")), 'days') < 0) {
            reserve_status = false;
          }
          else {
            inDays = true;
            // reserve_status = false;
            d_left = parseInt(this.momentDiff(new Date(), new Date(this.momentUnix(this.Model.time_remain, "YYYY-MM-DD HH:mm")), 'days'));
            console.log(d_left)
          }

          // if (this.momentDiff(new Date(this.momentUnix(this.Model.end_datetime, "YYYY-MM-DD HH:mm")), new Date(), 'days') == 0) {
          //   let hhh = parseInt(this.momentDiffFormat(new Date(this.momentUnix(this.Model.end_datetime, "YYYY-MM-DD HH:mm")), new Date(), 'HH:mm').split(':')[0]);
          //   let mmm = parseInt(this.momentDiffFormat(new Date(this.momentUnix(this.Model.end_datetime, "YYYY-MM-DD HH:mm")), new Date(), 'HH:mm').split(':')[1]);

          //   if (hhh < 1 && mmm < 1) {
          //     reserve_status = false;
          //   }
          // }
          // else if (this.momentDiff(new Date(this.momentUnix(this.Model.end_datetime, "YYYY-MM-DD HH:mm")), new Date(), 'days') > 0) {
          //   reserve_status = false;
          // }
        }
        else {
          if (this.momentDateToUnix(new Date()) < this.Model.start_datetime) {
            status = 'w';
            if (this.momentDiff(new Date(), new Date(this.momentUnix(this.Model.start_datetime, "YYYY-MM-DD HH:mm")), 'days') < 1) {
                // console.log(new Date(), new Date(this.momentUnix(this.Model.start_datetime, "YYYY-MM-DD HH:mm")))
                // console.log(this.momentDiffFormat(new Date(), new Date(this.momentUnix(this.Model.start_datetime, "YYYY-MM-DD HH:mm")), 'HH:mm'))
              this.Model.up_h_left = parseInt(this.momentDiffFormat(new Date(this.momentUnix(this.Model.start_datetime, "YYYY-MM-DD HH:mm")), new Date(), 'HH:mm').split(':')[0]);
              this.Model.up_m_left = parseInt(this.momentDiffFormat(new Date(this.momentUnix(this.Model.start_datetime, "YYYY-MM-DD HH:mm")), new Date(), 'HH:mm').split(':')[1]);
            }
            else {
              inDays = true;
            //   console.log(this.momentDiffFormat(new Date(), new Date(this.momentUnix(this.Model.start_datetime, "YYYY-MM-DD HH:mm")), 'HH:mm'))
              this.Model.up_d_left = parseInt(this.momentDiff(new Date(), new Date(this.momentUnix(this.Model.start_datetime, "YYYY-MM-DD HH:mm")), 'days'));
            }
          }
        }

        this.Model.inDays = inDays;
        this.Model.reserve_status = reserve_status;
        this.Model.h_left = h_left;
        this.Model.m_left = m_left;
        this.Model.d_left = d_left;

        this.$refs.ref_buyer.doGetList("");
        this.$refs.ref_unit.perPage = 20;
        this.$refs.ref_unit.doGetList("");

        setTimeout(() => {
          this.getDataBy();
        }, 30000)
      });
    }
  },
  mounted() {
    this.$store.commit("setTitleMenu", "Virtual Launching");
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
