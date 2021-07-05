<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col lg="12" xl="12">
          <b-row>
              <b-col lg="12" xl="12">
                <b-row style="overflow-x: auto; white-space: nowrap; display: block !important;">
                  <template v-for="(data, index) in ModelProject">
                    <b-col lg="3" xl="3" v-bind:key="index" style="background-color: #FFFF; margin: 5px; cursor: pointer; display: inline-block; float: none;" :class="selectedProject == index ? 'activate' : ''" @click.prevent="onProjectChange(index)">
                      <b-row class="noPadding">
                        <b-col class="noPadding" lg="4" xl="4" style="padding-top: 5px !important; padding-bottom: 5px !important;">
                          <b-img :src="urlHoonian + data.icon_project" alt="" style="height: 90px;" fluid-grow rounded @error="onImageLoadFailure($event)" />
                        </b-col>
                        <b-col class="noPadding" lg="6" xl="6">
                          <div class="center" style="text-align: center; width: 100%;">
                            <span class="title-primary" style="font-weight: bold; font-size: 17px; color: #4f4f4f !important;"> Total Token </span> <br>
                            <span class="title-primary" style="font-weight: bold; font-size: 17px;">{{data.total_token}}</span>
                          </div>
                        </b-col>
                        <b-col class="noPadding" lg="2" xl="2">
                          <font-awesome-icon @click.stop="doAdd(data)" class="icon-style-default title-primary" icon="plus-circle" style="font-size: 2em !important; position: absolute; bottom: 10px;" />
                        </b-col>
                      </b-row>
                    </b-col>
                  </template>
                </b-row>
              </b-col>
          </b-row>
          <b-row>
            <b-col lg="12" xl="12">
                <HOOList
                  :prop="ModelProject[selectedProject].propList"
                  :title="'Token Detail'"
                  :ref="'ref_token_list'"
                  ButtonBackDisabled
                  SearchDisabled
                  isPoppins
                  isHeaderFixed
                  :cHeader="Headers"
                >
                  <template slot="TitleTable">
                    <b-col lg="3" xl="3" style="padding-left: unset !important;" class="title-list-primary">
                      {{$t('token_details')}}
                    </b-col>
                  </template>
                  <template slot="date" slot-scope="data">
                    {{momentUnix(data.item.date, "DD MMM YYYY")}}
                  </template>
                  <!-- <template slot="logbook" slot-scope="data">
                    <ABSButton
                      text="Logbook"
                      classButton="button button--hoonian"
                      icon="wallet"
                      @click="doLogbook(data.item)"
                    />
                  </template> -->
                </HOOList>
            </b-col>
        </b-row>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
export default {
  props: ['title'],
  computed: {
  },
  watch: {
  },
  data() {
    return {
      Model: {
        handphone_no: "",
        prospect_name: "",
        email: "",
        description: "",
        name_card: "",
      },

      Headers: [
        {
          key: "no",
          label: "NO",
          thClass: "HeaderACCList2Poppins th-cus-left",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "marketing_name",
          label: this.$t('marketing_name').toUpperCase(),
          thClass: "HeaderACCList2Poppins th-cus-left",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "principle_name",
          label: this.$t('principle_name').toUpperCase(),
          thClass: "HeaderACCList2Poppins th-cus-left",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "project_name",
          label: this.$t('project_name').toUpperCase(),
          thClass: "HeaderACCList2Poppins th-cus-left",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "total_token",
          label: this.$t('total_token').toUpperCase(),
          thClass: "HeaderACCList2Poppins th-cus-left",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "used",
          label: this.$t('used').toUpperCase(),
          thClass: "HeaderACCList2Poppins th-cus-left",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "forfeited",
          label: this.$t('forfeited').toUpperCase(),
          thClass: "HeaderACCList2Poppins th-cus-left",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "refund",
          label: this.$t('refund').toUpperCase(),
          thClass: "HeaderACCList2Poppins th-cus-left",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
      ],

      ModelProject: [],
      selectedProject: 0,
      paramAdd: 0,

      PI_handphone_no: {
        cValidate: "",
        cName: "Handphone No",
        cOrder: 1,
        cKey: false,
        cType: "tel",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: "new"
      },
      PI_prospect_name: {
        cValidate: "",
        cName: "Prospect Name",
        cOrder: 2,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: "new"
      },
      PI_email: {
        cValidate: "email",
        cName: "Email",
        cOrder: 3,
        cKey: false,
        cType: "email",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: "new"
      },
      PI_description: {
        cValidate: "max:5000",
        cName: "Description",
        cOrder: 4,
        cKey: false,
        cProtect: false,
        cResize: false,
        cReadonly: false,
        cRows: 3,
        cMaxRows: 3,
        cSize: "md",
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus
      },
      PI_name_card: {
        cValidate: "",
        cName: "name_card",
        cOrder: 5,
        cTitle: this.$t('upload_photo'),
        cType: "name_card",
        cParentForm: "FormEntry"
      },
    };
  },
  methods: {
    onProjectChange(index) {
      this.selectedProject = index;
      this.getProject();
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    doAdd(data) {
      var param = data;
      param.project_id = this.ModelProject[this.selectedProject].id;
      param.isEdit = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "MK_TokenPurchase" });
    },
    Onname_cardChange(data) {
      this.Model.name_card = data.url;
    },
    doBack() {
      this.$router.go(-1);
    },
    getProject() {
      let param = {
        company_group_id: this.company_group_id,
        principle_id: this.getDataUser().principle_id
      };

      this.postJSON(this.urlHoonian + '/api/marketing-website/token/header', param).then((response) => {
        if (response == null) return;
        let data = response.data;
        this.ModelProject = [];
        for (let i = 0; i < data.length; i++) {
          this.ModelProject.push({
            ...data[i],
            propList: {
              url: "/api/marketing-website/token/grid",
              initialWhere: data[i].id,
              SortField: "",
              SortBy: "desc",
              ParamWhere: "",
              param: {
                principle_id: this.getDataUser().principle_id,
                marketing_agent_id: this.getDataUser().marketing_id
              }
            }
          });
        }

        this.$nextTick(() => {
          this.renderList();
        })
        this.$forceUpdate();
      });
    },
    renderList() {
      this.$refs.ref_token_list.doGetList("");
    },
  },
  mounted() {
    this.$store.commit("setTitleMenu", "Token");
    this.getProject();
    this.$store.commit("setBackButton", false);
  },
};
</script>

<style scoped>
@media (min-width: 992px) {
  .offset-header {
    margin-left: 4%;
  }
}
@media (min-width: 1200px) {
  .offset-header {
    margin-left: 20%;
  }
}
.activate {
  box-shadow: 0px 5px 5px 2px #ccc;
}
</style>
