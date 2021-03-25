<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col sm="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>Add Portfolio User Internal</span>
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
                          :text="'Save'"
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
          LookUpCd: "GetPorfolioUser",
          ColumnDB: "ss_portfolio_id",
          InitialWhere: "",
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
        this.alertConfirmation("Are You Sure Want To Add Portfolio ?").then(
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
        option_url: "/ADM/ADM_UserManagementInternal",
        line_no: 0,
        user_id: this.paramFromList.user_id,
        ss_portfolio_id: this.M_Portfolio.portfolio,
        user_input: this.getDataUser().user_id,
      };

      this.postJSON(this.getUrlCRUD(), param).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
  },
  mounted() {
    this.M_ClearForm();
    this.PI_portfolio.dataLookUp.ParamView = "'" + this.paramFromList.user_id + "'";
  },
};
</script>

