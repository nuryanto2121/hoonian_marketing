<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>View Unit Type</span>
                </b-col>
                <b-col style="text-align: right;">
                  <ABSButton
                    :text="'Picture'"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    @click="rowClickedPicture"
                  />
                  <ABSButton
                    :text="'Youtube'"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    @click="rowClickedYoutube"
                  />
                  <ABSButton
                    :text="'3D360V'"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    @click="rowClicked3d360v"
                  />
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
              <b-form :data-vv-scope="'FormEntry'" :data-vv-value-path="'FormEntry'">
                <b-row>
                  <b-col md="2">
                    <div>
                      <img :src="require('@/assets/paper.png')" alt style="width: 70px;" />
                    </div>
                  </b-col>
                  <b-col md="10">
                    <b-row>
                      <b-col md="6" class="row-view">
                        <span>
                          <label class="lbl-view">Unit Type Name</label>
                        </span>
                        <br>
                        <span>{{Model.unit_type_name}}</span>
                      </b-col>
                      <b-col style="text-align: right;">
                        {{Model.user_edit}} <br>
                        {{momentUnix(Model.updated_at, "DD MMM YYYY")}} <br>
                        <ABSButton
                            @click="doEdit"
                            text="Edit"
                            classButton="btn btn--default"
                            classIcon="icon-style-1"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6" class="row-view">
                        <span>
                          <label class="lbl-view">Min. Available Reserved Qty</label>
                        </span>
                        <br>
                        <span>{{Model.min_available_reserved_qty}}</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6" class="row-view">
                        <span>
                          <label class="lbl-view">Description</label>
                        </span>
                        <br>
                        <span>{{Model.description}}</span>
                      </b-col>
                    </b-row>

                    <div class="card">
                      <div class="card__title">
                        <b-row>
                          <b-col style="max-width: max-content !important;">
                            <span>Picture</span>
                          </b-col>
                          <b-col style="text-align: right;">
                            <span>
                              <ABSButton
                                :text="'View All'"
                                classButton="button button--new"
                                classIcon="icon-style-1"
                                :disabled="false"
                                @click="doViewAllPicture"
                              />
                            </span>
                          </b-col>
                        </b-row>
                      </div>
                      <div class="card__body">
                        <ACCFormList
                          :prop="{}"
                          :title="''"
                          cStatic
                          cClass="table-style-3"
                          :cHeader="headerPicture"
                          :cData="ModelDetail.picture"
                          @rowClicked="rowClickedPicture"
                          ref="ref_picture"
                        >
                          <template slot="thumbnail_image" slot-scope="data">
                            <img id="picture"
                            :src="data.item.thumbnail_image == '' ?
                            default_pic: urlHoonian + data.item.thumbnail_image"
                            alt height="150" />
                          </template>
                        </ACCFormList>
                      </div>
                    </div>

                    <div class="card">
                      <div class="card__title">
                        <b-row>
                          <b-col style="max-width: max-content !important;">
                            <span>Youtube</span>
                          </b-col>
                          <b-col style="text-align: right;">
                            <span>
                              <ABSButton
                                :text="'View All'"
                                classButton="button button--new"
                                classIcon="icon-style-1"
                                :disabled="false"
                                @click="doViewAllYoutube"
                              />
                            </span>
                          </b-col>
                        </b-row>
                      </div>
                      <div class="card__body">
                        <ACCFormList
                          :prop="{}"
                          :title="''"
                          cStatic
                          cClass="table-style-3"
                          :cHeader="headerYoutube"
                          :cData="ModelDetail.youtube"
                          @rowClicked="rowClickedYoutube"
                          ref="ref_youtube"
                        >
                        </ACCFormList>
                      </div>
                    </div>
                    
                    <div class="card">
                      <div class="card__title">
                        <b-row>
                          <b-col style="max-width: max-content !important;">
                            <span>3D360V</span>
                          </b-col>
                          <b-col style="text-align: right;">
                            <span>
                              <ABSButton
                                :text="'View All'"
                                classButton="button button--new"
                                classIcon="icon-style-1"
                                :disabled="false"
                                @click="doViewAll3d360v"
                              />
                            </span>
                          </b-col>
                        </b-row>
                      </div>
                      <div class="card__body">
                        <ACCFormList
                          :prop="{}"
                          :title="''"
                          cStatic
                          cClass="table-style-3"
                          :cHeader="header3d360v"
                          :cData="ModelDetail._3d360v"
                          @rowClicked="rowClicked3d360v"
                          ref="ref_3d360v"
                        >
                        </ACCFormList>
                      </div>
                    </div>

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

      Model: {
        unit_type_id :"",
        unit_type_name: "",
        min_available_reserved_qty : "",
        description : ""
      },

      ModelDetail: {
        picture: [],
        youtube: [],
        _3d360v: [],
      },
      
      headerPicture: [
        {
          key: "thumbnail_image",
          label: "Picture",
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 S th-cus-center"
        },
      ],
      headerYoutube: [
        {
          key: "link",
          label: "Link",
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 S th-cus-center"
        },
      ],
      header3d360v: [
        {
          key: "link",
          label: "Link",
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 S th-cus-center"
        },
        {
          key: "thumbnail_image",
          label: "Picture",
          tdClass: "ContentACCList2 notranslate th-cus-center",
          thClass: "HeaderACCList2 S th-cus-center"
        },
      ],
    };
  },
  computed: {
    paramFromList() {
      var param = this.$store.getters.getParamPage;
      return param;
    },
    inputStatus() {
      var param = this.$store.getters.getParamPage;
      if (param.ForUnitType.isEdit && param.ForUnitType.isEdit === true) {
        return "edit";
      } else {
        return "new";
      }
    },
  },
  methods: {
      doEdit() {
        var param = this.paramFromList;
        param.ForUnitType.isEdit = true;
        param.ForUnitType.isView = false;
        this.$store.commit("setParamPage", param);
        this.$router.push({ name: "OP_UnitTypeForm" });
      },
    doBack() {
      this.$router.go(-1);
    },
    GetDataBy() {
      this.Model.unit_type_id = this.paramFromList.ForUnitType.id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/view-unit-type-detail', this.Model).then((response) => {
        if (response == null) return;
        let data = response.data.project_master_detail;
        this.Model = data;
        this.Model.unit_type_id = data.id;
        this.ModelDetail.picture = response.data.picture;
        this.ModelDetail.youtube = response.data.youtube;
        this.ModelDetail._3d360v = response.data._3d360v;
      });
    },
    OnActiveChange(data) {
      this.$nextTick(() => {
      });
    },
    doViewAllPicture() {
      let param = this.paramFromList;
      param.isEdit = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "SS_DashboardEventPicture" });
    },
    doViewAllYoutube() {
      let param = this.paramFromList;
      param.isEdit = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "SS_DashboardEventYoutube" });
    },
    doViewAll3d360v() {
      let param = this.paramFromList;
      param.isEdit = false;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "SS_DashboardEvent3D360V" });
    },
    rowClickedPicture(record, index) {
      let param = this.paramFromList;
      param.isEdit = record == null ? false : true;
      param.DetailList = record;
      param.ForNew = this.Model;
      param.picture_type = "unit_type";
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "SS_DashboardEventPictureForm" });
    },
    rowClickedYoutube(record, index) {
      let param = this.paramFromList;
      param.isEdit = record == null ? false : true;
      param.DetailList = record;
      param.ForNew = this.Model;
      param.picture_type = "unit_type";
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "SS_DashboardEventYoutubeForm" });
    },
    rowClicked3d360v(record, index) {
      let param = this.paramFromList;
      param.isEdit = record == null ? false : true;
      param.DetailList = record;
      param.ForNew = this.Model;
      param.picture_type = "unit_type";
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "SS_DashboardEvent3D360VForm" });
    },
  },
  mounted() {
    this.GetDataBy();
  },
};
</script>

