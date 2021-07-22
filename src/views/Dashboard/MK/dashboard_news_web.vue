<template>
  <div v-if="Model.length > 0" style="height: 95%; background: #F8F8F8; margin-top: 20px;">
    <b-row style="margin-top: 10px; background: #F8F8F8;">
      <b-col>
        <div style="padding-left: 5px; text-shadow: 0.5px 0px; font-size: 22px; margin-bottom: 10px;">
          {{ $t('news') }}
        </div>
        <template v-for="(news, index) in Model">
          <b-row :key="index" style="margin-top: 10px;">

            <!-- left -->
            <template v-if="index % 2 == 0">
              <b-col sm="2" style="" @click="showWebsite(Model[index])">
                <b-img :src="urlHoonian + Model[index].main_image" alt=""
                :style="`height: 100px; cursor: pointer;`"
                fluid-grow @error="onImageLoadFailure($event)" />
              </b-col>
              <b-col  sm="4" style="" align-self="center">
                <b-row>
                  <b-col style="color: #4A93B3" class="text">
                    {{Model[index].title}}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col style="color: #BDBDBD;">
                    {{momentUnix(Model[index].created_at, "DD MMM YYYY")}}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col style="color: #BDBDBD;">
                    {{getDomainName(Model[index].url)}}
                  </b-col>
                </b-row>
              </b-col>
            </template>
          
          <!-- right -->
          <template v-if="index % 2 == 0 && Model.length > index + 1">
            <b-col  sm="2" style="" @click="showWebsite(Model[index + 1])">
              <b-img :src="urlHoonian + Model[index + 1].main_image" alt=""
              :style="`height: 100px; cursor: pointer;`"
              fluid-grow @error="onImageLoadFailure($event)" />
            </b-col>
            <b-col  sm="4" style="" align-self="center">
              <b-row>
                <b-col style="color: #4A93B3" class="text">
                  {{Model[index + 1].title}}
                </b-col>
              </b-row>
              <b-row>
                <b-col style="color: #BDBDBD;">
                  {{momentUnix(Model[index + 1].created_at, "DD MMM YYYY")}}
                </b-col>
              </b-row>
              <b-row>
                <b-col style="color: #BDBDBD;">
                  {{getDomainName(Model[index + 1].url)}}
                </b-col>
              </b-row>
            </b-col>
            </template>
          </b-row>
        </template>
      </b-col>
    </b-row>
    <ABSModalImage id="Modal_Image" ref="Modal_Image" size="md" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      Model: [],
    };
  },
  methods: {
    showWebsite(data) {
      window.open(data.url);
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    doViewDetail(data) {
      console.log(data);
    },
    getData() {
      let param = {
        company_group_id: this.company_group_id,
      };
      this.postJSON(
        this.urlHoonian + "/api/marketing-website/dashboard/news",
        param
      ).then((response) => {
        if (response == null) return;
        this.Model = response.data.list;
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style scoped>
.text {
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 1; /* number of lines to show */
   -webkit-box-orient: vertical;
}
</style>