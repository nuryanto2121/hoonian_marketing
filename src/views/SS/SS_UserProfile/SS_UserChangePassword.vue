<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>Change Password</span>
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
                :data-vv-scope="'SS_ChangePassword'"
                :data-vv-value-path="'SS_ChangePassword'"
              >
                <b-row align-v="center">
                  <b-col md="2" align="center">
                    <font-awesome-icon style="color: rgb(74, 147, 179);" icon="key" size="6x" />
                  </b-col>
                  <b-col md="10">
                    <b-row>
                      <b-col>
                        <span>
                          <label>
                            <span style="color: red">*</span> Current Password
                          </label>
                        </span>
                        <ACCTextBox
                          :prop="PI_current_password"
                          v-model="currentPassword"
                          ref="ref_current_password"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <span>
                          <label><span style="color: red">*</span> New Password</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_new_password"
                          v-model="newPassword"
                          ref="ref_new_password"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <span>
                          <label><span style="color: red">*</span> Confirm Password</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_confirm_password"
                          v-model="confirmPassword"
                          ref="ref_confirm_password"
                        />
                      </b-col>
                    </b-row>

                    <b-row style="margin-top: 10px;">
                      <b-col>
                        <ABSButton
                          :text="'Save '"
                          classButton="btn btn--default"
                          classIcon="icon-style-default"
                          @click="doSave"
                          styleButton="height: 40px;width: 100%;"
                        />
                      </b-col>
                    </b-row>
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
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",

      PI_current_password: {
        cValidate: "required|max:100",
        cName: "current_password",
        cOrder: 1,
        cKey: false,
        cType: "password",
        cProtect: false,
        cParentForm: "SS_ChangePassword",
      },
      PI_new_password: {
        cValidate: "required|max:100",
        cName: "new_password",
        cOrder: 1,
        cKey: false,
        cType: "password",
        cProtect: false,
        cParentForm: "SS_ChangePassword",
      },
      PI_confirm_password: {
        cValidate: "required|max:100",
        cName: "cofirm_password",
        cOrder: 1,
        cKey: false,
        cType: "password",
        cProtect: false,
        cParentForm: "SS_ChangePassword",
      },
    };
  },
  computed: {
    paramFromList() {
      var param = this.$store.getters.getParamPage;
      return param;
    },
  },
  methods: {
    doBack() {
      this.$router.go(-1);
    },
    doSave() {
      this.$validator._base.validateAll("SS_ChangePassword").then((result) => {
        if (!result) return;
        this.alertConfirmation("Are You Sure Want To Save This Data ?").then(
          (ress) => {
            if (ress.value) {
              this.$validator.errors.clear("SS_ChangePassword");
              this.M_Save();
            }
          }
        );
      });
    },
    M_Save() {
      let param = {
        user_id: this.getDataUser().user_id,
        current_password: this.currentPassword,
        new_password: this.newPassword,
        confirm_password: this.confirmPassword,
      };

      this.postJSON(this.getUrlSSUserChangePassword(), param).then(response => {
        if (response == null) return;

        this.doClearLocalStorage()
        this.$router.replace({
          path: '/sign-in'
        })
      });
    },
  },
  mounted() {
  },
};
</script>

<style>
</style>