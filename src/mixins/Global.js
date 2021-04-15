import moment from 'moment'
export default {
  data() {
    return {
      separator: ' | ',
      decimal: 2
    }
  },
  methods: {
    hideSideBarMenu(from = '') {
      if (from == 'inquiry') {
        this.$store.dispatch('handlePaddingHeader', '0px')
        this.$store.dispatch('handlePaddingLeftContent', '0px')
        this.$store.dispatch('handleWidthSidebar', '0px')
        this.$store.dispatch('handleWidthRightbar', '0px')
      }
      else {
        this.$store.dispatch('handlePaddingHeader', '0px')
        this.$store.dispatch('handlePaddingLeftContent', '0px')
        this.$store.dispatch('handleWidthSidebar', '0px')
        this.$store.dispatch('handleWidthRightbar', '0px')
        this.$store.dispatch('handleTextMenu', false)
      }
    },
    isCurrency(num = 0, decimal, from = '') {
      // if (from === 'a') console.log('before1', num)
      if (num === null || num === undefined || !num || num === '') {
        num = 0
        return parseFloat(num.toFixed(decimal))
      }
      if (decimal === null || decimal === undefined || decimal === '') {
        decimal = this.decimal
      }
      if (decimal == 0) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }

      var num1 = this.replaceAllString(num.toString(), ',', '', 'number')
      var numSplit = null
      if (num1.toString().indexOf('.') > -1) {
        let xnum1 = parseFloat(num1).toFixed(decimal);
        numSplit = xnum1.toString().split('.')
        var numReal = (numSplit[0] && numSplit[0] !== '') ? numSplit[0] : 0
        var numDecimal = '.' + numSplit[1]

        return numReal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + numDecimal
      } else {
        // numSplit = [num, '00']
        if (decimal == 0) {
          return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
        else {
          return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.00'
        }
      }
    },
    M_FormatingDate(date) {
      // var arrDate = [
      //   {'M': 'January', 'm': 'Jan'},
      //   {'M': 'February', 'm': 'Feb'},
      //   {'M': 'March', 'm': 'Mar'},
      //   {'M': 'April', 'm': 'Apr'},
      //   {'M': 'May', 'm': 'May'},
      //   {'M': 'June', 'm': 'Jun'},
      //   {'M': 'July', 'm': 'Jul'},
      //   {'M': 'August', 'm': 'Aug'},
      //   {'M': 'September', 'm': 'Sep'},
      //   {'M': 'October', 'm': 'Oct'},
      //   {'M': 'November', 'm': 'Nov'},
      //   {'M': 'December', 'm': 'Dec'}
      // ]

      var d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      var m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      var y = date.getFullYear()

      return y + '-' + m + '-' + d
    },
    closeBigMenu() {
      this.$store.dispatch('handleMenuBig', false)
    },
    FormToMasterPage() {
      return this.$parent.$parent.$parent.$parent.$parent
    },
    FormToMasterPage2() {
      return this.$parent.$parent.$parent.$parent
    },
    // getAllChild2 (method) {
    //   var len = this.$children[2].$children[0].$children.length / 2
    //   for (let x = 0; x < len; x++) {
    //     this.$children[2].$children[0].$children[x].$children[0].$children[0].call(method)
    //   }
    // }
    FormToABSList() {
      return this.$children[0]
    },
    FormToABSList2() {
      return this.$children[0].$children[0]
    },
    FormToABSTabs() {
      return this.$parent.$parent.$parent.$parent
    },
    getToolbar() {
      return this.$parent.$parent.$parent.$parent.$parent.$children[0].$children[0]
    },
    getToolbar2() {
      return this.$parent.$parent.$parent.$parent.$children[0].$children[0]
    },
    getAbsMasterPage() {
      return this.$parent.$parent.$parent.$parent.$parent
    },
    masterUrlPopUp(url, title, w, h, from) {
      let dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX
      let dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY

      let width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
      let height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

      let left = ((width / 2) - (w / 2)) + dualScreenLeft
      let top = ((height / 2) - (h / 2)) + dualScreenTop
      let newWindow = window.open(url + '&isPopup=true&from=' + from, title, 'toolbar=0,scrollbars=yes, resizable=no,location=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)
      // let newWindow = window.open(url  + '&isPopup=true&from=' + from, title, '', 'height=300,width=700,left=50,top=50,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes')
      // setTimeout(() => {
      //   newWindow.document.getElementById('sidebar-app').style.display = 'none'
      //   newWindow.document.getElementById('header--top').style.display = 'none'
      //   newWindow.document.getElementById('content-app').style.paddingLeft = '0px'
      // }, 2000)

      if (window.focus) {
        newWindow.focus()
      }

    },

    windowOpen(url, w, h) {
      let dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX
      let dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY

      let width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
      let height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

      let left = ((width / 2) - (w / 2)) + dualScreenLeft
      let top = ((height / 2) - (h / 2)) + dualScreenTop
      let newWindow = window.open(url, '', 'scrollbars=yes, resizable=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)

      if (window.focus) {
        newWindow.focus()
      }

    },

    dateAdd(date, number) {
      // console.log(date)
      // console.log(number)
      var d = moment(date, 'YYYY-MM-DD').add('days', number)
      // d.setDate(d.getDate() + number)
      // console.log(d)
      return moment(d, 'DD-MM-YYYY').format('YYYY-MM-DD')
    },

    dateAdd2(interval, date, number) {
      // console.log(date)
      // console.log(number)
      var i = 'days'
      if (interval.toLowerCase() == 'm') {
        i = 'months'
      }
      else if (interval.toLowerCase() == 'y') {
        i = 'years'
      }
      // console.log('i', i)
      var d = moment(date, 'YYYY-MM-DD').add(i, number)
      // console.log('d', d)
      // d.setDate(d.getDate() + number)
      // console.log(d)
      return moment(d, 'YYYY-MM-DD').format('YYYY-MM-DD')
    },

    datediff(date1, date2) {
      var d1Y = moment(date1).format('YYYY')
      var d1M = moment(date1).format('MM')
      var d1D = moment(date1).format('DD')
      var d2Y = moment(date2).format('YYYY')
      var d2M = moment(date2).format('MM')
      var d2D = moment(date2).format('DD')

      var intDate1 = (parseInt(d1Y) * 10000) + (parseInt(d1M) * 100) + parseInt(d1D)
      var intDate2 = (parseInt(d2Y) * 10000) + (parseInt(d2M) * 100) + parseInt(d2D)

      return intDate2 - intDate1
    },

    getToday() {
      return this.M_FormatingDate(new Date())
    },

    replaceString(string, stringToReplace, newString, type = 'string') {
      // type = type.toLowerCase()
      if (string.toString().indexOf(stringToReplace) < 0) {
        return string
      }

      var finalString = null

      if (type === 'string') {
        finalString = string.replace(stringToReplace, newString)
      } else if (type === 'number') {
        finalString = parseInt(string.replace(stringToReplace, newString))
      } else {
        finalString = string.replace(stringToReplace, newString)
      }

      return finalString
    },

    replaceAllString(string, stringToReplace, newString, type = 'string') {
      // console.log('replace', string)
      if (!string) return ''
      // type = type.toLowerCase()
      // console.log(string)
      if (string.toString().indexOf(stringToReplace) < 0) {
        // console.log('masuk', string)
        return string
      }

      var RegexString = new RegExp(stringToReplace, 'g')
      var finalString = null

      // console.log(type)

      if (type === 'string') {
        finalString = string.replace(RegexString, newString)
        // console.log(finalString)
      } else if (type === 'number') {
        finalString = parseFloat(string.replace(RegexString, newString))
        // console.log(finalString)
      } else {
        finalString = string.replace(RegexString, newString)
      }
      // console.log(finalString)

      return finalString
    },
    
  
  checkDigit(num = 0, abbreviation = false) {
    let ret = '';
    if (num == 0) {
      ret = '';
    }

    let coma = num.split(',');
    if (coma.length-1 <= 1) {
      ret = '';
    }

    if (coma.length-1 < 2) {
      ret = abbreviation? 'K': 'Thousand';
    }

    if (coma.length-1 == 2) {
      ret = abbreviation? 'M': 'Million';
    }

    if (coma.length-1 >= 3) {
      ret = abbreviation? 'B': 'Billion';
    }

    // if (coma.length-1 >= 4) {
    //   ret = abbreviation? 'Q': 'Quintilion';
    // }

    return ret;
  },

  checkNum(num = 0, real = 0, dec = 0) {
    let ret = num;
    if (num == 0) {
      ret = num;
    }

    let coma = num.split(',');
    if (coma.length-1 <= 2) {
      ret = (real / (Math.pow(1000, coma.length-1))).toFixed(dec).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    if (coma.length-1 == 3) {
      ret = (real / 1000000000).toFixed(dec).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    if (coma.length-1 >= 4) {
      ret = (real / 1000000000000).toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return ret;
  },
  checkValue(num, real) {
    let ret = num;
    if (num == 0) {
      ret = num;
    }

    let coma = num.split(',');
    if (coma.length-1 <= 2) {
      ret = (real / (Math.pow(1000, coma.length-1))).toFixed(0);
    }

    if (coma.length-1 == 3) {
      ret = (real / 1000000000).toFixed(0);
    }

    if (coma.length-1 >= 4) {
      ret = (real / 1000000000000).toFixed(1);
    }

    return ret;
  },
  checkPref(num = 0) {
    let ret = '';
    if (num == 0) {
      ret = '';
    }

    let coma = num.split(',');
    if (coma.length <= 2) {
      ret = 'K';
    }

    if (coma.length == 3) {
      ret = 'M';
    }

    if (coma.length >= 4) {
      ret = 'B'
    }

    return ret;
  },
  doBack() {
    this.$router.go(-1);
  },
  unixTimeDifference(date1, date2) {
    let difference = Math.abs(+date1 - +date2);
    let daysDifference = Math.floor(difference / 86400);
    let hoursDifference = (daysDifference * 24) + (Math.floor(difference / 3600) % 24);
    let minutesDifference = Math.floor(difference / 60) % 60;
    let secondsDifference = difference % 60;

    return {
      days: daysDifference,
      hours: hoursDifference,
      minutes: minutesDifference,
      seconds: secondsDifference,
    }
  },
  getDomainName(url) {
    if (url)
      return url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
    else ""
  },
  },

}
