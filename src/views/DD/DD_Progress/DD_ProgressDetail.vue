<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body poppins">
      <b-row class="dashboardBody">
        <b-col lg="12" xl="12">
          <b-row>
              <b-col lg="12" xl="12">
                  <div class="card">
                    <div class="card__title" style="padding-bottom: 5px !important;">
                    <b-row class="title-primary">
                        <b-col style="max-width: max-content !important;">
                        <span>Progress</span>
                        </b-col>
                        <b-col class="col-right">
                        <span>
                            <ABSButton
                            :text="'Back'"
                            classButton="button button--back"
                            classIcon="icon-style-1"
                            @click="doBack"
                            />
                        </span>
                        </b-col>
                    </b-row>
                    </div>
                </div>
              </b-col>
          </b-row>
          <b-row>
            <b-col lg="12" xl="12">
                <div class="card">
                    <!-- <div class="card__title" style="padding-bottom: 5px !important; border-bottom: unset !important;">
                        <b-row>
                            <b-col>
                                <span style="font-size: 20px; color: #333399;">{{ChartData.month}}</span>
                            </b-col>
                        </b-row>
                    </div> -->
                    <div class="card__body" style="padding: 20px;">
                        <b-row style="margin-bottom: 10px;">
                            <b-col lg="3" style="margin-right: 20px; border: solid 1px #dfe3f3; border-radius: 6px; padding: 15px;">
                                <div style="
                                    width: 175px;
                                    height: 175px;
                                    background-color: #FFFFFF;
                                    border-radius: 50%;
                                    border: 20px solid #ffc700;
                                    text-align: center;
                                " class="precentage">
                                    <div style="margin-top: 28%;">
                                        <span style="color: #333399; font-size: 40px; font-weight: bold;">{{Model.progress_percentage}}%</span>
                                    </div>
                                </div>
                                <div class="progress-x" style="text-align: center;">
                                    <span style="font-weight: bold; font-size: 20px">Progress</span>
                                </div>
                            </b-col>
                            <b-col lg="6" style="margin-right: 20px; border: solid 1px #dfe3f3; border-radius: 6px; padding: 15px;">
                                <b-row style="margin-bottom: 5px;">
                                    <b-col>
                                        <span style="font-weight: bold; font-size: 23px"> {{Model.project_name}} - {{Model.location_name}} </span>
                                    </b-col>
                                </b-row>
                                <b-row style="margin-bottom: 5px;">
                                    <b-col lg="6" xl="6">
                                        <span style="font-weight: bold; font-size: 17px; color: rgb(92 92 173);"> Progress Date </span>
                                    </b-col>
                                    <b-col lg="6" xl="6">
                                        <span style="font-weight: bold; font-size: 17px; color: rgb(92 92 173);"> {{momentUnix(Model.progress_date, "DD MMM YYYY")}} </span>
                                    </b-col>
                                </b-row>
                                <b-row style="margin-bottom: 5px;">
                                    <b-col lg="6" xl="6">
                                        <span style="font-weight: bold; font-size: 13px; color: rgb(92 92 173);"> Project Code </span>
                                    </b-col>
                                    <b-col lg="6" xl="6">
                                        <span style="font-weight: bold; font-size: 13px;"> {{Model.project_code}} </span>
                                    </b-col>
                                </b-row>
                                <b-row style="margin-bottom: 5px;">
                                    <b-col lg="6" xl="6">
                                        <span style="font-weight: bold; font-size: 13px; color: rgb(92 92 173);"> Company Name </span>
                                    </b-col>
                                    <b-col lg="6" xl="6">
                                        <span style="font-size: 13px;"> {{Model.company_name}} </span>
                                    </b-col>
                                </b-row>
                                <b-row style="margin-bottom: 5px;">
                                    <b-col lg="6" xl="6">
                                        <span style="font-weight: bold; font-size: 13px; color: rgb(92 92 173);"> Launching Date </span>
                                    </b-col>
                                    <b-col lg="6" xl="6">
                                        <span style="font-size: 13px;"> {{momentDateFormatting(Model.launching_date, "DD MMMM YYYY")}} </span>
                                    </b-col>
                                </b-row>
                                <b-row style="margin-bottom: 5px;">
                                    <b-col lg="6" xl="6">
                                        <span style="font-weight: bold; font-size: 13px; color: rgb(92 92 173);"> Location </span>
                                    </b-col>
                                    <b-col lg="6" xl="6">
                                        <span style="font-size: 13px;"> {{Model.location_name}} </span>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col lg="6" xl="6">
                                        <span style="font-weight: bold; font-size: 13px; color: rgb(92 92 173);"> Category </span>
                                    </b-col>
                                    <b-col lg="6" xl="6">
                                        <span style="font-size: 13px;"> {{Model.category_name}} </span>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col>
                                <b-img :src="urlHoonian + Model.main_image" alt="" style="height: 100%;" fluid-grow rounded @error="onImageLoadFailure($event)" />
                            </b-col>
                        </b-row>
                        <b-row style="margin-bottom: 15px;">
                            <b-col style="margin-left: 10px;">
                                <div>
                                    <span style="font-weight: bold; font-size: 13px; color: rgb(92 92 173);"> Notes </span>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row style="margin-bottom: 15px;">
                            <b-col style="border: solid 1px #dfe3f3; border-radius: 6px; ">
                                <!-- <div style="margin-bottom: 5px;">
                                    <span style="font-weight: bold; font-size: 13px; color: rgb(92 92 173);"> Notes </span>
                                </div> -->
                                <div style="width: 100%; padding: 15px;">
                                    <span style="font-size: 13px;">{{Model.notes}}</span>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row style="margin-bottom: 15px;">
                            <b-col class="noPadding">
                                <div style="margin-bottom: 5px;">
                                    <span style="font-weight: bold; font-size: 23px; color: rgb(92 92 173);"> Gallery </span>
                                </div>
                                <b-row>
                                    <template v-for="(data, index) in tempMedia">
                                        <b-col v-bind:key="index" class="noPadding">
                                            <b-row>
                                                <b-col style="margin-bottom: 10px;" class="noPadding">
                                                    <b-img @click="showImage(data.thumbnail_image)" :src="urlHoonian + data.thumbnail_image" alt="" style="height: 125px !important; width: 125px !important;" fluid-grow rounded @error="onImageLoadFailure($event)" />
                                                </b-col>
                                            </b-row>
                                            <b-row>
                                                <b-col>
                                                    <span style="font-weight: bold; font-size: 17px;"> {{data.remarks}} </span>
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                    </template>
                                </b-row>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col class="offset-right" style="max-width: max-content;">
                                <b-row>
                                    <b-col v-if="Model.medias.length > 5" style="max-width: max-content; border: solid 1px #dfe3f3; border-radius: 6px; padding: 5px 10px 5px 10px !important; font-size: 20px; margin-right: 5px;">
                                        <!-- <b-img :src="require('@/assets/icon-svg/chevron_left.svg')" alt="" style="cursor: pointer;" @click="onLeftClick"/> -->
                                        <font-awesome-icon class="icon-style-default" icon="angle-double-left" @click="onFirstClick" />
                                    </b-col>
                                    <b-col v-if="Model.medias.length > 5" style="max-width: max-content; border: solid 1px #dfe3f3; border-radius: 6px; padding: 5px 10px 5px 10px !important; font-size: 20px; margin-right: 15px;">
                                        <!-- <b-img :src="require('@/assets/icon-svg/chevron_left.svg')" alt="" style="cursor: pointer;" @click="onFirstClick"/> -->
                                            <font-awesome-icon class="icon-style-default" icon="chevron-left" @click="onLeftClick" />
                                    </b-col>
                                    <b-col v-if="Model.medias.length > 5" style="max-width: max-content; border: solid 1px #dfe3f3; border-radius: 6px; padding: 5px 10px 5px 10px !important; font-size: 20px; margin-right: 5px;">
                                        <!-- <b-img :src="require('@/assets/icon-svg/chevron_right.svg')" alt="" style="cursor: pointer;"  @click="onRightClick" /> -->
                                            <font-awesome-icon class="icon-style-default" icon="chevron-right" @click="onRightClick" />
                                    </b-col>
                                    <b-col v-if="Model.medias.length > 5" style="max-width: max-content; border: solid 1px #dfe3f3; border-radius: 6px; padding: 5px 10px 5px 10px !important; font-size: 20px; margin-right: 5px;">
                                        <!-- <b-img :src="require('@/assets/icon-svg/chevron_right.svg')" alt="" style="cursor: pointer;"  @click="onLastClick" /> -->
                                            <font-awesome-icon class="icon-style-default" icon="angle-double-right" @click="onLastClick" />
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </div>
                </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <ABSModalImage id="Modal_Image" ref="Modal_Image" size="md" />
    </div>
  </div>
</template>
<script>
export default {
  props: ['title'],
  computed: {
    _projectId () {
      return this.$store.getters.getProjectId;
    },
    paramFromList() {
      var param = this.$store.getters.getParamPage;
      return param;
    },
  },
  watch: {
    _projectId (newValue, oldValue) {
      this.getDataDetail();
    }
  },
  data() {
    return {
      Model: {
        project_id: this.getDashboardProjectID(),
        progress_percentage: 0,
        project_name: "",
        location_name: "",
        project_code: "",
        progress_date: 0,
        launching_date: "",
        company_name: "",
        category_name: "",
        notes: "",
        main_image: "",
        medias: []
      },
      index: 0,
      tempMedia: [],
    };
  },
  methods: {
    showImage(pathUrl) {
      this.$refs.Modal_Image._show(this.urlHoonian + pathUrl);
    },
    doBack() {
      this.$router.go(-1);
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    getDataDetail() {
        let param = {
            project_progress_id: this.paramFromList.id,
        };
        this.postJSON(
            this.urlHoonian + "/api/hoonian-website/dashboard/project-info/progress/detail",
            param
        ).then((response) => {
            if (response == null) return;
            let data = response.data;
            this.Model = {
                project_id: this.getDashboardProjectID(),
                progress_percentage: parseInt(data.info.progress_percentage).toFixed(0),
                project_name: data.info.project_name,
                location_name: data.info.location_name,
                project_code: data.info.refference_code,
                progress_date: data.info.progress_date,
                launching_date: data.info.project_start,
                company_name: data.info.company_group_name,
                category_name: data.info.project_type_desc,
                notes: data.info.notes,
                main_image: data.info.main_image,
                medias: data.medias
            }

            this.$forceUpdate();

            this.index = 0;
            this.setImages();
        });
    },
    setImages() {
      if (this.Model.medias.length > 5) {
        this.tempMedia = [];
        for (let x = this.index; x < (5 + this.index); x++) {
          this.tempMedia.push(this.Model.medias[x]);
        }
      } else {
        this.tempMedia = [
          ...this.Model.medias
        ]
      }
    },
    onLeftClick() {
      if (this.index == 0) return;
      --this.index;
      this.setImages();
    },
    onRightClick() {
      if (this.index == (this.Model.medias.length - 5)) return;
      ++this.index;
      this.setImages();
    },
    onFirstClick() {
      if (this.index == 0) return;
      this.index = 0;
      this.setImages();
    },
    onLastClick() {
      if (this.index == (this.Model.medias.length - 5)) return;
      this.index = this.Model.medias.length - 5;
      this.setImages();
    },
  },
  mounted() {
    this.getDataDetail();
  },
};
</script>

<style scoped>
@media (min-width: 992px) {
    .precentage {
        position: absolute;
        top: 46%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .progress-x {
        position: absolute;
        top: 92%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .offset-right {
        margin-left: 74%;
    }
}
</style>
