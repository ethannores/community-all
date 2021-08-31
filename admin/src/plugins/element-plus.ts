import { App } from 'vue'

import {
  ElButton,
  ElLoading,
  ElTable,
  ElTableColumn,
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElSelect,
  ElOption,
  ElCascader,
  ElDialog
} from 'element-plus'

const components = [ElButton, ElTable, ElTableColumn,ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElSelect,
  ElOption,
  ElCascader,ElDialog]

const plugins = [ElLoading]

export function useElementPlus(app: App) {
  components.forEach(component => {
    app.component(component.name, component)
  })
  plugins.forEach(plugin => {
    app.use(plugin)
  })
}
