<template>
  <div class="card" style="height: 95%;">
    <div class="card__body">
      <b-row>
        <b-col style="max-width: max-content !important">
          <span style="font-size: 16px; color: #333399; font-weight: bold;">Sales Lead</span>
        </b-col>
        <b-col style="text-align: right; padding: unset !important;">
          <span>
            <ABSButton
              :text="'Import'"
              classButton="button button--back"
              classIcon="icon-style-1"
              @click="doImport"
            />
          </span>
        </b-col>
      </b-row>
      <b-row style="margin-top: 10px;">
        <b-col lg="8" xl="8">
          <b-row>
            <b-col style="border: 1px solid rgba(45, 71, 175, 0.15);
              box-sizing: border-box;
              border-radius: 6px;
              padding-bottom: 10px;">
              <b-row align-h="center">
                <b-col style="text-align: center; margin-top: 10px;" @click="onTotalClick">
                  <div style="
                    width: 90px;
                    height: 87px;
                    background: linear-gradient(180deg, #333399 0%, #339399 100%);
                    border-radius: 53.5px;
                    font-size: 40px;
                    color: white;
                    margin: auto;
                    display: flex; justify-content: center; align-items: center;">
                      <b>{{Model.total}}</b>
                  </div>
                  <div style="margin-top: 5px; color: #333399; font-size: 13px;">
                    <b>Total</b>
                  </div>
                </b-col>
                <b-col align-self="center" style="text-align: center; margin-top: 10px;" @click="onDropClick">
                  <div style="
                    width: 90px;
                    height: 87px;
                    border: 8px solid rgba(255, 0, 69, 0.2);
                    box-sizing: border-box;
                    border-radius: 53.5px;
                    font-size: 40px;
                    color: #FF0045;
                    margin: auto;
                    display: flex; justify-content: center; align-items: center;">
                      <b>{{Model.drop}}</b>
                  </div>
                  <div style="margin-top: 5px; color: #FC5280; font-size: 13px;">
                    <b>Drop</b>
                  </div>
                </b-col>
              </b-row>
              <b-row style="margin-top: 12px;" align-h="center">
                <b-col style="text-align: center;" @click="onArchivedClick">
                  <div style="
                    width: 90px;
                    height: 87px;
                    border: 8px solid rgba(2, 138, 32, 0.2);
                    box-sizing: border-box;
                    border-radius: 53.5px;
                    font-size: 40px;
                    color: #028A20;
                    margin: auto;
                    display: flex; justify-content: center; align-items: center;">
                      <b>{{Model.archived}}</b>
                  </div>
                  <div style="margin-top: 5px; color: #00C12B; font-size: 13px;">
                    <b>Archived</b>
                  </div>
                </b-col>
                <b-col align-self="center" style="text-align: center;" @click="onReferClick">
                  <div style="
                    width: 90px;
                    height: 87px;
                    border: 8px solid rgba(255, 130, 72, 0.2);
                    box-sizing: border-box;
                    border-radius: 53.5px;
                    font-size: 40px;
                    color: #FF8248;
                    margin: auto;
                    display: flex; justify-content: center; align-items: center;">
                      <b>{{Model.refer}}</b>
                  </div>
                  <div style="margin-top: 5px; color: #FF8248;; font-size: 13px;">
                    <b>Refer</b>
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
        <b-col lg="4" xl="4" style="border: 1px solid rgba(45, 71, 175, 0.15);
              box-sizing: border-box;
              border-radius: 6px;
              padding-bottom: 10px;">
          <b-row align-v="center" style="margin-bottom: 12px;">
            <b-col>
              <b-row>
                <b-col style="text-align: center; margin-top: 10px;" @click="onUnattendedClick">
                  <div style="
                    max-width: 206px;
                    height: 87px;
                    background-color: #FFFFFF;
                    border-radius: 6px;
                    font-size: 40px;
                    color: #FF0045;
                    margin:auto;
                    border: 6px solid #FF0045;
                    display: flex; justify-content: center; align-items: center;
                  ">
                    <b>{{Model.unattended}}</b>
                  </div>
                </b-col>
              </b-row>
              <b-row style="margin-top: 5px">
                <b-col style="text-align: center;
                    color: #FF0045;
                    font-size: 13px;">
                  <b>Unattended</b>
                </b-col>
              </b-row>
            </b-col>
          </b-row>

          <b-row align-v="center">
            <b-col>
              <b-row>
                <b-col style="text-align: center;" @click="onPendingClick">
                  <div style="
                    max-width: 206px;
                    height: 87px;
                    background-color: rgba(159, 162, 174, 0.2);
                    border-radius: 6px;
                    font-size: 40px;
                    color: #9FA2AE;
                    margin:auto;
                    display: flex; justify-content: center; align-items: center;
                  ">
                    <b>{{Model.pending}}</b>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col style="text-align: center;
                    padding: unset !important;
                    color: #9FA2AE;
                    font-size: 12px;
                    letter-spacing: -0.8px;
                    margin-top: 4px;">
                  <b>Pending Sales Lead</b>
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
        archived: 0,
        drop: 0,
        pending: 0,
        refer: 0,
        total: 0,
        unattended: 0
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
      this.getSalesLead();
    }
  },
  methods: {
    onTotalClick() {
      this.$router.push({ name: "OP_SalesLeadTotalList" });
    },
    onDropClick() {
      this.$router.push({ name: "OP_SalesLeadDropList" });
    },
    onArchivedClick() {
      this.$router.push({ name: "OP_SalesLeadArchivedList" });
    },
    onReferClick() {
      this.$router.push({ name: "OP_SalesLeadReferList" });
    },
    onUnattendedClick() {
      this.$router.push({ name: "OP_SalesLeadUnattendedList" });
    },
    onPendingClick() {
      this.$router.push({ name: "OP_SalesLeadPendingList" });
    },
    getSalesLead() {
      let param = {
        project_id: this.getDashboardProjectID(),
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/dashboard-sales-lead",
        param
      ).then((response) => {
        if (response == null) return;
        this.Model = response.data.data;
      });
    },
    doImport() {
      this.$router.push({ name: "OP_SalesLeadImport" });
    },
  },
  mounted() {
    this.getSalesLead();
  }
};
</script>