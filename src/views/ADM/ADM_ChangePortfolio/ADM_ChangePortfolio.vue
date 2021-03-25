<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col sm="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>Change Portfolio</span>
                </b-col>
                <b-col style="text-align: right;">
                </b-col>
              </b-row>
            </div>
            <div class="card__body">
              <b-form
                :data-vv-scope="'Portfolio'"
                :data-vv-value-path="'Portfolio'"
              >
                <b-row>
                  <b-col style="text-align: center">
                    <b-row class="my-1" style="text-align: center">
                      <b-col sm="3"></b-col>
                      <b-col sm="6" style="text-align: center">
                        <b-row>
                          <b-col>
                            <span>
                              <label style="width: 100px;"><span style="color:red;">* </span>Portfolio</label>
                            </span>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col>
                            <ACCDropDown
                              @change="OnPortfolioChange"
                              :prop="PI_portfolio"
                              v-model="M_Portfolio.portfolio"
                              :label="M_Portfolio.portfolioLabel"
                              ref="ref_action"
                            />
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col sm="3"></b-col>
                    </b-row>

                    <b-row class="my-1" style="margin-top: 10px;">
                      <b-col sm="3"></b-col>
                      <b-col sm="6">
                        <ABSButton
                          :text="'Change Portfolio'"
                          classButton="btn btn--default"
                          classIcon="icon-style-default"
                          @click="doSave"
                          styleButton="height: 40px;width: 100%;"
                        />
                      </b-col>
                      <b-col sm="3"></b-col>
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

      M_Portfolio: {
        portfolio: "",
        portfolioLabel: "",
      },
      PI_portfolio: {
        dataLookUp: {
          LookUpCd: "GetPorfolioUserEdit",
          ColumnDB: "ss_portfolio_id",
          InitialWhere: "user_id='" + this.getDataUser().user_id + "' AND ss_portfolio_id!='" + this.getDataUser().portfolio_id + "'",
          ParamWhere: "",
          OrderBy: "",
          ParamView: "",
          SourceField: "",
          DisplayLookUp: "",
        },
        cValidate: "required",
        cName: "portfolio",
        ckey: false,
        cOrder: 1,
        cProtect: false,
        cParentForm: "Portfolio",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
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
    doBack() {
      this.$router.go(-1);
    },
    OnPortfolioChange(data) {
      this.$nextTick(() => {
        this.M_Portfolio.portfolio = data.id;
        this.M_Portfolio.portfolioLabel = data.label;
      });
    },
    M_ClearForm() {
      this.M_Portfolio = {
        portfolio: "",
        portfolioLabel: "",
      };
    },

    doSave() {
      this.$validator._base.validateAll("Portfolio").then((result) => {
        if (!result) return;
        this.alertConfirmation("Are You Sure Want Change Portfolio ?").then(
          (ress) => {
            if (ress.value) {
              this.$validator.errors.clear("Portfolio");

              this.M_Save();
            }
          }
        );
      });
    },
    M_Save() {
      var param = {
        ss_portfolio_id: this.M_Portfolio.portfolio,
        group_id: this.getDataUser().group_id,
        user_id: this.getDataUser().user_id,
        portfolio_name: this.M_Portfolio.portfolioLabel,
      };

      this.postJSON(this.getUrlChangePortfolio(), param).then((response) => {
        console.log(response)
        if (response == null) return;
        this.doClearLocalStorage();

        let data = response.Data;

        let dataUser = data.data_user;

        let favoriteMenu = JSON.stringify(data.shorcut_menu);
        let menu = JSON.stringify(data.menu);

        const session = {
          Session_Id: data.token,
          sessionIdle: data.idle
        };

        localStorage.lsDataUser = JSON.stringify(dataUser);

        localStorage.lsShortcutMenu = favoriteMenu;
        localStorage.lsMenu = menu;

        localStorage.lsSession = JSON.stringify(session);

        this.$router.push("/");
        location.reload();
      });
    },
  },
  mounted() {
    this.M_ClearForm();
  },
};
</script>

