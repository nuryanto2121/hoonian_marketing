<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>{{title}} News Master</span>
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
                      <b-col md="6">
                        <span>
                          <label><span style="color:red;">* </span>Title</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_title"
                          v-model="Model.title"
                          ref="ref_title"
                        />
                      </b-col>
                      <b-col style="text-align: right;" v-show="inputStatus=='edit'">
                        {{Model.user_edit}} <br>
                        {{momentUnix(Model.updated_at, "DD MMM YYYY")}}
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Description</label>
                        </span>
                        <ACCTextArea
                          :prop="PI_description"
                          v-model="Model.description"
                          ref="ref_description"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color:red;">* </span>Active</label>
                        </span>
                        <ACCRadioButton
                          @input="OnActiveChange"
                          :prop="PI_active"
                          v-model="Model.is_active"
                          ref="ref_active"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color:red;">* </span>Start View Date</label>
                        </span>
                        <HOODateTime
                          :prop="PI_start_date"
                          @input="OnStartDateChange"
                          v-model="Model.start_view_at"
                          ref="ref_start_view_at"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label><span style="color:red;">* </span>End View Date</label>
                        </span>
                        <HOODateTime
                          :prop="PI_end_date"
                          @input="OnEndDateChange"
                          v-model="Model.end_view_at"
                          ref="ref_end_view_at"
                        />
                      </b-col>
                    </b-row>

                    <b-row style="margin-top: 10px;">
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

      Model: {
        news_id: "",
        project_id: "",
        title: "",
        description: "",
        start_view_at: "",
        end_view_at: "",
        header_body_text_id: "",
        is_active: true
      },
      PI_title: {
        cValidate: "required|max:100",
        cName: "Title",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_description: {
        cValidate: "max:5000",
        cName: "Description",
        cOrder: 2,
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
      PI_active: {
        cValidate: "required",
        cName: "Active",
        cId: "rdactive",
        cRadioOptions: [
          { text: "Yes", value: true },
          { text: "No", value: false },
        ],
        cRadioDefaultOption: "Y",
        cOrder: 3,
        cProtect: false,
        cVisible:  true,
        cParentForm: 'FormEntry',
        cInputStatus: this.inputStatus,
        cGroup: false
      },
      PI_start_date: {
        cValidate: "required",
        cName: "Start View At",
        cOrder: 4,
        cKey: false,
        cProtect: false,
        cWithTime: true,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry"
      },
      PI_end_date: {
        cValidate: "required",
        cName: "End View At",
        cOrder: 5,
        cKey: false,
        cProtect: false,
        cWithTime: true,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry"
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
    OnStartDateChange(data) {},
    OnEndDateChange(data) {},
    doBack() {
      this.$router.go(-1);
    },
    M_ClearForm() {
      this.Model = {
        news_id: "",
        project_id: this.getDataUser().project_id,
        title: "",
        description: "",
        start_view_at: "",
        end_view_at: "",
        header_body_text_id: "",
        is_active: true
      };
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
        ...this.Model,
        start_view_at: this.momentDateToUnix(this.Model.start_view_at, 'YYYY-MM-DD HH:mm'),
        end_view_at: this.momentDateToUnix(this.Model.end_view_at, 'YYYY-MM-DD HH:mm'),
      };
      this.postJSON(this.urlHoonian + '/api/hoonian-website/news-master-addedit', param).then((response) => {
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
    M_Delete() {
    },
    GetDataBy() {
      this.Model.news_id = this.paramFromList.id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/news-master-detail', this.Model).then((response) => {
        if (response == null) return;
        let data = response.data.news_detail;
        this.Model = data;
        this.Model.news_id = data.id;
        this.Model.start_view_at = this.momentUnix(data.start_view_at, 'YYYY-MM-DD HH:mm');
        this.Model.end_view_at = this.momentUnix(data.end_view_at, 'YYYY-MM-DD HH:mm');
      });
    },
    OnActiveChange(data) {
      this.$nextTick(() => {
      });
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

