<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col lg="12" xl="12">
          <b-row>
              <b-col lg="12" xl="12">
                <b-row>
                  <b-col lg="2" xl="2" style="margin-right: 20px;">
                    <b-img :src="urlHoonian + ''" alt="" style="height: 90px;" fluid-grow rounded @error="onImageLoadFailure($event)" />
                  </b-col>
                  <b-col>
                      <b-row>
                          <b-col>
                                <label style="font-weight: bold; font-size: 20px; height: 110px;" class="title-primary">
                                    {{Model.project_name}}
                                </label>
                          </b-col>
                      </b-row>
                      <b-row>
                            <b-col style="margin-right: 20px;">
                                <div style="position: absolute; bottom: 0;">
                                    <label style="font-weight: bold; font-size: 20px; margin-bottom: 10px;" class="lbl-poppins"> Total Marketing </label> <br>
                                    <label style="font-weight: bolder; font-size: 20px;" class="title-primary">
                                        {{Model.total_marketing}}
                                    </label>
                                </div>
                            </b-col>
                            <b-col style="margin-right: 20px;">
                                <div style="position: absolute; bottom: 0;">
                                    <label style="font-weight: bold; font-size: 20px; margin-bottom: 10px;" class="lbl-poppins">{{$t('units') + ' ' + $t('sold')}}</label> <br>
                                    <label style="font-weight: bolder; font-size: 20px;" class="title-primary">
                                        {{Model.unit_sold}}
                                    </label>
                                </div>
                            </b-col>
                            <b-col style="margin-right: 20px;">
                                <div style="position: absolute; bottom: 0;">
                                    <label style="font-weight: bold; font-size: 20px; margin-bottom: 10px;" class="lbl-poppins">{{$t('sales_value')}}</label> <br>
                                    <label style="font-weight: bolder; font-size: 20px;" class="title-primary">
                                        {{Model.sales_value_s}}
                                    </label>
                                </div>
                            </b-col>
                            <b-col>
                                <div style="position: absolute; bottom: 0;">
                                    <label style="font-weight: bold; font-size: 20px; margin-bottom: 10px;" class="lbl-poppins">Total {{$t('commision')}}</label> <br>
                                    <label style="font-weight: bolder; font-size: 20px;" class="title-primary">
                                        {{Model.total_commission_s}}
                                    </label>
                                </div>
                            </b-col>
                      </b-row>
                  </b-col>
                </b-row>
                <div class="card">
                    <div class="card__body">
                        <b-row>
                            <b-col>
                                <HOOList
                                    :prop="propList"
                                    :title="''"
                                    :ref="'ref_project_marketing'"
                                    ButtonBackDisabled
                                    SearchDisabled
                                    isPoppins
                                    isHeaderFixed
                                    noCard
                                    noTitle
                                    removeCardTitle
                                    removePaddingTopBody
                                    :cHeader="Headers"
                                >
                                    <template slot="sales_value" slot-scope="data">
                                        {{isCurrency(data.item.sales_value, decimal)}}
                                    </template>
                                    <template slot="commission" slot-scope="data">
                                        {{isCurrency(data.item.commission, decimal)}}
                                    </template>
                                    <template slot="remaining_comm" slot-scope="data">
                                        {{isCurrency(data.item.remaining_comm, decimal)}}
                                    </template>
                                </HOOList>
                            </b-col>
                        </b-row>
                    </div>
                </div>
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
        url: "/api/marketing-website/user/project-detail-grid",
        initialWhere: "",
        SortField: "",
        SortBy: "desc",
        ParamWhere: "",
        param: {
          principle_id: "",
          project_id: "",
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
          key: "unit_sold",
          label: "Unit Sold",
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
          key: "sales_value",
          label: "Total Value",
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
          key: "remaining_comm",
          label: "Remaining Comm.",
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
      ],
      Model: {
        id: "",
        project_name: "",
        icon_project: "",
        unit_sold: "",
        sales_value: "",
        total_commission: "",
        total_marketing: "",
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
    M_ClearForm() {
      this.Model = {
        id: "",
        project_name: "",
        icon_project: "",
        unit_sold: "",
        sales_value: "",
        total_commission: "",
        total_marketing: "",
      };
    },
    getDataBy() {
      this.postJSON(
        this.urlHoonian + "/api/marketing-website/user/project-detail-header",
        {
          principle_id: this.getDataUser().principle_id,
          project_id: this.paramFromList.id
        }
      ).then((response) => {
        if (response == null) return;
        this.Model = response.data;
        this.Model.sales_value_s = this.isCurrency(this.Model.sales_value, 0);
        this.Model.total_commission_s = this.isCurrency(this.Model.total_commission, 0);

        this.propList.initialWhere = this.paramFromList.id;
        this.propList.param = {
          principle_id: this.getDataUser().principle_id,
          project_id: this.paramFromList.id
        }

        this.$refs.ref_project_marketing.doGetList("");
      });
    },
  },
  mounted() {
    this.$store.commit("setTitleMenu", "Project Marketing");
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
