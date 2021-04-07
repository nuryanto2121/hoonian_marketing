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
      // console.log(from, to)
      let a = this.momentDateFormat(from, "DD/MM/YYYY HH:mm:ss", "DD/MM/YYYY HH:mm:ss");
      let b = this.momentDateFormat(to, "DD/MM/YYYY HH:mm:ss", "DD/MM/YYYY HH:mm:ss");
      // let a_2 = new Date(a), b_2 = new Date(b);
      // let fr = b_2, tt = a_2;
      // console.log(a_2, b_2)
      // console.log(b_2 < a_2)
      // if (b_2 < a_2) {
      //   fr = a_2;
      //   tt = b_2;
      // }
      // console.log(a,b)
      let ms = moment(b).diff(moment(a));
      let d = moment.duration(ms);
      // console.log('Days', d.asDays());
      // console.log('Months', d.asMonths());
      // console.log('Years', d.asYears());
      // console.log('Hours', d.asHours());
      // console.log('Minutes', d.asMinutes());
      // console.log('Seconds', d.asSeconds());
      let frm = {
        'days': Math.floor(d.asDays()),
        'months': Math.floor(d.asMonths()),
        'years': Math.floor(d.asYears()),
        'hours': Math.floor(d.asHours()),
        'minutes': Math.floor(d.asMinutes()),
        'second': Math.floor(d.asSeconds()),
      };
      // return moment.utc(d).format(frm[prefix]);
      return frm[prefix];
    },

    momentUnix(unixTimestamp, frm = "YYYY-MM-DD") {
      return moment.unix(unixTimestamp).format(frm)
    },

    momentDateToUnix(date, frm = "YYYY-MM-DD") {
      return moment(date, frm).unix()
    },

  }

}
