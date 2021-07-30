<template>
  <div>
    <b-row class="dashboardBody">
      <b-col cols="12">
        <b-row>
            <b-col cols="12">
              <b-row class="display-only-landscape-flex">
                <b-col cols="2" style="margin-right: 20px; display: inline-block;">
                  <b-img :src="urlHoonian + ''" alt="" style="height: 100px;" class="center" fluid-grow rounded @error="onImageLoadFailure($event)" />
                </b-col>
                <b-col style="display: inline-block;">
                    <b-row>
                        <b-col style="display: inline-block;">
                              <label style="font-weight: bold; font-size: 20px; height: 110px;" class="title-primary">
                                  {{Model.project_name}}
                              </label>
                        </b-col>
                    </b-row>
                    <b-row>
                          <b-col style="margin-right: 20px; display: inline-block;">
                              <div style="position: absolute; bottom: 0;">
                                  <label style="font-weight: bold; font-size: 17px; margin-bottom: 10px;" class="lbl-poppins"> Total Marketing </label> <br>
                                  <label style="font-weight: bolder; font-size: 20px;" class="title-primary">
                                      {{Model.total_marketing}}
                                  </label>
                              </div>
                          </b-col>
                          <b-col style="margin-right: 20px; display: inline-block;">
                              <div style="position: absolute; bottom: 0;">
                                  <label style="font-weight: bold; font-size: 17px; margin-bottom: 10px;" class="lbl-poppins">{{$t('units') + ' ' + $t('sold')}}</label> <br>
                                  <label style="font-weight: bolder; font-size: 20px;" class="title-primary">
                                      {{Model.unit_sold}}
                                  </label>
                              </div>
                          </b-col>
                          <b-col style="margin-right: 20px; display: inline-block;">
                              <div style="position: absolute; bottom: 0;">
                                  <label style="font-weight: bold; font-size: 17px; margin-bottom: 10px;" class="lbl-poppins">{{$t('sales_value')}}</label> <br>
                                  <label style="font-weight: bolder; font-size: 20px;" class="title-primary">
                                      {{Model.sales_value_s}}
                                  </label>
                              </div>
                          </b-col>
                          <b-col style="display: inline-block;">
                              <div style="position: absolute; bottom: 0;">
                                  <label style="font-weight: bold; font-size: 17px; margin-bottom: 10px;" class="lbl-poppins">Total {{$t('commision')}}</label> <br>
                                  <label style="font-weight: bolder; font-size: 20px;" class="title-primary">
                                      {{Model.total_commission_s}}
                                  </label>
                              </div>
                          </b-col>
                    </b-row>
                </b-col>
              </b-row>
              <b-row class="display-only-potrait-flex">
                <b-col cols="5" style="display: inline-block;">
                  <b-img :src="urlHoonian + ''" alt="" style="height: 100px;" class="center" fluid-grow rounded @error="onImageLoadFailure($event)" />
                </b-col>
                <b-col style="display: inline-block;" class="noPadding">
                    <b-row>
                        <b-col style="display: inline-block;">
                              <label style="font-weight: bold; font-size: 17px;" class="title-primary text-single">
                                  {{Model.project_name}}
                              </label>
                        </b-col>
                    </b-row>
                    <b-row>
                          <b-col style="display: inline-block;">
                              <div>
                                  <label style="font-weight: normal; font-size: 15px; margin-bottom: unset !important;" class="lbl-poppins"> Total Marketing </label> <br>
                                  <label style="font-weight: bolder; font-size: 15px;" class="title-primary">
                                      {{Model.total_marketing}}
                                  </label>
                              </div>
                          </b-col>
                    </b-row>
                    <b-row>
                          <b-col style="display: inline-block;">
                              <div>
                                  <label style="font-weight: normal; font-size: 15px; margin-bottom: unset !important;" class="lbl-poppins">{{$t('units') + ' ' + $t('sold')}}</label> <br>
                                  <label style="font-weight: bolder; font-size: 15px;" class="title-primary">
                                      {{Model.unit_sold}}
                                  </label>
                              </div>
                          </b-col>
                    </b-row>
                </b-col>
              </b-row>

              <b-row class="display-only-potrait-flex">
                <b-col cols="5" style="display: inline-block;">
                    <div>
                        <label style="font-weight: normal; font-size: 15px; margin-bottom: unset !important;" class="lbl-poppins">{{$t('sales_value')}}</label> <br>
                        <label style="font-weight: bolder; font-size: 15px;" class="title-primary">
                            {{Model.sales_value_s}}
                        </label>
                    </div>
                </b-col>
                <b-col style="display: inline-block;">
                    <div>
                        <label style="font-weight: normal; font-size: 15px; margin-bottom: unset !important;" class="lbl-poppins">Total {{$t('commision')}}</label> <br>
                        <label style="font-weight: bolder; font-size: 15px;" class="title-primary">
                            {{Model.total_commission_s}}
                        </label>
                    </div>
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
          label: "NO",
          thClass: "HeaderACCList2Poppins th-cus-center",
          tdClass: "ContentACCList2Poppins notranslate th-cus-center"
        },
        {
          key: "name",
          label: this.$t('name').toUpperCase(),
          thClass: "HeaderACCList2Poppins M th-cus-left",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "handphone",
          label: this.$t('handphone').toUpperCase(),
          thClass: "HeaderACCList2Poppins M th-cus-left",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "unit_sold",
          label: this.$t('unit_sold').toUpperCase(),
          thClass: "HeaderACCList2Poppins M th-cus-left",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "sales_value",
          label: this.$t('sales_value').toUpperCase(),
          thClass: "HeaderACCList2Poppins M th-cus-left",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "commission",
          label: this.$t('commission').toUpperCase(),
          thClass: "HeaderACCList2Poppins M th-cus-left",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
        },
        {
          key: "remaining_comm",
          label: this.$t('remaining_comm').toUpperCase(),
          thClass: "HeaderACCList2Poppins M th-cus-left",
          tdClass: "ContentACCList2Poppins notranslate th-cus-left"
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
