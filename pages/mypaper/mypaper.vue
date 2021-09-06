<template>
	
</template>
<script>
	import {mapState} from 'vuex'
	export default{
		data(){
			return {
				
			}
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
			}
		}
	}
</script>
<style lang="scss">
	
</style>