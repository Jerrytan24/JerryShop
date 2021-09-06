<template>
	<view>
		<view class="top" v-for="item in book" :key='item.book_id'>
			<image :src="item.book_img"></image>
			<view class="info">
				<text class="name">
					{{item.book_name}}
				</text>
				<text class="author">
					{{item.book_writer}}
				</text>
				<text class="isbn">
					{{item.book_ISBN}}
				</text>
				<text class="desc">
					{{item.book_desc}}
				</text>
			</view>
			<view class="addNum">
				<view>
					<view class="MyText3">购买数量</view>
					<text @click="jian()" class="MyText1">
						<image src="../../static/icon/jian.png"></image>
					</text>
					<text class="MyText2">{{book_num}}</text>
					<text @click="jia()" class="MyText1">
						<image src="../../static/icon/jia.png"></image>
					</text>
				</view>
			</view>
			<view class="price">
				<text class="p">{{item.book_price}}</text>
				<text class="cartSum">
					总价:
					<text>{{book_sum}}</text>
				</text>
				<view class="clear"></view>
				<view class="aopri">
					原价:
					<text class="line">{{aopri}}</text>
					<text class="col">收藏人数:{{collect}}</text>
				</view>
			</view>
		</view>
		<spendMoney @zhijie='JerryOrderXiaDan'></spendMoney>
		<view class="nav">
			<ai-goods-action :options="options2" :buttons="button2" :bookId='book_id' @add_Cart='add_Cart'>
			</ai-goods-action>
		</view>

	</view>
</template>

<script>
	import aiGoodsAction from "../../components/uni-nav/ai-goods-action/ai-goods-action.vue"
	import {
		mapState
	} from 'vuex'
	import spendMoney from '../../components/spendMoney/index.vue'
	export default {
		data() {
			return {
				masks: false,
				pri: "$80",
				book_id: 0,
				book: [],
				aopri: "$120",
				collect: 25,
				book_num: 1,
				book_sum: 0,
				book_unit: 0,
				book_name:'',
				book_img:'',
				username: '',
				options2: [{
						text: '客服',
						icon: 'chat',
						dot: true
					},
					{
						text: '收藏',
						icon: 'cart',
					}
				],
				button2: [{
						text: '加入购物车'
					},
					{
						text: '立即购买',
					}
				],
			}
		},
		onLoad: function(option) {
			this.dataGet(option.bookId);
		},
		components: {
			"ai-goods-action": aiGoodsAction,
			'spendMoney': spendMoney,
		},
		methods: {
			dataGet(id) {
				let that = this;
				uni.request({
					url: 'http://175.24.116.94:8082/api/sellShow/mysell?bookId=' + id,
					success(res) {
						that.book = res.data;
						that.book_id = res.data[0].book_id;
						that.book_sum = parseInt(res.data[0].book_price);
						that.book_unit = parseInt(res.data[0].book_price);
						that.book_name = res.data[0].book_name;
						that.book_img = res.data[0].book_img;
					},
					fail(err) {
						uni.showToast({
							title: err
						})
					}
				})
			},
			jian() {
				if (this.book_num === 1) {
					uni.showToast({
						title: '不可再减了'
					})
				} else {
					this.book_num += -1;
					this.book_sum = this.book_unit * this.book_num;
				}
			},
			jia() {
				this.book_num += 1;
				this.book_sum = this.book_unit * this.book_num;
			},
			add_Cart(item) {
				let that = this;
				if (item === '加入购物车') {
					uni.request({
						url: 'http://175.24.116.94:8082/api/getCart?usernameId=' + that.usernameId + '&book_id=' + that
							.book_id,
						success(res) {
							if (JSON.stringify(res.data) !== '[]') {
								return uni.showToast({
									title: '已在购物车中'
								})
							} else {
								uni.request({
									url: 'http://175.24.116.94:8082/api/addCart?usernameId=' + that
										.usernameId + '&book_id=' + that.book_id + '&book_num=' + that
										.book_num+'&book_img='+that.book_img+'&book_name='+that.book_name+'&book_sum='+that.book_sum,
									method: 'POST',
									success(res) {
										if(JSON.stringify(res) === 'true'){}
										uni.showToast({
											title: '加入成功'
										})
									}
								})
							}
						}
					})
				}
				if (item === '立即购买') {
					let that = this;
					uni.showModal({
						content: '是否直接购买',
						confirmText: '有钱买了',
						showCancel: true,
						cancelText: '穷死了',
						success(res) {
							if (res.confirm) {
								that.$store.dispatch('setMask', true)
							} else {
								uni.showToast({
									title: '没事我也穷!'
								})
							}
						}
					})
				}

			},
			JerryOrderXiaDan(item) {
				let that = this;
				uni.request({
					url: 'http://175.24.116.94:8082/api/addOrder?usernameId='+that.usernameId+'&book_id='+that.book_id+'&book_num='+that.book_num+'&book_sum='+that.book_sum+'&book_img='+that.book_img+'&book_name='+that.book_name,
					method:'POST',
					success(res) {
						that.$store.dispatch('setMask',false);
						uni.redirectTo({
							url:'../myOrder/myOrder'
						})
					}
				})
			}
		},
		computed: {
			...mapState({
				'usernameId': 'usernameId'
			}, {
				'JerryMask': 'JerryMask'
			}),
		}
	}
</script>


<style lang="scss">
	.top {
		width: 100%;
		height: 950rpx;
		text-align: center;

		.image {
			width: 80%;
			height: 600rpx;
			margin: 0 auto;
		}
	}

	.info {
		margin-top: 20px;

		text {
			display: block;
			text-align: left;
			font-size: 14px;
			color: #888888;
			margin-bottom: 6px;
		}

		.name {
			color: black;
			font-size: 20px;
		}
	}

	.price {
		.clear {
			clear: both;
		}

		text-align: left;
		margin-top: 80rpx;

		.cartSum {
			position: absolute;
			right: 0;
			color: red;
		}

		.p {
			margin-bottom: 6px;
			color: red;
			font-size: 20px;
		}

		.col {
			margin-left: 410rpx;
			position: absolute;
			right: 0;

		}

		.aopri {
			display: inline-block;
			color: #878787;
			font-size: 15px;

			.line {
				text-decoration: line-through;
			}

			text {
				color: #878787;
			}
		}
	}

	.nav {
		margin-top: 540rpx;
		margin-left: -10rpx;
	}

	.MyText2 {
		background-color: #FFFFFF;
		display: inline-block;
		width: 30px;
		height: 30px;
		text-align: center;

	}

	.MyText3 {
		font-size: 18px;
		color: #C0C0C0;
		margin-top: 10px;
	}

	.MyText1 {
		display: inline-block;
		background-color: #EEEEEE;
		width: 30px;
		height: 30px;
		text-align: center;
	}

	.addNum {
		text-align: left;
		margin-top: 20px;

		.MyText1 image {
			width: 22px;
			height: 22px;
			margin-top: 3px;
		}
	}
</style>
