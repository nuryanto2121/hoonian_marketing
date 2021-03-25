<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col md="12">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col style="max-width: max-content !important;">
                  <span>Port In</span>
                </b-col>
                <b-col style="text-align: right;">
                  <ABSButton
                    :text="'Back'"
                    classButton="button button--back"
                    classIcon="icon-style-1"
                    @click="doBack"
                  />
                </b-col>
              </b-row>
            </div>
            <div class="card__body">
              <b-form :data-vv-scope="'parent'" :data-vv-value-path="'parent'">
                <b-row>
                  <b-col md="2">
                      <img
                        :src="require('@/assets/icons/ms_excel.svg')"
                        alt
                        style="height: 80%; width: 80%;"
                      />
                  </b-col>
                  <b-col>
                    <!-- <b-row class="row-view">
                      <b-col>
                        <ABSButton
                          :text="'Download Template'"
                          classButton="btn"
                          classIcon="icon-style-1"
                          @click="downloadTemplate"
                          styleButton="height:30px; width: 100%;"
                        />
                      </b-col>
                    </b-row> -->
                    <b-row class="row-view">
                      <b-col>
                        <ACCFileExcel
                          :prop="PI_excel"
                          @change="onExcelChange"
                          v-model="M_PortIn.file_name"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-form>
            </div>
          </div>
        </b-col>
      </b-row>
      <div class="card">
        <div class="card__title" style="padding-bottom: 5px !important;">
          <b-row>
            <b-col md="12">
              <span>Port In List Error</span>
            </b-col>
          </b-row>
        </div>
        <div class="card__body">
        <slot name="HeaderTable"></slot>
          <b-row>
            <b-col md="12">
              <b-table
                :striped="true"
                :bordered="false"
                :outlined="false"
                :small="false"
                :hover="true"
                :dark="false"
                :fixed="false"
                :foot-clone="false"
                :responsive="true"
                :fields="fieldHeader"
                :items="items"
                @head-clicked="headClicked"
                @row-clicked="rowClicked"
                @row-dblclicked="rowDblClicked"
                class="table-sm table-style-2"
              >
              </b-table>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      M_PortIn: {
        file_name: "",
        file_path: "",
        // file_show: "",
      },
      PI_excel: {
        cName: "Excel",
        cTitle: "Upload Excel File Port In",
        cModule: "ADM"
      },
      fieldHeader: [
        {
          value: 'row',
          key: 'row',
          thClass: 'ABSthClassList',
          tdClass: "ABStdClassList",
          label: 'Row'
        },
        {
          value: 'message',
          key: 'message',
          thClass: 'ABSthClassList',
          tdClass: "ABStdClassList",
          label: 'Description'
        }
      ],
      items: [],
    };
  },
  computed: {
    paramFromList() {
      var param = this.$route.params;
      if (param == null || param == undefined) {
        this.doBack();
      } else {
        if (Object.keys(param).length < 1) {
          this.doBack();
        } else {
          return param;
        }
      }
    },
  },
  methods: {
    onExcelChange(data) {
      this.items = data;
      console.log(data)
      if (data.length == 0) {
        this.alertSuccess("Data Has Been Successfully Port In").then(() => {
        });
      }
    },
    downloadTemplate() {
      alert("download template still development progress :)");
    },
    rowClicked() {
      
    },
    rowDblClicked() {

    },
  },
  mounted() {
  },
  beforeMount() {},
};
</script>

<style>
</style>