<template>
  <div class="card" style="height: 100%">
    <div class="card__body">
      <b-row style="">
        <b-col style="border: solid 1px #e0e3f3; border-radius: 5px; margin-right: 10px; padding-bottom: 10px;">
            <b-row>
                <b-col>
                    <div style="font-size: 17.5px; color: #333399; font-weight: bold; margin-top: 15px; text-shadow: 1px 0 rgb(51 51 153);">
                        Outstanding <br> Commission
                    </div>
                </b-col>
                <b-col>
                    <div style="
                        background: #ff8248;
                        border-radius: 6px;
                        font-size: 40px;
                        color: #FFFFFF;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-weight: bold;
                        margin-top: 10px;
                        cursor: pointer;
                    " @click="detailOutstandingCommission">
                        {{Model.outstanding_commission}}
                    </div>
                </b-col>
            </b-row>
        </b-col>
        <b-col style="border: solid 1px #e0e3f3; border-radius: 5px; margin-right: 10px; padding-bottom: 10px;">
            <b-row>
                <b-col>
                    <div style="font-size: 17.5px; color: #333399; font-weight: bold; margin-top: 15px; text-shadow: 1px 0 rgb(51 51 153);">
                      Hold <br> Booking
                    </div>
                </b-col>
                <b-col>
                    <div style="
                        background: #25c0c0;
                        border-radius: 6px;
                        font-size: 40px;
                        color: #FFFFFF;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-top: 10px;
                        cursor: pointer;
                    " @click="detailHoldBooking">
                        <span style="margin-right: 25px; margin-left: 5px; font-weight: bold;">
                            {{Model.hold_principle}}
                        </span>
                        <span style="padding-right: 10px; font-size: 15px; font-weight: bold;">Last 3 <br> Months</span>
                    </div>
                </b-col>
            </b-row>
        </b-col>
        <b-col style="border: solid 1px #e0e3f3; border-radius: 6px; margin-right: 10px; padding-bottom: 10px;">
            <b-row style="padding-left: 10px;">
                <b-col>
                    <div style="font-size: 17.5px; color: #333399; font-weight: bold; position: absolute; top: 55%; left: 20%; transform: translate(-50%, -50%); text-shadow: 1px 0 rgb(51 51 153);">
                      Tickets
                    </div>
                </b-col>
                <b-col>
                    <div style="
                        background: #1966b0;
                        border-radius: 6px;
                        font-size: 40px;
                        color: #FFFFFF;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-weight: bold;
                        margin-top: 10px;
                        cursor: pointer;
                    " @click="detailTickets">
                        {{Model.tickets}}
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
        outstanding_commission: "",
        prefix: "M",
        hold_principle: "",
        tickets: "",
      },
    }
  },
  methods: {
    detailOutstandingCommission() {
      this.$router.push({ name: "DD_OutstandingCommission" });
    },
    detailHoldBooking() {
      this.$router.push({ name: "DD_OutstandingHoldBooking" });
    },
    detailTickets() {
      this.$router.push({ name: "DD_OutstandingTickets" });
    },
    renderData() {
      let param = {
        project_id: this.Model.project_id
      };

      this.postJSON(this.urlHoonian + '/api/hoonian-website/dashboard/dashboard-commission-hold-ticket', param).then((response) => {
        let data = response.data.data;
        this.Model.outstanding_commission = this.checkNum(data.outstanding_commission && data.outstanding_commission !== '' ? data.outstanding_commission.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0, data.outstanding_commission && data.outstanding_commission !== '' ? data.outstanding_commission : 0);
        this.Model.hold_principle = data.hold_principle;
        this.Model.tickets = data.tickets;
      });
    },
  },
  mounted() {
    this.renderData();
  },
};
</script>