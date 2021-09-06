<template>
	<view>
		<view class="top">
			<text>可向APP征求所需的书或给出宝贵的建议</text>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					当前选择
				</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="myImg" @click="myImage">上传示例图片</view>
		<view class="uni-textarea">
			<textarea @blur="bindTextAreaBlur" maxlength="15" class="Mytext" />
		</view>
		<button class="btn" @click="MyBtn">提交</button>
		<image :src="img"></image>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				MyData: '',
				array: ['书籍', '建议'],
				index: 0,
				category: '书籍',
				JerryImg: [],
				img:''
			}
		},
		computed: {
			...mapState(['username', 'usernameId'])
		},
		methods: {
			myImage() {
				let that = this;
				uni.chooseImage({ //选择图片
					count: 3,
					sizeType: ["compressed"],
					success(res) {
						console.log(res,'22222')
						for (let i = 0; i < res.tempFilePaths.length; i++) {
							let obj = new Object();
							obj.name = `file` + (i);
							obj.uri = res.tempFilePaths[i];
							that.JerryImg.push(obj);
							obj = null;
						}
					}
				})
				console.log(that.JerryImg[0]) 
			},
			bindPickerChange: function(e) {
				this.index = e.target.value;
				if (JSON.stringify(e.target.value) === '1') {
					this.category = '建议';
				}
			},
			bindTextAreaBlur: function(e) {
				this.MyData = e.detail.value;
			},
			MyBtn() {
				let that = this;
				if (this.MyData === '') {
					uni.showModal({
						title: '您还未填写反馈',
					})
				} else {
					uni.showModal({
						title: '确定发送嘛？',
						success(res) {
							if (res.confirm) {
								uni.uploadFile({ //上传代码
									url: 'http://175.24.116.94:8082/api/addAdvice?MyData=' + that
										.MyData +
										'&usernameId=' + that.usernameId + '&cate=' + that
										.category + '&username=' + that.username,
									files: that.JerryImg,
									name: 'file',
									formData: {
										userId: '123456',
										Id: '654321',
										type: true,
									},
									success: function(res) {
										uni.redirectTo({
											url:'../center/center'
										})
									},
									file: function(err) {
										console.log(err)
									}
								})
							} else {
								return;
							}
						}
					})
				}
			},
		},
		onShow() {
			if (this.username === '') {
				uni.showModal({
					title: '您还未登录',
					confirmText: '去登陆',
					showCancel: false,
					success(res) {
						if (res.confirm) {
							uni.switchTab({
								url: '../profile/profile'
							})
						} else {
							uni.switchTab({
								url: '../profile/profile'
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #EEEEEE;
	}

	.myImg {
		background-color: white;
		margin-top: 5px;
		font-size: 20px;
	}

	.uni-list-cell {
		.uni-list-cell-left {
			background-color: white;
			font-size: 20px;
		}

		.uni-list-cell-db {
			margin-top: 5px;
			background-color: white;
			color: red;
			font-size: 20px;
		}

	}

	.Mytext {
		background-color: #FFFFFF;
		width: 100%;
		height: 150px;
		margin-top: 80px;
	}

	.btn {
		color: white;
		background-color: #0000ff;
		font-size: 20px;
	}

	.top {
		width: 100%;
		height: 50px;
		text-align: center;
		color: blue;
		font-size: 18px;
	}
</style>
