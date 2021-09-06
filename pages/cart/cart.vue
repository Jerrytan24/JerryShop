<template>
	<view>
		<view v-for="item in MyData" :key='item.id' class="top">
			<view class="no1">
				<image :src="item.book_img"></image>
			</view>
			<view class="no2">
				<nobr><text class="uni-lastmsg">{{item.book_name}}</text></nobr>
				<p class="Myp0">总数：{{item.book_num}}</p>
				<p class='Myp'>总价：{{item.book_sum}}</p>
				<view class="operate">
					<text class="delete" @click="JerryDelete(item.id)">删除</text>
					<text class="xiadan" @click="JerryXiadan(item.user_id,item.book_id)">下单</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				MyData: [],
			}
		},
		methods: {
			JerryDelete(id) {
				let that = this;
				uni.showModal({
					title: '主人再考虑考虑呗',
					confirmText: "我不需要",
					cancelText: '再想想',
					success(res) {
						if (res.confirm) {
							uni.request({
								url:'http://175.24.116.94:8082/api/deleteCart?id='+id,
								success(res){
									uni.switchTab({
										url:'../sell/sell'
									})
								}
							})
						}else{
							return ;
						}
					}
				})
			},
			JerryXiadan(user_id,book_id) {
				let that = this;
				let temp = [];
				uni.showModal({
					title:'确认下单嘛',
					success(res) {
						if(res.confirm){
							uni.request({
								url:'http://175.24.116.94:8082/api/getCart?usernameId='+user_id+'&book_id='+book_id,
								success(res) {
									temp = res.data;
									console.log(temp)
									if(JSON.stringify(res) !== '[]'){
										uni.request({
											url:'http://175.24.116.94:8082/api/addOrder?book_id='+temp[0].book_id+'&usernameId='+temp[0].user_id+'&book_num='+
											temp[0].book_num+'&book_sum='+temp[0].book_sum+'&book_img='+temp[0].book_img+'&book_name='+temp[0].book_name,
											success(res) {
												return uni.showToast({
													title:'下单成功'
												})
											},
											method:'POST'
										})
									}
								}
							})
						}else{
							return ;
						}
					}
				})
			},
			dataGet() {
				let that = this;
				uni.request({
					url: 'http://175.24.116.94:8082/api/getCart?usernameId=' + this.usernameId,
					success(res) {
						that.MyData = res.data;
					}
				})
			}
		},
		computed: {
			...mapState(['username', 'usernameId'])
		},
		created() {
			if (this.username !== '') {
				this.dataGet();
			}
		},
		onPullDownRefresh() {
			// console.log('refresh');
			this.dataGet();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 500);
		},
		onShow() {
			if (this.username === '') {
				uni.showModal({
					title: '您还未登录',
					confirmText: '去登陆',
					cancelText: '再看看',
					success(res) {
						if (res.confirm) {
							uni.switchTab({
								url: '../profile/profile'
							})
						} else {
							return;
						}
					}
				})
			}
		},
		activated() {
			this.dataGet();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 500);
		},
	}
</script>

<style lang="scss" scoped>
	.top {
		display: flex;
		flex: 1 3;
		border-bottom: 1px solid #C0C0C0;

		.no1 {
			height: 100rpx;
			line-height: 100rpx;

			image {
				height: 100rpx;
				width: 100rpx;
			}
		}

		.no2 {
			height: 100px;
			font-size: 13px;
			color: #ff4621;

			.uni-lastmsg {
				text-overflow: ellipsis;
				color: black;
				overflow: hidden;
				font-size: 13px;
			}
		}
	}

	.operate {}

	.operate {
		margin-top: 15px;
	}

	.delete {
		display: inline-block;
		border: 1px solid red;
		width: 100rpx;
		height: 50rpx;
		position: absolute;
		line-height: 50rpx;
		text-align: center;
		color: #ff4621;
		left: 0;
	}

	.xiadan {
		position: absolute;
		right: 0;
		display: inline-block;
		border: 1px solid red;
		width: 100rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		right: 0;
		color: #ff4621;
	}
</style>
