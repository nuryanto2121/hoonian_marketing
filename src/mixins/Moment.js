import moment from 'moment'
import { extendMoment } from 'moment-range'

export default {
  methods: {

    momentDate (date) {
      return moment(date).format('YYYY-MM-DD')
    },

    momentDateFormatting (date, frm) {
      if (!date) return null
      return moment(date).format(frm)
    },

    momentDateFormat (date, frm) {
      if (!date) return null
      return moment(date, frm).format('YYYY-MM-DD')
    },

    momentDateFormat2 (date, frm, frm2) {
      if (!date) return null
      return moment(moment(date, frm)).format(frm2)
    },

    momentDateBetween (from, to) {
      const momentRange = extendMoment(moment)
      return momentRange(from).isSameOrBefore(to)
    },

    getMonthName (date, frm) {
      if (!date) return null
      return moment(moment(date, frm)).format('MMMM')
    },
    
    getDays (date, frm) {
      if (!date) return null
      return moment(moment(date, frm)).format('DD')
    },

    getMonths (date, frm) {
      if (!date) return null
      return moment(moment(date, frm)).format('MM')
    },

    getFullYear (date, frm) {
      if (!date) return null
      return moment(moment(date, frm)).format('YYYY')
    },

    momentRange(from, to) {
      if (!from && !to) return null
      return moment().range(from, to)
    },

    momentDiff(from, to, prefix = 'days') {
      if (!from || !to) return null
      let a = moment(to);
      let b = moment(from);
      return a.diff(b, prefix);
    },

    momentDiffFormat(from, to, format = 'hh:mm') {
      if (!from || !to) return null
      let ms = moment(from,"DD/MM/YYYY HH:mm:ss").diff(moment(to,"DD/MM/YYYY HH:mm:ss"));
      let d = moment.duration(ms);
      let s = moment.utc(ms).format(format); //Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
      return s;
    },

    momentUnix(unixTimestamp, frm = "YYYY-MM-DD") {
      return moment.unix(unixTimestamp).format(frm)
    },

    momentDateToUnix(date, frm = "YYYY-MM-DD") {
      return moment(date, frm).unix()
    },

  }

}
