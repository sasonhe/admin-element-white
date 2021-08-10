<template>
  <div class="sidebar-container">
    <el-scrollbar style="height:100%" wrap-class="scrollbar-wrapper">
      <el-aside>
        <el-menu
          :default-active="activeMenu"
          :unique-opened="true"
          mode="vertical"
          :router="true"
          :collapse="isCollapse"
        >
          <template v-for="(item,index) in router">
            <el-submenu v-if="item.children.length > 0" :index="item.meta.path">
              <template slot="title">
                <i :class="item.meta.icon"></i>
                <span>{{item.meta.name}}</span>
              </template>
              <el-menu-item
                v-for="(items,i) in item.children"
                :key="items.id"
                :index="items.meta.path"
                style="padding-left:50px;padding-right: 15px;"
              >{{items.meta.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item
              v-else
              :index="item.meta.path"
            >
              <i :class="item.meta.icon"></i>
              <span slot="title">{{item.meta.name}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FixiOSBug from "./FixiOSBug";
import { project } from '@/router/modules/project';
export default {
  mixins: [FixiOSBug],
  data() {
    return {
      router:project.children
    };
  },
  created() {},
  computed: {
    ...mapGetters(["sidebar"]),
    isCollapse() {
      return !this.sidebar.opened;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    }
  },
  watch: {

  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/variables.scss";
.sidebar-container {
  min-height: 100%;
  -webkit-transition: width 0.28s;
  transition: width 0.28s;
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  background: #fff;
  padding-top: 60px;
  box-sizing: border-box;
}
.hideSidebar .el-aside {
  width: 60px !important;
}
.hideSidebar.mobile .el-aside {
  width: 0px !important;
}
.openSidebar .el-aside {
  width: 220px !important;
}
.el-aside {
  height: 100%;
  overflow: inherit;
  transition: all 0.28s;
  border: none
}
.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
  box-sizing: border-box;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: #fff;
}
.el-scrollbar {
  transition: all 0.28s;
}
/deep/ .scrollbar-wrapper {
  overflow-x: hidden !important;
}
.sidebar-container .is-horizontal {
  display: none;
}

.el-submenu .el-menu {
  background: #fff !important;
}
.is-opened .el-submenu__title {
  background: none !important;
}

.el-menu-item.is-active,
.is-opened .is-active {
  background: #{$menuBarBg} !important;
  color: #{$menuRightBg} !important;
}
.el-submenu__title:hover {
  background: none;
}
.el-menu-item {
  background: transparent !important;
}
.el-menu {
  user-select: none;
}
.el-menu-item-group__title {
  display: none;
}
.logo {
  height: 60px;
}
.el-menu-item.is-active::after {
  content: "";
  background: #{$menuRightBg};
  display: inline-block;
  width: 2px;
  height: 100%;
  position: absolute;
  right: 0;
}
</style>
