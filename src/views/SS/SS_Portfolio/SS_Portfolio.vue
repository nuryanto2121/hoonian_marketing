<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>Portfolio</span>
                </b-col>
                <b-col style="text-align: right;">
                  <ABSButton
                    :text="'Back'"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    @click="doBack"
                  />
                </b-col>
              </b-row>
            </div>
            <div class="card__body">
              <b-form
                :data-vv-scope="'SS_Portfolio'"
                :data-vv-value-path="'SS_Portfolio'"
              >
                <b-row>
                  <b-col md="2">
                    <div>
                      <img id="logo" :src="M_Portfolio.file_show" alt width="100%" />
                    </div>
                    <ACCImageUpload
                      :prop="PI_logo"
                      @change="onlogoChange"
                      v-model="M_Portfolio.file_logo"
                    />
                  </b-col>
                  <b-col md="10">
                    <!-- <b-row>
                    <b-col md="12">-->
                    <b-row>
                      <b-col md="9">
                        <span>
                          <label>Portfolio Name</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_customer_name"
                          v-model="M_Portfolio.name"
                          ref="ref_customer_name"
                        />
                      </b-col>
                      <b-col style="text-align: right;">
                        {{M_Portfolio.user_name}} <br>
                        {{momentDateFormatting(new Date(M_Portfolio.time_edit), "DD MMM YYYY")}}
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="9">
                        <span>
                          <label>Address</label>
                        </span>
                        <ACCTextArea
                          :prop="PI_address"
                          v-model="M_Portfolio.address"
                          ref="ref_address"
                        />
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col md="2" class="col-p-1">
                        <span>
                          <label style="width: 100px;">Phone No.</label>
                        </span>
                        <ACCDropDown
                          @change="Onphone_no_1Change"
                          :prop="PI_phone_no_1"
                          v-model="M_Portfolio.phone_no_1"
                          :label="M_Portfolio.phone_no_1Label"
                          ref="ref_phone_no_1"
                        />
                      </b-col>
                      <span style="margin-top: 35px;">-</span>
                      <b-col md="2" class="col-p-3">
                        <span>
                          <label>&nbsp;</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_phone_no_2"
                          v-model="M_Portfolio.phone_no_2"
                          ref="ref_phone_no_2"
                        />
                      </b-col>
                      <b-col md="2" class="col-p-1">
                        <span>
                          <label style="width: 100px;">Fax No.</label>
                        </span>
                        <ACCDropDown
                          @change="OnFax_no_1Change"
                          :prop="PI_fax_no_1"
                          v-model="M_Portfolio.fax_no_1"
                          :label="M_Portfolio.fax_no_1Label"
                          ref="ref_fax_no_1"
                        />
                      </b-col>
                      <span style="margin-top: 35px;">-</span>
                      <b-col md="2" class="col-p-3">
                        <span>
                          <label>&nbsp;</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_fax_no_2"
                          v-model="M_Portfolio.fax_no_2"
                          ref="ref_fax_no_2"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Email</label>
                        </span>
                        <ACCTextBox :prop="PI_email" v-model="M_Portfolio.email" ref="ref_email" />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Website</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_website"
                          v-model="M_Portfolio.website"
                          ref="ref_website"
                        />
                      </b-col>
                    </b-row>

                    <!-- <b-row>
                      <b-col md="6">
                        <span>
                          <label>Customer Status</label>
                        </span>
                        <ACCLookUp
                          @change="Oncustomer_statusChange"
                          :prop="PI_customer_status"
                          v-model="M_Portfolio.customer_status"
                          :label="M_Portfolio.customer_statusLabel"
                          ref="ref_customer_status"
                        />
                      </b-col>
                    </b-row> -->
                    <b-row style="margin-top: 10px;">
                      <b-col md="6">
                        <ABSButton
                          :text="'Save '"
                          classButton="btn btn--default"
                          classIcon="icon-style-default"
                          @click="doSave"
                          styleButton="height: 40px;width: 100%;"
                          :disabled="ButtonStatus == null ? true : !ButtonStatus.listEditPortfolio"
                        />
                      </b-col>
                    </b-row>
                    <!-- </b-col>
                    </b-row>-->
                  </b-col>
                </b-row>
              </b-form>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      PI_logo: {
        cName: "Logo",
        cAccept: ".jpg, .png, .gif",
        cTitle: "Add Logo",
        cModule: "SS",
      },
      PI_customer_name: {
        cValidate: "max:100",
        cName: "customer_name",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "SS_Portfolio",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_address: {
        cValidate: "max:255",
        cName: "address",
        cOrder: 2,
        cKey: false,
        cProtect: false,
        cResize: false,
        cReadonly: false,
        cRows: 1,
        cMaxRows: 2,
        cSize: "md",
        cParentForm: "SS_Portfolio",
        cInputStatus: this.inputStatus,
      },
      PI_phone_no_1: {
        dataLookUp: {
          LookUpCd: "GetPhoneCd",
          ColumnDB: "phone_cd",
          InitialWhere: "",
          ParamWhere: "",
          OrderBy: "",
          ParamView: "",
          SourceField: "",
          DisplayLookUp: "phone_country_code,country_name",
        },
        cDisplayWithCode: true,
        cValidate: "required",
        cName: "phone_no_1",
        ckey: false,
        cOrder: 3,
        cProtect: false,
        cParentForm: "SS_Portfolio",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "phone_country_code",
        cInputStatus: this.inputStatus,
      },
      PI_phone_no_2: {
        cValidate: "required|max:16",
        cName: "phone_no_2",
        cOrder: 4,
        cKey: false,
        cType: "tel",
        cProtect: false,
        cParentForm: "SS_Portfolio",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_fax_no_1: {
        dataLookUp: {
          LookUpCd: "GetPhoneCd",
          ColumnDB: "phone_cd",
          InitialWhere: "",
          ParamWhere: "",
          OrderBy: "",
          ParamView: "",
          SourceField: "",
          DisplayLookUp: "phone_country_code,country_name",
        },
        cDisplayWithCode: true,
        cValidate: "",
        cName: "fax_no_1",
        ckey: false,
        cOrder: 5,
        cProtect: false,
        cParentForm: "SS_Portfolio",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "phone_country_code",
        cInputStatus: this.inputStatus,
      },
      PI_fax_no_2: {
        cValidate: "max:16",
        cName: "fax_no_2",
        cOrder: 6,
        cKey: false,
        cType: "tel",
        cProtect: false,
        cParentForm: "SS_Portfolio",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_email: {
        cValidate: "max:60|email",
        cName: "email",
        cOrder: 7,
        cKey: false,
        cType: "email",
        cProtect: false,
        cParentForm: "SS_Portfolio",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_website: {
        cValidate: "max:60",
        cName: "website",
        cOrder: 8,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "SS_Portfolio",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      M_Portfolio: {
        name: "",
        reference_no: '',
        address: '',
        city: '',
        post_cd: '',
        phone_no_1: this.getDataUser().phone_country_code,
        phone_no_1Label: this.getDataUser().phone_country_code,
        phone_no_2: '',
        fax_no_1: this.getDataUser().phone_country_code,
        fax_no_1Label: this.getDataUser().phone_country_code,
        fax_no_2: '',
        email: '',
        website: '',
        rounding_factor: '',
        remarks: '',
        picture_file_name: '',
        reference_file_name: '',
        user_input: '',
        user_edit: '',
        time_input: '',
        time_edit: '',
        row_id: '',
        lastupdatestamp: '',
        file_logo_name: '',
        file_logo_path: '',
        file_show: '',
      },
      default_pict: require('@/assets/default_photo_.png')
    };
  },
  computed: {
    paramFromList() {
      var param = this.$store.getters.getParamPage;
      // if (param == null || param == undefined) {
      //   this.doBack();
      // } else {
      //   if (Object.keys(param).length < 1) {
      //     this.doBack();
      //   } else {
      return param;
      //   }
      // }
    },
    inputStatus() {
      var param = this.$store.getters.getParamPage;
      if (param.isEdit && param.isEdit === true) {
        return "edit";
      } else {
        return "new";
      }
    },
    ButtonStatus() {
      return this.$store.getters.getButtonStatus;
    },
  },
  methods: {
    Onphone_no_1Change(data) {
      this.M_Portfolio.phone_no_1 = data.id;
      this.M_Portfolio.phone_no_1Label = data.id;
    },
    OnFax_no_1Change(data) {
      console.log(data);
      this.M_Portfolio.fax_no_1 = data.id;
      this.M_Portfolio.fax_no_1Label = data.id;
    },
    doBack() {
      this.$router.go(-1);
    },
    M_ClearForm() {
      this.M_Portfolio = {
        name: "",
        reference_no: '',
        address: '',
        city: '',
        post_cd: '',
        phone_no: '',
        fax_no: '',
        email: '',
        website: '',
        rounding_factor: '',
        remarks: '',
        picture_file_name: '',
        reference_file_name: '',
        user_input: '',
        user_edit: '',
        time_input: '',
        time_edit: '',
        row_id: '',
        lastupdatestamp: '',
        file_logo_name: '',
        file_logo_path: '',
        file_show: '',
      };
    },
    onlogoChange(data) {
      // console.log(data);
      this.M_Portfolio.file_logo_name = data.name;
      this.M_Portfolio.file_logo_path = data.path;
      this.M_Portfolio.file_show = this.url + data.path;
      this.M_Portfolio.reference_file_name = this.url + data.path;
      this.M_Portfolio.picture_file_name = data.name;
    },

    Oncustomer_statusChange(data) {
      this.$nextTick(() => {
        this.M_Portfolio.customer_status = data.cm_customer_status_id;
        this.M_Portfolio.customer_statusLabel = data.descs;
      });
    },
    doSave() {
      this.$validator._base.validateAll("SS_Portfolio").then((result) => {
        if (!result) return;
        this.alertConfirmation("Are You Sure Want To Save This Data ?").then(
          (ress) => {
            if (ress.value) {
              this.$validator.errors.clear("SS_Portfolio");
              this.M_Update();
            }
          }
        );
      });
    },
    GetDataBy() {
      var param = {
          option_function_cd: "GetPortfolio",
          module_cd: "SS",
          ss_portfolio_id: this.getDataUser().portfolio_id
      };
      
      this.CallFunction(param).then(response => {
        if (response == null) return
        var data = response.Data[0];

        var phone_no = data.phone_no && data.phone_no !== "" ? data.phone_no.split("-") : "";
        var fax_no = data.fax_no && data.fax_no !== "" ? data.fax_no.split("-") : "";

        this.M_Portfolio = {
          name: data.name,
          reference_no: data.reference_no,
          address: data.address,
          city: data.city,
          post_cd: data.post_cd,

          phone_no: data.phone_no,
          phone_no_1: phone_no !== "" ? phone_no[0] : phone_no,
          phone_no_1Label: phone_no !== "" ? phone_no[0] : phone_no,
          phone_no_2: phone_no !== "" ? phone_no[1] : phone_no,

          fax_no: data.fax_no,
          fax_no_1: fax_no !== "" ? fax_no[0] : fax_no,
          fax_no_1Label: fax_no !== "" ? fax_no[0] : fax_no,
          fax_no_2: fax_no !== "" ? fax_no[1] : fax_no,
          
          email: data.email,
          website: data.website,
          rounding_factor: data.rounding_factor,
          remarks: data.remarks,
          picture_file_name: data.picture_file_name,
          reference_file_name: data.reference_file_name,
          user_input: data.user_input,
          user_edit: data.user_edit,
          time_input: data.time_input,
          time_edit: data.time_edit,
          row_id: data.row_id,
          lastupdatestamp: data.lastupdatestamp,
          file_logo_name: data.picture_file_name,
          file_logo_path: data.reference_file_name,
          file_show: data.reference_file_name && data.reference_file_name !== '' ? data.reference_file_name : this.default_pict,
        }

        this.getUserInfo(data.user_edit).then((response) => {
          if (response == null) return;
          this.M_Portfolio.user_name = response.user_name;
          this.$forceUpdate();
        });
      })
    },
    M_Update() {
      var param = {
        option_url: "/SS/SS_Portfolio",
        line_no: 0,
        ss_portfolio_id: this.M_Portfolio.row_id,
        name: this.M_Portfolio.name,
        reference_no: this.M_Portfolio.reference_no,
        address: this.M_Portfolio.address,
        city: this.M_Portfolio.city,
        post_cd: this.M_Portfolio.post_cd,
        phone_no: this.M_Portfolio.phone_no_1 + "-" + this.M_Portfolio.phone_no_2,
        email: this.M_Portfolio.email,
        fax_no: this.M_Portfolio.fax_no_1 + "-" + this.M_Portfolio.fax_no_2,
        website: this.M_Portfolio.website,
        rounding_factor: this.M_Portfolio.rounding_factor,
        remarks: this.M_Portfolio.remarks,
        picture_file_name: this.M_Portfolio.picture_file_name,
        reference_file_name: this.M_Portfolio.reference_file_name,
        lastupdatestamp: this.M_Portfolio.lastupdatestamp,
        user_edit: this.getDataUser().user_id
      };

      this.putJSON(this.getUrlCRUD(), param).then((response) => {
        // console.log(response)
        if (response == null) return;
      });
    },
  },
  mounted() {
    this.M_ClearForm();
    this.GetDataBy();
  },
};
</script>

<style>
</style>