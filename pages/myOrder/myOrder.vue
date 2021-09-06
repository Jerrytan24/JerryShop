<template>
	<view>
		<book_order :JerryData='MyData' :JerryCollects='JerryCollectData'></book_order>
	</view>
</template>

<script>
	import {mapState} from 'vuex' 
	import book_order from '../../components/book_list/book_order.vue'
	export default{
		data(){
			return {
				MyData:[],
				JerryCollectData: ''
			}
		},
		computed:{
			...mapState(['usernameId'])
		},
		created() {
			let that = this;
			uni.request({
				url:'http://175.24.116.94:8082/api/getOrder?usernameId='+this.usernameId,
				success(res) {
					that.MyData = res.data;
				}
			})
		},
		components:{
			'book_order':book_order,
		}
	}
</script>

<style lang="scss">
</style>
