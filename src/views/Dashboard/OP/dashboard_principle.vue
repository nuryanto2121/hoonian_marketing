<template>
  <div class="card" style="height: 95%">
    <div class="card__body">
      <b-row>
        <b-col style="max-width: max-content !important">
          <span style="font-size: 16px; color: #333399; font-weight: bold;">Principle</span>
        </b-col>
        <b-col style="text-align: right; padding: unset !important;">
          <span>
            <ABSButton
              :text="'View All'"
              classButton="button button--back"
              classIcon="icon-style-1"
              @click="doViewAllPrinciplePayment"
            />
          </span>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="4" xl="3" style="padding: unset !important;">
          <b-row>
            <b-col style="margin-top: 10px;">
              <div style="border: 1px solid rgba(45, 71, 175, 0.15);
                box-sizing: border-box;
                border-radius: 6px;
                padding-bottom: 5px;">
                <b-row style="margin-top: 10px;">
                  <b-col class="no-padding" @click="doBlockedPrinciple">
                    <div style="
                      width: 75px;
                      height: 75px;
                      border: 6px solid rgba(255, 130, 72, 0.2);
                      border-radius: 50%;
                      margin: 0 auto;">
                        <div style="
                          position: relative;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                          width: 45.76px;
                          height: 45.76px;
                          background: linear-gradient(180deg, #FF8248 0%, #FF4848 100%);
                          box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
                          border-radius: 50%;">
                            <div style="
                              text-align: center;
                              font-size: 30px;
                              color: white;
                              position: absolute;
                              top: 50%;
                              left: 50%;
                              transform: translate(-50%, -50%);">
                                <b>{{Model.blocked_principle}}</b>
                            </div>
                        </div>
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col align-self="center" class="no-padding">
                    <div style="margin-top: 2px; color: rgba(0, 0, 0, 0.5); font-size: 14px; text-align: center;">
                      <b>Blocked <br />Principle</b>
                    </div>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 8px;">
                  <b-col @click="doBlockedAgent">
                    <div style="
                      width: 75px;
                      height: 75px;
                      border: 6px solid rgba(255, 0, 69, 0.2);
                      border-radius: 50%;
                      margin: 0 auto;">
                        <div style="
                          position: relative;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                          width: 45.76px;
                          height: 45.76px;
                          background: linear-gradient(180deg, #FF0045 0%, #FF00C7 100%);
                          box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
                          border-radius: 50%;">
                            <div style="
                              text-align: center;
                              font-size: 30px;
                              color: white;
                              position: absolute;
                              top: 50%;
                              left: 50%;
                              transform: translate(-50%, -50%);">
                                <b>{{Model.blocked_agent}}</b>
                            </div>
                        </div>
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col align-self="center" class="no-padding">
                    <div style="margin-top: 2px; color: rgba(0, 0, 0, 0.5); font-size: 14px; text-align: center;">
                      <b>Blocked <br />Agents</b>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </b-col>
            <b-col style="margin-top: 10px;">
              <div style="border: 1px solid rgba(45, 71, 175, 0.15);
                box-sizing: border-box;
                border-radius: 6px;
                padding-bottom: 5px;">
                <b-row  style="margin-top: 10px;">
                  <b-col class="no-padding" @click="doNUP">
                    <div style="
                      width: 75px;
                      height: 75px;
                      border: 6px solid #028A20;
                      border-radius: 50%;
                      margin: 0 auto;">
                        <b-img :src="require('@/assets/icon-svg/nup.svg')" alt=""
                          style="position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);" />
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col class="no-padding" style="text-align: center;">
                    <div style="color: #028A20; font-size: 18px;">
                      <b>{{Model.nup}}</b>
                    </div>
                    <div style="margin-top: -5px; color: rgba(0, 0, 0, 0.5); font-size: 14px;">
                      <b>NUP</b>
                    </div>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 8px;">
                  <b-col>
                    <b-row>
                      <b-col class="no-padding" @click="doToken">
                        <div style="
                          width: 75px;
                          height: 75px;
                          border: 6px solid #FFC700;
                          border-radius: 50%;
                          margin: 0 auto;">
                            <b-img :src="require('@/assets/icon-svg/token.svg')" alt=""
                              style="position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%, -50%);" />
                        </div>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col class="no-padding" style="text-align: center;">
                        <div style="color: #FFC700; font-size: 18px;">
                          <b>{{Model.token}}</b>
                        </div>
                        <div style="margin-top: -3px; color: rgba(0, 0, 0, 0.5); font-size: 14px;">
                          <b>Token</b>
                        </div>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col lg="8" xl="9" style="margin-top: 10px; padding-left: 5px; padding-right: unset !important;">
          <ACCFormList
            :prop="PrincipleList_propList"
            @rowClicked="doViewClick"
            :cHeader="Principle.Header"
            cStatic
            :cData="Principle.Data"
            ref="ref_AssignUnitsList"
          >
            <template slot="no" slot-scope="data">
              {{ data.index + 1 }}
            </template>
            <template slot="performance" slot-scope="data">
              {{ data.item.performance }}%
            </template>
          </ACCFormList>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      PrincipleList_propList: {
        url: "",
        initialWhere: "",
        SortField: "",
        SortBy: "",
        ParamWhere: "",
      },
      Principle: {
        Header: [
          {
            key: "no",
            label: "No",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center",
          },
          {
            key: "principle_name",
            label: "Principle Name",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center",
          },
          {
            key: "nup",
            label: "NUP",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center",
          },
          {
            key: "token",
            label: "Token",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center",
          },
          {
            key: "total",
            label: "Assigned Unit",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center",
          },
          {
            key: "sold",
            label: "Sold Unit",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center",
          },
          {
            key: "performance",
            label: "Contributions",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center",
          },
        ],
        Data: [],
      },
      Model: {
        blocked_principle: 0,
        nup: 0,
        blocked_agent: 0,
        token: 0,
      },
    };
  },
  computed: {
    _projectId() {
      return this.$store.getters.getProjectId;
    },
  },
  watch: {
    _projectId(newValue, oldValue) {
      this.getListPrinciplePayment();
    },
  },
  methods: {
    doBlockedPrinciple() {
      this.$router.push({ name: "OP_BlockedPrincipleList" });
    },
    doBlockedAgent() {
      this.$router.push({ name: "OP_BlockedAgentList" });
    },
    doNUP() {
      this.$router.push({ name: "OP_NUPList" });
    },
    doToken() {
      this.$router.push({ name: "OP_TokenList" });
    },
    doViewClick(record, index) {
      var param = record;
      param.principle_id = record.id;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_PrincipleList" });
    },
    doViewAllPrinciplePayment() {
      var param = {
        principle_id: ""
      };
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_PrincipleList" });
    },
    getListPrinciplePayment() {
      var param = {
        project_id: this.getDashboardProjectID(),
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/dashboard-principle",
        param
      ).then((response) => {
        if (response == null) return;
        this.Principle.Data = response.data.list;
        this.Model = response.data;
      });
    },
  },
  mounted() {
    this.getListPrinciplePayment();
  },
};
</script>
<style scoped>
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.no-padding {
  padding: unset !important;
}
</style>