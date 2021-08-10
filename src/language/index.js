import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '@/store'
import ElementLocale from 'element-ui/lib/locale'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

import langZh from "./zh"
import langEN from "./en"

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: store.state.user.lang,
  messages: {
    'zh': {...langZh,...zhLocale},
    'en': {...langEN,...enLocale}
  }
})
ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n
