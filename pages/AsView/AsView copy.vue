<template>
	<BaseContainer :Bglinear="{
		background: 'linear-gradient(to bottom, #a6e22e 0%, #a6e22e 20%, #fff 40%,#fff 100%)',
	}">
		<view class="asview-container">
			<!-- 品牌展示头部区域 -->
			<view class="header">
				<!-- 传统中式边框装饰 -->
				<view class="traditional-frame">
					<view class="frame-corner top-left"></view>
					<view class="frame-corner top-right"></view>
					<view class="frame-corner bottom-left"></view>
					<view class="frame-corner bottom-right"></view>

					<view class="brand-content">
						<!-- 传统印章风格 -->
						<view class="logo-section">
							<view class="traditional-seal" @tap="onLogoTap">
								<view class="seal-glow"></view>
								<text class="seal-text">雷波</text>
								<view class="seal-ripple"></view>
							</view>
						</view>

						<view class="title-section">
							<view class="main-title">一席春鲜</view>
							<view class="title-decoration">
								<text class="decoration-line">━━━</text>
								<text class="sub-title">天然好物·品质臻选</text>
								<text class="decoration-line">━━━</text>
							</view>
							<view class="greeting">雷波农特恭候雅临</view>
						</view>
					</view>
				</view>

				<!-- 雅致导航分类 -->
				<view class="nav-section">
					<view class="chinese-divider">
						<view class="divider-line"></view>
						<view class="divider-text">分类雅览</view>
						<view class="divider-line"></view>
					</view>

					<scroll-view class="nav-tabs" scroll-x>
						<view class="tab-item" v-for="(tab, index) in navTabs" :key="index"
							:class="{ 'active': activeTab === index }" @click="setActiveTab(index)">
							{{ tab }}
						</view>
					</scroll-view>
				</view>
			</view>

			<!-- 搜寻雅境 -->
			<view class="search-section">
				<view class="search-wrapper" @tap="toSearch">
					<view class="search-box">
						<view class="search-icon">
							<u-icon name="search" color="#8b9467" size="32"></u-icon>
						</view>
						<text class="search-text">探寻山川秘境，邂逅臻品好物</text>
						<view class="search-decoration">✨</view>
					</view>
				</view>
			</view>

			<!-- 臻选特区展示 -->
			<view class="special-supply">
				<view class="section-header">
					<view class="chinese-divider">
						<view class="divider-line"></view>
						<view class="divider-text">臻选特区</view>
						<view class="divider-line"></view>
					</view>
					<view class="header-subtitle">时令鲜品·山水馈赠</view>
				</view>

				<view class="supply-cards">
					<view class="supply-card vegetable-card" @tap="goToCategory('蔬菜')">
						<view class="card-overlay"></view>
						<view class="card-content">
							<view class="card-title">蔬菜雅园</view>
							<view class="card-desc">时令新鲜·天然无污</view>
						</view>
						<image class="card-bg" src="/static/images/home.png" mode="aspectFill"></image>
					</view>

					<view class="supply-card fruit-card" @tap="goToCategory('水果')">
						<view class="card-overlay"></view>
						<view class="card-content">
							<view class="card-title">果韵臻选</view>
							<view class="card-desc">甘甜如蜜·营养丰盈</view>
						</view>
						<image class="card-bg" src="/static/images/as.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>

			<!-- 臻品展示区域 -->
			<view class="product-section">
				<view class="section-header">
					<view class="chinese-divider">
						<view class="divider-line"></view>
						<view class="divider-text">甄选好物</view>
						<view class="divider-line"></view>
					</view>
					<view class="header-subtitle">每一件皆为匠心臻选</view>
				</view>

				<!-- 雅致筛选栏 -->
				<view class="filter-section">
					<view class="filter-bar">
						<view class="filter-item" @click="togglePriceSort">
							<text class="filter-text">价格排序</text>
							<u-icon :name="priceSortIcon" color="#8b9467" size="24"></u-icon>
						</view>
						<view class="filter-item" @click="toggleSalesSort">
							<text class="filter-text">销量排序</text>
							<u-icon :name="salesSortIcon" color="#8b9467" size="24"></u-icon>
						</view>

					</view>
				</view>

				<!-- Category Filter -->
				<view class="category-filter" v-if="showCategoryFilter">
					<scroll-view class="category-scroll" scroll-x>
						<view class="category-tags">
							<view class="tag-item" :class="{ active: selectedCategories.length === 0 }"
								@click="selectAllCategories">
								全部
							</view>
							<view class="tag-item" v-for="(category, index) in categories" :key="index"
								:class="{ active: selectedCategories.includes(category) }"
								@click="toggleCategory(category)">
								{{ category }}
							</view>
						</view>
					</scroll-view>
				</view>

				<view class="product-list">
					<view class="product-card" v-for="(product, index) in filteredProductList" :key="index"
						@tap="goToProductDetail(product.id)">
						<image class="product-img" :src="product.img" mode="aspectFill"></image>
						<view class="product-info">
							<view class="product-header">
								<view class="product-name">{{ product.name }}</view>
								<view class="product-price-section">
									<text class="product-price">¥{{ product.price }}</text>
									<text class="product-original-price"
										v-if="product.originalPrice && product.originalPrice > product.price">¥{{ product.originalPrice }}</text>
								</view>
							</view>
							<view class="product-desc">{{ product.desc }}</view>
							<view class="product-stats">
								<text class="stat-item">销量: {{ product.sales }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</BaseContainer>
</template>

<script>
	import BaseContainer from '@/components/BaseWrapper.vue'
	import {
		fetchGoodsList,
		fetchGoodsTreeList
	} from '@/api/goods'

	export default {
		name: 'AsView',
		components: {
			BaseContainer
		},
		data() {
			return {
				activeTab: 0,
				navTabs: ['全部'],
				categoryList: [], // 分类数据
				productList: [], // 商品列表
				// 筛选相关数据
				showFilter: false,
				filterPrice: {
					min: '',
					max: ''
				},
				selectedCategories: [],
				ratingOptions: [4.5, 4.0, 3.5, 3.0],
				selectedRating: null,
				// 排序状态
				priceSort: 'none', // none, asc, desc
				salesSort: 'none',
				// 分类筛选显示状态
				showCategoryFilter: false,
				loading: false
			}
		},
		computed: {
			// 获取所有分类名称（用于筛选）
			categories() {
				const allCategories = []
				const extractCategories = (items) => {
					items.forEach(item => {
						allCategories.push(item.name)
						if (item.children && item.children.length > 0) {
							extractCategories(item.children)
						}
					})
				}
				extractCategories(this.categoryList)
				return allCategories
			},

			// 排序图标
			priceSortIcon() {
				switch (this.priceSort) {
					case 'asc':
						return 'arrow-up'
					case 'desc':
						return 'arrow-down'
					default:
						return 'arrow-up'
				}
			},
			salesSortIcon() {
				switch (this.salesSort) {
					case 'asc':
						return 'arrow-up'
					case 'desc':
						return 'arrow-down'
					default:
						return 'arrow-up'
				}
			},
			ratingSortIcon() {
				switch (this.ratingSort) {
					case 'asc':
						return 'arrow-up'
					case 'desc':
						return 'arrow-down'
					default:
						return 'arrow-up'
				}
			},
			// 筛选后的商品列表
			filteredProductList() {
				let list = [...this.productList]

				// 价格筛选
				if (this.filterPrice.min || this.filterPrice.max) {
					list = list.filter(item => {
						const price = parseFloat(item.price)
						const min = this.filterPrice.min ? parseFloat(this.filterPrice.min) : 0
						const max = this.filterPrice.max ? parseFloat(this.filterPrice.max) : Infinity
						return price >= min && price <= max
					})
				}

				// 分类筛选
				if (this.selectedCategories.length > 0) {
					list = list.filter(item => this.selectedCategories.includes(item.category))
				}

				// 评分筛选
				if (this.selectedRating) {
					list = list.filter(item => item.rating >= this.selectedRating)
				}

				// 排序
				if (this.priceSort !== 'none') {
					list.sort((a, b) => {
						const priceA = parseFloat(a.price)
						const priceB = parseFloat(b.price)
						return this.priceSort === 'asc' ? priceA - priceB : priceB - priceA
					})
				}

				if (this.salesSort !== 'none') {
					list.sort((a, b) => {
						return this.salesSort === 'asc' ? a.sales - b.sales : b.sales - a.sales
					})
				}

				if (this.ratingSort !== 'none') {
					list.sort((a, b) => {
						return this.ratingSort === 'asc' ? a.rating - b.rating : b.rating - a.rating
					})
				}

				return list
			}
		},
		mounted() {
			this.loadCategoryData()
			this.loadProductData()
		},
		methods: {
			// 加载分类数据
			async loadCategoryData() {
				try {
					const res = await fetchGoodsTreeList()
					console.log('分类数据:', res)

					if (res.code == 200 && res.data) {
						this.categoryList = res.data
						// 更新导航标签
						this.navTabs = ['全部', ...res.data.map(item => item.name)]
					}
				} catch (error) {
					console.error('获取分类数据失败:', error)
				}
			},

			// 加载商品数据
			async loadProductData() {
				this.loading = true
				try {
					const params = {
						pageSize: 20,
						pageNo: 1
					}

					// 如果有选中的分类，添加分类筛选
					if (this.activeTab > 0 && this.navTabs[this.activeTab]) {
						params.category1Id = this.getCategoryIdByName(this.navTabs[this.activeTab])
					}

					const res = await fetchGoodsList(params)
					console.log('商品数据:', res)

					if (res.code == 200 && res.rows) {
						this.productList = res.rows.map(item => ({
							id: item.goodsId,
							img: item.goodsImage,
							name: item.goodsName,
							desc: item.sellingPoint || '优质商品，值得信赖',
							price: item.promotionPrice || item.price,
							originalPrice: item.price,
							sales: item.virtualSoldNum || item.soldNum || 0,
							rating: 4.5, // 默认评分
							category: this.getCategoryNameById(item.category1Id)
						}))
					}
				} catch (error) {
					console.error('获取商品数据失败:', error)
				} finally {
					this.loading = false
				}
			},

			// 根据分类名称获取分类ID
			getCategoryIdByName(categoryName) {
				const findCategory = (items, name) => {
					for (let item of items) {
						if (item.name === name) {
							return item.id
						}
						if (item.children && item.children.length > 0) {
							const result = findCategory(item.children, name)
							if (result) return result
						}
					}
					return null
				}
				return findCategory(this.categoryList, categoryName)
			},

			// 根据分类ID获取分类名称
			getCategoryNameById(categoryId) {
				const findCategory = (items, id) => {
					for (let item of items) {
						if (item.id === categoryId) {
							return item.name
						}
						if (item.children && item.children.length > 0) {
							const result = findCategory(item.children, id)
							if (result) return result
						}
					}
					return '其他'
				}
				return findCategory(this.categoryList, categoryId)
			},

			toSearch() {
				uni.navigateTo({
					url: "/subpackages/search/index/index"
				})
			},
			goToProductDetail(itemId) {
				uni.navigateTo({
					url: `/subpackages/goods/detail/detail?goodsId=${itemId}`
				})
			},
			setActiveTab(index) {
				this.activeTab = index;
				// 切换分类时重新加载商品数据
				this.loadProductData();
			},

			// 重置所有筛选和排序
			resetAllFilters() {
				this.priceSort = 'none'
				this.salesSort = 'none'
				this.ratingSort = 'none'
				this.selectedCategories = []
				this.filterPrice.min = ''
				this.filterPrice.max = ''
				this.selectedRating = null
				this.showCategoryFilter = false

				uni.showToast({
					title: '已重置所有筛选',
					icon: 'success'
				})
			},

			// 切换分类筛选显示
			toggleCategoryFilter() {
				this.showCategoryFilter = !this.showCategoryFilter
			},

			// 显示筛选弹窗
			showFilterPopup() {
				this.showFilter = true
			},

			// 关闭筛选弹窗
			closeFilterPopup() {
				this.showFilter = false
			},

			// 选择全部分类
			selectAllCategories() {
				this.selectedCategories = []
			},

			// 切换分类选择
			toggleCategory(category) {
				const index = this.selectedCategories.indexOf(category)
				if (index > -1) {
					this.selectedCategories.splice(index, 1)
				} else {
					this.selectedCategories.push(category)
				}
			},

			// 选择评分
			selectRating(rating) {
				this.selectedRating = this.selectedRating === rating ? null : rating
			},

			// 重置筛选
			resetFilter() {
				this.filterPrice.min = ''
				this.filterPrice.max = ''
				this.selectedCategories = []
				this.selectedRating = null
			},

			// 应用筛选
			applyFilter() {
				this.closeFilterPopup()
				uni.showToast({
					title: '筛选已应用',
					icon: 'success'
				})
			},

			// 价格排序
			togglePriceSort() {
				if (this.priceSort === 'none') {
					this.priceSort = 'desc'
				} else if (this.priceSort === 'desc') {
					this.priceSort = 'asc'
				} else {
					this.priceSort = 'desc'
				}
			},

			// 销量排序
			toggleSalesSort() {
				if (this.salesSort === 'none') {
					this.salesSort = 'desc'
				} else if (this.salesSort === 'desc') {
					this.salesSort = 'asc'
				} else {
					this.salesSort = 'desc'
				}
			},

			// 评分排序
			toggleRatingSort() {
				if (this.ratingSort === 'none') {
					this.ratingSort = 'desc'
				} else if (this.ratingSort === 'desc') {
					this.ratingSort = 'asc'
				} else {
					this.ratingSort = 'desc'
				}
			},

			// 印章点触雅致效果
			onLogoTap() {
				uni.showToast({
					title: '雷波农特恭候雅临',
					icon: 'none',
					duration: 2000
				});
			},

			// 跳转到分类页面
			goToCategory(categoryName) {
				// 找到对应分类的索引
				const categoryIndex = this.navTabs.findIndex(tab => tab.includes(categoryName));
				if (categoryIndex > 0) {
					this.setActiveTab(categoryIndex);
				}

				uni.showToast({
					title: `已为您展示${categoryName}类商品`,
					icon: 'success',
					duration: 1500
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.asview-container {
		min-height: 100vh;
		padding-bottom: 120rpx;
	}

	/* 品牌头部区域 - 中国风设计 */
	.header {
		padding: 60rpx 24rpx 40rpx;
		position: relative;
		z-index: 10;
	}

	.traditional-frame {
		position: relative;
		background: linear-gradient(145deg, #fefefe 0%, #f8faf9 100%);
		border-radius: 16rpx;
		padding: 48rpx 32rpx;
		box-shadow:
			0 8rpx 32rpx rgba(139, 148, 103, 0.1),
			inset 0 2rpx 8rpx rgba(255, 255, 255, 0.8);

		// 中国风边框装饰
		.frame-corner {
			position: absolute;
			width: 32rpx;
			height: 32rpx;
			border: 3rpx solid #8b9467;

			&.top-left {
				top: 16rpx;
				left: 16rpx;
				border-right: none;
				border-bottom: none;
			}

			&.top-right {
				top: 16rpx;
				right: 16rpx;
				border-left: none;
				border-bottom: none;
			}

			&.bottom-left {
				bottom: 16rpx;
				left: 16rpx;
				border-right: none;
				border-top: none;
			}

			&.bottom-right {
				bottom: 16rpx;
				right: 16rpx;
				border-left: none;
				border-top: none;
			}
		}
	}

	.brand-content {
		display: flex;
		align-items: center;
		gap: 32rpx;
	}

	.logo-section {
		.traditional-seal {
			width: 120rpx;
			height: 120rpx;
			background: linear-gradient(135deg, #8b9467 0%, #6d7a52 100%);
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			box-shadow:
				0 8rpx 24rpx rgba(139, 148, 103, 0.3),
				inset 0 2rpx 8rpx rgba(255, 255, 255, 0.2);
			cursor: pointer;
			overflow: hidden;
			transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

			&::before {
				content: '';
				position: absolute;
				width: 96rpx;
				height: 96rpx;
				border: 2rpx solid rgba(255, 255, 255, 0.3);
				border-radius: 50%;
			}

			&:active {
				transform: scale(0.95);
			}

			.seal-glow {
				position: absolute;
				top: -10rpx;
				left: -10rpx;
				right: -10rpx;
				bottom: -10rpx;
				background: radial-gradient(circle, rgba(139, 148, 103, 0.3) 0%, transparent 70%);
				border-radius: 50%;
				opacity: 0;
			}

			.seal-text {
				font-size: 36rpx;
				font-weight: 800;
				color: #ffffff;
				text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.3);
				letter-spacing: 4rpx;
				position: relative;
				z-index: 2;
			}

			.seal-ripple {
				position: absolute;
				top: 50%;
				left: 50%;
				width: 0;
				height: 0;
				border-radius: 50%;
				background: rgba(255, 255, 255, 0.4);
				transform: translate(-50%, -50%);
			}
		}
	}

	.title-section {
		flex: 1;
		text-align: center;

		.main-title {
			font-size: 56rpx;
			font-weight: 800;
			color: #2d3820;
			margin-bottom: 16rpx;
			letter-spacing: 6rpx;
		}

		.title-decoration {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 16rpx;
			margin-bottom: 20rpx;

			.decoration-line {
				color: #8b9467;
				font-size: 24rpx;
			}

			.sub-title {
				font-size: 28rpx;
				color: #6d7a52;
				letter-spacing: 2rpx;
				font-weight: 500;
			}
		}

		.greeting {
			font-size: 32rpx;
			color: #8b9467;
			font-weight: 500;
			letter-spacing: 2rpx;
		}
	}

	// 导航分类区域
	.nav-section {
		margin-top: 40rpx;
		background: linear-gradient(145deg, #ffffff 0%, #f8fff0 100%);
		border-radius: 20rpx;
		padding: 32rpx 24rpx;
		box-shadow: 0 6rpx 20rpx rgba(139, 148, 103, 0.1);

		.chinese-divider {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 24rpx;
			margin-bottom: 24rpx;

			.divider-line {
				width: 60rpx;
				height: 2rpx;
				background: linear-gradient(90deg, transparent 0%, #8b9467 50%, transparent 100%);
			}

			.divider-text {
				font-size: 32rpx;
				font-weight: 700;
				color: #2d3820;
				letter-spacing: 2rpx;
			}
		}

		.nav-tabs {
			white-space: nowrap;

			.tab-item {
				display: inline-block;
				padding: 16rpx 32rpx;
				margin-right: 16rpx;
				color: #666;
				font-size: 28rpx;
				transition: all 0.3s ease;
				position: relative;
				border-radius: 24rpx;
				border: 2rpx solid transparent;

				&.active {
					color: #2d3820;
					font-weight: bold;
					background: linear-gradient(135deg, #8b9467 0%, #6d7a52 100%);
					color: #fff;
					border-color: #8b9467;
					box-shadow: 0 4rpx 12rpx rgba(139, 148, 103, 0.3);
				}

				&:active {
					transform: scale(0.95);
				}
			}
		}
	}

	/* 搜索雅境 */
	.search-section {
		padding: 0 24rpx 32rpx;
		position: relative;
		z-index: 10;
	}

	.search-wrapper {
		width: 100%;
	}

	.search-box {
		background: linear-gradient(145deg, #ffffff 0%, #f8faf9 100%);
		border-radius: 48rpx;
		padding: 24rpx 32rpx;
		display: flex;
		align-items: center;
		gap: 20rpx;
		box-shadow:
			0 6rpx 24rpx rgba(139, 148, 103, 0.1),
			inset 0 2rpx 8rpx rgba(255, 255, 255, 0.8);
		border: 2rpx solid rgba(139, 148, 103, 0.15);
		transition: all 0.3s ease;

		&:active {
			transform: translateY(-2rpx);
			box-shadow:
				0 8rpx 32rpx rgba(139, 148, 103, 0.15),
				inset 0 2rpx 8rpx rgba(255, 255, 255, 0.9);
		}

		.search-icon {
			padding: 8rpx;
		}

		.search-text {
			flex: 1;
			font-size: 28rpx;
			color: #6d7a52;
			font-weight: 400;
		}

		.search-decoration {
			font-size: 24rpx;
			opacity: 0.7;
		}
	}

	/* 臻选特区展示 */
	.special-supply {
		margin: 64rpx 24rpx;
		background: linear-gradient(145deg, #ffffff 0%, #fff8f0 100%);
		border-radius: 32rpx;
		overflow: hidden;
		box-shadow:
			0 16rpx 48rpx rgba(255, 152, 0, 0.08),
			0 4rpx 16rpx rgba(0, 0, 0, 0.04);
		border: 2rpx solid rgba(255, 152, 0, 0.1);
		position: relative;
		z-index: 10;

		.section-header {
			background: linear-gradient(135deg, #ff9800 0%, #ff5722 100%);
			padding: 48rpx 40rpx;
			text-align: center;
			position: relative;
			overflow: hidden;

			.chinese-divider {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 24rpx;
				margin-bottom: 16rpx;

				.divider-line {
					width: 80rpx;
					height: 2rpx;
					background: rgba(255, 255, 255, 0.6);
				}

				.divider-text {
					font-size: 48rpx;
					font-weight: 800;
					color: #fff;
					letter-spacing: 4rpx;
					text-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.2);
				}
			}

			.header-subtitle {
				font-size: 28rpx;
				color: rgba(255, 255, 255, 0.9);
				font-weight: 400;
				letter-spacing: 2rpx;
			}
		}

		.supply-cards {
			display: flex;
			gap: 32rpx;
			padding: 48rpx 40rpx;

			.supply-card {
				flex: 1;
				height: 240rpx;
				border-radius: 24rpx;
				position: relative;
				overflow: hidden;
				box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
				transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

				&:active {
					transform: translateY(-8rpx);
					box-shadow: 0 16rpx 40rpx rgba(0, 0, 0, 0.15);
				}

				.card-overlay {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background: rgba(0, 0, 0, 0.3);
					z-index: 2;
				}

				.card-content {
					box-sizing: border-box;
					position: relative;
					z-index: 3;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding: 24rpx;
				}

				.card-title {
					font-size: 36rpx;
					font-weight: bold;
					color: #fff;
					margin-bottom: 8rpx;
					text-align: center;
					text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.3);
				}

				.card-desc {
					font-size: 24rpx;
					color: rgba(255, 255, 255, 0.9);
					text-align: center;
					margin-bottom: 16rpx;
					text-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.2);
				}

				.card-badge {
					align-self: center;
					padding: 8rpx 20rpx;
					border-radius: 20rpx;
					background: rgba(255, 255, 255, 0.2);
					backdrop-filter: blur(10rpx);

					.badge-text {
						font-size: 22rpx;
						font-weight: bold;
						color: #fff;
						text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.2);
					}
				}

				.card-cta {
					align-self: center;
					padding: 12rpx 24rpx;
					border-radius: 24rpx;
					background: linear-gradient(135deg, #ff6b35 0%, #e53e3e 100%);
					box-shadow: 0 4rpx 12rpx rgba(255, 107, 53, 0.3);

					.cta-text {
						font-size: 24rpx;
						font-weight: bold;
						color: #fff;
						text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.2);
					}
				}

				.card-bg {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					z-index: 1;
					object-fit: cover;
				}
			}

			.vegetable-card {
				background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
			}

			.fruit-card {
				background: linear-gradient(135deg, #ff9800 0%, #ff5722 100%);
			}
		}
	}

	/* 臻品展示区域 */
	.product-section {
		margin: 64rpx 24rpx;
		position: relative;
		z-index: 10;

		.section-header {
			text-align: center;
			margin-bottom: 48rpx;
			background: linear-gradient(145deg, #ffffff 0%, #f8fff0 100%);
			border-radius: 24rpx;
			padding: 40rpx 32rpx;
			box-shadow: 0 6rpx 20rpx rgba(166, 226, 46, 0.1);

			.chinese-divider {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 24rpx;
				margin-bottom: 16rpx;

				.divider-line {
					width: 80rpx;
					height: 2rpx;
					background: linear-gradient(90deg, transparent 0%, #8b9467 50%, transparent 100%);
				}

				.divider-text {
					font-size: 44rpx;
					font-weight: 800;
					color: #2d3820;
					letter-spacing: 4rpx;
				}
			}

			.header-subtitle {
				font-size: 28rpx;
				color: #666;
				letter-spacing: 2rpx;
			}
		}

		// 雅致筛选区域
		.filter-section {
			background: linear-gradient(145deg, #ffffff 0%, #f8fff0 100%);
			border-radius: 20rpx;
			padding: 32rpx 24rpx;
			margin-bottom: 32rpx;
			box-shadow: 0 6rpx 20rpx rgba(139, 148, 103, 0.1);
			border: 1rpx solid rgba(139, 148, 103, 0.1);

			.filter-title {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 12rpx;
				margin-bottom: 24rpx;

				.title-icon {
					font-size: 32rpx;
				}

				.title-text {
					font-size: 32rpx;
					font-weight: 700;
					color: #2d3820;
					letter-spacing: 2rpx;
				}
			}

			.filter-bar {
				display: flex;
				align-items: center;
				justify-content: space-around;
				gap: 16rpx;

				.filter-item {
					display: flex;
					align-items: center;
					gap: 8rpx;
					padding: 16rpx 20rpx;
					border-radius: 24rpx;
					transition: all 0.3s ease;
					border: 2rpx solid rgba(139, 148, 103, 0.2);
					background: #fff;
					flex: 1;
					justify-content: center;

					&:active {
						background: rgba(139, 148, 103, 0.1);
						transform: scale(0.95);
						border-color: rgba(139, 148, 103, 0.4);
					}

					.filter-text {
						font-size: 26rpx;
						color: #2d3820;
						font-weight: 500;
					}
				}
			}
		}

		.product-list {
			display: flex;
			flex-direction: column;
			gap: 24rpx;
		}

		.product-card {
			background: linear-gradient(135deg, #fff 0%, #f8fff0 100%);
			border-radius: 24rpx;
			overflow: hidden;
			box-shadow: 0 6rpx 20rpx rgba(166, 226, 46, 0.1);
			display: flex;
			flex-direction: row;
			padding: 24rpx;
			gap: 20rpx;
			border: 1rpx solid rgba(166, 226, 46, 0.1);
			transition: all 0.3s ease;

			&:active {
				transform: translateY(-2rpx);
				box-shadow: 0 8rpx 24rpx rgba(166, 226, 46, 0.15);
			}

			.product-img {
				width: 140rpx;
				height: 140rpx;
				border-radius: 20rpx;
				object-fit: cover;
				background: linear-gradient(135deg, #f0f8e0 0%, #e8f5d0 100%);
				flex-shrink: 0;
				box-shadow: 0 4rpx 12rpx rgba(166, 226, 46, 0.1);
			}

			.product-info {
				flex: 1;
				display: flex;
				flex-direction: column;
				gap: 8rpx;
				min-width: 0;
			}

			.product-header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 8rpx;
			}

			.product-name {
				font-size: 30rpx;
				font-weight: bold;
				color: #2e7d32;
				line-height: 1.2;
				flex: 1;
			}

			.product-price-section {
				display: flex;
				align-items: center;
				gap: 8rpx;
				margin-right: 16rpx;
			}

			.product-price {
				font-size: 26rpx;
				color: #e54d42;
				font-weight: bold;
			}

			.product-original-price {
				font-size: 22rpx;
				color: #999;
				text-decoration: line-through;
			}

			.product-like {
				padding: 4rpx;
			}

			.product-desc {
				font-size: 22rpx;
				color: #666;
				line-height: 1.3;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				margin-bottom: 8rpx;
			}

			.product-stats {
				display: flex;
				gap: 12rpx;
				font-size: 22rpx;
				color: #666;
				margin-top: 8rpx;

				.stat-item {
					background: linear-gradient(135deg, #f0f8e0 0%, #e8f5d0 100%);
					padding: 6rpx 12rpx;
					border-radius: 12rpx;
					border: 1rpx solid rgba(166, 226, 46, 0.2);
					font-weight: 500;
				}
			}
		}
	}



	/* Category Filter */
	.category-filter {
		margin-bottom: 24rpx;
		background: #fff;
		border-radius: 16rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
		overflow: hidden;

		.category-scroll {
			white-space: nowrap;
			padding: 20rpx 0;

			.category-tags {
				display: flex;
				padding: 0 24rpx;
				gap: 16rpx;

				.tag-item {
					display: inline-block;
					padding: 12rpx 24rpx;
					border: 2rpx solid rgba(166, 226, 46, 0.3);
					border-radius: 24rpx;
					font-size: 26rpx;
					color: #666;
					background: #fff;
					transition: all 0.3s ease;
					font-weight: 500;
					white-space: nowrap;

					&.active {
						background: linear-gradient(135deg, #a6e22e 0%, #9ee600 100%);
						color: #fff;
						border-color: #a6e22e;
						box-shadow: 0 4rpx 12rpx rgba(166, 226, 46, 0.3);
					}

					&:active {
						transform: scale(0.95);
					}
				}
			}
		}
	}

	/* Filter Popup */
	.filter-popup {
		height: 100%;
		display: flex;
		flex-direction: column;
		background: linear-gradient(135deg, #fff 0%, #f8fff0 100%);

		.popup-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 36rpx 24rpx 28rpx;
			border-bottom: 1rpx solid rgba(166, 226, 46, 0.1);
			background: linear-gradient(135deg, #a6e22e 0%, #9ee600 100%);

			.popup-title {
				font-size: 34rpx;
				font-weight: bold;
				color: #fff;
			}

			.popup-close {
				padding: 12rpx;
				border-radius: 50%;
				background: rgba(255, 255, 255, 0.2);
				transition: all 0.2s ease;

				&:active {
					background: rgba(255, 255, 255, 0.3);
					transform: scale(0.9);
				}
			}
		}

		.filter-content {
			flex: 1;
			padding: 24rpx;
			overflow-y: auto;

			.filter-section {
				margin-bottom: 32rpx;

				.section-title {
					font-size: 30rpx;
					font-weight: bold;
					color: #2e7d32;
					margin-bottom: 20rpx;
					position: relative;
					padding-left: 16rpx;

					&::before {
						content: '';
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
						width: 6rpx;
						height: 24rpx;
						background: linear-gradient(135deg, #a6e22e 0%, #9ee600 100%);
						border-radius: 3rpx;
					}
				}

				.price-range {
					display: flex;
					align-items: center;
					gap: 20rpx;

					.price-input {
						flex: 1;
						height: 70rpx;
						padding: 0 20rpx;
						border: 2rpx solid rgba(166, 226, 46, 0.3);
						border-radius: 12rpx;
						font-size: 28rpx;
						background: #fff;
						transition: all 0.2s ease;

						&:focus {
							border-color: #a6e22e;
							box-shadow: 0 0 0 4rpx rgba(166, 226, 46, 0.1);
						}
					}

					.price-separator {
						color: #a6e22e;
						font-size: 26rpx;
						font-weight: bold;
					}
				}

				.category-tags,
				.rating-tags {
					display: flex;
					flex-wrap: wrap;
					gap: 16rpx;

					.tag-item {
						padding: 16rpx 24rpx;
						border: 2rpx solid rgba(166, 226, 46, 0.3);
						border-radius: 24rpx;
						font-size: 26rpx;
						color: #666;
						background: #fff;
						transition: all 0.3s ease;
						font-weight: 500;
						position: relative;
						overflow: hidden;

						&::before {
							content: '';
							position: absolute;
							top: 0;
							left: -100%;
							width: 100%;
							height: 100%;
							background: linear-gradient(90deg, transparent, rgba(166, 226, 46, 0.1), transparent);
							transition: left 0.5s ease;
						}

						&.active {
							background: linear-gradient(135deg, #a6e22e 0%, #9ee600 100%);
							color: #fff;
							border-color: #a6e22e;
							box-shadow: 0 4rpx 12rpx rgba(166, 226, 46, 0.3);
						}

						&:active {
							transform: scale(0.95);

							&::before {
								left: 100%;
							}
						}
					}
				}
			}
		}

		.popup-footer {
			display: flex;
			gap: 20rpx;
			padding: 28rpx 24rpx;
			border-top: 1rpx solid rgba(166, 226, 46, 0.1);
			background: rgba(166, 226, 46, 0.05);

			.reset-btn,
			.confirm-btn {
				flex: 1;
				height: 88rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 44rpx;
				font-size: 30rpx;
				font-weight: bold;
				transition: all 0.3s ease;
				position: relative;
				overflow: hidden;

				&::before {
					content: '';
					position: absolute;
					top: 0;
					left: -100%;
					width: 100%;
					height: 100%;
					background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
					transition: left 0.5s ease;
				}

				&:active {
					transform: scale(0.95);

					&::before {
						left: 100%;
					}
				}
			}

			.reset-btn {
				background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
				color: #666;
				border: 2rpx solid #ddd;
			}

			.confirm-btn {
				background: linear-gradient(135deg, #a6e22e 0%, #9ee600 100%);
				color: #fff;
				box-shadow: 0 4rpx 12rpx rgba(166, 226, 46, 0.3);
			}
		}
	}
</style>