<template>
  <div class="abs-login">
    <div class="abs-login__box-position-left" style="background: rgb(74, 147, 179);">
      <div class="box-layer-form" style="width:100%; height: 70%; margin-right: 20px; top: 100px; position: absolute;">
        <div class="row" style="height: 100%;">
          <!-- <div class="col">
            
          </div> -->
          <div class="col" style="background-color: #FFFF; border-bottom-right-radius: 100px; padding-top: 50px;">
            <div class="box-layer-form">
                <div style="text-align: center; width: 100%">
                    <img :src="require('@/assets/logo_hoonian2.svg')" alt style="width: 90%;" />
                </div>
              <div class="box-login-form" style="margin: 20px 25px 0 25px;">
                <b-form @submit.prevent="onSubmit">
                <span>
                    <label class="lbl-poppins">{{ $t('username') }}</label>
                </span>
                  <div class="form-label-group text-field-position">
                    <input
                      v-model="userName"
                      type="text"
                      id="inputUsername"
                      class="form-control clear-input"
                      placeholder="Username"
                      autofocus
                      style="height:50px;border-radius:8px !important;font-size:14px !important;font-weight:400;margin-bottom:12px;"
                      required
                    />
                    <span @click="removeUserName">&times;</span>
                  </div>
                  <span>
                    <label class="lbl-poppins">{{ $t('password') }}</label>
                </span>
                  <div class="form-label-group text-field-position">
                    <input
                      v-model="passWord"
                      type="password"
                      id="inputPassword"
                      class="form-control clear-input"
                      placeholder="Enter Password"
                      autocomplete="off"
                      style="height:50px;border-radius:8px !important;font-size:14px !important;font-weight:400;margin-bottom:12px;"
                      required
                    />
                    <span @click="removePassword">&times;</span>
                  </div>
                  <div v-if="captchaTxt">
                    <label
                      style="text-align: center; width: 100%; background-color: cadetblue; border-radius: 5px;"
                      for="captcha"
                    >{{captcha}}</label>
                    <input
                      v-model="captCha"
                      type="text"
                      id="inputCaptcha"
                      class="form-control"
                      placeholder="input captcha"
                      autocomplete="off"
                      style="height:50px;border-radius:8px !important;font-size:14px !important;font-weight:400;margin-bottom:12px;"
                      required
                    />
                  </div>
                  <button
                    class="btn btn-big btn-block"
                    style="background-color: rgb(74, 147, 179);height:50px;color:white;border-radius:8px;font-size:18px !important;margin-bottom:15px;font-weight: bold;"
                    type="submit"
                  >Login</button>
                  <div class="forgot-password" style="text-align:center;">
                    <label
                      @click="showForForgetPassword"
                      for
                      style="font-size:14px !important;color: rgb(74, 147, 179); cursor: pointer !important;"
                    >Forgot Password</label>
                  </div>
                </b-form>
              </div>
            </div>
          </div>
          <!-- <div class="column-left">
            <img :src="require('@/assets/logo_hoonian2.svg')" alt style="width: 450px;" />
          </div> -->
          <!-- <div class="column-right">
            <div class="box-layer-form">
              <div class="box-login-form">
                <b-form @submit.prevent="onSubmit">
                  <div class="form-label-group text-field-position">
                    <input
                      v-model="userName"
                      type="text"
                      id="inputUsername"
                      class="form-control clear-input"
                      placeholder="Username"
                      autofocus
                      style="height:50px;border-radius:8px !important;font-size:14px !important;font-weight:400;margin-bottom:12px;"
                      required
                    />
                    <span @click="removeUserName">&times;</span>
                  </div>
                  <div class="form-label-group text-field-position">
                    <input
                      v-model="passWord"
                      type="password"
                      id="inputPassword"
                      class="form-control clear-input"
                      placeholder="Password"
                      autocomplete="off"
                      style="height:50px;border-radius:8px !important;font-size:14px !important;font-weight:400;margin-bottom:12px;"
                      required
                    />
                    <span @click="removePassword">&times;</span>
                  </div>
                  <div v-if="captchaTxt">
                    <label
                      style="text-align: center; width: 100%; background-color: cadetblue; border-radius: 5px;"
                      for="captcha"
                    >{{captcha}}</label>
                    <input
                      v-model="captCha"
                      type="text"
                      id="inputCaptcha"
                      class="form-control"
                      placeholder="input captcha"
                      autocomplete="off"
                      style="height:50px;border-radius:8px !important;font-size:14px !important;font-weight:400;margin-bottom:12px;"
                      required
                    />
                  </div>
                  <button
                    class="btn btn-big btn-block"
                    style="background-color: rgb(74, 147, 179);height:50px;color:white;border-radius:8px;font-size:14px !important;margin-bottom:5px;"
                    type="submit"
                  >Sign In</button>
                  <div class="forgot-password" style="text-align:center;">
                    <label
                      @click="showForForgetPassword"
                      for
                      style="font-size:14px !important;color: rgb(74, 147, 179); cursor: pointer !important;"
                    >Forget Password ?</label>
                  </div>
                </b-form>
              </div>
            </div>
          </div> -->
          <ABSLoader />
        </div>
        <!-- <div class="row">
          <div class="col" style="background-color: #FFFF; border-bottom-right-radius: 30%; padding-top: 50px;">
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: null,
      passWord: null,
      rememberMe: false,
      captchaTxt: false,
      captcha: "",
      captCha: ""
    };
  },
  mounted() {
    // clear cookies
    // document.cookie = ""
    // jika dia mau sign-in sedangkan datanya masih ada di localStorage maka push ke dashboard
    if (this.getDataUser() != undefined) {
      this.$router.replace({
        path: "/"
      });
    } else {
      var cookies = document.cookie.split(";");
      if (cookies == "") {
        return;
      }
      for (var i = 0; i < cookies.length; i++) {
        var x = cookies[i].split("=");

        if (x[0].trim() == "username") {
          this.userName = x[1];
        } else if (x[0].trim() == "password") {
          this.passWord = x[1];
        }
      }
      if (this.userName != null || this.passWord != null) {
        this.rememberMe = true;
      }
    }
  },
  methods: {
    removeUserName() {
      this.userName = "";
    },
    removePassword() {
      this.passWord = "";
    },
    showForForgetPassword() {
      this.$router.push("/forget-password");
    },
    onSubmit() {
      this.$store.commit("setStatusLoader", true);

      let param = {
        UserLog: this.userName,
        PassLog: this.passWord,
        Captcha: this.captCha
      };

      axios
        .post(this.getUrlLogin(), param, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        })
        .then(response => {
          // console.log(response)
          this.$store.commit("setStatusLoader", false);
          this.doClearLocalStorage();

          var responses = response.data;
          var error = responses.Error;
          var message = responses.Message;

          var data = responses;

          var dataUser = data.Data.data_user;

          // document.cookie = "googtrans=/en/" + dataUser.default_language;

          if (this.rememberMe) {
            var dataCookie = "username=" + this.userName; // + '; path=/sign-in' + ''
            document.cookie = dataCookie;

            dataCookie = "password=" + this.passWord; // + '; path=/sign-in' + ''
            document.cookie = dataCookie;
          }

          var favoriteMenu = JSON.stringify(data.Data.shorcut_menu);
          var menu = JSON.stringify(data.Data.menu);

          const session = {
            Session_Id: data.Data.token,
            sessionIdle: data.Data.idle
          };

          // set language hardcode
          // dataUser.language = "en";

          localStorage.lsDataUser = JSON.stringify(dataUser);

          localStorage.lsShortcutMenu = favoriteMenu;
          localStorage.lsMenu = menu;

          localStorage.lsSession = JSON.stringify(session);

          this.$router.push("/MK_Dashboard");
          location.reload();
          // }
        })
        .catch(err => {
          this.$store.commit("setStatusLoader", false);
          this.alertError(err.response.data.Message);

          this.captcha = err.response.data.Data.Captcha;

          if (this.captcha == "" || this.captcha == undefined) {
            this.captchaTxt = false;
          } else {
            this.captchaTxt = true;
          }
        });
    },
  }
};
</script>

<style scoped>
/* .btn-login {
  background-color: #55b3ff;
  color: #ffffff;
} */
.vue-treeselect__control {
  border-radius: 0px;
}
/* ::placeholder {
  color: white !important;
} */

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

.clear-input {
  display: inline-block;
  height: 50px;
  width: 100%;
  font-size: 15px;
  color: #666666;
  padding-right: 2rem;
}

.text-field-position {
  position: relative;
}

.text-field-position span {
  position: absolute;
  right: 1em;
  top: 0;
  bottom: 0;
  line-height: 50px;
  cursor: pointer;
}

.lbl-poppins {
  font-family: Poppins !important;
  font-size: 15px;
  font-weight: bold;
  color: rgb(74, 147, 179);
}
</style>
