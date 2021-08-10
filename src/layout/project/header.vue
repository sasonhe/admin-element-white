<template>
  <el-header style="height:60px">
    <div class="left-menu">
      <div class="admin-logo">
        <img :src="`${$baseUrl}login/5dov.png`" fit="scale-down"/>
      </div>
      <!-- <h1 class="big-title">标题</h1> -->
    </div>
    <hamburger :toggle-click="toggleSideBar" :is-active="isCollapse"  class="hamburger-container"/>
    <div class="right-menu">
      <span v-if="isMobile !== 'mobile'" style="padding:0 15px"><screenfull class="right-menu-item hover-effect"/></span>
      <span v-if="isMobile !== 'mobile'" style="padding:0 15px"><i class="el-icon-user" /> 姓名</span>
      <span v-if="isMobile !== 'mobile'" style="padding:0 15px"><i class="el-icon-lock" /> 100000</span>
      <!-- <span v-if="isMobile !== 'mobile'" style="padding:0 15px">
        <el-link :underline="false" @click="goToback()"><i class="el-icon-back" /> 返回上层</el-link>
      </span> -->
      <span  style="padding:0 15px">
        <el-link :underline="false" @click="logout()"><i class="el-icon-unlock" /> 退出登录</el-link>
      </span>
    </div>
  </el-header>
</template>

<script>
  import Hamburger from '@/components/Hamburger'
  import Screenfull from '@/components/Screenfull'
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {

      }
    },
    created() {
    },
    methods: {
      goToback(){
        this.$router.push({
          path: '/'
        })
      },
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      logout() {
        this.$confirm(this.$t('publics.confirm.confirmContent'), this.$t('publics.confirm.confirmTitle'), {
          confirmButtonText: this.$t('publics.confirm.confirmOk'),
          cancelButtonText: this.$t('publics.confirm.confirmCancel'),
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
    computed: {
      ...mapGetters([
        'sidebar',
        'device',
      ]),
      isCollapse() {
        return !this.sidebar.opened
      },
      isMobile() {
        return this.device
      }
    },
    mounted(){

    },
    components:{
      Hamburger,Screenfull
    }
  }
</script>

<style>
.big-title{
  margin: 0;
  font-size: 16px;
  text-align: center;
  color: #303133;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 10px;
}
.el-header {
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #ddd;;
  color: #606266;
  line-height: 56px;
  padding-left: 0;
  padding-right: 8px;
}
.mtitle{
  display:inline-block;
  padding: 0 20px;
  font-size: 16px;
  font-weight: bold;
  color: #606266;
}
.hamburger-container {
  line-height: 52px !important;
  height: 100%;
  float: left;
  cursor: pointer;
  transition: background .3s;
}
.hamburger-container:hover {
  background: rgba(0, 0, 0, .025)
}
.left-menu{
  width: 220px;
  height: 100%;
  overflow: hidden;
  float: left;
  transition: .28s;
}
.right-menu {
  float: right;
  display: flex;
  align-items: center
}

.right-menu .el-dropdown-link {
  cursor: pointer;
  font-size: 16px;
}
.right-menu .el-icon-arrow-down {
  font-size: 18px;
}
.right-menu .el-dropdown{
  color: #606266;
}
.hideSidebar .left-menu {
  width: 60px;
}

.mobile .left-menu {
  width: 0;
  display: none;
}
.admin-logo{
  padding: 6px;
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing:border-box;
}
.admin-logo img{
  height: 100%;
  margin: 0 auto;
  align-items: center;
}
</style>
