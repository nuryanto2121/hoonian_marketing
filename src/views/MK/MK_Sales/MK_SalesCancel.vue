<template>
  <ABSModal ref="OP_Cancel_Dialog" size="sm">
    <template slot="headerTitle"><span style="color: black;">Cancel</span></template>
    <template slot="content">
      <b-form :data-vv-scope="'FormEntrySalesCancel'" :data-vv-value-path="'FormEntrySalesCancel'">
        <b-row>
          <b-col>
            <label class="lbl-bold">Reason</label>
            <HOODropDown
              @change="OnReasonChange"
              :prop="PI_reason"
              v-model="Model.reason_cd"
              :label="Model.reason_cdLabel"
              ref="ref_reason"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <label class="lbl-bold">Description</label>
            <ACCTextBox
              :prop="PI_description"
              v-model="Model.reason_description"
              ref="ref_description"
            />
          </b-col>
        </b-row>
        <b-row style="margin-top: 10px;">
          <b-col md="12">
            <ABSButton
              :text="'Save'"
              classButton="btn btn--default"
              classIcon="icon-style-default"
              @click="doSave"
              styleButton="height: 40px;width: 100%;"
            />
          </b-col>
        </b-row>
      </b-form>
    </template>
  </ABSModal>
</template>

<script>
export default {
  props: {
    urlAPI: "",
    id: "",
  },
  data() {
    return {
      Model: {
        id: "",
        reason_cd: "",
        reason_cdLabel: "",
        reason_description: "",
      },
      PI_reason: {
        dataLookUp: {
          url: "/api/hoonian-website/reason-lookup",
          param: {
          }
        },
        cValidate: "required",
        cName: "reason",
        ckey: false,
        cOrder: 1,
        cProtect: false,
        cParentForm: "FormEntrySalesCancel",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
        cClearable: false,
        isShow: true,
      },
      PI_description: {
        cValidate: "required|max:5000",
        cName: "description",
        cOrder: 2,
        cKey: false,
        cProtect: false,
        cResize: false,
        cReadonly: false,
        cRows: 1,
        cMaxRows: 3,
        cSize: "md",
        cParentForm: "FormEntrySalesCancel",
        cInputStatus: this.inputStatus
      },
    };
  },
  computed: {
    paramFromList() {
      let param = this.$store.getters.getParamPage;
      return param;
    },
  },
  methods: {
    OnReasonChange(data) {
      this.$nextTick(() => {
        this.Model.reason_cd = data.id;
        this.Model.reason_cdLabel = data.label;
      })
    },
    doSave() {
      this.$validator._base.validateAll("FormEntrySalesCancel").then((result) => {
        if (!result) return;
        this.alertConfirmation("Are You Sure Want To Save This Data ?").then(
          (ress) => {
            if (ress.value) {
              this.$validator.errors.clear("FormEntrySalesCancel");
              this.M_Update();
            }
          }
        );
      });
    },
    M_Update() {
      this.Model.id = this.id;
      this.postJSON(this.urlHoonian + this.urlAPI, this.Model).then((response) => {
        if (response == null) return;
        this.$refs.OP_Cancel_Dialog._hide();
        this.$emit("onCancelSuccess");
      });
    },
    _show() {
      this.Model.reason_cd = "";
      this.Model.reason_cdLabel = "";
      this.Model.reason_description = "";
      this.$refs.OP_Cancel_Dialog._show();
    }
  },
  mounted() {
  }
};
</script>