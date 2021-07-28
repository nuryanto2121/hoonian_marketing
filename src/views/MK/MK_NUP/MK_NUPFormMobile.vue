<template>
  <div class="dashboardBody" style="padding-bottom: 20px;">
    <b-row style="font-size: 14px;">
      <b-col lg="12" xl="12" style="background: white;">
        <b-form :data-vv-scope="'FormEntry'" :data-vv-value-path="'FormEntry'">
          <b-row style="margin-top: 10px; background: #F8F8F8; padding-top: 10px; padding-bottom: 10px;">
            <b-col cols="4" sm="2">
              <b-img id="name_card_show" :src="urlHoonian + paramFromList.icon_project" alt="" height="115" width="115" @error="onImageLoadFailure($event)" />
            </b-col>
            <b-col class="nup-form-mobile">
              <b-row>
                <b-col style="padding-left: unset !important; font-size: 13px;">
                  <div style="color: #4A93B3; text-shadow: 1.0px 0px;" class="text-single">
                    {{paramFromList.project_name}}
                  </div>

                  <div style="margin-top: 10px;">
                    {{ $t('total') }} NUP
                  </div>
                  <div style="color: #4A93B3;">
                    {{paramFromList.total_nup}}
                  </div>

                  <div style=" margin-top: 10px;">
                    {{ $t('no_of_buyer') }}
                  </div>
                  <div style="color: #4A93B3;">
                    {{paramFromList.total_buyer}}
                  </div>
            
                  <div style=" margin-top: 10px;">
                    {{ $t('total_nup_value') }}
                  </div>
                  <div style="color: #4A93B3;">
                    IDR {{isCurrency(paramFromList.value * paramFromList.total_nup, 2)}}
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row style="padding-top: 10px;">
            <b-col cols="9" sm="10">
              <span>
                <label style="text-shadow: 0.2px 0px;">{{ $t('handphone_no') }}</label>
              </span>
              <ACCTextBox
                :prop="PI_handphone_no"
                v-model="Model.handphone_no"
                ref="ref_email"
              />
            </b-col>
            <b-col cols="3" sm="2">
              <span>
                <label style="text-shadow: 0.2px 0px;">&nbsp;</label>
              </span>
              <ABSButton
                :text="$t('check')"
                classButton="btn btn--default"
                classIcon="icon-style-1"
                @click="getBuyerNUP"
                styleButton="height: 40px; width: 100%;"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <span>
                <label style="text-shadow: 0.2px 0px;">{{ $t('buyer_name') }}</label>
              </span>
              <ACCTextBox
                :prop="PI_buyer_name"
                v-model="Model.buyer_name"
                ref="ref_buyer_name"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <span>
                <label style="text-shadow: 0.2px 0px;">{{ $t('email') }}</label>
              </span>
              <ACCTextBox
                :prop="PI_email"
                v-model="Model.email"
                ref="ref_email"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <span>
                <label style="text-shadow: 0.2px 0px;">{{ $t('id_no') }}</label>
              </span>
              <ACCTextBox
                :prop="PI_ID_no"
                v-model="Model.id_no"
                ref="ref_id_no"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <div>
                <label style="text-shadow: 0.2px 0px;">{{ $t('id_picture') }}</label>
              </div>
              <div style="text-align: center;">
                <b-img id="name_card_show" :src="urlHoonian + Model.id_picture" alt="" height="150" @error="onImageLoadFailure($event)" />
              </div>
              <HOOImageUpload
                :prop="PI_id_picture"
                @change="OnIdPictureChange"
                v-model="Model.id_picture"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="5">
              <span>
                <label style="text-shadow: 0.2px 0px;">{{ $t('total_purchase') }}</label>
              </span>
              <ACCTextBox
                :prop="PI_total_purchase"
                v-model="Model.total_purchase"
                ref="ref_total_purchase"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <div style="text-shadow: 0.2px 0px;">
                {{ $t('nup_value') }} @
              </div>
              <div style="color: #4A93B3; text-shadow: 1.0px 0px; font-size: 18px;">
                IDR {{isCurrency(paramFromList.value, 2)}}
              </div>
            </b-col>
          </b-row>
          <b-row style="margin-top: 10px;">              
            <b-col cols="12">
              <div style="text-shadow: 0.2px 0px;">
                {{ $t('purchase_value') }}
              </div>
              <div style="color: #4A93B3; text-shadow: 1.0px 0px; font-size: 18px;">
                IDR {{isCurrency(paramFromList.value * (Model.total_purchase? Model.total_purchase: 0), 2)}}
              </div>
            </b-col>
          </b-row>
          <b-row style="margin-top: 10px;">              
            <b-col cols="12">
              <ABSButton
                :text="$t('purchase')"
                classButton="btn btn--default"
                classIcon="icon-style-1"
                @click="doSave"
                styleButton="height: 40px; width: 100%;"
              />
            </b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
    <ABSModal id="Modal_Payment" ref="Modal_Payment" size="sm" @modalCancelClicked="doBack()">
      <template slot="headerTitle">
        <span class="title-primary"> {{ $t('payment_through_va') }} </span>
      </template>
      <template slot="content">
        <b-row v-for="(data, index) in virtualAccountList" :key="index">
          <b-col md="12">
            <div style="background: #FFFFFF; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);">
              <b-row style="margin-top: 10px;">
                <b-col md="6" style="padding: 10px;">
                  <b-img :src="urlHoonian + data.bank_icon" alt="" width="100%" @error="onImageLoadFailure($event)" />
                </b-col>
                <b-col align-self="center" md="6">
                  <div>{{data.bank_name}}</div>
                  <div style="color: #4A93B3;">{{data.virtual_account_no}}</div>
                </b-col>
              </b-row>
            </div>
          </b-col>
        </b-row>
        <b-row style="margin-top: 20px;">
          <b-col>
            <ABSButton
              :text="$t('close')"
              classButton="btn btn--default"
              classIcon="icon-style-1"
              @click="doBack"
              styleButton="height: 40px; width: 100%;"
            />
          </b-col>
        </b-row>
      </template>
    </ABSModal>
  </div>
</template>
<script>
export default {
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
      Model: {
        buyer_name: "",
        total_purchase: "",
        handphone_no: "",
        email: "",
        id_no: "",
        id_picture: "",
      },
      virtualAccountList: [],
      PI_handphone_no: {
        cValidate: "required",
        cName: "Handphone No",
        cOrder: 1,
        cKey: false,
        cType: "tel",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: "new"
      },
      PI_buyer_name: {
        cValidate: "required",
        cName: "Buyer Name",
        cOrder: 2,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: "new"
      },
      PI_email: {
        cValidate: "email|required",
        cName: "Email",
        cOrder: 3,
        cKey: false,
        cType: "email",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: "new"
      },
      PI_ID_no: {
        cValidate: "required",
        cName: "ID No",
        cOrder: 4,
        cKey: false,
        cType: "tel",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: "new"
      },
      PI_id_picture: {
        cValidate: "required",
        cName: "ID Picture",
        cOrder: 5,
        cTitle: this.$t('upload_photo'),
        cType: "nup",
        cParentForm: "FormEntry"
      },
      PI_total_purchase: {
        cValidate: "required",
        cName: "Total Purchase",
        cOrder: 6,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: "new"
      },
    }
  },
  methods: {
    getBuyerNUP() {
      let param = {
        buyer_phone: this.Model.handphone_no,
      };
      this.postJSON(this.urlHoonian + '/api/marketing-website/project/unit-type/buyer-nup-list', param).then((response) => {
        if (response == null) return;
        let data = response.data;
        // this.nupData = data.nup_list;
        this.Model.id_no = data.buyer_info.id_no;
        this.Model.email = data.buyer_info.email;
        this.Model.id_picture = data.buyer_info.thumbnail_image;
        this.Model.buyer_name = data.buyer_info.name;
      });
    },
    onImageLoadFailure(event) {
      // event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    OnIdPictureChange(data) {
      this.Model.id_picture = data.url;
    },
    showPaymentThroughVA(nupPurchaseId) {
      let param = {
        nup_purchase_id: nupPurchaseId,
      };

      this.postJSON(
        this.urlHoonian + "/api/marketing-website/project/unit-type/nup-virtual-account-list",
        param
      ).then((response) => {
        if (response == null) return;
        this.virtualAccountList = response.data.virtual_accounts;
        this.$refs.Modal_Payment._show();
      });
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
        handphone: this.Model.handphone_no,
        customer_name: this.Model.buyer_name,
        email: this.Model.email,
        id_no: this.Model.id_no,
        thumbnail_image: this.Model.id_picture,
        marketing_agent_id: this.getDataUser().marketing_id,
        principle_id: this.getDataUser().principle_id,
        project_id: this.paramFromList.id,
        marketing_name: this.getDataUser().user_name,
        total_nup: this.Model.total_purchase
      };

      this.postJSON(
        this.urlHoonian + "/api/marketing-website/nup/purchase-nup",
        param
      ).then((response) => {
        if (response == null) return;
        // this.showPaymentThroughVA(response.data.purchase_id);
        window.open(response.data.payment.redirect_url);
        this.doBack();
      });
    },
  },
  mounted() {
    this.$store.commit("setTitleMenu", this.$t('buy_nup'));
  },
};
</script>

<style scoped>
</style>
