<template>
  <div>
    <b-row class="dashboardBody">
      <b-col cols="12">
        <b-row>
            <b-col cols="12">
              <b-row style="margin-top: 20px;">
                <b-col cols="4" style="margin-right: 10px;" class="token-purchase-img-card">
                  <b-img :src="urlHoonian + ModelDetail.icon_project" alt="" class="token-purchase-img" fluid-grow rounded @error="onImageLoadFailure($event)" />
                </b-col>
                <b-col>
                  <b-row>
                    <b-col>
                      <label class="title-primary token-purchase-project-text">
                        {{ModelDetail.project_name}}
                      </label>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12" class="token-purchase-info-card">
                        <span class="poppins token-purchase-info-text">{{$t('total_owned_token')}}</span> <br>
                        <span class="title-primary token-purchase-info-text">
                          {{ModelDetail.total_owned_token}}
                        </span>
                    </b-col>
                    <b-col cols="12" class="token-purchase-info-card">
                            <span class="poppins token-purchase-info-text">{{$t('token_value')}}</span> <br>
                            <span class="title-primary token-purchase-info-text">
                                {{ModelDetail.token_value_project}}
                            </span>
                    </b-col>
                  </b-row>
                  <!-- <b-row>
                  </b-row> -->
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
                        <div class="display-only-potrait">
                            <b-row>
                                <b-col>
                                    <span>
                                        <label style="font-weight: bold; font-size: 15px;" class="lbl-poppins">{{$t('total_purchase')}}</label>
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
                                <b-col>
                                    <span>
                                    <label style="font-weight: bold; font-size: 15px;" class="lbl-poppins">{{$t('token_value')}}@</label>
                                    </span> <br>
                                    <span>
                                    <label style="font-weight: bold; font-size: 15px;" class="title-primary">
                                        <strong>{{ModelDetail.token_value_s}}</strong>
                                    </label>
                                    </span>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <span>
                                        <label style="font-weight: bold; font-size: 15px;" class="lbl-poppins">{{$t('purchase_value')}}</label>
                                    </span> <br>
                                    <span>
                                    <label style="font-weight: bold; font-size: 15px;" class="title-primary">
                                        <strong>{{ModelDetail.purchase_value}}</strong>
                                    </label>
                                    </span>
                                </b-col>
                            </b-row>
                            <b-row style="margin-top: 10px;">
                                <b-col>
                                    <ABSButton
                                    :text="$t('purchase')"
                                    classButton="button button--hoonian"
                                    classIcon="icon-style-1"
                                    @click="doSave"
                                    styleButton="height: 40px;width: 100%;"
                                    />
                                </b-col>
                            </b-row>
                        </div>
                        <div class="display-only-landscape">
                            <b-row>
                                <b-col cols="6">
                                    <span>
                                    <label style="font-weight: bold; font-size: 15px;" class="lbl-poppins">{{$t('token_value')}}@</label>
                                    </span> <br>
                                    <span>
                                    <label style="font-weight: bold; font-size: 15px;" class="title-primary">
                                        <strong>{{ModelDetail.token_value_s}}</strong>
                                    </label>
                                    </span>
                                </b-col>
                                <b-col cols="6">
                                    <span>
                                        <label style="font-weight: bold; font-size: 15px;" class="lbl-poppins">{{$t('total_purchase')}}</label>
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
                                <b-col cols="6">
                                    <span>
                                        <label style="font-weight: bold; font-size: 15px;" class="lbl-poppins">{{$t('purchase_value')}}</label>
                                    </span> <br>
                                    <span>
                                    <label style="font-weight: bold; font-size: 15px;" class="title-primary">
                                        <strong>{{ModelDetail.purchase_value}}</strong>
                                    </label>
                                    </span>
                                </b-col>
                                <b-col cols="6">
                                    <ABSButton
                                        :text="$t('purchase')"
                                        classButton="button button--hoonian"
                                        classIcon="icon-style-1"
                                        @click="doSave"
                                        styleButton="height: 40px;width: 80%;"
                                    />
                                </b-col>
                            </b-row>
                        </div>
                      </b-form>
                  </div>
              </div>
            </b-col>
        </b-row>
      </b-col>
    </b-row>
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
    //   console.log(x)
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
    // this.$store.commit("setTitleMenu", this.$t('buy_token'));
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
