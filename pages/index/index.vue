<template>
	<view class="index">
		<lunbo></lunbo>
		<view class="bottom">
			<related></related>
		</view>
		<swiperview></swiperview>
		
	</view>
</template>

<script>
	import lunbo from "../../components/lunbo/lunbo.vue"
	import related from "../../components/related/related.vue"
	import swiperview from "../../components/swiperview/swiperview.vue"
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		},
		components:{
			lunbo,
			related,
			swiperview,
			
		}
	}
</script>

<style lang="scss">
	.index{
		background-color: #eee;
		height: 100%;
	}
	page{
		height: 100%;
		background-color: #eee;
	}
	
</style>
