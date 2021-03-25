<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important">
                  <span>Group Management</span>
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
                :data-vv-scope="'ADM_AddGroupManagement'"
                :data-vv-value-path="'ADM_AddGroupManagement'"
              >
                <b-row>
                  <b-col md="1">
                    <span>
                      <label>Group</label>
                    </span>
                  </b-col>
                  <b-col md="2">
                    {{M_GroupManagement.short_descs}}
                  </b-col>
                  <b-col md="4">
                    {{M_GroupManagement.descs}}
                  </b-col>
                </b-row>
                <b-row class="row-view">
                  <b-col md="1">
                    <span>
                      <label>Portfolio Name</label>
                    </span>
                  </b-col>
                  <b-col md="7">
                    {{paramFromList2.DetailList.name}}
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
                          <b-row :no-gutters="true" style="margin-bottom: 2px">
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
                              >
                                <font-awesome-icon
                                  :icon="
                                    module.isActive
                                      ? 'minus-circle'
                                      : 'plus-circle'
                                  "
                                  class="icon-expand"
                                />
                              </span>
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
                            :visible="module.isActive"
                            v-show="module.level_2 && module.level_2.length > 0"
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
                                    event.level_3 && event.level_3.length > 0
                                  "
                                >
                                  <span
                                    @click="onExpand('E', event.ss_menu_id, indexModule, indexEvent)"
                                    class="event"
                                    :id="'event_' + event.ss_menu_id"
                                  >
                                    <font-awesome-icon
                                      :icon="
                                        event.isActive
                                          ? 'minus-circle'
                                          : 'plus-circle'
                                      "
                                      class="icon-expand"
                                    />
                                  </span>
                                </b-col>
                                <b-col cols="auto">
                                  <input
                                    style="vertical-align: middle !important"
                                    type="checkbox"
                                    name="cb_event"
                                    :id="'M_' + event.ss_menu_id"
                                    v-model="event.is_check"
                                    @click="onCheck(2, indexModule, indexEvent)"
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
                                  v-for="(option, indexOption) in event.level_3"
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
                          :text="'Save Group Management'"
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
      defaultDashboard: false,
      M_GroupManagement: {
        short_descs: "",
        descs: "",
        group_access: "E"
      },
      M_MenuJSON: [],
      M_Dashboard: [],
    };
  },
  computed: {
    paramFromList() {
      var param = this.$store.getters.getParamPage;
      return param;
    },
    paramFromList2() {
      var param = this.$store.getters.getParamPage2;
      return param;
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
    onDefaultDashboardChange(data) {
      this.defaultDashboard = [data];
    },
    doBack() {
      this.$router.go(-1);
    },
    doButtonAccess(menu) {
      var param = this.paramFromList;
      menu.ss_group_id = this.paramFromList.row_id;
      menu.ss_portfolio_id = this.paramFromList2.DetailList.ss_portfolio_id;
      param.ButtonAccess = menu;
      console.log(param);
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "ADM_GroupManagementButtonAccess" });
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
      // console.log(this.M_MenuJSON);
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
    M_ClearForm() {
      this.M_GroupManagement = {
        short_descs: "",
        descs: "",
        group_access: "E"
      };
    },
    M_GetMenu() {
      var param = {
        portfolio_id: this.paramFromList2.DetailList.ss_portfolio_id,
        group_id:
          this.paramFromList.row_id && this.paramFromList.row_id !== ""
            ? this.paramFromList.row_id
            : "NULL",
        group_access: 'E',
      };

      this.getJSON(this.getUrlGroupJson(), param).then((response) => {
        // response from API
        if (response == null) return;

        this.M_MenuJSON = JSON.parse(response.Data[0].get_menu_json_group);
        // console.log(this.M_MenuJSON);
      });
    },
    M_GetDashboard() {
      let param = {
        option_function_cd: "GetMenuDashboard",
        module_cd: "SS",
        ss_portfolio_id: this.paramFromList2.DetailList.ss_portfolio_id,
        ss_group_id:
          this.paramFromList.row_id && this.paramFromList.row_id !== ""
            ? this.paramFromList.row_id
            : "NULL",
      };

      this.CallFunction(param).then((response) => {
        if (response == null) return;
        let data = response.Data;
        // console.log(data);
        this.M_Dashboard = data;
        if (this.inputStatus == "edit") {
          this.GetDataBy();
        }
      });
    },
    doSave() {
      this.$validator._base
        .validateAll("ADM_AddGroupManagement")
        .then((result) => {
          if (!result) return;
          this.alertConfirmation("Are You Sure Want To Save This Data ?").then(
            (ress) => {
              if (ress.value) {
                this.$validator.errors.clear("ADM_AddGroupManagement");
                // console.log(this.defaultDashboard)
                if (this.inputStatus == "edit") {
                  this.M_Update();
                }
              }
            }
          );
        });
    },
    GetDataBy() {
      var param = {
        option_url: "/ADM/ADM_GroupManagement",
        line_no: 0,
        id: this.paramFromList.row_id,
        lastupdatestamp: 0,
      };

      this.getJSON(this.getUrlCRUD(), param).then((response) => {
        // response from API
        if (response == null) return;
        this.$store.commit("setStatusLoader", true);

        var data = JSON.parse(response.Data[0].fss_group_external_s)[0];

        this.M_GroupManagement = {
          short_descs: data.short_descs,
          descs: data.descs,
          group_access: data.group_access
        };

        console.log(data)

        this.defaultDashboard = this.M_Dashboard.filter(
          (x) => x.menu_url == data.dashboard_url
        );

        setTimeout(() => {
          this.$store.commit("setStatusLoader", false);
        }, 3000);
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
                  });
                }
              });
            }
          });
        }
      });

      var param = {
        portfolio_id: this.paramFromList2.DetailList.ss_portfolio_id,
        DataHeader: {
          ss_group_id: this.paramFromList.row_id,
          descs: this.M_GroupManagement.descs,
          short_descs: this.M_GroupManagement.short_descs,
          user_type: "E",
          group_access: "E",
          user_edit: this.getDataUser().user_id,
          dashboard_url:
            this.defaultDashboard[0] == undefined ||
            this.defaultDashboard.length == 0
              ? ""
              : this.defaultDashboard[0].menu_url,
          lastupdatestamp: 0,
        },
        DataDetail: dtl,
      };

      this.putJSON(this.getUrlAPIGroup(), param).then((response) => {
        // console.log(response)
        if (response == null) return;
        this.init();
      });
    },
    showAccessDashboard(data) {
      // var param = this.paramFromList;
      // param.Dashboard = data;
      // param.isEdit = true;
      // this.$store.commit("setParamPage", param);
      // this.$router.push({ name: "ADM_GroupManagementDashboard" });
    },
    init() {
      this.M_ClearForm();
      this.M_GetMenu();
      this.M_GetDashboard();
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