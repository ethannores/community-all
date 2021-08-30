import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
//全局样式
import './styles/base.scss'
import http from './util/http'
const app = createApp(App)
app.config.globalProperties.$http = http
import {
  // create naive ui
  create,
  // component
  NButton,
  NSpace,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NRow,
  NCol,
  NMessageProvider,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NSwitch,
  NMenu,
  NUpload,
  NUploadDragger,
  NIcon,
  NP,
  NText,
  NRadio,
  NModal,
  NCascader,NTable,NDataTable
} from 'naive-ui'

const naive = create({
  components: [
    NButton,
    NSpace,
    NCard,
    NForm,
    NFormItem,
    NInput,
    NRow,
    NCol,
    NMessageProvider,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NSwitch,
    NMenu,
    NUpload,
    NUploadDragger,
    NIcon,
    NP,
    NText,
    NRadio,
    NModal,
    NCascader,NTable,NDataTable
  ],
})
app.use(naive)
app.use(router)
app.use(store)

app.mount('#app')
