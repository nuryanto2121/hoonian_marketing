<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body" style="font-family: Poppins !important;">
      <div class="">
        <div class="card" style="font-size: 12px !important;">
          <div class="card__body">
            <b-row>
                <b-col style="max-width: max-content !important;">
                    <span style="font-size: 18px; color: #4a93b3;">Assign New Project</span>
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
      </div>
      <div class="card">
        <div class="card__body">
          <b-form :data-vv-scope="'FormEntry'" :data-vv-value-path="'FormEntry'">
            <b-row style="margin-top: 10px;">
              <b-col lg="2">
                <b-img :src="require(inputStatus == 'edit'? '@/assets/icon-svg/edit.svg': '@/assets/icon-svg/add.svg')" alt="" />
              </b-col>
              <b-col lg="10">
                <b-row>
                  <b-col lg="6">
                    <label class="lbl-bold">Principle Name</label>
                    <HOODropDown
                      @change="Onprinciple_nameChange"
                      :prop="PI_principle_name"
                      v-model="Model.principle_name"
                      :label="Model.principle_nameLabel"
                      ref="ref_principle_name"
                    />
                  </b-col>
                </b-row>

                <b-row>
                  <b-col lg="12" style="padding-left: unset !important; padding-right: unset !important;">
                    <!-- <label class="lbl-bold" style="margin-bottom: unset !important; margin-left: 5px;">Assign Units</label> -->
                    <HOOList
                      :prop="AssignProjectPropList"
                      :title="''"
                      cClass="table-style-3_noAct"
                      ButtonBackDisabled
                      SearchDisabled
                      noCard
                      isPoppins
                      isHeaderFixed
                      :cHeader="AssignProjectHeader"
                      ref="ref_list"
                      @rowClicked="rowClicked"
                      removeCardTitle
                      removePaddingTopBody
                      @onRenderData="eventDataRender"
                    >
                      <template slot="is_assigned" slot-scope="data">
                        <div style="margin-left: 20px">
                          <b-form-checkbox
                            v-model="data.item.is_assigned"
                            :name="'is_assigned_' + data.item.id"
                            size="md"
                            @input="onChangeSelected(data.item)"
                          />
                        </div>
                      </template>
                      <!-- <template slot="selling_price" slot-scope="data">
                        {{isCurrency(data.item.selling_price, decimal)}}
                      </template> -->
                      <template slot="head_is_assigned" slot-scope="data">
                        <span style="margin-left: 20px;">
                          Assign
                        </span>
                        <b-form-checkbox
                          style="display: inline-block;"
                          v-model="isHeaderSelected"
                          :name="'head_is_assigned'"
                          size="sm"
                          @input="onChangeHeaderSelected"
                        />
                      </template>
                    </HOOList>
                  </b-col>
                </b-row>
                
                <b-row style="margin-top: 10px;">
                  <b-col offset="3" md="4">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      isHeaderSelected: false,
      Model: {
        principle_name: "",
        principle_nameLabel: "",
        include: true
      },
      PI_principle_name: {
        dataLookUp: {
          url: "/api/hoonian-website/principle-lookup",
          param: {}
        },
        cValidate: "required",
        cName: "Principle Name",
        ckey: false,
        cOrder: 1,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      AssignProjectPropList: {
        url: "/api/hoonian-website/dashboard/operation-detail/principle/projects-assigned",
        initialWhere: "",
        SortField: "",
        SortBy: "",
        ParamWhere: "",
        param: {
          principe_id: "",
        }
      },
      AssignProjectHeader: [
        {
          key: "no",
          label: "No",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "project_name",
          label: "Project Name",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "location",
          label: "Location",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "category",
          label: "Category",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "total_unit",
          label: "Total Unit",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "is_assigned",
          label: "Assign",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
          isCustom: true,
        },
      ],
      AssignProjectItems: [],
    };
  },
  computed: {
    paramFromList() {
      let param = this.$store.getters.getParamPage;
      return param;
    },
    inputStatus() {
      let param = this.$store.getters.getParamPage;
      if (param.isEdit && param.isEdit === true) {
        return "edit";
      } else {
        return "new";
      }
    },
  },
  methods: {
    onSearchEnter(data) {
      this.$nextTick(() => {
        this.renderList();
      })
    },
    removeSearch() {
      this.search = "";
      this.onSearchEnter("");
    },
    onChangeHeaderSelected(data) {
        console.log(data)
      for (let i = 0; i < this.AssignProjectItems.length; i++) {
        this.AssignProjectItems[i].is_assigned = data;
      }

      this.$refs.ref_list.reRender();
    },
    onChangeSelected(data) {
    },
    eventDataRender(data) {
        console.log(data)
      this.AssignProjectItems = data;
    },
    Onprinciple_nameChange(data) {
      this.$nextTick(() => {
        this.Model.principle_name = data.id;
        this.Model.principle_nameLabel = data.label;
        this.AssignProjectPropList.param.principe_id = data.id;
        this.renderList();
      })
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
      for (let i = 0; i < this.AssignProjectItems.length; i++) {
        if (this.AssignProjectItems[i].is_assigned)
          paramD.push({
            id: this.AssignProjectItems[i].project_id,
          });
      }

      let param = {
        principe_id: this.Model.principe_name,
        include: true,
        projects: paramD
      };
      
      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard/operation-detail/principle/assign-project', param).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
    renderList() {
        this.$refs.ref_list.doGetList("");
    }
  },
  mounted() {
    this.renderList();
  }
};
</script>