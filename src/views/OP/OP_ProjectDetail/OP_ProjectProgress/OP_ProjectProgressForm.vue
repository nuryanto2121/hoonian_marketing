<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body" style="font-family: Poppins !important;">
      <div class="">
        <div class="card" style="font-size: 12px !important;">
          <div class="card__body">
            <b-row>
              <b-col style="color: #4A93B3; font-size: 16px;">
                {{title}} Progress
              </b-col>
              <b-col style="text-align: right;">
                <ABSButton
                  :text="'Back'"
                  classButton="button button--back"
                  classIcon="icon-style-1"
                  @click="doBack"
                />
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
                <b-row v-if="inputStatus == 'edit'">
                  <b-col style="text-align: right; padding-right: unset !important;">
                    <div class="wrapper-last-edit">
                      <span>
                        {{momentUnix(Model.updated_at, "DD MMM YYYY")}}
                      </span>
                      <span>
                        &nbsp; &nbsp; &nbsp;
                      </span>
                      <span>
                        <b>{{Model.last_edit}}</b>
                      </span>
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="10">
                    <label class="lbl-bold">Progress Date</label>
                    <HOODateTime
                      :prop="PI_progress_date"
                      v-model="Model.progress_date"
                      ref="ref_progress_date"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="10">
                    <label class="lbl-bold">Progress Percentage (%)</label>
                    <ACCTextBox
                      :prop="PI_progress_percentage"
                      v-model="Model.percentage_completed"
                      ref="ref_progress_percentage"
                    />
                  </b-col>
                </b-row>
                <b-row cols="10">
                  <b-col lg="2">
                    <label class="lbl-bold">Photos</label>
                    <HOOImageUpload
                      :prop="PI_upload_photo"
                      @change="onUploadMainPictureChange"
                    />
                  </b-col>
                  <b-col :offset="index % 4 == 0 && index > 0 ? '2': '0'" lg="2" v-for="(data, index) in Model.pics" :key="index">
                    <label class="lbl-bold">&nbsp;</label><br />
                    <div style="height: 100px; width: 100px; position: relative;">
                      <img
                        :src="data.image == '' ?
                        default_pic: urlHoonian + data.image"
                        alt height="100" width="100" />
                      <b-img style="position: absolute; width: 20px; top: -10px; right: -10px; cursor: pointer;" :src="require('@/assets/icon-svg/close_image.svg')" @click="doDeleteClick(index)" alt />
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="10">
                    <label class="lbl-bold">Description</label>
                    <ACCTextArea
                      :prop="PI_description"
                      v-model="Model.description"
                      ref="ref_description"
                    />
                  </b-col>
                </b-row>
                
                <b-row style="margin-top: 10px;">
                  <b-col offset="3" md="4">
                    <ABSButton
                      :text="'Confirm'"
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
      Model: {
        id: "",
        project_id: "",
        project_name: "",
        percentage_completed: 0,
        main_image: "",
        description: "",
        progress_date: "",
        pics: [],
      },
      PI_progress_date: {
        cValidate: "required",
        cName: "progress date",
        cOrder: 1,
        cKey: false,
        cProtect: false,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry",
      },
      PI_progress_percentage: {
        cValidate: "required",
        cName: "progress percentage",
        cOrder: 2,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus
      },
      PI_upload_photo: {
        cValidate: "",
        cName: "upload photo",
        cOrder: 3,
        cTitle: "",
        cType: "project",
        cParentForm: "FormEntry",
        cStyle: "background-color: rgb(74, 147, 179) !important; color: white !important; font-family: Poppins !important;",
        cIconPhoto: true,
      },
      PI_description: {
        cValidate: "max:5000",
        cName: "description",
        cOrder: 4,
        cKey: false,
        cProtect: false,
        cResize: false,
        cReadonly: false,
        cRows: 1,
        cMaxRows: 3,
        cSize: "md",
        cParentForm: "FormEntry",
        cInputStatus: this.inputStatus
      },
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
    GetDataBy() {
      let param = {
        id: this.paramFromList.DetailList.id,
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/project-progress/detail",
        param
      ).then((response) => {
        if (response == null) return;
        let data = response.data;
        this.Model = {
          ...data.data,
          progress_date: this.momentUnix(data.data.progress_date, 'DD MMM YYYY'),
        };
        this.Model.pics = data.pics;
      });
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
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
      let param = {
        id: this.inputStatus == "edit"? this.paramFromList.DetailList.id: "",
        project_id: this.paramFromList.project_id,
        project_name: this.paramFromList.project_name,
        percentage_completed: this.Model.percentage_completed,
        main_image: this.Model.pics.length > 0 ? this.Model.pics[0].image: "",
        description: this.Model.description,
        progress_date: this.momentDateToUnix(this.Model.progress_date, 'YYYY-MM-DD'),
        pics: this.Model.pics,
      }
      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard/operation-detail/project-progress/add_edit', param).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
    onUploadMainPictureChange(data) {
      this.Model.pics.push({image: data.url});
      this.$forceUpdate();
    },
    doDeleteClick(index) {
      this.Model.pics.splice(index, 1);
      this.$forceUpdate();
    }
  },
  mounted() {
    if (this.inputStatus == "edit") {
      this.title = "Edit";
      this.GetDataBy();
      this.PI_progress_date.cProtect = true;
      this.PI_progress_percentage.cProtect = true;
    } else {
      this.title = "Add";
    }
  }
};
</script>