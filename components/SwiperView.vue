<template>
	<view class="content">
		<uni-swiper-dot class="uni-swiper-dot-box" :dots-styles="dotsStyles" :info="info" :current="current"
			field="content" :mode="mode">
			<swiper :autoplay="true" :circular="true" class="swiper-box" @change="change">
				<swiper-item v-for="(item, index) in info" :key="index">
					<view class="swiper-item">
						<view class="image-container">
							<image class="image" :src="item.pic" mode="scaleToFill" />
						</view>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
	</view>
</template>
<script>
export default {
	name: 'SwiperView',
	props: {
		info: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			current: 0,
			mode: 'dot',
			dotsStyles: {
				backgroundColor: 'rgba(255, 255, 255, .3)',
				border: '1px rgba(255, 255, 255, .3) solid',
				color: '#fff',
				selectedBackgroundColor: 'rgba(255, 255, 255, .9)',
				selectedBorder: '1px rgba(255, 255, 255, .9) solid'
			}
		}
	},
	methods: {
		change(e) {
			this.current = e.detail.current;
		}
	}
}
</script>
<style lang="scss" scoped>
	.swiper-box .swiper-pagination-bullet {
		width: 8px;
		height: 8px;
		background-color: rgba(255, 255, 255, 0.5);
		/* 半透明白色，非活动状态 */
		border-radius: 50%;
	}

	.swiper-box .swiper-pagination-bullet-active {
		background-color: #fff;
		/* 纯白色，活动状态 */
	}

	.swiper-box {
		height: 200px;
	}

	.swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 200px;
		color: #fff;
		margin: 0 24rpx;

		.image-container {
			width: 100%;
			height: 100%;
			border-radius: 20rpx;
			overflow: hidden;

			.image {
				width: 100%;
				height: 100%;
			}
		}
	}


	/* #ifndef APP-NVUE */
	::v-deep .image img {
		-webkit-user-drag: none;
		-khtml-user-drag: none;
		-moz-user-drag: none;
		-o-user-drag: none;
		user-drag: none;
	}

	/* #endif */

	@media screen and (min-width: 500px) {
		.uni-swiper-dot-box {
			width: 400px;
			margin: 0 auto;
			margin-top: 8px;
		}

		.image {
			width: 100%;
		}
	}
</style>