<template>
  <span>
    <!-- <b-row v-show="prop.cVisible"> -->

      <!-- <b-col md="4"> -->
        <masked-input
        :placeholder="prop.cFormat"
        v-validate="prop.cValidate"
        v-bind:name="prop.cName + 'ACCTime'"
        v-bind:data-vv-as="prop.cName + 'ACCTime'"
        :disabled="prop.cProtect"
        :tabindex="prop.cOrder"
        :value="valueMasking"
        mask="11:11"
        class="text-field-form form-control"
        :class="{'input': true, 'error-text-field': errors.has(prop.cParentForm + '.' + prop.cName + 'ACCTime')}"
        @input="addTime"
        />
        <!-- @input="value = arguments[0]" -->
        <!-- @blur.native="ACCtime" -->
        <!-- @blur.native="addTime" -->
        
        <span v-show="errors.has(prop.cParentForm+'.'+prop.cName + 'ACCTime')"
          class="error-span">{{ errors.first(prop.cParentForm+'.'+prop.cName + 'ACCTime') }}
        </span>

        <!-- <label class="lbl-value-view-form notranslate" v-show="inputStatus=='view'">{{value}}</label> -->
      <!-- </b-col>
    </b-row> -->
    
  </span>
</template>

<script>

import Datepicker from 'vuejs-datepicker'
import * as lang from "vuejs-datepicker/src/locale"
import moment from 'moment'

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
    },
    value: ''
  },
  data() {
    return {
      isRequired: false,
    }
  },
  watch: {
    // value: function(newData, oldData) {
    //     this.value = newData;
    //     this.$emit('input', this.value == null ? '' : this.value)
    // }
  },
  computed: {
    inputStatus () {
      this.$validator.pause()
      this.$nextTick(() => {
        this.$validator.errors.clear(this.prop.cParentForm)
        this.$validator.resume()
      })
      
      return this.prop.cInputStatus.toLowerCase()
    },
    languageStatus () {
      return this.$store.getters.languageStatus
    },
    valueMasking() {
      let hh = this.value.split(':')[0] && this.value.split(':')[0] !== '' ? this.value.split(':')[0] : '00';
      let mm = this.value.split(':')[1] && this.value.split(':')[1] !== '' ? this.value.split(':')[1] : '00';
      // if (hh.includes('_')) {
      //   hh = this.replaceAllString(hh, '_', '0', 'string');
      // }
      // if (mm.includes('_')) {
      //   mm = this.replaceAllString(mm, '_', '0', 'string');
      // }
      return this.checkInt(hh) + ':' + this.checkInt(mm);
    }
  },
  methods: {
    handleInput() {
    },
    addTime (data) {
      this.value = data
      this.$emit('input', this.value == null ? '' : this.value)
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
    }
  },
  created: function() {
    this.prop.cProtect = this.prop.cProtect ? this.prop.cProtect : false
    this.prop.cFormat = this.prop.cFormat ? this.prop.cFormat : "HH:mm"
    
    // get max, for maxlength
    if(this.prop.cValidate !== undefined && this.prop.cValidate !== null && this.prop.cValidate !== ''){
      var str_array = this.prop.cValidate.split('|')
      for (var i = 0; i < str_array.length; i++) {
        var s = str_array[i].split(':')
        if(s[0] == 'required') {
          this.isRequired = true
        }
      }
    }
    this.$validator.extend('invalidHour', {
      getMessage(field, val) {
        return 'Invalid Hour'
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
    })

    this.$validator.extend('invalidTime', {
      getMessage(field, val) {
        return 'Invalid Minute'
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
    })

    if (this.prop.cValidate == undefined || this.prop.cValidate == null || this.prop.cValidate == '') {
      this.prop.cValidate = 'invalidTime'
    } else {
      this.prop.cValidate += '|invalidTime'
    }

    // console.log(this.value)
    // if (this.value && this.value !== '') {
    //   let v = this.value.split(':');
    //   let tH = this.checkInt(v[0]);
    //   let tM = this.checkInt(v[1]);
    //   this.value = tH + ':' + tM;
    // }
  },
  mounted: function () {
    // console.log(this.value)
    // if (this.value && this.value !== '') {
    //   let v = this.value.split(':');
    //   let tH = this.checkInt(v[0]);
    //   let tM = this.checkInt(v[1]);
    //   this.value = tH + ':' + tM;
    // }
  },
}
</script>
