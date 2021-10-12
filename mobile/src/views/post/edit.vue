<template>
  <div class="main">
    <top-nav>
      <template #title>
        <span>
          新增/编辑
        </span>
      </template>

    </top-nav>
    <div class="post_edit">
      <van-field name="uploader" label="封面">
        <template #input>
          <van-uploader v-model="face_image" :max-count="1" :after-read="(file) => uploadFile(file, 'face_image')" />
        </template>
      </van-field>
      <van-field v-model="post.title" label="标题" placeholder="请输入帖子标题" />
      <Edit :value="post.content" @changeContent="changeContent"></Edit>
      <van-uploader v-model="fileList" multiple :max-count="9" :after-read="(file) => uploadFile(file, 'fileList')"
        class="images_upload" />
      <van-button block type="primary" size="small" @click="submit">提交</van-button>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/TopNav"
import Edit from "@/components/Edit"
import { fetchDetail } from "@/api/post"
import { uploadImages } from "@/api/util"
export default {
  components: {
    Edit,
    TopNav,
  },
  data() {
    return {
      face_image: [],
      post: {
        title: "",
        content: "",
        category: "",
        type: "",
        imgs: [],
        face_img: "",
      },
      id: this.$route.params.id,
      fileList: [],
      user_id: this.$store.state.user_info._id,
    }
  },
  created() {
    if (this.id && this.id != 0) {
      this.getDetailById()
    }
  },
  methods: {
    //编辑帖子时获取数据初始化
    getDetailById() {
      fetchDetail({ _id: this.id }).then(res => {
        // if (this.user_id != res.data.author._id) {
        //   this.$toast("不允许修改别人的帖子")
        //   this.$router.go(-1)
        // }
        this.post = res.data
        res.data.imgs.map(e => {
          this.fileList.push({
            url: e,
          })
        })
        this.face_image.push({
          url: res.data.face_img,
        })
      })
    },
    //帖子提交事件
    submit() {
      if (!this.post.title || !this.post.content) {
        this.$toast("帖子标题和帖子内容均必填！")
        return
      }
      this.post.type = 2
      this.post.category = "612c9da3a38c5aec3c427e28"
      this.post.face_img = this.face_image[0]?.url
        ? this.face_image[0].url
        : ""
      this.post.imgs =
        this.fileList.length > 0 ? this.fileList.map(e => e.url) : []
      this.$http.post("/post/save", this.post).then(res => {
        this.$toast(res.msg)
        if (res.code == 200) {
          this.$router.go(-1)
        }
      })
    },
    //上传图片
    uploadFile(file, type) {
      let FD = new FormData()
      if (file.length) {
        //多图
        file.map((e, i) => {
          FD.append("files", e.file)
        })
      } else {
        //单图
        FD.append("files", file.file)
      }
      uploadImages(FD).then(res => {
        console.log(res)
        if (res.data.length) {
          this[type] = this[type].filter(e => e.url)
          res.data.map(e => {
            this[type].push({
              url: e,
            })
          })
          console.log(type,this[type])
        }
      })
    },
    //富文本实时编辑
    changeContent(data) {
      this.post.content = data
    },
  },
}
</script>

<style lang="scss" scoped>
.post_edit {
  padding: 20px;
  height: 100%;
  width: 100%;
  background-color: white;
  .images_upload {
    margin-top: 20px;
  }
}
</style>
