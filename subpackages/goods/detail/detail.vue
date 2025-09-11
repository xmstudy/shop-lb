<template>
	<view class="product-detail">
		<!-- 页面主体内容 -->
		<scroll-view scroll-y class="detail-body" :scroll-top="scrollTop" :scroll-with-animation="true"
			@scroll="onScroll">
			<!-- 1. 轮播图区域 -->
			<view class="product-banner">
				<swiper class="banner-swiper" :indicator-dots="false" :autoplay="false" @change="onSwiperChange">
					<swiper-item v-for="(image, index) in productImages" :key="index">
						<image class="banner-image" :src="image.url" mode="aspectFill" @click="previewImage(index)">
						</image>
					</swiper-item>
				</swiper>
			</view>

			<!-- 2. Tab导航和轮播指示器 -->
			<view class="tab-nav">
				<view class="tab-container">
					<view class="tab-item" :class="{ active: activeTab === index }" v-for="(tab, index) in tabList"
						:key="index" @click="switchTab(index)">
						{{ tab.name }}
					</view>
				</view>
				<view class="swiper-indicator">
					<text>{{ currentImageIndex + 1 }}/{{ productImages.length }}</text>
				</view>
			</view>

			<!-- 3. 商品信息区域 -->
			<view class="product-info" id="product-info">
				<!-- 商品名称和收藏 -->
				<view class="product-header">
					<view class="product-title">
						<text>{{ productName }}</text>
					</view>
					<view class="favorite-btn" @click="toggleFavorite">
						<u-icon :name="isFavorite ? 'star-fill' : 'star'" :color="isFavorite ? '#ff4d4f' : '#999'"
							size="24"></u-icon>
					</view>
				</view>

				<!-- 价格和商品数据 -->
				<view class="price-stats-row">
					<view class="price-info">
						<view class="current-price">
							<text class="price-symbol">¥</text>
							<text class="price-value">{{ currentPrice }}</text>
						</view>
						<view class="original-price" v-if="originalPrice > currentPrice">
							<text>¥{{ originalPrice }}</text>
						</view>
					</view>
					<view class="product-stats">
						<view class="stat-item">
							<text class="stat-label">库存</text>
							<text class="stat-value">{{ productData.quantity || 0 }}件</text>
						</view>
						<view class="stat-item">
							<text class="stat-label">已售</text>
							<text class="stat-value">{{ salesCount }}+</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 4. 商品详情介绍 -->
			<view class="product-detail-content" id="detail-content">
				<view class="section-title">商品详情</view>
				<view class="detail-rich-text">
					<rich-text :nodes="productDetailHtml"></rich-text>
				</view>
			</view>

			<!-- 5. 用户评论 -->
			<view class="product-reviews" id="product-reviews">
				<view class="section-title">
					<text>用户评价</text>
					<view class="review-action" @click="goToComment">
						<text>我要评论</text>
						<u-icon name="arrow-right" size="14" color="#999"></u-icon>
					</view>
				</view>
				
				<!-- 评论统计 -->
				<view class="review-stats" v-if="reviewStats">
					<view class="stats-item">
						<text class="stats-label">好评率</text>
						<text class="stats-value">{{ reviewStats.goodRate }}%</text>
					</view>
					<view class="stats-item">
						<text class="stats-label">总评价</text>
						<text class="stats-value">{{ reviewStats.totalCount }}条</text>
					</view>
				</view>
				
				<view class="review-list" v-if="reviewList && reviewList.length > 0">
					<view class="review-item" v-for="(review, index) in reviewList" :key="index">
						<view class="review-header">
							<image class="user-avatar" :src="review.userAvatar || '/static/images/default-avatar.png'" mode="aspectFill"></image>
							<view class="user-info">
								<text class="user-name">{{ review.userName || '匿名用户' }}</text>
								<view class="review-stars">
									<u-icon v-for="star in 5" :key="star" name="star-fill"
										:color="star <= review.rating ? '#ffa500' : '#e0e0e0'" size="12"></u-icon>
								</view>
							</view>
							<text class="review-time">{{ formatTime(review.createTime) }}</text>
						</view>
						<view class="review-content">
							<text>{{ review.content }}</text>
						</view>
						<view class="review-images" v-if="review.images && review.images.length > 0">
							<image v-for="(img, imgIndex) in review.images" :key="imgIndex" class="review-image"
								:src="img" mode="aspectFill" @click="previewReviewImage(review.images, imgIndex)">
							</image>
						</view>
					</view>
				</view>
				
				<!-- 暂无评论 -->
				<view class="no-reviews" v-else>
					<text>暂无评论，快来做第一个评论的人吧~</text>
				</view>
			</view>

			<!-- 6. 底部富文本介绍 -->
			<view class="product-introduction">
				<view class="introduction-rich-text">
					<rich-text :nodes="productIntroductionHtml"></rich-text>
				</view>
			</view>
		</scroll-view>

		<!-- SKU选择弹窗 -->
		<u-popup v-if="showSku" :show="showSku" @close="closeSkuSelector" mode="bottom" :round="20" :overlay="true"
			:closeOnClickOverlay="true" :safeAreaInsetBottom="true">
			<view class="sku-popup">
				<view class="sku-header">
					<image class="sku-product-image" :src="getSkuImage()" mode="aspectFill"></image>
					<view class="sku-product-info">
						<text class="sku-product-name">{{ productName }}</text>
						<view class="sku-product-price">
							<text class="sku-price-symbol">¥</text>
							<text class="sku-price-value">{{ selectedSkuPrice }}</text>
						</view>
					</view>
					<view class="sku-close" @click="closeSkuSelector">
						<u-icon name="close" color="#999" size="20"></u-icon>
					</view>
				</view>

				<view class="sku-options">
					<view class="sku-option-group" v-for="(spec, specIndex) in skuOptions.spec" :key="specIndex">
						<text class="option-title">{{ spec.name }}</text>
						<view class="option-items">
							<view class="option-item" v-for="(value, valueIndex) in spec.values" :key="valueIndex"
								:class="{ active: spec.selectedValue === value }"
								@click="selectSpecValue(specIndex, value)">
								<view class="option-content">
									<text>{{ value }}</text>
									<text class="sku-price"
										v-if="getSkuPrice(specIndex, value)">¥{{ getSkuPrice(specIndex, value) }}</text>
								</view>
							</view>
						</view>
					</view>

					<view class="quantity-selector">
						<text class="quantity-title">数量</text>
						<view class="quantity-control">
							<view class="quantity-btn" @click="decreaseQuantity">
								<u-icon name="minus" color="#666" size="16"></u-icon>
							</view>
							<text class="quantity-value">{{ quantity }}</text>
							<view class="quantity-btn" @click="increaseQuantity">
								<u-icon name="plus" color="#666" size="16"></u-icon>
							</view>
						</view>
					</view>
				</view>

				<view class="sku-footer">
					<view class="sku-total">
						<text>总计：</text>
						<text class="total-price">¥{{ totalPrice }}</text>
					</view>
					<view class="sku-action" @click="confirmSkuAction">
						<text>{{ skuActionType === 'cart' ? '加入购物车' : '确认购买' }}</text>
					</view>
				</view>
			</view>
		</u-popup>

		<!-- 底部操作栏 -->
		<view class="bottom-actions">
			<view class="action-left">
				<view class="action-btn" @click="goToCart">
					<image class="action-icon" src="/static/images/gwc.png" mode="aspectFit"></image>
					<text>购物车</text>
				</view>
				<button class="action-btn customer-service-btn" open-type="contact" hover-class="none">
					<image class="action-icon" src="/static/images/wdkf.png" mode="aspectFit"></image>
					<text>客服</text>
				</button>
				<view class="action-btn" @click="toggleFavorite">
					<u-icon :name="isFavorite ? 'star-fill' : 'star'" :color="isFavorite ? '#ff4d4f' : '#666'"
						size="20"></u-icon>
					<text>收藏</text>
				</view>
			</view>
			<view class="action-right">
				<view class="add-cart-btn" @click="addToCart">加入购物车</view>
				<view class="buy-now-btn" @click="buyNow">立即购买</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		fetchGoodsDetail,
		changeGoodsFavor,
		fetchGoodsCommentList,
		getCommentStats
	} from '@/api/goods'
	import {
		AddCart
	} from '@/api/cart'

	export default {
		name: 'ProductDetail',
		data() {
			return {
				// 商品ID
				goodsId: null,

				// 顶部安全区域
				statusBarHeight: 0,
				capsuleHeight: 44,
				capsuleTop: 0,

				// 页面状态
				loading: false,
				scrollTop: 0, // scroll-view的滚动位置
				scrollTopCache: 0, // 滚动位置缓存

				// SKU相关
				showSku: false,
				skuActionType: 'cart', // 'cart' 或 'buy'
				selectedSkuIndex: 0,
				quantity: 1,
				skuOptions: {
					spec: []
				},

				// 商品数据
				productData: null,

				// 轮播相关
				currentImageIndex: 0,
				productImages: [],

				// Tab导航
				activeTab: 0,
				tabList: [{
						name: '商品',
						id: 'product-info'
					},
					{
						name: '详情',
						id: 'detail-content'
					},
					{
						name: '评价',
						id: 'product-reviews'
					}
				],

				// 商品信息
				productName: '',
				currentPrice: 0,
				originalPrice: 0,
				isFavorite: false,
				salesCount: 0,

				// 商品详情HTML
				productDetailHtml: '',

				// 底部富文本介绍HTML
				productIntroductionHtml: '',


				// 购物车数量
				cartCount: 0,

				// 评论相关
				reviewList: [],
				reviewStats: null,

				// 缓存解析后的SKU规格数据
				_skuSpecsCache: null
			}
		},

		computed: {
			// 顶部标题栏样式
			headerStyle() {
				return `padding-top:${this.capsuleTop}px;background:#fff;`
			},

			// 内容区顶部偏移
			contentTopPx() {
				return this.capsuleTop + this.capsuleHeight
			},

			// SKU相关计算属性
			selectedSkuPrice() {
				const selectedSku = this.getSelectedSku()
				if (selectedSku) {
					// 优先使用促销价格，其次使用原价
					return selectedSku.promotionPrice || selectedSku.price || this.currentPrice
				}
				return this.currentPrice || 0
			},

			totalPrice() {
				return (this.selectedSkuPrice * this.quantity).toFixed(2)
			}
		},

		onLoad(options) {
			// 获取商品ID
			if (options.goodsId) {
				this.goodsId = options.goodsId
			}
		},

		mounted() {
			this.initPageLayout()
			// 获取商品详情数据
			this.fetchProductDetail()
		},

		methods: {
			// 初始化页面布局
			initPageLayout() {
				const sys = uni.getSystemInfoSync()
				this.statusBarHeight = sys.statusBarHeight || 0

				// #ifdef MP-WEIXIN
				try {
					const rect = wx.getMenuButtonBoundingClientRect()
					if (rect && rect.height) {
						this.capsuleHeight = rect.height
						this.capsuleTop = rect.top
					}
				} catch (e) {}
				// #endif

				// 其他端给个合理默认
				// #ifndef MP-WEIXIN
				this.capsuleHeight = 44
				this.capsuleTop = this.statusBarHeight
				// #endif
			},

			// scroll-view滚动事件
			onScroll(e) {
				this.scrollTopCache = e.detail.scrollTop
			},

			// 轮播图切换
			onSwiperChange(e) {
				this.currentImageIndex = e.detail.current
			},

			// Tab切换
			switchTab(index) {
				this.activeTab = index
				const targetId = this.tabList[index].id
				this.scrollToElement(targetId)
			},

			// 滚动到指定元素
			scrollToElement(elementId) {
				this.goTo(`#${elementId}`)
			},

			// 使用scroll-view的滚动方法
			goTo(selector) {
				const q = uni.createSelectorQuery().in(this)
				q.select(selector).boundingClientRect()
				q.exec(rects => {
					const sec = rects?.[0]
					if (!sec) return
					// 计算目标位置，考虑当前滚动位置和留出间距
					const targetScrollTop = sec.top + this.scrollTopCache - uni.upx2px(20)
					// 设置scroll-view的滚动位置
					this.scrollTop = Math.max(targetScrollTop, 0)
				})
			},

			// 预览图片
			previewImage(index) {
				const urls = this.productImages.map(img => img.url)
				uni.previewImage({
					current: index,
					urls: urls
				})
			},

			// 预览评论图片
			previewReviewImage(images, index) {
				uni.previewImage({
					current: index,
					urls: images
				})
			},

			// 跳转到评论页面
			goToComment() {
				if (!this.productData) {
					uni.showToast({
						title: '商品信息加载中',
						icon: 'none'
					})
					return
				}
				
				// 构建商品信息参数
				const productInfo = {
					goodsId: this.goodsId,
					goodsName: this.productName,
					goodsImage: this.productImages.length > 0 ? this.productImages[0].url : '',
					currentPrice: this.currentPrice,
					originalPrice: this.originalPrice
				}
				
				// 跳转到评论页面
				uni.navigateTo({
					url: `/subpackages/goods/commentsVIew/commentsVIew?productInfo=${encodeURIComponent(JSON.stringify(productInfo))}`
				})
			},

			// 切换收藏状态
			async toggleFavorite() {
				try {
					// TODO changeGoodsFavor 会在这里使用
					const params = {
						goodsId: this.goodsId,
						favorFlag: this.isFavorite ? 0 : 1 // 0取消收藏，1收藏
					}

					const res = await changeGoodsFavor(params)
					if (res.code === 200) {
						this.isFavorite = !this.isFavorite
						uni.showToast({
							title: this.isFavorite ? '已收藏' : '已取消收藏',
							icon: 'success'
						})
					} else {
						uni.showToast({
							title: res.msg || '操作失败',
							icon: 'none'
						})
					}
				} catch (error) {
					console.error('收藏操作失败:', error)
					uni.showToast({
						title: '操作失败，请重试',
						icon: 'none'
					})
				}
			},

			// 格式化时间
			formatTime(timeStr) {
				if (!timeStr) return ''
				try {
					const date = new Date(timeStr)
					const year = date.getFullYear()
					const month = String(date.getMonth() + 1).padStart(2, '0')
					const day = String(date.getDate()).padStart(2, '0')
					return `${year}-${month}-${day}`
				} catch (error) {
					return timeStr
				}
			},

			// 返回上一页
			goBack() {
				// 获取当前页面栈
				const pages = getCurrentPages()

				// 如果页面栈只有1页或者没有上一页，跳转到首页
				if (pages.length <= 1) {
					// 设置全局下标为0
					if (getApp().globalData) {
						getApp().globalData.activeTabbarKey = 0
					}
					// 跳转到首页
					uni.reLaunch({
						url: '/pages/index/index'
					})
				} else {
					// 有上一页，正常返回
					uni.navigateBack({
						delta: 1
					})
				}
			},

			// 分享商品
			shareProduct() {
				uni.showToast({
					title: '分享功能',
					icon: 'none'
				})
			},


			// 跳转客服
			goToService() {
				uni.showToast({
					title: '客服功能',
					icon: 'none'
				})
			},

			// 显示SKU选择器
			showSkuSelector(type) {
				this.skuActionType = type
				this.showSku = true
			},

			// 关闭SKU选择器
			closeSkuSelector() {
				this.showSku = false
			},

			// 加入购物车
			addToCart() {
				this.showSkuSelector('cart')
			},

			// 立即购买
			buyNow() {
				this.showSkuSelector('buy')
			},

			// 确认SKU操作
			async confirmSkuAction() {
				if (this.skuActionType === 'cart') {
					// 加入购物车
					await this.addToCartWithSku()
				} else {
					// 立即购买 - 跳转订单页面
					await this.buyNowWithSku()
				}
			},

			// 带SKU的加入购物车
			async addToCartWithSku() {
				try {
					// 获取选中的SKU
					const selectedSku = this.getSelectedSku()
					if (!selectedSku || !selectedSku.skuId) {
						uni.showToast({
							title: '商品信息异常，请重试',
							icon: 'none'
						})
						return
					}

					// TODO AddCart 会在这里使用
					const params = {
						skuId: selectedSku.skuId,
						goodsNum: this.quantity
					}

					const res = await AddCart(params)
					if (res.code === 200) {
						uni.showToast({
							title: '加入购物车成功',
							icon: 'success'
						})
						this.closeSkuSelector()
					} else {
						uni.showToast({
							title: res.msg || '加入购物车失败',
							icon: 'none'
						})
					}
				} catch (error) {
					console.error('加入购物车失败:', error)
					uni.showToast({
						title: '加入购物车失败，请重试',
						icon: 'none'
					})
				}
			},

			// 获取选中的SKU
			getSelectedSku() {
				if (!this.productData.skus || this.productData.skus.length === 0) {
					return null
				}

				// 如果没有规格选项，返回第一个SKU
				if (!this.skuOptions.spec || this.skuOptions.spec.length === 0) {
					return this.productData.skus[0]
				}

				// 根据选中的规格找到对应的SKU
				const selectedSpecs = this.skuOptions.spec.map(spec => spec.selectedValue)

				const matchedSku = this.productData.skus.find(sku => {
					try {
						const fullSpecs = JSON.parse(sku.fullSpecs || '{}')
						return selectedSpecs.every((value, index) => {
							const specName = this.skuOptions.spec[index].name
							return fullSpecs[specName] === value
						})
					} catch (error) {
						return false
					}
				})

				// 如果找不到匹配的SKU，返回第一个
				return matchedSku || this.productData.skus[0]
			},

			// 获取选中的SKU ID
			getSelectedSkuId() {
				const selectedSku = this.getSelectedSku()
				return selectedSku ? selectedSku.skuId : null
			},

			// 带SKU的立即购买
			async buyNowWithSku() {
				const skuId = this.getSelectedSkuId()
				if (!skuId) {
					uni.showToast({
						title: '请选择商品规格',
						icon: 'error'
					})
					return
				}
				try {
					// 构建订单数据（符合接口要求的格式）
					const orderData = {
						goodsList: [{
							skuId: skuId,
							goodsNum: this.quantity
						}],
						orderType: 1, // 普通订单
						promotionId: null // 无促销活动
					}

					// 将订单数据存储到全局数据中
					const globalData = require('@/utils/globalData.js').default
					globalData.orderData = orderData

					if (getApp().globalData) {
						getApp().globalData.orderData = orderData
					}
					// 跳转到订单确认页面
					uni.navigateTo({
						url: '/subpackages/order/detail/detail',
						fail: (err) => {
							console.error('页面跳转失败:', err)
							uni.showToast({
								title: '页面跳转失败，请重试',
								icon: 'error'
							})
						}
					})

					this.closeSkuSelector()
				} catch (error) {
					console.error('预览订单失败:', error)
					uni.showToast({
						title: '网络错误，请重试',
						icon: 'error'
					})
				}
			},

			// 选择规格值
			selectSpecValue(specIndex, value) {
				this.skuOptions.spec[specIndex].selectedValue = value
				this.updateSelectedSku()
			},

			// 获取SKU价格
			getSkuPrice(specIndex, value) {
				const spec = this.skuOptions.spec[specIndex]
				if (!spec || !spec.skus) return null

				const sku = spec.skus.find(s => s.value === value)
				return sku ? sku.price : null
			},

			// 获取缓存的SKU规格数据
			getCachedSkuSpecs() {
				if (!this._skuSpecsCache && this.productData && this.productData.skus) {
					this._skuSpecsCache = this.productData.skus.map(sku => {
						try {
							return {
								...sku,
								parsedSpecs: JSON.parse(sku.fullSpecs)
							}
						} catch (error) {
							console.error('解析SKU规格失败:', error)
							return {
								...sku,
								parsedSpecs: {}
							}
						}
					})
				}
				return this._skuSpecsCache
			},

			// 清理SKU缓存
			clearSkuCache() {
				this._skuSpecsCache = null
			},

			// 更新选中的SKU
			updateSelectedSku() {
				// 根据当前选择的规格值找到对应的SKU
				const selectedSpecs = this.skuOptions.spec.map(spec => spec.selectedValue)
				const cachedSkus = this.getCachedSkuSpecs()

				if (cachedSkus && cachedSkus.length > 0) {
					const matchingSku = cachedSkus.find(sku => {
						return selectedSpecs.every((value, index) => {
							const specName = this.skuOptions.spec[index].name
							return sku.parsedSpecs[specName] === value
						})
					})

					if (matchingSku) {
						this.selectedSkuIndex = this.productData.skus.indexOf(matchingSku)
					}
				}
			},

			// 增加数量
			increaseQuantity() {
				if (this.quantity < 99) {
					this.quantity++
				}
			},

			// 减少数量
			decreaseQuantity() {
				if (this.quantity > 1) {
					this.quantity--
				}
			},

			// 获取商品详情数据
			async fetchProductDetail() {
				if (!this.goodsId) {
					uni.showToast({
						title: '商品ID不存在',
						icon: 'none'
					})
					return
				}

				try {
					this.loading = true
					// TODO fetchGoodsDetail 会在这里使用
					const res = await fetchGoodsDetail(this.goodsId)

					if (res.code === 200 && res.data) {
						const data = res.data

						// 清理旧的SKU缓存
						this.clearSkuCache()

						// 设置商品基本信息
						this.productName = data.goodsName || '商品名称'
						this.currentPrice = data.promotionPrice || data.price || 0
						this.originalPrice = data.originPrice || data.price || 0
						this.isFavorite = data.isFavor === 1
						this.salesCount = (data.soldNum || 0) + (data.virtualSoldNum || 0)

						// 设置商品数据
						this.productData = {
							...data,
							quantity: data.quantity || 0,
							skus: data.skus || []
						}

						// 处理商品图片
						this.processProductImages(data)

						// 处理SKU选项
						this.processSkuOptions(data)

						// 设置商品详情HTML
						this.productDetailHtml = data.details || '<p>暂无详细介绍</p>'

						// 设置商品介绍HTML
						this.productIntroductionHtml = data.sellingPoint ?
							`<div style="padding: 20px; line-height: 1.6;"><p style="color: #666;">${data.sellingPoint}</p></div>` :
							'<div style="padding: 20px; line-height: 1.6;"><p style="color: #666;">暂无商品介绍</p></div>'

						// 加载评论数据
						this.loadCommentsData()

					} else {
						uni.showToast({
							title: res.msg || '获取商品详情失败',
							icon: 'none'
						})
					}
				} catch (error) {
					console.error('获取商品详情失败:', error)
					uni.showToast({
						title: '获取商品详情失败',
						icon: 'none'
					})
				} finally {
					this.loading = false
				}
			},

			// 处理商品图片
			processProductImages(data) {
				this.productImages = []

				// 处理轮播图
				if (data.goodsImages) {
					try {
						const images = JSON.parse(data.goodsImages)
						if (Array.isArray(images)) {
							this.productImages = images.map(url => ({
								url
							}))
						}
					} catch (e) {
						// 如果解析失败，尝试按逗号分割
						const images = data.goodsImages.split(',').filter(url => url.trim())
						this.productImages = images.map(url => ({
							url: url.trim()
						}))
					}
				}

				// 如果没有轮播图，使用主图
				if (this.productImages.length === 0 && data.goodsImage) {
					this.productImages = [{
						url: data.goodsImage
					}]
				}

				// 如果还是没有图片，保持空数组
				if (this.productImages.length === 0) {
					this.productImages = []
				}
			},

			// 处理SKU选项
			processSkuOptions(data) {
				console.log('开始处理SKU选项')
				console.log('productData:', data)

				if (!data || !data.skus) {
					console.log('没有SKU数据')
					return
				}

				// 如果已经处理过，直接返回
				if (this.skuOptions.spec.length > 0) {
					console.log('SKU选项已处理，跳过重复处理')
					return
				}

				const skus = data.skus
				const specOptions = data.specOptions

				console.log('原始SKU数据:', skus)
				console.log('规格配置:', specOptions)

				// 解析规格选项配置
				let specConfig = []
				if (specOptions) {
					try {
						specConfig = JSON.parse(specOptions)
						console.log('解析后的规格配置:', specConfig)
					} catch (error) {
						console.error('解析规格配置失败:', error)
					}
				}

				// 重新构建SKU选项结构
				this.skuOptions.spec = []

				// 使用缓存的SKU规格数据
				const cachedSkus = this.getCachedSkuSpecs()

				// 根据规格配置创建选项
				specConfig.forEach(spec => {
					console.log('处理规格:', spec)
					const specOption = {
						name: spec.attrName,
						values: spec.attrValue,
						selectedValue: spec.attrValue[0], // 默认选择第一个
						skus: []
					}

					// 为每个规格值找到对应的SKU
					spec.attrValue.forEach(value => {
						console.log('查找规格值:', value)
						const matchingSkus = cachedSkus.filter(sku => {
							return sku.parsedSpecs[spec.attrName] === value
						})

						console.log('匹配的SKU:', matchingSkus)

						if (matchingSkus.length > 0) {
							specOption.skus.push({
								skuId: matchingSkus[0].skuId,
								price: matchingSkus[0].price,
								quantity: matchingSkus[0].quantity,
								value: value
							})
						}
					})

					this.skuOptions.spec.push(specOption)
				})

				// 如果有SKU数据，使用第一个SKU的价格作为默认价格
				if (skus.length > 0) {
					this.selectedSkuIndex = 0
				}

				console.log('处理后的SKU选项:', this.skuOptions.spec)
			},

			// 获取SKU弹窗中的商品图片
			getSkuImage() {
				if (this.productImages && this.productImages.length > 0 && this.productImages[0]) {
					return this.productImages[0].url || ''
				}
				return ''
			},

			// 跳转到购物车
			goToCart() {
				// 设置全局tabbar索引为2（购物车）
				if (getApp().globalData) {
					getApp().globalData.activeTabbarKey = 2
				}
				// 跳转到首页，购物车会通过v-if渲染
				uni.reLaunch({
					url: '/pages/index/index'
				})
			},

			// 联系客服
			goToService() {
				uni.showModal({
					title: '联系客服',
					content: '请拨打客服热线：400-123-4567',
					confirmText: '拨打',
					success: (res) => {
						if (res.confirm) {
							uni.makePhoneCall({
								phoneNumber: '400-123-4567'
							})
						}
					}
				})
			},

			// 加载评论数据
			async loadCommentsData() {
				try {
					// 并行加载评论列表和统计数据
					const [commentsRes, statsRes] = await Promise.all([
						// 使用 fetchGoodsCommentList 获取评论列表
						fetchGoodsCommentList({ 
							goodsId: this.goodsId, 
							pageNum: 1, 
							pageSize: 5 
						}),
						// 获取评论统计数据
						getCommentStats(this.goodsId)
					])

					// 处理评论列表
					if (commentsRes.code === 200 && commentsRes.data) {
						// 适配不同的数据结构
						this.reviewList = commentsRes.data.rows || commentsRes.data.list || commentsRes.data.records || []
						
						// 格式化评论数据，确保字段统一
						this.reviewList = this.reviewList.map(comment => ({
							id: comment.id || comment.commentId,
							userName: comment.memberName || comment.userName || '匿名用户',
							userAvatar: comment.memberAvatar || comment.userAvatar || '/static/images/default-avatar.png',
							rating: comment.rating || comment.score || 5,
							content: comment.content || comment.commentContent || '',
							images: this.parseCommentImages(comment.images || comment.commentImages),
							createTime: comment.createTime || comment.commentTime
						}))
					}

					// 处理评论统计
					if (statsRes.code === 200 && statsRes.data) {
						this.reviewStats = {
							goodRate: statsRes.data.goodRate || 0,
							totalCount: statsRes.data.totalCount || 0,
							...statsRes.data
						}
					}

				} catch (error) {
					console.error('加载评论数据失败:', error)
					// 设置空数据，不显示错误提示
					this.reviewList = []
					this.reviewStats = null
				}
			},

			// 解析评论图片
			parseCommentImages(images) {
				if (!images) return []
				
				try {
					// 如果是字符串，尝试解析为JSON
					if (typeof images === 'string') {
						const parsed = JSON.parse(images)
						if (Array.isArray(parsed)) {
							return parsed
						}
						// 如果不是数组，可能是逗号分隔的字符串
						return images.split(',').filter(img => img.trim())
					}
					
					// 如果已经是数组，直接返回
					if (Array.isArray(images)) {
						return images
					}
					
					return []
				} catch (error) {
					console.error('解析评论图片失败:', error)
					return []
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.product-detail {
		height: 100vh;
		background: #f5f5f5;
		display: flex;
		flex-direction: column;
	}

	/* 固定顶部标题栏 */
	.detail-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
	}

	.header-content {
		height: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding: 0 30rpx 16rpx 30rpx;
		position: relative;
		margin-bottom: 20rpx;
	}

	.header-title {
		font-size: 32rpx;
		font-weight: 600;
		color: #111;
	}

	.header-left {
		position: absolute;
		left: 30rpx;
		bottom: 16rpx;
	}

	.cart-badge {
		position: absolute;
		top: -8rpx;
		right: -8rpx;
		background: #ff4d4f;
		color: #fff;
		font-size: 20rpx;
		padding: 2rpx 6rpx;
		border-radius: 10rpx;
		min-width: 16rpx;
		text-align: center;
	}

	/* 页面主体 */
	.detail-body {
		flex: 1;
		height: 0;
		padding-bottom: 120rpx;
	}

	/* 轮播图区域 */
	.product-banner {
		position: relative;
		height: 600rpx;
		background: #fff;
	}

	.banner-swiper {
		width: 100%;
		height: 100%;
	}

	.banner-image {
		width: 100%;
		height: 100%;
	}

	.swiper-indicator {
		position: absolute;
		bottom: 20rpx;
		right: 20rpx;
		background: rgba(0, 0, 0, 0.5);
		color: #fff;
		padding: 8rpx 16rpx;
		border-radius: 20rpx;
		font-size: 24rpx;
	}

	/* Tab导航 */
	.tab-nav {
		background: #f5f5f5;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20rpx 30rpx;
		position: relative;
	}

	.tab-container {
		display: flex;
		background: #e0e0e0;
		border-radius: 25rpx;
		padding: 4rpx;
		position: relative;
	}

	.tab-item {
		padding: 16rpx 32rpx;
		font-size: 28rpx;
		color: #333;
		border-radius: 21rpx;
		transition: all 0.3s ease;
		position: relative;
		z-index: 2;

		&.active {
			color: #333;
			font-weight: 600;
			background: #fff;
			box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
		}
	}

	.swiper-indicator {
		position: absolute;
		right: 30rpx;
		top: 40rpx;
		background: rgba(0, 0, 0, 0.6);
		color: #fff;
		padding: 12rpx 20rpx;
		border-radius: 25rpx;
		font-size: 24rpx;
		min-width: 80rpx;
		text-align: center;
	}

	/* 商品信息区域 */
	.product-info {
		background: #fff;
		margin-bottom: 20rpx;
		padding: 30rpx;
	}

	.product-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}

	.product-title {
		flex: 1;
		margin-right: 20rpx;

		text {
			font-size: 32rpx;
			font-weight: 600;
			color: #333;
			line-height: 1.4;
		}
	}

	.favorite-btn {
		padding: 8rpx;
	}

	.price-stats-row {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}

	.price-info {
		display: flex;
		align-items: flex-end;
		gap: 20rpx;
	}

	.current-price {
		display: flex;
		align-items: flex-end;

		.price-symbol {
			font-size: 24rpx;
			color: #ff4d4f;
			margin-right: 4rpx;
		}

		.price-value {
			font-size: 48rpx;
			font-weight: 700;
			color: #ff4d4f;
		}
	}

	.original-price {
		text {
			font-size: 24rpx;
			color: #999;
			text-decoration: line-through;
		}
	}

	.product-stats {
		display: flex;
		gap: 40rpx;
	}

	.stat-item {
		display: flex;
		align-items: center;
		gap: 8rpx;

		.stat-label {
			font-size: 24rpx;
			color: #666;
		}

		.stat-value {
			font-size: 24rpx;
			color: #333;
			font-weight: 600;
		}
	}

	/* 通用区域样式 */
	.product-detail-content {
		background: #fff;
		margin-bottom: 20rpx;
		padding: 30rpx;
	}

	/* .product-reviews {
		background: #fff;
		margin-bottom: 20rpx;
		padding: 30rpx;
	} */

	/* 底部富文本介绍 */
	.product-introduction {
		background: #fff;
		margin-bottom: 20rpx;
	}

	.introduction-rich-text {
		line-height: 1.6;
	}

	.section-title {
		font-size: 32rpx;
		font-weight: 600;
		color: #333;
		margin-bottom: 30rpx;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #f0f0f0;
	}

	/* 商品详情 */
	.detail-rich-text {
		line-height: 1.6;
	}



	/* 用户评论 */
	.product-reviews {
		background: #fff;
		margin-bottom: 20rpx;
		padding: 30rpx;
	}

	.section-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
		font-weight: 600;
		color: #333;
		margin-bottom: 30rpx;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #f0f0f0;
	}

	.review-action {
		display: flex;
		align-items: center;
		gap: 8rpx;
		
		text {
			font-size: 26rpx;
			color: #666;
		}
	}

	.review-stats {
		display: flex;
		gap: 40rpx;
		margin-bottom: 30rpx;
		padding: 20rpx;
		background: #f8f9fa;
		border-radius: 12rpx;
	}

	.stats-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8rpx;

		.stats-label {
			font-size: 24rpx;
			color: #666;
		}

		.stats-value {
			font-size: 28rpx;
			color: #333;
			font-weight: 600;
		}
	}

	.review-list {
		.review-item {
			padding: 30rpx 0;
			border-bottom: 1rpx solid #f8f8f8;

			&:last-child {
				border-bottom: none;
			}
		}
	}

	.review-header {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.user-avatar {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.user-info {
		flex: 1;

		.user-name {
			font-size: 28rpx;
			color: #333;
			font-weight: 600;
			display: block;
			margin-bottom: 8rpx;
		}
	}

	.review-stars {
		display: flex;
		gap: 4rpx;
	}

	.review-time {
		font-size: 24rpx;
		color: #999;
	}

	.review-content {
		margin-bottom: 20rpx;

		text {
			font-size: 28rpx;
			color: #333;
			line-height: 1.5;
		}
	}

	.review-images {
		display: flex;
		gap: 16rpx;
		flex-wrap: wrap;
	}

	.review-image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
	}

	.no-reviews {
		text-align: center;
		padding: 60rpx 0;
		
		text {
			font-size: 28rpx;
			color: #999;
		}
	}



	/* 底部操作栏 */
	.bottom-actions {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;
		padding: 20rpx 30rpx;
		display: flex;
		align-items: center;
		gap: 20rpx;
		box-shadow: 0 -2rpx 8rpx rgba(0, 0, 0, 0.1);
		z-index: 100;
	}

	.action-left {
		display: flex;
		align-items: flex-start;
		gap: 30rpx;
	}

	.action-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8rpx;
		min-height: 80rpx;
		width: 80rpx;

		.action-icon {
			width: 40rpx;
			height: 40rpx;
		}

		text {
			font-size: 20rpx;
			color: #666;
		}
	}

	.action-right {
		flex: 1;
		display: flex;
		gap: 20rpx;
	}

	.add-cart-btn,
	.buy-now-btn {
		flex: 1;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 40rpx;
		font-size: 28rpx;
		font-weight: 600;
	}

	.add-cart-btn {
		background: #FFAA00;
		color: #fff;
		border: 2rpx solid #FFAA00;
	}

	.buy-now-btn {
		background: #009966;
		color: #fff;
	}

	/* 客服按钮样式重置 */
	.customer-service-btn {
		background: none !important;
		border: none !important;
		padding: 0 !important;
		margin: 0 !important;
		border-radius: 0 !important;
		box-shadow: none !important;
		outline: none !important;
		font-size: inherit !important;
		font-family: inherit !important;
		line-height: inherit !important;
		color: inherit !important;
		text-align: inherit !important;
		vertical-align: top !important;
		
		/* 确保图标大小一致 */
		.action-icon {
			width: 40rpx !important;
			height: 40rpx !important;
		}
		
		/* 确保文字样式一致 */
		text {
			font-size: 20rpx !important;
			color: #666 !important;
			line-height: 1 !important;
		}
		
		&::after {
			border: none !important;
			background: none !important;
		}
	}

	/* SKU选择弹窗 */
	.sku-popup {
		padding: 24rpx;
		display: flex;
		flex-direction: column;
		max-height: 80vh;
		min-height: 400rpx;
		box-sizing: border-box;
		background: #fff;
		border-radius: 20rpx 20rpx 0 0;
	}

	.sku-header {
		display: flex;
		align-items: center;
		margin-bottom: 24rpx;
		padding-bottom: 16rpx;
		border-bottom: 1rpx solid #e9ecef;
	}

	.sku-product-image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-right: 16rpx;
	}

	.sku-product-info {
		flex: 1;
	}

	.sku-product-name {
		font-size: 32rpx;
		color: #333333;
		font-weight: 700;
		margin-bottom: 4rpx;
	}

	.sku-product-price {
		.sku-price-symbol {
			font-size: 28rpx;
			color: #FF6B35;
			font-weight: 600;
		}

		.sku-price-value {
			font-size: 40rpx;
			color: #FF6B35;
			font-weight: 700;
		}
	}

	.sku-close {
		padding: 8rpx;
		border-radius: 50%;
		transition: background-color 0.2s ease;
	}

	.sku-close:active {
		background-color: rgba(0, 0, 0, 0.05);
	}

	.sku-options {
		flex: 1;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		padding-bottom: 20rpx;
		min-height: 200rpx;
	}

	.sku-option-group {
		margin-bottom: 32rpx;
	}

	.option-title {
		font-size: 28rpx;
		color: #333333;
		font-weight: 600;
		margin-bottom: 16rpx;
	}

	.option-items {
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;
		margin-top: 16rpx;
	}

	.option-item {
		background: #f8f9fa;
		border: 2rpx solid #e9ecef;
		padding: 12rpx 20rpx;
		border-radius: 8rpx;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
		overflow: hidden;
	}

	.option-item.active {
		border-color: #34C759;
		background: #fff;
		box-shadow: 0 0 0 2rpx rgba(52, 199, 89, 0.2);
	}

	.option-item.active::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3rpx;
		background: linear-gradient(90deg, #34C759, #28a745);
		transition: all 0.3s ease;
	}

	.option-item:active {
		transform: scale(0.96);
		background: #f0f0f0;
		transition: all 0.1s ease;
	}

	.option-item text {
		font-size: 26rpx;
		color: #333333;
		font-weight: 500;
		position: relative;
		z-index: 1;
		transition: color 0.3s ease, font-weight 0.3s ease;
	}

	.option-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4rpx;
	}

	.sku-price {
		font-size: 22rpx;
		color: #FF6B35;
		font-weight: 600;
	}

	.option-item.active text {
		color: #333;
		font-weight: 600;
	}

	.quantity-selector {
		margin-top: 24rpx;
		padding-top: 24rpx;
		border-top: 1rpx solid #e9ecef;
	}

	.quantity-title {
		font-size: 28rpx;
		color: #333333;
		font-weight: 600;
		margin-bottom: 16rpx;
	}

	.quantity-control {
		display: flex;
		align-items: center;
		gap: 16rpx;
		background: #f5f5f5;
		border-radius: 12rpx;
		padding: 8rpx 16rpx;
	}

	.quantity-btn {
		padding: 8rpx;
		border-radius: 50%;
		transition: background-color 0.2s ease;
	}

	.quantity-btn:active {
		background-color: rgba(0, 0, 0, 0.05);
	}

	.quantity-value {
		font-size: 28rpx;
		color: #333333;
		font-weight: 600;
	}

	.sku-footer {
		margin-top: auto;
		background: #ffffff;
		padding: 24rpx 0 0 0;
		border-top: 1rpx solid #f0f0f0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-shrink: 0;
	}

	.sku-total {
		.total-price {
			font-size: 36rpx;
			color: #FF6B35;
			font-weight: 700;
		}
	}

	.sku-action {
		background: linear-gradient(135deg, #34C759 0%, #28a745 100%);
		padding: 16rpx 32rpx;
		border-radius: 12rpx;
		box-shadow: 0 4rpx 12rpx rgba(52, 199, 89, 0.3);
		transition: all 0.2s ease;
	}

	.sku-action:active {
		transform: scale(0.95);
		box-shadow: 0 2rpx 8rpx rgba(52, 199, 89, 0.3);
	}

	.sku-action text {
		font-size: 28rpx;
		color: #ffffff;
		font-weight: 600;
	}
</style>