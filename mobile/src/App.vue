<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
	name:'App',
	created() {
		this.initPage();

	},
	methods: {
		initPage() {
			if(this.$store.state.user_info._id){
				//userid存在的话则去链接socket
				//接收服务端相对应的webdata数据
				this.$io.on("message", data => {
					// this.massage = data.id
					this.$store.commit("ADD_NUM", 1)
					if (this.$route.path.indexOf("message") == -1) {
						this.$toast("收到一条新消息，请去消息中心查看")
					}
					// this.$io.close()
				})
        console.log(this.$io)
				//io获取用户未读消息数
				this.$io.emit("login", {
					user_id: this.$store.state.user_info._id,
				})
				this.$io.on("login", data => {
					console.log("login", data)
					this.$store.commit("SET_UNREAD", data.unread)
					if(data.unread!=0 && this.$route.path.indexOf("message") == -1){
						this.$toast(` ${data.unread} 条未读消息，请去消息中心查看`)
					}
				})
			}
		}
	},
	watch: {
		'$store.state.user_info'(newValue, oldValue) {
			this.initPage()
		}
	},
}
</script>
<style lang="scss">
</style>
