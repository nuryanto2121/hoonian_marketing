<template>
  <div>
    <b-row class="dashboardBody">
      <b-col cols="12">
        <b-row>
            <b-col cols="12">
              <b-row style="overflow-x: auto; white-space: nowrap; display: block !important;">
                <template v-for="(data, index) in ModelProject">
                  <b-col cols="8" v-bind:key="index" style="background-color: #FFFF; margin: 5px; cursor: pointer; display: inline-block; float: none;" :class="'nup-card '+ (selectedProject == index ? 'activate' : '')" @click.prevent="onProjectChange(index)">
                    <b-row class="noPadding">
                      <b-col class="noPadding" cols="4" style="padding-top: 5px !important; padding-bottom: 5px !important;">
                        <b-img :src="urlHoonian + data.icon_project" alt="" style="height: 75px;" fluid-grow rounded @error="onImageLoadFailure($event)" />
                      </b-col>
                      <b-col class="noPadding" cols="6">
                        <div class="center" style="text-align: center; width: 100%;">
                          <span class="title-primary" style="font-weight: bold; font-size: 17px; color: #4f4f4f !important;"> Total NUP </span> <br>
                          <span class="title-primary" style="font-weight: bold; font-size: 17px;">{{data.total_nup}}</span>
                        </div>
                      </b-col>
                      <b-col class="noPadding" cols="2">
                        <font-awesome-icon v-if="data.total_nup" @click.stop="doAdd(data)" class="icon-style-default title-primary" icon="plus-circle" style="font-size: 2em !important; position: absolute; bottom: 10px;" />
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
                :prop="selectedProject == -1 ? {}: ModelProject[selectedProject].propList"
                :title="$t('detail_nup_buyers')"
                @rowClicked="rowClicked"
                @buttonDeleteClicked="doDeleteClick"
                @rowDblClicked="doDoubleClick"
                @rowLinkClick="rowLink"
                @pageSize="M_PageSize"
                @pagination="M_Pagination"
                @filter="M_Advance_Filter"
                @headTable="M_Head_Table"
                @refreshColumn="refreshColumn"
                :ref="'ref_list'"
                @buttonViewClicked="doViewClick"
                ButtonBackDisabled
                SearchDisabled
                isPoppins
                isHeaderFixed
                :cHeader="Headers"
              >
                <template slot="TitleTable">
                  <b-col lg="3" xl="3" style="padding-left: unset !important;" class="title-list-primary">
                    {{ $t('detail_nup_buyers') }}
                  </b-col>
                </template>
                <template slot="total_nup" slot-scope="data">
                  <b-row>
                    <b-col cols="2">
                      {{data.item.total_nup}}
                    </b-col>
                    <b-col>
                      <ABSButton
                        text="No NUP"
                        classButton="button button--hoonian"
                        icon="wallet"
                        @click="doShowNoNUP(data.item)"
                      />
                    </b-col>
                  </b-row>
                </template>
              </HOOList>
          </b-col>
      </b-row>
      </b-col>
    </b-row>

    <ABSModal id="Modal_NoNUP" ref="Modal_NoNUP" size="md">
      <template slot="headerTitle">
        <span class="title-primary"> {{ $t('nup_list') }} - {{dataRowClick? dataRowClick.name: ""}} </span>
      </template>
      <template slot="content">
        <b-row>
          <b-col md="12">
            <b-form :data-vv-scope="'FormEntry'" :data-vv-value-path="'FormEntry'">
              <b-row>
                <b-col md="12">
                  <HOOList
                    :prop="propNoNUP"
                    :title="''"
                    @rowClicked="rowClickedNoNUP"
                    @buttonDeleteClicked="doDeleteClick"
                    @rowDblClicked="doDoubleClick"
                    @rowLinkClick="rowLink"
                    @pageSize="M_PageSize"
                    @pagination="M_Pagination"
                    @filter="M_Advance_Filter"
                    @headTable="M_Head_Table"
                    @refreshColumn="refreshColumn"
                    :ref="'ref_list_nup'"
                    @buttonViewClicked="doViewClick"
                    ButtonBackDisabled
                    SearchDisabled
                    isPoppins
                    isHeaderFixed
                    :cHeader="HeaderNupList"
                    noCard
                    noTitle
                    removePaddingTopBody
                  >
                  </HOOList>
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
      Headers: [
        {
          key: "no",
          label: "NO",
          thClass: "HeaderACCList2Poppins th-cus-left XS",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "name",
          label: this.$t('buyer_name').toUpperCase(),
          thClass: "HeaderACCList2Poppins th-cus-left M",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "id_no",
          label: this.$t('id_no').toUpperCase(),
          thClass: "HeaderACCList2Poppins th-cus-left S",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "handphone",
          label: this.$t('handphone_no').toUpperCase(),
          thClass: "HeaderACCList2Poppins th-cus-left S",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "marketing_name",
          label: this.$t('marketing_name').toUpperCase(),
          thClass: "HeaderACCList2Poppins th-cus-left M",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "project_name",
          label: this.$t('project_name').toUpperCase(),
          thClass: "HeaderACCList2Poppins th-cus-left L",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "total_nup",
          label: `${this.$t('total').toUpperCase()} NUP`,
          thClass: "HeaderACCList2Poppins th-cus-left M",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "pending",
          label: this.$t('pending').toUpperCase(),
          thClass: "HeaderACCList2Poppins th-cus-left S",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "used",
          label: this.$t('used').toUpperCase(),
          thClass: "HeaderACCList2Poppins th-cus-left S",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "refund",
          label: this.$t('refund').toUpperCase(),
          thClass: "HeaderACCList2Poppins th-cus-left S",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
      ],
      HeaderNupList: [
        {
          key: "no",
          label: "NO",
          thClass: "HeaderACCList2Poppins th-cus-left",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "nup_no",
          label: "NUP NO",
          thClass: "HeaderACCList2Poppins th-cus-left",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
      ],
      
      ModelProject: [],
      selectedProject: -1,
      dataRowClick: undefined,
      propNoNUP: {
        url: "/api/marketing-website/nup/nup-no",
        initialWhere: "",
        SortField: "",
        SortBy: "asc",
        ParamWhere: "",
        param: {
          marketing_agent_id: this.getDataUser().marketing_id,
          customer_id: "",
        }
      }
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
    rowClicked(ev, id) {
      console.log(ev, id)
    },
    rowClickedNoNUP(ev, id) {
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
    doShowNoNUP(param) {
      this.dataRowClick = param;
      this.propNoNUP.param.customer_id = param.customer_id;
      this.propNoNUP.initialWhere = this.ModelProject[this.selectedProject].id;
      this.$refs.ref_list_nup.doGetList("");
      this.$refs.Modal_NoNUP._show();
    },
    doBack() {
      this.$router.go(-1);
    },
    Onname_cardChange(data) {
      this.Model.name_card = data.url;
    },
    doAdd(data) {
      var param = data;
      param.isEdit = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "MK_NUPForm" });
    },
    getProject() {
      let param = {
        company_group_id: this.company_group_id,
        principle_id: this.getDataUser().principle_id,
        marketing_agent_id: this.getDataUser().marketing_id,
      };

      this.postJSON(this.urlHoonian + '/api/marketing-website/nup/header', param).then((response) => {
        if (response == null) return;
        let data = response.data;
        this.ModelProject = [];
        if (data.length > 0 && this.selectedProject == -1) 
          this.selectedProject = 0;

        for (let i = 0; i < data.length; i++) {
          this.ModelProject.push({
            ...data[i],
            propList: {
              url: "/api/marketing-website/nup/grid",
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
      this.$refs.ref_list.doGetList("");
    },
  },
  mounted() {
    this.getProject();
    this.$store.commit("setTitleMenu", "NUP");
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
