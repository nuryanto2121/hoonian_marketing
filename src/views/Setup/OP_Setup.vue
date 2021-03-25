<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="4" @click="onFleetMasterClick">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col>
                  <span style="float: left !important;">Fleet Master</span> &nbsp;
                </b-col>
              </b-row>
            </div>
            <div class="card__body">
              <div class="card__body__menu">
                <font-awesome-icon style="color: rgb(74, 147, 179);" icon="truck" size="6x" />
                <br />
                <br />
                <span style="width: 75%">Fleet Master Setup</span>
              </div>
            </div>
          </div>
        </b-col>
        <b-col md="4" @click="onDriverManagementClick">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col>
                  <span style="float: left !important;">Driver Management</span> &nbsp;
                </b-col>
              </b-row>
            </div>
            <div class="card__body">
              <div class="card__body__menu">
                <font-awesome-icon style="color: rgb(74, 147, 179);" icon="user" size="6x" />
                <br />
                <br />
                <span style="width: 75%">Manage Driver Setup</span>
              </div>
            </div>
          </div>
        </b-col>
        <b-col md="4" @click="onVehicleBrandClick">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col>
                  <span style="float: left !important;">Fleet Brand</span> &nbsp;
                </b-col>
              </b-row>
            </div>
            <div class="card__body">
              <div class="card__body__menu">
                <font-awesome-icon style="color: rgb(74, 147, 179);" icon="copyright" size="6x" />
                <br />
                <br />
                <span style="width: 75%">Master Fleet Brand</span>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row class="dashboardBody">
        <b-col md="4" @click="onVehicleTypeClick">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col>
                  <span style="float: left !important;">Fleet Type</span> &nbsp;
                </b-col>
              </b-row>
            </div>
            <div class="card__body">
              <div class="card__body__menu">
                <font-awesome-icon style="color: rgb(74, 147, 179);" icon="cogs" size="6x" />
                <br />
                <br />
                <span style="width: 75%">Master Fleet Type</span>
              </div>
            </div>
          </div>
        </b-col>
        <b-col md="4" @click="onVehicleCaroseryClick">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col>
                  <span style="float: left !important;">Fleet Carosery</span> &nbsp;
                </b-col>
              </b-row>
            </div>
            <div class="card__body">
              <div class="card__body__menu">
                <font-awesome-icon style="color: rgb(74, 147, 179);" icon="dice-d6" size="6x" />
                <br />
                <br />
                <span style="width: 75%">Master Fleet Carosery</span>
              </div>
            </div>
          </div>
        </b-col>
        <b-col md="4" @click="onMaintenanceTypeClick">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col>
                  <span style="float: left !important;">Maintenance Type</span> &nbsp;
                </b-col>
              </b-row>
            </div>
            <div class="card__body">
              <div class="card__body__menu">
                <font-awesome-icon style="color: rgb(74, 147, 179);" icon="wrench" size="6x" />
                <br />
                <br />
                <span style="width: 75%">Master Maintenance Type</span>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row class="dashboardBody">
        <b-col md="4" @click="onMaintenanceItemClick">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col>
                  <span style="float: left !important;">Maintenance Item</span> &nbsp;
                </b-col>
              </b-row>
            </div>
            <div class="card__body">
              <div class="card__body__menu">
                <font-awesome-icon style="color: rgb(74, 147, 179);" icon="fill-drip" size="6x" />
                <br />
                <br />
                <span style="width: 75%">Master Maintenance Item</span>
              </div>
            </div>
          </div>
        </b-col>
        <b-col md="4" @click="onTicketCategoryClick">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col>
                  <span style="float: left !important;">Ticket Category</span> &nbsp;
                </b-col>
              </b-row>
            </div>
            <div class="card__body">
              <div class="card__body__menu">
                <font-awesome-icon style="color: rgb(74, 147, 179);" icon="ticket-alt" size="6x" />
                <br />
                <br />
                <span style="width: 75%">Master Ticket Category</span>
              </div>
            </div>
          </div>
        </b-col>
        <b-col md="4" @click="onFieldClerkClick">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col>
                  <span style="float: left !important;">Field Clerk</span> &nbsp;
                </b-col>
              </b-row>
            </div>
            <div class="card__body">
              <div class="card__body__menu">
                <font-awesome-icon style="color: rgb(74, 147, 179);" icon="check-circle" size="6x" />
                <br />
                <br />
                <span style="width: 75%">Field Clerk</span>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row class="dashboardBody">
        <b-col md="4" @click="onGPSVendorClick">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col>
                  <span style="float: left !important;">GPS Vendor</span> &nbsp;
                </b-col>
              </b-row>
            </div>
            <div class="card__body">
              <div class="card__body__menu">
                <font-awesome-icon style="color: rgb(74, 147, 179);" icon="map-marker-alt" size="6x" />
                <br />
                <br />
                <span style="width: 75%">GPS Vendor</span>
              </div>
            </div>
          </div>
        </b-col>
        <b-col md="4" @click="onCommodityClick">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col>
                  <span style="float: left !important;">Commodity</span> &nbsp;
                </b-col>
              </b-row>
            </div>
            <div class="card__body">
              <div class="card__body__menu">
                <font-awesome-icon style="color: rgb(74, 147, 179);" icon="box" size="6x" />
                <br />
                <br />
                <span style="width: 75%">Master Commodity</span>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {
    onFleetMasterClick() {
      this.$router.push({ name: "OP_FleetMaster" });
    },
    onDriverManagementClick() {
      this.$router.push({ name: "OP_DriverManagement" });
    },
    onVehicleBrandClick() {
      this.$router.push({ name: "OP_FleetBrand" });
    },
    onVehicleTypeClick() {
      this.$router.push({ name: "OP_FleetType" });
    },
    onVehicleCaroseryClick() {
      this.$router.push({ name: "OP_FleetCarosery" });
    },
    onMaintenanceTypeClick() {
      this.$router.push({ name: "OP_MaintenanceType" });
    },
    onMaintenanceItemClick() {
      this.$router.push({ name: "OP_MaintenanceItem" });
    },
    onTicketCategoryClick() {
      this.$router.push({ name: "OP_TicketCategory" });
    },
    onFieldClerkClick() {
      this.$router.push({ name: "OP_FieldClerk" });
    },
    onGPSVendorClick() {
      this.$router.push({ name: "OP_VendorGps" });
    },
    onCommodityClick() {
      this.$router.push({ name: "OP_Commodity" });
    },
  },
  mounted() {},
};
</script>