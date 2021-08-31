import { App } from 'vue'

import {
  ElButton,
  ElLoading,
  ElTable,
  ElTableColumn,
} from 'element-plus'

const components = [ElButton, ElTable, ElTableColumn]

const plugins = [ElLoading]

export function useElementPlus(app: App) {
  components.forEach(component => {
    app.component(component.name, component)
  })
  plugins.forEach(plugin => {
    app.use(plugin)
  })
}
