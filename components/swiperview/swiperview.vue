<template>
	<view>
		<view>
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
				<view id="demo1" class="scroll-view-item_H uni-bg-red" @click="selelcted_click01">
					<image src="https://gitee.com/jerry-mall/static/raw/master/extend/shiyongzhinan.png"></image>
					<view class="selected_view">
						<text>操作指南</text>
					</view>
				</view>
				<view id="demo2" class="scroll-view-item_H uni-bg-green selected_01"  @click="selelcted_click02">
					<image src="https://gitee.com/jerry-mall/static/raw/master/extend/shengcunnengli.png"></image>
					<view class="selected_view">
						<text>生存图鉴</text>
					</view>
				</view>
				<view id="demo3" class="scroll-view-item_H uni-bg-blue selected_02"  @click="selelcted_click03">
					<image src="https://gitee.com/jerry-mall/static/raw/master/extend/chi.png"></image>
					<view class="selected_view">
						<text>广州吃吃</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		methods: {
			upper: function(e) {
				// console.log(e)
			},
			lower: function(e) {
				// console.log(e)
			},
			scroll: function(e) {
				// console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				// 解决view层不同步的问题
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				uni.showToast({
					icon: "none",
					title: "纵向滚动 scrollTop 值已被修改为 0"
				})
			},
			selelcted_click01:function(){
				uni.navigateTo({
					url:"../../pages/zhinan/zhinan"
				})
			},
			selelcted_click02:function(){
				uni.navigateTo({
					url:"../../pages/shengcun/shengcun"
				})
			},
			selelcted_click03:function(){
				uni.navigateTo({
					url:"../../pages/chi/chi"
				})
			}
		}
	}
</script>

<style>
	.selected_view {
		display: inline-block;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 92%;
		margin: 0 auto;
		height: 200rpx;
		border-radius: 7px;
		background-color: white;
		border: 1px solid white;
		margin-top: -60rpx;
		line-height: 200rpx;


	}

	.scroll-view-item_H {
		display: inline-block;
		width: 60%;
		height: 130rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 13px;
		text-align: left;
		line-height: 130rpx;
		box-shadow: 3px 3px #8c8c8c;
		border-radius: 7px;
	}

	image {
		width: 80rpx;
		height: 80rpx;
		transform: translateY(35rpx);
	}

	.selected_01 {
		margin-left: 15px;
	}

	.selected_02 {
		margin-left: 15px;
	}

	.selected_view {
		line-break:loose;
		white-space: pre;
		margin-left: 10px;
		text {
			font-size: 12px;
		}
	}
</style>
