<template>
  <div class="tinymce-editor">
    <editor v-model="myValue"
      :init="init"
      ref="tinymce"
      :disabled="disabled"
      @onClick="onClick">
    </editor>
  </div>
</template>
<script>
import { getLang } from '@/utils/auth'
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/icons/default/icons'
// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
//https://liubing.me/vue-tinymce-5.html
import 'tinymce/plugins/image'// 插入上传图片插件
import 'tinymce/plugins/media'// 插入视频插件
import 'tinymce/plugins/table'// 插入表格插件
import 'tinymce/plugins/lists'// 列表插件
import 'tinymce/plugins/wordcount'// 字数统计插件
import 'tinymce/plugins/fullscreen'// 全屏
import 'tinymce/plugins/preview'// 预览
import 'tinymce/plugins/link'// 超链接l
import 'tinymce/plugins/code'// 源代码
import 'tinymce/plugins/hr'// hr
import 'tinymce/plugins/charmap'//charmap
import 'tinymce/plugins/pagebreak'//pagebreak
import 'tinymce/plugins/insertdatetime'//insertdatetime

import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/template'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/help'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/autoresize'

import './lineheight' //行高
import './formatpainter' //格式刷
import fonts from './fonts'
import plugins from './plugins' // 插件
import toolbar from './toolbar' // 工具栏

import { mapGetters } from "vuex";
export default {
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    // 基本路径，默认为空根目录，如果你的项目发布后的地址为目录形式，
    // 即abc.com/tinymce，baseUrl需要配置成tinymce，不然发布后资源会找不到
    baseUrl: {
      type: String,
      default: process.env.BASE_URL
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: plugins
    },
    toolbar: {
      type: [String, Array],
      default: toolbar
    },
    minHeight: {
      type: Number,
      default: 400
    },
    menubar:{
      type:Boolean,
      default:true
    }
  },
  data () {
    return {
      init: {
        language_url: `${this.baseUrl}tinymce/langs/zh_CN.js`,
        language: getLang() =='en'?'en_US':'zh_CN',//语言（默认中文）
        skin_url: `${this.baseUrl}tinymce/skins/ui/oxide`,
        content_css: `${this.baseUrl}tinymce/skins/content/default/content.css`,
        body_class: 'panel-body ',
        min_height: this.minHeight,
        max_height: 650,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: this.menubar,
        toolbar_mode: 'sliding',
        force_br_newlines : true,
        force_p_newlines : false,
        font_formats: fonts,
        external_plugins: {
          'powerpaste': `${this.baseUrl}tinymce/plugins/powerpaste/plugin.min.js`,
          'emoticons' : `${this.baseUrl}tinymce/plugins/emoticons/plugin.min.js`,
          'indent2em' : `${this.baseUrl}tinymce/plugins/indent2em/plugin.min.js`,
        },
        // content_css:"*{margin: 0;padding:0}",
        powerpaste_word_import: 'propmt',// 参数可以是propmt, merge, clear，效果自行切换对比
        powerpaste_html_import: 'propmt',// propmt, merge, clear
        powerpaste_allow_local_images: true,
        paste_data_images: true,
        resize: true,
        // setup : function(ed){
        //   ed.on('init', function(){
        //     this.getDoc().body.style.fontSize = '18pt';//初始化默认字号
        //     // this.getDoc().body.style.fontFamily = 'Arial';
        //   });
        // },
        images_upload_handler: (blobInfo, success, failure) => {
          let formData = new FormData();
          formData.append('file', blobInfo.blob(), blobInfo.filename())
          this.uploadImg(formData).then(url => {
            success(url)
          })

        },
      },
      myValue: this.value
    }
  },
  mounted () {
    tinymce.init({})
  },
  methods: {
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    // 需要什么事件可以自己增加
    onClick (e) {
      this.$emit('onClick', e, tinymce)
    },
    // 可以添加一些自己的自定义事件，如清空内容
    clear () {
      this.myValue = ''
    },
    //图片上传方法
    uploadImg(formData){
      return this.$http.upload.uploadImage(formData,1).then(res => {
        if(res.code === 200) {
          const { deleteUrl, imageUrl } = res.data
          this.$message.success(this.$t('publics.successful'));
          return imageUrl
        }else{
          return ''
        }
      }).catch(err => {

      })
    },
  },
  computed: {

  },
  watch: {
    value (newValue) {
      this.myValue = newValue
    },
    myValue (newValue) {
      this.$emit('input', newValue)
    },
  }
}
</script>
<style>
.tox-fullscreen .tox.tox-tinymce.tox-fullscreen {
  z-index: 5000 !important;
}
.tox-fullscreen .tox.tox-tinymce-aux{
  z-index: 6000 !important;
}
.tox-tinymce-aux{
  z-index: 6000 !important;
}
</style>
