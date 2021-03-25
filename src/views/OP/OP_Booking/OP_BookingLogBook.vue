<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important">
            <div class="card__title">
              <b-row class="title-primary">
                <b-col style="max-width: max-content !important">
                  <span>Log Book</span>
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
            <div class="card__body">
              <b-form
                :data-vv-scope="'FormEntry'"
                :data-vv-value-path="'FormEntry'"
              >
                <b-row>
                  <!-- <b-col md="2" style="text-align: center;">
                    <div>
                      <font-awesome-icon class="icon-style-hoonian" icon="clipboard" size="8x" />
                    </div>
                  </b-col> -->
                  <b-col md="12">
                    <b-row>
                      <b-col md="12" style="padding-left: unset !important;">
                        <span>
                          <label class="lbl-bold poppins">Description</label>
                        </span>
                        <span class="pull-right">
                            <label class="lbl-bold poppins" style="font-size: 10px;"> {{momentDateFormatting(new Date(), "dddd, DD MMM YYYY")}} </label>
                        </span>
                        <ACCTextArea
                          :prop="PI_description"
                          v-model="Model.description"
                          ref="ref_description"
                        />
                      </b-col>
                    </b-row>

                    <b-row style="margin-top: 10px">
                      <b-col md="6" offset-md="3">
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
      Model: {
        description: ""
      },
        PI_description: {
          cValidate: "max:5000",
          cName: "description",
          cOrder: 2,
          cKey: false,
          cProtect: false,
          cResize: false,
          cReadonly: false,
          cRows: 3,
          cMaxRows: 3,
          cSize: "md",
          cParentForm: "FormEntry",
          cInputStatus: this.inputStatus
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
    doBack() {
      this.$router.go(-1);
    },
    M_ClearForm() {
      this.Model = {
        description: ""
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
        project_id: this.paramFromList.project_id,
        customer_transaction_id: this.paramFromList.customer_transaction_id,
        description: this.Model.description,
      }
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/operation-detail/booking/logbook-add",
        param
      ).then((response) => {
        if (response == null) return;
        this.doBack();
      });
    },
  },
  mounted() {
    this.M_ClearForm();
  },
};
</script>

