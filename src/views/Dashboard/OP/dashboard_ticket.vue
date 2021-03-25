<template>
  <div class="card" style="height: 95%">
    <div class="card__body">
      <b-row style="margin-bottom: 10px;">
        <b-col style="max-width: max-content !important">
          <span style="font-size: 16px; color: #333399; font-weight: bold;">Ticket</span>
        </b-col>
        <b-col style="text-align: right; padding: unset !important;">
          <span>
            <ABSButton
              :text="'View All'"
              classButton="button button--back"
              classIcon="icon-style-1"
              @click="doViewAllTicketPayment"
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
                :fields="Ticket.Header"
                :items="Ticket.Data"
                thStyle="padding: 5px !important;"
                @row-clicked="doViewClick"
            >
                <template v-slot:cell(no)="data">
                  <span :style="data.item.alerted ? 'color: red' : ''">
                    {{data.index + 1}}
                  </span>
                </template>
                <template v-slot:cell(ticket_no)="data">
                  <span :style="data.item.alerted ? 'color: red' : ''">
                    {{data.item.ticket_no}}
                  </span>
                </template>
                <template v-slot:cell(date)="data">
                  <span :style="data.item.alerted ? 'color: red' : ''">
                    {{momentUnix(data.item.date, "DD MMM YYYY")}}
                  </span>
                </template>
                <template v-slot:cell(project)="data">
                  <span :style="data.item.alerted ? 'color: red' : ''">
                    {{data.item.project}}
                  </span>
                </template>
                <template v-slot:cell(buyer)="data">
                  <span :style="data.item.alerted ? 'color: red' : ''">
                    {{data.item.buyer}}
                  </span>
                </template>
                <template v-slot:cell(unit_no)="data">
                  <span :style="data.item.alerted ? 'color: red' : ''">
                    {{data.item.unit_no}}
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
      TicketList_propList: {
        url: "",
        initialWhere: "",
        SortField: "",
        SortBy: "",
        ParamWhere: "",
      },
      OverdueLabel: "",
      OnHoldLabel: "",
      Ticket: {
        Header: [
          {
            key: "no",
            label: "No",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
          },
          {
            key: "ticket_no",
            label: "Ticket No",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
          },
          {
            key: "date",
            label: "Date",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
          },
          {
            key: "project",
            label: "Project",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
          },
          {
            key: "buyer",
            label: "Buyer",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
          },
          {
            key: "unit_no",
            label: "Unit No",
            thClass: "HeaderACCList2Poppins th-cus-center",
            tdClass: "ContentACCList2Poppins notranslate th-cus-center"
          }
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
      this.getListTicketPayment();
    },
  },
  methods: {
    doViewClick(record, index) {
      var param = record;
      param.project_id = this.getDashboardProjectID();
      console.log(param);
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_TicketForm" });
    },
    doViewAllTicketPayment() {
      this.$router.push({ name: "OP_TicketList" });
    },
    getListTicketPayment() {
      var param = {
        project_id: this.getDashboardProjectID(),
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/dashboard-ticket",
        param
      ).then((response) => {
        if (response == null) return;
        this.Ticket.Data = response.data.list;
      });
    },
  },
  mounted() {
    this.getListTicketPayment();
  },
};
</script>