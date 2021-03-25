<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>{{title}} Shorcut Menu</span>
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
              <b-form :data-vv-scope="'SS_FormShorcut'" :data-vv-value-path="'SS_FormShorcut'">
                <b-row>
                  <b-col md="2">
                    <div>
                      <!-- <img :src="M_NewProspect.path_file" alt width="100%" /> -->
                      <img :src="require('@/assets/paper.png')" alt style="width: 70px;" />
                    </div>
                  </b-col>
                  <b-col md="10">
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Module</label>
                        </span>
                        <ACCDropDown
                          @change="OnModuleChange"
                          :prop="PI_module_id"
                          v-model="M_Shortcut.module_id"
                          :label="M_Shortcut.module_idLabel"
                          ref="ref_module_id"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Menu</label>
                        </span>
                        <ACCDropDown
                          @change="OnMenuChange"
                          :prop="PI_menu_id"
                          v-model="M_Shortcut.menu_id"
                          :label="M_Shortcut.menu_idLabel"
                          ref="ref_menu_id"
                        />
                      </b-col>
                    </b-row>

                    <b-row style="margin-top: 10px;">
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
      title: "",

      M_Shortcut: {
        ss_user_favorite_id: 0,
        ss_portfolio_id: 0,
        module_id: "",
        module_idLabel: "",
        menu_id: "",
        menu_idLabel: "",
        user_input: "",
        user_edit: "",
        time_input: "",
        time_edit: "",
        row_id: 0,
        lastupdatestamp: 0,
      },
      PI_module_id: {
        dataLookUp: {
          LookUpCd: "GetModule",
          ColumnDB: "ss_module_id",
          InitialWhere: "",
          ParamWhere: "",
          OrderBy: "",
          ParamView: 
            "'" + this.getDataUser().portfolio_id + "'," +
            "'" + this.getDataUser().group_id + "'," +
            "'" + this.getDataUser().user_id + "'",
          SourceField: "",
          DisplayLookUp: "",
        },
        cValidate: "required",
        cName: "module_id",
        cOrder: 1,
        cKey: false,
        cStatic: false,
        cProtect: false,
        cParentForm: "SS_FormShorcut",
        cOption: [],
        cDisplayColumn: "menu_id",
        cInputStatus: this.inputStatus,
      },
      PI_menu_id: {
        dataLookUp: {
          LookUpCd: "GetMenuGroup",
          ColumnDB: "ss_menu_id",
          InitialWhere:
            "ss_portfolio_id='" +
            this.getDataUser().portfolio_id +
            "' AND ss_group_id='" +
            this.getDataUser().group_id +
            "' AND ss_module_id=0",
          ParamWhere: "",
          OrderBy: "",
          ParamView: "",
          SourceField: "",
          DisplayLookUp: "",
        },
        cValidate: "required",
        cName: "menu_id",
        cOrder: 2,
        cKey: false,
        cStatic: false,
        cProtect: false,
        cParentForm: "SS_FormShorcut",
        cOption: [],
        cDisplayColumn: "title",
        cInputStatus: this.inputStatus,
      },
    };
  },
  computed: {
    paramFromList() {
      var param = this.$store.getters.getParamPage;
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
    OnModuleChange(data) {
      this.$nextTick(() => {
        this.M_Shortcut.module_id = data.id;
        this.M_Shortcut.module_idLabel = data.label;

        this.PI_menu_id.dataLookUp.InitialWhere =
          "ss_portfolio_id='" +
          this.getDataUser().portfolio_id +
          "' AND ss_group_id='" +
          this.getDataUser().group_id +
          "' AND ss_module_id=" +
          data.id;

        this.M_Shortcut.menu_id = '';
        this.M_Shortcut.menu_idLabel = '';
      });
    },
    OnMenuChange(data) {
      this.$nextTick(() => {
        this.M_Shortcut.menu_id = data.id;
        this.M_Shortcut.menu_idLabel = data.label;
      });
    },
    doBack() {
      this.$router.go(-1);
    },

    M_ClearForm() {
      this.M_Shortcut = {
        ss_user_favorite_id: 0,
        ss_portfolio_id: 0,
        module_id: "",
        module_idLabel: "",
        menu_id: "",
        menu_idLabel: "",
        user_input: "",
        user_edit: "",
        time_input: "",
        time_edit: "",
        row_id: 0,
        lastupdatestamp: 0,
      };
    },

    doSave() {
      this.$validator._base.validateAll("SS_FormShorcut").then((result) => {
        if (!result) return;
        this.alertConfirmation("Are You Sure Want To Save This Data ?").then(
          (ress) => {
            if (ress.value) {
              this.$validator.errors.clear("SS_FormShorcut");
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
        option_url: "/SS/SS_Shortcut",
        line_no: 0,
        ss_portfolio_id: this.getDataUser().portfolio_id,
        user_id: this.getDataUser().user_id,
        ss_menu_id: this.M_Shortcut.menu_id,
        ss_module_id: this.M_Shortcut.module_id,
        user_input: this.getDataUser().user_id,
      };

      this.postJSON(this.getUrlCRUD(), param).then((response) => {
        if (response == null) return;
        localStorage.lsShortcutMenu = JSON.stringify(response.Data);
        this.$store.commit("setFavoriteMenu", this.getShortcitMenu());
        this.doBack();
      });
    },
    M_Update() {
      var param = {
        option_url: "/SS/SS_Shortcut",
        line_no: 0,
        ss_user_favorite_id: this.M_Shortcut.ss_user_favorite_id,
        ss_portfolio_id: this.getDataUser().portfolio_id,
        user_id: this.getDataUser().user_id,
        ss_menu_id: this.M_Shortcut.menu_id,
        ss_module_id: this.M_Shortcut.module_id,
        lastupdatestamp: this.paramFromList.lastupdatestamp,
        user_edit: this.getDataUser().user_id,
      };

      this.putJSON(this.getUrlCRUD(), param).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
    doDelete() {
      this.alertConfirmation("Are You Sure Want To Delete This Data ?").then(
        (ress) => {
          if (ress.value) {
            this.M_Delete();
          }
        }
      );
    },
    M_Delete() {
      var param = {
        option_url: "/SS/SS_Shortcut",
        line_no: 0,
        id: this.paramFromList.row_id,
        lastupdatestamp: this.paramFromList.lastupdatestamp,
      };
      this.deleteJSON(this.getUrlCRUD(), param).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
    GetDataBy() {
      var param = {
        option_url: "/SS/SS_Shortcut",
        line_no: 0,
        id: this.paramFromList.row_id,
        lastupdatestamp: this.paramFromList.lastupdatestamp,
      };

      this.getJSON(this.getUrlCRUD(), param).then((response) => {
        // response from API
        if (response == null) return;

        var data = response.Data[0];

        this.M_Shortcut = {
          ss_user_favorite_id: data.ss_user_favorite_id,
          ss_portfolio_id: data.ss_portfolio_id,
          module_id: data.ss_module_id,
          module_idLabel: data.module_name,
          menu_id: data.ss_menu_id,
          menu_idLabel: data.title,
          user_input: data.user_input,
          user_edit: data.user_edit,
          time_input: data.time_input,
          time_edit: data.time_edit,
          row_id: data.row_id,
          lastupdatestamp: data.lastupdatestamp,
        };
        this.PI_menu_id.dataLookUp.InitialWhere =
          "ss_portfolio_id='" +
          this.getDataUser().portfolio_id +
          "' AND ss_group_id='" +
          this.getDataUser().group_id +
          "' AND ss_module_id=" +
          data.ss_module_id;
      });
    },
  },
  mounted() {
    this.M_ClearForm();
    if (this.inputStatus == "edit") {
      this.title = "Edit";
      this.GetDataBy();
      this.PI_module_id.cProtect = true;
    } else {
      this.title = "Add";
    }
  },
};
</script>

