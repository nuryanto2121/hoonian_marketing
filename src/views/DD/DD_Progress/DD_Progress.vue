<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body poppins">
      <b-row class="dashboardBody">
        <b-col lg="12" xl="12">
          <b-row>
              <b-col lg="12" xl="12">
                  <div class="card">
                    <div class="card__title title-primary" style="padding-bottom: 5px !important; padding-left: 15px !important;">
                    <b-row>
                        <b-col style="max-width: max-content !important; font-size: 16px;">
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
                <template v-for="(dataProgress, id) in Model">
                    <div class="card" v-bind:key="id" style="margin-bottom: 20px;">
                        <div class="card__body" style="padding: 20px;">
                            <b-row style="margin-bottom: 10px;">
                                <b-col style="padding-left: unset !important;">
                                    <span style="font-weight: bold; font-size: 23px; color: #4a93b3;"> {{dataProgress.project_name}} - {{dataProgress.location_name}} </span>
                                </b-col>
                            </b-row>
                            <b-row style="margin-bottom: 10px;">
                                <b-col lg="3" xl="2" style="margin-right: 20px; border: solid 1px #dfe3f3; border-radius: 6px; padding: 15px; text-align: center; padding-top: 5%;">
                                    <b-img :src="urlHoonian + dataProgress.company_image" alt="" style="height: 125px !important; width: 125px !important;" fluid-grow rounded @error="onImageLoadFailure($event)" />
                                </b-col>
                                <b-col lg="6" xl="6" style="margin-right: 20px; border: solid 1px #dfe3f3; border-radius: 6px; padding: 15px;">
                                    <b-row style="margin-bottom: 25px;">
                                        <b-col>
                                            <span style="font-weight: bold; font-size: 23px"> {{dataProgress.project_name}} - {{dataProgress.location_name}} </span>
                                        </b-col>
                                    </b-row>
                                    <b-row style="margin-bottom: 10px;">
                                        <b-col lg="6" xl="6">
                                            <span style="font-weight: bold; font-size: 13px; color: rgb(92 92 173);"> Project Code </span>
                                        </b-col>
                                        <b-col lg="6" xl="6">
                                            <span style="font-weight: bold; font-size: 13px;"> {{dataProgress.project_code}} </span>
                                        </b-col>
                                    </b-row>
                                    <b-row style="margin-bottom: 10px;">
                                        <b-col lg="6" xl="6">
                                            <span style="font-weight: bold; font-size: 13px; color: rgb(92 92 173);"> Company Name </span>
                                        </b-col>
                                        <b-col lg="6" xl="6">
                                            <span style="font-size: 13px;"> {{dataProgress.company_name}} </span>
                                        </b-col>
                                    </b-row>
                                    <b-row style="margin-bottom: 10px;">
                                        <b-col lg="6" xl="6">
                                            <span style="font-weight: bold; font-size: 13px; color: rgb(92 92 173);"> Launching Date </span>
                                        </b-col>
                                        <b-col lg="6" xl="6">
                                            <span style="font-size: 13px;"> {{momentDateFormatting(dataProgress.launching_date, "DD MMMM YYYY")}} </span>
                                        </b-col>
                                    </b-row>
                                    <b-row style="margin-bottom: 10px;">
                                        <b-col lg="6" xl="6">
                                            <span style="font-weight: bold; font-size: 13px; color: rgb(92 92 173);"> Location </span>
                                        </b-col>
                                        <b-col lg="6" xl="6">
                                            <span style="font-size: 13px;"> {{dataProgress.location_name}} </span>
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col lg="6" xl="6">
                                            <span style="font-weight: bold; font-size: 13px; color: rgb(92 92 173);"> Category </span>
                                        </b-col>
                                        <b-col lg="6" xl="6">
                                            <span style="font-size: 13px;"> {{dataProgress.category_name}} </span>
                                        </b-col>
                                    </b-row>
                                </b-col>
                                <b-col>
                                    <b-img :src="urlHoonian + dataProgress.main_image" alt="" style="height: 100%;" fluid-grow rounded @error="onImageLoadFailure($event)" />
                                </b-col>
                            </b-row>
                            <template v-for="(dataMedia, idm) in dataProgress.child_media">
                                <b-row style="margin-bottom: 15px;">
                                    <b-col class="offset-right">
                                        <div>
                                            <span style="font-weight: bold; font-size: 13px; color: rgb(92 92 173);"> Notes </span>
                                        </div>
                                    </b-col>
                                    <b-col v-if="paramFromList.showEdit" style="text-align: right">
                                        <ABSButton
                                            text="Edit"
                                            classButton="button button--new mgn"
                                            styleButton="background-color: rgb(74, 147, 179); color: white;"
                                            @click="showEdit(dataMedia)"
                                        />
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col lg="3" xl="2" style="margin-right: 20px; border: solid 1px #dfe3f3; border-radius: 6px; padding: 15px; min-height: 240px;">
                                        <div class="precentage">
                                            <div>
                                                <span>{{dataMedia.progress_percentage}}%</span>
                                            </div>
                                        </div>
                                        <div class="progress-x">
                                            <span>Progress</span>
                                        </div>
                                    </b-col>
                                    <b-col>
                                        <b-row style="margin-bottom: 15px;">
                                            <b-col style="border: solid 1px #dfe3f3; border-radius: 6px; ">
                                                <div style="width: 100%; padding: 15px;">
                                                    <span style="font-size: 13px;">{{dataMedia.notes}}</span>
                                                </div>
                                            </b-col>
                                        </b-row>
                                        <b-row style="margin-bottom: 15px;">
                                            <b-col class="noPadding">
                                                <div style="margin-bottom: 5px;">
                                                    <span style="font-weight: bold; font-size: 23px; color: rgb(92 92 173);"> Gallery </span>
                                                </div>
                                                <b-row>
                                                    <template v-for="(data, index) in dataMedia.tempMedia">
                                                        <b-col v-bind:key="index" class="noPadding">
                                                            <b-row>
                                                                <b-col style="margin-bottom: 10px;" class="noPadding">
                                                                    <b-img :src="urlHoonian + data.thumbnail_image" alt="" style="height: 125px !important; width: 125px !important;" fluid-grow rounded @error="onImageLoadFailure($event)" />
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
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col lg="3" xl="2" style="text-align: center; padding-top: 10px;">
                                        <span style="color: #6ea9c2; font-size: 24px; font-weight: bold;"> {{momentUnix(dataMedia.bottom_date, "DD MMM YYYY")}} </span>
                                    </b-col>
                                    <b-col style="max-width: max-content; right: 20px; position: absolute;">
                                        <b-row>
                                            <b-col v-if="dataMedia.medias.length > 4" style="max-width: max-content; border: solid 1px #dfe3f3; border-radius: 6px; padding: 5px 10px 5px 10px !important; font-size: 20px; margin-right: 5px;">
                                                <!-- <b-img v-if="dataMedia.medias.length > 4" :src="require('@/assets/icon-svg/chevron_left.svg')" alt="" style="cursor: pointer;" @click="onLeftClick(id, idm)"/> -->
                                                <font-awesome-icon class="icon-style-default" icon="angle-double-left" @click="onFirstClick(id, idm)" />
                                            </b-col>
                                            <b-col v-if="dataMedia.medias.length > 4" style="max-width: max-content; border: solid 1px #dfe3f3; border-radius: 6px; padding: 5px 10px 5px 10px !important; font-size: 20px; margin-right: 15px;">
                                                <!-- <b-img v-if="dataMedia.medias.length > 4" :src="require('@/assets/icon-svg/chevron_left.svg')" alt="" style="cursor: pointer;" @click="onFirstClick(id, idm)"/> -->
                                                    <font-awesome-icon class="icon-style-default" icon="chevron-left" @click="onLeftClick(id, idm)" />
                                            </b-col>
                                            <b-col v-if="dataMedia.medias.length > 4" style="max-width: max-content; border: solid 1px #dfe3f3; border-radius: 6px; padding: 5px 10px 5px 10px !important; font-size: 20px; margin-right: 5px;">
                                                <!-- <b-img v-if="dataMedia.medias.length > 4" :src="require('@/assets/icon-svg/chevron_right.svg')" alt="" style="cursor: pointer;"  @click="onRightClick(id, idm)" /> -->
                                                    <font-awesome-icon class="icon-style-default" icon="chevron-right" @click="onRightClick(id, idm)" />
                                            </b-col>
                                            <b-col v-if="dataMedia.medias.length > 4" style="max-width: max-content; border: solid 1px #dfe3f3; border-radius: 6px; padding: 5px 10px 5px 10px !important; font-size: 20px; margin-right: 5px;">
                                                <!-- <b-img v-if="dataMedia.medias.length > 4" :src="require('@/assets/icon-svg/chevron_right.svg')" alt="" style="cursor: pointer;"  @click="onLastClick(id, idm)" /> -->
                                                    <font-awesome-icon class="icon-style-default" icon="angle-double-right" @click="onLastClick(id, idm)" />
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                </b-row>
                                <hr style="border-color: black;" />
                            </template>
                        </div>
                    </div>
                </template>
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
    _projectId () {
      return this.$store.getters.getProjectId;
    }
  },
  watch: {
    _projectId (newValue, oldValue) {
      this.getDataDetail();
    }
  },
  data() {
    return {
        M_project_id: this.getDashboardProjectID(),
        Model: [],
    //   Model: [
    //     {
    //         project_id: this.getDashboardProjectID(),
    //         project_name: "LRT City MTH",
    //         location_name: "Jati Bening",
    //         project_code: "LRT03",
    //         progress_date: 1105154304,
    //         launching_date: "2021/01/25",
    //         company_name: "PT. Adhi Communer Property",
    //         company_image: "/upload/image/event/1610700847-dewi.jpg",
    //         category_name: "Apartement",
    //         main_image: "/upload/image/undefined/1612088220-LRT-Jabodebek.jpg",
    //         child_media: [
    //             {
    //                 progress_percentage: 75,
    //                 bottom_date: 1105154304,
    //                 notes: "Kendala di Tower Middle",
    //                 tempMedia: [],
    //                 media_idx: 0,
    //                 medias: [
    //                     {
    //                         "id": "0c9c264e-276a-4060-aaa0-61837902e150",
    //                         "thumbnail_image": "/upload/image/event/1610700847-dewi.jpg"
    //                     },
    //                     {
    //                         "id": "69fbc505-a8af-413c-8810-388f23cf858c",
    //                         "thumbnail_image": "/upload/image/event/1610700858-bunda.jpg"
    //                     },
    //                     {
    //                         "id": "df088529-8d79-4617-8050-b708e4533b87",
    //                         "thumbnail_image": "/upload/image/event/1610700866-dinda.jpg"
    //                     },
    //                     {
    //                         "id": "d27d19ae-2387-43a1-8742-92bbb5219580",
    //                         "thumbnail_image": "/upload/image/event/1610701892-_.png"
    //                     },
    //                     {
    //                         "id": "11d7cca9-85d1-47bd-abe1-1aa281666292",
    //                         "thumbnail_image": "/upload/image/event/1610701902-logo.png"
    //                     },
    //                     {
    //                         "id": "d51b6f91-f82c-4c5a-b804-bd4f08fbab81",
    //                         "thumbnail_image": "/upload/image/event/1610702065-_.png"
    //                     },
    //                     {
    //                         "id": "8dbabf03-ae63-4005-beab-a6135fd0e7b9",
    //                         "thumbnail_image": "/upload/image/event/1610704995-_.png"
    //                     },
    //                     {
    //                         "id": "44184e78-4f96-484a-95a1-d74a8f57742d",
    //                         "thumbnail_image": "/upload/image/event/1610705107-_.png"
    //                     },
    //                     {
    //                         "id": "5be64ca8-a7d3-460b-8b6c-a1d6c83206ed",
    //                         "thumbnail_image": "/upload/image/event/1610701902-logo.png"
    //                     },
    //                     {
    //                         "id": "2c39bee9-7ba6-44c3-9bee-a3cececf92b5",
    //                         "thumbnail_image": "/upload/image/event/1610701902-logo.png"
    //                     }
    //                 ]
    //             },
    //             {
    //                 progress_percentage: 30,
    //                 bottom_date: 1105154111,
    //                 tempMedia: [],
    //                 media_idx: 0,
    //                 notes: "Kendala di Tower Middle x1",
    //                 medias: [
    //                     {
    //                         "id": "0c9c264e-276a-4060-aaa0-61837902e150",
    //                         "thumbnail_image": "/upload/image/event/1610700847-dewi.jpg"
    //                     },
    //                     {
    //                         "id": "69fbc505-a8af-413c-8810-388f23cf858c",
    //                         "thumbnail_image": "/upload/image/event/1610700858-bunda.jpg"
    //                     },
    //                     {
    //                         "id": "df088529-8d79-4617-8050-b708e4533b87",
    //                         "thumbnail_image": "/upload/image/event/1610700866-dinda.jpg"
    //                     },
    //                     {
    //                         "id": "d27d19ae-2387-43a1-8742-92bbb5219580",
    //                         "thumbnail_image": "/upload/image/event/1610701892-_.png"
    //                     },
    //                     {
    //                         "id": "11d7cca9-85d1-47bd-abe1-1aa281666292",
    //                         "thumbnail_image": "/upload/image/event/1610701902-logo.png"
    //                     },
    //                     {
    //                         "id": "d51b6f91-f82c-4c5a-b804-bd4f08fbab81",
    //                         "thumbnail_image": "/upload/image/event/1610702065-_.png"
    //                     },
    //                     {
    //                         "id": "8dbabf03-ae63-4005-beab-a6135fd0e7b9",
    //                         "thumbnail_image": "/upload/image/event/1610704995-_.png"
    //                     },
    //                     {
    //                         "id": "44184e78-4f96-484a-95a1-d74a8f57742d",
    //                         "thumbnail_image": "/upload/image/event/1610705107-_.png"
    //                     },
    //                     {
    //                         "id": "5be64ca8-a7d3-460b-8b6c-a1d6c83206ed",
    //                         "thumbnail_image": "/upload/image/event/1610701902-logo.png"
    //                     },
    //                     {
    //                         "id": "2c39bee9-7ba6-44c3-9bee-a3cececf92b5",
    //                         "thumbnail_image": "/upload/image/event/1610701902-logo.png"
    //                     }
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         project_id: this.getDashboardProjectID(),
    //         project_name: "LRT City MTH",
    //         location_name: "Jati Bening",
    //         project_code: "LRT03",
    //         progress_date: 1105154304,
    //         launching_date: "2021/01/25",
    //         company_name: "PT. Adhi Communer Property",
    //         company_image: "/upload/image/event/1610700847-dewi.jpg",
    //         category_name: "Apartement",
    //         main_image: "/upload/image/undefined/1612088220-LRT-Jabodebek.jpg",
    //         child_media: [
    //             {
    //                 progress_percentage: 75,
    //                 bottom_date: 1105154304,
    //                 notes: "Kendala di Tower Middle",
    //                 tempMedia: [],
    //                 media_idx: 0,
    //                 medias: [
    //                     {
    //                         "id": "0c9c264e-276a-4060-aaa0-61837902e150",
    //                         "thumbnail_image": "/upload/image/event/1610700847-dewi.jpg"
    //                     },
    //                     {
    //                         "id": "69fbc505-a8af-413c-8810-388f23cf858c",
    //                         "thumbnail_image": "/upload/image/event/1610700858-bunda.jpg"
    //                     },
    //                     {
    //                         "id": "df088529-8d79-4617-8050-b708e4533b87",
    //                         "thumbnail_image": "/upload/image/event/1610700866-dinda.jpg"
    //                     },
    //                     {
    //                         "id": "d27d19ae-2387-43a1-8742-92bbb5219580",
    //                         "thumbnail_image": "/upload/image/event/1610701892-_.png"
    //                     },
    //                     {
    //                         "id": "11d7cca9-85d1-47bd-abe1-1aa281666292",
    //                         "thumbnail_image": "/upload/image/event/1610701902-logo.png"
    //                     },
    //                     {
    //                         "id": "d51b6f91-f82c-4c5a-b804-bd4f08fbab81",
    //                         "thumbnail_image": "/upload/image/event/1610702065-_.png"
    //                     },
    //                     {
    //                         "id": "8dbabf03-ae63-4005-beab-a6135fd0e7b9",
    //                         "thumbnail_image": "/upload/image/event/1610704995-_.png"
    //                     },
    //                     {
    //                         "id": "44184e78-4f96-484a-95a1-d74a8f57742d",
    //                         "thumbnail_image": "/upload/image/event/1610705107-_.png"
    //                     },
    //                     {
    //                         "id": "5be64ca8-a7d3-460b-8b6c-a1d6c83206ed",
    //                         "thumbnail_image": "/upload/image/event/1610701902-logo.png"
    //                     },
    //                     {
    //                         "id": "2c39bee9-7ba6-44c3-9bee-a3cececf92b5",
    //                         "thumbnail_image": "/upload/image/event/1610701902-logo.png"
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    //   ],
    };
  },
  computed: {
    paramFromList() {
      var param = this.$store.getters.getParamPage;
      return param;
    },
  },
  methods: {
    doBack() {
      this.$router.go(-1);
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    getDataDetail() {
        let param = {
            project_id: this.M_project_id,
        };
        this.postJSON(
            this.urlHoonian + "/api/hoonian-website/dashboard/dashboard-all-project-progress",
            param
        ).then((response) => {
            if (response == null) return;

            this.Model = [];
            for (let i = 0; i < response.data.length; i++) {
                const data = response.data[i];
                let child_media = [];
                for (let dt = 0; dt < data.details.length; dt++) {
                    const details = data.details[dt];
                    let medias = [];
                    for (let md = 0; md < details.medias.length; md++) {
                        const mds = details.medias[md];
                        medias.push(mds);
                    }
                    child_media.push({
                        id: details.id,
                        progress_percentage: parseInt(details.percentage_completed).toFixed(0),
                        bottom_date: details.created_at,
                        notes: details.notes,
                        tempMedia: [],
                        media_idx: 0,
                        medias: medias
                    })
                }
                this.Model.push({
                    project_name: data.project_name,
                    location_name: data.location_name,
                    project_code: data.refference_code,
                    progress_date: data.progress_date,
                    launching_date: data.project_start,
                    company_name: data.company_group_name,
                    category_name: data.project_type_desc,
                    main_image: data.main_pic,
                    child_media: child_media
                });
            }

            this.$nextTick(() => {
                this.setImages(-1);
            })

            this.$forceUpdate();
        });
    },
    setImages(id = -1, idm = -1) {
        if (id < 0) {
            for (let x = 0; x < this.Model.length; x++) {
                if (idm < 0) {
                    for (let a = 0; a < this.Model[x].child_media.length; a++) {
                        if (this.Model[x].child_media[a].medias.length > 4) {
                            this.Model[x].child_media[a].tempMedia = [];
                            for (let i = this.Model[x].child_media[a].media_idx; i < (4 + this.Model[x].child_media[a].media_idx); i++) {
                                this.Model[x].child_media[a].tempMedia.push(this.Model[x].child_media[a].medias[i]);
                            }
                        } else {
                            this.Model[x].child_media[a].tempMedia = [
                            ...this.Model[x].child_media[a].medias
                            ]
                        }
                    }
                }
                else {
                    if (this.Model[x].child_media[idm].medias.length > 4) {
                        this.Model[x].child_media[idm].tempMedia = [];
                        for (let i = this.Model[x].child_media[idm].media_idx; i < (4 + this.Model[x].child_media[idm].media_idx); i++) {
                            this.Model[x].child_media[idm].tempMedia.push(this.Model[x].child_media[idm].medias[i]);
                        }
                    } else {
                        this.Model[x].child_media[idm].tempMedia = [
                        ...this.Model[x].child_media[idm].medias
                        ]
                    }
                }
            }
        }
        else {
            if (idm < 0) {
                    for (let a = 0; a < this.Model[x].child_media.length; a++) {
                        if (this.Model[id].child_media[a].medias.length > 4) {
                            this.Model[id].child_media[a].tempMedia = [];
                            for (let x = this.Model[id].child_media[a].media_idx; x < (4 + this.Model[id].child_media[a].media_idx); x++) {
                                this.Model[id].child_media[a].tempMedia.push(this.Model[id].child_media[a].medias[x]);
                            }
                        } else {
                            this.Model[id].child_media[a].tempMedia = [
                            ...this.Model[id].child_media[a].medias
                            ]
                        }
                    }
                }
                else {
                    if (this.Model[id].child_media[idm].medias.length > 4) {
                        this.Model[id].child_media[idm].tempMedia = [];
                        for (let x = this.Model[id].child_media[idm].media_idx; x < (4 + this.Model[id].child_media[idm].media_idx); x++) {
                            this.Model[id].child_media[idm].tempMedia.push(this.Model[id].child_media[idm].medias[x]);
                        }
                    } else {
                        this.Model[id].child_media[idm].tempMedia = [
                        ...this.Model[id].child_media[idm].medias
                        ]
                    }
                }
        }
    },
    onLeftClick(id, idm) {
      if (this.Model[id].child_media[idm].media_idx == 0) return;
      --this.Model[id].child_media[idm].media_idx;
      this.setImages(id, idm);
    },
    onRightClick(id, idm) {
      if (this.Model[id].child_media[idm].media_idx == (this.Model[id].child_media[idm].medias.length - 4)) return;
      ++this.Model[id].child_media[idm].media_idx;
      this.setImages(id, idm);
    },
    onFirstClick(id, idm) {
      if (this.Model[id].child_media[idm].media_idx == 0) return;
      this.Model[id].child_media[idm].media_idx = 0;
      this.setImages(id, idm);
    },
    onLastClick(id, idm) {
      if (this.Model[id].child_media[idm].media_idx == (this.Model[id].child_media[idm].medias.length - 4)) return;
      this.Model[id].child_media[idm].media_idx = this.Model[id].child_media[idm].medias.length - 4;
      this.setImages(id, idm);
    },
    showEdit(record) {
        let param = this.paramFromList;
        param.isEdit = true;
        param.DetailList = record;
        this.$store.commit("setParamPage", param);
        this.$router.push({ name: "OP_ProjectProgressForm" });
    }
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
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        
        width: 175px;
        height: 175px;
        background-color: #FFFFFF;
        border-radius: 50%;
        border: 20px solid #ffc700;
        text-align: center;

        padding-top: 20%;

        color: #333399; font-size: 40px; font-weight: bold;
    }
    .progress-x {
        position: absolute;
        /* top: 225px; */
        bottom: 0;
        left: 50%;
        transform: translate(-50%, -50%);

        text-align: center;
        font-weight: bold; font-size: 20px
    }
    .offset-right {
        margin-left: 29%;
    }
}
@media (min-width: 1200px) {
    .precentage {
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);

        width: 150px;
        height: 150px;
        background-color: #FFFFFF;
        border-radius: 50%;
        border: 20px solid #ffc700;
        text-align: center;

        padding-top: 13%;
        
        color: #333399; font-size: 40px; font-weight: bold;
    }
    .progress-x {
        position: absolute;
        top: 90%;
        /* bottom: 0; */
        left: 50%;
        transform: translate(-50%, -50%);

        text-align: center;
        font-weight: bold; font-size: 25px
    }
    .offset-right {
        margin-left: 19%;
    }
}
</style>
