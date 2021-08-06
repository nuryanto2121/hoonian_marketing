<template>
  <div>
    <b-row class="dashboardBody">
      <b-col cols="12">
        <b-row>
          <b-col cols="12">
            <div class="card">
              <div class="card__body">
                <b-row class="title-primary row-view" style="margin-bottom: 10px;">
                  <b-col style="margin-bottom: 10px;">
                    <span style="font-weight: bold; font-size: 15px;">Reffered By</span>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="6">
                    <label class="lbl-poppins" style="font-size: 13px;">
                      {{ $t('name') }}
                    </label>
                  </b-col>
                  <b-col cols="6">
                    <label style="color: #4A93B3; font-size: 13px;">
                      {{'Debby'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="6">
                    <label class="lbl-poppins" style="font-size: 13px;">
                      {{ $t('date') }}
                    </label>
                  </b-col>
                  <b-col cols="6">
                    <label style="color: #4A93B3; font-size: 13px;">
                      {{'11 Jan 2021'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="6">
                    <label class="lbl-poppins" style="font-size: 13px;">
                      {{ $t('project_name') }}
                    </label>
                  </b-col>
                  <b-col cols="6">
                    <label style="color: #4A93B3; font-size: 13px;">
                      {{'Adhi City'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="6">
                    <label class="lbl-poppins" style="font-size: 13px;">
                      {{ $t('handphone_no') }}
                    </label>
                  </b-col>
                  <b-col cols="6">
                    <label style="color: #4A93B3; font-size: 13px;">
                      {{'9876545678998'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="6">
                    <label class="lbl-poppins" style="font-size: 13px;">
                      {{ $t('notes') }}
                    </label>
                  </b-col>
                  <b-col cols="6">
                    <label style="color: #4A93B3; font-size: 13px;">
                      {{'Follow Up Sampai date 21 Maret 2021'}}
                    </label>
                  </b-col>
                </b-row>

                <b-row class="title-primary row-view" style="margin-top: 20px; margin-bottom: 10px;">
                  <b-col style="margin-bottom: 10px;">
                    <span style="font-weight: bold; font-size: 15px;">Prospect</span>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="6">
                    <label class="lbl-poppins" style="font-size: 13px;">
                      {{ $t('name') }}
                    </label>
                  </b-col>
                  <b-col cols="6">
                    <label style="color: #4A93B3; font-size: 13px;">
                      {{'Agus'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="6">
                    <label class="lbl-poppins" style="font-size: 13px;">
                      {{ $t('handphone_no') }}
                    </label>
                  </b-col>
                  <b-col cols="6">
                    <label style="color: #4A93B3; font-size: 13px;">
                      {{'9876545678998'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="6">
                    <label class="lbl-poppins" style="font-size: 13px;">
                      {{ $t('relation') }}
                    </label>
                  </b-col>
                  <b-col cols="6">
                    <label style="color: #4A93B3; font-size: 13px;">
                      {{'Family'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="6">
                    <label class="lbl-poppins" style="font-size: 13px;">
                      {{ $t('purchase_unit') }}
                    </label>
                  </b-col>
                  <b-col cols="6">
                    <label style="color: #4A93B3; font-size: 13px;">
                      {{'2'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="6">
                    <label class="lbl-poppins" style="font-size: 13px;">
                      {{ $t('company_name') }}
                    </label>
                  </b-col>
                  <b-col cols="6">
                    <label style="color: #4A93B3; font-size: 13px;">
                      {{'PT. Astra'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="6">
                    <label class="lbl-poppins" style="font-size: 13px;">
                      {{ $t('industry') }}
                    </label>
                  </b-col>
                  <b-col cols="6">
                    <label style="color: #4A93B3; font-size: 13px;">
                      {{'Logistic'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="6">
                    <label class="lbl-poppins" style="font-size: 13px;">
                      {{ $t('job_title') }}
                    </label>
                  </b-col>
                  <b-col cols="6">
                    <label style="color: #4A93B3; font-size: 13px;">
                      {{'Manager'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="6">
                    <label class="lbl-poppins" style="font-size: 13px;">
                      {{ $t('yearly_income') }}
                    </label>
                  </b-col>
                  <b-col cols="6">
                    <label style="color: #4A93B3; font-size: 13px;">
                      IDR {{'400.000.000'}}
                    </label>
                  </b-col>
                </b-row>

                <b-row class="title-primary row-view" style="margin-top: 20px; margin-bottom: 10px;">
                  <b-col style="margin-bottom: 10px;">
                    <span style="font-weight: bold; font-size: 15px;">Prospect</span>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="6">
                    <label class="lbl-poppins" style="font-size: 13px;">
                      {{ $t('marketing_name') }}
                    </label>
                  </b-col>
                  <b-col cols="6">
                    <label style="color: #4A93B3; font-size: 13px;">
                      {{'Triyono'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="6">
                    <label class="lbl-poppins" style="font-size: 13px;">
                      {{ $t('date_assign') }}
                    </label>
                  </b-col>
                  <b-col cols="6">
                    <label style="color: #4A93B3; font-size: 13px;">
                      {{'14 Jan 2021'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="6">
                    <label class="lbl-poppins" style="font-size: 13px;">
                      {{ $t('relation') }}
                    </label>
                  </b-col>
                  <b-col cols="6">
                    <label style="color: #4A93B3; font-size: 13px;">
                      {{'Family'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="6">
                    <label class="lbl-poppins" style="font-size: 13px;">
                      {{ $t('notes') }}
                    </label>
                  </b-col>
                  <b-col cols="6">
                    <label style="color: #4A93B3; font-size: 13px;">
                      {{'Follow Up Sampai date 21 Maret 2021'}}
                    </label>
                  </b-col>
                </b-row>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  props: ['title'],
  computed: {
    paramFromList() {
      var param = this.$store.getters.getParamPage;
      return param;
    },
  },
  watch: {
  },
  data() {
    return {
      Model: {},
    };
  },
  methods: {
    doBack() {
      this.$router.go(-1);
    },
    getDataBy() {
      // console.log(this.paramFromList)
      // let param = {
      //   customer_transaction_id: this.paramFromList.id,
      //   marketing_agent_id: this.getDataUser().marketing_id,
      // };

      // this.postJSON(this.urlHoonian + '/api/marketing-website/sales/sales-detail', param).then((response) => {
      //   if (response == null) return;
      //   this.Model = response.data;
      // });
    }
  },
  mounted() {
    this.getDataBy();
  },
};
</script>

<style scoped>
@media (min-width: 992px) {
  .offset-header {
    margin-left: 4%;
  }
}
@media (min-width: 1200px) {
  .offset-header {
    margin-left: 20%;
  }
}
.activate {
  box-shadow: 0px 5px 5px 2px #ccc;
}
</style>
