<template>
  <div class="err-wrapper">
    <div class="errPage-container">
      <el-button icon="el-icon-arrow-left" type="primary" @click="back">返回</el-button>
      <el-row>
        <el-col :span="12">
          <h1 class="text-jumbo text-ginormous">
            401错误
          </h1>
          <h2>你没有权限去该页面</h2>
          <!-- <ul class="list-unstyled">
            <li>或者你可以去:</li>
            <li class="link-type">
              <router-link to="/">
                回首页
              </router-link>
            </li>
          </ul> -->
        </el-col>
        <el-col :span="12">
          <img :src="errGif" width="313" height="428" alt="401">
        </el-col>
      </el-row>
      <!-- <el-dialog :visible.sync="dialogVisible" title="随便看">
        <img :src="ewizardClap" class="pan-img">
      </el-dialog> -->
    </div>
  </div>
</template>

<script>
import errGif from '@/assets/error/401.gif'
export default {
  name: 'page401',
  data() {
    return {
      errGif: errGif + '?' + +new Date(),
      ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
      dialogVisible: false
    }
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/dashboard' })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .err-wrapper{
    background: #fff;
    position: absolute;
    top: 4px;
    width: 100%;
    bottom: 0;
  }
  .errPage-container {
    width: 800px;
    max-width: 100%;
    margin: 100px auto;
    .pan-gif {
      margin: 0 auto;
      display: block;
    }
    .pan-img {
      display: block;
      margin: 0 auto;
      width: 100%;
    }
    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }
    .list-unstyled {
      font-size: 14px;
      li {
        padding-bottom: 5px;
      }
      a {
        color: #008489;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
