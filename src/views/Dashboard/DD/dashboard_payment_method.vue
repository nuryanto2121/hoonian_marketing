<template>
  <div class="card" style="height: 100%">
    <div class="card__title-newdash" style="border-bottom: unset !important;">
      <b-row>
        <b-col style="max-width:max-content !important;">
          <span style="font-size: 16px; color: #333399;">{{title}}</span>
        </b-col>
        <b-col style="text-align: right;">
            <span>
                <ABSButton
                :text="'View All'"
                classButton="button button--back"
                classIcon="icon-style-1"
                :disabled="false"
                @click="doViewPaymentMethod"
                />
            </span>
        </b-col>
      </b-row>
    </div>
    <div class="card__body">
      <b-row>
        <template v-for="(data, index) in Model">
            <b-col
                v-bind:key="index"
                lg="3"
                xl="2"
                :style="`
                  -webkit-box-flex: 0;
                  flex: 0 0 18%;
                  max-width: 18%;` + (index < Model.length-1 ? 'margin-right: 2.5%;' : '')
                "
              @click="doClickDetail(data)"
            >
                <div>
                    <div class="CardTag-Title" style="border-color: #333399; background: #333399; min-height: 62px;">
                      <div style="font-size: 15px !important;">
                        <span style="font-weight: bold;">
                          {{data.payment_method_name}}
                        </span>
                        <hr style="border-color: white; margin-top: 0px !important; margin-bottom: 0px !important;">
                        <span>
                          {{data.percentage}}%
                        </span>
                      </div>
                    </div>
                    <div class="CardTag-Descs">
                        <b-row style="margin-top: 10px;">
                            <b-col lg="5" xl="5">
                                <div style="
                                    background: #333399;
                                    border-radius: 6px;
                                    font-size: 18px;
                                    height: 30px;
                                    color: #FFFFFF;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    font-weight: bold;
                                ">
                                    {{data.count}}
                                </div>
                                <span style="margin-top: 2px; font-size: 10px; color: #333399; font-weight: bold;">Buyer</span>
                            </b-col>
                            <b-col lg="7" xl="7">
                                <div style="
                                    background: #6FCF97;
                                    border-radius: 6px;
                                    font-size: 18px;
                                    height: 30px;
                                    color: #FFFFFF;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    font-weight: bold;
                                ">
                                    <!-- {{data.sum}} -->
                                    {{checkNum(data.sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), data.sum)}} {{checkPref(data.sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}}
                                </div>
                                <span style="margin-top: 2px; font-size: 10px; color: #333399; font-weight: bold;">Value</span>
                            </b-col>
                        </b-row>
                    </div>
                </div>
            </b-col>
        </template>
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
      this.renderData();
    }
  },
  data() {
    return {
      Model: [],
      prefix: '',
    }
  },
  methods: {
    doViewPaymentMethod() {
      this.$router.push({ name: "DD_PaymentMethod"});
    },
    doClickDetail(data) {
      let param = data;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "DD_PaymentMethodDetail"});
    },
    renderData() {
      let param = {
        project_id: this.getDashboardProjectID(),
      };
      this.postJSON( this.urlHoonian + "/api/hoonian-website/dashboard/dashboard-payment-method", param ).then((response) => {
        if (response == null) return;
        this.Model = response.data.list;
      });
    },
  },
  mounted() {
    this.renderData();
  },
};
</script>