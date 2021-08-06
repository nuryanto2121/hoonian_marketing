<template>
  <div>
    <b-row class="dashboardBody">
      <b-col lg="12" xl="12">
        <b-row>
          <b-col lg="12" xl="12">
            <div class="card">
              <div class="card__body">
                <b-row class="title-primary row-view" style="margin-bottom: 10px;">
                  <b-col style="margin-bottom: 10px;">
                    <span style="font-weight: bold; font-size: 18px;">Reffered By</span>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="2" xl="2">
                    <label class="lbl-poppins" style="font-size: 17px;">
                      {{ $t('name') }}
                    </label>
                  </b-col>
                  <b-col lg="6" xl="6">
                    <label style="color: #4A93B3; font-size: 17px;">
                      {{'Debby'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="2" xl="2">
                    <label class="lbl-poppins" style="font-size: 17px;">
                      {{ $t('date') }}
                    </label>
                  </b-col>
                  <b-col lg="6" xl="6">
                    <label style="color: #4A93B3; font-size: 17px;">
                      {{'11 Jan 2021'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="2" xl="2">
                    <label class="lbl-poppins" style="font-size: 17px;">
                      {{ $t('project_name') }}
                    </label>
                  </b-col>
                  <b-col lg="6" xl="6">
                    <label style="color: #4A93B3; font-size: 17px;">
                      {{'Adhi City'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="2" xl="2">
                    <label class="lbl-poppins" style="font-size: 17px;">
                      {{ $t('handphone_no') }}
                    </label>
                  </b-col>
                  <b-col lg="6" xl="6">
                    <label style="color: #4A93B3; font-size: 17px;">
                      {{'9876545678998'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="2" xl="2">
                    <label class="lbl-poppins" style="font-size: 17px;">
                      {{ $t('notes') }}
                    </label>
                  </b-col>
                  <b-col lg="6" xl="6">
                    <label style="color: #4A93B3; font-size: 17px;">
                      {{'Follow Up Sampai date 21 Maret 2021'}}
                    </label>
                  </b-col>
                </b-row>

                <b-row class="title-primary row-view" style="margin-top: 20px; margin-bottom: 10px;">
                  <b-col style="margin-bottom: 10px;">
                    <span style="font-weight: bold; font-size: 18px;">Prospect</span>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="2" xl="2">
                    <label class="lbl-poppins" style="font-size: 17px;">
                      {{ $t('name') }}
                    </label>
                  </b-col>
                  <b-col lg="6" xl="6">
                    <label style="color: #4A93B3; font-size: 17px;">
                      {{'Agus'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="2" xl="2">
                    <label class="lbl-poppins" style="font-size: 17px;">
                      {{ $t('handphone_no') }}
                    </label>
                  </b-col>
                  <b-col lg="6" xl="6">
                    <label style="color: #4A93B3; font-size: 17px;">
                      {{'9876545678998'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="2" xl="2">
                    <label class="lbl-poppins" style="font-size: 17px;">
                      {{ $t('relation') }}
                    </label>
                  </b-col>
                  <b-col lg="6" xl="6">
                    <label style="color: #4A93B3; font-size: 17px;">
                      {{'Family'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="2" xl="2">
                    <label class="lbl-poppins" style="font-size: 17px;">
                      {{ $t('purchase_unit') }}
                    </label>
                  </b-col>
                  <b-col lg="6" xl="6">
                    <label style="color: #4A93B3; font-size: 17px;">
                      {{'2'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="2" xl="2">
                    <label class="lbl-poppins" style="font-size: 17px;">
                      {{ $t('company_name') }}
                    </label>
                  </b-col>
                  <b-col lg="6" xl="6">
                    <label style="color: #4A93B3; font-size: 17px;">
                      {{'PT. Astra'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="2" xl="2">
                    <label class="lbl-poppins" style="font-size: 17px;">
                      {{ $t('industry') }}
                    </label>
                  </b-col>
                  <b-col lg="6" xl="6">
                    <label style="color: #4A93B3; font-size: 17px;">
                      {{'Logistic'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="2" xl="2">
                    <label class="lbl-poppins" style="font-size: 17px;">
                      {{ $t('job_title') }}
                    </label>
                  </b-col>
                  <b-col lg="6" xl="6">
                    <label style="color: #4A93B3; font-size: 17px;">
                      {{'Manager'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="2" xl="2">
                    <label class="lbl-poppins" style="font-size: 17px;">
                      {{ $t('yearly_income') }}
                    </label>
                  </b-col>
                  <b-col lg="6" xl="6">
                    <label style="color: #4A93B3; font-size: 17px;">
                      IDR {{'400.000.000'}}
                    </label>
                  </b-col>
                </b-row>

                <b-row class="title-primary row-view" style="margin-top: 20px; margin-bottom: 10px;">
                  <b-col style="margin-bottom: 10px;">
                    <span style="font-weight: bold; font-size: 18px;">Prospect</span>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="2" xl="2">
                    <label class="lbl-poppins" style="font-size: 17px;">
                      {{ $t('marketing_name') }}
                    </label>
                  </b-col>
                  <b-col lg="6" xl="6">
                    <label style="color: #4A93B3; font-size: 17px;">
                      {{'Triyono'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="2" xl="2">
                    <label class="lbl-poppins" style="font-size: 17px;">
                      {{ $t('date_assign') }}
                    </label>
                  </b-col>
                  <b-col lg="6" xl="6">
                    <label style="color: #4A93B3; font-size: 17px;">
                      {{'14 Jan 2021'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="2" xl="2">
                    <label class="lbl-poppins" style="font-size: 17px;">
                      {{ $t('relation') }}
                    </label>
                  </b-col>
                  <b-col lg="6" xl="6">
                    <label style="color: #4A93B3; font-size: 17px;">
                      {{'Family'}}
                    </label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="2" xl="2">
                    <label class="lbl-poppins" style="font-size: 17px;">
                      {{ $t('notes') }}
                    </label>
                  </b-col>
                  <b-col lg="6" xl="6">
                    <label style="color: #4A93B3; font-size: 17px;">
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
