<template>
	<div class="login_page">
		<!-- 登录界面 -->
		<div class="login_main" v-if="showLogin">
			<div class="item">
				<input
					type="text"
					placeholder="用户名"
					v-model="login.username"
				/>
			</div>
			<div class="item">
				<input
					type="password"
					placeholder="密码"
					v-model="login.password"
				/>
			</div>
			<div class="item">
				<van-button type="info" size="small" plain  @click="showLogin=false"
					>去注册</van-button
				>
				<van-button type="info" size="small" @click="loginHandle"
					>登录</van-button
				>
			</div>
		</div>
		<!-- 注册界面 -->
		<div class="register_main" v-else>
			<div class="item">
				<input
					type="text"
					placeholder="用户名"
					v-model="register.username"
				/>
			</div>
			<div class="item">
				<input
					type="password"
					placeholder="密码"
					v-model="register.password"
				/>
			</div>
			<div class="item">
				<input
					type="password"
					placeholder="确认密码"
					v-model="register.password_confirm"
				/>
			</div>
			<div class="item">
				<van-button type="info" size="small" plain  @click="showLogin=true"
					>去登陆</van-button
				>
				<van-button type="info" size="small" @click="registerHandle"
					>注册</van-button
				>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			login: {
				username: 'Van',
				password: '1111',
			},
			register: {
				username: 'Van',
				password: '1111',
				password_confirm: '1111',
			},
			showLogin:true
		}
	},
	created() {},
	methods: {
		//注册按钮
		registerHandle(){
      console.log(21341234)
			if (!this.register.username || !this.register.password|| !this.register.password_confirm) {
				this.$toast('注册的三项都必填')
				return
			}
			if(this.register.password.trim()!=this.register.password_confirm.trim()){
				this.$toast('密码和确认密码不一致')
				return
			}
			this.$http.post('/user/save', this.register).then((res) => {
				this.$toast(res.msg)
				if (res.code == 200) {
					this.showLogin=true
				}
			})
		},
		//登录按钮
		loginHandle() {
			if (!this.login.username || !this.login.password) {
				this.$toast('用户名和密码必填')
				return
			}
			this.$http.post('/user/login', this.login).then((res) => {
				this.$toast(res.msg)
				if (res.code == 200) {
					this.$LS.save('token',res.token);
					this.$LS.save('user_info',res.data);
					this.$store.commit('SET_USER_INFO',res.data)
					if(this.$route.query.redirect){
						this.$router.replace(this.$route.query.redirect)
					}else{
						this.$router.push('/')
					}
				}
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.login_page {
	width: 100vw;
	height: 100vh;
	background: linear-gradient(to bottom, #51c4d3 0%, #57c3c2 100%);
	position: relative;
	.login_main,.register_main {
		width: 80%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		.item {
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			margin-bottom: 20px;
			input {
				width: 100%;
				padding: 15px;
				border: none;
			}
		}
	}
}
</style>
