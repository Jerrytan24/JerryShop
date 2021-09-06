<template>
	<view>
		<book_list :JerryData='JerryCollect' :JerryCollects='JerryCollectData'></book_list>
	</view>
</template>
<script>
	import {mapState} from 'vuex'
	import book_list from '../../components/book_list/book_list.vue'
	export default {
		data(){
			return {
				JerryCollect:[],
				JerryCollectData:''
			}
		},
		computed:{
			...mapState({'usernameId':'usernameId'})
		},
		onLoad() {
			let that = this;
			uni.request({
				url:'http://175.24.116.94:8082/api/getCollect?usernameId='+this.usernameId,
				success(res) {
					if(JSON.stringify(res.data) === '[]'){
						return uni.showToast({
							title:'没有收藏书籍'
						})
					}else{
						that.JerryCollect = res.data;
						that.JerryCollectData = res.data[0].publisher
					}
				}
			})
		},
		comments:{
			book_list,
		}
	}
</script>

<style lang="scss">
	
</style>
