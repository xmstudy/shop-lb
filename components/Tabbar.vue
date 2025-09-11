<template>
	<view class="">
		<view class="tabbar pb-safe">
			<view v-for="(tab, idx) in tabs" :key="tab.title" class="tabbar-item" 
				:class="{active: activeIndex === idx, 'cart-item': idx === 2}"
				@click="setActive(idx)">
				<!-- 购物车特殊样式 -->
				<view v-if="idx === 2" class="cart-highlight">
					<image class="tabbar-item-icon cart-icon" :src="tab.iconActive" :alt="tab.title"
						mode="aspectFit"></image>
				</view>
				<!-- 普通项目 -->
				<template v-else>
					<image class="tabbar-item-icon" :src="activeIndex === idx ? tab.iconActive : tab.icon" :alt="tab.title"
						mode="aspectFit"></image>
				</template>
				<text v-if="idx !== 2">{{ tab.title }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Tabbar',
		props: {
			current: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				tabs: [{
						title: '首页',
						icon: '/static/images/home.png',
						iconActive: '/static/images/home-active.png'
					},
					{
						title: '雷波农特',
						icon: '/static/images/lbnt.png',
						iconActive: '/static/images/lbnt-active.png'
					},
					{
						title: '购物车',
						icon: '/static/images/cart.png',
						iconActive: '/static/images/cart-active.png'
					},
					{
						title: '乡镇大集',
						icon: '/static/images/xzdj.png',
						iconActive: '/static/images/xzdj-active.png'
					},
					{
						title: '我的',
						icon: '/static/images/mine.png',
						iconActive: '/static/images/mine-active.png'
					}
				]
			};
		},
		computed: {
			activeIndex() {
				return this.current;
			}
		},
		methods: {
			setActive(idx) {
				// emit change 事件给父组件
				// this.activeIndex = idx; // 不再本地维护activeIndex，由父组件控制
				// 使用getApp()来访问globalData
				if (getApp().globalData) {
					getApp().globalData.activeTabbarKey = idx
				}
				this.$emit('change', idx);
			}
		},
	};
</script>

<style lang="scss" scoped>
	.tabbar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100vw;
		height: 56px;
		background: #fff;
		border-top: 1px solid #e5e5e5;
		box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.04);
		display: flex;
		justify-content: space-around;
		align-items: center;
		z-index: 100;
		overflow: visible; /* 允许购物车突起显示 */
	}

	.tabbar-item {
		flex: 1;
		text-align: center;
		color: #888;
		font-size: 12px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		cursor: pointer;
		transition: color 0.2s;
	}

	.tabbar-item.active {
		color: #009966;
	}

	/* 购物车特殊样式 */
	.cart-item {
		position: relative;
	}

	.cart-highlight {
		position: absolute;
		top: -20rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 100rpx;
		height: 100rpx;
		background: #009966;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4rpx 12rpx rgba(0, 153, 102, 0.3);
		z-index: 10;
	}

	.cart-icon {
		width: 56rpx !important;
		height: 56rpx !important;
		margin-bottom: 0 !important;
		filter: brightness(0) invert(1); /* 使图标变白色 */
	}

	.tabbar-item-icon {
		width: 48rpx;
		height: 48rpx;
		margin-bottom: 4rpx;
		display: block;
	}
</style>