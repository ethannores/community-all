import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
//全局样式
import './styles/base.scss'
const app = createApp(App)

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
  ],
})
app.use(naive)
app.use(router)

app.mount('#app')
