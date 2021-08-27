<template>
  <div>
    <n-menu mode="horizontal"  @update:value="handleUpdateValue" inverted :options="menuOptions" />
  </div>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import { NIcon } from 'naive-ui'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
  SettingsOutline as SettingIcon
} from '@vicons/ionicons5'
import router from '../router'

function renderIcon (icon:any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const menuOptions = [
  {
    label: '仪表盘',
    key: '/dashboard',
    // icon: renderIcon(BookIcon)
  },
  {
    label: '系统设置',
    key: '/settings/index',
    icon: renderIcon(SettingIcon),
  },
  {
    label: '帖子',
    key:'/post/index',
    icon: renderIcon(BookIcon),
    children:[
      {
        label:'帖子列表',
        key:'/post/index'
      }
    ]
  },
  // {
  //   label: '舞，舞，舞',
  //   key: 'dance-dance-dance',
  //   icon: renderIcon(BookIcon),
  //   children: [
  //     {
  //       type: 'group',
  //       label: '人物',
  //       key: 'people',
  //       children: [
  //         {
  //           label: '叙事者',
  //           key: 'narrator',
  //           icon: renderIcon(PersonIcon)
  //         },
  //         {
  //           label: '羊男',
  //           key: 'sheep-man',
  //           icon: renderIcon(PersonIcon)
  //         }
  //       ]
  //     },
  //     {
  //       label: '饮品',
  //       key: 'beverage',
  //       icon: renderIcon(WineIcon),
  //       children: [
  //         {
  //           label: '威士忌',
  //           key: 'whisky'
  //         }
  //       ]
  //     },
  //     {
  //       label: '食物',
  //       key: 'food',
  //       children: [
  //         {
  //           label: '三明治',
  //           key: 'sandwich'
  //         }
  //       ]
  //     },
  //     {
  //       label: '过去增多，未来减少',
  //       key: 'the-past-increases-the-future-recedes'
  //     }
  //   ]
  // }
]
export default defineComponent({
  setup() {
  const handleUpdateValue = function(key:string,old:any):void{
        router.currentRoute.value.path!=key&&router.push(key as any)
      }
  return {
    menuOptions,
    handleUpdateValue,
  };
},
});
</script>

<style scoped>

</style>