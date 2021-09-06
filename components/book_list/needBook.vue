<template>
	<view>
		<view v-for="item in MyData" :key='item.id' class="top">
			<view class="the1">
				<view class="desc">需求者描述:{{item.text}}</view>
				<view class="name">需求者ID:{{item.user_name}}</view>
				<view class="time">{{item.time}}</view>
			</view>
			<view class="the2">
				<image :src="item.book_img"></image>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				MyData: [],
			}
		},
		created() {
			let that = this;
			uni.request({
				url:'http://175.24.116.94:8082/api/AdviceBook',
				success(res) {
					that.MyData = res.data;
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.top{
		margin: 0 auto;
		border-radius: 10px;
		box-shadow: -0px 5px 0 #999999;
		width: 95%;
		height: 250rpx;
		background-color: white;
		display: flex;
		flex: 2 1;
		margin-bottom: 2px;
		image{
			height: 200rpx;
			width: 250rpx;
		}
		.name{
			margin-top: 50rpx;
			font-size: 14px;
			color: #CCCCCC;
		}
		.time{
			font-size: 14px;
			color: #CCCCCC;
		}
	}
</style>
