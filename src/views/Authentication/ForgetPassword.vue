<template>
  <div class="abs-login">
    <div class="abs-login__box-position-left">
      <div class="box-layer-form" style="width:100%;">
        <div class="row">
          <div class="column-left">
            <img :src="require('@/assets/acce_logo.png')" alt />
            <br />
            <span style="font-size:18px;color:hsl(0, 0%, 58%);">Transportation Management System</span>
          </div>
          <div class="column-right">
            <div class="box-layer-form">
              <div class="box-login-form">
                <b-form @submit.prevent="onSubmit">
                  <label style="font-size:14px !important;color:hsl(240, 49%, 41%);"><b>Forget Password ?</b></label><br />
                  
                  <label v-if="statusForgot === null" style="font-size:14px !important">To reset your account password, enter the email address you registered with and we'll send you instruction.</label>
                  <label v-else-if="statusForgot === 'T'" style="font-size:14px !important">We send verification OTP to your email address to verify your account please input the OTP below</label>
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
                      required
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
      fieldVerifyNewPassword: null,
      
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
      } else if (this.statusForgot == 'T') {
        this.validateOTP();
      } else if (this.statusForgot == 'P') {
        this.changePassword();
      }
    },
    forgotPassword() {
      let param = {
        email: this.fieldOne,
      };

      this.postJSON(this.getUrlForgotPassword(), param)
      .then((response) => {

        if (response == null) return
        this.alertSuccess('OTP has been successfully sent to email').then(() => {
          localStorage.statusForgot = 'T';
          this.statusForgot = 'T';
          this.fieldOne = null;
        });
      })
    },
    validateOTP() {
      let param = {
        OTP: this.fieldOne,
      };

      this.getJSON(this.getUrlValidateOTP(), param)
      .then((response) => {

        if (response == null) return
        this.alertSuccess('OTP Valid, Next change new password').then(() => {
          localStorage.userIdForgot = response.Data.user_id
          localStorage.statusForgot = 'P';
          this.statusForgot = 'P';
          this.fieldOne = null;
        });
      })
    },
    changePassword() {
      let param = {
        user_id: localStorage.getItem('userIdForgot'),
        new_password: this.fieldOne,
        confirm_password: this.fieldVerifyNewPassword,
      };

      this.postJSON(this.getUrlAuthChangePassword(), param)
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
  margin: unset;
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
