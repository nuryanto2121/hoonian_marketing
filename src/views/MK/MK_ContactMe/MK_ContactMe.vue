<template>
  <div>
    <div style="position: fixed; right: 30px; bottom: 50px;">
      <b-img :src="require('@/assets/icon-svg/contact_me.svg')" width="60" height="60" alt=""
        style="border-radius: 50%; background: white; cursor: pointer;" @click="showContact" />
    </div>

    <ABSModal id="Modal_Contact" ref="Modal_Contact" size="sm" @modalCancelClicked="onClose">
      <template slot="headerTitle">
        <span class="title-primary"> {{ $t('contact_me') }} </span>
      </template>
      <template slot="content">
        <b-form :data-vv-scope="'FormEntry'" :data-vv-value-path="'FormEntry'">
          <b-row>
            <b-col>
              <span>
                <label class="lbl-poppins">{{ $t('name') }}</label>
              </span>
              <ACCTextBox
                :prop="PI_name"
                v-model="Model.name"
                ref="ref_name"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <span>
                <label class="lbl-poppins">{{ $t('handphone_no') }}</label>
              </span>
              <ACCTextBox
                :prop="PI_handphone_no"
                v-model="Model.handphone_no"
                ref="ref_handphone_no"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <span>
                <label class="lbl-poppins">{{ $t('Remarks') }}</label>
              </span>
              <ACCTextArea
                :prop="PI_remarks"
                v-model="Model.remarks"
                ref="ref_remarks"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <span>
                <label class="lbl-poppins">{{ $t('project') }}</label>
              </span>
              <div style="max-height: 200px; overflow-y: scroll;">
                <HOOList
                  :prop="{}"
                  :title="''"
                  :ref="'ref_list'"
                  ButtonBackDisabled
                  SearchDisabled
                  isPoppins
                  isHeaderFixed
                  :cHeader="ProjectHeader"
                  :cData="ProjectItems"
                  noCard
                  noTitle
                  removePaddingTopBody
                  noPaging
                >
                  <template slot="is_checked" slot-scope="data">
                    <b-form-checkbox
                      v-model="data.item.is_checked"
                      :name="'is_checked' + data.item.id"
                      size="md"
                      @input="onChangeSelected(data.item)"
                    />
                  </template>
                  <template slot="head_is_checked" slot-scope="data">
                    <b-form-checkbox
                      style="display: inline-block;"
                      v-model="isHeaderSelected"
                      :name="'head_is_checked'"
                      size="sm"
                      @input="onChangeHeaderSelected"
                    />
                  </template>
                </HOOList>
              </div>
            </b-col>
          </b-row>
          <b-row style="margin-top: 20px;">
            <b-col>
              <ABSButton
                :text="$t('send')"
                classButton="btn btn--default"
                classIcon="icon-style-1"
                @click="doSave"
                styleButton="height: 40px; width: 100%;"
              />
            </b-col>
          </b-row>
        </b-form>
      </template>
    </ABSModal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Model: {
        name: "",
        handphone_no: "",
        remarks: "",
        projectId: "",
        projectLabel: "",
      },
      ProjectHeader: [
        {
          key: "label",
          label: "PROJECT NAME",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
        {
          key: "is_checked",
          label: "",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
          isCustom: true,
        },
      ],
      ProjectItems: [],
      PI_name: {
        cValidate: "required",
        cName: "Name",
        cOrder: 1,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: "new"
      },
      PI_handphone_no: {
        cValidate: "required",
        cName: "Handphone No",
        cOrder: 2,
        cKey: false,
        cType: "tel",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: "new"
      },
      PI_remarks: {
        cValidate: "max:60",
        cName: "Remarks",
        cOrder: 3,
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
  methods: {
    onClose() {

    },
    showContact() {
      this.ProjectItems = [];
      this.postJSON(
        this.urlHoonian + "/api/marketing-website/common/project/project-lookup",
        {
          company_group_id: this.company_group_id,
        },
        false,
        false
      ).then((response) => {
        if (response == null) return;
        this.ProjectItems = response.data;
      });
      this.$refs.Modal_Contact._show();
    },
    OnProjectChange(data) {
      this.$nextTick(() => {
        this.projectId = data.id;
        this.projectLabel = data.label;
      })
    },
    onChangeSelected(data) {
    },
    onChangeHeaderSelected(data) {
      console.log(data)
      for (let i = 0; i < this.ProjectItems.length; i++) {
        this.ProjectItems[i].is_checked = data;
      }
      this.$refs.ref_list.reRender();
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
      let projects = [];
      for (let i = 0; i < this.ProjectItems.length; i++) {
        if (this.ProjectItems[i].is_checked) {
          projects.push({project_id: this.ProjectItems[i].id});
        }
      }
      let param = {
        fullname: this.Model.name,
        handphone: this.Model.handphone_no,
        remarks: this.Model.remarks,
        projects: projects,
      };

      this.postJSON(
        this.urlHoonian + "/api/marketing-website/common/dashboard/contact-me",
        param,
        false,
        false
      ).then((response) => {
        if (response == null) return;
        this.$refs.Modal_Contact._hide();
      });
    },
  },
  mounted() {
  },
};
</script>