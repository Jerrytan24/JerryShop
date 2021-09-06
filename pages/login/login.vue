<template>
	<view class="sun-index">
		<view class="sun-logo-box">
			<view class="sun-logo">
				<image class="sun-icon-img" src="../../static/imgs/fire_white.png" />
			</view>
		</view>
		<view class="sun-login-box">
			<view class="sun-label">
				<image style="width: 28rpx;height:39rpx;" src="../../static/imgs/mobile_icon.png" />
				<text class="label-text">手机</text>
			</view>
			<view class="sun-input-box">
				<input v-model="mobile" type="number" placeholder="请输入手机" placeholder-class="placeholder-class" />
				<image @click="mobile=''" class="close-icon" src="../../static/imgs/close_icon.png" />
			</view>
		</view>
		<view class="sun-login-box">
			<view class="sun-label">
				<image style="width: 29rpx;height:37rpx;" src="../../static/imgs/pwd_icon.png" />
				<text class="label-text">密码</text>
			</view>
			<view class="sun-input-box">
				<input v-model="password" type="text" placeholder="请输入密码" placeholder-class="placeholder-class" />
				<image @click="password=''" class="close-icon" src="../../static/imgs/close_icon.png" />
			</view>
		</view>
		<view class="sun-tip">
			<text class="sun-tip-text">忘记密码/解绑</text>
			<text class="sun-tip-text" @click="goRegister">注册</text>
		</view>
		<view class="login-btn-box">
			<view class="login-btn" @click="handleSubmit">登录</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				password: '',
			}
		},
		methods: {
			getUser(mobile, password) {
				let that = this;
				uni.request({
					url: 'http://175.24.116.94:8082/api/getUser?password=' + password + '&iphone=' + mobile,
					method: 'GET',
					success(res) {
						if (JSON.stringify(res.data) !== "[]") {
							uni.showToast({
								title: '登录成功',
								duration: 1500
							})
							that.$store.dispatch('user',res.data[0].user_name);
							that.$store.dispatch('userId',res.data[0].user_id);
							uni.reLaunch({
								url:'../sell/sell'
							})
						}
					},
					fail() {
						uni.showToast({
							title: '账号或密码错误',
							duration: 2500
						})
						return;
					}
				})

			},
			handleSubmit() {
				if (!this.mobile) return uni.showToast({
					title: '请输入手机',
					icon: 'none',
					duration: 1500
				})
				if (!this.password) return uni.showToast({
					title: '请输入密码',
					icon: 'none',
					duration: 1500
				})
				// uni.showToast({title: '登录成功',duration: 1500})
				if (this.password.length < 8 || this.password.length > 12 || this.mobile.length < 6 || this.mobile.length >
					12) {
					return uni.showToast({
						title: '密码长度应该在8到12,手机的长度应该在6到12',
						icon: 'none',
						duration: 1500
					})
				}
				this.getUser(this.mobile, this.password)
			},
			goRegister() {
				uni.navigateTo({
					url: '../resgist/regist'
				})
			}
		}
	}
</script>

<style scoped>
	.sun-logo-box {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 750rpx;
		height: 300rpx;
	}

	.sun-logo {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 180rpx;
		height: 180rpx;
		border-radius: 15rpx;
		background-color: #412ffe;
		box-shadow: 0rpx 0rpx 30rpx rgba(18, 200, 185, 0.5);
	}

	.close-icon {
		width: 36rpx;
		height: 34rpx;
	}

	.sun-icon-img {
		width: 120rpx;
		height: 120rpx;
	}

	.sun-login-box {
		padding: 20rpx 60rpx;
	}

	.sun-label {
		display: flex;
		align-items: center;
	}

	.label-text {
		margin-left: 16rpx;
		font-weight: 500;
		color: #272e2d;
		font-size: 30rpx;
	}

	.sun-input-box {
		display: flex;
		align-items: center;
		height: 100rpx;
		border-bottom: 1rpx solid #eee;
		padding: 0px 10rpx;
	}

	.sun-input-box input {
		flex: 1;
	}

	.placeholder-class {
		font-size: 30rpx;
		color: #C0C0C0;
	}

	.sun-tip {
		display: flex;
		justify-content: space-between;
		padding: 0rpx 68rpx;
	}

	.sun-tip-text {
		color: #412ffe;
	}

	.login-btn-box {
		position: absolute;
		bottom: 129rpx;
		left: 0;
		width: 100%;
		padding: 50rpx 68rpx 0rpx;
	}

	.login-btn {
		height: 82rpx;
		border-radius: 41rpx;
		background-color: #412ffe;
		box-shadow: -1px 12px 11px 0px rgba(16, 170, 157, 0.4);
		text-align: center;
		width: 80%;
		line-height: 82rpx;
		font-size: 36rpx;
		font-weight: 500;
		color: #fff;
	}
</style>
