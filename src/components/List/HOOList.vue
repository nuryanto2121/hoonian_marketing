<template>
  <div :class="'card' + (noCard ? ' noCard' : '')">
    <div :class="removeCardTitle? '': 'card__title' + (noCard ? ' noBorder-1' : '')" :style="noCard ? 'padding-left: unset !important; padding-right: unset !important;': ''">
      <b-row>
        <slot name="TitleTable"></slot>
        <b-col v-show="!hasSlot(`TitleTable`)" lg="3" style="max-width: fit-content !important" :style="noCard ? 'padding-left: unset !important;': ''">
          <span :style="noCard ? 'color: #4A93B3;': ''" :class="isPoppins ? 'font-poppins': ''">{{ title }}</span>
        </b-col>
        <slot name="ToolbarTable"></slot>
        <b-col
          v-if="!SearchDisabled"
          style="text-align: right"
          :md="hasSlot(`ToolbarTable`) ? '3' : ''"
          :offset="hasSlot(`ToolbarTable`) ? '' : '3'"
          :offset-xl="hasSlot(`ToolbarTable`) ? '' : '7'"
        >
          <template>
            <span>
              <b-form-input
                id="txtSearch"
                v-model="search"
                type="text"
                placeholder="Search...."
                v-shortkey.focus="['f1']"
                class="text-field-search"
                @keyup.enter.native="onSearchEnter"
                autocomplete="off"
                :disabled="isSearchDisable"
                style="width: 100% !important"
              ></b-form-input>
              <span
                style="position: absolute; right: 12px; cursor: pointer"
                @click="removeSearch"
                >&times;</span
              >
            </span>
          </template>
        </b-col>
        <b-col v-if="!SearchDisabled" lg="3" style="max-width: fit-content !important" class="col-right">
          <span>
            <ABSButton
              :text="'Search'"
              classButton="button button--back"
              classIcon="icon-style-1"
              @click="onSearchEnter"
            />
          </span>
          <span
            v-show="
              !(
                !urlAdd ||
                urlAdd == '' ||
                urlAdd == undefined ||
                urlAdd == null
              )
            "
          >
            <ABSButton
              :text="
                !ButtonAddText ||
                ButtonAddText == '' ||
                ButtonAddText == undefined ||
                ButtonAddText == null
                  ? 'Add'
                  : ButtonAddText
              "
              classButton="button button--back"
              classIcon="icon-style-1"
              :disabled="
                ButtonAddDisabled ||
                (ButtonStatus == null ? false : !ButtonStatus.btnAdd)
              "
              @click="onAddNewClick"
            />
          </span>

          <span v-if="!ButtonBackDisabled">
            <ABSButton
              :text="'Back'"
              classButton="button button--back"
              classIcon="icon-style-1"
              @click="$router.go(-1)"
            />
          </span>
        </b-col>
      </b-row>
    </div>
    <div class="card__body" :style="noCard ? 
        (removePaddingTopBody ? 'padding-top: unset !important; padding-left: unset !important; padding-right: unset !important;': 'padding-left: unset !important; padding-right: unset !important;')
        : ''">
      <slot name="HeaderTable"></slot>
      <div class="table--list" :id="tableId">
        <b-table
          :responsive="true"
          :striped="true"
          :bordered="false"
          :outlined="false"
          :small="false"
          :hover="true"
          :dark="false"
          :fixed="false"
          :foot-clone="false"
          :fields="fieldHeader"
          :items="items"
          @head-clicked="headClicked"
          @row-clicked="rowClicked"
          @row-dblclicked="rowDblClicked"
          :class="'table-sm table-style-3 ' + (cClass ? cClass : '')"
        >
          <template v-slot:[`cell(${l.key})`]="data" v-for="l in fieldHeader">
            <template v-if="l.key == 'row_id'">
              <template v-if="WithRowId">
                <slot :name="`${l.key}`" :item="data.item"></slot>

                <span v-show="!hasSlot(`${l.key}`)">
                  {{ data.item[`${l.key}`] }}
                </span>
              </template>
              <template v-else>
                <ABSButton
                  v-show="
                    (ButtonStatus == null ? false : ButtonStatus.btnView) ||
                    WithViewButton
                  "
                  :text="'View'"
                  classButton="btn btn--default"
                  classIcon="icon-style-1"
                  @click="viewClicked(data.item, data.index)"
                />
                <ABSButton
                  v-show="
                    (ButtonStatus == null ? false : ButtonStatus.btnDelete) ||
                    WithDeleteButton
                  "
                  :icon="'trash'"
                  classButton="button button--delete"
                  classIcon="icon-style-1"
                  @click="deleteClicked(data.item, data.index)"
                />
              </template>
              <!-- <b-button
                  v-if="WithViewButton == true"
                  size="sm"
                  @click.stop="viewClicked(data.item, data.index)"
                  :disabled="false"
                  class="btn btn--default"
                >
                  View
                </b-button> -->
              <!-- <b-button
                  v-if="WithDeleteButton == true"
                  size="sm"
                  @click.stop="deleteClicked(data.item, data.index)"
                  :disabled="false"
                  class="btn btn--danger"
                >
                  <font-awesome-icon icon="icon" class="classIcon" style="styleIcon"/>
                </b-button> -->
              <!-- <span v-if="WithViewButton == false && WithDeleteButton == false">{{data.item.row_id}}</span> -->
            </template>
            <!-- <template v-else-if="l.key == 'row_id' && WithRowId">
                
              </template> -->
            <template v-else>
              <slot :name="`${l.key}`" :item="data.item"></slot>

              <span v-show="!hasSlot(`${l.key}`)">
                {{ data.item[`${l.key}`] }}
              </span>
            </template>
          </template>
          <template v-slot:[`head(${l.key})`]="data" v-for="l in fieldHeader">
            <span v-if="l.isCustom">
              <!-- {{l.label}} -->
              <slot :name="`head_${l.key}`" :item="data.item" :index="data.index"></slot>
            </span>
          </template>
        </b-table>
      </div>
    </div>
    <div v-show="!noPaging" :class="'card__footer'  + (noCard ? ' noBorder-2' : '')" :style="noCard ? 'padding-left: unset !important; padding-right: unset !important;': ''">
      <b-form inline style="float: left; color: #333" :class="isPoppins ? 'font-poppins': ''">
        <label
          class="font-lbl"
          :class="isPoppins ? 'font-poppins': ''"
          style="margin-bottom: 0px !important; margin-right: 0px !important"
          >Page Size</label
        >
        <b-form-select
          id="cmbPerPage"
          v-model="perPage"
          v-on:input="doGetList(search, 'pageSize')"
          :options="pagingData"
          class="sm-3 mgn-left-10 font-lbl page-size-left"
          :class="isPoppins ? 'font-poppins': ''"
          :disabled="isDisableTable"
        ></b-form-select>
        of {{ this.totalRows }} Records
      </b-form>

      <b-pagination
        align="right"
        v-model="currentPage"
        @input="doGetList(search, 'pagination')"
        :total-rows="totalRows"
        :per-page="perPage"
        :limit="limit"
        style="margin-bottom: 0px"
        :class="isPoppins ? 'font-poppins': ''"
        :disabled="isDisableTable"
      ></b-pagination>
    </div>
    <!-- Start Modal -->
    <b-modal
      id="modalExport"
      :hide-footer="true"
      :hide-header-close="true"
      size="md"
      ref="modalExport"
      class="modal-customize-abs"
    >
      <b-row>
        <b-col sm="12">
          <div class="modal-customize-abs__modal-header">
            <div class="modal-customize-abs__modal-header--title">
              Export {{ title }} to Excel
            </div>
            <div
              class="modal-customize-abs__modal-header--icon"
              @click="$refs.modalExport.hide()"
            >
              <i class="icon-close"></i>
            </div>
          </div>
          <div class="modal-customize-abs__modal-body">
            <p>Select data that will be exported</p>
            <div class="box-category">
              <div
                class="box-category__list-category-export"
                @click="doExportXLS('S')"
              >
                <img :src="require('@/assets/export-select.png')" alt />
                Export Selected Data
              </div>
              <div
                class="box-category__list-category-export category-all"
                @click="doExportXLS('A')"
              >
                <img :src="require('@/assets/export-all.png')" alt />
                Export All
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-modal>

    <b-modal
      id="modalExportPdf"
      :hide-footer="true"
      :hide-header-close="true"
      size="md"
      ref="modalExportPdf"
      class="modal-customize-abs"
    >
      <b-row>
        <b-col sm="12">
          <div class="modal-customize-abs__modal-header">
            <div class="modal-customize-abs__modal-header--title">
              Export {{ title }} to PDF
            </div>
            <div
              class="modal-customize-abs__modal-header--icon"
              @click="$refs.modalExportPdf.hide()"
            >
              <i class="icon-close"></i>
            </div>
          </div>
          <div class="modal-customize-abs__modal-body">
            <p>Select data that will be exported</p>
            <div class="box-category">
              <div
                class="box-category__list-category-export"
                @click="doExportPDF('S')"
              >
                <img :src="require('@/assets/export-select.png')" alt />
                Export Selected Data
              </div>
              <div
                class="box-category__list-category-export category-all"
                @click="doExportPDF('A')"
              >
                <img :src="require('@/assets/export-all.png')" alt />
                Export All
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-modal>

    <b-modal
      id="modalExportCsv"
      :hide-footer="true"
      :hide-header-close="true"
      size="md"
      ref="modalExportCsv"
      class="modal-customize-abs"
    >
      <b-row>
        <b-col sm="12">
          <div class="modal-customize-abs__modal-header">
            <div class="modal-customize-abs__modal-header--title">
              Export {{ title }} to CSV
            </div>
            <div
              class="modal-customize-abs__modal-header--icon"
              @click="$refs.modalExportCsv.hide()"
            >
              <i class="icon-close"></i>
            </div>
          </div>
          <div class="modal-customize-abs__modal-body">
            <p>Select data that will be exported</p>
            <div class="box-category">
              <div
                class="box-category__list-category-export"
                @click="doExportCSV('S')"
              >
                <img :src="require('@/assets/export-select.png')" alt />
                Export Selected Data
              </div>
              <div
                class="box-category__list-category-export category-all"
                @click="doExportCSV('A')"
              >
                <img :src="require('@/assets/export-all.png')" alt />
                Export All
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-modal>

    <b-modal
      id="modalColumn"
      :hide-footer="true"
      :hide-header-close="true"
      size="lg"
      ref="modalColumn"
      class="modal-customize-abs"
    >
      <b-container class="bv-example-row">
        <b-row>
          <b-col sm="12">
            <div class="modal-customize-abs__modal-header">
              <div class="modal-customize-abs__modal-header--title">
                Edit Column
              </div>
              <div
                class="modal-customize-abs__modal-header--icon"
                @click="$refs.modalColumn.hide()"
              >
                <i class="icon-close"></i>
              </div>
            </div>
            <div class="modal-customize-abs__modal-body">
              <b-row>
                <b-col sm="5">
                  <div>
                    <div class="divCustom">
                      <b>Available Columns</b>
                      <br />
                      <span>Select column below to display in your grid</span>
                    </div>
                    <br />
                    <div v-if="availableColumn.length > 0">
                      <ABSMultiSelect
                        v-model="availableColumnSelected"
                        :options="availableColumn"
                        size="10"
                        class="selectCustom"
                      />
                    </div>

                    <div v-else>
                      <b>No Additional Properties</b>
                    </div>
                  </div>
                </b-col>
                <b-col sm="2">
                  <div class="arrow-move">
                    <b-button @click="M_moveRight" size="sm" variant="primary">
                      <font-awesome-icon
                        icon="angle-double-right"
                        class="icon-style-5"
                      />
                    </b-button>
                  </div>
                </b-col>
                <b-col sm="5">
                  <div>
                    <div class="divCustom">
                      <b>Selected Column</b>
                      <br />
                      <span
                        >Drag the column names below to reorder how they will
                        appear above your grid</span
                      >
                    </div>
                    <br />
                    <draggable
                      v-if="selectedColumn.length > 0"
                      v-model="selectedColumn"
                      @start="drag = true"
                      @end="drag = false"
                      class="drag-area"
                    >
                      <div
                        v-for="element in selectedColumn"
                        :key="element.value"
                        class="draggable"
                      >
                        {{ element.key }}
                        <span>
                          <span
                            class="btn-remove"
                            style="margin-top: 0px; float: right"
                            @click="M_moveLeft(element.value)"
                          >
                            <font-awesome-icon icon="trash" />&nbsp;Delete
                          </span>
                        </span>
                      </div>
                    </draggable>

                    <div v-else>
                      <b>No Column Selected</b>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <br />
              <b-row>
                <b-col cols="12">
                  <b-button
                    size="sm"
                    block
                    variant="success"
                    @click="modalColumnHandleOk"
                    >Ok</b-button
                  >
                </b-col>
              </b-row>
              <br />
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>

    <b-modal
      id="modalFilter"
      :hide-footer="true"
      :hide-header-close="true"
      size="md"
      ref="modalFilter"
      class="modal-customize-abs"
    >
      <b-container class="bv-example-row">
        <b-row>
          <b-col sm="12">
            <div class="modal-customize-abs__modal-header">
              <div class="modal-customize-abs__modal-header--title">
                Filter Builder
              </div>
              <div
                class="modal-customize-abs__modal-header--icon"
                @click="$refs.modalFilter.hide()"
              >
                <i class="icon-close"></i>
              </div>
            </div>
            <div class="modal-customize-abs__modal-body">
              <div class="list-filter">
                <b-row v-for="(data, index) in filteredColumn" :key="index">
                  <b-col sm="4">
                    <b-form-select
                      v-model="data.columnName"
                      :options="selectedColumn"
                      class="sm-3 font-lbl"
                      size="sm"
                    />
                  </b-col>
                  <b-col sm="3">
                    <b-form-select
                      v-model="data.signFilter"
                      :options="signFilter"
                      class="sm-3 font-lbl"
                      size="sm"
                    />
                  </b-col>
                  <b-col sm="4">
                    <b-form-input
                      v-if="
                        signFilter[
                          signFilter
                            .map((x) => {
                              return x.value;
                            })
                            .indexOf(data.signFilter)
                        ].type == 'text'
                      "
                      v-model="data.value"
                      type="text"
                      placeholder="Enter a value"
                      size="sm"
                      class="sm-3 font-lbl"
                    />
                  </b-col>
                  <b-col sm="1">
                    <div
                      class="icon-close-filter"
                      @click="M_RemoveFilter(index)"
                    >
                      <i class="icon-trash"></i>
                    </div>
                  </b-col>
                </b-row>
              </div>
              <hr />
              <b-row align-h="between">
                <b-col cols="3">
                  <b-button
                    @click="doAddFilter"
                    block
                    size="sm"
                    variant="outline-primary"
                    >Add</b-button
                  >
                </b-col>
                <b-col cols="3">
                  <b-button
                    size="sm"
                    block
                    variant="outline-success"
                    @click="modalFilterHandleOk"
                    >Ok</b-button
                  >
                </b-col>
              </b-row>
              <br />
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
    <iframe
      name="print_frame"
      width="0"
      height="0"
      frameborder="0"
      src="about:blank"
    ></iframe>
    <!-- <ABSLoader /> -->
  </div>
</template>

<script>
export default {
  props: {
    prop: {
      url: String,
      initialWhere: String,
      SortField: String,
      SortBy: String,
      ParamWhere: String,
      param: Object,
    },
    title: String,
    isProcess: Boolean,
    isCheckDisable: String,
    isCheckAsStatus: String,
    statusFalse: String,
    hideCheckboxAndGear: Boolean,
    hideCheckbox: Boolean,
    cShowNumber: Boolean,
    urlAdd: String,
    ButtonAddText: String,
    ButtonAddDisabled: Boolean,
    ButtonBackDisabled: Boolean,
    SearchDisabled: Boolean,
    WithViewButton: Boolean,
    WithDeleteButton: Boolean,
    WithRowId: Boolean,
    cClass: String,
    ActionLabel: String,
    cStatic: Boolean,
    cHeader: Array,
    cData: Array,
    noPaging: Boolean,
    noCard: Boolean,
    isPoppins: Boolean,
    isHeaderFixed: Boolean,
    removeCardTitle: Boolean,
    removePaddingTopBody: Boolean,
  },
  data() {
    return {
      isFirst: false,
      selected: false,
      rowSelected: [],
      dataSelected: [],
      rowSel: -1,

      search: "",
      isSearchDisable: false,
      fieldHeader: [],
      items: [],
      firstSort: true,
      sort: "",

      totalRows: 0,
      currentPage: 1,
      lastPage: 1,
      perPage: 8,
      limit: 2,
      pagingData: [
        { value: 8, text: "8" },
        { value: 20, text: "20" },
        { value: 50, text: "50" },
        { value: 100, text: "100" },
        { value: 500, text: "500" },
        { value: 1000, text: "1000" },
      ],

      fileName: "TestExport",
      ExportToken: "",

      availableColumn: [],
      availableColumnTemp: [],
      availableColumnSelected: null,
      selectedColumn: [],
      selectedColumnTemp: [],
      selectedColumnSelected: [],

      sortedField: [{ field: "time_edit", sort: "DESC" }],

      filteredColumnTemp: [],
      filteredColumn: [],
      signFilter: [
        { value: "=", text: "Equals", type: "text" },
        { value: "<>", text: "Does Not Equal", type: "text" },
        { value: "<", text: "Is Less Than", type: "text" },
        { value: ">", text: "Is Greater Than", type: "text" },
        { value: "<=", text: "Is Less Than Or Equal To", type: "text" },
        { value: ">=", text: "Is Greater Than Or Equal To", type: "text" },
        { value: "null", text: "Is Empty", type: "none" },
        { value: "notnull", text: "Is Not Empty", type: "none" },
        { value: "like", text: "Contains Of", type: "text" },
        // {value: 'between', key: 'Is Between'},
        { value: "in", text: "Is Any Of", type: "text" },
        { value: "notin", text: "Is None Of", type: "text" },
      ],

      dataState: {
        // PageLevel: '1',
        TabIndex: "1",
      },
      tempAdvanceFilter: "",
      allColumn_bf: [],
    };
  },
  computed: {
    isDisableTable() {
      return false;
    },
    tableId() {
      return "AccList-" + Math.floor(Math.random() * 10);
    },
    ButtonStatus() {
      return this.$store.getters.getButtonStatus;
    },
  },
  watch: {
    cData(newData, oldData) {
      // console.log(newData)
      this.items = newData
    }
  },
  methods: {
    removeSearch() {
      this.search = "";
      this.onSearchEnter("");
    },
    hasSlot(key) {
      return !!this.$scopedSlots[key];
    },
    openModalExport() {
      // this.$store.commit("setLevel", this.prop.PageLevel);
      // this.$store.commit("setTab", this.prop.TabIndex);
      this.$refs.modalExport.show();
    },
    openModalExportPdf() {
      // this.$store.commit("setLevel", this.prop.PageLevel);
      // this.$store.commit("setTab", this.prop.TabIndex);
      this.$refs.modalExportPdf.show();
    },
    openModalExportCsv() {
      // this.$store.commit("setLevel", this.prop.PageLevel);
      // this.$store.commit("setTab", this.prop.TabIndex);
      this.$refs.modalExportCsv.show();
    },
    openModalColumn() {
      // this.$store.commit("setLevel", this.prop.PageLevel);
      // this.$store.commit("setTab", this.prop.TabIndex);
      // this.availableColumnTemp = this.availableColumnStatic
      // this.selectedColumnTemp = this.selectedColumnStatic

      // this.availableColumn = this.availableColumnStatic
      // this.selectedColumn = this.selectedColumnStatic

      this.doGetList("", "refresh_column");
      this.$refs.modalColumn.show();
    },
    openModalFilter() {
      // this.$store.commit("setLevel", this.prop.PageLevel);
      // this.$store.commit("setTab", this.prop.TabIndex);
      this.$refs.modalFilter.show();
    },
    doExportXLS(param) {
      if (param == "A") {
        var url = this.getFileExcel(this.title, 1, this.ExportToken);
        window.location.href = url;
        this.$refs.modalExport.hide();
      } else {
        if (this.rowSelected.length > 0) {
          var data = "";
          this.rowSelected.forEach((idx) => {
            data += this.items[idx].row_id + ",";
          });

          data = data.slice(0, -1);

          this.M_ExportXLS(1, data);
        } else {
          this.alertWarning("No Data Selected To Export");
        }
      }
    },
    doExportPDF(param) {
      if (param == "A") {
        var url = this.getFileExcel(this.title, 2, this.ExportToken);
        window.location.href = url;
        this.$refs.modalExportPdf.hide();
      } else {
        if (this.rowSelected.length > 0) {
          var data = "";
          this.rowSelected.forEach((idx) => {
            data += this.items[idx].row_id + ",";
          });

          data = data.slice(0, -1);

          this.M_ExportXLS(2, data);
        } else {
          this.alertWarning("No Data Selected To Export");
        }
      }
    },
    doExportCSV(param) {
      if (param == "A") {
        var url = this.getFileExcel(this.title, 3, this.ExportToken);
        window.location.href = url;
        this.$refs.modalExportCsv.hide();
      } else {
        if (this.rowSelected.length > 0) {
          var data = "";
          this.rowSelected.forEach((idx) => {
            data += this.items[idx].row_id + ",";
          });

          data = data.slice(0, -1);

          this.M_ExportXLS(3, data);
        } else {
          this.alertWarning("No Data Selected To Export");
        }
      }
    },
    M_ExportXLS(type = 1, data) {
      var param = {
        Token: this.ExportToken,
        Data: data,
      };

      this.postJSON(this.getUrlGetTokenExport(), param).then((response) => {
        if (response == null) return;

        var url = this.getFileExcel(this.title, type, response.Data.Token);
        window.location.href = url;
        this.$refs.modalExport.hide();
      });
    },
    PrintTable() {
      // var divToPrint=document.getElementById("printTable");
      // newWin= window.open("");
      // newWin.document.write(divToPrint.outerHTML);
      // newWin.print();
      window.frames[
        "print_frame"
      ].document.body.innerHTML = document.getElementById(
        this.tableId
      ).innerHTML;
      window.frames["print_frame"].window.focus();
      window.frames["print_frame"].window.print();
    },
    resetSelected() {
      this.rowSelected = [0];
      this.selected = false;
      // this.items[0]["_rowVariant"] = "primary";
      this.rowSel = -1;
    },
    checkSortField() {
      if (this.prop.SortField == undefined) {
      } else if (this.prop.SortField == "") {
      } else if (this.prop.SortField != undefined) {
        this.sort = this.prop.SortField;
      }
    },
    onSearchEnter(data) {
      // console.log(data);
      this.doGetList(this.search, "onSearchEnter");
    },
    onAddNewClick() {
      this.$emit("onAdd");
      var url = this.urlAdd;
      if (!url || url == "" || url == undefined || url == "_") return;
      var param = {
        // option_url: this.getOptionUrl(),
        // title: this.title,
        isEdit: false,
        isView: false,
      };
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: url });
    },
    doAddFilter() {
      var dataColumn = this.selectedColumn;
      this.filteredColumn.push({
        columnName: dataColumn[0].value,
        signFilter: "=",
        value: "",
      });
    },
    M_RemoveFilter(idx) {
      this.filteredColumn.splice(idx, 1);
      this.$forceUpdate();
    },
    modalFilterHandleOk() {
      var col = this.selectedColumn;
      var filterString = "";

      this.filteredColumn.forEach((filter, index) => {
        var i = col
          .map((value) => {
            return value.value;
          })
          .indexOf(filter.columnName);
        var theFilter = "";
        var sign = filter.signFilter;
        if (sign == "in" || sign == "notin") {
          var val = filter.value.split(",");
          var xVal = "";
          val.forEach((v) => {
            xVal += "'" + v + "',";
          });

          xVal = xVal.substr(0, xVal.length - 1);

          if (sign == "in") {
            theFilter = "in (" + xVal + ")";
          } else {
            theFilter = "not in (" + xVal + ")";
          }
        } else if (sign == "like") {
          theFilter += "like '%" + filter.value + "%'";
        } else if (sign == "null") {
          theFilter += " is null ";
        } else if (sign == "notnull") {
          theFilter += " is not null ";
        } else {
          theFilter += filter.signFilter + " '" + filter.value + "'";
        }
        filterString += this.selectedColumn[i].key + " " + theFilter + " AND ";
      });
      filterString = filterString.substr(0, filterString.length - 4);
      this.tempAdvanceFilter = filterString;
      this.doGetList("", "refresh_filter");
      this.$refs.modalFilter.hide();
    },
    modalColumnHandleOk() {
      var field = "";

      this.selectedColumn.forEach((el, index) => {
        if (index == this.selectedColumn.length - 1) {
          field += el.key;
        } else {
          field += el.key + ",";
        }
      });

      var param = {
        OptionSeq: this.getOptionSeq().OptionSeq,
        user_id: this.getDataUser().user_id,
        subportfolio_cd: this.getDataUser().subportfolio_cd,
        column_field: field,
        user_input: this.getDataUser().user_id,
        LineNo: this.prop.LineNo,
      };

      this.postJSON(this.getUrlDefineColumn(), param).then((response) => {
        // response from API
        if (response == null) return;

        this.responses = response;

        this.fieldHeader = [];
        // this.fieldHeader.push({
        //   value: 0,
        //   key: "chkBoxAction"
        // });

        this.selectedColumn.forEach((ar) => {
          var thClass = "ABSthClassList";
          var isSorted = this.sortedField.map((x) => x.field).indexOf(ar.key);
          if (isSorted > -1) {
            if (this.sortedField[isSorted].sort == "ASC") {
              thClass = thClass + " AscSorted";
            } else {
              thClass = thClass + " DescSorted";
            }
          }

          this.fieldHeader.push({
            value: ar.value,
            key: ar.key,
            thClass: thClass,
            tdClass: "ABStdClassList notranslate",
            value: ar.key,
          });
        });

        this.doGetList("", "refresh_column");
        this.$refs.modalColumn.hide();
      });
    },
    M_moveRight() {
      if (
        this.availableColumnSelected &&
        this.availableColumnSelected.length > 0
      ) {
        var arr = this.availableColumn;
        var x = 0;
        this.availableColumnTemp.forEach((dt, idx) => {
          if (dt.value == this.availableColumnSelected[x]) {
            arr = arr.filter(function (arr, index) {
              return arr.value != dt.value;
            });

            this.selectedColumn.push({
              value: dt.value,
              key: dt.key,
              text: dt.key,
            });

            x += 1;
          }

          if (x == this.availableColumnSelected.length) {
            this.availableColumn = arr;
            this.selectedColumnTemp = this.selectedColumn;
            this.availableColumnTemp = this.availableColumn;
          }
        });
      }
    },
    M_moveLeft(selected) {
      if (this.selectedColumn.length == 1) {
        this.alertWarning("Selected Column Should Have At Least One Column");
        return;
      }

      this.selectedColumnSelected = [selected];
      var arr = this.selectedColumn;
      var x = 0;
      this.selectedColumnTemp.forEach((dt, idx) => {
        if (dt.value == this.selectedColumnSelected[x]) {
          arr = arr.filter(function (arr, index) {
            return arr.value != dt.value;
          });

          this.availableColumn.push({
            value: dt.value,
            key: dt.key,
            text: dt.key,
          });

          x += 1;
        }

        if (x == this.selectedColumnSelected.length) {
          this.selectedColumn = arr;
        }
      });
    },
    headClicked: function (field, index) {
      if (field.toUpperCase() == "NO") {
        return;
      }

      if (field.toUpperCase() == "TIME_EDIT") {
        this.firstSort = false;
      } else {
        if (this.firstSort == true) {
          var b = this.sortedField
            .map((e) => e.field.toUpperCase())
            .indexOf("TIME_EDIT");
          if (b > -1) {
            this.sortedField.splice(b, 1);
          }
        }
      }

      if (this.isDisableTable) return;
      var dtSort = this.sortedField;
      this.sort = "";
      var x = dtSort
        .map((e) => {
          return e.field;
        })
        .indexOf(field);

      if (x > -1) {
        if (this.sortedField[x].sort == "ASC") {
          this.sortedField[x].sort = "DESC";
        } else {
          // this.sortedField[x].sort = "ASC"
          this.sortedField.splice(x, 1);
        }
      } else {
        this.sortedField.push({ field: field, sort: "ASC" });
      }

      if (this.sortedField.length > 0) {
        this.sortedField.forEach((el) => {
          if (!(this.firstSort && el.field.toUpperCase() == "TIME_EDIT")) {
            this.sort += el.field + " " + el.sort + ",";
          }

          // this.sort += el.field + " " + el.sort + ","
        });

        this.sort = this.sort.substr(0, this.sort.length - 1);
      } else {
        for (var i = 0; i < this.allColumn_bf.length; i++) {
          if (this.allColumn_bf[i].toLowerCase() == "time_edit") {
            this.sort = "time_edit DESC";
          }
        }
      }

      // this.doGetList(this.$store.getters.getSearch, "headTable")
      this.doGetList(this.search, "headTable");
      this.resetSelected();
      this.$emit("headClicked");
    },
    rowClicked: function (record, index) {
      if (this.isDisableTable || this.isProcess == true) return;
      // if (this.rowSel != -1) {
      //   this.items[this.rowSel]["_rowVariant"] = "";
      // }

      this.rowSel = index;
      // this.items[index]["_rowVariant"] = "primary";
      this.$forceUpdate();

      this.$emit("rowClicked", record, index);
    },
    rowDblClicked: function (record, index) {
      if (this.isDisableTable) return;
      this.$emit("rowDblClicked", record, index);
    },
    viewClicked: function (record, index) {
      // alert("test");
      // this.$store.commit("setStatusLoader", true);
      if (this.isDisableTable) return;
      this.$emit("buttonViewClicked", record, index);
    },
    deleteClicked: function (record, index) {
      // alert("test");
      // this.$store.commit("setStatusLoader", true);
      if (this.isDisableTable) return;
      this.$emit("buttonDeleteClicked", record, index);
    },
    doGetList: async function (searchh, method) {
      if (this.cStatic == true) return

      await this.GetButtonStatus(
        this.getDataUser().portfolio_id,
        this.getDataUser().group_id,
        this.getDataUser().user_id,
        this.getOptionUrl()
      );
      this.checkSortField();
      // if (this.getIsCallBack()) {
      // } else if (this.getIsPopup() && method == 'eb_getList') {
      //     return
      // }
      let search = this.search;
      if (this.prop.ParamWhere != undefined) {
        search = search == "" ? this.prop.ParamWhere : search;
      }

      var data = {
        Event: method,
      };

      // this.$store.commit("setEventStatus", method);
      // jika advance filter kosong '' maka kasih initial where aja
      // selainnya berarti inital where + advance filter

      // var temp =
      //     this.tempAdvanceFilter == ""
      //     ? this.prop.initialWhere
      //     : this.prop.initialWhere == "" ? this.prop.initialWhere + this.tempAdvanceFilter : this.prop.initialWhere + " AND " + this.tempAdvanceFilter;
      var temp = this.prop.initialWhere;

      if (method != undefined) {
        if (method == "save" || method == "update" || method == "refresh") {
          temp = this.prop.initialWhere;
          this.sortedField = [];
          if (this.prop.SortField && this.prop.SortField != "") {
            this.sort = this.prop.SortField;
          } else {
            this.sort = "time_edit DESC";
            this.sortedField.push({ field: "time_edit", sort: "DESC" });
            this.firstSort = true;
          }
          this.perPage = 8;
          this.currentPage = 1;
        } else if (method == "pageSize" || method == "ONSEARCHENTER") {
          this.currentPage = 1;
        }
      }

      // if (this.formType == "Inquiry") {
      //   this.sort = ""
      // }

      let param = {
        // option_url: "",
        // line_no: "",
        user_id: this.getDataUser().user_id,
        portfolio_id: this.getDataUser().portfolio_id,
        project_id: this.getDataUser().project_id,
        subportfolio_id: this.getDataUser().subportfolio_id,
        current_page: this.currentPage,
        per_page: this.perPage,
        param_where: search,
        initial_where: temp,
        sort_field: this.sort,
        sort_by: "",
        // source_field: "",
        // param_view: ""
        ...this.prop.param,
      };

      this.postJSON(this.urlHoonian + this.prop.url, param).then((response) => {
        // this.loader = false;
        if (response == null) return;

        this.selected = false;

        this.rowSelected = [];

        this.rowSel = 0;

        this.responses = response;

        this.ExportToken = this.responses.ExportToken;

        if (this.responses.data.length > 0) {
        }
        this.items = [];
        this.fieldHeader = [];

        if (this.cHeader && this.cHeader !== undefined && this.cHeader.length > 0) {
          this.fieldHeader = this.cHeader;
        }

        this.items = this.responses.data;
        this.$emit("onRenderData", this.responses.data);

        var str_array =
          this.responses.DefineColumn && this.responses.DefineColumn !== ""
            ? this.responses.DefineColumn.replace(/\s/g, "").split(",")
            : this.responses.AllColumn.replace(/\s/g, "").split(",");
        let defineSize = this.responses.DefineSize.replace(/\s/g, "").split(
          ","
        );
        if (this.isHeaderFixed) {
          defineSize = defineSize.join(',').replaceAll('S', 'X').replaceAll('M', 'X').replaceAll('L', 'X').split(",");
        }
        this.allColumn_bf = this.responses.AllColumn.replace(/\s/g, "").split(
          ","
        );

        var index = this.allColumn_bf.indexOf("lastupdatestamp");
        if (index > -1) {
          this.allColumn_bf.splice(index, 1);
        }
        var allColumn = [];
        var filteredColumn = [];
        var definedColumn = [];

        this.allColumn_bf.forEach((val, idx) => {
          var thClass = this.isPoppins? "HeaderACCList2Poppins": "HeaderACCList2";
          var isSorted = this.sortedField.map((x) => x.field).indexOf(val);
          if (isSorted > -1) {
            if (this.sortedField[isSorted].sort == "ASC") {
              thClass = thClass + " AscSorted";
            } else {
              thClass = thClass + " DescSorted";
            }
          }

          allColumn.push({
            value: idx + 1,
            key: val,
            thClass: thClass,
            tdClass: "ContentACCList2 notranslate",
            text: val,
          });

          filteredColumn.push({
            value: idx + 1,
            key: val,
            thClass: thClass,
            tdClass: "ContentACCList2 notranslate",
          });
        });

        for (var i = 0; i < str_array.length; i++) {
          filteredColumn = filteredColumn.filter((val) => {
            if (val.key == str_array[i]) {
              definedColumn.push({
                value: val.value,
                key: val.key,
                thClass: val.thClass,
                tdClass: val.tdClass,
                text: val.key,
              });
            }

            return val.key != str_array[i];
          });

          var thClass = this.isPoppins? "HeaderACCList2Poppins ": "HeaderACCList2 ";
          var tdClass = this.isPoppins? "ContentACCList2Poppins notranslate": "ContentACCList2 notranslate";
          if (
            str_array[i].toLowerCase().includes("costing") ||
            str_array[i].toLowerCase().includes("selling") ||
            str_array[i].toLowerCase().includes("amount") ||
            str_array[i].toLowerCase().includes("amt") ||
            str_array[i].toLowerCase().includes("rate") ||
            str_array[i].toLowerCase().includes("price")
          ) {
            tdClass = "ABStdClassList2 notranslate";
          }

          if (defineSize[i] == "L") {
            tdClass = "notranslate";
          }

          if (str_array[i] !== "no") {
            thClass += defineSize[i];
          }

          var isSorted = this.sortedField
            .map((x) => x.field)
            .indexOf(str_array[i]);
          if (isSorted > -1) {
            if (this.sortedField[isSorted].sort == "ASC") {
              thClass = thClass + " AscSorted";
            } else {
              thClass = thClass + " DescSorted";
            }
          }

          if (this.languageStatus) {
            this.fieldHeader.push({
              value: i + 1,
              key: str_array[i],
              thClass: thClass,
              tdClass: tdClass,
              label: this.$t(str_array[i]),
            });
          } else {
            if (str_array[i] == "lastupdatestamp") continue;
            if (str_array[i] == "time_edit") continue;

            var listReplace = [
              {
                key: "_",
                value: " ",
              },
              {
                key: "Amt",
                value: " Amount",
              },
              {
                key: "Cd",
                value: " Code",
              },
              {
                key: "Descs",
                value: " Description",
              },
              {
                key: "Time Edit",
                value: "Last Update",
              },
              {
                key: "Batch Status",
                value: "Status",
              },
              {
                key: "garing",
                value: "/",
              },
              {
                key: "titik",
                value: ".",
              },
              {
                key: "Persen",
                value: "%",
              },
              {
                key: "SnP",
                value: "SnP ",
              },
              {
                key: "VO",
                value: "VO ",
              },
              {
                key: "Row Id",
                value:
                  this.ActionLabel && this.ActionLabel !== ""
                    ? this.ActionLabel
                    : "Action",
              },
              {
                key: "Ftl",
                value: "FTL",
              },
              {
                key: "Ltl",
                value: "LTL",
              },
              {
                key: "Bpkb",
                value: "BPKB",
              },
              {
                key: "Stnk",
                value: "STNK",
              },
              {
                key: "Kir",
                value: "KIR",
              },
              {
                key: "Sim",
                value: "SIM",
              },
              {
                key: "Skck",
                value: "SKCK",
              },
              {
                key: "Kgs",
                value: "KGS",
              },
              {
                key: "Cbm",
                value: "CBM",
              },
              {
                key: "Eta",
                value: "ETA",
              },
              {
                key: "Etd",
                value: "ETD",
              },
              {
                key: "Gps",
                value: "GPS",
              },
              {
                key: "From Address",
                value: "From",
              },
              {
                key: "To Address",
                value: "To",
              },
              {
                key: "Solving Time In Hour",
                value: "Solving Time (Hour)",
              },
              {
                key: "Coa",
                value: "COA",
              },
              {
                key: "Vat",
                value: "VAT",
              },
              {
                key: "Vehicle",
                value: "Fleet",
              },
            ];
            var isGotIt = false;
            var labelHeader = undefined;

            // console.log(str_array[i])

            if (str_array[i].includes("_")) {
              labelHeader = str_array[i]
                .toLowerCase()
                .split("_")
                .map((s) => {
                  return s.charAt(0).toUpperCase() + s.substring(1);
                })
                .join(" ");
            } else {
              // if (str_array[i] !== 'lastupdatestamp') {
              labelHeader =
                str_array[i].charAt(0).toUpperCase() +
                str_array[i].substring(1);
              // }
            }

            // for (var data of listReplace) {
            //   if (str_array[i].includes(data.key)) {
            //     isGotIt = true
            //     if (labelHeader == undefined) {
            //       // labelHeader = str_array[i].replace(data.key, data.value)
            //       labelHeader = this.replaceAllString(str_array[i], data.key, data.value)
            //     } else {
            //       // labelHeader = labelHeader.replace(data.key, data.value)
            //       labelHeader = this.replaceAllString(labelHeader, data.key, data.value)
            //     }
            //     // break
            //   }
            // }
            // console.log(labelHeader == 'Row Id', this.WithViewButton)

            for (var data of listReplace) {
              if (labelHeader == undefined) {
                labelHeader = this.replaceAllString(
                  str_array[i],
                  data.key,
                  data.value
                );
              } else {
                if (labelHeader.includes(data.key)) {
                  if (!this.WithRowId) {
                    if (
                      labelHeader == "Row Id" &&
                      !this.WithViewButton &&
                      !this.WithDeleteButton
                    )
                      continue;
                  }
                  // if (labelHeader == 'Row Id' && !this.WithViewButton) {

                  // }
                  // else {
                  labelHeader = this.replaceAllString(
                    labelHeader,
                    data.key,
                    data.value
                  );
                  // }
                }
              }
            }

            // console.log(labelHeader)
            if (labelHeader.includes("Lastupdatestamp")) continue;
            if (labelHeader == "Row Id") continue;
            if (labelHeader == "Pic") {
              labelHeader = "PIC";
            }

            if (!(this.cHeader && this.cHeader !== undefined && this.cHeader.length > 0)) {
              this.fieldHeader.push({
                value: i + 1,
                key: str_array[i],
                thClass: thClass,
                tdClass: tdClass,
                label: labelHeader,
              });
            }

            // if (isGotIt) {
            //   // str_array[i] = 'Last Update'
            //   this.fieldHeader.push({
            //     value: i + 1,
            //     key: str_array[i],
            //     thClass: thClass,
            //     tdClass: tdClass,
            //     label: labelHeader
            //   })
            // } else {
            //   labelHeader = undefined

            //   if (str_array[i].includes('SnP')) {
            //     labelHeader = this.replaceAllString(str_array[i], 'SnP', 'SnP ')
            //   }
            //   else if (str_array[i].includes('VO')) {
            //     labelHeader = this.replaceAllString(str_array[i], 'VO', 'VO ')
            //   }

            //   this.fieldHeader.push({
            //     value: i + 1,
            //     key: str_array[i],
            //     thClass: thClass,
            //     tdClass: tdClass,
            //     label: labelHeader
            //   })
            // }
            // this.fieldHeader.push({
            //   value: i + 1,
            //   key: str_array[i],
            //   thClass: thClass,
            //   tdClass: tdClass
            // });
          }
        }

        this.availableColumn = filteredColumn;
        this.selectedColumn = definedColumn;

        this.availableColumnTemp = filteredColumn;
        this.selectedColumnTemp = definedColumn;

        // this.availableColumnStatic = filteredColumn;
        // this.selectedColumnStatic = definedColumn;

        this.totalRows = this.responses.Total;
        this.lastPage = this.responses.Last_Page;

        if (this.isCheckAsStatus != undefined) {
          var cInt = 0;
          for (var i = 0; i < this.items.length; i++) {
            var d = this.isCheckAsStatus.split("=")[0];
            var dt = this.items[i][d];
            var value = this.isCheckAsStatus.split("=")[1];
            // if (this.isCheckAsStatus.split("=")[1] == "true") {
            //   value = true
            // }
            // else if (this.isCheckAsStatus.split("=")[1] == "false") {
            //   value = false
            // }
            // if (this.items[i]._checked == 'Y') {
            if (dt) {
              if (dt.toString() == value) {
                this.rowSelected.push(i);
                cInt++;
              }
            }

            if (cInt == this.items.length) {
              this.selected = true;
            }
          }
        }
      });

      if (method != undefined) {
        var datax = {
          // pageLevel: this.prop.PageLevel,
          // tabIndex: this.prop.TabIndex
        };
        if (method.toUpperCase() == "REFRESH") {
          this.currentPage = 1;
          // this.getToolbarAbsList().unselectRow(datax);
        } else if (method == "pageSize") {
          this.$emit("pageSize");
          // this.getToolbarAbsList().unselectRow(datax);
        } else if (method == "pagination") {
          this.$emit("pagination");
          // this.getToolbarAbsList().unselectRow(datax);
        } else if (method == "refresh_filter") {
          this.$emit("filter");
          // this.getToolbarAbsList().unselectRow(datax);
        } else if (method == "headTable") {
          this.$emit("headTable");
          // this.getToolbarAbsList().unselectRow(datax);
        } else if (method == "ONSEARCHENTER") {
          // this.getToolbarAbsList().unselectRow(datax);
        } else if (method == "refresh_column") {
          // this.$emit("refreshColumn");
        }
      }
    },
    reRender() {
      this.$forceUpdate();
    },
  },
  mounted() {},
  created() {
    this.cStatic = this.cStatic == undefined || !this.cStatic ? false : this.cStatic

    this.fieldHeader = this.cHeader && this.cHeader !== undefined && this.cHeader.length > 0 ? this.cHeader : [];
    if (this.cStatic == true) {
      this.items = this.cData
    }
  },
};
</script>

<style scoped>
div.draggable {
  cursor: move;
  position: relative;
  display: block;
  padding: 10px 15px;
  /* margin-bottom: -1px; */
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}

span.btn-remove {
  cursor: pointer;
  display: inline-block;
  min-width: 10px;
  padding: 5px 7px;
  font-size: 12px;
  font-weight: bold;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  background-color: #dc3545;
  border-radius: 0;
  float: right;
  margin-top: 5px;
}

div.arrow-move {
  text-align: center;
  /* margin-top: 23%; */
  align-self: center;
  margin: 20px;
}

span.likeLink {
  cursor: pointer;
  text-decoration: none;
  color: #007bff;
}
span.likeLink:hover {
  color: #0056b3;
  text-decoration: underline;
}

.dropbtn {
  background: transparent;
  border: none;
  font-size: 15px !important;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  text-align: left;
  display: none;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  /* transition: all 100s; */
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}
.dropdown:hover .dropdown-content {
  display: block;
}
.dropdown:hover .dropbtn {
  background-color: #d9efff;
}

.dropdown:not(:hover) {
  transition: all 0.1s;
  transition-delay: 5s;
}

.dropdown-content:not(:hover) {
  transition: all 0.1s;
  transition-delay: 5s;
}

.isProcessNeeds {
  color: #000000 !important;
  height: 36px !important;
}

.noCard {
  border: unset !important;
}
.noBorder-1 {
  border-bottom: unset !important;
  padding-left: 5px !important;
}
.noBorder-2 {
  border-top: unset !important;
}
</style>