<template>
  <div>
    <b-row class="dashboardBody">
      <b-col cols="12">
        <b-row>
            <b-col cols="12">
              <b-row style="overflow-x: auto; white-space: nowrap; display: block !important;">
                <template v-for="(data, index) in ModelProject">
                  <b-col cols="8" v-bind:key="index" style="background-color: #FFFF; margin: 5px; cursor: pointer; display: inline-block; float: none;" class="user-card" @click.once="onProjectClick(data)">
                    <b-row class="noPadding">
                      <b-col class="noPadding" cols="4" style="padding-top: 5px !important; padding-bottom: 5px !important;">
                        <b-img :src="urlHoonian + data.icon_project" alt="" style="height: 75px;" fluid-grow rounded @error="onImageLoadFailure($event)" />
                      </b-col>
                      <b-col class="noPadding" cols="8">
                        <div class="center" style="text-align: center; width: 100%;">
                          <span class="title-primary" style="font-weight: bold; font-size: 20px; color: #4f4f4f !important;"> Total MKT </span> <br>
                          <span class="title-primary" style="font-weight: bold; font-size: 20px;">{{data.total_token}}</span>
                        </div>
                      </b-col>
                    </b-row>
                  </b-col>
                </template>
              </b-row>
            </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" v-if="isMobile()">
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
                  <b-col cols="10" style="padding-left: unset !important;" class="title-list-primary">
                    {{$t('user_marketing_list')}}
                  </b-col>
                </template>
                <template slot="ToolbarTable">
                  <b-col cols="2" style="text-align: end !important;">
                    <font-awesome-icon @click="doAdd" class="icon-style-default title-primary" icon="plus-circle" style="font-size: 2em !important;" />
                  </b-col>
                </template>
                <!-- <template slot="date" slot-scope="data">
                  {{momentUnix(data.item.date, "DD MMM YYYY")}}
                </template> -->
                
                <template slot="handphone" slot-scope="data">
                  <b-row>
                      <b-col cols="6" style="margin-top: 4px;">
                          <!-- <div class="center"> -->
                              {{data.item.handphone}}
                          <!-- </div> -->
                      </b-col>
                      <b-col cols="6">
                          <ABSButton
                              :text="$t('view')"
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
                <template slot="name" slot-scope="data">
                  <button style="background: none !important; border: none; padding: 0!important; color: #069; text-decoration: underline; cursor: pointer;" @click.stop="OnMarketingClick(data.item)">{{data.item.name}}</button>
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
          <b-col cols="12" v-else>
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
                  <b-col cols="10" style="padding-left: unset !important;" class="title-list-primary">
                    {{$t('user_marketing_list')}}
                  </b-col>
                </template>
                <template slot="ToolbarTable">
                  <b-col cols="2" style="text-align: end !important;">
                    <font-awesome-icon @click="doAdd" class="icon-style-default title-primary" icon="plus-circle" style="font-size: 2em !important;" />
                  </b-col>
                </template>
                <!-- <template slot="date" slot-scope="data">
                  {{momentUnix(data.item.date, "DD MMM YYYY")}}
                </template> -->
                
                <template slot="total_project" slot-scope="data">
                  <b-row>
                      <b-col cols="2">
                          <div class="center">
                              {{data.item.total_project}}
                          </div>
                      </b-col>
                      <b-col>
                          <ABSButton
                              :text="$t('view')"
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
                <template slot="name" slot-scope="data">
                  <button style="background: none !important; border: none; padding: 0!important; color: #069; text-decoration: underline; cursor: pointer;" @click.stop="OnMarketingClick(data.item)">{{data.item.name}}</button>
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
    <ABSModal id="Modal_AssignProject" ref="Modal_AssignProject" size="md">
      <template slot="headerTitle">
        <span class="title-primary"> {{ $t('assigned_project') }} ({{Model.assign_project_cnt}}) </span>
      </template>
      <template slot="content">
        <b-row>
          <b-col>
            <HOOList
              :prop="propList_assignedProject"
              :title="''"
              :ref="'ref_assignedProject'"
              ButtonBackDisabled
              SearchDisabled
              isPoppins
              isHeaderFixed
              :cHeader="assignedProject_Headers"
              noCard
              noTitle
              removeCardTitle
              removePaddingTopBody
            >
            </HOOList>
          </b-col>
        </b-row>
      </template>
    </ABSModal>

    <ABSModal id="Modal_Add" ref="Modal_Add" size="sm">
      <template slot="headerTitle">
        <span class="title-primary"> {{ $t('Add') }} Marketing </span>
      </template>
      <template slot="content">
        <b-row>
          <b-col cols="12">
            <b-form :data-vv-scope="'FormEntry'" :data-vv-value-path="'FormEntry'">
              <b-row>
                <b-col cols="12">
                  <b-row>
                    <b-col cols="12">
                      <span>
                        <label class="lbl-poppins">{{ $t('handphone_no') }}</label>
                      </span>
                      <ACCTextBox
                        :prop="PI_handphone_no"
                        v-model="Model.handphone"
                        ref="ref_handphone_no"
                      />
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12">
                      <span>
                        <label class="lbl-poppins">{{ $t('marketing_name') }}</label>
                      </span>
                      <ACCTextBox
                        :prop="PI_marketing_name"
                        v-model="Model.name"
                        ref="ref_marketing_name"
                      />
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12">
                      <span>
                        <label class="lbl-poppins">Marketing {{ $t('group') }}</label>
                      </span>
                      <HOODropDown
                        @change="Onmarketing_group_idChange"
                        :prop="PI_marketing_group_id"
                        v-model="Model.marketing_group_id"
                        :label="Model.marketing_group_idLabel"
                        ref="ref_marketing_group_id"
                      />
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12">
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
                    <b-col cols="12">
                      <span>
                        <label class="lbl-poppins">{{ $t('id_no') }}</label>
                      </span>
                      <ACCTextBox
                        :prop="PI_id_no"
                        v-model="Model.id_no"
                        ref="ref_id_no"
                      />
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12">
                      <span>
                        <label class="lbl-poppins">{{ $t('id_picture') }}</label>
                      </span> <br>
                      <b-img id="id_pict_show" :src="urlHoonian + Model.thumbnail_image" alt="" height="150" @error="onImageLoadFailure($event)" />
                      <HOOImageUpload
                        :prop="PI_id_pict"
                        @change="Onid_pictChange"
                        v-model="Model.thumbnail_image"
                      />
                    </b-col>
                  </b-row>
                  <b-row style="margin-top: 10px;">
                    <b-col cols="8">
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
      propList_assignedProject: {
        url: "/api/marketing-website/user/user-assign-project",
        initialWhere: "",
        SortField: "",
        SortBy: "desc",
        ParamWhere: "",
        param: {
          marketing_id: "",
          company_group_id: ""
        }
      },

      Model: {
        handphone: "",
        name: "",
        email: "",
        id_no: "",
        thumbnail_image: "",
        mobile_app_user_id: "",
        principle_id: "",
        marketing_group_id: "",
        marketing_group_idLabel: "",
        assign_project_cnt: 0
      },

      Headers: [
        {
          key: "no",
          label: "NO",
          thClass: "HeaderACCList2Poppins th-cus-left",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "name",
          label: this.$t('marketing_name').toUpperCase(),
          thClass: "HeaderACCList2Poppins M th-cus-left",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "handphone",
          label: this.$t('handphone_no').toUpperCase(),
          thClass: "HeaderACCList2Poppins XL th-cus-left",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "total_project",
          label: this.$t('total_project').toUpperCase(),
          thClass: "HeaderACCList2Poppins th-cus-left",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "total_sales_unit",
          label: this.$t('total_sales_unit').toUpperCase(),
          thClass: "HeaderACCList2Poppins th-cus-left",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "total_sales_price",
          label: this.$t('total_sales_price').toUpperCase(),
          thClass: "HeaderACCList2Poppins th-cus-left",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        // {
        //   key: "forfeited",
        //   label: "FORFEITED",
        //   thClass: "HeaderACCList2Poppins th-cus-left",
        //   tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        // },
      ],

      assignedProject_Headers: [
        {
          key: "no",
          label: "NO",
          thClass: "HeaderACCList2Poppins th-cus-left",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "project_name",
          label: this.$t('project_name').toUpperCase(),
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
      PI_marketing_name: {
        cValidate: "",
        cName: "Marketing Name",
        cOrder: 2,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: "new"
      },
      PI_marketing_group_id: {
        dataLookUp: {
          url: "/api/hoonian-website/marketing-agent-group-lookup",
          param: {
          }
        },
        cValidate: "",
        cName: "marketing_group_id",
        ckey: false,
        cOrder: 3,
        cProtect: false,
        cParentForm: "FormEntrySalesCancel",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
        cClearable: false,
        isShow: true,
      },
      PI_email: {
        cValidate: "email",
        cName: "Email",
        cOrder: 4,
        cKey: false,
        cType: "email",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: "new"
      },
      PI_id_no: {
        cValidate: "",
        cName: "ID No",
        cOrder: 5,
        cKey: false,
        cType: "tel",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: "new"
      },
      PI_id_pict: {
        cValidate: "",
        cName: "id_pict",
        cOrder: 6,
        cTitle: this.$t('upload_photo'),
        cType: "id_pict",
        cParentForm: "FormEntry"
      },
    };
  },
  methods: {
    onProjectClick(data) {
      var param = data;
      param.isEdit = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "MK_UserProjectDetail" });
    },
    doViewProject(data) {
      this.$refs.ref_assignedProject.items = [];
      this.Model.assign_project_cnt = data.total_project;
      this.propList_assignedProject.param.marketing_id = data.marketing_id;
      this.propList_assignedProject.param.company_group_id = this.company_group_id;
      this.$refs.ref_assignedProject.doGetList("");
      this.$refs.Modal_AssignProject._show();
    },
    Onmarketing_group_idChange(data) {
      this.Model.marketing_group_id = data.id;
      this.Model.marketing_group_idLabel = data.label;
    },
    OnMarketingClick(data) {
      var param = data;
      param.isEdit = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "MK_UserProjectAssign" });
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    Onid_pictChange(data) {
      this.Model.thumbnail_image = data.url;
    },
    M_ClearForm() {
      this.Model = {
        handphone: "",
        name: "",
        email: "",
        id_no: "",
        thumbnail_image: "",
        mobile_app_user_id: "",
        principle_id: this.getDataUser().principle_id,
        assign_project_cnt: 0,
        marketing_group_id: "",
        marketing_group_idLabel: "",
      }
    },
    doAdd() {
      this.M_ClearForm();
      this.$refs.Modal_Add._show();
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
      this.postJSON(this.urlHoonian + '/api/marketing-website/user/add-edit', this.Model).then((response) => {
        if (response == null) return;
        this.$refs.Modal_Add._hide();
      });
    },
  },
  mounted() {
    this.$store.commit("setTitleMenu", "User");
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
