<template>
	<view class="dlg-container" v-if="sShowDlg">
		<view class="mask" @click.stop="sShowDlg=false"></view>
		<view class="dlg">
			<view v-if="sTitle" class="header">
				<image v-if="sTitleIcon" :src="sTitleIcon" />
				<text>{{sTitle}}</text>
			</view>
			<view class="item-container" scroll-y>
				<text v-for="(it, index) in sModels" 
					:class="['item', index<sModels.length-1?'divider':'']"
					:id="index" :key="index"
					@click.stop="sOnItemClick(it, index)">
					{{ sField ? it[sField] : it }}
				</text>
			</view>
			<text class="item cancel" @click.stop="sOnCancelClick">{{cancelText}}</text>
		</view>
	</view>
</template>

<script>
	const TAG = "-BottomUpDialog-";
	const EVENT_ON_CLICK = "onClick";
	const EVENT_ON_CANCEL_CLICK = "onCancelClick";
	export default {
		name: 'bottomup-dialog',
		props: {
			show: { type: Boolean, default: false, },
			grid: { type: Boolean, default: false, },
			models: { type: Array, default: () => { return []; }, },
			field: { type: String, default: "", },
			titleIcon: { type: String, default: ""},
			title: { type: String, default: ""},
			cancelText: { type: String, default: "取消"},
		},
		data() {
			return {
				sShowDlg: this.show,
				sModels: this.models,
				sField: this.field,
				sTitle: this.title,
				sTitleIcon: this.titleIcon,
				sTarget: null,
			}
		},
		methods: {
			showNow(models, field="", target=null, title="", titleIcon=""){
				this.sField = field;
				this.sModels.splice(0, this.sModels.length, ...models);
				this.mTarget = target;
				this.sTitle = title;
				this.sTitleIcon = titleIcon;
				this.sShowDlg = true;
			},
			sOnItemClick(model, index){
				this.$emit(EVENT_ON_CLICK, model, index, this.mTarget);
				this.sShowDlg = false;
			},
			sOnCancelClick(){
				this.sShowDlg = false;
				this.$emit(EVENT_ON_CANCEL_CLICK);
			},
		},
	}
</script>

<style scoped>
	.dlg-container {
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 1000;
	}
	.mask {
		/* width: 100%; */
		/* height: 100%; */
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		position: fixed;
		z-index: 2000;
		background: rgba(0, 0, 0, 0.4);
		/* transition: transform 2s; */
	}
	.dlg {
		overflow: hidden;
		border-top-right-radius: 40rpx;
		border-top-left-radius: 40rpx;
		width: 100%;
		position: fixed;
		right: 0;
		bottom: 0;
		z-index: 3000;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0rpx 30rpx;
		/* transition-property: width;
		transition-duration: 2s;
		transition-timing-function: linear;
		transition-delay: 1s; */
	}
	.item-container {
		border-radius: 40rpx;
		width: 100%;
		background: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.item {
		color: #444;
		font-size: 30rpx;
		width: 100%;
		height: 100rpx;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.divider {
		border-bottom: 1px solid #eee;
	}
	.cancel {
		background: #ddd;
		border-radius: 40rpx;
		color: #FA3534 !important;
		margin: 20rpx 10rpx;
		font-weight: bold;
	}
	.header {
		border-radius: 20rpx;
		padding: 16rpx 10rpx;
		width: 60%;
		background: #fff;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		font-size: 32rpx;
		font-weight:500;
	}
	.header image {
		width: 60rpx;
		height: 60rpx;
	}
	.header text {
		width: fit-content;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		border-bottom: 1rpx solid #eee;
	}
</style>
