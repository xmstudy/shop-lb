	<template>
		<BaseContainer>
			<view class="home-container">
				<!-- 顶部搜索栏 -->
				<view class="top-search-bar"
					:style="{ paddingTop: statusBarHeight + 'px', height: (statusBarHeight + searchBarHeight) + 'px' }">
					<view class="search-content">
						<view class="search-box" @tap="toSearch" :style="{ 
							height: searchBarHeight + 'px', 
							marginTop: (menuButtonTop - statusBarHeight) + 'px',
							width: searchBoxWidth
						}">
							<view class="search-icon">
								<u-icon name="search" color="rgba(0, 0, 0, 0.3)" size="28"></u-icon>
							</view>
							<text class="search-text">搜索</text>
						</view>
					</view>
				</view>

				<!-- Banner轮播区 -->
				<view class="banner-section" :style="{ marginTop: '100rpx' }">
					<!-- 渐变衔接容器 -->
					<view class="gradient-bridge"></view>
					<view class="banner-skeleton" v-if="bannerLoading">
						<view class="skeleton-banner"></view>
					</view>

					<view class="swiper-container" v-else>
						<u-swiper ref="bannerSwiper" :list="bannerList" height="224rpx" keyName="image" circular
							:autoplay="true" :interval="6000" radius="12" :loading="bannerLoading" :error="bannerError"
							:indicator="false" @load="onBannerLoad" @error="onBannerError" @change="onBannerChange"
							@click="onBannerClick">
							<!-- 自定义指示器 -->
							<view slot="indicator" class="custom-indicator">
								<view class="indicator-dot" v-for="(item, index) in bannerList" :key="index"
									:class="[index === current && 'indicator-dot--active']">
								</view>
							</view>
						</u-swiper>
					</view>
				</view>

				<!-- 功能区块 -->
				<view class="function-blocks">
					<view class="block-row">
						<view class="block-item orange-block" @click="goToLeiBoNongTe">
							<text class="block-title">套餐专区</text>
						</view>
					</view>

					<view class="block-row small-blocks">
						<view class="block-item blue-block small" @click="goToLeiBoNongTe">
							<text class="block-title">雷波农特</text>
						</view>
						<view class="block-item blue-block small" @click="goToXiangZhenDaJi">
							<text class="block-title">乡镇大集</text>
						</view>
					</view>

				<!-- 	<view class="block-row">
						<view class="block-item blue-block video">
							<text class="block-title">视频展示</text>
						</view>
					</view> -->
				</view>

				<!-- 商品推荐区域 -->
				<scroll-view scroll-y class="featured-products">
					<view class="products-header">
						<view class="header-content">
							<view class="header-title">商品推荐</view>
							<view class="header-desc">精选优质商品</view>
						</view>
					</view>

					<!-- 产品骨架屏 -->
					<view class="products-grid" v-if="productLoading">
						<view class="product-skeleton" v-for="n in 4" :key="n">
							<view class="skeleton-image"></view>
							<view class="skeleton-content">
								<view class="skeleton-desc"></view>
								<view class="skeleton-price"></view>
							</view>
						</view>
					</view>

					<!-- 实际产品展示 -->
					<view class="products-grid" v-else>
						<view class="product-card-enhanced" v-for="(item, index) in featuredProducts" :key="index"
							@click="goToGoodsDetail(item.goodsId)">

							<view class="card-image-container">
								<image class="card-image" :src="item.img" mode="aspectFill" :lazy-load="true"
									@load="onImageLoad(index)" @error="onImageError(index)">
								</image>

								<view class="image-skeleton" v-if="!item.imageLoaded">
									<view class="skeleton-shimmer"></view>
								</view>

								<!-- 左上角图标 -->
								<view class="card-badge-left" v-if="item.isHot">
									<image class="badge-icon" src="/static/images/hot-icon.png" mode="aspectFit"></image>
								</view>
								<view class="card-badge-left"
									v-else-if="item.originalPrice && item.originalPrice > item.price">
									<image class="badge-icon" src="/static/images/saleicon.png" mode="aspectFit"></image>
								</view>


							</view>

							<view class="card-content">
								<view class="product-desc">{{ item.desc }}</view>

								<view class="price-section">
									<view class="current-price">¥{{ item.price }}</view>
									<view class="original-price"
										v-if="item.originalPrice && item.originalPrice > item.price">
										¥{{ item.originalPrice }}
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</BaseContainer>
	</template>

	<script>
		import {
			AddCart
		} from '../../api/cart'
		import {
			fetchGoodsList
		} from '@/api/goods'
		import {
			fetchHomeBanner
		} from '@/api/index'
		import BaseContainer from '@/components/BaseWrapper.vue'

		export default {
			components: {
				BaseContainer
			},
			data() {
				return {
					// 状态栏和搜索栏高度
					statusBarHeight: 0,
					searchBarHeight: 44, // 默认高度
					menuButtonTop: 0, // 胶囊按钮距离顶部的距离

					// 胶囊按钮信息
					menuButtonInfo: {
						width: 0,
						height: 0,
						top: 0,
						right: 0,
						bottom: 0,
						left: 0
					},

					// 屏幕信息
					screenWidth: 0,

					// 搜索栏动态宽度
					searchBoxWidth: '100%',

					// Banner轮播数据
					bannerList: [{
							image: 'https://pic1.imgdb.cn/item/6895db6e58cb8da5c812aa02.jpg',
							title: '雷波脐橙·金桂飘香',
							desc: '承载山川灵韵，缔造甘露琼浆'
						},
						{
							image: 'https://pic1.imgdb.cn/item/6895db6e58cb8da5c812aa02.jpg',
							title: '马湖秘境·云水谣',
							desc: '国家四A胜境，天地间的澄澈馈赠'
						},
						{
							image: 'https://pic1.imgdb.cn/item/6895daa458cb8da5c812a9a6.jpg',
							title: '雷波古韵·文脉千秋',
							desc: '川滇通衢要塞，彝汉文明交融的千载古郡'
						}
					],

					// 状态管理
					bannerLoading: true,
					bannerError: false,
					productLoading: true,
					// 轮播当前索引
					current: 0,
					// 商品推荐数据
					featuredProducts: []
				}
			},

			mounted() {
				this.initPageLayout()
				this.fetchBannerData()
				this.fetchData1()
			},
			methods: {
				// 初始化页面布局
				initPageLayout() {
					try {
						// 获取系统信息
						const systemInfo = uni.getSystemInfoSync()
						this.statusBarHeight = systemInfo.statusBarHeight || 0
						this.screenWidth = systemInfo.screenWidth || 375

						// 获取胶囊按钮信息
						const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
						if (menuButtonInfo) {
							// 保存完整的胶囊按钮信息
							this.menuButtonInfo = {
								width: menuButtonInfo.width || 0,
								height: menuButtonInfo.height || 0,
								top: menuButtonInfo.top || 0,
								right: menuButtonInfo.right || 0,
								bottom: menuButtonInfo.bottom || 0,
								left: menuButtonInfo.left || 0
							}

							// 根据胶囊按钮高度设置搜索栏高度
							this.searchBarHeight = menuButtonInfo.height || 44
							// 设置胶囊按钮距离顶部的距离
							this.menuButtonTop = menuButtonInfo.top || 0

							// 计算搜索栏合适的宽度
							this.calculateSearchBoxWidth()
						}
					} catch (error) {
						console.error('获取页面布局信息失败:', error)
						// 设置默认值
						this.statusBarHeight = 20
						this.searchBarHeight = 44
						this.menuButtonTop = 20
						this.screenWidth = 375
						this.searchBoxWidth = 'calc(100% - 240rpx)' // 默认为屏幕宽度减去右侧预留空间
					}
				},

				// 计算搜索栏合适的宽度
				calculateSearchBoxWidth() {
					try {
						// 胶囊按钮距离右边的距离
						const menuButtonRightDistance = this.screenWidth - this.menuButtonInfo.right

						// 搜索栏距离右边的安全距离（胶囊按钮宽度 + 两倍的右边距 + 额外安全距离）
						const safeRightDistance = this.menuButtonInfo.width + (menuButtonRightDistance * 2) + 20

						// 搜索栏左边距（通常是30rpx，转换为px）
						const leftPadding = 30 * this.screenWidth / 750 // rpx转px

						// 计算搜索栏可用宽度
						const availableWidth = this.screenWidth - leftPadding - safeRightDistance

						// 确保最小宽度
						const minWidth = 200
						const finalWidth = Math.max(availableWidth, minWidth)

						// 转换为rpx单位
						const widthInRpx = finalWidth * 750 / this.screenWidth

						this.searchBoxWidth = `${widthInRpx}rpx`

						console.log('搜索栏宽度计算结果:', {
							screenWidth: this.screenWidth,
							menuButtonInfo: this.menuButtonInfo,
							safeRightDistance,
							availableWidth,
							finalWidth,
							widthInRpx,
							searchBoxWidth: this.searchBoxWidth
						})
					} catch (error) {
						console.error('计算搜索栏宽度失败:', error)
						// 默认宽度，确保不会遮挡胶囊
						this.searchBoxWidth = 'calc(100% - 240rpx)'
					}
				},

				// 获取Banner数据
				async fetchBannerData() {
					try {
						this.bannerLoading = true
						// TODO fetchHomeBanner 会在这里使用
						const res = await fetchHomeBanner()
						if (res.code == 200 && res.data && res.data.length > 0) {
							this.bannerList = res.data.map(item => ({
								image: item.image || item.pic || item.url || item.imageUrl,
								title: item.title || item.name || item.description || '精选推荐',
								desc: item.desc || item.content || item.description || '优质商品推荐'
							}));
						} else {
							// 如果接口没有数据，使用默认数据
							console.log('Banner接口无数据，使用默认数据');
							this.bannerList = [{
									image: 'https://pic1.imgdb.cn/item/6895db7958cb8da5c812aa08.jpg',
									title: '雷波脐橙·金桂飘香',
									desc: '承载山川灵韵，缔造甘露琼浆'
								},
								{
									image: 'https://pic1.imgdb.cn/item/6895db6e58cb8da5c812aa02.jpg',
									title: '马湖秘境·云水谣',
									desc: '国家四A胜境，天地间的澄澈馈赠'
								},
								{
									image: 'https://pic1.imgdb.cn/item/6895daa458cb8da5c812a9a6.jpg',
									title: '雷波古韵·文脉千秋',
									desc: '川滇通衢要塞，彝汉文明交融的千载古郡'
								},
								{
									image: 'https://pic1.imgdb.cn/item/6895db8958cb8da5c812aa0f.jpg',
									title: '限时秒杀活动',
									desc: '超值优惠，不容错过'
								}
							];
						}
						console.log('Banner数据载入完毕');
					} catch (error) {
						console.error('获取Banner数据失败:', error);
						// 异常情况下也使用mock数据
						console.log('异常情况使用Banner mock数据');
						this.bannerList = [{
								image: 'https://pic1.imgdb.cn/item/6895db7958cb8da5c812aa08.jpg',
								title: '雷波脐橙·金桂飘香',
								desc: '承载山川灵韵，缔造甘露琼浆'
							},
							{
								image: 'https://pic1.imgdb.cn/item/6895db6e58cb8da5c812aa02.jpg',
								title: '马湖秘境·云水谣',
								desc: '国家四A胜境，天地间的澄澈馈赠'
							}
						];
						this.bannerError = false; // 有mock数据就不显示错误
					} finally {
						this.bannerLoading = false
					}
				},

				// 获取商品推荐数据
				async fetchData1() {
					try {
						this.productLoading = true
						// TODO fetchGoodsList 会在这里使用
						let params = {
							pageSize: 4,
							pageNo: 1,
							isHot: 1 // 只获取热销商品
						}
						let res = await fetchGoodsList(params)
						if (res.code == 200 && res.rows && res.rows.length > 0) {
							this.featuredProducts = res.rows.map(item => ({
								goodsId: item.goodsId,
								img: item.goodsImage || item.img,
								name: item.goodsName,
								desc: item.sellingPoint || item.description || '精选商品',
								likeNum: item.virtualSoldNum || item.soldNum || 0,
								price: item.promotionPrice || item.price,
								originalPrice: item.price,
								rating: item.rating || '4.8',
								tag: item.tag || '',
								isHot: item.isHot == 1,
								imageLoaded: false
							}));
						} else {
							// 如果接口没有数据，使用默认数据
							console.log('商品推荐接口无数据，使用默认数据');
							this.featuredProducts = [{
									goodsId: 'mock001',
									img: 'https://pic1.imgdb.cn/item/6895db7958cb8da5c812aa08.jpg',
									name: '新鲜橙子',
									desc: '酸甜可口，营养丰富的优质橙子',
									likeNum: 128,
									price: 29.9,
									originalPrice: 39.9,
									rating: '4.8',
									tag: '新品',
									isHot: true,
									imageLoaded: false
								},
								{
									goodsId: 'mock002',
									img: 'https://pic1.imgdb.cn/item/6895db6e58cb8da5c812aa02.jpg',
									name: '有机蔬菜',
									desc: '绿色健康，无农药残留的有机蔬菜',
									likeNum: 89,
									price: 19.9,
									originalPrice: 25.9,
									rating: '4.9',
									tag: '有机',
									isHot: false,
									imageLoaded: false
								},
								{
									goodsId: 'mock003',
									img: 'https://pic1.imgdb.cn/item/6895daa458cb8da5c812a9a6.jpg',
									name: '地方特产',
									desc: '正宗地道的特色农产品',
									likeNum: 156,
									price: 49.9,
									originalPrice: 59.9,
									rating: '4.7',
									tag: '特产',
									isHot: true,
									imageLoaded: false
								},
								{
									goodsId: 'mock004',
									img: 'https://pic1.imgdb.cn/item/6895db8958cb8da5c812aa0f.jpg',
									name: '精选坚果',
									desc: '营养丰富，口感香脆的优质坚果',
									likeNum: 203,
									price: 39.9,
									originalPrice: 49.9,
									rating: '4.6',
									tag: '热销',
									isHot: false,
									imageLoaded: false
								}
							];
						}

						console.log('商品推荐数据载入完毕');
					} catch (error) {
						console.error('获取商品推荐数据失败:', error);
						// 异常情况下也使用mock数据
						console.log('异常情况使用商品推荐mock数据');
						this.featuredProducts = [{
								goodsId: 'mock001',
								img: 'https://pic1.imgdb.cn/item/6895db7958cb8da5c812aa08.jpg',
								name: '新鲜橙子',
								desc: '酸甜可口，营养丰富的优质橙子',
								likeNum: 128,
								price: 29.9,
								originalPrice: 39.9,
								rating: '4.8',
								tag: '新品',
								isHot: true,
								imageLoaded: false
							},
							{
								goodsId: 'mock002',
								img: 'https://pic1.imgdb.cn/item/6895db6e58cb8da5c812aa02.jpg',
								name: '有机蔬菜',
								desc: '绿色健康，无农药残留的有机蔬菜',
								likeNum: 89,
								price: 19.9,
								originalPrice: 25.9,
								rating: '4.9',
								tag: '有机',
								isHot: false,
								imageLoaded: false
							}
						];
					} finally {
						this.productLoading = false
					}
				},

				// 导航到搜索页面
				toSearch() {
					uni.navigateTo({
						url: "/subpackages/search/index/index"
					})
				},

				// 轮播图切换事件
				onBannerChange(e) {
					this.current = e.current;
					console.log('轮播图切换:', e.current);
				},

				// 轮播图点击事件
				onBannerClick(e) {
					const currentIndex = e.current || 0;
					const imageList = this.bannerList.map(item => item.image);

					uni.previewImage({
						current: currentIndex,
						urls: imageList,
						success: () => {
							console.log('图片预览成功');
						},
						fail: (err) => {
							console.error('图片预览失败:', err);
							uni.showToast({
								title: '预览失败，请重试',
								icon: 'none',
								duration: 2000
							});
						}
					});
				},

				// Banner加载完毕
				onBannerLoad() {
					console.log('Banner载入完毕');
				},

				// Banner加载异常
				onBannerError() {
					this.bannerError = true
					uni.showToast({
						title: 'Banner载入异常',
						icon: 'none',
						duration: 3000
					})
				},

				// 功能区块点击事件
				goToLeiBoNongTe() {
					console.log('点击雷波农特 - 跳转到乡村页面');
					// 通过事件通知父组件切换到乡村页面(索引1)
					this.$emit('switchTab', 1);
				},

				goToXiangZhenDaJi() {
					console.log('点击乡镇大集 - 跳转到雷波页面');
					// 通过事件通知父组件切换到雷波页面(索引3)
					this.$emit('switchTab', 3);
				},

				goToTaoCanZhuanQu() {
					console.log('点击套餐专区 - 跳转到购物车页面');
					// 通过事件通知父组件切换到购物车页面(索引2)
					this.$emit('switchTab', 2);
				},

				goToVideoShow() {
					console.log('点击视频展示 - 跳转到个人中心页面');
					// 通过事件通知父组件切换到个人中心页面(索引4)
					this.$emit('switchTab', 4);
				},

				// 跳转商品详情
				goToGoodsDetail(goodsId) {
					uni.navigateTo({
						url: `/subpackages/goods/detail/detail?goodsId=${goodsId}`
					})
				},

				// 快速购买
				quickBuy(product) {
					uni.showModal({
						title: '添加到购物车',
						content: `确认将"${product.name}"添加到购物车？`,
						confirmText: '确认',
						cancelText: '取消',
						confirmColor: '#007aff',
						success: async (res) => {
							if (res.confirm) {
								// TODO: 添加购物车接口调用 - 暂时注释使用mock响应
								// let result = await AddCart({
								//     "skuId": product.goodsId,
								//     "goodsNum": 1
								// })
								// if (result.code != 200) {
								//     return uni.showToast({
								//         title: result.msg,
								//         icon: 'error',
								//         duration: 2000
								//     })
								// }

								// Mock成功响应
								uni.showToast({
									title: '已添加到购物车',
									icon: 'success',
									duration: 2000
								});
							}
						}
					});
				},

				// 图片加载处理
				onImageLoad(index) {
					if (this.featuredProducts[index]) {
						this.$set(this.featuredProducts[index], 'imageLoaded', true);
					}
				},

				// 图片错误处理
				onImageError(index) {
					if (this.featuredProducts[index]) {
						this.$set(this.featuredProducts[index], 'imageLoaded', true);
						// 设置默认图片
						this.$set(this.featuredProducts[index], 'img',
							'https://pic1.imgdb.cn/item/6895daa458cb8da5c812a9a6.jpg');
					}
				}
			}
		}
	</script>

	<style lang="scss" scoped>
		.home-container {
			width: 100%;
			background: #f5f5f5;
			position: relative;
			display: flex;
			flex-direction: column;
		}

		// 顶部搜索栏
		.top-search-bar {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 1000;
			background: linear-gradient(to bottom, #34C759 0%, #34C759 30%, #5DD9A4 100%);
			box-shadow: 0 2px 10px rgba(52, 199, 89, 0.2);
			height: 110rpx !important;
			/* 固定渐变背景高度为152rpx */
		}

		.search-content {
			display: flex;
			align-items: flex-start;
			padding: 0 30rpx;
			/* 右侧空间由动态计算的搜索框宽度控制，不再需要固定的padding-right */
		}

		.search-box {
			/* 宽度由内联样式动态控制，不再使用flex: 1 */
			background: #ffffff;
			border-radius: 44rpx;
			padding: 0 20rpx;
			display: flex;
			align-items: center;
			gap: 12rpx;
			border: 1rpx solid rgba(0, 0, 0, 0.1);
			transition: all 0.3s ease;
			min-width: 200rpx;
			/* 确保最小宽度 */
			max-width: calc(100vw - 300rpx);
			/* 确保不会超出屏幕 */

			&:active {
				background: rgba(255, 255, 255, 0.9);
				transform: scale(0.98);
			}
		}

		.search-icon {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.search-text {
			flex: 1;
			font-size: 26rpx;
			color: rgba(0, 0, 0, 0.3);
			font-weight: 400;
		}

		// 渐变衔接容器
		.gradient-bridge {
			position: absolute;
			left: 0;
			right: 0;
			height: 180rpx;
			background: linear-gradient(to bottom, #5DD9A4 0%, #5DD9A4 50%, #B8E5D4 100%);
			/* 三段式渐变：顶部中色，中间中色，底部浅色 */
			top: 0;
			z-index: 1;
		}

		// Banner轮播区域
		.banner-section {
			padding: 0 30rpx 30rpx 30rpx; /* 顶部不要padding，让渐变容器紧贴搜索栏 */
			position: relative;
			z-index: 10;
			/* 在渐变背景之上，但不超过搜索栏 */
			flex-shrink: 0;
			/* 不允许压缩 */
			margin-bottom: 20rpx;
		}

		.swiper-container {
			position: relative;
			margin-top: 100rpx; /* 给轮播区域添加顶部间距 */
			z-index: 2; /* 确保在渐变背景之上 */
		}

		// 自定义指示器样式
		.custom-indicator {
			position: absolute;
			bottom: 20rpx;
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			align-items: center;
			gap: 12rpx;
			z-index: 10;
		}

		.indicator-dot {
			width: 12rpx;
			height: 12rpx;
			border-radius: 50%;
			background-color: #cccccc;
			transition: all 0.3s ease;

			&--active {
				background-color: #34C759;
				width: 24rpx;
				border-radius: 6rpx;
			}
		}

		.banner-skeleton {
			width: 100%;
			height: 224rpx;
			border-radius: 12rpx;
			overflow: hidden;
			margin-top: 100rpx; /* 给骨架屏添加顶部间距 */
			position: relative;
			z-index: 2; /* 确保在渐变背景之上 */
		}

		.skeleton-banner {
			width: 100%;
			height: 100%;
			background: linear-gradient(90deg, #f0f4f8 25%, #e2e8f0 50%, #f0f4f8 75%);
			background-size: 200% 100%;
			animation: skeleton-loading 1.8s infinite ease-in-out;
		}

		// 功能区块
		.function-blocks {
			padding: 0 30rpx;
			margin-bottom: 20rpx;
			margin-top: -30rpx;
			/* 上移避免空缺 */
			flex-shrink: 0;
			/* 不允许压缩 */
		}

		.block-row {
			margin-bottom: 24rpx;

			&.small-blocks {
				display: flex;
				gap: 24rpx;
			}
		}



		.block-item {
			border-radius: 24rpx;
			padding: 60rpx 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			overflow: hidden;
			transition: all 0.3s ease;

			&:active {
				transform: scale(0.98);
			}

			&.orange-block {
				background: linear-gradient(135deg, #FF8A00 0%, #FF6B35 100%);
				box-shadow: 0 8rpx 32rpx rgba(255, 138, 0, 0.3);
			}

			&.blue-block {
				background: linear-gradient(135deg, #2E5984 0%, #1E3A5F 100%);
				box-shadow: 0 8rpx 32rpx rgba(46, 89, 132, 0.3);
			}

			&.small {
				flex: 1;
				padding: 40rpx 20rpx;
			}
		}

		.block-title {
			font-size: 36rpx;
			font-weight: 700;
			color: #ffffff;
			text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.3);
			letter-spacing: 2rpx;
		}

		.video {
			height: 200rpx;
		}

		// 商品推荐区域
		.featured-products {
			box-sizing: border-box;
			width: 100%;
			padding: 0 30rpx;
			padding-bottom: 100rpx;
			/* 增加底部内边距，为底部tabbar留出足够空间 */
			flex: 1;
			/* 占据剩余空间 */
		}

		.products-header {
			margin-bottom: 30rpx;
			text-align: center;
		}

		.header-content {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 10rpx;
		}

		.header-title {
			font-size: 36rpx;
			font-weight: 700;
			color: #333;
		}

		.header-desc {
			font-size: 26rpx;
			color: #666;
		}

		// 产品网格
		.products-grid {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 20rpx;
		}

		// 产品卡片
		.product-card-enhanced {
			background: #fff;
			border-radius: 16rpx;
			overflow: hidden;
			box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
			transition: all 0.3s ease;

			&:active {
				transform: scale(0.98);
			}
		}

		.card-image-container {
			position: relative;
			width: 100%;
			height: 300rpx;
		}

		.card-image {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		.image-skeleton {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(90deg, #f0f4f8 25%, #e2e8f0 50%, #f0f4f8 75%);
			background-size: 200% 100%;
			animation: skeleton-loading 1.8s infinite ease-in-out;
		}

		.card-badge-left {
			position: absolute;
			top: 10rpx;
			left: 10rpx;
			z-index: 2;
		}

		.badge-icon {
			width: 60rpx;
			height: 60rpx;
		}



		.card-content {
			padding: 20rpx;
		}

		.product-desc {
			font-size: 24rpx;
			color: #666;
			margin-bottom: 16rpx;
			line-height: 1.4;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			text-overflow: ellipsis;
			word-break: break-word;
			min-height: 67rpx;
			/* 保证两行的最小高度 */
		}

		.price-section {
			display: flex;
			align-items: center;
			gap: 10rpx;
		}

		.current-price {
			font-size: 32rpx;
			font-weight: 700;
			color: #ff4757;
		}

		.original-price {
			font-size: 24rpx;
			color: #999;
			text-decoration: line-through;
		}

		// 骨架屏样式
		.product-skeleton {
			background: #fff;
			border-radius: 16rpx;
			overflow: hidden;
			box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
		}

		.skeleton-image {
			width: 100%;
			height: 300rpx;
			background: linear-gradient(90deg, #f0f4f8 25%, #e2e8f0 50%, #f0f4f8 75%);
			background-size: 200% 100%;
			animation: skeleton-loading 1.8s infinite ease-in-out;
		}

		.skeleton-content {
			padding: 20rpx;
		}

		.skeleton-desc,
		.skeleton-price {
			background: linear-gradient(90deg, #f0f4f8 25%, #e2e8f0 50%, #f0f4f8 75%);
			background-size: 200% 100%;
			animation: skeleton-loading 1.8s infinite ease-in-out;
			margin-bottom: 10rpx;
			border-radius: 4rpx;
		}

		.skeleton-desc {
			height: 67rpx;
			/* 匹配两行描述的高度 */
			width: 100%;
		}

		.skeleton-price {
			height: 24rpx;
			width: 40%;
		}

		// 动画效果
		@keyframes skeleton-loading {
			0% {
				background-position: 200% 0;
			}

			100% {
				background-position: -200% 0;
			}
		}
	</style>