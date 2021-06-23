<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col lg="12" xl="12">
          <b-row>
              <b-col lg="12" xl="12">
                <div class="card">
                    <div class="card__body">
                        <b-row>
                            <b-col>
                                <span>
                                    <label class="lbl-poppins">{{ $t('marketing_name') }}</label>
                                </span>
                                <ACCTextBox
                                    :prop="PI_marketing_name"
                                    v-model="Model.name"
                                    ref="ref_marketing_name"
                                />
                            </b-col>
                            <b-col>
                                <span>
                                    <label class="lbl-poppins">{{ $t('handphone_no') }}</label>
                                </span>
                                <ACCTextBox
                                    :prop="PI_handphone_no2"
                                    v-model="Model.handphone"
                                    ref="ref_handphone_no"
                                />
                            </b-col>
                            <b-col>
                                <ABSButton
                                    :text="'Edit'"
                                    classButton="btn btn--default"
                                    classIcon="icon-style-1"
                                    @click="doEdit"
                                    styleButton="height: 40px; width: 60%; position: absolute; bottom: 5px; right: 0;"
                                />
                            </b-col>
                        </b-row>
                        <b-row style="margin-top: 20px;">
                            <b-col>
                                <span>
                                    <label class="title-primary" style="font-weight: bold;">Project List</label>
                                </span>
                            </b-col>
                        </b-row>
                    </div>
                </div>

                <b-row style="margin: 20px 0px 20px 0px;">
                    <template v-for="(project, index) of AllProject">
                        <b-col v-bind:key="index" :style="'padding: 5px; flex: 1 1 25%; max-width: 32%;' + ((index+1)%3 == 0 ? 'margin: 0px 0px 10px 0px;' : 'margin: 0px 20px 10px 0px;')">
                            <b-row class="noPadding">
                                <b-col lg="2" md="2">
                                    <b-form-checkbox
                                        v-model="project.is_selected"
                                        :name="'project_' + index"
                                        size="md"
                                        class="center"
                                    />
                                </b-col>
                                <b-col lg="4" xl="4">
                                    <b-img id="id_pict_show" :src="urlHoonian + project.icon_project" alt="" width="50" height="50" @error="onImageLoadFailure($event)" />
                                </b-col>
                                <b-col>
                                    <span>
                                        <label class="lbl-poppins"> {{project.project_name}} </label>
                                    </span>
                                </b-col>
                            </b-row>
                        </b-col>
                    </template>
                </b-row>

                <div class="card">
                    <div class="card__body">
                        <b-row>
                            <b-col lg="2" xl="2" offset-lg="5" offset-xl="5">
                                <ABSButton
                                    :text="'Save'"
                                    classButton="btn btn--default"
                                    classIcon="icon-style-1"
                                    @click="doSave"
                                    styleButton="height: 40px;width: 100%;"
                                />
                            </b-col>
                        </b-row>
                        <b-row style="margin-top: 20px;">
                            <b-col>
                                <HOOList
                                    :prop="propList"
                                    :title="'Marketing Transaction'"
                                    :ref="'ref_marketing_trans'"
                                    ButtonBackDisabled
                                    SearchDisabled
                                    isPoppins
                                    isHeaderFixed
                                    noCard
                                    removeCardTitle
                                    removePaddingTopBody
                                    :cHeader="Headers"
                                >
                                    <template slot="TitleTable">
                                        <b-col lg="3" xl="3" style="padding-left: unset !important; color: black !important;" class="title-list-primary">
                                            Marketing Transaction
                                        </b-col>
                                    </template>
                                    <template slot="price" slot-scope="data">
                                        {{isCurrency(data.item.price, decimal)}}
                                    </template>
                                    <template slot="commission" slot-scope="data">
                                        {{isCurrency(data.item.commission, decimal)}}
                                    </template>
                                </HOOList>
                            </b-col>
                        </b-row>
                    </div>
                </div>
              </b-col>
          </b-row>
          <ABSModal id="Modal_Edit" ref="Modal_Edit" size="sm">
            <template slot="headerTitle">
                <span class="title-primary"> {{ $t('Edit') }} Data - {{ModelEdit.name}} </span>
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
                                            v-model="ModelEdit.handphone"
                                            ref="ref_handphone_no"
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
                                            v-model="ModelEdit.email"
                                            ref="ref_email"
                                        />
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col md="12">
                                        <span>
                                            <label class="lbl-poppins">{{ $t('id_no') }}</label>
                                        </span>
                                        <ACCTextBox
                                            :prop="PI_id_no"
                                            v-model="ModelEdit.id_no"
                                            ref="ref_id_no"
                                        />
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col md="6">
                                        <span>
                                            <label class="lbl-poppins">{{ $t('id_picture') }}</label>
                                        </span>
                                        <b-img id="id_pict_show" :src="urlHoonian + ModelEdit.thumbnail_image" alt="" height="150" @error="onImageLoadFailure($event)" />
                                        <HOOImageUpload
                                            :prop="PI_id_pict"
                                            @change="Onid_pictChange"
                                            v-model="ModelEdit.thumbnail_image"
                                        />
                                    </b-col>
                                </b-row>
                                <b-row style="margin-top: 10px;">
                                    <b-col md="8" offset-md="2">
                                        <ABSButton
                                            :text="'Save'"
                                            classButton="btn btn--default"
                                            classIcon="icon-style-1"
                                            @click="doSaveEdit"
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
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
export default {
  props: ['title'],
  computed: {
    paramFromList() {
      var param = this.$store.getters.getParamPage;
      return param;
    },
  },
  watch: {
  },
  data() {
    return {
      propList: {
        url: "/api/marketing-website/user/user-transactions",
        initialWhere: "",
        SortField: "",
        SortBy: "desc",
        ParamWhere: "",
        param: {
          company_group_id: "",
          marketing_agent_id: ""
        }
      },
      Headers: [
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
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "buyer_name",
          label: "Buyer Name",
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "tower",
          label: "Tower",
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
          key: "unit",
          label: "Unit",
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
          key: "price",
          label: "Price",
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
          key: "commission",
          label: "Commission",
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
          key: "status",
          label: "Status",
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
      ],
      Model: {
        marketing_id: "",
        mobile_app_user_id: "",
        user_id: "",
        name: "",
        handphone: "",
        email: "",
        id_no: "",
        thumbnail_image: "",
      },
      ModelEdit: {
        mobile_app_user_id: "",
        name: "",
        handphone: "",
        email: "",
        id_no: "",
        thumbnail_image: "",
        principle_id: "",
        marketing_group_id: "",
      },
      AllProject: [],

      PI_marketing_name: {
        cValidate: "",
        cName: "Marketing Name",
        cOrder: 2,
        cKey: false,
        cType: "text",
        cProtect: true,
        cParentForm: "FormEntry_view",
        cDecimal: 2,
        cInputStatus: "new"
      },
      PI_handphone_no2: {
        cValidate: "",
        cName: "Handphone No",
        cOrder: 1,
        cKey: false,
        cType: "tel",
        cProtect: true,
        cParentForm: "FormEntry_view",
        cDecimal: 2,
        cInputStatus: "new"
      },

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
      PI_id_no: {
        cValidate: "",
        cName: "ID No",
        cOrder: 3,
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
        cOrder: 5,
        cTitle: this.$t('upload_photo'),
        cType: "id_pict",
        cParentForm: "FormEntry"
      },
    };
  },
  methods: {
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    doBack() {
      this.$router.go(-1);
    },
    doEdit() {
      this.ModelEdit = {
        handphone: this.Model.handphone,
        name: this.Model.name,
        email: this.Model.email,
        id_no: this.Model.id_no,
        thumbnail_image: this.Model.thumbnail_image,
        mobile_app_user_id: this.Model.mobile_app_user_id,
        principle_id: this.getDataUser().principle_id,
        marketing_group_id: this.paramFromList.marketing_group_id,
      }
      this.$refs.Modal_Edit._show();
    },
    M_ClearForm() {
      this.Model = {
        marketing_id: "",
        mobile_app_user_id: "",
        user_id: "",
        name: "",
        handphone: "",
        email: "",
        id_no: "",
        thumbnail_image: "",
      };
    },
    getDataBy() {
      this.postJSON(
        this.urlHoonian + "/api/marketing-website/user/detail",
        {
          marketing_agent_id: this.paramFromList.marketing_id
        }
      ).then((response) => {
        if (response == null) return;
        this.Model = response.data;
        this.getAllProject();
        this.getMarketingTrans();
      });
    },
    getAllProject() {
      this.postJSON(
        this.urlHoonian + "/api/marketing-website/user/user-all-project",
        {
          company_group_id: this.company_group_id,
          marketing_agent_id: this.paramFromList.marketing_id
        }
      ).then((response) => {
        if (response == null) return;
        this.AllProject = response.data;
        // for (let i = 0; i < response.data.length; i++) {
        //     const pr = response.data[i];
        //     this.AllProject.push({
        //         ...pr,
        //         check: false
        //     })
        // }
      });
    },
    getMarketingTrans() {
      this.propList.param = {
        company_group_id: this.company_group_id,
        marketing_agent_id: this.paramFromList.marketing_id
      }

      this.$refs.ref_marketing_trans.doGetList("");
    },
    doSaveEdit() {
      this.$validator._base.validateAll("FormEntry").then((result) => {
        if (!result) return;
        this.alertConfirmation("Are You Sure Want To Save This Data ?").then(
          (ress) => {
            if (ress.value) {
              this.$validator.errors.clear("FormEntry");
              this.M_SaveEdit();
            }
          }
        );
      });
    },
    M_SaveEdit() {
      this.postJSON(this.urlHoonian + '/api/marketing-website/user/add-edit', this.ModelEdit).then((response) => {
        if (response == null) return;
        this.Model.name = this.ModelEdit.name;
        this.Model.handphone = this.ModelEdit.handphone;
        this.Model.email = this.ModelEdit.email;
        this.Model.id_no = this.ModelEdit.id_no;
        this.Model.thumbnail_image = this.ModelEdit.thumbnail_image;
        this.$refs.Modal_Edit._hide();
      });
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
      let paramD = [];
      for (let i = 0; i < this.AllProject.length; i++) {
        const pr = this.AllProject[i];
        paramD.push({
          project_id: pr.id,
          portfolio_id: pr.portfolio_id
        });
      }
      let param = {
        user_id: this.Model.user_id,
        projects: paramD
      };

      this.postJSON(this.urlHoonian + '/api/marketing-website/user/assign-project', param).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
  },
  mounted() {
    this.$store.commit("setTitleMenu", "Marketing Project Assignment");
    this.getDataBy();
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
