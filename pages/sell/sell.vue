<template>
	<view class="head">
		<view class="check">
			<input type="text" placeholder="请输入书名或作者" class="check_input" placeholder-class="My-placeholder"></input>
			<view class="check_span2" @click="check_span2">
				<image src="https://gitee.com/jerry-mall/static/raw/master/icon/jia.png" class="check_icon2"></image>
			</view>
			<view class="bottom">
				<text class="MyText1" @click="Mytextfor01">{{cate}}</text>
				<text class="MyText2" @click="Mytextfor02">{{goods}}</text>
			</view>
		</view>
		<book_list :JerryData="Jerry_data" :JerryCollects='sellData'></book_list>
	</view>
</template>

<script>
	import book_list from "../../components/book_list/book_list.vue"
	export default {
		data() {
			return {
				cate: "全部类别",
				goods: "全部",
				Jerry_data:[],
				sellData:'1',
			}
		},
		methods: {
			check_span2: function() {

			},
			Mytextfor01: function() {
				this.$JerryRequest({
					url: "log",
					success(res) {
						console.log(res)
					}
				})
			},
			async dataGet() {
				const res = await this.$JerryRequest({
					url:'/api/sellShow/mysell'
				})
				this.Jerry_data = res.data;
			},
			Mytextfor02: function() {

			},
			onPullDownRefresh() {
				// console.log('refresh');
				this.dataGet();
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 2000);
			},
			created() {
				this.dataGet();
				console.log(this.Jerry_data)
			},
			
		},
		components: {
			book_list,
		},
		
	}
</script>

<style lang="scss">
	page {
		background-color: #eee;
	}

	.check {
		background-color: $uni-theme;
		height: 160rpx;
		width: 750rpx;
		position: relative;
		text-align: center;

		view {
			background-color: white;
			width: 44rpx;
			height: 46rpx;
			position: relative;
			box-sizing: border-box;
			display: inline-block;

		}

		.check_span2 {
			border-radius: 23rpx;
			margin-left: 25rpx;
		}

		.bottom {
			background-color: $uni-theme;
			width: 100%;
			height: 46rpx;
			position: relative;
			box-sizing: border-box;
			display: inline-block;

			text {
				display: inline-block;
				color: white;
				margin-top: 60rpx;
			}
		}
	}

	.check_input {
		background-color: white;
		height: 44rpx;
		width: 540rpx;
		display: inline-block;
		border-radius: 0 10rpx 10rpx 0;
		// transform: translateY(160rpx/2-60rpx/2);
		box-sizing: border-box;
		text-align: left;
		background-image: url("https://gitee.com/jerry-mall/static/raw/master/icon/check.png");
		background-size: 44rpx 44rpx;
		background-repeat: no-repeat;
	}

	.My-placeholder {
		color: #aaaaaa;
		margin-left: 50rpx;
		font-size: 12px;
	}

	.check_icon {
		width: 44rpx;
		height: 44rpx;
	}

	.check_icon2 {
		width: 44rpx;
		height: 46rpx;
	}

	.MyText2 {
		margin-left: 40px;
	}

	.MyText1 {
		margin-right: 80px;
	}
</style>
