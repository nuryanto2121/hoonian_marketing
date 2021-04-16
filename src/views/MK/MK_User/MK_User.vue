<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col lg="12" xl="12">
          <b-row>
              <b-col lg="12" xl="12">
                <b-row style="overflow-x: auto; white-space: nowrap; display: block !important;">
                  <template v-for="(data, index) in ModelProject">
                    <b-col lg="3" xl="3" v-bind:key="index" style="background-color: #FFFF; margin: 5px; cursor: pointer; display: inline-block; float: none;" @click.once="onProjectClick(data)">
                      <b-row class="noPadding">
                        <b-col class="noPadding" lg="4" xl="4" style="padding-top: 5px !important; padding-bottom: 5px !important;">
                          <b-img :src="urlHoonian + data.icon_project" alt="" style="height: 90px;" fluid-grow rounded @error="onImageLoadFailure($event)" />
                        </b-col>
                        <b-col class="noPadding" lg="8" xl="8">
                          <div class="center" style="text-align: center; width: 100%;">
                            <span class="title-primary" style="font-weight: bold; font-size: 20px; color: #4f4f4f !important;"> Total MKT </span> <br>
                            <span class="title-primary" style="font-weight: bold; font-size: 20px;">{{data.total_token}}</span>
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
                  :prop="propList"
                  :title="'Marketing List'"
                  :ref="'ref_marketing_list'"
                  ButtonBackDisabled
                  SearchDisabled
                  isPoppins
                  isHeaderFixed
                  :cHeader="Headers"
                >
                  <template slot="TitleTable">
                    <b-col lg="3" xl="3" style="padding-left: unset !important;" class="title-list-primary">
                      Marketing List
                    </b-col>
                  </template>
                  <!-- <template slot="date" slot-scope="data">
                    {{momentUnix(data.item.date, "DD MMM YYYY")}}
                  </template> -->
                  
                  <template slot="total_project" slot-scope="data">
                    <b-row>
                        <b-col lg="2" xl="2">
                            <div class="center">
                                {{data.item.total_project}}
                            </div>
                        </b-col>
                        <b-col>
                            <ABSButton
                                :text="'View'"
                                classButton="btn btn--default"
                                classIcon="icon-style-1"
                                @click="doViewProject(data.item)"
                                styleButton="width: 100%;"
                            />
                        </b-col>
                    </b-row>
                  </template>
                  <template slot="total_sales_unit" slot-scope="data">
                    {{isCurrency(data.item.total_sales_unit, decimal)}}
                  </template>
                  <template slot="total_sales_price" slot-scope="data">
                    {{isCurrency(data.item.total_sales_price, decimal)}}
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
      <ABSModal id="Modal_Add" ref="Modal_Add" size="sm">
        <template slot="headerTitle">
          <span class="title-primary"> {{ $t('assigned_project') }} </span>
        </template>
        <template slot="content">
          <b-row>
            <b-col>
              <b-table striped :items="user_project"></b-table>
            </b-col>
          </b-row>
        </template>
      </ABSModal>

      <ABSModal id="Modal_Add" ref="Modal_Add" size="sm">
        <template slot="headerTitle">
          <span class="title-primary"> {{ $t('Add') }} Sales Lead </span>
        </template>
        <template slot="content">
          <b-row>
            <b-col md="12">
              <b-form :data-vv-scope="'FormEntry'" :data-vv-value-path="'FormEntry'">
                <b-row>
                  <b-col md="12">
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label class="lbl-poppins">{{ $t('handphone_no') }}</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_handphone_no"
                          v-model="Model.handphone_no"
                          ref="ref_handphone_no"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label class="lbl-poppins">{{ $t('prospect_name') }}</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_prospect_name"
                          v-model="Model.prospect_name"
                          ref="ref_prospect_name"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label class="lbl-poppins">{{ $t('email') }}</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_email"
                          v-model="Model.email"
                          ref="ref_email"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span>
                          <label class="lbl-poppins">{{ $t('Description') }}</label>
                        </span>
                        <ACCTextArea
                          :prop="PI_description"
                          v-model="Model.description"
                          ref="ref_description"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label class="lbl-poppins">{{ $t('name_card') }}</label>
                        </span>
                        <b-img id="name_card_show" :src="urlHoonian + Model.name_card" alt="" height="150" @error="onImageLoadFailure($event)" />
                        <HOOImageUpload
                          :prop="PI_name_card"
                          @change="Onname_cardChange"
                          v-model="Model.name_card"
                        />
                      </b-col>
                    </b-row>
                    <b-row style="margin-top: 10px;">
                      <b-col md="6" offset-md="3">
                        <ABSButton
                          :text="'Save'"
                          classButton="btn btn--default"
                          classIcon="icon-style-1"
                          @click="doSave"
                          styleButton="height: 40px;width: 100%;"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-form>
            </b-col>
          </b-row>
        </template>
      </ABSModal>
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
      propList: {
        url: "/api/marketing-website/user/grid",
        initialWhere: "",
        SortField: "",
        SortBy: "desc",
        ParamWhere: "",
        param: {
            principle_id: this.getDataUser().principle_id
        }
      },
      user_project: [],
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
          label: "No",
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
          key: "name",
          label: "Marketing Name",
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "handphone",
          label: "Hanphone No.",
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
          key: "total_project",
          label: "Total Project",
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
          key: "total_sales_unit",
          label: "Total Sales (Unit)",
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
          key: "total_sales_price",
          label: "Total Sales (Value)",
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        // {
        //   key: "forfeited",
        //   label: "Forfeited",
        //   thClass: "HeaderACCList2Poppins th-cus-center",
        //   tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        // },
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
        cTitle: "Upload Photo",
        cType: "name_card",
        cParentForm: "FormEntry"
      },
    };
  },
  methods: {
    onProjectClick(data) {
        var param = data;
        param.isEdit = false;
        this.$store.commit("setParamPage", param);
        this.$router.push({ name: "MK_TokenPurchase" });
    },
    doViewProject(data) {},
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
        this.ModelProject = data;
        
        this.$nextTick(() => {
          this.renderList();
        })
        this.$forceUpdate();
      });
    },
    renderList() {
        this.propList.param.principle_id = this.getDataUser().principle_id
        this.$refs.ref_marketing_list.doGetList("");
    },
  },
  mounted() {
    this.getProject();
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
