<template>
  <div class="abs-login">
    <div class="abs-login__box-position-left">
      <div class="box-layer-form" style="width:100%;">
        <div class="row">
          <div class="column-left">
            <template v-if="isMobile()">
              <div style="text-align: center; width: 100%; margin-bottom: 20px;" class="wrapper-forgetpass">
                <img :src="require('@/assets/logo_hoonian2.svg')" alt style="width: 90%;" />
              </div>
            </template>
            <template v-else>
              <div style="text-align: center; width: 100%">
                <img :src="require('@/assets/logo_hoonian2.svg')" alt style="width: 90%;" />
              </div>
            </template>
          </div>
          <div class="column-right wrapper-col-right">
            <div class="box-layer-form">
              <div class="box-login-form">
                <b-form @submit.prevent="onSubmit">
                  <label style="font-size:14px !important;color:hsl(240, 49%, 41%);"><b>Forget Password ?</b></label><br />
                  
                  <label v-if="statusForgot === null" style="font-size:14px !important">To reset your account password, enter the email address or phone number you registered with and we'll send you instruction.</label>
                  <label v-else-if="statusForgot === 'T'" style="font-size:14px !important">We send verification OTP to your email address or phone number to verify your account please input the OTP below</label>
                  <label v-else-if="statusForgot === 'P'" style="font-size:14px !important">Please input new password</label>
                  
                  <div class="form-label-group">
                    <input
                      v-model="fieldOne"
                      :type="statusForgot === 'P' ? 'password': 'text'"
                      id="inputOne"
                      class="form-control input-field"
                      :placeholder="statusForgot === null ? textRegisteredEmail :
                        (statusForgot == 'T' ? textInputToken : textNewPassword)"
                      autofocus
                      autocomplete="off"
                      style="height:50px;border-radius:8px !important;font-size:14px !important;font-weight:400;margin-bottom:12px;"
                    />
                  </div>
                  <div class="form-label-group" v-if="statusForgot === null">
                    <input
                      v-model="fieldTwo"
                      :type="tel"
                      id="inputTwo"
                      class="form-control input-field"
                      :placeholder="'Registered Phone Number'"
                      autocomplete="off"
                      style="height:50px;border-radius:8px !important;font-size:14px !important;font-weight:400;margin-bottom:12px;"
                    />
                  </div>
                  <div class="form-label-group" v-if="statusForgot == 'P'">
                    <input
                      v-model="fieldVerifyNewPassword"
                      type="password"
                      id="inputPassword"
                      class="form-control input-field"
                      :placeholder="textVerifyNewPassword"
                      autofocus
                      autocomplete="off"
                      style="height:50px;border-radius:8px !important;font-size:14px !important;font-weight:400;margin-bottom:12px;"
                      required
                    />
                  </div>
                  <button
                    class="btn btn-big btn-block"
                    style="background-color: rgb(74, 147, 179);height:50px;color:white;border-radius:8px;font-size:14px !important;margin-bottom:5px;"
                    type="submit"
                  >Submit</button>
                  <div style="text-align:right;">
                    <span class="forgot-password">Back to </span>
                    <label
                      @click="doBack"
                      for
                      style="font-size:14px !important;color:hsl(240, 49%, 41%); cursor: pointer !important;"
                    >Sign in</label>
                  </div>
                </b-form>
              </div>
            </div>
          </div>
          <ABSLoader />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// statusForgot
// T=> user sudah dikirim email.. status terakhir user tinggal input OTP
// P=> user sudah input OTP.. status terakhir user tinggal input new password & verify new password
export default {
  data() {
    return {
      statusForgot: null,
      fieldOne: null,
      fieldTwo: null,
      fieldVerifyNewPassword: null,
      mobile_app_user_id: null,
      
      textRegisteredEmail: 'Registered Email Address',
      textInputToken: 'Input OTP',
      textNewPassword: 'New Password',
      textVerifyNewPassword: 'Verify New Password',
    };
  },
  mounted() {
  },
  methods: {
    doBack() {
      this.$router.go(-1);
    },
    onSubmit() {
      if (this.statusForgot == null) {
        this.forgotPassword();
        // if ((this.fieldOne && this.fieldOne !== '') || (this.fieldTwo && this.fieldTwo !== '')) {
        //   this.forgotPassword();
        // }
        // else {
        //   this.alertInfo("Please Input Email or Phone Number");
        // }
      } else if (this.statusForgot == 'T') {
        this.validateOTP();
      } else if (this.statusForgot == 'P') {
        this.changePassword();
      }
    },
    forgotPassword() {
      let param = {
        handphone: this.fieldTwo,
        email: this.fieldOne
      };

      this.postJSON(this.getUrlHoonianForgotPassword(), param)
      .then((response) => {

        if (response == null) return
        this.alertSuccess('OTP has been successfully sent to email or phone number').then(() => {
          localStorage.mobile_app_user_id = response.message.mobile_app_user_id;
          localStorage.statusForgot = 'T';
          this.mobile_app_user_id = response.message.mobile_app_user_id;
          this.statusForgot = 'T';
          this.fieldOne = null;
          this.fieldTwo = null;
        });
      })
    },
    validateOTP() {
      let param = {
        otp: this.fieldOne,
        mobile_app_user_id: this.mobile_app_user_id
      };

      this.getJSON(this.getUrlHoonianValidateOTP(), param)
      .then((response) => {

        if (response == null) return
        this.alertSuccess('OTP Valid, Next change new password').then(() => {
          localStorage.otp = this.fieldOne;
          localStorage.userIdForgot = response.Data.user_id;
          localStorage.statusForgot = 'P';
          this.statusForgot = 'P';
          this.fieldOne = null;
        });
      })
    },
    changePassword() {
      let param = {
        // user_id: localStorage.getItem('userIdForgot'),
        // new_password: this.fieldOne,
        // confirm_password: this.fieldVerifyNewPassword,
        new_pass: this.fieldOne,
        mobile_app_user_id: this.mobile_app_user_id,
        otp: localStorage.otp
      };

      this.postJSON(this.getUrlHoonianChangePassword(), param)
      .then((response) => {

        if (response == null) return
        this.alertSuccess('Change password successfully').then(() => {
          localStorage.clear();
          this.doBack();
        });
      })
    },
  },
  created() {
    this.statusForgot = localStorage.statusForgot == undefined ? null : localStorage.statusForgot
    this.mobile_app_user_id = localStorage.mobile_app_user_id == undefined ? null : localStorage.mobile_app_user_id
  }
};
</script>

<style scoped>
.vue-treeselect__control {
  border-radius: 0px;
}
* {
  box-sizing: border-box;
}

/* Create two equal columns that floats next to each other */
.column-left {
  text-align: center;
  float: right;
  width: 50%;
  padding: 10px;
  /* height: 250px; Should be removed. Only for demonstration */
}

.column-right {
  float: left;
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 384px;
  /* margin-right: 5% !important;
  margin-left: 5% !important; */
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
  }
}
</style>
