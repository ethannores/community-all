<template>
	<div>
		<van-tabbar route>
			<van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
			<!-- <van-tabbar-item to="/community" icon="smile-o">社区</van-tabbar-item> -->
			<van-tabbar-item to="/message" icon="chat-o" :dot="$store.state.unread_number!=0">消息</van-tabbar-item>
			<van-tabbar-item to="/my" icon="user-o">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
export default {
	data() {
		return {
			active: 'home',
		}
	},
}
</script>

<style lang="scss" scoped></style>
