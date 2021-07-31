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
                  
                  <label v-if="statusForgot === null" style="font-size:14px !important">To reset your account password, enter the email address {{isMobile() ? 'or phone number' : ''}} you registered with and we'll send you instruction.</label>
                  <label v-else-if="statusForgot === 'T'" style="font-size:14px !important">We send verification OTP to your email address {{isMobile() ? 'or phone number' : ''}} to verify your account please input the OTP below</label>
                  <label v-else-if="statusForgot === 'P'" style="font-size:14px !important">Please input new password</label>
                  
                  <div class="form-label-group">
                    <b-form-input
                      v-validate="statusForgot === null ? 'email' : ''"
                      v-model="fieldOne"
                      v-bind:data-vv-name="'fieldOne'"
                      :type="statusForgot === null ? 'email' : (statusForgot === 'P' ? 'password' : 'text')"
                      id="inputOne"
                      class="form-control input-field"
                      :placeholder="statusForgot === null ? textRegisteredEmail :
                        (statusForgot == 'T' ? textInputToken : textNewPassword)"
                      autofocus
                      autocomplete="off"
                      style="height:50px;border-radius:8px !important;font-size:14px !important;font-weight:400;margin-bottom:12px;"
                    />
                    <span v-show="errors.has('fieldOne')"
                      class="error-span">{{ errors.first('fieldOne') }}
                    </span>
                  </div>
                  <div class="form-label-group" v-if="statusForgot === null && isMobile()">
                    <b-form-input
                      v-validate="''"
                      v-model="fieldTwo"
                      v-bind:data-vv-name="'fieldTwo'"
                      :type="'tel'"
                      id="inputTwo"
                      class="form-control input-field"
                      :placeholder="'Registered Phone Number'"
                      autocomplete="off"
                      maxlength="15"
                      @keypress.native="formatNumber"
                      style="height:50px;border-radius:8px !important;font-size:14px !important;font-weight:400;margin-bottom:12px;"
                    />
                    <span v-show="errors.has('fieldTwo')"
                      class="error-span">{{ errors.first('fieldTwo') }}
                    </span>
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
    formatNumber(evt){
      evt = (evt) ? evt : window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode

      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && (charCode !== 43)) {
        evt.preventDefault()
      }
      // else if(charCode == 46){
      //   // if (this.prop.cType == 'numeric' || this.prop.cType == 'tel') {
      //   if (this.prop.cType == 'tel') {
      //     evt.preventDefault()
      //   }
      //   else {
      //     var str = this.value
      //     if(str.indexOf('.') !== -1){
      //       evt.preventDefault()
      //     }
      //     else {
      //       return true
      //     }
      //   }
      // }
      else if (charCode == 43) {
          if (this.prop.cType !== 'tel' && this.prop.cType !== 'text') {
              evt.preventDefault()
          }
          else if(this.prop.cType == 'tel') {
              var str = this.value
              if(str.indexOf('+') !== -1){
                  evt.preventDefault()
              }
              else {
                  return true
              }
          }
      }
      else if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8 || charCode == 32) {
        evt.preventDefault()
      }
      else if (charCode == 13) {
        this.$emit('onEnterPress', this.value)
        evt.preventDefault()
      }
      else {
        return true
      }
    },
    onSubmit() {
      if (this.statusForgot == null) {
        // this.forgotPassword();
        if ((this.fieldOne && this.fieldOne !== '') || (this.fieldTwo && this.fieldTwo !== '')) {
          this.alertConfirmation("Are You Sure Want To Process This Data ?").then(
            (ress) => {
              if (ress.value) {
                this.forgotPassword();
              }
            }
          );
        }
        else {
          this.alertInfo("Please Input Email or Phone Number");
        }
      } else if (this.statusForgot == 'T') {
        this.alertConfirmation("Are You Sure Want To Process This Data ?").then(
          (ress) => {
            if (ress.value) {
              this.validateOTP();
            }
          }
        );
      } else if (this.statusForgot == 'P') {
        this.alertConfirmation("Are You Sure Want To Process This Data ?").then(
          (ress) => {
            if (ress.value) {
              this.changePassword();
            }
          }
        );
      }
    },
    forgotPassword() {
      let param = {
        handphone: this.fieldTwo ? this.fieldTwo : "",
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

    this.$validator.extend('email', {
      getMessage (field, val) {
        // return 'The ' + field + ' field must more than 0.'
        return "The Email Format is Incorrect."
      },
      validate (value, field) {
        // console.log(value, field)
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        return re.test(value);
      }
    })
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
