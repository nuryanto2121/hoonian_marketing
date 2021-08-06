<template>
  <div>
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
                      <b-col class="noPadding" lg="8" xl="8">
                        <div class="center" style="text-align: center; width: 100%;">
                          <span class="title-primary" style="font-weight: bold; font-size: 25px; color: #4f4f4f !important;"> Referral </span> <br>
                          <span class="title-primary" style="font-weight: bold; font-size: 25px;">{{data.total_referral}}</span>
                        </div>
                      </b-col>
                      <!-- <b-col class="noPadding" lg="2" xl="2">
                        <font-awesome-icon @click="doAdd(data)" class="icon-style-default title-primary" icon="plus-circle" style="font-size: 2em !important; position: absolute; bottom: 10px;" />
                      </b-col> -->
                    </b-row>
                  </b-col>
                </template>
              </b-row>
            </b-col>
        </b-row>
        <b-row>
          <b-col lg="12" xl="12">
              <HOOList
                :prop="ModelProject[selectedProject].propListReferral"
                :title="''"
                :ref="'ref_referral'"
                ButtonBackDisabled
                SearchDisabled
                isPoppins
                isHeaderFixed
                :cHeader="ReferralHeaders"
                @onRenderData="ReferralRender"
              >
                <template slot="TitleTable">
                  <b-col lg="3" xl="3" style="padding-left: unset !important;" class="title-list-primary">
                    {{$t('referral_list')}}
                  </b-col>
                </template>
                <template slot="date" slot-scope="data">
                  {{momentUnix(data.item.date, "DD MMM YYYY")}}
                </template>
                <template slot="pick" slot-scope="data">
                  <div style="margin-left: 20px">
                      <b-form-checkbox
                          v-model="data.item.pick"
                          :name="'pick_' + data.index"
                          size="md"
                      />
                  </div>
                </template>
              </HOOList>
              <br>
          </b-col>
      </b-row>
      <b-row style="margin-bottom: 20px;">
        <b-col style="text-align: center;">
          <ABSButton
                :text="$t('save')"
                classButton="btn btn--default"
                classIcon="icon-style-1"
                @click="doSave"
                styleButton="height: 40px;width: 20%;"
            />
        </b-col>
      </b-row>
        <b-row>
          <b-col lg="12" xl="12">
              <HOOList
                :prop="ModelProject[selectedProject].propListSelected"
                :title="''"
                :ref="'ref_selected'"
                @buttonViewClicked="doViewClick"
                ButtonBackDisabled
                SearchDisabled
                isPoppins
                isHeaderFixed
                :cHeader="SelectedHeaders"
                @onRenderData="SelectedRender"
              >
                <template slot="TitleTable">
                  <b-col lg="3" xl="3" style="padding-left: unset !important;" class="title-list-primary">
                    {{$t('selected_referral')}}
                  </b-col>
                </template>
                <template slot="prospect_name" slot-scope="data">
                  <button style="background: none !important; border: none; padding: 0!important; color: #069; text-decoration: underline; cursor: pointer;" @click.stop="OnNameClick(data.item)">{{data.item.prospect_name}}</button>
                </template>
                <template slot="date" slot-scope="data">
                  {{momentUnix(data.item.date, "DD MMM YYYY")}}
                </template>
                <template slot="logbook" slot-scope="data">
                  <ABSButton
                    text="Logbook"
                    classButton="button button--hoonian"
                    icon="wallet"
                    @click="doLogbook(data.item)"
                  />
                </template>
              </HOOList>
          </b-col>
      </b-row>
      </b-col>
    </b-row>

    <ABSModal id="Modal_Detail" ref="Modal_Detail" size="sm">
      <template slot="content">
        <b-row>
          <b-col md="12">
            
          </b-col>
        </b-row>
      </template>
    </ABSModal>
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

      ReferralHeaders: [
        {
          key: "no",
          label: "NO",
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
          key: "prospect_name",
          label: this.$t('prospect_name').toUpperCase(),
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "referred_by",
          label: this.$t('referred_by').toUpperCase(),
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
          key: "project_name",
          label: this.$t('project_name').toUpperCase(),
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "date",
          label: this.$t('date').toUpperCase(),
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
          key: "pick",
          label: this.$t('pick').toUpperCase(),
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
      ],
      ReferralItems: [],

      SelectedHeaders: [
        {
          key: "no",
          label: "NO",
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
          key: "prospect_name",
          label: this.$t('prospect_name').toUpperCase(),
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "referred_by",
          label: this.$t('referred_by').toUpperCase(),
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
          key: "project_name",
          label: this.$t('project_name').toUpperCase(),
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "marketing_name",
          label: this.$t('marketing_name').toUpperCase(),
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "logbook",
          label: "",
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
      ],
      SelectedItems: [],

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
    OnNameClick(data) {
      var param = data;
      param.isEdit = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "MK_ReferralDetail" });
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    ReferralRender(data) {
      data.forEach(el => {
        el.pick = false;
      });

      this.ReferralItems = data;
    },
    SelectedRender(data) {
      this.SelectedItems = data;
    },
    doAdd(param) {
      this.M_ClearForm();
      this.paramAdd = param;
      this.$refs.Modal_Detail._show();
    },
    doBack() {
      this.$router.go(-1);
    },
    doLogbook(data) {
      var param = data;
      param.project_id = this.ModelProject[this.selectedProject].id;
      param.isEdit = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "MK_ReferralLogbook" });
    },
    getProject() {
      let param = {
        company_group_id: this.company_group_id,
        principle_id: this.getDataUser().principle_id
      };

      this.postJSON(this.urlHoonian + '/api/marketing-website/referral/header', param).then((response) => {
        if (response == null) return;
        let data = response.data;
        this.ModelProject = [];
        for (let i = 0; i < data.length; i++) {
          this.ModelProject.push({
            ...data[i],
            propListReferral: {
              url: "/api/marketing-website/referral/unpick-grid",
              initialWhere: data[i].id,
              SortField: "",
              SortBy: "desc",
              ParamWhere: "",
              param: {
                principle_id: this.getDataUser().principle_id,
                marketing_agent_id: this.getDataUser().marketing_id
              }
            },
            propListSelected: {
              url: "/api/marketing-website/referral/picked-grid",
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
      this.$refs.ref_referral.doGetList("");
      this.$refs.ref_selected.doGetList("");
    },
    M_ClearForm() {
      this.Model = {
        handphone_no: "",
        prospect_name: "",
        email: "",
        description: "",
        name_card: "",
      };
    },
    doSave() {
      this.$validator._base.validateAll("FormEntry").then((result) => {
        if (!result) return;
        this.alertConfirmation("Are You Sure Want To Save This Data ?").then(
          (ress) => {
            if (ress.value) {
              this.$validator.errors.clear("FormEntry");
              this.M_Save();
            }
          }
        );
      });
    },
    M_Save() {
      let paramD = [];
      this.ReferralItems.forEach((data, index) => {
        if (data.pick) {
          paramD.push({
            referral_id: data.referral_id
          });
        }
      });

      let param = {
        principle_id: this.getDataUser().principle_id,
        marketing_agent_id: this.getDataUser().marketing_id,
        referrals: paramD
      };

      this.postJSON(
        this.urlHoonian + "/api/marketing-website/referral/pick",
        param
      ).then((response) => {
        if (response == null) return;
        // this.doBack();
        this.getProject();
      });
    },
  },
  mounted() {
    this.$store.commit("setTitleMenu", "Referral");
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
