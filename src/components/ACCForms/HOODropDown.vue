<template>
  <span id="ABSSelectAsycn">
    <v-select
      v-show="inputStatus!=='view'"
      label="label"
      :filterable="true"
      :options="options"
      @input="UpdateValue"
      v-model="selected"
      :class="{'abs-custom-select-async': true,'input': true, 'error-text-field': errors.has(prop.cParentForm+'.'+prop.cName)}"
      v-validate="prop.cValidate"
      :style="'font-size:11px !important;' + prop.cStyle"
      v-bind:name="prop.cName"
      :tabindex="prop.cOrder"
      :disabled="inputStatus=='edit' && prop.cKey || prop.cProtect"
      :searchable="prop.cFilter"
      :ref="prop.cName"
      :id="prop.cName"
      :clearable="prop.cClearable"
      @search:focus="onFocus"
      @search="onSearch"
      :multiple="prop.multiple"
    >
      <template slot="no-options">
        <span v-show="prop.cAsync && options.length>0">type at least 3 characters to search...</span>
        <span v-show="options.length<1">no data</span>
        <span v-show="!prop.cAsync && options.length>0">type to search...</span>
      </template>
    </v-select>
    <span
      v-show="errors.has(prop.cParentForm+'.'+prop.cName)"
      class="error-span"
    >{{ errors.first(prop.cParentForm+'.'+prop.cName) }}</span>
    <label
      class="lbl-value-view-form notranslate"
      v-show="inputStatus=='view'"
    >{{selected?(prop.cDisplayWithCode ? selected.id : selected.label):''}}</label>
  </span>
</template>

<script>
export default {
  name: "FormSelect",
  model: {
    event: "change"
  },
  props: {
    prop: {
      dataLookUp: {
        url: String,
        param: Object,
      },
      cValidate: String,
      cName: String,
      cLabel: String,
      cLabelSize: String,
      cOrder: Number,
      cStyle: String,
      cTriggered: Boolean,
      cDefault: String,
      cProtect: Boolean,
      cVisible: Boolean,
      cAsync: Boolean,
      cFilter: Boolean,
      cPageLevel: [Number, String],
      cTabIndex: [Number, String],
      cParentForm: String,
      cStatic: Boolean,
      cOption: Array,
      cMasterUrl: String,
      cDisplayColumn: String,
      cLastLabel: String,
      cInputStatus: String,
      cIsAll: Boolean,
      cDisplayWithCode: Boolean,
      callback: Object,
      cClearable: Boolean,
    },
    value: { type: [String, Number, Object, Array], default: "" },
    label: { type: [String, Number, Object, Array], default: "" },
    noAuth: String,
  },
  data() {
    return {
      options: [],
      tempOptions: [],
      isRequired: false,
      onChangeTriggered: false,
      action: [],
      oid: "",
      isLoadData: false,
      canAsync: false,
      tempInitialWhere: "",
      passingHiddenData: ""
    };
  },
  watch: {
    passingHiddenData: function(newData, oldData) {
      this.value = JSON.parse(newData);
    },
    'prop.cOption': function (newValue, oldValue) {
        this.options = newValue;
     },
  },
  computed: {
    isSetValue() {
      return !this.isLoadData;
    },
    isCanChange() {
      return this.isLoadData && this.options.length > 0;
    },
    inputStatus() {
      this.$validator.pause();
      this.$nextTick(() => {
        this.$validator.errors.clear(this.prop.cParentForm);
        this.$validator.resume();
      });
      if (this.prop.cInputStatus.toLowerCase() == "new") {
        if (!this.prop.cStatic) {
          this.options = [];
        }
      }
      return this.prop.cInputStatus.toLowerCase();
    },
    languageStatus() {
      return this.$store.getters.languageStatus;
    },
    getStatusError() {
      return this.$store.getters.getStatusError;
    },
    selected: {
      get: function(el) {
        if (this.value == "" || this.value == null) {
          return null;
        } else {
          let isArray = Array.isArray(this.value);
          if (this.isCanChange) {
            if (typeof this.value == "object") {
              if (isArray) {
                let i = [];
                for (let x = 0; x < this.options.length; x++) {
                  for (let y = 0; y < this.value.length; y++) {
                    if (this.value[y].id == this.options[x].id)
                      i.push(this.options[x]);
                  }
                }
                return i;
              }
              let idx = this.options.map(x => x.id).indexOf(this.value.id);
              var i = Object.assign({}, this.options[idx]);
              if ( this.prop.cDisplayWithCode ) {
                i.label = this.value.id;
              }
              return i;
            } else {
              let idx = this.options.map(x => x.id).indexOf(this.value);
              var i = isArray ? Array.from(this.options[idx]) : Object.assign({}, this.options[idx]);
              if ( this.prop.cDisplayWithCode ) {
                i.label = this.value;
              }
              return i;
            }
          } else {
            if (typeof this.value == "object") {
              if (this.options.length > 0) {
                if (isArray) {
                  this.options = Array.from(this.value);
                  return Array.from(this.value);
                }
                if (this.options[0].id === this.value.id) {
                  // var i = [...this.options[0]];
                  var i = Object.assign({}, this.options[0]);
                  if ( this.prop.cDisplayWithCode ) {
                    i.label = this.value.id
                  }
                  return i;
                } else {
                  this.options = [
                    { id: this.value.id, label: this.value.label }
                  ];
                  var i = [
                    { id: this.value.id, label: this.value.id }
                  ];
                  if (this.prop.cDisplayWithCode) {
                    return i;
                  }
                  else {
                    return this.options[0];
                  }
                }
              } else {
                if (isArray) {
                  this.options = Array.from(this.value);
                  return Array.from(this.value);
                } else
                  this.options = [{ id: this.value.id, label: this.value.label }];
                var i = [
                  { id: this.value.id, label: this.value.id }
                ];
                if (this.prop.cDisplayWithCode) {
                  return i;
                }
                else {
                  return this.options[0];
                }
              }
            } else {
              if (this.options.length > 0) {
                if (this.options[0].id === this.value) {
                  // var i = [...this.options[0]];
                  var i = isArray ? Array.from(this.options[idx]) : Object.assign({}, this.options[0]);
                  if ( this.prop.cDisplayWithCode ) {
                    i.label = this.value
                  }
                  return i;
                } else {
                  this.options = [{ id: this.value, label: this.label }];
                  var i = [
                    { id: this.value, label: this.value }
                  ];
                  if (this.prop.cDisplayWithCode) {
                    return i;
                  }
                  else {
                    return this.options[0];
                  }
                }
              } else {
                this.options = [{ id: this.value, label: this.label }];
                var i = [
                  { id: this.value, label: this.value }
                ];
                if (this.prop.cDisplayWithCode) {
                  return i;
                }
                else {
                  return this.options[0];
                }
              }
            }
          }
        }
      },
      set: function(newValue) {
        if (!newValue || newValue == null || newValue == "") {
          this.value = "";
        } else {
          this.value = newValue.id;
        }
      }
    }
  },
  methods: {
    focus() {
      this.$nextTick().then(() =>
        document.getElementById(this.prop.cName).focus()
      );
    },
    onClear() {
      this.selected = { id: "", label: "" };
      this.$emit("change", { id: "", label: "" });
      // this.$emit('doClear')
    },
    doDoubleClick() {},
    UpdateValue($event) {
      if (!$event) return;

      if ($event == "") {
        this.value = "";
      } else {
        if (this.prop.cDisplayWithCode) {
          this.selected.label = $event.id
        }
        this.value = $event.id;
      }

      this.$emit("change", $event);
      // }
    },
    onSearch: function(search, loading) {
      if (!this.prop.cStatic) {
        if (this.prop.cAsync) {
          this.getData(search, loading);
        }
      }
    },
    onFocus: function(search, loading) {
      if (!this.prop.cStatic) {
        if (!this.prop.cAsync) {
          if (!this.getStatusError) {
            this.getData(search, loading);
          } else {
            // this.options = []
            this.$store.commit("setStatusError", false);
          }
        }
      }
    },

    getData(search, loading) {
      this.isLoadData = true;
      if (loading) loading(true);

      var d = this.prop.cDefault ? this.prop.cDefault : "";

      if (this.prop.cAsync) {
        if (search.length > 2) {
          this.prop.dataLookUp.ParamWhere = search;
        } else {
          if (loading) loading(false);
          return;
        }
      }
      this.postJSON(this.urlHoonian + this.prop.dataLookUp.url, this.prop.dataLookUp.param, false, this.noAuth).then(response => {
        if (loading) loading(false);
        if (response == null) return;

        this.options = response.data;
        if (this.prop.callback) {
          this.prop.callback(this.options);
          this.prop.callback = undefined;
        }

        if (this.prop.cIsAll) {
          this.options.unshift({
            id: 999,
            label: 'All'
          })
        }

        if (this.options.length > 0) {
          if (this.options.length == 1 && this.onChangeTriggered) {
            var i = [...this.options[0]];
            if (this.prop.cDisplayWithCode) {
              i.label = this.options[0].id
            }
            this.selected = i;
          } else if (d !== "" && this.selected == null) {
            var index = this.options
              .map(d => {
                return d.id;
              })
              .indexOf(d);
            var i = [...this.options[index]];
            if (this.prop.cDisplayWithCode) {
              i.label = this.options[index].id
            }
            this.selected = i;
          }
        }
        this.onChangeTriggered = false;
      });
    },

    doShowMaster() {
      this.masterUrlPopUp(
        `${window.location.origin}` + this.oid,
        "",
        "1000",
        "600",
        this.prop.cName
      );
    },
    openLookup() {
      this.$refs.modalLookup.show();
    },
    closeLookup() {
      this.$refs.modalLookup.hide();
    }
  },
  created() {
    this.prop.cClearable == undefined ? this.prop.cClearable = true : this.prop.cClearable = false;
    if (this.prop.cStatic === undefined || this.prop.cStatic === null) {
      this.prop.cStatic = false;
    }

    if (this.prop.cStatic === true) {
      this.options = this.prop.cOption;
      this.isLoadData = true;
    }

    this.prop.cLabelSize = this.prop.cLabelSize ? this.prop.cLabelSize : 4;
    this.prop.cTriggered = this.prop.cTriggered ? this.prop.cTriggered : false;
    this.prop.cProtect = this.prop.cProtect ? this.prop.cProtect : false;
    this.prop.cAsync = this.prop.cAsync ? this.prop.cAsync : false;
    this.prop.cFilter = this.prop.cFilter ? this.prop.cFilter : true;
    this.prop.cInputStatus = this.prop.cInputStatus
      ? this.prop.cInputStatus
      : "new";
    this.prop.cVisible =
      this.prop.cVisible === undefined ? true : this.prop.cVisible;
    this.prop.cStyle = this.prop.cStyle ? this.prop.cStyle : "";

    // get max, for maxlength
    if (
      this.prop.cValidate !== undefined &&
      this.prop.cValidate !== null &&
      this.prop.cValidate !== ""
    ) {
      var str_array = this.prop.cValidate.split("|");
      for (var i = 0; i < str_array.length; i++) {
        var s = str_array[i].split(":");
        if (s[0] == "required") {
          this.isRequired = true;
        }
      }
    }

    this.prop.cMasterUrl =
      this.prop.cMasterUrl == "" ? undefined : this.prop.cMasterUrl;
  },
  mounted() {},
  beforeDestroy() {}
};
</script>

<style scoped>
select.styles {
  /* cursor: move; */
  position: relative;
  display: block;
  padding: 10px 15px;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid #ddd;
  font-size: 11px;
}

option.opt {
  padding: 10px 15px;
}

.v-select {
  font-size: 11px;
}
</style>