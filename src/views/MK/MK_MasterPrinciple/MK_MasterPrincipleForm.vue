<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card" style="font-size: 12px !important;">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>{{title}} Master Principle</span>
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
                          <label><span style="color:red;">* </span>Principle Name</label>
                        </span>
                        <ACCTextBox
                          :prop="PI_principle_name"
                          v-model="Model.principle_name"
                          ref="ref_principle_name"
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
                          <label><span style="color:red;">* </span>Principle Admin</label>
                        </span>
                        <HOODropDown
                          @change="Onprinciple_adminChange"
                          :prop="PI_principle_admin"
                          v-model="Model.principle_admin"
                          :label="Model.principle_adminLabel"
                          ref="ref_action"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Last Open Blocked Date</label>
                        </span>
                        <ACCDateTime
                          :prop="PI_last_block_open_date"
                          @input="Onlast_block_open_dateChange"
                          v-model="Model.last_block_open_date"
                          ref="ref_last_block_open_date"
                        />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <span>
                          <label>Remarks</label>
                        </span>
                        <ACCTextArea
                          :prop="PI_remarks"
                          v-model="Model.remarks"
                          ref="ref_remarks"
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
        principle_master_id : "",
        broker_group_id: "",
        principle_name: "",
        mobile_app_user_id: "",
        principle_admin: "",
        principle_adminLabel: "",
        last_block_open_date: "",
        remarks: "",
      },
      PI_principle_name: {
        cValidate: "required|max:100",
        cName: "Principle Name",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: this.inputStatus,
      },
      PI_principle_admin: {
        dataLookUp: {
          url: "/api/hoonian-website/broker-group-admin-lookup",
          param: {}
        },
        cValidate: "required",
        cName: "Principle Admin",
        ckey: false,
        cOrder: 2,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus
      },
      PI_last_block_open_date: {
        cValidate: "",
        cName: "Last Open Blocked Date",
        cOrder: 3,
        cKey: false,
        cProtect: false,
        cWithTime: false,
        cFormat: "dd/MM/yyyy",
        cParentForm: "FormEntry"
      },
      PI_remarks: {
        cValidate: "max:5000",
        cName: "remarks",
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
      var param = this.$store.getters.getParamPage;
      if (param == null || param == undefined) {
        this.doBack();
      } else {
        if (Object.keys(param).length < 1) {
          this.doBack();
        } else {
          if (param.ForPrinciple == null || param.ForPrinciple == undefined) {
            this.doBack();
          }
          else {
            return param;
          }
        }
      }
    },
    inputStatus() {
      var param = this.$store.getters.getParamPage;
      if (param.ForPrinciple.isEdit && param.ForPrinciple.isEdit === true) {
        return "edit";
      } else {
        return "new";
      }
    },
  },
  methods: {
    Onprinciple_adminChange(data) {
      this.$nextTick(() => {
        this.Model.principle_admin = data.id;
        this.Model.principle_adminLabel = data.label;
      });
    },
    Onlast_block_open_dateChange(data) {
      this.Model.last_block_open_date = data;
    },
    doBack() {
      this.$router.go(-1);
    },
    M_ClearForm() {
      this.Model = {
        principle_master_id : "",
        broker_group_id: "",
        principle_name: "",
        mobile_app_user_id: "",
        principle_admin: "",
        principle_adminLabel: "",
        last_block_open_date: "",
        remarks: "",
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
      this.Model.broker_group_id = this.paramFromList.broker_group_id;
      let param = {
        ...this.Model,
        last_block_open_date: this.momentDateToUnix(this.Model.last_block_open_date, 'YYYY-MM-DD')
      }
      console.log(param)
      this.postJSON(this.urlHoonian + '/api/hoonian-website/principle-master-addedit', param).then((response) => {
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
      this.Model.principle_master_id = this.paramFromList.ForPrinciple.id;
      this.postJSON(this.urlHoonian + '/api/hoonian-website/principle-master-detail', this.Model).then((response) => {
        if (response == null) return;
        this.Model = response.data.broker_group_detail;
        this.Model.principle_master_id = this.Model.id;
        this.Model.last_block_open_date = this.momentUnix(this.Model.last_block_open_date, 'YYYY-MM-DD');
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
      this.PI_last_block_open_date.cProtect = true;
      this.GetDataBy();
    } else {
      this.PI_last_block_open_date.cProtect = false;
      this.title = "Add";
    }
  },
};
</script>

