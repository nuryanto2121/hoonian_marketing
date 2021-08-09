<template>

  <div>
    <div
      class="header--top"
      id="header--top"
      :class="{ 'header--dark': classHeader }"
      :style="{ paddingLeft: paddingHeader }"
    >
      <!-- <span>
        <div class="pull--left" v-if="textMenu">
          <div class="header--top__tagline" @click="offText">
            <div
              style="border-radius: 5px;
                  background-color: rgb(74, 147, 179);
                  border: 0px;
                  height: 32px;
                  width: 42px;
                  margin-left: 8px"
            >
              <font-awesome-icon
                icon="bars"
                style="color: white;
                    margin-bottom: 3px;
                    margin-left: 12px;"
              />
            </div>
          </div>
        </div>
        <div class="pull--left" v-else>
          <div class="header--top__tagline" @click="onText">
            <div
              style="border-radius: 5px;
                  background-color: rgb(74, 147, 179);
                  border: 0px;
                  height: 32px;
                  width: 42px;
                  margin-left: 8px"
            >
              <font-awesome-icon
                icon="bars"
                style="color: white;
                    margin-bottom: 4px;
                    margin-left: 12px;"
              />
            </div>
          </div>
        </div>
      </span> -->
      
      <!-- 
        CATATAN:
        1. NO Static Mode dari <b-toast id="example-toast" static no-auto-hide> (DONE)
        2. no-auto-hide required (APPLIED)
        3. no-close-button required (APPLIED)
        4. adjust position ke top-left (IN PROGRESS)
        5. buat masukin gambar dan seluruh isinya (DONE)
        6. Adjust bentuk toast skala besarnya (IN PROGRESS)

      -->
      <div class="pull--left" >
        <!-- <div class="header--top__dashboard"> -->
          <b-icon-image class="mb-2" @click="showMenu">
            <img :src="require('@/assets/icon-svg/menu/dashboard.svg')" alt style="width: 80px; height: 35px; margin-top: 12px; cursor: pointer;" />
          </b-icon-image>
          <b-toast
            style="position: relative !important; z-index: 1000;"
            id="dashboard-toast" 
            static no-auto-hide no-close-button no-fade solid append-toast>

            <div>
              <b-row>
                <b-col :cols="isLogin()? 4: 6" :sm="isLogin()? 3: 6" class="dashboard-text">
                  <div
                    class="border border-gray"
                    style="margin: 10px; padding: 10px; cursor: pointer; margin-bottom: 5px !important;"
                    @click="showDashboard"
                  >
                    <img :src="require('@/assets/icon-svg/menu/dashboard.svg')" alt style="width: 30px; height: 30px;" />
                  </div>
                  <div>
                    Dashboard
                  </div>
                </b-col>

                <b-col v-if="!isLogin()" cols="6" sm="6" class="dashboard-text">
                  <div 
                    class="border border-gray"
                    style="margin: 10px; padding: 10px; cursor: pointer; margin-bottom: 5px !important;"
                    @click="login"
                  >
                    <img :src="require('@/assets/icon-svg/menu/logout.svg')" alt style="width: 30px; height: 30px;" />
                  </div>
                  <div>
                    Log In
                  </div>
                </b-col>

                <b-col v-if="isLogin()" cols="4" sm="3" class="dashboard-text">
                  <div 
                    class="border border-gray"
                    style="margin: 10px; padding: 10px; cursor: pointer; margin-bottom: 5px !important;"
                    @click="showSales"
                  >
                    <img :src="require('@/assets/icon-svg/menu/sales.svg')" alt style="width: 30px; height: 30px;" />
                  </div>
                  <div>
                    Sales
                  </div>
                </b-col>

                <b-col v-if="isLogin()" cols="4" sm="3" class="dashboard-text">
                  <div 
                    class="border border-gray"
                    style="margin: 10px; padding: 10px; cursor: pointer; margin-bottom: 5px !important;"
                    @click="showNUP"
                  >
                    <img :src="require('@/assets/icon-svg/menu/nup.svg')" alt style="width: 30px; height: 30px;" />
                  </div>
                  <div>
                    NUP
                  </div>
                </b-col>
                
                <b-col v-if="isLogin()" cols="4" sm="3" class="dashboard-text">
                  <div 
                    class="border border-gray"
                    style="margin: 10px; padding: 10px; cursor: pointer; margin-bottom: 5px !important;"
                    @click="showLead"
                  >
                    <img :src="require('@/assets/icon-svg/menu/lead.svg')" alt style="width: 30px; height: 30px;" />
                  </div>
                  <div>
                    Lead
                  </div>
                </b-col>
                <b-col v-if="isLogin()" cols="4" sm="3" class="dashboard-text">
                  <div 
                    class="border border-gray"
                    style="margin: 10px; padding: 10px; cursor: pointer; margin-bottom: 5px !important;"
                    @click="showVLaunching"
                  >
                    <img :src="require('@/assets/icon-svg/menu/virtual-machine.svg')" alt style="width: 30px; height: 30px;" />
                  </div>
                  <div>
                    V - Launching
                  </div>
                </b-col>
                <b-col v-if="isLogin()" cols="4" sm="3" class="dashboard-text">
                  <div 
                    class="border border-gray"
                    style="margin: 10px; padding: 10px; cursor: pointer; margin-bottom: 5px !important;"
                    @click="showReferral"
                  >
                    <img :src="require('@/assets/icon-svg/menu/referral.svg')" alt style="width: 30px; height: 30px;" />
                  </div>
                  <div>
                    Referral
                  </div>
                </b-col>
                <b-col v-if="isLogin()" cols="4" sm="3" class="dashboard-text">
                  <div 
                    class="border border-gray"
                    style="margin: 10px; padding: 10px; cursor: pointer; margin-bottom: 5px !important;"
                    @click="showToken"
                  >
                    <img :src="require('@/assets/icon-svg/menu/token.svg')" alt style="width: 30px; height: 30px;" />
                  </div>
                  <div>
                    Token
                  </div>
                </b-col>

                <b-col v-if="isLogin()" cols="4" sm="3" class="dashboard-text">
                  <div 
                    class="border border-gray"
                    style="margin: 10px; padding: 10px; cursor: pointer; margin-bottom: 5px !important;"
                    @click="showUser"
                  >
                    <img :src="require('@/assets/icon-svg/menu/user.svg')" alt style="width: 30px; height: 30px;" />
                  </div>
                  <div>
                    User
                  </div>
                </b-col>
              </b-row>

              <hr />

              <b-row v-if="isLogin()">
                <b-col cols="4" sm="3" class="dashboard-text">
                  <div 
                    class="border border-gray"
                    style="margin: 10px; padding: 10px; cursor: pointer; margin-bottom: 5px !important;"
                    @click="showProfile"
                  >
                    <img :src="require('@/assets/icon-svg/menu/profile.svg')" alt style="width: 30px; height: 30px;" />
                  </div>
                  <div>
                    Profile
                  </div>
                </b-col>

                <b-col cols="4" sm="3" class="dashboard-text">
                  <div 
                    class="border border-gray"
                    style="margin: 10px; padding: 10px; cursor: pointer; margin-bottom: 5px !important;"
                    @click="logout"
                  >
                    <img :src="require('@/assets/icon-svg/menu/logout.svg')" alt style="width: 30px; height: 30px;" />
                  </div>
                  <div>
                    Log Out
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-toast>
          <span v-if="backButton" style="color: #4A93B3; text-shadow: 0.5px 0px; font-size: 16px; margin-right: 15px;">
            <img :src="require('@/assets/icon-svg/back_button.svg')" alt style="margin-top: 12px; cursor: pointer;" @click="doBack" />
          </span>
          <p style="color: #4A93B3; text-shadow: 0.8px 0px; font-size: 20px; display: table-cell; vertical-align: middle; height: 60px;">
            {{titleMenu}}
          </p>
        <!-- </div> -->
      </div>

      <div class="pull--right">
        <!-- <div class="container-notif">
          <a class="dropdown-toggle count-info" data-toggle="dropdown" href="#" @click="chat">
            <font-awesome-icon
              class="icon-style-default"
              icon="comment-alt"
              size="sm"
              style="font-size: 15px;
                margin-right: 3px;
                margin-top: 8px;
                cursor: pointer;
                color: #999999;"
            />
            <span
              v-if="totalChat > 0"
              class="label label-primary notif"
              style="background-color: rgb(74, 147, 179) !important; border-radius: 10px !important;"
            >{{totalChat}}</span>
          </a>
        </div> -->

        <div class="header--top__info-subportfolio notranslate" style="">
          {{label}}
        </div>
        <div v-if="!isLogin()" class="container-notif" style="padding-top: 8px !important; padding-right: 0px !important; width: 120px; margin-right: 5px;">
          <b-row class="noPadding">
            <b-col>
              <!-- <span>
                <label class="lbl-poppins">{{ $t('language') }}</label>
              </span> <br>
              <span>
                <font-awesome-icon class="icon-style-default title-primary" icon="globe" /> &nbsp;
                <label class="title-primary">{{Model.lang_id == 'id' ? 'Indonesia' : "English"}}</label>
              </span> -->
              <HOODropDown
                @change="Onlang_idChange"
                :prop="PI_lang_id"
                v-model="Model.lang_id"
                :label="Model.lang_idLabel"
                ref="ref_lang_id"
              />
            </b-col>
          </b-row>
        </div>
        <div v-if="isLogin()" class="container-notif" style="padding-right: 30px !important;">
          <a
            class="dropdown-toggle count-info"
            data-toggle="dropdown"
            href="#"
            style="margin-top: 8px;"
            @click="notification()"
          >
            <i class="fa fa-bell" style="color: #999999;"></i>
            <span
              v-if="totalNotification > 0"
              class="label label-primary notif"
              style="background-color: rgb(74, 147, 179) !important; border-radius: 10px !important;"
            >{{totalNotification}}</span>
          </a>
        </div>
        <!-- <div class="header--top__profile-menu" @click="signOut" v-click-outside="closeHeader" style="margin-top: 10px;">
          <div class="avatar">
            <div class="image">
              <font-awesome-icon icon="sign-out-alt" style="color: #999999;" />
            </div>
          </div>
          <div class="information">
            <div class="username notranslate" title="EPRO">Logout</div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="dropdown-profile" v-if="dropdownMenuHeaderTop">
      <div class="dropdown-profile__list-menu">
        <div @click="showChangeSubportfolio()" class="list">
          <div class="title">
            <span>Change Sub Portfolio</span>
          </div>
          <div class="icon">
            <i class="icon-list"></i>
          </div>
        </div>
        <!-- <div v-b-modal.modal-language class="list">
          <div class="title">
            <span>Change Language</span>
          </div>
          <div class="icon">
            <i class="icon-film"></i>
          </div>
        </div>-->
        <div @click="changePassword" class="list">
          <div class="title">
            <span>Change Password</span>
          </div>
          <div class="icon">
            <i class="icon-key"></i>
          </div>
        </div>
        <div @click="myProfile" class="list">
          <div class="title">
            <span>My Profile</span>
          </div>
          <div class="icon">
            <i class="icon-user"></i>
          </div>
        </div>
        <div @click="signOut" class="list">
          <div class="title">
            <span>Sign Out</span>
          </div>
          <div class="icon">
            <i class="icon-logout"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="dropdown-profile" style="right:18% !important;" v-if="dropdownMenuFavorite">
      <div class="dropdown-profile__list-menu">
        <div v-for="(fm, index) in favoriteMenus" :key="index" @click="doCallMenu(fm)" class="list">
          <div class="title">
            <span>{{fm.text_menu}}</span>
          </div>
          <div class="icon">
            <i class="icon-star"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL CHANGE SUB PORTFLIO -->
    <b-modal
      id="modal-center"
      :hide-footer="true"
      :hide-header-close="true"
      ref="modalSubPortfolio"
      centered
      class="modal-customize-abs"
    >
      <b-container class="bv-example-row">
        <b-row>
          <b-col sm="12">
            <div class="modal-customize-abs__modal-header">
              <div class="modal-customize-abs__modal-header--title">Change Subportfolio</div>
              <div
                class="modal-customize-abs__modal-header--icon"
                @click="$refs.modalSubPortfolio.hide()"
              >
                <i class="icon-close"></i>
              </div>
            </div>
            <div class="modal-customize-abs__modal-body">
              <treeselect
                :multiple="false"
                :options="options"
                :clearable="false"
                placeholder="Select SubPortFolio"
                v-model="value"
              />
              <br />
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
    <!-- /.MODAL CHANGE SUB PORTFLIO -->

    <!-- MODAL CHANGE LANGUAGE -->
    <b-modal
      id="modal-language"
      :hide-footer="true"
      :hide-header-close="true"
      ref="modalChangeLanguage"
      centered
      class="modal-customize-abs"
    >
      <b-container class="bv-example-row">
        <b-row>
          <b-col sm="12">
            <div class="modal-customize-abs__modal-header">
              <div class="modal-customize-abs__modal-header--title">Change Language</div>
              <div
                class="modal-customize-abs__modal-header--icon"
                @click="$refs.modalChangeLanguage.hide()"
              >
                <i class="icon-close"></i>
              </div>
            </div>
            <div class="modal-customize-abs__modal-body">
              <div id="google_translate_element"></div>
              <!-- <ul class="box-languages">
                <li
                  v-for="(lang, index) in languages"
                  :key="index"
                  @click="handleChangeLang(lang.alias)"
                >
                  {{ lang.name }}
                </li>
              </ul>-->
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
    <!-- /.MODAL CHANGE LANGUAGE -->

    <simplert :useRadius="true" :useIcon="true" ref="simplert"></simplert>
    <ABSLoader />
  </div>
</template>

<script>

export default {
  mounted() {
    const data = this.getLanguageCommon();
    this.Model.lang_id = data.lang_id;
    this.Model.lang_idLabel = data.label;

    // comm: disini kamu ubah hideshow menunya, ternyata dikontrol dari menunya
    this.$store.dispatch("handlePaddingHeader", "0px");
    this.$store.dispatch("handlePaddingLeftContent", "0px");
    this.$store.dispatch("handleWidthSidebar", "0px");
    this.$store.dispatch("handleWidthRightbar", "0px");
    this.$store.dispatch("handleTextMenu", false);

    // this.$store.dispatch("handlePaddingHeader", "185px");
    // this.$store.dispatch("handlePaddingLeftContent", "180px");
    // this.$store.dispatch("handleWidthSidebar", "180px");
    // this.$store.dispatch("handleWidthRightbar", "0px");
    // this.$store.dispatch("handleTextMenu", true);

    // cek if user login or not
    switch(this.$route.path) {
      case "/":
      case "/MK/MK_ProjectDetailCommon":
      case "/MK/MK_AllProjectCommon":
      case "/MK/MK_AllPromotionCommon":
      case "/MK/MK_UnitTypeCommon":
      case "/MK/MK_FloorPlanCommon":
        break;
      default:
        this.$router.replace({
          path: "/sign-in"
        });
        return;
    }
    // this.$i18n.locale = this.getDataUser().language;
    // this.getAliasLanguage();

    // this.getSubportfolio();
    // console.log(this.getDataUser());
    this.value = this.getDataUser()? this.getDataUser().subportfolio_cd: "";
    this.label = this.getDataUser()? this.getDataUser().portfolio_short_name: "PT HOONIAN";
      // " - " +
      // this.getDataUser().subportfolio_short_name;
    // console.log(this.label);
    this.Username = this.getDataUser()? this.getDataUser().user_name: "";
    // this.$refs.ref_project.getData();
  },
  data() {
    return {
      isShowMenu: false,
      favoriteMenus: [],
      language: null,
      classHeader: false,
      languages: [
        {
          name: "Indonesia",
          alias: "id"
        },
        {
          name: "English",
          alias: "en"
        }
      ],
      dropdownMenuHeaderTop: false,
      dropdownMenuFavorite: false,
      // options: [{
      //           id: 'fruits',
      //           label: 'Fruits'
      //           }],
      options: [],
      value: null,
      statusValue: false,
      label: "",
      Username: "",
      totalChat: 0,
      totalNotification: 0,

      Model: {
        lang_id: "",
        lang_idLabel: "",
      },
      PI_lang_id: {
        dataLookUp: {
          url: "",
          param: {},
        },
        cValidate: "",
        cName: "Language",
        ckey: false,
        cOrder: 3,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: true,
        cOption: [
          {
            id: "id",
            label: "Indonesia",
          },
          {
            id: "en",
            label: "English",
          }
        ],
        cDisplayColumn: "",
        cInputStatus: "new",
        cStyle: "",
        cClearable: false,
      },
    };
  },
  created: async function() {
    if (!this.getDataUser()) return;

    await this.GetButtonStatus(
      this.getDataUser().portfolio_id,
      this.getDataUser().group_id,
      this.getDataUser().user_id,
      this.getOptionUrl()
    );
    this.getSumChatNotif();
    this.favoriteMenus = this.getShortcitMenu();
  },
  computed: {
    paddingHeader() {
      return this.$store.getters.paddingHeader;
    },
    textMenu() {
      return this.$store.getters.textMenu;
    },
    backButton() {
      return this.$store.getters.getBackButton;
    },
    titleMenu() {
      return this.$store.getters.getTitleMenu;
    },
  },
  watch: {
    value: function(newData, oldData) {
      if (oldData === null) {
        return;
      }
      if (this.statusValue) {
        this.statusValue = false;
        return;
      }

      if (newData != undefined) {
        this.changeSubPortFolio(newData, oldData);
      } else {
        this.statusValue = true;
        this.value = oldData;
        this.$forceUpdate();
      }
    },
    $route: async function(to, from) {
      // if (this.$route.path === "/") {
      //   this.classHeader = true;
      // } else {
      //   this.classHeader = false;
      // }

      // this.getSumChatNotif();
      // await this.GetButtonStatus(
      //   this.getDataUser().portfolio_id,
      //   this.getDataUser().group_id,
      //   this.getDataUser().user_id,
      //   this.getOptionUrl()
      // );
      
      this.closeMenu();
      this.$store.commit("setTitleMenu", "");

      if (this.$route.path === "/" || this.$route.path === "/MK_Dashboard") {
        this.$store.commit("setBackButton", false);
        return;
      }
      this.$store.commit("setBackButton", true);
    }
  },
  methods: {
    Onlang_idChange(data) {
      this.Model.lang_id = data.id;
      this.Model.lang_idLabel = data.label;
      this.setLanguageCommon();
      location.reload();
    },
    isLogin() {
      return this.getDataUser()? true: false;
    },
    showMenu() {
      if (this.isShowMenu) {
        this.closeMenu();
      } else {
        this.$bvToast.show('dashboard-toast');
      }
      this.isShowMenu = !this.isShowMenu;
    },
    closeMenu() { 
      this.$bvToast.hide('dashboard-toast');
    },
    showDashboard() {
      this.$router.push("/");
    },
    showSales() {
      this.$router.push({ name: "MK_Sales" });
    },
    showNUP() {
      this.$router.push({ name: "MK_NUP" });
    },
    showLead() {
      this.$router.push({ name: "MK_SalesLead" });
    },
    showVLaunching() {
      this.$router.push({ name: "MK_VirtualLaunching" });
    },
    showReferral() {
      this.$router.push({ name: "MK_Referral" });
    },
    showToken() {
      this.$router.push({ name: "MK_Token" });
    },
    showUser() {
      this.$router.push({ name: "MK_User" });
    },
    showProfile() {
      this.$router.push({ name: "MK_Profile" });
    },
    logout() {
      this.signOut();
    },
    login() {
      this.$router.replace({
        path: "/sign-in"
      });
    },
    onNewMenu() {},
    getSumChatNotif() {
      var param = {
        option_function_cd: "GetSumChatNotif",
        module_cd: "SS",
        ss_portfolio_id: this.getDataUser().portfolio_id,
        user_id: this.getDataUser().user_id,
      };

      this.CallFunction(param).then((response) => {
        if (response == null) return;
        let data = response.Data[0];
        this.totalChat = data.v_chat;
        this.totalNotification = data.v_notif;
      });
    },
    notification() {
      this.$router.push("/Notification");
    },
    chat() {
      this.$router.push("/SS/SS_Chat");
    },
    onText() {
      this.$store.dispatch("handlePaddingHeader", "185px");
      this.$store.dispatch("handlePaddingLeftContent", "180px");
      this.$store.dispatch("handleWidthSidebar", "180px");
      this.$store.dispatch("handleWidthRightbar", "0px");
      this.$store.dispatch("handleTextMenu", true);
      // this.$store.commit('setHideSideMenu', true)
    },
    offText() {
      this.$store.dispatch("handlePaddingHeader", "0px");
      this.$store.dispatch("handlePaddingLeftContent", "0px");
      this.$store.dispatch("handleWidthSidebar", "0px");
      this.$store.dispatch("handleWidthRightbar", "0px");
      this.$store.dispatch("handleTextMenu", false);
      // this.$store.commit('setHideSideMenu', false)
    },
    showChangeSubportfolio() {
      // this.statusValue = true
      this.value = this.getDataUser().subportfolio_cd;
      this.$refs.modalSubPortfolio.show();
    },
    getAliasLanguage() {
      var lang = this.getDataUser().language;
      var data = this.languages.filter(function(data) {
        return data.alias == lang;
      });
      this.language = data[0].name;
    },
    handleChangeLang(lang) {
      // set language to localStorage
      var lsDataUser = localStorage.lsDataUser;

      lsDataUser = JSON.parse(lsDataUser);
      lsDataUser.Language = lang;

      lsDataUser = JSON.stringify(lsDataUser);
      localStorage.lsDataUser = lsDataUser;

      this.getAliasLanguage();

      this.$i18n.locale = lang;
      this.$refs.modalChangeLanguage.hide();
      location.reload();
      // this.dropdownMenuHeaderTop = !this.dropdownMenuHeaderTop
    },
    getSubportfolio() {
      var param = {
        user_id: this.getDataUser().user_id
      };
      this.postEncode(this.getUrlSubportfolio(), param).then(response => {
        if (response == null) return;
        this.options = response.Data;
      });
    },
    changeSubPortFolio(subPortFolio, oldData) {
      this.$swal({
        title: "Confirmation",
        text: "Are you sure want to change subportfolio ?",
        // text: 'Are you sure want to change subportfolio to ' + subPortFolio + ' ?',
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then(result => {
        if (result.value) {
          var param = {
            UserId: this.getDataUser().user_id,
            SubPortfolioCd: this.value
          };
          this.postEncode(this.getUrlChangeSubportfolio(), param).then(
            response => {
              if (response == null) return;

              var data = response.Data;
              var dataUser = data.DataUser[0];

              var favoriteMenu = JSON.stringify(data.FavoriteMenu);
              var menu = JSON.stringify(data.Menu);

              // const session = {
              //   sessionId: data.Session_Id,
              //   sessionIdle: data.Idle
              // }
              // set language hardcode
              dataUser.Language = "en";
              localStorage.lsDataUser = JSON.stringify(dataUser);

              localStorage.lsShortcutMenu = favoriteMenu;
              localStorage.lsMenu = menu;
              this.$parent.$children[1].$children[2].changeFavMenu(
                favoriteMenu
              );
              this.label = this.getDataUser().label;
              // localStorage.lsSession = JSON.stringify(session)
              this.$router.push("/");
              this.$refs.modalSubPortfolio.hide();
            }
          );
          // this.dropdownMenuHeaderTop = !this.dropdownMenuHeaderTop
        } else {
          this.statusValue = true;
          this.value = oldData;
        }
      });
    },
    showError(title, message) {
      // Use sweetalert2
      this.$swal(title, message, "error");
    },
    signOut() {
      this.alertConfirmation("Are You Sure Want To Logout", "Confirm", "Cancel", "Logout")
      .then(ress => {
        if (ress.value) {
          var param = {
          UserLog: this.getDataUser().user_id
        };
        this.postEncode(this.getUrlLogout(), param).then(response => {
          if (response == null) return;
          // this.options = response.Data
          this.doClearLocalStorage();

          // push user to sign-in
          this.$router.replace({
            path: "/"
          });
          
          location.reload();
        });
        }
      })
    },
    // closeHeader () {
    //   alert('woi')
    // }
    closeHeader() {
      // alert('woi')
      this.dropdownMenuHeaderTop = false;
    },
    closeFavorite() {
      // alert('woi')
      this.dropdownMenuFavorite = false;
    },

    changePassword() {
      this.$router.push("/ChangePassword?oid=854baa156adec53293270ee476389a51");
    },

    myProfile() {
      this.$router.push(
        "/SS/SS_UserProfile?oid=b171ac8a2f20079b41434d2840272672"
      );
    }
  },
  // events: {
  //   // nameOfCustomEventToCall: function (event) {
  //   //   // do something - probably hide the dropdown menu / modal etc.
  //   // }
  //   closeHeader () {
  //     // this.dropdownMenuHeaderTop = !this.dropdownMenuHeaderTop
  //     alert('wio')
  //   }
  // }
  directives: {
    "click-outside": {
      bind: function(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== "function") {
          const compName = vNode.context.name;
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`;
          if (compName) {
            warn += `Found in component '${compName}'`;
          }

          // console.warn(warn);
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;

        // add Event Listeners
        document.addEventListener("click", handler);
      },

      unbind: function(el, binding) {
        // Remove Event Listeners
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    }
  }
};
</script>
<style>
/* .goog-te-banner-frame .skiptranslate {
    display: none !important;
  } */
.dashboard-text{
  text-align: center;
  font-size: 10px;
  color: #828282;
}

.goog-te-banner-frame {
  display: none !important;
}
body {
  top: 0px !important;
}
.container-notif {
  border-radius: 3px;
  float: left;
  display: block;
  padding: 12px 20px 0px 0px;
  min-height: 45px;
  position: relative;
}
.notif {
  top: 9px;
  right: 8px;
  position: absolute;
  padding: 3px 5px !important;
  font-size: 11px !important;
}
.count-info {
  display: inline-flex;
}
.dropdown-menu {
  border: medium none;
  border-radius: 3px;
  box-shadow: 0 0 3px rgba(86, 96, 117, 0.7);
  display: none;
  float: left;
  font-size: 12px !important;
  left: 0;
  list-style: none outside none;
  padding: 0;
  position: absolute;
  text-shadow: none;
  top: 100%;
  z-index: 1000;
}
.dropdown-menu-left {
  right: 0 !important;
  left: auto !important;
}
.dropdown-messages,
.dropdown-alerts {
  padding: 10px 10px 10px 10px !important;
  width: 310px;
  min-height: 0;
}
.show {
  display: block;
}
.float-left {
  float: left !important;
}
.dropdown-item {
  display: block;
  width: auto;
  padding: 0.25rem 0.8rem;
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
}
.dropdown-messages-box {
  line-height: 1.5;
}
</style>

