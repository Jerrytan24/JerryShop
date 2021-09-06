<template>
	<view class="bottom_div">
		<view class="bottom_div_view" v-for="(item) in JerryData" @click="Mydetail(item.book_id)">
			<image :src="item.book_img"></image>
			<view class="info">
				<p class="bottom_div_title">
					<nobr>{{item.book_name}}</nobr>
				</p>
				<p class="isbn">{{item.book_ISBN}}</p>
			</view>
			<view class="price">
				<p class="p1">{{item.book_price}}</p>
				<p class="p2">10人收藏</p>
			</view>
		</view>
	</view>

</template>
<script>
	export default {
		data() {
			return {
				// Mydata: []
			}
		},
		props:{
			JerryData:{
				type:Array
			},
			JerryCollects:{
				type:String,
				default:"0",
				required:true
			}
		},
		methods: {
			Mydetail: function(id) { 
				uni.navigateTo({
					url: "../../pages/detail/detail?bookId=" + id,
				})
			},
			async dataGet() {
				const res = await this.$JerryRequest({
					url:'/api/sellShow/mysell'
				})
				this.JerryData = res.data;
				// console.log(...this.Mydata)
			}
		},
		created() {
			if(this.JerryCollects === "1"){
				console.log(this.JerryCollects)
				this.dataGet();
			}
		},
	}
</script>
<style lang="scss">
	.bottom_div {
		display: flex;
		flex-wrap: wrap;
		flex: 1;
		margin-top: 7px;

		.bottom_div_view {
			margin: 0 3px 5px 2px;
			width: 360rpx;
			height: 500rpx;
			text-align: center;
			background-color: white;

			image {
				width: 280rpx;
				height: 300rpx;
			}

			.info {
				margin-top: 14rpx;
				margin-left: 40rpx;
				text-align: left;
				.bottom_div_title {
					text-overflow: ellipsis;
					color: black;
					overflow: hidden;
					font-size: 13px;
				}
				.isbn {
					color: red;
					font-size: 12px;
					margin-top: 10rpx;
				}
			}

			.price {
				margin-top: 50rpx;

				.p1 {
					color: red;
					font-size: 14px;
					display: inline-block;
					margin-right: 60rpx;
				}

				.p2 {
					color: #828282;
					font-size: 12px;
					display: inline-block;
					margin-left: 52rpx;
				}
			}

		}
	}
</style>
