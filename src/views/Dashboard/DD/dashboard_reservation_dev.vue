<template>
  <div class="card" style="height: 100%;">
    <div class="card__body">
      <b-row>
        <b-col lg="12" xl="12" style="padding-left: unset !important; padding-right: unset !important;">
          <b-row style="margin-bottom: 30px">
            <b-col style="max-width: max-content !important;">
              <span style="font-size: 16px; color: #333399; font-weight: bold;">{{title}}</span>
            </b-col>
          </b-row>
          <b-row style="height: 105%">
            <b-col lg="8" xl="8" style="padding-left: unset !important;">
              <b-row style="height: 100%;">
                <b-col lg="6" xl="6" class="bordered_left">
                  <div class="center">
                    <div style="
                      width: 90px;
                      height: 90px;
                      border: 6px solid #FFC700;
                      border-radius: 50%; cursor: pointer;" @click="detailBooked">
                        <div style="
                          position: relative;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                          width: 65.76px;
                          height: 65.76px;
                          background: linear-gradient(180deg, #FFC700 0%, #FF9900 100%);
                          box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
                          border-radius: 50%;">
                            <div style="
                              text-align: center;
                              font-size: 30px;
                              color: white;
                              position: absolute;
                              top: 50%;
                              left: 50%;
                              transform: translate(-50%, -50%);">
                                <b>{{Model.booked}}</b>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: center; margin-top: 10px; color: #FFC700; font-size: 14px; font-weight: bold;">
                      Marked as
                    </div>
                    <div style="text-align: center; margin-top: 5px; color: #FFC700; font-size: 20px; font-weight: bold;">
                      Booked
                    </div>
                  </div>
                </b-col>
                <b-col lg="6" xl="6" class="bordered_right">
                  <div class="center">
                    <div style="
                      width: 90px;
                      height: 90px;
                      border: 6px solid #FF0045;
                      border-radius: 50%; cursor: pointer;"
                      class="center-block" @click="detailSold">
                        <div style="
                          position: relative;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                          width: 65.76px;
                          height: 65.76px;
                          background: linear-gradient(180deg, #FF0045 0%, #8000FF 100%);
                          box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
                          border-radius: 50%;">
                            <div style="
                              text-align: center;
                              font-size: 30px;
                              color: white;
                              position: absolute;
                              top: 50%;
                              left: 50%;
                              transform: translate(-50%, -50%);">
                                <b>{{Model.sold}}</b>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: center; margin-top: 10px; color: #FF0045; font-size: 14px; font-weight: bold;">
                      Marked as
                    </div>
                    <div style="text-align: center; margin-top: 5px; color: #FF0045; font-size: 20px; font-weight: bold;">
                      Sold
                    </div>
                  </div>
                </b-col>
              </b-row>
            </b-col>
            <b-col lg="4" xl="4" style="border: solid 1px #e4e7f5; border-radius: 6px; padding-top: 5px;">
              <b-row>
                <b-col lg="12" xl="12">
                  <div class="center-block" style="width: 95%;">
                    <b-row align-v="center" style="margin-top: 20px; margin-bottom: 10px;">
                      <b-col style="text-align: center; justify-content: center; align-items: center; padding-left: unset !important; padding-right: unset !important;">
                        <div style="
                          width: 100%;
                          height: 50px;
                          background: #a8e10c;
                          border-radius: 6px;
                          font-size: 36px;
                          color: #FFFFFF;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          font-weight: bold;
                          cursor: pointer;
                        " @click="detailWaitingList">
                          {{Model.waiting_list}}
                        </div>
                        <div style="text-align: center; 
                            color: #a8e10c;
                            margin-top: 2px;
                            font-size: 12.5px;
                            font-weight: bold;">
                          Waiting List
                        </div>
                      </b-col>
                    </b-row>

                    <b-row align-v="center" style="margin-bottom: 10px;">
                      <b-col style="text-align: center; justify-content: center; align-items: center; padding-left: unset !important; padding-right: unset !important;">
                        <div style="background: #8a6fdf;
                          width: 100%;
                          height: 50px;
                          border-radius: 6px;
                          font-size: 36px;
                          color: #FFFFFF;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          font-weight: bold;
                          cursor: pointer;
                        " @click="detailOfflineSales">
                          {{Model.offline_sales}}
                        </div>
                        <div style="text-align: center; 
                            color: #8a6fdf;
                            margin-top: 2px;
                            font-size: 12.5px;
                            font-weight: bold;">
                          Offline Sales
                        </div>
                      </b-col>
                    </b-row>

                    <b-row align-v="center">
                      <b-col style="text-align: center; justify-content: center; align-items: center; padding-left: unset !important; padding-right: unset !important;">
                        <div style="background: #ff5765;
                          width: 100%;
                          height: 50px;
                          border-radius: 6px;
                          font-size: 36px;
                          color: #FFFFFF;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          font-weight: bold;
                          cursor: pointer;
                        " @click="detailReferralSales">
                          {{Model.referral_sales}}
                        </div>
                        <div style="text-align: center; 
                            color: #ff5765;
                            margin-top: 2px;
                            font-size: 12px;
                            font-weight: bold;">
                          Refferal Sales
                        </div>
                      </b-col>
                    </b-row>
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
        <!-- <div style="margin: 0 auto; text-align: center;">
          <span style="
            margin-left: 20px;
            height: 100%; 
            opacity: 0.1;
            border: 2px solid #000000;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);">
          </span>
        </div> -->
        <!-- <b-col lg="4" xl="4" align-self="center">
          
          <b-row>
          </b-row>
        </b-col> -->
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title'],
  computed: {
    _projectId () {
      return this.$store.getters.getProjectId;
    }
  },
  watch: {
    _projectId (newValue, oldValue) {
      this.renderData();
    }
  },
  data() {
    return {
      Model: {
        project_id: this.getDashboardProjectID(),
        warning: false,
        booked: "80",
        sold: "100",
        waiting_list: "125",
        offline_sales: "35",
        referral_sales: "10"
      },
    }
  },
  methods: {
    detailBooked() {
      this.$router.push({ name: "DD_ReservationBooked" });
    },
    detailSold() {
      this.$router.push({ name: "DD_ReservationSold" });
    },
    detailWaitingList() {
      this.$router.push({ name: "DD_ReservationWaitingList" });
    },
    detailOfflineSales() {
      this.$router.push({ name: "DD_ReservationOfflineSales" });
    },
    detailReferralSales() {
      this.$router.push({ name: "DD_ReservationReferralSales" });
    },
    renderData() {
      let param = {
        project_id: this.Model.project_id
      };

      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard/dashboard-reservation-dev', param).then((response) => {
        let data = response.data.data;
        this.Model.warning = data.warning;
        this.Model.booked = data.booked;
        this.Model.sold = data.sold;
        this.Model.waiting_list = data.waiting_list;
        this.Model.offline_sales = data.offline_sales;
        this.Model.referral_sales = data.referral_sales;
      });
    }
  },
  mounted() {
    this.renderData();
  },
};
</script>

<style scoped>
.bordered_left {
  padding-left: 5px !important;
  padding-top: 5px !important;
  padding-bottom: 5px !important;
  border-left: solid 1px #e4e7f5;
  border-top: solid 1px #e4e7f5;
  border-bottom: solid 1px #e4e7f5;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}
.bordered_right {
  padding-right: 5px !important;
  padding-top: 5px !important;
  padding-bottom: 5px !important;
  border-right: solid 1px #e4e7f5;
  border-top: solid 1px #e4e7f5;
  border-bottom: solid 1px #e4e7f5;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}
</style>