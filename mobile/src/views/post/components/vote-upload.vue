<template>
  <div>
    <van-field v-model="description" rows="3" required label="描述" type="textarea" placeholder="填入描述" maxlength="50"
      show-word-limit />
    <van-field name="uploader" label="图片">
      <template #input>
        <van-uploader v-model="img"  :max-count="1" />
      </template>
    </van-field>
    <van-field label="操作">
      <template #input>
       <van-button type="primary" size="mini" @click="uploadHandle">上传</van-button>
      </template>
    </van-field>
  </div>
</template>

<script>
import {voteUpload} from '@/api/post'
export default {
  props:{
    post_id:{
      type:String,
      default:()=>''
    }
  },
  data() {
    return {
      description: "",
      img: [],
      user_id:this.$store.state.user_info._id
    }
  },
  methods: {
    uploadHandle() {
      let fd = new FormData();
      fd.append('post_id',this.post_id);
      fd.append('description',this.description);
      fd.append('img',this.img[0]['file']);
      fd.append('provider',this.user_id);
      fd.append('status',2);
      voteUpload(fd).then(res=>{
        if(res.code==200){
          this.description='';
          this.img=[];
          this.$emit('closed');
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
</style>