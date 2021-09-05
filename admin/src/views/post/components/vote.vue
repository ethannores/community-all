<template>
  <div>
    <el-dialog width="80%" title="投票管理" v-model="voteShow" @close="$emit('close')" :close-on-click-modal="false"
      :close-on-press-escape="false">
      <el-form :inline="true" label-width="80px">
        <el-form-item label="用户提供">
          <el-radio v-model="voteSetData.user_upload" :label="1">禁止</el-radio>
          <el-radio v-model="voteSetData.user_upload" :label="2">允许</el-radio>
        </el-form-item>
        <el-form-item label="每人几票">
          <el-input type="number" v-model="voteSetData.limit" min="1" step="1"></el-input>
        </el-form-item>
        <el-form-item label="投票时间">
          <el-date-picker v-model="voteSetData.time" type="datetimerange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="addDetailHandle">添加投票条目</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="voteSetData.items" border>
        <el-table-column label="上传用户">
          <template #default="scope">
            <div>
              {{scope.row.user}}({{scope.row.provider}})
            </div>
          </template>
        </el-table-column>
        <el-table-column label="图片">
          <template #default="scope">
            <div>
              <img :src="scope.row.img" alt="" width="50px" v-if="scope.row.img">
              <el-icon v-else>
                <edit></edit>
              </el-icon>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="描述">
          <template #default="scope">
            <el-input type="textarea" v-model="scope.row.description"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="投票人数">
          <template #default="scope">
            {{scope.row.vote_number?scope.row.vote_number:0 }}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <el-select v-model="scope.row.status">
              <el-option label="允许投票" :value="1"></el-option>
              <el-option label="禁止投票" :value="2"></el-option>
              <el-option label="投票不可见" :value="3"></el-option>
              <el-option label="待审核" :value="4"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="text" style="color:#e4393c">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <div>
          <el-button type="primary" @click="saveHandle">保存</el-button>
          <el-button @click="$emit('close')">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue"
import { useStore } from "vuex"
import { Edit } from "@element-plus/icons"
import { saveVoteRule, fetchVoteRule } from "@/api/post"
import { ElMessage } from "element-plus"
export default defineComponent({
  components: {
    Edit,
  },
  props: {
    voteShow: {
      type: Boolean,
      default: false,
    },
    currData: {
      type: Object,
      default: {},
    },
  },
  setup(props) {
    let voteSetData = ref({
      user_upload: 1,
      time: [],
      limit: 1,
      items: [],
      post_id:''
    })
    const store = useStore()
    //点击添加投票条目
    const addDetailHandle = () => {
      voteSetData.value.items.push({
        user: store.state.user.username,
        provider: store.state.user._id,
        img: "",
        description: "",
        vote_number: 0,
        status: 1,
        post_id:props.currData._id
      } as never)
    }
    //请求获取投票条目信息
    //获取帖子相关规则信息
    const getVoteRule = () => {
      fetchVoteRule({post_id:props.currData._id}).then(res => {
        voteSetData.value['user_upload']=res.data.user_upload;
        voteSetData.value['limit']=res.data.limit;
        voteSetData.value['post_id']=res.data.post_id;
        voteSetData.value['time']=[res.data.start_time,res.data.end_time];
        voteSetData.value['items']=res.items
      })
    }
    watch(()=>props.voteShow,(newVal)=>{
      if(newVal){
        getVoteRule()
      }
    })
    
    //保存规则
    const saveHandle = () => {
      if(!props.currData._id){
        ElMessage.error('未选择需要设置投票规则投票贴！');
        return
      }
      console.log(voteSetData.value)
      voteSetData.value.post_id = props.currData._id
      saveVoteRule(voteSetData.value).then(res => {
        console.log(res)
      })
    }
    return {
      voteSetData,
      addDetailHandle,
      saveHandle,
    }
  },
})
</script>

<style scoped>
</style>