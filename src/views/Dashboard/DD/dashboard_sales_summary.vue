<template>
  <div class="card" style="height: 100%">
    <div class="card__title-newdash" style="border-bottom: unset !important;">
      <b-row>
        <b-col style="max-width:max-content !important;">
          <span style="font-size: 20px; color: #333399;">{{title}}</span>
        </b-col>
        <!-- <b-col style="text-align: right;">
            <span>
                <ABSButton
                :text="'View All'"
                classButton="button button--new"
                classIcon="icon-style-1"
                :disabled="false"
                @click="doViewSalesSumary"
                />
            </span>
        </b-col> -->
      </b-row>
    </div>
    <div class="card__body">
      <b-row>
        <b-col md="3">
          <b-row @click="goSalesAvailable" align-v="center" style="min-height: 65px; background: #028A20; border-radius: 4px; color: white; text-align: center;">
            <b-col>
              <div style="font-size: 22px;">
                <b>{{Model.available}}</b>
              </div>
              <div style="font-size: 12px; color: rgba(255, 255, 255, .87)">
                Available
              </div>
            </b-col>
          </b-row>
          <b-row @click="goSalesReserved" align-v="center" style="min-height: 65px; background: #52A0FC; border-radius: 4px; color: white; text-align: center; margin-top: 10px;">
            <b-col>
              <div style="font-size: 22px;">
                <b>{{Model.reserved}}</b>
              </div>
              <div style="font-size: 12px; color: rgba(255, 255, 255, .87)">
                Reserved
              </div>
            </b-col>
          </b-row>
          <b-row @click="goSalesHold" align-v="center" style="min-height: 65px; background: #9FA2AE; border-radius: 4px; color: white; text-align: center; margin-top: 10px;">
            <b-col>
              <div style="font-size: 22px;">
                <b>{{Model.hold}}</b>
              </div>
              <div style="font-size: 12px; color: rgba(255, 255, 255, .87)">
                Hold
              </div>
            </b-col>
          </b-row>
          <b-row @click="goSalesBooked" align-v="center" style="min-height: 65px; background: #FFC700; border-radius: 4px; color: white; text-align: center; margin-top: 10px;">
            <b-col>
              <div style="font-size: 1.5vw;">
                <span>
                  <b>{{Model.booked}}</b>
                </span>/<span style="background: red; border-radius: 5px; padding: 2px; font-size: 1vw;">
                  <b>{{Model.booked_kpi}}</b>
                </span>
              </div>
              <div style="font-size: 12px; color: rgba(255, 255, 255, .87)">
                Booked
              </div>
            </b-col>
          </b-row>
          <b-row @click="goSalesSold" align-v="center" style="min-height: 65px; background: #FF0045; border-radius: 4px; color: white; text-align: center; margin-top: 10px;">
            <b-col>
              <div style="font-size: 22px;">
                <b>{{Model.sold}}</b>
              </div>
              <div style="font-size: 12px; color: rgba(255, 255, 255, .87)">
                Sold
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col md="9">
          <b-row style="height: 50%;">
            <b-col>
              <div style="
                width: 200px;
                height: 200px;
                background-color: #FFFFFF;
                border-radius: 50%;
                margin: auto;
                border: 25px solid #7541DC;
                text-align: center;
                top: 60% !important;
              " class="center">
                <div class="center2">
                  <span style="color: #7541DC; font-size: 35px;">{{Model.total_value}}</span>
                  <br>
                  <span style="color: #7541DC; font-size: 24px;">{{Model.prefix}}</span>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row style="position: absolute; width: 100%; top: 60%;">
            <b-col @click="goSalesCancelledBooking" align-v="center" style="
              min-height: 65px;
              background: #25c0c0;
              border-radius: 4px;
              color: white;
              text-align: center;
              margin: 10px 10px 0px 5px;
              padding: 5px 0px 0px 0px !important;"
              class="cancelled-box cancelled-box-i"
            >
              <div style="font-size: 10px; color: rgba(255, 255, 255, .87)">
                Cancelled Booking
              </div>
              <div style="font-size: 28px;">
                <span>
                  <b>{{Model.cancelled_booking}}</b>
                </span>
              </div>
            </b-col>
            <b-col @click="goSalesCancelledSales" align-v="center" style="
              min-height: 65px;
              background: #ff8248;
              border-radius: 4px;
              color: white;
              text-align: center;
              margin-top: 10px;
              padding: 5px 0px 0px 0px !important;"
              class="cancelled-box"
            >
              <div style="font-size: 10px; color: rgba(255, 255, 255, .87)">
                Cancelled Sales
              </div>
              <div style="font-size: 28px;">
                <span>
                  <b>{{Model.cancelled_sales}}</b>
                </span>
              </div>
            </b-col>
          </b-row>
          <b-row style="position: absolute; width: 100%; top: 82.5%;">
            <b-col>
              <div style="
                color: #FFFFFF;
                background-color: #333399;
                border-radius: 10px;
                margin: auto;
                height: 65px;
              ">
                <!-- <span style="font-color: #7541DC; font-size: 20px;">{{Model.total_value}}</span>
                <br>
                <span style="font-color: #7541DC;">Milion</span> -->
                <b-row style="height: 100%;">
                  <b-col style="text-align: right;">
                    <span style="font-size: 35px;">{{Model.total_unit}}</span>
                  </b-col>
                  <b-col md="2" lg="4" style="align-self: flex-end; margin-bottom: 10px;">
                    <span style="font-size: 13px;">Units</span>
                  </b-col>
                </b-row>
              </div>
            </b-col>
          </b-row>
        </b-col>
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
        available: "800",
        reserved: "150",
        booked: "25",
        booked_kpi: "10",
        hold: "7",
        sold: "55",
        total_value: "46.750",
        total_unit: "1.047",
        prefix: '',
        cancelled_booking: 50,
        cancelled_sales: 50,
      },
    }
  },
  methods: {
    doViewSalesSumary() {},
    goSalesAvailable() {
      this.$router.push({ name: "DD_SalesAvailable"});
    },
    goSalesReserved() {
      this.$router.push({ name: "DD_SalesReserved"});
    },
    goSalesHold() {
      this.$router.push({ name: "DD_SalesHold"});
    },
    goSalesBooked() {
      this.$router.push({ name: "DD_SalesBooked"});
    },
    goSalesSold() {
      this.$router.push({ name: "DD_SalesSold"});
    },
    goSalesCancelledBooking() {
      this.$router.push({ name: "DD_SalesCancelBooking"});
    },
    goSalesCancelledSales() {
      this.$router.push({ name: "DD_SalesCancelSales"});
    },
    renderData() {
      let param = {
        project_id: this.Model.project_id
      };

      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard/dashboard-sales-summary', param).then((response) => {
        let data = response.data.data;
        this.Model.available = data.available;
        this.Model.reserved = data.reserved;
        this.Model.booked = data.booked;
        this.Model.booked_kpi = data.booked_kpi;
        this.Model.hold = data.hold;
        this.Model.sold = data.sold;
        this.Model.cancelled_booking = data.cancelled_book;
        this.Model.cancelled_sales = data.cancelled_sales;
        this.Model.prefix = this.checkDigit(data.total_value && data.total_value !== '' ? data.total_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0);
        this.Model.total_value = this.checkNum(data.total_value && data.total_value !== '' ? data.total_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0, data.total_value && data.total_value !== '' ? data.total_value : 0);
        this.Model.total_unit = data.total_unit && data.total_unit !== '' ? data.total_unit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0;


      });
    },
  },
  mounted() {
    this.renderData();
  },
};
</script>
<style scoped>
@media (min-width: 1200px) {
  .cancelled-box {
    -webkit-box-flex: 0;
    flex: 0 0 47% !important;
    max-width: 47% !important;
  }
  .cancelled-box-i {
    /* margin-right: 19px !important; */
  }
}

@media (min-width: 992px) {
  .cancelled-box {
    -webkit-box-flex: 0;
    flex: 0 0 45%;
    max-width: 45%;
  }
  .cancelled-box-i {
    margin-right: 13px;
  }
}
</style>