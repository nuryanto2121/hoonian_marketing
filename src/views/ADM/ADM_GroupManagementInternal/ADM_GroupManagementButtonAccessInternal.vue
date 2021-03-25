<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important">
                  <span>User Group Internal Access Button</span>
                </b-col>
                <b-col style="text-align: right">
                  <span>
                    <ABSButton
                      :text="'Back'"
                      classButton="button button--back"
                      classIcon="icon-style-1"
                      @click="$router.go(-1)"
                    />
                  </span>
                </b-col>
              </b-row>
            </div>
            <div class="card__body">
              <b-row>
                <b-col>
                  <span>Group: {{ paramFromList.descs }}</span>
                  <br />
                  <span>{{ paramFromList.ButtonAccess.title }}</span>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <ACCFormList
                    :prop="propList"
                    @rowClicked="rowClicked"
                    ref="ref_GroupManagementButtonAccess"
                  >
                    <template slot="no" slot-scope="data">
                      {{ data.index + 1 }}
                    </template>
                    <template slot="display_form" slot-scope="data">
                      <div style="text-align: left;">
                        {{ data.item.display_form }}
                      </div>
                    </template>
                    <template slot="is_access" slot-scope="data">
                      <b-form-checkbox
                        :id="'is_access_' + data.index"
                        :name="'is_access_' + data.index"
                        v-model="data.item.is_access"
                        :value="true"
                        :unchecked-value="false"
                        style="
                          min-height: 15px !important;
                          padding-top: 0px !important;
                        "
                        :disabled="data.item.is_disabled"
                        @input="onAccessCheck(data.index, data.item.is_access, data.item.display_button)"
                      />
                    </template>
                  </ACCFormList>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="6" offset="3">
                  <ABSButton
                    :text="'Save'"
                    classButton="btn btn--default"
                    classIcon="icon-style-default"
                    @click="doSave"
                    styleButton="height: 40px;width: 100%;"
                  />
                </b-col>
              </b-row>
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
      propList: {
        OptionUrl: "/ADM/ADM_GroupManagement",
        initialWhere: "",
        LineNo: 3,
        PageLevel: 1,
        TabIndex: 1,
        OrderBy: "menu_url",
        SourceField: "",
        ParamView: "",
        PerPage: 1000,
      },
    };
  },
  computed: {
    paramFromList() {
      var param = this.$store.getters.getParamPage;
      //   console.log(param);
      if (
        (param == null || param == undefined) &&
        (param.ButtonAccess == null || param.ButtonAccess == undefined)
      ) {
        this.doBack();
      } else {
        if (Object.keys(param).length < 1) {
          this.doBack();
        } else {
          return param;
        }
      }
    },
  },
  methods: {
    onAccessCheck(index, checked, displayButton) {
      if (displayButton.toLowerCase() == 'view') {
        for (let x = index; x < this.$refs.ref_GroupManagementButtonAccess.items.length; x++ ) {
          if (this.$refs.ref_GroupManagementButtonAccess.items[index].display_form != this.$refs.ref_GroupManagementButtonAccess.items[x].display_form) {
            break;
          }
          this.$refs.ref_GroupManagementButtonAccess.items[x].is_access = checked;
          if (x != index)
            this.$refs.ref_GroupManagementButtonAccess.items[x].is_disabled = !checked;
        }
      }
    },
    doBack() {
      this.$router.go(-1);
    },
    doSave() {
      this.alertConfirmation("Are You Sure Want To Save This Data ?").then(
        (ress) => {
          if (ress.value) {
            this.M_Save();
          }
        }
      );
    },
    M_Save() {
      let items = this.$refs.ref_GroupManagementButtonAccess.items;
      var param_Delete = {
          _Method_: "DELETE",
          _LineNo_: 3,
          menu_url: this.paramFromList.ButtonAccess.menu_url,
          ss_portfolio_id: this.paramFromList.ButtonAccess.ss_portfolio_id,
          ss_group_id: this.paramFromList.ButtonAccess.ss_group_id,
        },
        param_Save = [];

      for (let i = 0; i < items.length; i++) {
        if (items[i].is_access == true) {
          param_Save.push({
            _Method_: "SAVE",
            _LineNo_: 3,
            ss_portfolio_id: this.paramFromList.ButtonAccess.ss_portfolio_id,
            ss_group_id: this.paramFromList.ButtonAccess.ss_group_id,
            menu_url: items[i].menu_url, //this.paramFromList.ButtonAccess.menu_url,
            button_id: items[i].button_id,
            user_input: this.getDataUser().user_id,
            ss_menu_button_id: items[i].ss_menu_button_id,
          });
        }
      }

      let paramUpdate = {
        _Method_: "UPDATE",
        _LineNo_: 3,
        ss_portfolio_id: this.paramFromList.ButtonAccess.ss_portfolio_id,
        ss_group_id: this.paramFromList.ButtonAccess.ss_group_id,
        menu_url: this.paramFromList.ButtonAccess.menu_url,
        ss_module_id: this.paramFromList.ButtonAccess.ss_module_id,
        user_input: this.getDataUser().user_id,
      };

      var param = {
        option_url: "/ADM/ADM_GroupManagement",
        line_no: 2,
        Data: [
          {
            A_Delete: param_Delete,
            B_Looping: param_Save,
            C_Update: paramUpdate
          },
        ],
      };

      this.postJSONMulti(this.getUrlProsesDataPostMulti(), param).then(
        (response) => {
          if (response == null) return;
          this.doBack();
        }
      );
    },
    rowClicked(record, index) {},
    doViewClick(record, index) {},
    doDoubleClick(record, index) {},
  },
  mounted() {
    // this.propList.initialWhere = "ss_portfolio_id='" + this.paramFromList.ButtonAccess.ss_portfolio_id + "' AND ss_group_id='" + this.paramFromList.ButtonAccess.ss_group_id + "' AND menu_url='" + this.paramFromList.ButtonAccess.menu_url + "'"
    this.propList.ParamView =
      "'" +
      this.paramFromList.ButtonAccess.ss_portfolio_id +
      "','" +
      this.paramFromList.ButtonAccess.ss_group_id +
      "','" +
      this.paramFromList.ButtonAccess.menu_url +
      "'";
    this.$refs.ref_GroupManagementButtonAccess.doGetList("");
  },
};
</script>

<style>
</style>