<template>
  <div class="sidebar-app__box-menu" style="width: 180px !important;">
    <div>
      <div class="row">
        <div
          id="main-menu"
          class="list-group"
          v-for="(fm, index) in modules"
          :key="index"
          style="margin-bottom:0px !important; width:180px !important;"
        >
          <a
            role="button"
            class="list-group-item"
            v-if="textMenu"
            v-b-toggle="'collapseE_'+index"
            :id="'collapseE_' + index"
            @click="doCallMenu(fm)"
            style="border: 0px solid #e7eaec !important;height:30px; cursor:pointer !important;"
          >
            <span style="padding-left: 20px; padding-right: 5px;" v-if="fm.menu_type == 'O'">-</span>
            <font-awesome-icon
              v-else
              :id="'closedE_'+index"
              icon="chevron-circle-down"
              style="float:left; margin-top:5px; padding-top:5px; margin-right: 5px;"
            />
            <font-awesome-icon
              :id="'openedE_'+index"
              icon="chevron-circle-down"
              style="float:left; margin-top:5px; padding-top:5px; margin-right: 5px; display:none"
            />

            <span style="font-size:12px;">{{fm.title}}</span>
          </a>
          <b-collapse
            :id="'collapseE_'+index"
            :visible="false"
            v-for="(event, indexEvent) in events.filter(x => x.parent_menu_id == fm.ss_menu_id)"
            :key="indexEvent"
          >
            <!-- accordion="collapseE" -->
            <a
              role="button"
              class="list-group-item"
              v-b-toggle="'collapseO_'+index+'_'+indexEvent"
              :id="'collapseO_'+index+'_'+indexEvent"
              @click="doCallMenu(event)"
              style="border: 0px solid #e7eaec !important;height:30px; cursor:pointer !important;"
            >
              <span style="padding-left: 15px; padding-right: 10px;">-</span>
              <span style="font-size:12px; padding-left:0px;">{{event.title}}</span>
            </a>
          </b-collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    textMenu() {
      return this.$store.getters.textMenu;
    }
  },
  data() {
    return {
      menus: [],
      modules: [],
      events: [],
      options: [],
      lefta: true,
      downa: false,
      leftb: true,
      downb: false,
      styleCustom: "margin-bottom:0px !important; width:180px !important;",
      segmentUrl: ""
    };
  },
  created: function() {
    this.menus = this.getMenu();

    this.modules = this.menus.filter(function(x) {
      return x.level.toString() == "1";
    });

    this.events = this.menus.filter(x => {
      return x.level.toString() == "2";
    });

    this.options = this.menus.filter(x => {
      return x.level.toString() == "3";
    });
  },
  mounted() {
    this.$root.$on("bv::collapse::state", (collapseId, isJustShown) => {
      var indexM = null;
      var indexE = null;
      if (collapseId.includes("collapseE")) {
        indexM = collapseId.split("_")[1];

        if (isJustShown) {
          document.getElementById("openedE_" + indexM).style.display = "block";
          document.getElementById("closedE_" + indexM).style.display = "none";
        } else {
          document.getElementById("openedE_" + indexM).style.display = "none";
          document.getElementById("closedE_" + indexM).style.display = "block";
        }
      } else {
        indexM = collapseId.split("_")[1];
        indexE = collapseId.split("_")[2];
        if (isJustShown) {
          document.getElementById(
            "openedO_" + indexM + "_" + indexE
          ).style.display = "block";

          document.getElementById(
            "closedO_" + indexM + "_" + indexE
          ).style.display = "none";
        } else {
          var o = document.getElementById(
            "openedO_" + indexM + "_" + indexE
          )
          if (o !== null) {
            document.getElementById(
              "openedO_" + indexM + "_" + indexE
            ).style.display = "none";
          }
          
          var q = document.getElementById(
            "closedO_" + indexM + "_" + indexE
          )
          if(q !== null) {
            document.getElementById(
              "closedO_" + indexM + "_" + indexE
            ).style.display = "block";
          }
        }
      }
    });
  },
  methods: {
    getSegmentUrl() {
      var currentUrl = window.location.href;
      var arrayUrl = currentUrl.split("/");

      this.segmentUrl = "/" + arrayUrl[3] + "/" + arrayUrl[4];
    },
    dashboard() {
      this.$router.push("/");
    },
    doInsert: function(menuSeqNo, optionSeq, ps, indexChild) {
      var param = {
        user_id: this.getDataUser().user_id,
        subportfolio_cd: this.getDataUser().subportfolio_cd,
        OptionSeq: optionSeq,
        PS: ps
      };
      this.postEncode(this.getUrlInsertFavorite(), param).then(response => {
        if (response == null) return;

        for (var i = 0; i < this.menus.event_with_child.length; i++) {
          if (this.menus.event_with_child[i].menu_seq_no == menuSeqNo) break;
        }

        this.menus.event_with_child[i].child[indexChild].fav = 1;

        localStorage.lsMenu = JSON.stringify(this.menus);
        this.events = this.menus.event_with_child;

        localStorage.lsShortcutMenu = JSON.stringify(response.Data);
        this.$parent.$children[1].$children[3].changeFavMenu(
          localStorage.lsShortcutMenu
        );
      });
    },
    doDelete: function(menuSeqNo, optionSeq, indexChild) {
      var param = {
        user_id: this.getDataUser().user_id,
        subportfolio_cd: this.getDataUser().subportfolio_cd,
        OptionSeq: optionSeq
      };
      this.postEncode(this.getUrlDeleteFavorite(), param).then(response => {
        if (response == null) return;

        for (var i = 0; i < this.menus.event_with_child.length; i++) {
          if (this.menus.event_with_child[i].menu_seq_no == menuSeqNo) break;
        }
        this.menus.event_with_child[i].child[indexChild].fav = 0;

        localStorage.lsMenu = JSON.stringify(this.menus);
        this.events = this.menus.event_with_child;

        localStorage.lsShortcutMenu = JSON.stringify(response.Data);
        this.$parent.$children[1].$children[3].changeFavMenu(
          localStorage.lsShortcutMenu
        );
      });
    },
    doCallMenu: function(menu) {
      if (
        !menu.menu_url ||
        menu.menu_url == null ||
        menu.menu_url == undefined ||
        menu.menu_url == "" ||
        menu.menu_url == "#"
      )
        return;
        
      this.$store.dispatch("handlePaddingHeader", "185px");
      this.$store.dispatch("handlePaddingLeftContent", "180px");
      this.$store.dispatch("handleWidthSidebar", "180px");
      this.$store.dispatch("handleWidthRightbar", "0px");
      this.$store.dispatch("handleTextMenu", true);
      this.$router.push(menu.menu_url);
      this.segmentUrl = menu.menu_url;
      this.$store.commit("setIsPost", false);
      this.$store.commit("setSearch1", "");
      this.$store.commit("setSearch2", "");
      this.$store.commit("setSearch3", "");
      this.$store.commit("setPsMenu", menu);
      this.$store.commit("setNewStatus", true);
      this.$store.commit("setEditStatus", true);
      this.$store.commit("setDeleteStatus", true);

      if (menu.menu_type == 'E' && menu.level == '2')
        this.$store.commit("setDynamicMenu", this.options.filter(x => x.parent_menu_id == menu.ss_menu_id));
      else
        this.$store.commit("setDynamicMenu", {});

      this.$store.commit("setParamPage", {});
    }
  }
};
</script>

<style scoped>
#main-menu {
  background-color: rgb(74, 147, 179);
}

.list-group-item {
  background-color: rgb(74, 147, 179);
  border: none;
}

a.list-group-item {
  color: #ffffff;
  padding: 0px 10px !important;
}

a.list-group-item:hover,
a.list-group-item:focus {
  background-color: #ffffff;
  color: rgb(74, 147, 179);
}

a.list-group-item.active,
a.list-group-item.active:hover,
a.list-group-item.active:focus {
  color: #fff;
  background-color: #ffb43a;
  border: none;
}

.list-group-item:first-child,
.list-group-item:last-child {
  border-radius: 0;
}

.list-group-level1 .list-group-item {
  padding-left: 30px;
}

.list-group-level2 .list-group-item {
  padding-left: 60px;
}

</style>
