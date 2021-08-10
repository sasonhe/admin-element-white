<template>
  <div class="rightBtn">
    <div class="en">
      <span @click="changeLang(0)">CN</span>
      <span @click="changeLang(1)">EN</span>
      <div class="line" :style="lang == 'zh'?'left:0;':'right:0;'">{{lang == 'zh' ? "CN":"EN"}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  inject:  ['reload'],
  data() {
    return {
      isEn:false
    }
  },
  methods: {
    changeLang(val) {
      let lang = 'zh'
      if(val) {
        this.$i18n.locale = 'en'
        lang = 'en'
      }else{
        this.$i18n.locale = 'zh'
        lang = 'zh'
      }
      this.$store.dispatch('user/setLang',lang)
      this.reload()
    }
  },
  computed:{
    ...mapGetters([
      'lang',
    ]),
  },
  watch:{

  }
}
</script>

<style scoped>
.rightBtn {
  display: flex;
  text-align: center;
  float: left;
  align-items: center;
  height: 60px;
}
.rightBtn:focus{
  outline: none;
}
.rightBtn .en {
  width: 50px;
  height: 16px;
  line-height: 18px;
  font-size: 12px;
  font-weight: bold;
  font-family: Times;
  border: 1px solid #fff;
  border-radius: 4px;
  position: relative;
}

.rightBtn .en span {
  display: inline-block;
  width: 25px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}

.line {
  display: inline-block;
  width: 25px;
  height: 100%;
  border-radius: 4px;
  background: #fff;
  position: absolute;
  transition: all .5s;
}
</style>
