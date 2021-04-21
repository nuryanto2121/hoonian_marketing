<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col lg="12" xl="12">
            <div class="card">
                <div class="card__body">
                    <b-row style="margin-bottom: 20px;">
                        <b-col lg="2" xl="2"  style="margin-right: 20px;">
                            <!-- image -->
                        </b-col>
                        <b-col>
                            <b-row>
                                <b-col>
                                    <span>
                                        <label class="title-primary" style="font-weight: bold;">Personal Information</label>
                                    </span>
                                </b-col>
                            </b-row>
                            <b-row class="noPadding">
                                <b-col lg="4" xl="4" class="noPadding"  style="margin-right: 20px;">
                                    <b-row class="noPadding">
                                        <b-col>
                                            <span>
                                                <label class="lbl-poppins">{{ $t('name') }}</label>
                                            </span>
                                            <ACCTextBox
                                                :prop="PI_name"
                                                v-model="Model.name"
                                                ref="ref_name"
                                            />
                                        </b-col>
                                    </b-row>
                                    <b-row class="noPadding">
                                        <b-col>
                                            <span>
                                                <label class="lbl-poppins">{{ $t('handphone_no') }}</label>
                                            </span>
                                            <ACCTextBox
                                                :prop="PI_handphone"
                                                v-model="Model.handphone"
                                                ref="ref_handphone"
                                            />
                                        </b-col>
                                    </b-row>
                                    <b-row class="noPadding">
                                        <b-col>
                                            <span>
                                                <label class="lbl-poppins">{{ $t('email') }}</label>
                                            </span>
                                            <ACCTextBox
                                                :prop="PI_email"
                                                v-model="Model.email"
                                                ref="ref_email"
                                            />
                                        </b-col>
                                    </b-row>
                                    <b-row class="noPadding">
                                        <b-col>
                                            <span>
                                                <label class="lbl-poppins">{{ $t('id_no') }}</label>
                                            </span>
                                            <ACCTextBox
                                                :prop="PI_id_no"
                                                v-model="Model.id_no"
                                                ref="ref_id_no"
                                            />
                                        </b-col>
                                    </b-row>
                                </b-col>
                                <b-col lg="4" xl="4" class="noPadding"  style="margin-right: 20px;">
                                    <b-row class="noPadding">
                                        <b-col>
                                            <span>
                                                <label class="lbl-poppins">{{ $t('notes') }}</label>
                                            </span>
                                            <ACCTextArea
                                                :prop="PI_notes"
                                                v-model="Model.notes"
                                                ref="ref_notes"
                                            />
                                        </b-col>
                                    </b-row>
                                    <b-row class="noPadding">
                                        <b-col>
                                            <span>
                                                <label class="lbl-poppins">{{ $t('id_picture') }}</label>
                                            </span> <br>
                                            <b-img @click="OnIDPictClick" id="id_pict_show" :src="urlHoonian + Model.thumbnail_image" alt="" height="150" @error="onImageLoadFailure($event)" />
                                            <HOOImageUpload
                                                :prop="PI_id_pict"
                                                @change="Onid_pictChange"
                                                v-model="Model.thumbnail_image"
                                                ref="id_pict"
                                            />
                                        </b-col>
                                    </b-row>
                                </b-col>
                                <b-col class="noPadding">
                                    <b-row class="noPadding">
                                        <b-col>
                                            <span>
                                                <label class="lbl-poppins">{{ $t('language') }}</label>
                                            </span> <br>
                                            <span>
                                                <font-awesome-icon class="icon-style-default title-primary" icon="globe" /> &nbsp;
                                                <label class="title-primary">{{Model.lang_id == 'id' ? 'Indonesia' : "English"}}</label>
                                            </span>
                                            <HOODropDown
                                                @change="Onlang_idChange"
                                                :prop="PI_lang_id"
                                                v-model="Model.lang_id"
                                                :label="Model.lang_idLabel"
                                                ref="ref_lang_id"
                                            />
                                        </b-col>
                                    </b-row>
                                </b-col>
                            </b-row>
                            <b-row style="margin-top: 20px;">
                                <b-col>
                                    <span>
                                        <label class="title-primary" style="font-weight: bold;">Change Password</label>
                                    </span>
                                </b-col>
                            </b-row>
                            <b-row class="noPadding">
                                <b-col lg="4" xl="4" class="noPadding"  style="margin-right: 20px;">
                                    <b-row class="noPadding">
                                        <b-col>
                                            <span>
                                                <label class="lbl-poppins">{{ $t('new_password') }}</label>
                                            </span>
                                            <ACCTextBox
                                                :prop="PI_password"
                                                v-model="Model.password"
                                                ref="ref_password"
                                            />
                                        </b-col>
                                    </b-row>
                                    <b-row class="noPadding">
                                        <b-col lg="6" xl="6">
                                            <ABSButton
                                                :text="'Save'"
                                                classButton="btn btn--default"
                                                classIcon="icon-style-1"
                                                @click="doSave"
                                                styleButton="height: 40px;width: 100%;"
                                            />
                                        </b-col>
                                    </b-row>
                                </b-col>
                                <b-col lg="4" xl="4" class="noPadding">
                                    <b-row class="noPadding">
                                        <b-col>
                                            <span>
                                                <label class="lbl-poppins">{{$t('confirm')}} {{ $t('new_password') }}</label>
                                            </span>
                                            <ACCTextBox
                                                :prop="PI_c_password"
                                                v-model="Model.confirm_pass"
                                                ref="ref_c_password"
                                            />
                                        </b-col>
                                    </b-row>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                    <hr>
                    <b-row style="margin-top: 20px;">
                        <b-col>
                            <HOOList
                                :prop="propList"
                                :title="'Sales Detail'"
                                :ref="'ref_sales_detail'"
                                ButtonBackDisabled
                                SearchDisabled
                                isPoppins
                                isHeaderFixed
                                noCard
                                removeCardTitle
                                removePaddingTopBody
                                :cHeader="Headers"
                            >
                                <template slot="TitleTable">
                                    <b-col lg="3" xl="3" style="padding-left: unset !important; color: black !important;" class="title-list-primary">
                                        Sales Detail
                                    </b-col>
                                </template>
                                <template slot="price" slot-scope="data">
                                    {{isCurrency(data.item.price, decimal)}}
                                </template>
                                <template slot="commission" slot-scope="data">
                                    {{isCurrency(data.item.commission, decimal)}}
                                </template>
                            </HOOList>
                        </b-col>
                    </b-row>
                </div>
            </div>
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
        url: "/api/marketing-website/profile/transactions",
        initialWhere: "",
        SortField: "",
        SortBy: "desc",
        ParamWhere: "",
        param: {
            company_group_id: "",
            marketing_agent_id: ""
        }
      },
      Headers: [
        {
          key: "no",
          label: "No",
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
          key: "buyer_name",
          label: "Buyer Name",
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "project_name",
          label: "Project Name",
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "tower",
          label: "Tower",
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
          key: "unit_no",
          label: "Unit No",
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
          key: "price",
          label: "Price",
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
          key: "commission",
          label: "Commission",
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
          key: "status",
          label: "Status",
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
      ],
      Model: {
        handphone: "",
        name: "",
        email: "",
        id_no: "",
        thumbnail_image: "",
        mobile_app_user_id: "",
        lang_id: "",
        lang_idLabel: "",
        confirm_pass: "",
        marketing_id: "",
        user_id: "",
        notes: "",
      },

      PI_name: {
        cValidate: "",
        cName: "Name",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: "new"
      },
      PI_handphone: {
        cValidate: "",
        cName: "Handphone No",
        cOrder: 2,
        cKey: false,
        cType: "tel",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: "new"
      },
      PI_email: {
        cValidate: "email",
        cName: "Email",
        cOrder: 3,
        cKey: false,
        cType: "email",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: "new"
      },
      PI_id_no: {
        cValidate: "",
        cName: "ID No",
        cOrder: 4,
        cKey: false,
        cType: "tel",
        cProtect: true,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: "new"
      },
      PI_notes: {
        cValidate: "max:5000",
        cName: "Notes",
        cOrder: 5,
        cKey: false,
        cProtect: false,
        cResize: false,
        cReadonly: false,
        cRows: 6,
        cMaxRows: 6,
        cSize: "md",
        cParentForm: "FormEntry",
        cInputStatus: "new"
      },
      PI_id_pict: {
        cValidate: "",
        cName: "id_pict",
        cOrder: 6,
        cType: "id_pict",
        cParentForm: "FormEntry",
        cStyle: "display: none"
      },
      PI_lang_id: {
        dataLookUp: {
          url: "/api/hoonian-website/marketing-website-language-lookup",
          param: {
            principle_id: ""
          }
        },
        cValidate: "",
        cName: "Language",
        ckey: false,
        cOrder: 7,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: "new",
        cStyle: "display: none;"
      },
      PI_password: {
        cValidate: "",
        cName: "Password",
        cOrder: 8,
        cKey: false,
        cType: "password",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: "new"
      },
      PI_c_password: {
        cValidate: "",
        cName: "Confirm Password",
        cOrder: 9,
        cKey: false,
        cType: "password",
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
    OnIDPictClick() {
        this.$refs.id_pict.onClick();
    },
    Onlang_idChange(data) {
        this.Model.lang_id = data.id;
        this.Model.lang_idLabel = data.label;
    },
    OnLangClick() {
        this.$refs.ref_lang_id.focus();
        this.$refs.ref_lang_id.onFocus();
    },
    doBack() {
      this.$router.go(-1);
    },
    M_ClearForm() {
      this.Model = {
        handphone: "",
        name: "",
        email: "",
        id_no: "",
        thumbnail_image: "",
        mobile_app_user_id: "",
        lang_id: "",
        lang_idLabel: "",
        confirm_pass: "",
        marketing_id: "",
        user_id: "",
        notes: "",
      };
    },
    getDataBy() {
        this.postJSON(
            this.urlHoonian + "/api/marketing-website/profile/detail",
            {
                marketing_agent_id: this.getDataUser().marketing_id
            }
        ).then((response) => {
            if (response == null) return;
            this.Model = response.data;
            this.Model.lang_idLabel = this.Model.lang_id == 'id' ? "Indonesia" : "English";
            this.getSalesDetail();
        });
    },
    getSalesDetail() {
        this.propList.param = {
            company_group_id: this.company_group_id,
            marketing_agent_id: this.getDataUser().marketing_id
        }

        this.$refs.ref_sales_detail.doGetList("");
    },
    doSave() {
        this.alertConfirmation("Are You Sure Want To Save This Data ?").then(
          (ress) => {
            if (ress.value) {
              this.M_Save();
            }
          }
        );
    },
    M_Save() {
        this.postJSON(this.urlHoonian + '/api/marketing-website/profile/edit', this.Model).then((response) => {
            if (response == null) return;
            this.doBack();
        });
    },
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
