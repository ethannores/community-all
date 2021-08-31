<template>
  <div class="tinymce-box">
    <Editor v-model="contentValue" :init="init" :disabled="disabled" />
  </div>
</template>

<script lang="ts" setup>
import Editor from "@tinymce/tinymce-vue"
import tinymce from "tinymce/tinymce"
import "tinymce/themes/silver"
import "tinymce/icons/default"
import "tinymce/plugins/advlist"
import "tinymce/plugins/anchor"
import "tinymce/plugins/autolink"
import "tinymce/plugins/autoresize"
import "tinymce/plugins/autosave"
import "tinymce/plugins/charmap"
import "tinymce/plugins/code"
import "tinymce/plugins/codesample"
import "tinymce/plugins/directionality"
import "tinymce/plugins/emoticons"
import "tinymce/plugins/fullpage"
import "tinymce/plugins/fullscreen"
import "tinymce/plugins/help"
import "tinymce/plugins/hr"
import "tinymce/plugins/image"
import "tinymce/plugins/importcss"
import "tinymce/plugins/insertdatetime"
import "tinymce/plugins/link"
import "tinymce/plugins/lists"
import "tinymce/plugins/media"
import "tinymce/plugins/nonbreaking"
import "tinymce/plugins/pagebreak"
import "tinymce/plugins/paste"
import "tinymce/plugins/preview"
import "tinymce/plugins/print"
import "tinymce/plugins/quickbars"
import "tinymce/plugins/save"
import "tinymce/plugins/searchreplace"
import "tinymce/plugins/tabfocus"
import "tinymce/plugins/table"
import "tinymce/plugins/template"
import "tinymce/plugins/textcolor"
import "tinymce/plugins/textpattern"
import "tinymce/plugins/toc"
import "tinymce/plugins/visualblocks"
import "tinymce/plugins/visualchars"
import "tinymce/plugins/wordcount"
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  watch,
} from "vue"

let props = defineProps({
  value: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  plugins: {
    type: [String, Array],
    default:
      "print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern autosave ",
  },
  toolbar: {
    type: [String, Array],
    default:
      "fullscreen undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
              styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
              table image media charmap emoticons hr pagebreak insertdatetime print preview | code selectall | indent2em lineheight formatpainter axupimgs",
  },
})
let contentValue = ref(props.value)
let init = {
  language_url: "/tinymce/langs/zh_CN.js", //引入语言包文件
  language: "zh_CN", //语言类型
  skin_url: "/tinymce/skins/ui/oxide", //皮肤：浅色
  content_css: "../../tinymce/skins/content/default/content.css",
  // skin_url: '/tinymce/skins/ui/oxide-dark',//皮肤：暗色
  plugins: props.plugins, //插件配置
  toolbar: props.toolbar, //工具栏配置，设为false则隐藏
  // menubar: 'file edit',  //菜单栏配置，设为false则隐藏，不配置则默认显示全部菜单，也可自定义配置--查看 http://tinymce.ax-z.cn/configure/editor-appearance.php --搜索“自定义菜单”
  fontsize_formats:
    "12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px", //字体大小
  font_formats:
    "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",
  height: 500, //注：引入autoresize插件时，此属性失效
  placeholder: "在这里输入文字",
  branding: false, //tiny技术支持信息是否显示
  resize: false, //编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
  // statusbar: false,  //最下方的元素路径和字数统计那一栏是否显示
  elementpath: false, //元素路径是否显示
  content_style: "img {max-width:100%;}", //直接自定义可编辑区域的css样式
  // content_css: '/tinycontent.css',  //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入

  // images_upload_url: '/demo/upimg.php',  //后端处理程序的url
  // images_upload_base_path: '/demo',  //相对基本路径--关于图片上传建议查看--http://tinymce.ax-z.cn/general/upload-images.php
  // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
  // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
  images_upload_handler: (
    blobInfo: any,
    success: any,
    failure: any
  ) => {
    const img = "data:image/jpeg;base64," + blobInfo.base64()
    success(img)
  },
}
let { proxy } = getCurrentInstance()
onMounted(() => {
  tinymce.init({})
})
watch(
  () => props.value,
  (newVal: any) => {
    contentValue.value = newVal
  }
)
watch(
  () => contentValue.value,
  (newVal: any) => {
    proxy.$emit("input", newVal)
  }
)
</script>

<style lang="scss">
.tinymce-box {
}
</style>