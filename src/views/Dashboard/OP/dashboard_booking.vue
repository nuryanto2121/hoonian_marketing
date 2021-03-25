<template>
  <div class="card" style="height: 95%">
    <div class="card__body">
      <b-row style="margin-bottom: 10px;">
        <b-col style="max-width: max-content !important">
          <span style="font-size: 16px; color: #333399; font-weight: bold;">Booking</span>
        </b-col>
        <b-col style="text-align: right; padding-right: unset !important;">
          <span>
            <ABSButton
              :text="OverdueLabel"
              classButton="button button--delete"
              classIcon="icon-style-1"
              @click="doViewOverdue"
              :size="'50px'"
            />
            <ABSButton
              :text="OnHoldLabel"
              classButton="button button--gray"
              classIcon="icon-style-1"
              @click="doViewTotalHold"
            />
            <ABSButton
              :text="'View All'"
              classButton="button button--back"
              classIcon="icon-style-1"
              @click="doViewAllBookingPayment"
            />
          </span>
        </b-col>
      </b-row>
          <b-table
                class="table-sm table-style-3"
                :responsive="true"
                :striped="true"
                :bordered="true"
                :outlined="false"
                :small="false"
                :hover="false"
                :dark="false"
                :fixed="false"
                :foot-clone="false"
                :fields="Booking.Header"
                :items="Booking.Data"
                thStyle="padding: 5px !important;"
                @row-clicked="doViewClick"
            >
                <!-- <template v-slot:cell(no)="data">
                  {{data.index + 1}}
                </template> -->
                <template v-slot:cell(no)="data">
                  <span :style="data.item.status == 1 ? 'color: red;': data.item.status == 2 ? 'color: grey': ''">
                    {{ data.index + 1 }}
                  </span>
              </template>
              <template v-slot:cell(project_name)="data">
                  <span :style="data.item.status == 1 ? 'color: red;' : data.item.status == 2? 'color: grey' : ''">
                  {{ data.item.project_name }}
                  </span>          
              </template>
              <template v-slot:cell(tower_cluster_name)="data">
                  <span :style="data.item.status == 1 ? 'color: red;': data.item.status == 2 ? 'color: grey' : ''">
                    {{ data.item.tower_cluster_name }}
                  </span>
              </template>
              <template v-slot:cell(block_floor_name)="data">
                  <span :style="data.item.status == 1? 'color: red;': data.item.status == 2? 'color: grey': ''">
                    {{ data.item.block_floor_name }}
                  </span>
              </template>
              <template v-slot:cell(unit_no)="data">
                  <span :style="data.item.status == 1? 'color: red;': data.item.status == 2? 'color: grey': ''">
                    {{ data.item.unit_no }}
                  </span>
              </template>
              <template v-slot:cell(booking_date)="data">
                <span :style="data.item.status == 1? 'color: red;': data.item.status == 2? 'color: grey': ''">
                  {{momentUnix(data.item.booking_date, "DD MMM YYYY")}}
                </span>
              </template>
              <template v-slot:cell(customer_name)="data">
                <span :style="data.item.status == 1? 'color: red;': data.item.status == 2? 'color: grey': ''">
                  {{ data.item.customer_name }}
                </span>
              </template>
              <template v-slot:cell(principle_name)="data">
                <span :style="data.item.status == 1? 'color: red;': data.item.status == 2? 'color: grey': ''">
                  {{ data.item.principle_name }}
                </span>
              </template>
          </b-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      BookingList_propList: {
        url: "",
        initialWhere: "",
        SortField: "",
        SortBy: "",
        ParamWhere: "",
      },
      OverdueLabel: "",
      OnHoldLabel: "",
      Booking: {
        Header: [
          {
            key: "no",
            label: "No",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center",
          },
          {
            key: "project_name",
            label: "Project Name",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
          },
          {
            key: "tower_cluster_name",
            label: "Tower",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
          },
          {
            key: "block_floor_name",
            label: "Floor",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
          },
          {
            key: "unit_no",
            label: "Unit No",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
          },
          {
            key: "booking_date",
            label: "Booking Date",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
          },
          {
            key: "customer_name",
            label: "Buyer Name",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
          },
          {
            key: "principle_name",
            label: "Principle",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
          },
        ],
        Data: [],
      },
    };
  },
  computed: {
    _projectId() {
      return this.$store.getters.getProjectId;
    },
  },
  watch: {
    _projectId(newValue, oldValue) {
      this.getListBookingPayment();
    },
  },
  methods: {
    doViewClick(record, index) {
      let param = record;
      param.project_id = this.getDashboardProjectID();
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_BookingForm"});
    },
    doViewOverdue() {

    },
    doViewTotalHold() {
      this.$router.push({ name: "OP_BookingOnHold"});
    },
    doViewAllBookingPayment() {
      this.$router.push({ name: "OP_BookingViewAll"});
    },
    getListBookingPayment() {
      var param = {
        project_id: this.getDashboardProjectID(),
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/dashboard-booking",
        param
      ).then((response) => {
        if (response == null) return;
        this.Booking.Data = response.data.list;
        this.OverdueLabel = "Overdue" + '\xa0\xa0\xa0\xa0\xa0' + response.data.total_overdue;
        this.OnHoldLabel = "On Hold" + '\xa0\xa0\xa0\xa0\xa0' + response.data.total_on_hold;
      });
    },
  },
  mounted() {
    this.getListBookingPayment();
  },
};
</script>