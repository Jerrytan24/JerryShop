<template>
	<view class="head">
		<view class="view" @click="handle01">
			<text>定制开发</text>
			<view class="square">
			</view>
		</view>
		<view class="view" @click="handle02">
			<text>加入我们</text>
			<view class="square">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			handle01:function(){
				uni.navigateTo({
					url:"../mystatic/handle01"
				})
			},
			handle02:function(){
				uni.navigateTo({
					url:"../mystatic/handle02"
				})
			}
		}
	}
</script>

<style lang="scss">
	.head {
		.view {
			height: 80rpx;
			width: 100%;
			border-bottom: 2px solid #eee;
			line-height: 80rpx;
			.square{
				display: inline-block;
				border: 3px solid #eee;
				border-bottom:0px ;
				border-left: 0px;
				width: 28rpx;
				height: 28rpx;
				transform: rotate(45deg);
				margin-left: 75%;
			}
			text{
				font-size: 13px;
			}
		}
	}
</style>
