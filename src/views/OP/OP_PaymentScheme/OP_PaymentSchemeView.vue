<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>View Payment Scheme</span>
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
                          <label>Picture</label>
                        </span>
                        <br />
                        <img id="picture"
                          :src="Model.thumbnail_image == '' ?
                          default_pic: urlHoonian + Model.thumbnail_image"
                          alt height="150" />
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
        id: "",
        media_id: "",
        thumbnail_image: "",
        tower_cluster_id: "",
        project_id: "",
      }
    };
  },
  computed: {
    paramFromList() {
      var param = this.$store.getters.getParamPage;
      return param;
    },
    inputStatus() {
      var param = this.$store.getters.getParamPage;
      if (param.ForPaymentScheme.isEdit && param.ForPaymentScheme.isEdit === true) {
        return "edit";
      } else {
        return "new";
      }
    },
  },
  methods: {
      doEdit() {
        var param = this.paramFromList;
        param.ForPaymentScheme.isEdit = true;
        param.ForPaymentScheme.isView = false;
        this.$store.commit("setParamPage", param);
        this.$router.push({ name: "OP_PaymentSchemeForm" });
      },
    doBack() {
      this.$router.go(-1);
    },
    M_ClearForm() {
      this.Model = {
        id: "",
        media_id: "",
        thumbnail_image: "",
        tower_cluster_id: "",
        project_id: "",
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
        this.Model.project_id = this.paramFromList.project_master_id;
        this.Model.tower_cluster_id = this.paramFromList.ForPaymentScheme.tower_cluster_id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/tower-cluster-payment-scheme-addedit', this.Model).then((response) => {
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
      this.Model.media_id = this.paramFromList.ForPaymentScheme.id;
      this.Model.id = this.paramFromList.ForPaymentScheme.id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/view-payment-scheme-detail', this.Model).then((response) => {
        if (response == null) return;
        let data = response.data.project_master_detail;
        this.Model = data;
        this.Model.media_id = data.id;
        this.Model.id = data.id;
      });
    },
  },
  mounted() {
    this.GetDataBy();
  },
};
</script>

