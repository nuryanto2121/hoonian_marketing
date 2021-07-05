export default {
  methods: {

    getDataUser() {
      return localStorage.lsDataUser === undefined ? undefined : JSON.parse(localStorage.lsDataUser)
    },

    getShortcitMenu() {
      return localStorage.lsShortcutMenu === undefined ? undefined : JSON.parse(localStorage.lsShortcutMenu)
    },

    getMenu() {
      return localStorage.lsMenu === undefined ? undefined : JSON.parse(localStorage.lsMenu)
    },

    getSession() {
      return localStorage.lsSession === undefined ? undefined : JSON.parse(localStorage.lsSession)
    },

    getOptionSeq() {
      return this.$route.query.oid === undefined ? undefined : { OptionSeq: this.$route.query.oid }
      // return localStorage.lsOptionSeq === undefined ? undefined : JSON.parse(localStorage.lsOptionSeq)
    },
    getOptionUrl() {
      return this.$route.path
    },
    getIsPopup() {
      return this.$route.query.isPopup
    },
    getIsCallBack() {
      return this.$route.query.isCallBack
    },
    getFrom() {
      return this.$route.query.from
    },

    getStatusForm() {
      return localStorage.statusForm === undefined ? undefined : localStorage.statusForm
    },

    doClearLocalStorage() {
      return localStorage.clear()
    },

    getDashboardProjectID() {
      return localStorage.dashboardProjectID === undefined ? this.getDataUser().dashboard_project_id : this.getDataUser().dashboard_project_id
    },

    getLanguageCommon() {
      return localStorage.lang_common === undefined ? {lang_id: "en", label: "English"} : JSON.parse(localStorage.lang_common);
    },
    setLanguageCommon() {
      localStorage.lang_common = JSON.stringify({lang_id: this.Model.lang_id, label: this.Model.lang_idLabel});
    },

    // example use this method get session id
    // this.getSession().Session_Id
  }
}
