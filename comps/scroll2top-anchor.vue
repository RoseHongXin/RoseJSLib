<template>
	<view class="scroll2top-container" :style="{'display':(showScroll2TopIcon===true? 'block':'none')}">
		<u-icon class="scroll2top-icon" name="arrow-upward" size="48" @click="scroll2top"></u-icon>
	</view>
</template>

<script>
	export default {
		props: {
			show: { type: Boolean, default: false, },
		},
		data() {
			return {
				showScroll2TopIcon: this.show,
			};
		},
		watch:{
			show: {
				handler (newVal) {
					this.showScroll2TopIcon = newVal;
				},
				deep: true,
				immediate: true,
			},
		},
		mounted() {
			
		},
		methods: {
			scroll2top(){
				uni.pageScrollTo({ scrollTop: 0, duration: 300 }); 
			},
		}
	}
</script>

<style lang="scss" scoped>
	
	.scroll2top-container {
	    display: none; /* 先将元素隐藏 */
		position: fixed;
		right: 20rpx;
		bottom: 20rpx;
		width: 64rpx;
		height: 64rpx;
		border-radius: 20rpx;
		z-index: 100;
	}
</style>
