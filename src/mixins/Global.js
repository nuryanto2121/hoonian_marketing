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
  
  cutWord(txt, len, withdot = false) {
    let txt2 = txt.substring(0,len);
    return txt2 + (txt.length > len ? (withdot ? '...' : '') : '');
  },

  isMobile() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  },

  doWA(body, phoneNumber) {
    let msg = this.replaceAllString(body, "\n", "%0D%0A", "string");
    msg = this.replaceAllString(msg, "&nbsp;", "%20", "string");
    let url = "https://api.whatsapp.com/send?text=" + msg + "&phone=" + phoneNumber;
    window.open(url);
  },
  },

}
