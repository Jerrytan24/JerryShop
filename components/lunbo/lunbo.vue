<template>
	<view class="head">
		<view class="wrap">
		</view>
		<swiper indicator-dots autoplay class="swiper" interval="2000">
			<swiper-item>
				<image src="../../static/lunbo/01.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/lunbo/02.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/lunbo/03.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/lunbo/04.jpg"></image>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.head {
		position: relative;
		height: 550rpx;

	}

	.swiper swiper-item {
		image {
			width: 100%;
			// height: 350rpx;
		}
		height: 100%;
	}

	.wrap {
		width: 750rpx;
		height: 300rpx;
		background-image: url("https://gitee.com/jerry-mall/static/raw/master/images/bg.jpg");
	}

	.swiper {
		overflow: hidden;
		height: 360rpx;
		border-radius: 7px;
		position: relative;
		margin: 0 auto;
		width: 680rpx;
		top: -260rpx;
	}
</style>
