<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body" v-for="(menu, index) in getDynamicMenu" :key="index">
      <b-row class="dashboardBody" v-if="index % 3 == 0">
        <b-col md="4">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col>
                  <span style="float: left !important;">{{getDynamicMenu[index].title}}</span> &nbsp;
                </b-col>
                <b-col sm="1">
                  <b-form-checkbox
                    @change="onChangeCheckbox(index)"
                    v-model="getDynamicMenu[index].is_favorite"
                    :key="index"
                    value="True"
                    unchecked-value="False"
                    name="flavour-3a" />
                </b-col>
              </b-row>
            </div>
            <div class="card__body" style="cursor: pointer;" @click="onMenuClick(getDynamicMenu[index])">
              <div class="card__body__menu">
                <font-awesome-icon style="color: rgb(74, 147, 179);" :icon="getDynamicMenu[index].icon_class == '' || getDynamicMenu[index].icon_class == null ? 'cog' : getDynamicMenu[index].icon_class" size="6x" />
                <br />
                <br />
                <span style="width: 75%">{{getDynamicMenu[index].title}}</span>
              </div>
            </div>
          </div>
        </b-col>
        <b-col md="4" v-if="getDynamicMenu.length > (index + 1)">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col>
                  <span style="float: left !important;">{{getDynamicMenu[index + 1].title}}</span> &nbsp;
                </b-col>
                <b-col sm="1">
                  <b-form-checkbox
                    @change="onChangeCheckbox(index + 1)"
                    v-model="getDynamicMenu[index + 1].is_favorite"
                    :key="index + 1"
                    value="True"
                    unchecked-value="False"
                    name="flavour-3a" />
                </b-col>
              </b-row>
            </div>
            <div class="card__body" style="cursor: pointer;" @click="onMenuClick(getDynamicMenu[index + 1])">
              <div class="card__body__menu">
                <font-awesome-icon style="color: rgb(74, 147, 179);" :icon="getDynamicMenu[index + 1].icon_class == '' || getDynamicMenu[index + 1].icon_class == null ? 'cog' : getDynamicMenu[index + 1].icon_class" size="6x" />
                <br />
                <br />
                <span style="width: 75%">{{getDynamicMenu[index + 1].title}}</span>
              </div>
            </div>
          </div>
        </b-col>
        <b-col md="4" v-if="getDynamicMenu.length > (index + 2)">
          <div class="card">
            <div class="card__title">
              <b-row>
                <b-col>
                  <span style="float: left !important;">{{getDynamicMenu[index + 2].title}}</span> &nbsp;
                </b-col>
                <b-col sm="1">
                  <b-form-checkbox
                    @change="onChangeCheckbox(index + 2)"
                    v-model="getDynamicMenu[index + 2].is_favorite"
                    :key="index + 2"
                    value="True"
                    unchecked-value="False"
                    name="flavour-3a" />
                </b-col>
              </b-row>
            </div>
            <div class="card__body" style="cursor: pointer;" @click="onMenuClick(getDynamicMenu[index + 2])">
              <div class="card__body__menu">
                <font-awesome-icon style="color: rgb(74, 147, 179);" :icon="getDynamicMenu[index + 2].icon_class == '' || getDynamicMenu[index + 2].icon_class == null ? 'cog' : getDynamicMenu[index + 2].icon_class" size="6x" />
                <br />
                <br />
                <span style="width: 75%">{{getDynamicMenu[index + 2].title}}</span>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    getDynamicMenu() {
      return this.$store.getters.getDynamicMenu;
    },
  },
  methods: {
    onMenuClick(menu) {
      this.$router.push(menu.menu_url);
    },
    onChangeCheckbox(index) {
      let param = {
        option_function_cd: "SetFavoriteMenu",
        module_cd: "SS",
        ss_portfolio_id: this.getDataUser().portfolio_id,
        user_id: this.getDataUser().user_id,
        ss_menu_id: this.getDynamicMenu[index].ss_menu_id,
      };
      this.CallFunction(param).then(ress => {
        if (ress == null) return;
        localStorage.lsShortcutMenu = JSON.stringify(ress.Data);
        this.$store.commit("setFavoriteMenu", this.getShortcitMenu());
      });
    }
  },
  mounted() {}
};
</script>