<template>
  <ABSModal id="Modal_Reservation" ref="Modal_Reservation" size="md" @modalCancelClicked="onClose">
    <template slot="headerTitle">
      <span v-if="dataRowClick" class="title-primary"> {{ $t('buyer_details') }} - {{ dataRowClick.status == AVAILABLE? 'Reservation': 'Waiting List' }} </span>
    </template>
    <template slot="content">
      <b-row v-if="dataRowClick">
        <b-col md="12" style="padding-left: unset !important; padding-right: unset !important;">
          <b-form :data-vv-scope="'FormEntryBuyer'" :data-vv-value-path="'FormEntryBuyer'">
            <b-row class="row-view">
              <b-col class="lbl-poppins" style="padding-left: 10px !important;">
                {{ $t('unit_no') }}
                <span style="color: #4A93B3">
                  {{dataRowClick.block_floor_name}} -
                  {{dataRowClick.unit_no}}
                </span>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="8">
                <b-row>
                  <b-col>
                    <span>
                      <label class="lbl-poppins">{{ $t('handphone_no') }}</label>
                    </span>
                    <ACCTextBox
                      :prop="PI_handphone_no"
                      v-model="BuyerDetails.handphone_no"
                      ref="ref_handphone_no"
                    />
                  </b-col>
                  <b-col v-if="isNUP()" sm="2">
                    <span>
                      <label class="lbl-poppins">&nbsp;</label>
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
                  <b-col>
                    <span>
                      <label class="lbl-poppins">{{ $t('buyer_name') }}</label>
                    </span>
                    <ACCTextBox
                      :prop="PI_buyer_name"
                      v-model="BuyerDetails.buyer_name"
                      ref="ref_buyer_name"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <span>
                      <label class="lbl-poppins">{{ $t('id_no') }}</label>
                    </span>
                    <ACCTextBox
                      :prop="PI_id_no"
                      v-model="BuyerDetails.id_no"
                      ref="ref_buyer_id_no"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <span>
                      <label class="lbl-poppins">{{ $t('email') }}</label>
                    </span>
                    <ACCTextBox
                      :prop="PI_email"
                      v-model="BuyerDetails.email"
                      ref="ref_buyer_email"
                    />
                  </b-col>
                </b-row>
                <b-row v-if="isNUP()" style="margin-top: 10px;">
                  <b-col md="12" style="max-height: 150px; overflow-y: scroll;">
                    <HOOList
                      :prop="{}"
                      :title="''"
                      @rowClicked="rowClickedNUP"
                      @buttonDeleteClicked="doDeleteClick"
                      @rowDblClicked="doDoubleClick"
                      @rowLinkClick="rowLink"
                      @pageSize="M_PageSize"
                      @pagination="M_Pagination"
                      @filter="M_Advance_Filter"
                      @headTable="M_Head_Table"
                      @refreshColumn="refreshColumn"
                      :ref="'ref_list_nup'"
                      @buttonViewClicked="doViewClick"
                      ButtonBackDisabled
                      SearchDisabled
                      isPoppins
                      isHeaderFixed
                      :cHeader="nupHeader"
                      :cData="nupData"
                      noCard
                      noTitle
                      removePaddingTopBody
                      noPaging
                    >
                    <template slot="refund_date" slot-scope="data">
                      {{momentUnix(data.item.refund_date, "DD MMM YYYY")}}
                    </template>
                    </HOOList>
                  </b-col>
                </b-row>                        
              </b-col>
              <b-col offset-md="1" md="3">
                  <span>
                  <label class="lbl-poppins">{{ $t('id_picture') }}</label>
                </span>
                <br />
                <b-img id="name_card_show" fluid :src="urlHoonian + BuyerDetails.id_picture" alt="" height="150" />
                <HOOImageUpload
                  :prop="PI_id_picture"
                  @change="OnIdPictureChange"
                  v-model="BuyerDetails.id_picture"
                />
              </b-col>
            </b-row>
            <b-row style="margin-top: 20px;">
              <b-col offset-sm="4" sm="4">
                <ABSButton
                  :text="$t('confirmation')"
                  classButton="btn btn--default"
                  classIcon="icon-style-1"
                  @click="doConfirmation"
                  styleButton="height: 40px; width: 100%;"
                />
              </b-col>
            </b-row>
          </b-form>
        </b-col>
      </b-row>
    </template>
  </ABSModal>
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
    AVAILABLE() {
      return "Available";
    },
    BOOKED() {
      return "Booked";
    },
    SOLD() {
      return "Sold";
    },
    V_LAUNCHING() {
      return "V-Launching";
    },
  },
  watch: {
  },
  data() {
    return {
      BuyerDetails: {
        handphone_no: '',
        buyer_name: '',
        id_no: '',
        email: '',
        id_picture: '',
      },
      nupHeader: [
        {
          key: "sequence_no",
          label: "SEQUENCE NO",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
        // {
        //   key: "nup_no",
        //   label: "NUP NO",
        //   tdClass: "ContentACCList2 notranslate th-cus-left poppins",
        //   thClass: "HeaderACCList2 th-cus-left poppins",
        // },
        // {
        //   key: "refund_date",
        //   label: "REFUND DATE",
        //   tdClass: "ContentACCList2 notranslate th-cus-left poppins",
        //   thClass: "HeaderACCList2 th-cus-left poppins",
        // },
      ],
      nupData: [],
      dataRowClick: undefined,
      dataBuyerDetail: { info: {}, virtual_accounts: [],},

      // FormEntryBuyer
      PI_handphone_no: {
        cValidate: "required",
        cName: "Handphone No",
        cOrder: 1,
        cKey: false,
        cType: "tel",
        cProtect: false,
        cParentForm: "FormEntryBuyer",
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
        cParentForm: "FormEntryBuyer",
        cDecimal: 2,
        cInputStatus: "new"
      },
      PI_id_no: {
        cValidate: "required",
        cName: "ID No",
        cOrder: 3,
        cKey: false,
        cType: "tel",
        cProtect: false,
        cParentForm: "FormEntryBuyer",
        cDecimal: 2,
        cInputStatus: "new"
      },
      PI_email: {
        cValidate: "email|required",
        cName: "Email",
        cOrder: 4,
        cKey: false,
        cType: "email",
        cProtect: false,
        cParentForm: "FormEntryBuyer",
        cDecimal: 2,
        cInputStatus: "new"
      },
      PI_id_picture: {
        cValidate: "required",
        cName: "ID Picture",
        cOrder: 5,
        cTitle: this.$t('upload_photo'),
        cType: "unit",
        cParentForm: "FormEntryBuyer"
      },
      nupNo: "",
      indexRowClick: -1,
    }
  },
  methods: {
    onClose() {
    },
    rowClickedNUP(record, index) {
      if (this.indexRowClick != -1) {
        this.nupData[this.indexRowClick]._rowVariant = ""
      }
      this.nupNo = record.nup_no;
      this.indexRowClick = index;
      this.nupData[index]._rowVariant = "info"
    },
    OnIdPictureChange(data) {
      this.BuyerDetails.id_picture = data.url;
    },
    doConfirmation() {
      this.$validator._base.validateAll("FormEntryBuyer").then((result) => {
        if (!result) return;
        this.alertConfirmation("Are You Sure Want To Save This Data ?").then(
          (ress) => {
            if (ress.value) {
              this.$validator.errors.clear("FormEntryBuyer");
              this.confirmation();
            }
          }
        );
      });
    },
    showVA(id) {
      let param = {
        customer_transaction_id: id,
      };
      this.postJSON(
        this.urlHoonian + "/api/marketing-website/project/unit-type/virtual-account-list",
        param
      ).then((response) => {
        if (response == null) return;
        this.virtualAccount = response.data;
        this.$refs.Modal_Payment._show();
        if (this.intervalPleasePayIn) {
          clearInterval(this.intervalPleasePayIn);
        }
        this.timerPleasePayIn();
      });
    },
    confirmation() {
      if (this.isNUP()) {
        if (this.nupNo == "") {
          this.alertError("Please choose NUP");
          return;
        }
      }
      let typeData = "";
      if (this.dataRowClick.status == this.AVAILABLE) {
        typeData = "reserve";
      } else if (this.dataRowClick.status == this.BOOKED) {
        typeData = "waiting";
      }
      
      let param = {
        handphone: this.BuyerDetails.handphone_no,
        customer_name: this.BuyerDetails.buyer_name,
        email: this.BuyerDetails.email,
        id_no: this.BuyerDetails.id_no,
        thumbnail_image: this.BuyerDetails.id_picture,
        unit_id: this.dataRowClick.id,
        marketing_id: this.getDataUser().marketing_id,
        principle_id: this.getDataUser().principle_id,
        project_id: this.paramFromList.id,
        type: typeData,
        nup_no: this.nupNo,
      };
      this.postJSON(this.urlHoonian + '/api/marketing-website/project/unit-type/reserve-unit', param).then((response) => {
        if (response == null) return;
        // this.showVA(response.data.transaction_id);
        window.open(response.data.payment.redirect_url);
        this.doBack();
      });
    },
    doReservationOrBooked(data) {
      this.dataRowClick = data;
      this.$refs.Modal_Reservation._show();
      this.$nextTick(() => {
        this.$validator.errors.clear("FormEntryBuyer");
        this.$validator.reset();
        this.BuyerDetails = {
          handphone_no: '',
          buyer_name: '',
          id_no: '',
          email: '',
          id_picture: '',
        },
        this.nupData = [];
        this.nupNo = "";
        this.indexRowClick = -1;
      });
    },
    getBuyerNUP() {
      let param = {
        buyer_phone: this.BuyerDetails.handphone_no,
      };
      this.postJSON(this.urlHoonian + '/api/marketing-website/project/unit-type/buyer-nup-list', param).then((response) => {
        if (response == null) return;
        let data = response.data;
        this.nupData = data.nup_list;
        this.BuyerDetails.id_no = data.buyer_info.id_no;
        this.BuyerDetails.email = data.buyer_info.email;
        this.BuyerDetails.id_picture = data.buyer_info.thumbnail_image;
        this.BuyerDetails.buyer_name = data.buyer_info.name;
      });
    },
    isNUP() {
      if (this.dataRowClick.booking_type) {
        if (this.dataRowClick.booking_type == "nup") {
          return true;
        }
      }
      return false;
    }
  },
  mounted() {
  },
};
</script>

<style scoped>
</style>
