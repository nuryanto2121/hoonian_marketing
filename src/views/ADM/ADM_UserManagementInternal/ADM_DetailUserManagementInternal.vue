<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important">
                  <span>Detail User Management Internal</span>
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
                :data-vv-scope="'MK_AddQuotation'"
                :data-vv-value-path="'MK_AddQuotation'"
              >
                <b-row>
                  <b-col md="2" style="text-align: center">
                    <div>
                      <img :src="M_UserManagement.path_file" alt width="100%" />
                    </div>
                  </b-col>
                  <b-col md="10">
                    <b-row>
                      <b-col md="12">
                        <b-row>
                          <b-col>
                            <span>
                              <label style="font-size: 15px; color: blue">{{
                                M_UserManagement.user_name
                              }}</label>
                            </span>
                          </b-col>
                          <b-col style="text-align: right">
                            <span>
                            </span>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col
                            style="max-width: max-content !important; margin-right: 20px; padding-bottom: 5px"
                            class="row-view"
                          >
                            <span>
                              <label style="margin-bottom: 0px !important;">Status</label>
                            </span>
                            <br />
                            <span style="color: #999999;">{{ M_UserManagement.is_inactive }}</span>
                          </b-col>
                          <b-col
                            style="max-width: max-content !important; margin-right: 20px; padding-bottom: 5px"
                            class="row-view"
                          >
                            <span>
                              <label style="margin-bottom: 0px !important;">Handphone</label>
                            </span>
                            <br />
                            <span style="color: #999999;">{{ M_UserManagement.hand_phone }}</span>
                          </b-col>
                          <b-col
                            style="max-width: max-content !important; margin-right: 20px; padding-bottom: 5px"
                            class="row-view"
                          >
                            <span>
                              <label style="margin-bottom: 0px !important;">Address</label>
                            </span>
                            <br />
                            <span
                              style="color: #999999;"
                            >{{ M_UserManagement.fulladdress}}</span>
                          </b-col>
                          <b-col
                            style="max-width: max-content !important; margin-right: 20px; padding-bottom: 5px"
                            class="row-view"
                          >
                            <span>
                              <label style="margin-bottom: 0px !important;">Role</label>
                            </span>
                            <br />
                            <span style="color: #999999;">{{ M_UserManagement.role }}</span>
                          </b-col>
                          <b-col style="text-align: right;">
                            {{M_UserManagement.user_name_label}} <br>
                            {{momentDateFormatting(new Date(M_UserManagement.time_edit), "DD MMM YYYY")}}
                          </b-col>
                        </b-row>

                        <b-row>
                          <b-col
                            style="max-width: max-content !important; margin-right: 20px; padding-bottom: 5px"
                            class="row-view"
                          >
                            <span>
                              <label style="margin-bottom: 0px !important;">Email</label>
                            </span>
                            <br />
                            <span style="color: #999999;">{{ M_UserManagement.email }}</span>
                          </b-col>
                          <b-col
                            style="max-width: max-content !important; margin-right: 20px; padding-bottom: 5px"
                            class="row-view"
                          >
                            <span>
                              <label style="margin-bottom: 0px !important;">Job Title</label>
                            </span>
                            <br />
                            <span
                              style="color: #999999;"
                            >{{ M_UserManagement.job_title}}</span>
                          </b-col>
                          <b-col
                            style="max-width: max-content !important; margin-right: 20px; padding-bottom: 5px"
                            class="row-view"
                          >
                            <span>
                              <label style="margin-bottom: 0px !important;">Notes</label>
                            </span>
                            <br />
                            <span style="color: #999999;">{{ M_UserManagement.notes }}</span>
                          </b-col>
                          <b-col
                            style="max-width: max-content !important; margin-right: 20px; padding-bottom: 5px"
                            class="row-view"
                          >
                            <span>
                              <label style="margin-bottom: 0px !important;">Portfolio Name</label>
                            </span>
                            <br />
                            <span style="color: #999999;">{{ paramFromList.name }}</span>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <div class="card" style="font-size: 12px !important">
                          <div class="card__title">
                            <b-row>
                              <b-col style="max-width: max-content !important">
                                <span>Menu</span>
                              </b-col>
                            </b-row>
                          </div>
                          <div class="card__body">
                            <!-- Level1 -->
                            <div
                              v-for="(module, indexModule) in M_MenuJSON"
                              v-bind:key="indexModule"
                            >
                              <b-row
                                :no-gutters="true"
                                style="margin-bottom: 2px"
                              >
                                <b-col
                                  cols="auto"
                                  v-show="
                                    module.level_2 && module.level_2.length > 0
                                  "
                                >
                                  <span
                                    @click="onExpand('M', module.ss_menu_id, indexModule)"
                                    class="module"
                                    :id="'module_' + module.ss_menu_id"
                                    ><font-awesome-icon
                                      :icon="
                                        module.isActive
                                          ? 'minus-circle'
                                          : 'plus-circle'
                                      "
                                      class="icon-expand"
                                  /></span>
                                </b-col>
                                <b-col cols="auto">
                                  <input
                                    style="vertical-align: middle !important"
                                    type="checkbox"
                                    name="cb_module"
                                    :id="'M_' + module.ss_menu_id"
                                    v-model="module.is_check"
                                    @click="onCheck(1, indexModule)"
                                  />
                                </b-col>
                                <b-col
                                  cols="auto"
                                  v-show="
                                    module.menu_url !== '' &&
                                    module.menu_url !== '#'
                                  "
                                >
                                  <ABSButton
                                    :text="'...'"
                                    @click="doButtonAccess(module)"
                                    :disabled="!module.is_check"
                                  />
                                </b-col>
                                <b-col cols="auto">
                                  <span>{{ module.title }}</span>
                                </b-col>
                              </b-row>
                              <b-collapse
                                :id="'bmodule_' + module.ss_menu_id"
                                :visible="
                                  module.isActive
                                "
                                v-show="
                                  module.level_2 && module.level_2.length > 0
                                "
                              >
                                <!-- Level2 -->
                                <div
                                  v-for="(event, indexEvent) in module.level_2"
                                  v-bind:key="indexEvent"
                                  style="margin-left: 3%"
                                >
                                  <b-row
                                    :no-gutters="true"
                                    style="
                                      margin-bottom: 2px;
                                      margin-left: 22px !important;
                                    "
                                  >
                                    <b-col
                                      cols="auto"
                                      v-show="
                                        event.level_3 &&
                                        event.level_3.length > 0
                                      "
                                    >
                                      <span
                                        @click="onExpand('E', event.ss_menu_id, indexModule, indexEvent)"
                                        class="event"
                                        :id="'event_' + event.ss_menu_id"
                                        ><font-awesome-icon
                                          :icon="
                                            event.isActive
                                              ? 'minus-circle'
                                              : 'plus-circle'
                                          "
                                          class="icon-expand"
                                      /></span>
                                    </b-col>
                                    <b-col cols="auto">
                                      <input
                                        style="
                                          vertical-align: middle !important;
                                        "
                                        type="checkbox"
                                        name="cb_event"
                                        :id="'M_' + event.ss_menu_id"
                                        v-model="event.is_check"
                                        @click="
                                          onCheck(2, indexModule, indexEvent)
                                        "
                                      />
                                    </b-col>
                                    <b-col
                                      cols="auto"
                                      v-show="
                                        event.menu_url !== '' &&
                                        event.menu_url !== '#'
                                      "
                                    >
                                      <ABSButton
                                        :text="'...'"
                                        @click="doButtonAccess(event)"
                                        :disabled="!event.is_check"
                                      />
                                    </b-col>
                                    <b-col cols="auto">
                                      <span>{{ event.title }}</span>
                                    </b-col>
                                  </b-row>
                                  <b-collapse
                                    :id="'bevent_' + event.ss_menu_id"
                                    :visible="
                                      event.isActive
                                    "
                                    v-show="
                                      event.level_3 && event.level_3.length > 0
                                    "
                                  >
                                    <!-- Level3 -->
                                    <div
                                      v-for="(option,
                                      indexOption) in event.level_3"
                                      v-bind:key="indexOption"
                                      style="margin-left: 3%"
                                    >
                                      <b-row
                                        :no-gutters="true"
                                        style="
                                          margin-bottom: 2px;
                                          margin-left: 44px !important;
                                        "
                                      >
                                        <!-- <b-col cols="auto"> <span @click="isActive3 = (isActive3 == 'option_'+option.ss_menu_id ? '' : 'option_'+option.ss_menu_id)" class="option" :id="'option_'+option.ss_menu_id"><font-awesome-icon :icon="isActive2 == 'option_'+option.ss_menu_id?'minus-circle':'plus-circle'" class="icon-expand" /></span> </b-col> -->
                                        <b-col cols="auto">
                                          <input
                                            style="
                                              vertical-align: middle !important;
                                            "
                                            type="checkbox"
                                            name="cb_option"
                                            :id="'M_' + option.ss_menu_id"
                                            v-model="option.is_check"
                                            @click="
                                              onCheck(
                                                3,
                                                indexModule,
                                                indexEvent,
                                                indexOption
                                              )
                                            "
                                          />
                                        </b-col>
                                        <b-col
                                          cols="auto"
                                          v-show="
                                            option.menu_url !== '' &&
                                            option.menu_url !== '#'
                                          "
                                        >
                                          <ABSButton
                                            :text="'...'"
                                            @click="doButtonAccess(option)"
                                            :disabled="!option.is_check"
                                          />
                                        </b-col>
                                        <b-col cols="auto">
                                          <span>{{ option.title }}</span>
                                        </b-col>
                                      </b-row>
                                    </div>
                                    <!-- Level3 -->
                                  </b-collapse>
                                </div>
                                <!-- Level2 -->
                              </b-collapse>
                            </div>
                            <!-- Level1 -->
                            <br />
                            <ABSButton
                              :text="'Save'"
                              classButton="btn btn--default"
                              classIcon="icon-style-default"
                              @click="doSave"
                              styleButton="height: 40px;width: 100%;"
                            />
                          </div>
                        </div>
                      </b-col>
                      <b-col>
                        <div class="card" style="font-size: 12px !important">
                          <div class="card__title">
                            <b-row>
                              <b-col style="max-width: max-content !important">
                                <span>Dashboard</span>
                              </b-col>
                            </b-row>
                          </div>
                          <div class="card__body">
                            <div
                              v-for="(data, idx) in M_Dashboard"
                              v-bind:key="idx"
                            >
                              <b-row
                              >
                                <b-col @click="showAccessDashboard(data)">
                                  <span>{{ data.title }}</span>
                                </b-col>
                                <b-col>
                                  <b-form-checkbox
                                    :id="'default_dashboard_' + idx"
                                    :name="'default_dashboard_' + idx"
                                    v-model="defaultDashboard"
                                    :value="data"
                                    @change="onDefaultDashboardChange(data)"
                                    style="
                                      min-height: 15px !important;
                                      padding-top: 0px !important;
                                    "
                                  />
                                </b-col>
                              </b-row>
                              <hr />
                            </div>
                          </div>
                        </div>
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
      M_UserManagement: {
        path_file: require("@/assets/default_photo_.png"),
        user_name: "",
        ss_group_id: "",
        hand_phone: "",
        fulladdress: "",
        email: "",
        role: "",
        job_title: "",
        notes: "",
        is_inactive: "",
        dashboard_url: "",
      },
      M_MenuJSON: [],
      M_Dashboard: [],
      default_pic: require("@/assets/default_photo_.png"),
      defaultDashboard: false,
    };
  },
  computed: {
    paramFromList() {
      var param = this.$store.getters.getParamPage2;
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
    ButtonStatus() {
      return this.$store.getters.getButtonStatus;
    },
  },
  methods: {
    doBack() {
      this.$router.go(-1);
    },
    doButtonAccess(menu) {
      var param = this.paramFromList;
      menu.user_id = this.paramFromList.user_id;
      param.ButtonAccess = menu;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "ADM_UserManagementButtonAccessInternal" });
    },
    showAccessDashboard(data) {
      // var param = this.paramFromList;
      // data.user_id = this.paramFromList.user_id;
      // param.Dashboard = data;
      // param.isEdit = true;
      // this.$store.commit("setParamPage", param);
      // this.$router.push({ name: "ADM_UserManagementDashboardInternal" });
    },
    onExpand(from, id, indexModule, indexEvent) {
      if (from == "M") {
        this.M_MenuJSON[indexModule].isActive = !this.M_MenuJSON[indexModule].isActive
      } else if (from == "E") {
        this.M_MenuJSON[indexModule].level_2[indexEvent].isActive = !this.M_MenuJSON[indexModule].level_2[indexEvent].isActive
      }
      this.$forceUpdate();
    },
    onCheck(level, indexModule, indexEvent = null, indexOption = null) {
      if (level == 1) {
        // if (this.M_MenuJSON[indexModule].level_2 == null) return;
        this.M_MenuJSON[indexModule].add_status = !this.M_MenuJSON[indexModule]
          .is_check;
        this.M_MenuJSON[indexModule].edit_status = !this.M_MenuJSON[indexModule]
          .is_check;
        this.M_MenuJSON[indexModule].delete_status = !this.M_MenuJSON[
          indexModule
        ].is_check;
        this.M_MenuJSON[indexModule].post_status = !this.M_MenuJSON[indexModule]
          .is_check;
        this.M_MenuJSON[indexModule].view_status = !this.M_MenuJSON[indexModule]
          .is_check;

        if (this.M_MenuJSON[indexModule].level_2 !== null) {
          this.M_MenuJSON[indexModule].level_2.forEach((event, index) => {
            event.is_check = !this.M_MenuJSON[indexModule].is_check;
            event.add_status = !this.M_MenuJSON[indexModule].is_check;
            event.edit_status = !this.M_MenuJSON[indexModule].is_check;
            event.delete_status = !this.M_MenuJSON[indexModule].is_check;
            event.post_status = !this.M_MenuJSON[indexModule].is_check;
            event.view_status = !this.M_MenuJSON[indexModule].is_check;

            if (event.level_3 !== null) {
              event.level_3.forEach((option, index) => {
                option.is_check = !this.M_MenuJSON[indexModule].is_check;
                option.add_status = !this.M_MenuJSON[indexModule].is_check;
                option.edit_status = !this.M_MenuJSON[indexModule].is_check;
                option.delete_status = !this.M_MenuJSON[indexModule].is_check;
                option.post_status = !this.M_MenuJSON[indexModule].is_check;
                option.view_status = !this.M_MenuJSON[indexModule].is_check;
              });
            }
          });
        }
      } else if (level == 2) {
        // if (this.M_MenuJSON[indexModule].level_2[indexEvent].level_3 == null) return;
        var isChecked = !this.M_MenuJSON[indexModule].level_2[indexEvent]
          .is_check;
        //check child
        if (this.M_MenuJSON[indexModule].level_2[indexEvent].level_3 !== null) {
          this.M_MenuJSON[indexModule].level_2[indexEvent].level_3.forEach(
            (option, index) => {
              option.is_check = !this.M_MenuJSON[indexModule].level_2[
                indexEvent
              ].is_check;
              option.add_status = !this.M_MenuJSON[indexModule].level_2[
                indexEvent
              ].is_check;
              option.edit_status = !this.M_MenuJSON[indexModule].level_2[
                indexEvent
              ].is_check;
              option.delete_status = !this.M_MenuJSON[indexModule].level_2[
                indexEvent
              ].is_check;
              option.post_status = !this.M_MenuJSON[indexModule].level_2[
                indexEvent
              ].is_check;
              option.view_status = !this.M_MenuJSON[indexModule].level_2[
                indexEvent
              ].is_check;
            }
          );
        }

        //check parent
        if (isChecked) {
          this.M_MenuJSON[indexModule].is_check = isChecked;
          this.M_MenuJSON[indexModule].add_status = isChecked;
          this.M_MenuJSON[indexModule].edit_status = isChecked;
          this.M_MenuJSON[indexModule].delete_status = isChecked;
          this.M_MenuJSON[indexModule].post_status = isChecked;
          this.M_MenuJSON[indexModule].view_status = isChecked;

          this.M_MenuJSON[indexModule].level_2[indexEvent].is_check = isChecked;
          this.M_MenuJSON[indexModule].level_2[
            indexEvent
          ].add_status = isChecked;
          this.M_MenuJSON[indexModule].level_2[
            indexEvent
          ].edit_status = isChecked;
          this.M_MenuJSON[indexModule].level_2[
            indexEvent
          ].delete_status = isChecked;
          this.M_MenuJSON[indexModule].level_2[
            indexEvent
          ].post_status = isChecked;
          this.M_MenuJSON[indexModule].level_2[
            indexEvent
          ].view_status = isChecked;
        } else {
          this.M_MenuJSON[indexModule].is_check = false;
          this.M_MenuJSON[indexModule].add_status = false;
          this.M_MenuJSON[indexModule].edit_status = false;
          this.M_MenuJSON[indexModule].delete_status = false;
          this.M_MenuJSON[indexModule].post_status = false;
          this.M_MenuJSON[indexModule].view_status = false;

          this.M_MenuJSON[indexModule].level_2.forEach((event, index) => {
            if (index == indexEvent) {
              //false
            } else {
              if (event.is_check) {
                this.M_MenuJSON[indexModule].is_check = true;
                this.M_MenuJSON[indexModule].add_status = true;
                this.M_MenuJSON[indexModule].edit_status = true;
                this.M_MenuJSON[indexModule].delete_status = true;
                this.M_MenuJSON[indexModule].post_status = true;
                this.M_MenuJSON[indexModule].view_status = true;
                return;
              }
            }
          });
        }
      }
    },
    doSave() {
      this.$validator._base
        .validateAll("ADM_ViewUserManagement")
        .then((result) => {
          if (!result) return;
          this.alertConfirmation("Are You Sure Want To Save This Data ?").then(
            (ress) => {
              if (ress.value) {
                this.$validator.errors.clear("ADM_ViewUserManagement");
                this.M_Update();
                // if (this.inputStatus == "edit") {
                // } else {
                //   this.M_Save();
                // }
              }
            }
          );
        });
    },
    M_Update() {
      var dtl = [];

      this.M_MenuJSON.forEach((menu, index) => {
        if (menu.is_check === true) {
          dtl.push({
            ss_menu_id: menu.ss_menu_id,
            add_status: menu.add_status,
            edit_status: menu.edit_status,
            delete_status: menu.delete_status,
            view_status: menu.view_status,
            post_status: menu.post_status,
            // ss_menu_group_id: this.M_UserManagement.ss_group_id,
            portfolio_id: this.paramFromList.ss_portfolio_id,
            user_id: this.paramFromList.user_id,
            user_input: this.getDataUser().user_id,
            // user_edit: this.getDataUser().user_id
          });
        }

        if (menu.level_2 !== null) {
          menu.level_2.forEach((event, indexE) => {
            if (event.is_check === true) {
              dtl.push({
                ss_menu_id: event.ss_menu_id,
                add_status: event.add_status,
                edit_status: event.edit_status,
                delete_status: event.delete_status,
                view_status: event.view_status,
                post_status: event.post_status,
                // ss_menu_group_id: this.M_UserManagement.ss_group_id,
                portfolio_id: this.paramFromList.ss_portfolio_id,
                user_id: this.paramFromList.user_id,
                user_input: this.getDataUser().user_id,
                // user_edit: this.getDataUser().user_id
              });
            }

            if (event.level_3 !== null) {
              event.level_3.forEach((option, indexO) => {
                if (option.is_check === true) {
                  dtl.push({
                    ss_menu_id: option.ss_menu_id,
                    add_status: option.add_status,
                    edit_status: option.edit_status,
                    delete_status: option.delete_status,
                    view_status: option.view_status,
                    post_status: option.post_status,
                    // ss_menu_group_id: this.M_UserManagement.ss_group_id,
                    portfolio_id: this.paramFromList.ss_portfolio_id,
                    user_id: this.paramFromList.user_id,
                    user_input: this.getDataUser().user_id,
                    // user_edit: this.getDataUser().user_id
                  });
                }
              });
            }
          });
        }
      });

      var param = {
        portfolio_id: this.paramFromList.ss_portfolio_id,
        user_id: this.paramFromList.user_id,
        dashboard_url:
            this.defaultDashboard[0] == undefined ||
            this.defaultDashboard.length == 0
            ? ""
            : this.defaultDashboard[0].menu_url,
        group_id: this.M_UserManagement.ss_group_id,
        user_input: this.getDataUser().user_id,
        DataDetail: dtl,
      };

      this.putJSON(this.getUrlPutUser(), param).then((response) => {
        if (response == null) return;
        this.init();
      });
    },
    M_GetMenu() {
      var param = {
        portfolio_id: this.paramFromList.ss_portfolio_id,
        user_id:
          this.paramFromList.user_id && this.paramFromList.user_id !== ""
            ? this.paramFromList.user_id
            : "NULL",
        group_access: this.paramFromList.group_access
      };

      this.getJSON(this.getUrlUserJson(), param).then((response) => {
        // response from API
        if (response == null) return;

        this.M_MenuJSON = JSON.parse(response.Data[0].get_menu_json_user);
      });
    },
    M_GetDashboard() {
      let param = {
        option_function_cd: "GetMenuDashboard",
        module_cd: "SS",
        ss_portfolio_id: this.paramFromList.ss_portfolio_id,
        ss_group_id:
          this.M_UserManagement.ss_group_id &&
          this.M_UserManagement.ss_group_id !== ""
            ? this.M_UserManagement.ss_group_id
            : "NULL",
      };

      this.CallFunction(param).then((response) => {
        if (response == null) return;
        let data = response.Data;
        this.M_Dashboard = data;

        this.defaultDashboard = this.M_Dashboard.filter(
          (x) => x.menu_url == this.M_UserManagement.dashboard_url
        );
      });
    },
    doEdit() {
      var param = this.paramFromList;
      param.isEdit = true;
      this.$router.push({ name: "ADM_AddUserManagementInternal", params: param });
    },
    GetDataBy() {
      var param = {
        id: this.paramFromList.row_id,
        lastupdatestamp: this.paramFromList.lastupdatestamp,
      };

      this.getJSON(this.getUrlAPIUser(this.paramFromList.row_id), param).then(
        (response) => {
          // response from API

          if (response == null) return;
          this.$store.commit("setStatusLoader", true);

          var data = response.Data;

          this.M_UserManagement = {
            user_name: data.user_name,
            ss_group_id: data.ss_group_id,
            hand_phone: data.hand_phone,
            fulladdress: data.address,
            email: data.email,
            role: data.group_descs,
            notes: data.notes,
            job_title: data.job_title,
            path_file:
              data.path_file && data.path_file !== ""
                ? this.url + data.path_file
                : this.default_pic,
            is_inactive:
              data.is_inactive == "N"
                ? "Active"
                : "In Active",
            dashboard_url: data.dashboard_url,
            time_edit: data.time_edit,
          };
          
          this.getUserInfo(data.user_edit).then((response) => {
            if (response == null) return;
            this.M_UserManagement.user_name_label = response.user_name;
            this.$forceUpdate();
          });

          this.M_GetDashboard();
          setTimeout(() => {
            this.$store.commit("setStatusLoader", false);
          }, 3000);
        }
      );
    },
    onDefaultDashboardChange(data) {
      this.defaultDashboard = [data];
    },
    init() {
      this.M_GetMenu();
      this.GetDataBy();
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
.list:hover {
  color: #0056b3;
  text-decoration: underline;
}
</style>