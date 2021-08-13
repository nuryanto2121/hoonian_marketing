<template>
  <div>
    <ABSModal id="Modal_Description" ref="Modal_Description" size="sm" @modalCancelClicked="onClose">
      <template slot="headerTitle">
        <span class="title-primary"> {{ $t('information') }} </span>
      </template>
      <template slot="content">
        <b-form :data-vv-scope="'FormEntry'" :data-vv-value-path="'FormEntry'">
          <b-row>
            <b-col style="background: #FFFFFF;
              border: 1px solid #E0E0E0;
              box-sizing: border-box;
              border-radius: 4px;
              min-height: 150px; padding: 10px !important;">
              {{body}}
            </b-col>
          </b-row>
        </b-form>
      </template>
    </ABSModal>
  </div>
</template>

<script>
export default {
  computed: {
  },
  watch: {
  },
  props: {
  },
  data() {
    return {
      body: "",
    };
  },
  methods: {
    showDescription(data) {
      this.body = data;
      this.$refs.Modal_Description._show();
    },
    onClose() {
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
    },
  },
  mounted() {
  },
};
</script>