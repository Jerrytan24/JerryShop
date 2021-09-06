<template>
	<view>
		<needBook></needBook>
	</view>
</template>
<script>
	import {mapState} from 'vuex'
	import needBook from '../../components/book_list/needBook.vue'
	export default{
		data(){
			return {
				
			}
		},
		components:{
			needBook,
		},
		computed:{
			...mapState(['username'])
		},
		methods:{
			
		},
		onShow() {
			if (this.username === '') {
				uni.showModal({
					title: '您还未登录',
					confirmText: '去登陆',
					showCancel:false,
					success(res) {
						if (res.confirm) {
							uni.switchTab({
								url: '../profile/profile'
							})
						} else {
							uni.switchTab({
								url: '../profile/profile'
							})
						}
					}
				})
			}else{
			}
		}
	}
</script>
<style lang="scss">
	page{
		background-color: #e8e8e8;
	}
</style>