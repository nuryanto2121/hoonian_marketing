<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col lg="12" xl="12">
          <b-row>
              <b-col lg="12" xl="12">
                  <div class="card">
                    <div class="card__title" style="padding-bottom: 5px !important;">
                    <b-row class="title-primary">
                        <b-col style="max-width: max-content !important;">
                          <span style="font-size: 18px; color: #4a93b3;">Principle</span>
                        </b-col>
                        <b-col class="col-right">
                            <span>
                                <b-form-input
                                id="txtSearch"
                                v-model="search"
                                type="text"
                                placeholder="Search...."
                                v-shortkey.focus="['f1']"
                                class="text-field-search font-poppins"
                                @keyup.enter.native="onSearchEnter"
                                autocomplete="off"
                                style="margin-bottom: 0px;"
                                ></b-form-input>
                                <span
                                style="position: absolute; right: 12px; cursor: pointer"
                                @click="removeSearch"
                                >&times;</span
                                >
                            </span>
                        </b-col>
                        <b-col style="max-width: fit-content !important; padding-right: unset !important;" class="col-right">
                            <span>
                                <ABSButton
                                    :text="'Project'"
                                    classButton="button button--back"
                                    classIcon="icon-style-1"
                                    @click="doProject"
                                />
                            </span>
                            <span>
                                <ABSButton
                                    :text="'Back'"
                                    classButton="button button--back"
                                    classIcon="icon-style-1"
                                    @click="doBack"
                                    styleButton="margin-right: unset !important;"
                                />
                            </span>
                        </b-col>
                    </b-row>
                    </div>
                </div>
              </b-col>
          </b-row>
          <template v-for="(data,index) in ModelProject">
            <b-row v-bind:key="index" style="margin-bottom: 20px;">
                <b-col lg="12" xl="12">
                    <div class="card">
                        <div class="card__body">
                            <b-row>
                                <b-col lg="2" xl="2">
                                    <b-row style="margin-bottom: 10px;">
                                        <b-col lg="12" xl="12" style="margin-right: 20px; border: solid 1px #dfe3f3; border-radius: 6px; padding: 15px !important; text-align: center;">
                                            <b-img :src="urlHoonian + data.main_pic" alt="" style="height: 120px !important; width: 120px !important;" fluid-grow rounded @error="onImageLoadFailure($event)" />
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col lg="12" xl="12" style="margin-right: 20px; border: solid 1px #dfe3f3; border-radius: 6px; padding: 10px !important; text-align: center;">
                                            <div class="progress-x">
                                                <span>Contribution</span>
                                            </div>
                                            <b-row align-v="center" style="min-height: 90px; background: #2d5aaf; border-radius: 4px; color: white; text-align: center;">
                                                <b-col>
                                                <div style="font-size: 35px; font-weight: bold;">
                                                    {{data.contribution_percent}}<span style="font-size: 18px;">%</span>
                                                </div>
                                                </b-col>
                                            </b-row>
                                            <b-row align-v="center" style="margin-top: 10px; min-height: 90px; background: #ffbd01; border-radius: 4px; color: white; text-align: center;">
                                                <b-col>
                                                <div style="font-size: 35px; font-weight: bold;">
                                                    {{checkNum((data.contribution_value && data.contribution_value !== '' ? data.contribution_value : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), (data.contribution_value && data.contribution_value !== '' ? data.contribution_value : 0))}}
                                                    {{checkPref((data.contribution_value && data.contribution_value !== '' ? data.contribution_value : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}}
                                                </div>
                                                </b-col>
                                            </b-row>
                                            <b-row align-v="center" style="margin-top: 10px; min-height: 90px; background: #fe714f; border-radius: 4px; color: white; text-align: center;">
                                                <b-col>
                                                    <div style="font-size: 35px; font-weight: bold;">
                                                        {{data.total_token}}
                                                        <div class="token-text">
                                                            <span>Token</span>
                                                        </div>
                                                    </div>
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                    </b-row>
                                </b-col>
                                <b-col style="border: solid 1px #dfe3f3; border-radius: 6px; padding: 15px !important; text-align: center;">
                                    <b-row>
                                        <b-col lg="6" xl="6">
                                            <div class="principle-name">
                                                <span>{{data.principle_name}}</span>
                                            </div>
                                        </b-col>
                                        <b-col lg="3" xl="3" offset-lg="1" offset-xl="1">
                                            <div class="principle-name" style="font-size: 15px;">
                                                <span>Sales</span>
                                            </div>
                                        </b-col>
                                        <b-col lg="2" xl="2">
                                            <ABSButton
                                                :text="'Commission'"
                                                classButton="btn btn--default poppins"
                                                classIcon="icon-style-default"
                                                @click="doCommission(data)"
                                            />
                                                <!-- styleButton="height: 40px;width: 100%;" -->
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col lg="3" xl="3">
                                            <!-- <div class="principle-name">
                                                <span>{{data.principle_name}}</span>
                                            </div> -->
                                            <b-row style="margin-bottom: 10px;">
                                                <b-col lg="6" xl="6" class="label">
                                                    <span>PIC</span>
                                                </b-col>
                                                <b-col lg="6" xl="6" class="label-text-bold">
                                                    <span style="margin-left: 10px;">{{data.name}}</span>
                                                </b-col>
                                            </b-row>
                                            <b-row style="margin-bottom: 10px;">
                                                <b-col lg="6" xl="6" class="label">
                                                    <span>Total Agent</span>
                                                </b-col>
                                                <b-col lg="6" xl="6" class="label-text">
                                                    <span style="margin-left: 10px;">{{data.total_agent}}</span>
                                                </b-col>
                                            </b-row>
                                            <b-row style="margin-bottom: 10px;">
                                                <b-col lg="6" xl="6" class="label">
                                                    <span>Total NUP</span>
                                                </b-col>
                                                <b-col lg="6" xl="6" class="label-text">
                                                    <span style="margin-left: 10px;">{{data.total_nup}}</span>
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                        <b-col lg="4" xl="4">
                                            <b-row style="margin-bottom: 10px;">
                                                <b-col lg="9" xl="9" class="label-assigned">
                                                    <span>Total Assigned Units</span>
                                                </b-col>
                                                <b-col lg="2" xl="2" class="label-text-assigned">
                                                    <span>{{data.total_unit_assigned}}</span>
                                                </b-col>
                                            </b-row>
                                            <b-row style="margin-bottom: 10px;">
                                                <b-col lg="9" xl="9" class="label-booked">
                                                    <span>Total Booked Units</span>
                                                </b-col>
                                                <b-col lg="2" xl="2" class="label-text-booked">
                                                    <span>{{data.total_unit_booked}}</span>
                                                </b-col>
                                            </b-row>
                                            <b-row style="margin-bottom: 10px;">
                                                <b-col lg="9" xl="9" class="label-sold">
                                                    <span>Total Sold Units</span>
                                                </b-col>
                                                <b-col lg="2" xl="2" class="label-text-sold">
                                                    <span>{{data.total_unit_sold}}</span>
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                        <b-col lg="5" xl="5">
                                            <!-- <div class="principle-name">
                                                <span>Sales</span>
                                            </div> -->
                                            <b-row style="margin-bottom: 10px;">
                                                <b-col lg="8" xl="8" class="label">
                                                    <span>Total Commission</span>
                                                </b-col>
                                                <b-col lg="4" xl="4" class="label-text">
                                                    <span>
                                                        {{checkNum((data.total_commssion && data.total_commssion !== '' ? data.total_commssion : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), (data.total_commssion && data.total_commssion !== '' ? data.total_commssion : 0))}} 
                                                        {{checkDigit((data.total_commssion && data.total_commssion !== '' ? data.total_commssion : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}}
                                                    </span>
                                                </b-col>
                                            </b-row>
                                            <b-row style="margin-bottom: 10px;">
                                                <b-col lg="8" xl="8" class="label">
                                                    <span>Paid Commission</span>
                                                </b-col>
                                                <b-col lg="4" xl="4" class="label-text">
                                                    <span>
                                                        {{checkNum((data.paid_commssion && data.paid_commssion !== '' ? data.paid_commssion : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), (data.paid_commssion && data.paid_commssion !== '' ? data.paid_commssion : 0))}} 
                                                        {{checkDigit((data.paid_commssion && data.paid_commssion !== '' ? data.paid_commssion : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}}
                                                    </span>
                                                </b-col>
                                            </b-row>
                                            <b-row style="margin-bottom: 10px;">
                                                <b-col lg="8" xl="8" class="label">
                                                    <span>Outstanding Commission</span>
                                                </b-col>
                                                <b-col lg="4" xl="4" class="label-text">
                                                    <span>
                                                        {{checkNum((data.outstanding_commssion && data.outstanding_commssion !== '' ? data.outstanding_commssion : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), (data.outstanding_commssion && data.outstanding_commssion !== '' ? data.outstanding_commssion : 0))}} 
                                                        {{checkDigit((data.outstanding_commssion && data.outstanding_commssion !== '' ? data.outstanding_commssion : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}}
                                                    </span>
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                    </b-row>

                                    <hr style="border-color: #ededed; margin: 0 !important;" />

                                    <b-row>
                                        <b-col lg="12" xl="12">
                                            <HOOList
                                                :prop="data.propList"
                                                :title="'Project'"
                                                @rowClicked="rowClicked($event,index)"
                                                @buttonDeleteClicked="doDeleteClick($event,index)"
                                                @rowDblClicked="doDoubleClick($event,index)"
                                                @rowLinkClick="rowLink($event,index)"
                                                @pageSize="M_PageSize($event,index)"
                                                @pagination="M_Pagination($event,index)"
                                                @filter="M_Advance_Filter($event,index)"
                                                @headTable="M_Head_Table($event,index)"
                                                @refreshColumn="refreshColumn($event,index)"
                                                :ref="'ref_principle_list'+index"
                                                @buttonViewClicked="doViewClick"
                                                ButtonBackDisabled
                                                SearchDisabled
                                                isPoppins
                                                isHeaderFixed
                                                noCard
                                                :cHeader="principle_list_header"
                                            >
                                                <template slot="TitleTable">
                                                    <b-col lg="3" xl="4" style="font-size: 16px; color: black; text-align: left;">
                                                        Project
                                                    </b-col>
                                                </template>
                                                <template slot="assign_units" slot-scope="data_i">
                                                    <span>
                                                        <ABSButton
                                                            :text="'Assign Units'"
                                                            classButton="btn btn--default poppins"
                                                            classIcon="icon-style-default"
                                                            @click="doAssignUnit(data, data_i)"
                                                        />
                                                    </span>
                                                </template>
                                            </HOOList>
                                        </b-col>
                                    </b-row>
                                </b-col>
                            </b-row>
                        </div>
                    </div>
                </b-col>
            </b-row>
          </template>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
export default {
  props: ['title'],
  computed: {
    _projectId () {
      return this.$store.getters.getProjectId;
    },
    paramFromList() {
      var param = this.$store.getters.getParamPage;
      return param;
    },
  },
  watch: {
    _projectId (newValue, oldValue) {
      this.renderList(-1);
    }
  },
  data() {
    return {
      Model: {
        project_id: this.getDashboardProjectID(),
      },
      search: "",
      
      ModelProject: [],
      principle_list_header: [
        {
            key: "no",
            label: "No",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
            key: "project_name",
            label: "Project Name",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
            key: "nup",
            label: "NUP",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
            key: "assigned",
            label: "Assigned",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
            key: "booked",
            label: "Booked",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
            key: "sold",
            label: "Sold",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
            key: "percentage",
            label: "%",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
            key: "assign_units",
            label: "Click To Pick",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
      ]
    };
  },
  methods: {
    onSearchEnter(data) {
      this.$nextTick(() => {
        this.renderList(-1);
      })
    },
    removeSearch() {
      this.search = "";
      this.onSearchEnter("");
    },
    rowClicked(ev, id) {
      console.log(ev, id)
    },
    doDeleteClick(ev, id) {
      console.log(ev, id)
    },
    doDoubleClick(ev, id) {
      console.log(ev, id)
    },
    rowLink(ev, id) {
      console.log(ev, id)
    },
    M_PageSize(ev, id) {
      console.log(ev, id)
    },
    M_Pagination(ev, id) {
      console.log(ev, id)
    },
    M_Advance_Filter(ev, id) {
      console.log(ev, id)
    },
    M_Head_Table(ev, id) {
      console.log(ev, id)
    },
    refreshColumn(ev, id) {
      console.log(ev, id)
    },
    doProject() {
      this.$router.push({ name: "OP_PrincipleAssignProject" });
    },
    doCommission(data) {
        let param = {
            project_id: data.project_id,
            principle_id: data.principle_id
        };
        this.$store.commit("setParamPage", param);
        this.$router.push({ name: "OP_PrincipleCommission" });
    },
    doAssignUnit(data, record) {
        let param = {
            project_id: data.project_id,
            principle_id: data.principle_id,
            sales: record
        };
        this.$store.commit("setParamPage", param);
        this.$router.push({ name: "OP_PrincipleAssignUnit" });
    },
    doBack() {
      this.$router.go(-1);
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    getDataPrinciple() {
      let param = {
        project_id: this.Model.project_id,
        principle_id: this.paramFromList.principle_id
      };

      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard/operation-detail/principle/header', param).then((response) => {
        if (response == null) return;
        let data = response.data;
        for (let i = 0; i < data.length; i++) {
          this.ModelProject.push({
            ...data[i],
            propList: {
              url: "/api/hoonian-website/dashboard/operation-detail/principle/grid",
              initialWhere: data[i].project_id,
              SortField: "",
              SortBy: "desc",
              ParamWhere: "",
              param: {
                search: this.search,
                principle_id: data[i].principle_id
              }
            }
          });
        }
        
        this.$nextTick(() => {
          this.renderList(-1);
        })
        this.$forceUpdate();
      });
    },
    renderList(id = -1) {
      if (id < 0) {
        for (let i = 0; i < this.ModelProject.length; i++) {
          // console.log('ref_principle_list'+i, this.$refs['ref_principle_list'+i])
          this.$refs['ref_principle_list'+i][0].doGetList("");
        }
      }
      else {
        // let data = this.ModelProject
        this.ModelProject[id].propList.ParamWhere = this.search;
        this.ModelProject[id].propList.param.search = this.search;
        this.$refs['ref_principle_list'+id][0].doGetList("");
      }
    }
  },
  mounted() {
    this.getDataPrinciple();
  },
};
</script>

<style scoped>
.progress-x {
    text-align: center;
    font-weight: bold; font-size: 15px;
    margin-bottom: 20px;
    font-family: "Poppins";
}
.token-text {
    text-align: center;
    font-weight: bold; font-size: 13px;
    margin-top: 10px;
    font-family: "Poppins";
}
.principle-name {
    text-align: left;
    font-weight: bold; font-size: 20px;
    margin-bottom: 10px;
    font-family: "Poppins";
}
.label {
    padding: 0 !important;
    text-align: left;
    font-weight: bold; font-size: 11px;
    color: #7070b8;
    font-family: "Poppins";
}
.label-assigned {
    padding: 0 !important;
    text-align: left;
    font-weight: bold; font-size: 11px;
    color: #4ead63;
    font-family: "Poppins";
}
.label-booked {
    padding: 0 !important;
    text-align: left;
    font-weight: bold; font-size: 11px;
    color: #ffd84d;
    font-family: "Poppins";
}
.label-sold {
    padding: 0 !important;
    text-align: left;
    font-weight: bold; font-size: 11px;
    color: #ff4d7d;
    font-family: "Poppins";
}
.label-text {
    padding: 0 !important;
    text-align: left;
    font-size: 11px;
    font-family: "Poppins";
}
.label-text-bold {
    padding: 0 !important;
    text-align: left;
    font-weight: bold; font-size: 11px;
    font-family: "Poppins";
}
.label-text-assigned {
    padding: 0 !important;
    text-align: left;
    font-weight: bold; font-size: 11px;
    color: #028a20;
    font-family: "Poppins";
}
.label-text-booked {
    padding: 0 !important;
    text-align: left;
    font-weight: bold; font-size: 11px;
    color: #ffc700;
    font-family: "Poppins";
}
.label-text-sold {
    padding: 0 !important;
    text-align: left;
    font-weight: bold; font-size: 11px;
    color: #ff9fb9;
    font-family: "Poppins";
}
@media (min-width: 992px) {
    /* .precentage {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        
        width: 175px;
        height: 175px;
        background-color: #FFFFFF;
        border-radius: 50%;
        border: 20px solid #ffc700;
        text-align: center;

        padding-top: 20%;

        color: #333399; font-size: 40px; font-weight: bold;
    } */
    /* .progress-x {
        position: absolute;
        top: 14%;
        bottom: 10%;
        left: 50%;
        transform: translate(-50%, -50%);

        text-align: center;
        font-weight: bold; font-size: 15px;
    } */
    /* .offset-right {
        margin-left: 29%;
    } */
}
@media (min-width: 1200px) {
    /* .precentage {
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);

        width: 200px;
        height: 200px;
        background-color: #FFFFFF;
        border-radius: 50%;
        border: 25px solid #ffc700;
        text-align: center;

        padding-top: 13%;
        
        color: #333399; font-size: 50px; font-weight: bold;
    } */
    /* .progress-x {
        position: absolute;
        top: 85%;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, -50%);

        text-align: center;
        font-weight: bold; font-size: 25px;
    } */
    /* .offset-right {
        margin-left: 19%;
    } */
}
</style>
