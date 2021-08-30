<template>
  <div>
    <!-- 顶部搜索栏 -->
    <n-form inline :label-width="80" :model="params" size="small" ref="formRef">
      <n-form-item label="关键词" path="user.name">
        <n-input v-model:value="params.keyword" placeholder="输入关键词" />
      </n-form-item>
      <n-form-item>
        <n-space>
          <n-button @click="searchHandle" attr-type="button">搜索</n-button>
          <n-button @click="showModal=true" type="primary">新建</n-button>
        </n-space>
      </n-form-item>
    </n-form>
    <!-- 表格主体 -->
    <n-data-table
      :single-line="false"
      size="small"
      :columns="columns"
      :data="listData"
      :pagination="pagination"
    />
    <!-- 模块框弹出新增/编辑 -->
    <n-modal v-model:show="showModal">
      <n-card style="width: 600px;" title="新增/编辑分类" :bordered="false" size="huge">
        <template #header-extra> </template>
        <n-form :label-width="80" :model="editParams" size="small" ref="formRef">
          <n-form-item label="分类名" path="user.name">
            <n-input v-model:value="editParams.title" placeholder="输入分类名" />
          </n-form-item>
          <n-form-item label="上级分类" path="user.name">
            <n-cascader v-model:value="editParams.pid" placeholder="选择上级分类，不选则为顶级分类" :expand-trigger="'click'"
              :options="[]" :cascade="true" :leaf-only="false" :show-path="true" :filterable="false" />
          </n-form-item>
          <n-form-item label="分类描述" path="user.name">
            <n-input v-model:value="editParams.description" type="textarea" placeholder="输入分类名" />
          </n-form-item>
        </n-form>
        <template #footer>
          <n-space>
            <n-button @click="addOrEditSubmit" type="primary">保存</n-button>
            <n-button @click="showModal=false">取消</n-button>
          </n-space>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch,getCurrentInstance,h } from "vue"
import {isEmpty} from 'lodash'
import { NButton } from "naive-ui"

export default defineComponent({
  setup() {
    const {proxy} = getCurrentInstance()
    let showModal = ref(false);
    let listData = ref([])
    let pagination=ref({
      pageSize: 10
    })
    let params = ref({
      keyword: "",
      page:1,
      limit:20
    })
    let editParams = ref({
      title: "",
      pid: null,
      description: "",
      _id:''
    })
    //获取列表数据
    const getList = ()=>{
      proxy.$http.get('/category/list',{params:params.value}).then((res:any)=>{
        console.log(res);
        if(isEmpty(res.data)){
          listData.value=[];
        }else{
          listData.value=res.data;
        }
        
      })
    }
    getList();
    //定义编辑
    const openEditHandle = (data:any)=>{
      console.log(data)
      editParams.value.title=data.title;
      editParams.value.pid=data.pid;
      editParams.value._id=data._id;
      editParams.value.description=data.description;
      showModal.value=true;
    }
    const columns = [
      {title:'title',key:'title'},
      {title:'父分类',key:'pid',render(row:any){
        let str = row.pid?row.pid:'无'
        return str
      }},
      {title:'description',key:'description',render(row:any){
        let str = row.description?row.description:'无'
        return str
      }},
      {title:'操作',key:'操作',render(row:any){
        return h(NButton,{size:'small',type:'primary',onClick:()=>openEditHandle(row)},{default:()=>'编辑'})
      }},
    ]
    watch(
      () => showModal.value,
      (newVal, oldVal) => {
        if (!newVal) {
          editParams.value = {
            title: "",
            pid: null,
            description: "",
            _id:''
          }
        }
      }
    )

    let searchHandle = () => {}
    //点击用户提交
    let addOrEditSubmit = () => {
      console.log(editParams.value);
      if(!editParams.value.title){
        (window as any).$message.error('分类名必填！');
        return
      }
      proxy.$http.post('/category/save',editParams.value).then((res:any)=>{
        if(res.code==200){
          (window as any).$message.success(res.msg);
          editParams.value = {
            title: "",
            pid: null,
            description: "",
            _id:''
          }
          showModal.value=false;
          getList()
        }
        console.log(res)
      })
    }
    return {
      columns,
      pagination,
      listData,
      showModal,
      params,
      searchHandle,
      editParams,
      addOrEditSubmit,
    }
  },
})
</script>

<style scoped>
</style>