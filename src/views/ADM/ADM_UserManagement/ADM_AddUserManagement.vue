<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important">
                  <span>User Management</span>
                </b-col>
                <b-col style="text-align: right">
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
                :data-vv-scope="'ADM_AddUserManagement'"
                :data-vv-value-path="'ADM_AddUserManagement'"
              >
                <b-row>
                  <b-col md="2">
                    <div>
                      <img
                        id="logo"
                        :src="M_UserManagement.file_show"
                        alt
                        width="100%"
                      />
                    </div>
                    <ACCImageUpload
                      :prop="PI_logo"
                      @change="onlogoChange"
                      v-model="M_UserManagement.file_logo"
                    />
                  </b-col>
                  <b-col md="10">
                    <b-row>
                      <b-col sm="3">
                        <span>
                          <label>Mark user as INACTIVE</label>
                        </span>
                      </b-col>
                      <b-col sm="3" style="text-align: right;">
                        <b-form-checkbox
                          v-model="M_UserManagement.is_inactive"
                          name="check-button"
                          switch
                          size="lg"
                          :value="'Y'"
                          :unchecked-value="'N'"
                        ></b-form-checkbox>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>
                            <span style="color: red">*</span> User ID
                          </label>
                        </span>
                        <ACCTextBox
                          :prop="PI_user_id"
                          v-model="M_UserManagement.user_id"
                          ref="ref_user_id"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>
                            <span style="color: red">*</span> Name
                          </label>
                        </span>
                        <ACCTextBox
                          :prop="PI_customer_name"
                          v-model="M_UserManagement.customer_name"
                          ref="ref_customer_name"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="2" class="col-p-1">
                        <span>
                          <label style="width: 100px">
                            <span style="color: red">*</span> Phone No.
                          </label>
                        </span>
                        <ACCDropDown
                          @change="Onphone_no_1Change"
                          :prop="PI_phone_no_1"
                          v-model="M_UserManagement.phone_no_1"
                          :label="M_UserManagement.phone_no_1Label"
                          ref="ref_phone_no_1"
                        />
                      </b-col>
                      <b-col md="4" class="col-p-3">
                        <span>
                          <label>&nbsp;</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_phone_no_2"
                          v-model="M_UserManagement.phone_no_2"
                          ref="ref_phone_no_2"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>
                            <span style="color: red">*</span> Address
                          </label>
                        </span>
                        <ACCTextArea
                          :prop="PI_address"
                          v-model="M_UserManagement.address"
                          ref="ref_address"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>
                            <span style="color: red">*</span> Email
                          </label>
                        </span>
                        <ACCTextBox
                          :prop="PI_email"
                          v-model="M_UserManagement.email"
                          ref="ref_email"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Password</label>
                        </span>
                        <ACCTextBox
                          @input="OnpasswordChange"
                          :prop="PI_password"
                          v-model="M_UserManagement.password"
                          ref="ref_password"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Confirm Password</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_confirm_password"
                          v-model="M_UserManagement.confirm_password"
                          ref="ref_confirm_password"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>
                            <span style="color: red">*</span> User Group
                          </label>
                        </span>
                        <ACCDropDown
                          @change="OnroleChange"
                          :prop="PI_role"
                          v-model="M_UserManagement.role"
                          :label="M_UserManagement.roleLabel"
                          ref="ref_role"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <span style="color: red">*</span> Job Title
                        </span>
                        <ACCTextBox
                          :prop="PI_job_title"
                          v-model="M_UserManagement.job_title"
                          ref="ref_job_title"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Notes</label>
                        </span>
                        <ACCTextArea
                          :prop="PI_notes"
                          v-model="M_UserManagement.notes"
                          ref="ref_notes"
                        />
                      </b-col>
                    </b-row>
                    <b-row style="margin-top: 10px">
                      <b-col md="6">
                        <ABSButton
                          :text="'Save'"
                          classButton="btn btn--default"
                          classIcon="icon-style-default"
                          @click="doSave"
                          styleButton="height: 40px;width: 100%;"
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
        cTitle: "Edit Profile Picture",
        cModule: "MK",
      },
      PI_user_id: {
        cValidate: "required",
        cName: "user_id",
        cOrder: 1,
        cKey: true,
        cType: "text",
        cProtect: false,
        cParentForm: "ADM_AddUserManagement",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_customer_name: {
        cValidate: "required",
        cName: "customer_name",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "ADM_AddUserManagement",
        cDecimal: 2,
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
        cOrder: 1,
        cProtect: false,
        cParentForm: "ADM_AddUserManagement",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "phone_country_code",
        cInputStatus: this.inputStatus,
      },
      PI_phone_no_2: {
        cValidate: "max:16|required",
        cName: "phone_no_2",
        cOrder: 2,
        cKey: false,
        cType: "tel",
        cProtect: false,
        cParentForm: "ADM_AddUserManagement",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_address: {
        cValidate: "required",
        cName: "address",
        cOrder: 3,
        cKey: false,
        cProtect: false,
        cResize: false,
        cReadonly: false,
        cRows: 1,
        cMaxRows: 2,
        cSize: "md",
        cParentForm: "ADM_AddUserManagement",
        cInputStatus: this.inputStatus,
      },
      PI_email: {
        cValidate: "email|required",
        cName: "email",
        cOrder: 4,
        cKey: false,
        cType: "email",
        cProtect: false,
        cParentForm: "ADM_AddUserManagement",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_password: {
        cValidate: "",
        cName: "password",
        cOrder: 5,
        cKey: false,
        cType: "password",
        cProtect: false,
        cParentForm: "ADM_AddUserManagement",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_confirm_password: {
        cValidate: "",
        cName: "confirm_password",
        cOrder: 6,
        cKey: false,
        cType: "password",
        cProtect: false,
        cParentForm: "ADM_AddUserManagement",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_role: {
        dataLookUp: {
          LookUpCd: "GetUserGroupLookupEx",
          ColumnDB: "group_id",
          InitialWhere: "group_access = 'E'",
          ParamWhere: "",
          OrderBy: "",
          ParamView: this.getDataUser().portfolio_id,
          SourceField: "",
          DisplayLookUp: "descs,time_edit",
        },
        cValidate: "required",
        cName: "role",
        ckey: false,
        cOrder: 7,
        cProtect: false,
        cParentForm: "ADM_AddUserManagement",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "descs,time_edit",
        cInputStatus: this.inputStatus,
      },
      PI_job_title: {
        cValidate: "required",
        cName: "job_title",
        cOrder: 6,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "ADM_AddUserManagement",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_notes: {
        cValidate: "",
        cName: "notes",
        cOrder: 8,
        cKey: false,
        cProtect: false,
        cResize: false,
        cReadonly: false,
        cRows: 1,
        cMaxRows: 3,
        cSize: "md",
        cParentForm: "ADM_AddUserManagement",
        cInputStatus: this.inputStatus,
      },
      M_UserManagement: {
        user_name: this.getDataUser().user_name,
        user_id: "",
        customer_name: "",
        phone_no_1: this.getDataUser().phone_country_code,
        phone_no_1Label: this.getDataUser().phone_country_code,
        phone_no_2: "",
        address: "",
        email: "",
        password: "",
        confirm_password: "",
        role: "",
        roleLabel: "",
        job_title: "",
        is_inactive: "N",
        notes: "",
        user_level: "S",
        file_logo: "",
        file_show: require("@/assets/default_photo_.png"),
        file_logo_name: "",
        file_logo_path: "",
        lastupdatestamp: "",
      },
      default_pic: require("@/assets/default_photo_.png"),
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
  },
  methods: {
    Onphone_no_1Change(data) {
      this.$nextTick(() => {
        this.M_UserManagement.phone_no_1 = data.id;
        this.M_UserManagement.phone_no_1Label = data.id;
      });
    },
    onlogoChange(data) {
      this.M_UserManagement.file_logo_name = data.name;
      this.M_UserManagement.file_logo_path = data.path;
      this.M_UserManagement.file_show = this.url + data.path;
    },
    doBack() {
      this.$router.go(-1);
    },
    M_ClearForm() {
      this.M_UserManagement = {
        user_name: this.getDataUser().user_name,
        user_id: "",
        customer_name: "",
        phone_no_1: this.getDataUser().phone_country_code,
        phone_no_1Label: this.getDataUser().phone_country_code,
        phone_no: "",
        address: "",
        email: "",
        password: "",
        confirm_password: "",
        role: "",
        roleLabel: "",
        job_title: "",
        notes: "",
        is_inactive: "N",
        user_level: "S",
        file_logo: "",
        file_show: this.default_pic,
        file_logo_name: "",
        file_logo_path: "",
      };
    },
    OnpasswordChange(data) {
      this.PI_confirm_password.cValidate = "confirmed:" + data;
    },
    OnroleChange(data) {
      this.$nextTick(() => {
        this.M_UserManagement.role = data.id;
        this.M_UserManagement.roleLabel = data.label;
      });
    },
    doSave() {
      this.$validator._base
        .validateAll("ADM_AddUserManagement")
        .then((result) => {
          if (!result) return;
          this.alertConfirmation("Are You Sure Want To Save This Data ?").then(
            (ress) => {
              if (ress.value) {
                this.$validator.errors.clear("ADM_AddUserManagement");
                if (this.inputStatus == "edit") {
                  this.M_Update();
                } else {
                  this.M_Save();
                }
              }
            }
          );
        });
    },
    M_Save() {
      var param = {
        ss_portfolio_id: 0,
        ss_subportfolio_id: 0,
        user_id: this.M_UserManagement.user_id,
        ss_group_id: this.M_UserManagement.role,
        user_name: this.M_UserManagement.customer_name,
        address: this.M_UserManagement.address,
        password: this.M_UserManagement.password,
        email: this.M_UserManagement.email,
        user_level: this.M_UserManagement.user_level,
        hand_phone:
          this.M_UserManagement.phone_no_1 +
          "-" +
          this.M_UserManagement.phone_no_2,
        file_name: this.M_UserManagement.file_logo_name,
        path_file: this.M_UserManagement.file_logo_path,
        notes: this.M_UserManagement.notes,
        job_title: this.M_UserManagement.job_title,
        is_inactive: this.M_UserManagement.is_inactive,
        user_input: this.getDataUser().user_id,
        user_type: "E",
      };

      this.postJSON(this.getUrlAPIUser(), param).then((response) => {
        // console.log(response)
        if (response == null) return;
        var param = {
          row_id: response.Data.row_id,
        };
        this.$store.commit("setParamPage", param);
        this.$router.replace({ path: "/ADM/ADM_UserManagement/View" });
      });
    },
    GetDataBy() {
      var param = {
        id: this.paramFromList.row_id,
        lastupdatestamp: 0,
      };

      this.getJSON(this.getUrlAPIUser(this.paramFromList.row_id), param).then(
        (response) => {
          // response from API
          if (response == null) return;

          var data = response.Data;

          this.PI_user_id.cProtect = true;

          let phone_no =
            data.hand_phone && data.hand_phone !== ""
              ? data.hand_phone.split("-")
              : "";

          this.M_UserManagement = {
            user_name: this.getDataUser().user_name,
            ss_user_id: data.ss_user_id,
            user_id: data.user_id,
            customer_name: data.user_name,
            phone_no_1: phone_no !== "" ? phone_no[0] : phone_no,
            phone_no_1Label: phone_no !== "" ? phone_no[0] : phone_no,
            phone_no_2: phone_no !== "" ? phone_no[1] : phone_no,
            address: data.address,
            email: data.email,
            password: "",
            confirm_password: "",
            role: data.ss_group_id,
            roleLabel: data.group_descs,
            job_title: data.job_title,
            notes: data.notes,
            user_level: data.user_level,
            file_logo: data.file_name,
            file_show:
              data.path_file && data.path_file !== ""
                ? this.url + data.path_file
                : this.default_pic,
            file_logo_name: data.file_name,
            file_logo_path: data.path_file,
            is_inactive: data.is_inactive,
          };
        }
      );
    },
    M_Update() {
      var param = {
        ss_portfolio_id: this.getDataUser().portfolio_id,
        ss_subportfolio_id: this.getDataUser().subportfolio_id,
        ss_user_id: this.M_UserManagement.ss_user_id,
        user_id: this.M_UserManagement.user_id,
        ss_group_id: this.M_UserManagement.role,
        user_name: this.M_UserManagement.customer_name,
        address: this.M_UserManagement.address,
        password: this.M_UserManagement.password,
        email: this.M_UserManagement.email,
        user_level: this.M_UserManagement.user_level,
        hand_phone:
          this.M_UserManagement.phone_no_1 +
          "-" +
          this.M_UserManagement.phone_no_2,
        file_name: this.M_UserManagement.file_logo_name,
        path_file: this.M_UserManagement.file_logo_path,
        notes: this.M_UserManagement.notes,
        job_title: this.M_UserManagement.job_title,
        is_inactive: this.M_UserManagement.is_inactive,
        lastupdatestamp: 0,
        user_edit: this.getDataUser().user_id,
      };

      this.putJSON(this.getUrlAPIUser(), param).then((response) => {
        // console.log(response)
        if (response == null) return;
        this.doBack();
      });
    },
  },
  mounted() {
    this.M_ClearForm();
    if (this.inputStatus == "edit") {
      this.GetDataBy();
    }
  },
};
</script>

<style>
</style>