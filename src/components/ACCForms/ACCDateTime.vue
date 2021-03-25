<template>
  <span>
    <!-- <b-col md="12"> -->
    <b-row>
      <b-col class="col-a-1" style="padding-left:0px !important;">
        <!-- <span>
          <font-awesome-icon style="color: blue;" icon="calendar-alt" size="lg" />
        </span>-->
        <span @click="showDatepicker(prop.cName)">
          <font-awesome-icon
            style="color: rgb(74, 147, 179); 
            font-size: 30px;
            position: absolute;
            right: 10px;
            padding-top: 8px;"
            icon="calendar-alt"
            size="lg"
          />
          <masked-input
            :placeholder="prop.cFormat"
            v-model="valueMasking"
            v-show="inputStatus!=='view'"
            v-bind:name="prop.cName"
            v-bind:data-vv-as="prop.cName"
            :disabled="prop.cProtect"
            :tabindex="prop.cOrder"
            mask="11/11/1111"
            :id="prop.cName"
            class="text-field-form form-control"
            :class="{'input': true, 'error-text-field': errors.has(prop.cParentForm + '.' + prop.cName)}"
            input-class="cDate"
            @blur.native="hideDatepicker(prop.cName)"
          />
        </span>

        <span
          v-show="errors.has(prop.cParentForm+'.'+prop.cName)"
          class="error-span"
        >{{ errors.first(prop.cParentForm+'.'+prop.cName) }}</span>

        <datepicker
          v-validate="prop.cValidate"
          placeholder="Select Date"
          v-show="inputStatus!=='view'"
          type="date"
          v-bind:name="prop.cName"
          v-bind:data-vv-as="prop.cName"
          v-bind:value="value"
          v-model="value"
          @input="handleInput"
          :disabled="prop.cProtect"
          :format="prop.cFormat"
          :ref="prop.cName"
          :id="prop.cParentForm + '.' + prop.cName"
          :highlighted="highlighted"
          style="display: none;"
        />
      </b-col>

      <b-col md="3" class="col-a-2" v-show="prop.cWithTime">
          <masked-input
          placeholder="HH:mm"
          v-validate="'invalidHour|invalidTime'"
          :value="valueMaskingTime2"
          v-bind:name="prop.cName + 'Times'"
          v-bind:data-vv-as="prop.cName + 'Times'"
          :disabled="prop.cProtect"
          :tabindex="prop.cOrder"
          mask="11:11"
          :id="prop.cName + 'Times'"
          class="text-field-form form-control"
          @input="addTime"
          :class="{'input': true, 'error-text-field': errors.has(prop.cParentForm + '.' + prop.cName + 'Times')}" />
          
          <span v-show="errors.has(prop.cParentForm+'.'+prop.cName + 'Times')"
            class="error-span">{{ errors.first(prop.cParentForm+'.'+prop.cName + 'Times') }}
          </span>
      </b-col>
      <!-- <b-col md="3" class="col-a-2" v-show="prop.cWithTime"> -->
        <!-- <b-form-input
          v-validate="'invalidHour'"
          :class="{'input': true, 'error-text-field': errors.has(prop.cParentForm+'.'+prop.cName+'Hour')}"
          :type="'text'"
          v-bind:data-vv-name="prop.cName+'Hour'"
          v-model="vHour"
          class="text-field-form"
          :maxlength="2"
          :tabindex="prop.cOrder"
          :disabled="(inputStatus == 'edit' && prop.cKey) || prop.cProtect"
          @keypress.native="formatNumber"
          :ref="prop.cName+'Hour'"
          :id="prop.cName+'Hour'"
          @blur.native="addTime"
          style="text-align: center;"
          placeholder="00"
        /> -->
        <!-- {{vHour}} -->
        <!-- <ACCDropDown
          @change="OnhourChange"
          :prop="{
            dataLookUp: null,
            cValidate: isRequired ? 'required' : '',
            cName: 'hour',
            ckey: false,
            cOrder: 2,
            cProtect: false,
            cParentForm: 'ACCDateTime_Hour' + prop.cName,
            cStatic: true,
            cOption: hours_option,
            cDisplayColumn: '',
            cInputStatus: inputStatus
          }"
          v-model="vHour"
          :label="vHour"
        /> -->
        <!-- <masked-input
        :placeholder="prop.cFormat"
        v-validate="'invalidTime'"
        v-model="value"
        v-bind:name="prop.cName + 'ACCTime'"
        v-bind:data-vv-as="prop.cName + 'ACCTime'"
        :disabled="prop.cProtect"
        :tabindex="prop.cOrder"
        mask="11:11"
        class="text-field-form form-control"
        :class="{'input': true, 'error-text-field': errors.has(prop.cParentForm + '.' + prop.cName + 'ACCTime')}"
        @blur.native="ACCtime" />
        
        <span v-show="errors.has(prop.cParentForm+'.'+prop.cName + 'ACCTime')"
          class="error-span">{{ errors.first(prop.cParentForm+'.'+prop.cName + 'ACCTime') }}
        </span> -->
      <!-- </b-col> -->

      <!-- <b-col md="3" class="col-a-3" v-show="prop.cWithTime"> -->
        <!-- <b-form-input
          v-validate="'invalidTime'"
          :class="{'input': true, 'error-text-field': errors.has(prop.cParentForm+'.'+prop.cName+'Time')}"
          :type="'text'"
          v-bind:data-vv-name="prop.cName+'Time'"
          v-model="vTime"
          class="text-field-form"
          :maxlength="2"
          :tabindex="prop.cOrder"
          :disabled="(inputStatus == 'edit' && prop.cKey) || prop.cProtect"
          @keypress.native="formatNumber"
          :ref="prop.cName+'Time'"
          :id="prop.cName+'Time'"
          @blur.native="addTime"
          style="text-align: center;"
          placeholder="00"
        /> -->
        <!-- {{vTime}} -->
        <!-- <ACCDropDown
          @change="OntimeChange"
          :prop="{
            dataLookUp: null,
            cValidate: isRequired ? 'required' : '',
            cName: 'time',
            ckey: false,
            cOrder: 3,
            cProtect: prop.cProtect,
            cParentForm: 'ACCDateTime_Time' + prop.cName,
            cStatic: true,
            cOption: times_option,
            cDisplayColumn: '',
            cInputStatus: inputStatus
          }"
          v-model="vTime"
          :label="vTime"
        /> -->

        <!-- <span
          v-show="errors.has(prop.cParentForm+'.'+prop.cName+'Time')"
          class="error-span"
        >{{ errors.first(prop.cParentForm+'.'+prop.cName+'Time') }}</span>
      </b-col> -->
    </b-row>
    <!-- </b-col> -->
  </span>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import * as lang from "vuejs-datepicker/src/locale";
import moment from "moment";

export default {
  components: { Datepicker },
  props: {
    prop: {
      cValidate: String,
      cName: String,
      cOrder: Number,
      cKey: Boolean,
      cProtect: Boolean,
      cFormat: String,
      cParentForm: String,
      cInputStatus: String,
      cWithTime: Boolean
    },
    // cValue: String
    value: ""
  },
  data() {
    return {
      valueMasking: null,
      valueMaskingTime: '',
      vHour: "",
      vTime: "",
      vTimes: "",
      isRequired: false,
      highlighted: {
        dates: [new Date()]
      },
      hours_option: [
        { id: "00", label: "00" },
        { id: "01", label: "01" },
        { id: "02", label: "02" },
        { id: "03", label: "03" },
        { id: "04", label: "04" },
        { id: "05", label: "05" },
        { id: "06", label: "06" },
        { id: "07", label: "07" },
        { id: "08", label: "08" },
        { id: "09", label: "09" },
        { id: "10", label: "10" },
        { id: "11", label: "11" },
        { id: "12", label: "12" },
        { id: "13", label: "13" },
        { id: "14", label: "14" },
        { id: "15", label: "15" },
        { id: "16", label: "16" },
        { id: "17", label: "17" },
        { id: "18", label: "18" },
        { id: "19", label: "19" },
        { id: "20", label: "20" },
        { id: "21", label: "21" },
        { id: "22", label: "22" },
        { id: "23", label: "23" }
      ],
      times_option: [
        { id: "00", label: "00" },
        { id: "01", label: "01" },
        { id: "02", label: "02" },
        { id: "03", label: "03" },
        { id: "04", label: "04" },
        { id: "05", label: "05" },
        { id: "06", label: "06" },
        { id: "07", label: "07" },
        { id: "08", label: "08" },
        { id: "09", label: "09" },
        { id: "10", label: "10" },
        { id: "11", label: "11" },
        { id: "12", label: "12" },
        { id: "13", label: "13" },
        { id: "14", label: "14" },
        { id: "15", label: "15" },
        { id: "16", label: "16" },
        { id: "17", label: "17" },
        { id: "18", label: "18" },
        { id: "19", label: "19" },
        { id: "20", label: "20" },
        { id: "21", label: "21" },
        { id: "22", label: "22" },
        { id: "23", label: "23" },
        { id: "24", label: "24" },
        { id: "25", label: "25" },
        { id: "26", label: "26" },
        { id: "27", label: "27" },
        { id: "28", label: "28" },
        { id: "29", label: "29" },
        { id: "30", label: "30" },
        { id: "31", label: "31" },
        { id: "32", label: "32" },
        { id: "33", label: "33" },
        { id: "34", label: "34" },
        { id: "35", label: "35" },
        { id: "36", label: "36" },
        { id: "37", label: "37" },
        { id: "38", label: "38" },
        { id: "39", label: "39" },
        { id: "40", label: "40" },
        { id: "41", label: "41" },
        { id: "42", label: "42" },
        { id: "43", label: "43" },
        { id: "44", label: "44" },
        { id: "45", label: "45" },
        { id: "46", label: "46" },
        { id: "57", label: "57" },
        { id: "48", label: "48" },
        { id: "49", label: "49" },
        { id: "50", label: "50" },
        { id: "51", label: "51" },
        { id: "52", label: "52" },
        { id: "53", label: "53" },
        { id: "54", label: "54" },
        { id: "55", label: "55" },
        { id: "56", label: "56" },
        { id: "57", label: "57" },
        { id: "58", label: "58" },
        { id: "59", label: "59" }
      ]
    };
  },
  watch: {
    value: function(newData, oldData) {
      if (this.value == "" || this.value == null) {
        this.valueMasking = "";
        this.vHour = "";
        this.vTime = "";
        this.vTimes = "";
      } else {
        // let tanggal = newData
        // if (newData.includes('/')) {
        //   var a = newData.split(' ')[0].split('/')
        //   var b = newData.split(' ')[1]
        //   tanggal = a[2] + '-' + a[1] + '-' + a[0] + ' ' + b
        //   this.value = tanggal
        // }
        // this.valueMasking = this.momentDateFormatting(new Date(tanggal), this.replaceAllString(this.prop.cFormat.toUpperCase(), '/', '-'))
        // this.valueMasking = this.replaceAllString(this.valueMasking, '-', '/')

        this.valueMasking = this.momentDateFormatting(
          new Date(newData),
          this.replaceAllString(this.prop.cFormat.toUpperCase(), "/", "-")
        );
        this.valueMasking = this.replaceAllString(this.valueMasking, "-", "/");
        // console.log(newData);

        this.vHour = this.momentDateFormatting(newData, "HH").toString();
        this.vTime = this.momentDateFormatting(newData, "mm").toString();
        this.vTimes = this.momentDateFormatting(newData, "HH:mm").toString();
        // this.valueMaskingTime = this.momentDateFormatting(newData, "HH:mm").toString();

        if (this.prop.cWithTime) {
          this.value = this.momentDateFormatting(
            this.value,
            "YYYY-MM-DD HH:mm"
          );
        } else {
          this.value = this.momentDateFormatting(this.value, "YYYY-MM-DD");
        }
      }
      // this.value = this.momentDateFormatting(this.value, "YYYY-MM-DD HH:mm")
      this.$emit("input", this.value == null ? "" : this.value);
    }
  },
  computed: {
    valueMaskingTimex() {
      var h = this.vHour;
      var t = this.vTime;
      var ts = this.vTimes;

      // return h + ":" + t;
      return ts;
    },
    valueMaskingTime2() {
      if (!this.prop.cWithTime) return
      if (this.value && this.value !== '') {
        let val = this.momentDateFormatting(
          this.value,
          // this.replaceAllString(this.prop.cFormat.toUpperCase(), "/", "-")
          "HH:mm"
        );
        // val = this.replaceAllString(val, "-", "/");
        // val = this.momentDateFormatting(val, "HH:mm").toString();
        // console.log(val, this.value)
  
        let hh = val.split(':')[0];
        let mm = val.split(':')[1];
        this.valueMaskingTime = this.checkInt(hh) + ':' + this.checkInt(mm);
        return this.checkInt(hh) + ':' + this.checkInt(mm);
      }
    },
    inputStatus() {
      this.$validator.pause();
      this.$nextTick(() => {
        this.$validator.errors.clear(this.prop.cParentForm);
        this.$validator.resume();
      });

      return this.prop.cInputStatus.toLowerCase();
    },

    valueLabel() {
      // return this.value?moment(new Date(this.value)).format('DD MMM YYYY') : ''
      return this.value
        ? moment(new Date(this.value)).format("DD/MM/YYYY")
        : "";
    },

    valueLabelTime() {
      return this.value ? moment(new Date(this.value)).format("HH:mm") : "";
    },

    languageStatus() {
      return this.$store.getters.languageStatus;
    }
  },
  methods: {
    formatNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;

      // if(this.prop.cType == 'decimal' || this.prop.cType == 'numeric' || this.prop.cType == 'tel'){
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      }
      // else if(charCode == 46){
      //   if (this.prop.cType == 'numeric' || this.prop.cType == 'tel') {
      //     evt.preventDefault()
      //   }
      //   else {
      //     var str = this.value
      //     if(str.indexOf('.') !== -1){
      //       evt.preventDefault()
      //     }
      //     else {
      //       return true
      //     }
      //   }
      // }
      // else if (charCode == 43) {
      //     if (this.prop.cType !== 'tel' && this.prop.cType !== 'text') {
      //         evt.preventDefault()
      //     }
      //     else if(this.prop.cType == 'tel') {
      //         var str = this.value
      //         if(str.indexOf('+') !== -1){
      //             evt.preventDefault()
      //         }
      //         else {
      //             return true
      //         }
      //     }
      // }
      else if (
        (charCode > 64 && charCode < 91) ||
        (charCode > 96 && charCode < 123) ||
        charCode == 8 ||
        charCode == 32
      ) {
        evt.preventDefault();
      }
      // else if (charCode == 13) {
      //   this.$emit('onEnterPress', this.value)
      //   return true
      // }
      else {
        return true;
      }
    },
    checkInt(num) {
      if (isNaN(parseInt(num))) {
        return num
      }
      
      if (parseInt(num) < 10) {
        return '0' + parseInt(num)
      }
      else {
        return num.toString();
      }
    },
    focus(DateTime = "") {
      this.$nextTick().then(() => {
        document.getElementById(this.prop.cName + DateTime).focus();
        this.showDatepicker(this.prop.cName + DateTime);
      });
    },
    handleInput(data) {
      var xx = this.valueMaskingTime;
      var dxx = moment(this.value).format("YYYY-MM-DD") + " " + xx;
      this.value = this.momentDateFormatting(
        new Date(dxx),
        this.prop.cWithTime ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD"
      );
    },
    hideDatepicker(calendar) {
      // if contain _ on blur, return value before editing
      if (this.valueMasking == "__/__/____") {
        this.value = "";
      } else if (this.valueMasking.includes("_")) {
        // this.valueMasking = this.value
        if (this.value == null) {
          this.valueMasking = null;
        } else {
          this.valueMasking = this.momentDateFormatting(
            new Date(this.value),
            this.replaceAllString(this.prop.cFormat.toUpperCase(), "/", "-")
          );
          this.valueMasking = this.replaceAllString(
            this.valueMasking,
            "-",
            "/"
          );
        }
      } else {
        // if input type oke
        // console.log('valueMaskingTime', this.valueMaskingTime)
        // this.value = this.momentDateFormat(this.valueMasking, this.prop.cFormat.toUpperCase())
        // this.value = moment(this.valueMasking, this.prop.cFormat.toUpperCase()).format("YYYY-MM-DD HH:mm")
        // console.log(this.valueMasking)
        // console.log(this.valueMaskingTime)
        // console.log(moment(this.valueMasking, this.prop.cFormat.toUpperCase()).format("YYYY-MM-DD"))
        var xx = this.valueMaskingTime != "" ? this.valueMaskingTime : "00:00";
        // console.log('xx', xx)
        var dxx =
          moment(this.valueMasking, this.prop.cFormat.toUpperCase()).format(
            "YYYY-MM-DD"
          ) +
          " " +
          xx;
          // console.log('dxx', dxx)
        this.value = this.momentDateFormatting(
          new Date(dxx),
          // "YYYY-MM-DD HH:mm"
          this.prop.cWithTime ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD"
        );
        // console.log(this.value)

        // if (this.value == 'Invalid date') {
        //   this.errors.clear()
        //   this.errors.add({
        //     field: this.prop.cParentForm + '.' + this.prop.cName,
        //     msg: 'Invalid Date'
        //   })
        // } else {
        //   this.errors.clear()
        // }
      }
      this.$refs[calendar].close();
    },
    addTime(data) {
      this.valueMaskingTime = data
      if (!data.includes('_')) {
        // console.log(moment(this.valueMasking, this.prop.cFormat.toUpperCase()).format("YYYY-MM-DD"))
        if (
          moment(this.valueMasking, this.prop.cFormat.toUpperCase()).format(
            "YYYY-MM-DD"
          ) !== "Invalid date"
        ) {
          var xx = this.valueMaskingTime != "" ? this.valueMaskingTime : "00:00";
          if (xx == "__:__") {
            xx = "00:00";
          }
          var dxx =
            moment(this.valueMasking, this.prop.cFormat.toUpperCase()).format(
              "YYYY-MM-DD"
            ) +
            " " +
            xx;
          this.value = this.momentDateFormatting(
            new Date(dxx),
            // "YYYY-MM-DD HH:mm"
            this.prop.cWithTime ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD"
          );
          // console.log(this.value)
  
          this.$emit('input', this.value == null ? '' : this.value)
        }
      }
    },
    showDatepicker(calendar) {
      if (this.prop.cProtect) return;

      if (this.prop.cKey && this.inputStatus == "edit") return;

      if (this.$refs[calendar].isOpen) {
        return this.$refs[calendar].close();
      }

      if (!this.$refs[calendar].allowedToShowView("day")) return false;
      this.$refs[calendar].close();
      this.$refs[calendar].showDayView = true;
      if (!this.$refs[calendar].isInline) {
        setTimeout(() => {
          document.addEventListener(
            "click",
            this.$refs[calendar].clickOutside,
            false
          );
        }, 100);
      }
    }
  },
  created: function() {
    var vm = this
    this.prop.cProtect = this.prop.cProtect ? this.prop.cProtect : false;
    this.prop.cWithTime = this.prop.cWithTime ? this.prop.cWithTime : false;
    this.prop.cFormat = this.prop.cFormat ? this.prop.cFormat : "dd/MM/yyyy";
    this.prop.cInputStatus = this.prop.cInputStatus
      ? this.prop.cInputStatus
      : "new";

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

    if (this.value != null) {
      this.valueMasking = this.momentDateFormatting(
        new Date(this.value),
        this.replaceAllString(this.prop.cFormat.toUpperCase(), "/", "-")
      );
      this.valueMasking = this.replaceAllString(this.valueMasking, "-", "/");
      // console.log(new Date(this.value), this.momentDateFormatting(new Date(this.value), "mm"))

      this.vHour = this.momentDateFormatting(new Date(this.value), "HH").toString();
      this.vTime = this.momentDateFormatting(new Date(this.value), "mm").toString();
      this.vTimes = this.momentDateFormatting(new Date(this.value), "HH:mm").toString();
    }

    if (this.value == "") {
      this.valueMasking = "";
      this.vHour = "";
      this.vTime = "";
      this.vTimes = "";
    }

    this.$validator.extend("invalidDateC", {
      getMessage(field, val) {
        return "Invalid Date";
      },
      validate(value, field) {
        // let startParts = self.startDate.split('-')
        // let endParts = value.split('-')
        // let start = new Date(startParts[2], startParts[1] -1, startParts[0]) // month is 0-based
        // let end = new Date(endParts[2], endParts[1] -1, endParts[0])

        // return end > start
        // alert(value)
        if (value == "Invalid date") {
          // this.errors.clear()
          // this.errors.add({
          //   field: this.prop.cParentForm + '.' + this.prop.cName,
          //   msg: 'Invalid Date'
          // })
          return false;
        } else {
          // this.errors.clear()
          return true;
        }
      }
    });

    this.$validator.extend("invalidHour", {
      getMessage(field, val) {
        return "Invalid Hour";
      },
      validate(value, field) {
        var H = value.substring(0,2)
        if (H.includes('_')) {
          return false
        }
        else {
          let xH = H && H !== '' ? parseInt(H) : 0;
          if (xH > 23) {
            return false
          } else {
              return true
          }
        }
      }
    });

    this.$validator.extend("invalidTime", {
      getMessage(field, val) {
        return "Invalid Minutes";
      },
      validate(value, field) {
        var M = value.substring(3,5)
        if (M.includes('_')) {
          return false
        }
        else {
          let xM = M && M !== '' ? parseInt(M) : 0;
          if (xM > 59) {
            return false
          } else {
            return true
          }
        }
      }
    });

    this.$validator.extend('min_date', {
      getMessage(field, val) {
        // return 'Must be after than Start Date'
        return field + ' could not be less than ' + val
      },
      // validate(value, field) {
      validate(value, field) {
        var rr = false
        // console.log(vm.prop.cWithTime, field)
        // console.log(value)
        if (vm.prop.cWithTime) {
          rr = vm.momentDateFormatting(value, 'YYYY-MM-DD HH:mm') >= vm.momentDateFormatting(field[0], 'YYYY-MM-DD HH:mm')
        }
        else {
          rr = vm.momentDateFormatting(value, 'YYYY-MM-DD') >= vm.momentDateFormatting(field[0], 'YYYY-MM-DD')
        }
        return rr
      }
    })

    this.$validator.extend('max_date', {
      getMessage(field, val) {
        // return 'Must be after than Start Date'
        return field + ' could not be more than ' + val
      },
      // validate(value, field) {
      validate(value, field) {
        // console.log(value, field);
        var rr = false
        if (vm.prop.cWithTime) {
          rr = vm.momentDateFormatting(value, 'YYYY-MM-DD HH:mm') <= vm.momentDateFormatting(field[0], 'YYYY-MM-DD HH:mm')
        }
        else {
          rr = vm.momentDateFormatting(value, 'YYYY-MM-DD') <= vm.momentDateFormatting(field[0], 'YYYY-MM-DD')
        }
        return rr
      }
    })

    this.$validator.extend('today_is_min', {
      getMessage(field, val) {
        // return 'Must be after than Start Date'
        return field + ' must be greater than today'
      },
      // validate(value, field) {
      validate(value, field) {
        var rr = false
        if (vm.prop.cWithTime) {
          rr = vm.momentDateFormatting(value, 'YYYY-MM-DD HH:mm') >= vm.getToday() //vm.momentDateFormatting(field[0], 'YYYY-MM-DD')
        }
        else {
          rr = vm.momentDateFormatting(value, 'YYYY-MM-DD') >= vm.getToday() //vm.momentDateFormatting(field[0], 'YYYY-MM-DD')
        }
        return rr
      }
    })

    this.$validator.extend('today_is_max', {
      getMessage(field, val) {
        // return 'Must be after than Start Date'
        return field + ' must be lower than today'
      },
      // validate(value, field) {
      validate(value, field) {
        var rr = false
        if (vm.prop.cWithTime) {
          rr = vm.momentDateFormatting(value, 'YYYY-MM-DD HH:mm') <= vm.getToday() //vm.momentDateFormatting(field[0], 'YYYY-MM-DD')
        }
        else {
          rr = vm.momentDateFormatting(value, 'YYYY-MM-DD') <= vm.getToday() //vm.momentDateFormatting(field[0], 'YYYY-MM-DD')
        }
        return rr
      }
    })

    if (
      this.prop.cValidate == undefined ||
      this.prop.cValidate == null ||
      this.prop.cValidate == ""
    ) {
      this.prop.cValidate = "invalidDateC";
    } else {
      this.prop.cValidate += "|invalidDateC";
    }
  },
  // updated: function () {
  //   if (this.value == '' || this.value == null) {
  //     this.valueMasking = ''
  //     this.$emit('input', '')
  //   }
  // },
  mounted: function() {
    var x = document.getElementById(
      this.prop.cParentForm + "." + this.prop.cName
    );
    x.style.visibility = "hidden";
  }
};
</script>

<style scoped>
/* .cDate {
    width:100%
  } */
/* .vdp-datepicker__calendar{
    top: 0px !important;
    width: 255px !important;
  } */

/* .vdp-datepicker__calendar .cell{ */
/* display: inline-table !important; */
/* height: 25px !important; */
/* line-height: 0px !important; */

/* display: inline-block;
    padding: 0px 5px;
    width: 14.285714%; */
/* text-align: center;
    vertical-align: middle;
    border: 1px solid transparent; */
/* } */
</style>
