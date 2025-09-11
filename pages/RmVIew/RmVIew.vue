<template>
	<view class="scenic-page">
		<!-- 固定顶部标题栏 -->
		<view class="scenic-header" :style="headerStyle">
			<view class="header-content">
				<text class="header-title">乡镇大集</text>
				<view class="header-right">
					<u-icon name="more-dot-fill" size="20" color="#333"></u-icon>
					<u-icon name="scan" size="20" color="#333" style="margin-left: 20rpx;"></u-icon>
				</view>
			</view>
		</view>

		<!-- 页面主体内容 -->
		<scroll-view scroll-y class="scenic-body" :style="{ paddingTop: contentTopPx + 'px' }">
			<!-- 搜索栏 -->
			<view class="search-section">
				<view class="search-box">
					<u-icon name="search" class="icon-search"></u-icon>
					<text class="search-text">搜索商品</text>
				</view>
			</view>

			<!-- 雷波县情介绍 -->
			<view class="county-intro" :class="{ 'has-background': countyIntroImage }" 
				:style="countyIntroStyle">
				<!-- 背景遮罩层（当有背景图片时显示） -->
				<view class="intro-overlay" v-if="countyIntroImage"></view>
				
				<view class="intro-content-wrapper">
					<view class="intro-header">
						<text class="county-name">雷波县情</text>
					</view>
					<view class="intro-content">
						<text class="intro-text">
							{{ countyIntroText }}
						</text>
					</view>
					<view class="intro-footer">
						<text class="intro-link" @click="goToCountyIntroDetail">点击跳转</text>
					</view>
				</view>
			</view>

			<!-- 风景展示区域 -->
			<view class="scenic-list">
				<view class="scenic-item" v-for="(item, index) in scenicList" :key="index" @click="goToScenicDetail(item)">
					<image class="scenic-image" :src="item.image" mode="aspectFill"></image>
					<view class="scenic-overlay">
						<text class="scenic-name">{{ item.name }}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { fetchArticleList } from '@/api/article'

export default {
	data() {
		return {
			// 顶部安全区域
			statusBarHeight: 0,
			capsuleHeight: 44,
			capsuleTop: 0,
			
			// 文章列表数据 - 从接口获取
			scenicList: [],
			// 雷波县情介绍内容
			countyIntroText: '雷波县——一座镶嵌在四川省西南边陲的高山峡谷之中的明珠，白马雪山东大门入口，素有"彝族文化之乡"的美誉。这里山川秀美，民族文化厚重多彩的民族文化而闻名。',
			// 县情介绍对应的文章ID
			countyIntroId: 2,
			// 雷波县情背景图片
			countyIntroImage: null
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
		
		// 雷波县情背景样式
		countyIntroStyle() {
			return this.countyIntroImage ? `background-image: url(${this.countyIntroImage})` : ''
		}
	},
	
	mounted() {
		this.initPageLayout()
		// 获取文章列表数据
		this.getArticleList()
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
					this.capsuleTop = rect.top + 5
				}
			} catch (e) {}
			// #endif

			// 其他端给个合理默认
			// #ifndef MP-WEIXIN
			this.capsuleHeight = 44
			this.capsuleTop = this.statusBarHeight
			// #endif
		},
		
		// 返回上一页
		goBack() {
			uni.navigateBack()
		},
		
		// 获取文章列表
		async getArticleList() {
			try {
				// TODO fetchArticleList 会在这里使用
				const params = {
					pageNum: 1,
					pageSize: 10,
					// topicId: 1  // 乡镇大集专题ID
				}
				const res = await fetchArticleList(params)
				if (res.code == 200 && res.rows && res.rows.length > 0) {
					// 查找id为2的文章，用作雷波县情介绍
					const countyIntroArticle = res.rows.find(item => item.id === 2)
					if (countyIntroArticle) {
						if (countyIntroArticle.name) {
							this.countyIntroText = countyIntroArticle.name
						}
						// 设置背景图片
						if (countyIntroArticle.image) {
							this.countyIntroImage = countyIntroArticle.image
						}
					}
					
					// 过滤掉id为1和2的文章，剩余的作为风景展示
					this.scenicList = res.rows
						.filter(item => item.id !== 1 && item.id !== 2)  // 过滤掉id为1和2的文章
						.map(item => ({
							id: item.id,
							name: item.name,  // 使用name字段
							image: item.image,
							description: item.name || '点击查看详情'  // 使用name字段作为描述
						}))
				} else {
					// 如果接口没有数据，显示空列表
					console.log('文章列表接口无数据')
					this.scenicList = []
				}
			} catch (error) {
				console.error('获取文章列表失败:', error)
				// 异常时显示空列表
				this.scenicList = []
			}
		},
		
		// 跳转到文章详情
		goToScenicDetail(item) {
			// TODO: 跳转到文章详情页面，使用richText组件渲染
			uni.navigateTo({
				url: `/subpackages/help/richText/richText?id=${item.id}`
			})
		},
		
		// 跳转到雷波县情详情
		goToCountyIntroDetail() {
			// 跳转到id为2的文章详情页面
			uni.navigateTo({
				url: `/subpackages/help/richText/richText?id=${this.countyIntroId}`
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.scenic-page {
	height: 100vh;
	background: #f5f5f5;
	display: flex;
	flex-direction: column;
}

/* 固定顶部标题栏 */
.scenic-header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 999;
	box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);
}

.header-content {
	height: 100%;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	padding: 0 30rpx 16rpx 30rpx;
	position: relative;
	margin-bottom: 30rpx; /* 增加下边距 */
}

.header-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #111;
}

.header-right {
	position: absolute;
	right: 30rpx;
	bottom: 16rpx;
	display: flex;
	align-items: center;
}

/* 页面主体 */
.scenic-body {
	flex: 1;
	height: 0;
	padding-bottom: 40rpx;
}

/* 搜索栏 */
.search-section {
	padding: 0 12rpx;
	margin-top: 12rpx;
}

.search-box {
	height: 80rpx;
	border-radius: 40rpx;
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
}

.icon-search {
	font-size: 26rpx;
	margin-right: 8rpx;
}

.search-text {
	font-size: 26rpx;
	color: #999;
}

/* 雷波县情介绍 */
.county-intro {
	background: #fff;
	margin: 20rpx 30rpx;
	border-radius: 16rpx;
	padding: 30rpx;
	box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
	position: relative;
	overflow: hidden;
	
	/* 当有背景图片时的样式 */
	&.has-background {
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		min-height: 280rpx;
		display: flex;
		align-items: flex-end;
	}
}

/* 背景遮罩层 */
.intro-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: linear-gradient(
		135deg, 
		rgba(0, 0, 0, 0.3) 0%, 
		rgba(0, 0, 0, 0.5) 50%, 
		rgba(0, 0, 0, 0.7) 100%
	);
	z-index: 1;
}

/* 内容包装器 */
.intro-content-wrapper {
	position: relative;
	z-index: 2;
	width: 100%;
}

.intro-header {
	margin-bottom: 20rpx;
}

.county-name {
	font-size: 36rpx;
	font-weight: 600;
	color: #34C759;
	transition: color 0.3s ease;
}

/* 有背景图片时的文字颜色 */
.county-intro.has-background .county-name {
	color: #fff;
	text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.5);
}

.intro-content {
	margin-bottom: 20rpx;
}

.intro-text {
	font-size: 26rpx;
	color: #333;
	line-height: 1.6;
	transition: color 0.3s ease;
}

/* 有背景图片时的介绍文字颜色 */
.county-intro.has-background .intro-text {
	color: #fff;
	text-shadow: 0 1rpx 3rpx rgba(0, 0, 0, 0.5);
}

.intro-footer {
	display: flex;
	justify-content: flex-end;
}

.intro-link {
	font-size: 24rpx;
	color: #34C759;
	transition: color 0.3s ease;
}

/* 有背景图片时的链接颜色 */
.county-intro.has-background .intro-link {
	color: #fff;
	text-shadow: 0 1rpx 3rpx rgba(0, 0, 0, 0.5);
	text-decoration: underline;
}

/* 风景展示区域 */
.scenic-list {
	padding: 0 30rpx;
	padding-bottom:175rpx
}

.scenic-item {
	position: relative;
	height: 240rpx;
	border-radius: 16rpx;
	overflow: hidden;
	margin-bottom: 20rpx;
	box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);
}

.scenic-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.scenic-overlay {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	background: linear-gradient(transparent, rgba(0,0,0,0.6));
	padding: 30rpx 24rpx 20rpx;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
}

.scenic-name {
	color: #fff;
	font-size: 28rpx;
	font-weight: 600;
	text-shadow: 0 2rpx 4rpx rgba(0,0,0,0.5);
}
</style>