<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important">
                  <span>{{ title }} Mobile ACL</span>
                </b-col>
                <b-col style="text-align: right">
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
                :data-vv-scope="'FormEntry'"
                :data-vv-value-path="'FormEntry'"
              >
                <b-row>
                  <b-col md="2">
                    <div>
                      <img
                        :src="require('@/assets/paper.png')"
                        alt
                        style="width: 70px"
                      />
                    </div>
                  </b-col>
                  <b-col md="10">
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label
                            ><span style="color: red">* </span>ACL Name</label
                          >
                        </span>
                        <ACCTextBox
                          :prop="PI_acl_name"
                          v-model="Model.acl_name"
                          ref="ref_acl_name"
                        />
                      </b-col>
                      <b-col style="text-align: right">
                        {{ Model.user_edit }} <br />
                        {{ momentUnix(Model.updated_at, "DD MMM YYYY") }}
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label
                            ><span style="color: red">* </span>Open To
                            Developer</label
                          >
                        </span>
                        <ACCRadioButton
                          @input="OnOpenToDeveloperChange"
                          :prop="PI_is_open_to_developer"
                          v-model="Model.is_open_to_developer"
                          ref="ref_is_open_to_developer"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Menu Navbar 1</label>
                        </span>
                        <HOODropDown
                          @change="Onnavbar_menu_1Change"
                          :prop="PI_navbar_menu_label_1"
                          v-model="Model.navbar_menu_1"
                          :label="Model.navbar_menu_label_1"
                          ref="ref_action"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Menu Navbar 2</label>
                        </span>
                        <HOODropDown
                          @change="Onnavbar_menu_2Change"
                          :prop="PI_navbar_menu_label_2"
                          v-model="Model.navbar_menu_2"
                          :label="Model.navbar_menu_label_2"
                          ref="ref_action"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Menu Navbar 3</label>
                        </span>
                        <HOODropDown
                          @change="Onnavbar_menu_3Change"
                          :prop="PI_navbar_menu_label_3"
                          v-model="Model.navbar_menu_3"
                          :label="Model.navbar_menu_label_3"
                          ref="ref_action"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Menu Navbar 4</label>
                        </span>
                        <HOODropDown
                          @change="Onnavbar_menu_4Change"
                          :prop="PI_navbar_menu_label_4"
                          v-model="Model.navbar_menu_4"
                          :label="Model.navbar_menu_label_4"
                          ref="ref_action"
                        />
                      </b-col>
                    </b-row>
                    <b-row v-show="title == 'Edit'">
                      <b-col md="12">
                        <div class="card">
                          <div class="card__title">
                            <b-row>
                              <b-col style="max-width: max-content !important">
                                <span>Menu Mobile</span>
                              </b-col>
                            </b-row>
                          </div>
                          <div class="card__body">
                            <ACCFormList
                              :prop="{}"
                              :title="''"
                              cStatic
                              cClass="table-style-3_noAct"
                              :cHeader="MenusHeader"
                              :cData="MenusItems"
                              @rowClicked="rowPaymentClicked"
                              ref="ref_Payment"
                            >
                              <template slot="is_checked" slot-scope="data">
                                <div style="margin-left: 20px">
                                  <b-form-checkbox
                                    v-model="data.item.is_checked"
                                    :name="'is_checked_' + data.item.id"
                                    size="md"
                                    @input="onChangeChecked(data.item)"
                                  />
                                </div>
                              </template>
                              <template
                                slot="head_is_checked"
                                slot-scope="data"
                              >
                                <span style="margin-left: 20px">
                                  Checked Alls
                                </span>
                                <b-form-checkbox
                                  style="display: inline-block"
                                  v-model="isHeaderPick"
                                  :name="'head_is_checked'"
                                  size="sm"
                                  @input="onChangeHeaderPick"
                                />
                              </template>
                            </ACCFormList>
                          </div>
                        </div>
                      </b-col>
                    </b-row>

                    <b-row style="margin-top: 10px">
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

      MasterPrincipleList_propList: {
        url: "/api/hoonian-website/principle-master-list",
        initialWhere: "",
        SortField: "",
        SortBy: "",
        ParamWhere: "",
      },

      MenusHeader: [
        {
          key: "menu_name",
          label: "Menu Name",
          tdClass: "ContentACCList2 notranslate",
          thClass: "HeaderACCList2 L th-cus-center",
        },
        {
          key: "is_checked",
          label: "Checked",
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 L th-cus-center",
          isCustom: true,
        },
      ],
      MenusItems: [],
      isHeaderPick: false,

      Model: {
        mobile_menu_seqno: "",
        acl_name: "",
        is_open_to_developer: true,
        navbar_menu_1: "",
        navbar_menu_label_1: "",
        navbar_menu_2: "",
        navbar_menu_label_2: "",
        navbar_menu_3: "",
        navbar_menu_label_3: "",
        navbar_menu_4: "",
        navbar_menu_label_4: "",
      },
      PI_acl_name: {
        cValidate: "",
        cName: "menu ID",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_is_open_to_developer: {
        cValidate: "",
        cName: "is_open_to_developer",
        cId: "rdis_open_to_developer",
        cRadioOptions: [
          { text: "Yes", value: true },
          { text: "No", value: false },
        ],
        cRadioDefaultOption: true,
        cOrder: 2,
        cProtect: false,
        cVisible: true,
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus,
        cGroup: false,
      },
      PI_navbar_menu_label_1: {
        dataLookUp: {
          url: "/api/hoonian-website/menu-lookup",
          param: {},
        },
        cValidate: "",
        cName: "navbar_menu_label_1",
        ckey: false,
        cOrder: 3,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
      PI_navbar_menu_label_2: {
        dataLookUp: {
          url: "/api/hoonian-website/menu-lookup",
          param: {},
        },
        cValidate: "",
        cName: "navbar_menu_label_2",
        ckey: false,
        cOrder: 4,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
      PI_navbar_menu_label_3: {
        dataLookUp: {
          url: "/api/hoonian-website/menu-lookup",
          param: {},
        },
        cValidate: "",
        cName: "navbar_menu_label_3",
        ckey: false,
        cOrder: 5,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
      },
      PI_navbar_menu_label_4: {
        dataLookUp: {
          url: "/api/hoonian-website/menu-lookup",
          param: {},
        },
        cValidate: "",
        cName: "navbar_menu_label_4",
        ckey: false,
        cOrder: 6,
        cProtect: false,
        cParentForm: "FormEntry",
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
    rowPaymentClicked() {},
    OnOpenToDeveloperChange(data) {},
    onChangeChecked(data, index) {
      if (!data.is_checked) {
        data.is_checked = false;
      }
    },
    onChangeHeaderPick(data) {
      for (let i = 0; i < this.MenusItems.length; i++) {
        this.MenusItems[i].is_checked = data;
        this.onChangeChecked(this.MenusItems[i], i);
      }
    },
    Onnavbar_menu_1Change(data) {
      this.$nextTick(() => {
        this.Model.navbar_menu_1 = data.id;
        this.Model.navbar_menu_label_1 = data.label;
      });
    },
    Onnavbar_menu_2Change(data) {
      this.$nextTick(() => {
        this.Model.navbar_menu_2 = data.id;
        this.Model.navbar_menu_label_2 = data.label;
      });
    },
    Onnavbar_menu_3Change(data) {
      this.$nextTick(() => {
        this.Model.navbar_menu_3 = data.id;
        this.Model.navbar_menu_label_3 = data.label;
      });
    },
    Onnavbar_menu_4Change(data) {
      this.$nextTick(() => {
        this.Model.navbar_menu_4 = data.id;
        this.Model.navbar_menu_label_4 = data.label;
      });
    },
    doBack() {
      this.$router.go(-1);
    },
    M_ClearForm() {
      this.Model = {
        mobile_menu_seqno: "",
        acl_name: "",
        is_open_to_developer: true,
        navbar_menu_1: "",
        navbar_menu_label_1: "",
        navbar_menu_2: "",
        navbar_menu_label_2: "",
        navbar_menu_3: "",
        navbar_menu_label_3: "",
        navbar_menu_4: "",
        navbar_menu_label_4: "",
      };
    },
    doSave() {
      this.$validator._base.validateAll("FormEntry").then((result) => {
        if (!result) return;
        this.alertConfirmation("Are You Sure Want To Save This Data ?").then(
          (ress) => {
            if (ress.value) {
              this.$validator.errors.clear("FormEntry");
              if (this.inputStatus == "new") {
                this.M_Save();
              } else {
                this.M_Update();
              }
            }
          }
        );
      });
    },
    M_Save() {
      var param = {
        mobile_menu_seqno: "",
        acl_name: this.Model.acl_name,
        is_open_to_developer: this.Model.is_open_to_developer,
        navbar_menu_1: this.Model.navbar_menu_1,
        navbar_menu_2: this.Model.navbar_menu_2,
        navbar_menu_3: this.Model.navbar_menu_3,
        navbar_menu_4: this.Model.navbar_menu_4,
        menus: [],
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/mobile-acl-addedit",
        param
      ).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
    M_Update() {
      let paramI = [];
      this.MenusItems.forEach((data, index) => {
        if (!data.is_checked) return;
        paramI.push({
          id: data.id,
        });
      });
      var param = {
        mobile_menu_seqno: this.Model.mobile_menu_seqno,
        acl_name: this.Model.acl_name,
        is_open_to_developer: this.Model.is_open_to_developer,
        navbar_menu_1: this.Model.navbar_menu_1,
        navbar_menu_2: this.Model.navbar_menu_2,
        navbar_menu_3: this.Model.navbar_menu_3,
        navbar_menu_4: this.Model.navbar_menu_4,
        menus: paramI,
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/mobile-acl-addedit",
        param
      ).then((response) => {
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
    M_Delete() {},
    GetDataBy() {
      this.Model.mobile_menu_seqno = this.paramFromList.mobile_menu_seqno;
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/mobile-acl-detail",
        this.Model
      ).then((response) => {
        if (response == null) return;
        this.Model = response.data.mobile_menu_seqno_detail;
        this.Model.mobile_menu_seqno = this.Model.mobile_menu_seqno;
        this.MenusItems = response.data.menus;
      });
    },
    OnActiveChange(data) {
      this.$nextTick(() => {});
    },
  },
  mounted() {
    this.M_ClearForm();
    if (this.inputStatus == "edit") {
      this.title = "Edit";
      this.GetDataBy();
    } else {
      this.title = "Add";
    }
  },
};
</script>

