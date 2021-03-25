import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(VueSweetalert2)

export default {
  methods: {

    alertWithHtml (title = '', type = '', html = '') {
      return this.$swal({
        heightAuto: false,
        title: title,
        html: html,
        type: type,
        customClass: 'swall-custom',
      })
    },

    alertSuccess (message) {
      return this.$swal({
                          heightAuto: false,
                          title: 'Success',
                          text: String(message),
                          type: 'success',
                          customClass: 'swall-custom',
                        })
    },

    alertError (message) {
      return this.$swal({
                          heightAuto: false,
                          title: 'Error',
                          text: String(message),
                          type: 'error',
                          customClass: 'swall-custom',
                        })
    },

    alertWarning (message) {
      return this.$swal({
                          heightAuto: false,
                          title: 'Oops',
                          text: String(message),
                          type: 'warning',
                          customClass: 'swall-custom',
                        })
    },

    alertInfo (message) {
      return this.$swal({
                          heightAuto: false,
                          title: 'Info',
                          text: String(message),
                          type: 'info',
                          customClass: 'swall-custom',
                        })
    },

    alertConfirmation (text, leftButtonText = 'Yes', rightButtonText = 'No', title = 'Confirmation') {
      return this.$swal({
        heightAuto: false,
        title: title,
        text: text,
        // type: 'info',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: leftButtonText,
        cancelButtonText: rightButtonText,
        showCloseButton: true,
        showLoaderOnConfirm: true,
        customClass: 'swall-custom',
      })
    }

  }

}
