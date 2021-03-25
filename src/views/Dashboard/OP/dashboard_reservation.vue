<template>
  <div class="card" style="height: 95%;">
    <div class="card__body">
      <b-row style="padding-bottom: 15px;">
        <b-col lg="8" xl="8">
          <b-row>
            <b-col md="6" style="padding: unset !important;">
              <span style="font-size: 16px; color: #333399; font-weight: bold;">Reservation</span>
            </b-col>
            <b-col md="6" style="text-align: right; padding: unset !important;">
              <ABSButton
                :text="'Add'"
                classButton="button button--back"
                classIcon="icon-style-1"
                @click="doAdd"
                styleButton="margin-right: 0px !important;"
              />
            </b-col>
          </b-row>
          <b-row style="margin-top: 25px;">
            <b-col style="background: #FFFFFF; border: 1px solid #ED4C5C; box-sizing: border-box; border-radius: 4px; color: #ED4C5C; font-size: 12px;">
              <div style="float: right; margin: 0 auto; padding-bottom: 5px;">
                <b-img v-if="Model.warning" :src="require('@/assets/icon-svg/arrow_up.svg')" alt="" />
              </div>
              <div style="margin: 0 auto; text-align: center; padding-top: 2px;">
                Open Reserved
              </div>
            </b-col>
          </b-row>
          <b-row align-v="center" style="margin-top: 25px; border: 1px solid rgba(45, 71, 175, 0.15);
            box-sizing: border-box;
            border-radius: 6px;
            padding-bottom: 10px;">
            <b-col lg="6" xl="6" align-self="center" style="margin-top: 15px;">
              <div style="
                width: 103px;
                height: 103px;
                border: 6px solid #FFC700;
                border-radius: 50%;"
                class="center-block"
                @click="onClickBooked">
                  <div style="
                    position: relative;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 70.76px;
                    height: 70.76px;
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
              <div style="text-align: center; margin-top: 15px; color: #FFC700; font-size: 12px;">
                <b>Marked as</b>
              </div>
              <div style="text-align: center; margin-top: 4px; color: #FFC700; font-size: 16px;">
                <b>Booked</b>
              </div>
            </b-col>
            <b-col lg="6" xl="6" align-self="center" style="margin-top: 15px;">
              <div style="
                width: 103px;
                height: 103px;
                border: 6px solid #FF0045;
                border-radius: 50%;"
                class="center-block"
                @click="onClickSold">
                  <div style="
                    position: relative;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 70.76px;
                    height: 70.76px;
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
              <div style="text-align: center; margin-top: 15px; color: #FF0045; font-size: 12px;">
                <b>Marked as</b>
              </div>
              <div style="text-align: center; margin-top: 4px; color: #FF0045; font-size: 16px;">
                <b>Sold</b>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col lg="4" xl="4" align-self="center">
          <b-row>
            <b-col style="padding: unset !important;">
              <b-row style="border: 1px solid rgba(45, 71, 175, 0.15);
                box-sizing: border-box;
                border-radius: 6px;
                padding-bottom: 10px;">
                <b-col style="padding: unset !important;">
                  <b-row style="margin-top: 30px;">
                    <b-col>
                      <div style="text-align: center; display: flex; justify-content: center; align-items: center;" @click="onClickWaiting">
                        <div style="background-color: rgba(82, 160, 252, 0.25);
                          width: 90px;
                          height: 80px;
                          background: #A8E10C;
                          border-radius: 6px;
                          font-size: 40px;
                          color: #FFFFFF;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                        ">
                          <b>{{Model.waiting_list}}</b>
                        </div>
                      </div>
                      <div style="
                          color: #A8E10C;
                          font-size: 14px;
                          text-align: center;">
                        <b>Waiting list</b>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row style="margin-top: 35px;">
                    <b-col>
                      <div style="text-align: center; display: flex; justify-content: center; align-items: center;" @click="onClickOffline">
                        <div style="background-color: #8A6FDF;
                          width: 90px;
                          height: 80px;
                          border-radius: 6px;
                          font-size: 40px;
                          color: #FFFFFF;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                        ">
                          <b>{{Model.offline_sales}}</b>
                        </div>
                      </div>
                      <div style="
                          color: #8A6FDF;
                          margin-top: 10px;
                          font-size: 14px;
                          text-align: center;">
                        <b>Offline Sales</b>
                      </div>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
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
        booked: 0,
        offline_sales: 0,
        sold: 0,
        waiting_list: 0,
        warning: false,
      },
    };
  },
  computed: {
    _projectId () {
      return this.$store.getters.getProjectId;
    }
  },
  watch: {
    _projectId (newValue, oldValue) {
      this.getDashboardReservation();
    }
  },
  methods: {
    onClickBooked() {
      this.$router.push({ name: "OP_ReservationBookedList" });
    },
    onClickSold() {
      this.$router.push({ name: "OP_ReservationSoldList" });
    },
    onClickWaiting() {
      this.$router.push({ name: "OP_ReservationWaitingList" });
    },
    onClickOffline() {
      this.$router.push({ name: "OP_ReservationOfflineSalesList" });
    },
    getDashboardReservation() {
      let param = {
        project_id: this.getDashboardProjectID(),
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/dashboard-reservation",
        param
      ).then((response) => {
        if (response == null) return;
        this.Model = response.data.data;
      });
    },
    doAdd() {
      this.$router.push({ name: "OP_DashReservationList" });
    },
  },
  mounted() {
    this.getDashboardReservation();
  }
};
</script>