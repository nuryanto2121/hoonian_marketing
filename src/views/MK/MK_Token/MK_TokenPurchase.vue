<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col lg="12" xl="12">
          <b-row>
              <b-col lg="12" xl="12">
                <b-row>
                  <b-col lg="2" xl="2" style="margin-right: 20px;">
                    <b-img :src="urlHoonian + ModelDetail.icon_project" alt="" style="height: 100%;" fluid-grow rounded @error="onImageLoadFailure($event)" />
                  </b-col>
                  <b-col>
                    <b-row>
                      <b-col>
                        <label style="font-weight: bold; font-size: 20px; height: 110px;" class="title-primary">
                          {{ModelDetail.project_name}}
                        </label>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col lg="4" xl="4" style="margin-right: 20px;">
                        <div style="position: absolute; bottom: 0;">
                          
                          <label style="font-weight: bold; font-size: 20px; margin-bottom: 10px;" class="lbl-poppins">{{$t('total_owned_token')}}</label> <br>
                          <label style="font-weight: bolder; font-size: 20px;" class="title-primary">
                            {{ModelDetail.total_owned_token}}
                          </label>
                        </div>
                      </b-col>
                      <b-col lg="4" xl="4" style="margin-right: 20px;">
                        <!-- <span style="font-weight: bolder; font-size: 20px; margin-bottom: 10px;" class="title-primary">
                          {{ModelDetail.project_name}}
                        </span> <br> -->
                        <div style="position: absolute; bottom: 0;">
                          <label style="font-weight: bold; font-size: 20px; margin-bottom: 10px;" class="lbl-poppins">{{$t('token_value')}}</label> <br>
                          <span style="font-weight: bolder; font-size: 20px;" class="title-primary">
                            {{ModelDetail.token_value_project}}
                          </span>
                        </div>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <div class="card">
                    <div class="card__body">
                        <!-- <b-row class="title-primary">
                            <b-col>
                                <span style="font-weight: bold; font-size: 18px;">Log Book</span>
                            </b-col>
                        </b-row> -->
                        <b-form :data-vv-scope="'FormEntry'" :data-vv-value-path="'FormEntry'">
                          <b-row>
                              <b-col md="3">
                                  <span>
                                    <label style="font-weight: bold; font-size: 20px;" class="lbl-poppins">{{$t('token_value')}}@</label>
                                  </span> <br>
                                  <span>
                                    <label style="font-weight: bold; font-size: 20px;" class="title-primary">{{ModelDetail.token_value_s}}</label>
                                  </span>
                              </b-col>
                              <b-col md="3">
                                  <span>
                                      <label style="font-weight: bold; font-size: 20px;" class="lbl-poppins">Total {{$t('purchase')}}</label>
                                  </span>
                                  <ACCTextBox
                                    :prop="PI_total_purchase"
                                    @input="OnPurchaseChange"
                                    v-model="Model.total_purchase"
                                    ref="ref_total_purchase"
                                  />
                              </b-col>
                          </b-row>
                          <b-row>
                              <b-col md="3">
                                  <span>
                                      <label style="font-weight: bold; font-size: 20px;" class="lbl-poppins">{{$t('purchase_value')}}</label>
                                  </span> <br>
                                  <span>
                                    <label style="font-weight: bold; font-size: 20px;" class="title-primary">{{ModelDetail.purchase_value}}</label>
                                  </span>
                              </b-col>
                              <b-col md="3">
                                  <ABSButton
                                    :text="'Purchase'"
                                    classButton="button button--hoonian"
                                    classIcon="icon-style-1"
                                    @click="doSave"
                                    styleButton="height: 40px;width: 80%; position: absolute; bottom: 0;"
                                  />
                              </b-col>
                          </b-row>
                        </b-form>
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
      ModelDetail: {
        icon_project: "",
        project_name: "Adhi City",
        total_owned_token: 12,
        token_value_project: "75,000,000",
        token_value: "20,000,000",
        purchase_value: "10,000,000",
      },
      Model: {
        total_purchase: "",
      },
      PI_total_purchase: {
        cValidate: "",
        cName: "Total Purchase",
        cOrder: 1,
        cKey: false,
        cType: "tel",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: "new"
      },
    };
  },
  methods: {
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    OnPurchaseChange(data) {
      let i = data && data !== '' ? parseInt(data) : 0;
      let x = i * this.ModelDetail.token_value;
      this.ModelDetail.purchase_value = this.isCurrency(x, 0);
    },
    doBack() {
      this.$router.go(-1);
    },
    M_ClearForm() {
      this.Model = {
        total_purchase: ""
      };
    },
    getDataBy() {
      let data = this.paramFromList;
      console.log(data)
      this.ModelDetail = {
        icon_project: data.icon_project,
        project_name: data.project_name,
        total_owned_token: data.total_token ? data.total_token : 0,
        token_value_project: this.isCurrency(((data.total_token ? data.total_token : 0) * (data.token_value ? data.token_value : 0)), 0),
        token_value: data.token_value ? data.token_value : 0,
        token_value_s: this.isCurrency(data.token_value, 0),
        purchase_value: 0,
      }

      this.$forceUpdate();
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
        marketing_id: this.getDataUser().marketing_id,
        principle_id: this.getDataUser().principle_id,
        qty: this.Model.total_purchase,
        price: this.ModelDetail.token_value,
        total_price: this.replaceAllString(this.ModelDetail.purchase_value, ',', '', 'number'),
      }
      this.postJSON(this.urlHoonian + '/api/marketing-website/token/purchase', param).then((response) => {
        if (response == null) return;
        window.open(response.data.payment.redirect_url);
        this.doBack();
      });
    },
  },
  mounted() {
    this.$store.commit("setTitleMenu", "Buy Token");
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
