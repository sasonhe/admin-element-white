<template>
  <div class="header-bar">
    <el-row :gutter="10">
      <el-col :md="6">
        <div class="logo"></div>
      </el-col>
      <el-col :md="18">
        <div class="user fr">
          <el-menu active-text-color="#409EFF" mode="horizontal" style="border:none">
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>用户名</span>
              </template>
              <el-menu-item @click="logout()">退出登录</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
        <div class="right-menu">
          <el-menu router :default-active="activeMenu" active-text-color="#409EFF" mode="horizontal" style="border:none">
            <el-menu-item  index="/top/menu1">菜单1</el-menu-item>
            <el-menu-item  index="/top/menu2">菜单2</el-menu-item>
          </el-menu>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    components:{},
    data() {
      return {

      };
    },
    methods: {
      logout() {
        this.$confirm('退出登录，是否继续', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('user/logout').then(_=>{
            this.$router.push('/user/login');
        });
        }).catch(() => {

        });
      },
    },
    mounted(){

    },
    computed:{
      activeMenu() {
        const route = this.$route
        // const { meta, path } = route
        let meta = route.meta
        let path = route.path
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      },
    }
  }
</script>

<style lang="scss" scoped>
@import "~@/assets/css/variables.scss";
.el-menu--horizontal > .el-menu-item.is-active{
  background: #{$menuBarBg} !important;
  color: #{$menuRightBg} !important;
}
.header-bar{
  max-width:1200px;
  margin: 0 auto;
}
.right-menu{
  float: right;
  user-select: none;
}
.logo{
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 60px;
  font-size: 22px;
}
.user{
  margin-left: 20px;
}
.hr{
  margin:4px 0;
}
</style>
