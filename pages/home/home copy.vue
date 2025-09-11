	<template>
		<BaseContainer>
			<view class="home-container">
				<!-- 顶部搜索栏 -->
				<view class="top-search-bar" :style="{ paddingTop: statusBarHeight + 'px', height: (statusBarHeight + searchBarHeight) + 'px' }">
					<view class="search-content" :style="{ height: searchBarHeight + 'px' }">
						<view class="search-box" @tap="toSearch">
							<view class="search-icon">
								<u-icon name="search" color="#ffffff" size="28"></u-icon>
							</view>
							<text class="search-text">搜索</text>
						</view>
					</view>
				</view>

				<!-- Banner轮播区 -->
				<view class="banner-section" :style="{ marginTop: (statusBarHeight + searchBarHeight) + 'px' }">
					<view class="banner-skeleton" v-if="bannerLoading">
						<view class="skeleton-banner"></view>
					</view>

					<view class="swiper-container" v-else>
						<u-swiper ref="bannerSwiper" :list="bannerList" height="400rpx" keyName="image" circular
							:autoplay="true" :interval="6000" radius="24" :loading="bannerLoading" :error="bannerError"
							@load="onBannerLoad" @error="onBannerError" @change="onBannerChange" @click="onBannerClick">
						</u-swiper>
					</view>
				</view>

				<!-- 雷波印象文化展示 -->
				<view class="culture-showcase">
					<view class="section-header">
						<view class="chinese-divider">
							<view class="divider-line"></view>
							<view class="divider-text">雷波印象</view>
							<view class="divider-line"></view>
						</view>
						<view class="header-subtitle">千载文脉·山水雷波</view>
					</view>

					<view class="culture-content">
						<view class="text-carousel">
							<view class="text-slide">
								<view class="slide-header">
									<view class="main-title">{{ cultureList[currentTextIndex].title }}</view>
									<view class="sub-title">{{ cultureList[currentTextIndex].subtitle }}</view>
								</view>
								<view class="slide-content">{{ cultureList[currentTextIndex].content }}</view>
								<view class="content-highlight">
									<view class="highlight-badge">
										<text>{{ cultureList[currentTextIndex].highlight }}</text>
									</view>
								</view>
							</view>
						</view>

						<view class="culture-indicators">
							<view class="traditional-indicator" v-for="(item, index) in cultureList" :key="index"
								:class="{ active: currentTextIndex === index }" @tap="setCurrentTextIndex(index)">
								<text>{{ ['一', '二', '三', '四'][index] }}</text>
							</view>
						</view>
					</view>
				</view>

				<!-- 特色服务承诺 -->
				<view class="service-matrix">
					<view class="matrix-title">
						<view class="chinese-divider">
							<view class="divider-line"></view>
							<view class="divider-text">品质承诺</view>
							<view class="divider-line"></view>
						</view>
					</view>

					<view class="service-grid">
						<view class="service-card" v-for="(item, index) in serviceFeatures" :key="index"
							@tap="onServiceTap(item)">
							<view class="card-header">
								<view class="card-number">{{ ['壹', '贰', '叁', '肆'][index] }}</view>
								<view class="card-title">{{ item.title }}</view>
							</view>
							<view class="card-desc">{{ item.desc }}</view>
						</view>
					</view>
				</view>

				<!-- 品牌故事视频 -->
				<view class="video-showcase">
					<view class="video-header">
						<view class="video-title">品牌雅韵</view>
						<view class="video-subtitle">感受雷波农特的匠心传承与文化底蕴</view>
					</view>

					<view class="video-container">
						<video class="brand-video" src="https://cdn.pixabay.com/video/2021/09/08/87842-602894455_large.mp4"
							controls :autoplay="false" :show-center-play-btn="true" :show-fullscreen-btn="true"
							:show-play-btn="true" :show-progress="true" :show-mute-btn="true" object-fit="cover"
							initial-time="0" poster="https://pic1.imgdb.cn/item/6895daa458cb8da5c812a9a6.jpg">
						</video>
						<view class="video-overlay">
																<view class="play-hint">
										<u-icon name="play-circle" color="#fff" size="64"></u-icon>
										<text>雅览品牌韵致</text>
									</view>
						</view>
					</view>
				</view>

				<!-- 精品推荐区域 -->
				<view class="featured-products">
					<view class="products-header">
						<view class="header-content">
							<view class="header-title">臻选雅品</view>
							<view class="header-desc">每一件皆为匠心甄选</view>
						</view>
					</view>

					<!-- 产品骨架屏 -->
					<view class="products-grid" v-if="productLoading">
						<view class="product-skeleton" v-for="n in 4" :key="n">
							<view class="skeleton-image"></view>
							<view class="skeleton-content">
								<view class="skeleton-title"></view>
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

								<view class="card-badge" v-if="item.isHot">
									<text>HOT</text>
								</view>

								<view class="card-overlay">
																	<view class="quick-buy" @tap.stop="quickBuy(item)">
									<u-icon name="shopping-cart" color="#fff" size="28"></u-icon>
								</view>
								</view>
							</view>

							<view class="card-content">
								<view class="product-tag" v-if="item.tag">{{ item.tag }}</view>
								<view class="product-title">{{ item.name }}</view>
								<view class="product-subtitle">{{ item.desc }}</view>

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
				</view>

				<!-- 底部雅致装饰 -->
				<view class="bottom-decoration">
					<view class="decoration-line"></view>
					<view class="decoration-text">雷波农特 · 雅致生活</view>
					<view class="decoration-line"></view>
				</view>
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
		import CustomCarousel from '@/components/Carousel.vue'
		export default {
			components: {
				BaseContainer,
				CustomCarousel
			},
					data() {
			return {
				// 状态栏和搜索栏高度
				statusBarHeight: 0,
				searchBarHeight: 44, // 默认高度
				
				// 臻选资讯播报
				noticeList: [{
						text: '🌟 山川馈赠季·珍馐雅品限时臻享',
						url: '/pages/activity/sale/sale'
					},
					{
						text: '🎋 新客专礼·首笔订单尊享五十元优遇',
						url: ''
					},
					{
						text: '🏔️ 雷波农特·承载山水间的品质传承',
						url: '/pages/help/about/about'
					}
				],

					// 山水印象画卷
					bannerList: [{
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
							title: '阿合哈洛·天境草甸',
							desc: '云天相接处，诗意盎然的南国牧歌'
						}
					],

					// 山川人文雅韵（与轮播图相映成趣）
					cultureList: [{
							title: '雷波脐橙·金桂飘香',
							subtitle: '承载山川灵韵的甘露琼浆',
							content: '雷波脐橙孕育于海拔八百至千二百米的臻美高地，此地四时轮转有序，昼夜温差适宜，朝露夕霞润泽，清风明月相伴。每一枚果实皆汇聚天地精华，果肉饱满如珠玉，汁液甘甜似琼浆，芳香馥郁沁人心脾。富含维生素C及诸多珍贵营养元素，实乃康养生活之臻品，健康膳食之雅选。',
							highlight: '琼浆玉液 · 山川精华 · 养生臻品'
						},
						{
							title: '马湖秘境·云水谣',
							subtitle: '国家四A胜境的澄澈馈赠',
							content: '马湖静卧雷波北境，乃巴蜀第三大天然湖泊，素有"高原明珠"之雅称。湖水澄澈如镜，倒映青山如黛，原始森林环绕四周，负氧离子丰沛怡人。湖中珍生马湖莼菜，于碧波间自然生长，质地柔嫩如丝，营养价值卓绝，堪称湖光山色间的天然瑰宝。',
							highlight: '明珠秘境 · 负氧天堂 · 莼菜雅珍'
						},
						{
							title: '雷波古韵·文脉千秋',
							subtitle: '川滇通衢的彝汉文明交汇地',
							content: '雷波古郡底蕴深厚，乃川滇交界之文化长廊。溯其源流，古为西南夷地，商周秦汉即有先民繁衍生息。汉武建元六年置县，历经唐宋马湖部、元代马湖路、明朝马湖府、清代雷波厅之演变，迄今已逾二千一百载春秋。此地乃蜀汉丞相诸葛孔明南征故土，彝汉两族文明在此交融荟萃，语言文字、服饰饮食、风俗礼仪皆独具特色，承载着厚重的历史文脉与民族风情。',
							highlight: '千秋古郡 · 文明交融 · 孔明故地'
						},
						{
							title: '阿合哈洛·天境草甸',
							subtitle: '云天相接的南国牧歌画卷',
							content: '阿合哈洛大草原巍然屹立于海拔三千余米之高原，乃巴蜀境内最为辽阔的高山草甸，世人誉之为"南国呼伦贝尔"。此地天苍苍、野茫茫，水草丰美，牛羊如云。高原出产之牦牛肉质鲜美醇厚，营养价值丰富；草甸间更有珍贵的高山有机芦笋，在纯净无瑕的天境中自然生长，鲜嫩清香，乃大自然恩赐的养生佳品。',
							highlight: '天境草甸 · 牧歌悠扬 · 高原珍馐'
						}
					],

					// 品质承诺雅集
					serviceFeatures: [{
							title: '原生态臻品',
							desc: '源于高山净土的自然馈赠'
						},
						{
							title: '迅达配送',
							desc: '四十八时辰内鲜美直达'
						},
						{
							title: '品质甄选',
							desc: '精心臻选每一份匠心之作'
						},
						{
							title: '雅致服务',
							desc: '专业团队的贴心陪伴'
						}
					],

					// 状态管理
					currentTextIndex: 0,
					bannerLoading: true,
					bannerError: false,
					productLoading: true,
					textTimer: null, // 文字轮播定时器

					// 臻品甄选（雅致呈现）
					featuredProducts: []
				}
			},

			mounted() {
				this.initPageLayout()
				this.fetchData()
				this.fetchData1()
			},
			beforeDestroy() {
				// 清理相关资源
			},
			methods: {
				// 初始化页面布局
				initPageLayout() {
					try {
						// 获取系统信息
						const systemInfo = uni.getSystemInfoSync()
						this.statusBarHeight = systemInfo.statusBarHeight || 0
						
						// 获取胶囊按钮信息
						const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
						if (menuButtonInfo) {
							// 根据胶囊按钮高度设置搜索栏高度
							this.searchBarHeight = menuButtonInfo.height || 44
						}
					} catch (error) {
						console.error('获取页面布局信息失败:', error)
						// 设置默认值
						this.statusBarHeight = 20
						this.searchBarHeight = 44
					}
				},
				
				// 初始化首页雅致内容
				async fetchData() {
					try {
						this.bannerLoading = true
						// TODO 山水印象画卷接口会在这里使用
						const res = await fetchHomeBanner()
						if (res.code == 200 && res.data && res.data.length > 0) {
							// 创建ID与文化内容的映射关系
							const cultureMap = {
								4: this.cultureList[0], // 雷波脐橙·金桂飘香
								3: this.cultureList[1], // 马湖秘境·云水谣  
								1: this.cultureList[2], // 雷波古韵·文脉千秋
								5: this.cultureList[3] // 阿合哈洛·天境草甸
							};

							this.bannerList = res.data.map(item => {
								const culture = cultureMap[item.id] || this.cultureList[0];
								return {
									image: item.image || item.pic || item.url || item.imageUrl,
									title: culture.title,
									desc: culture.subtitle
								};
							});

							// 同步更新cultureList的顺序，使其与轮播图保持一致
							this.cultureList = res.data.map(item => {
								return cultureMap[item.id] || this.cultureList[0];
							});
						} else {
							console.log('轮播数据为空，使用默认数据');
							// 保持原有的默认数据
						}

						console.log('山水印象画卷数据载入完毕');
					} catch (error) {
						console.error('获取山水印象数据失败:', error);
						this.bannerError = true
					} finally {
						this.bannerLoading = false
					}
				},

				// 获取臻品甄选数据
				async fetchData1() {
					try {
						this.productLoading = true
						let params = {
							pageSize: 4,
							pageNo: 1,
							isHot: 1
						}
						let res = await fetchGoodsList(params)
						if (res.code == 200 && res.rows) {
							this.featuredProducts = res.rows.map(item => ({
								goodsId: item.goodsId,
								img: item.goodsImage,
								name: item.goodsName,
								desc: item.sellingPoint || '臻品佳选，值得珍藏',
								likeNum: item.virtualSoldNum || item.soldNum || 0,
								price: item.promotionPrice || item.price,
								originalPrice: item.price,
								rating: item.rating || '4.8',
								tag: item.tag || '',
								isHot: item.isHot || false,
								imageLoaded: false
							}));
						}

						console.log('臻品甄选数据载入完毕');
					} catch (error) {
						console.error('获取臻品甄选数据失败:', error);
					} finally {
						this.productLoading = false
					}
				},

				// 导航至搜寻雅境
				toSearch() {
					uni.navigateTo({
						url: "/subpackages/search/index/index"
					})
				},

				// 轮播图切换事件 - 同步文字内容
				onBannerChange(e) {
					this.currentTextIndex = e.current % this.cultureList.length;
				},

				// 轮播图点击预览
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

				// 手动切换文化展示（双向控制）
				setCurrentTextIndex(index) {
					this.currentTextIndex = index;

					// 控制轮播图切换
					if (this.$refs.bannerSwiper && this.$refs.bannerSwiper.setCurrentIndex) {
						this.$refs.bannerSwiper.setCurrentIndex(index);
					}
				},

				// 品质承诺详览
				onServiceTap(service) {
					uni.showModal({
						title: service.title,
						content: `${service.desc}\n\n我们致力于为您呈现最为雅致的服务体验。`,
						showCancel: false,
						confirmText: '深表赞同',
						confirmColor: '#a6e22e'
					});
				},

				// 跳转商品详情
				goToGoodsDetail(goodsId) {
					uni.navigateTo({
						url: `/subpackages/goods/detail/detail?goodsId=${goodsId}`
					})
				},

				// 雅致珍藏
				quickBuy(product) {
					uni.showModal({
						title: '臻选入篮',
						content: `诚意邀请将"${product.name}"纳入雅篮？`,
						confirmText: '欣然同意',
						cancelText: '容我再览',
						confirmColor: '#a6e22e',
						success: async (res) => {
							if (res.confirm) {
								let result = await AddCart({
									"skuId": product.goodsId,
									"goodsNum": 1
								})
								if (result.code != 200) {
									return uni.showToast({
										title: result.msg,
										icon: 'error',
										duration: 2000
									})
								}
								uni.showToast({
									title: '已臻选入篮',
									icon: 'success',
									duration: 2000
								});

							}
						}
					});
				},

				// 浏览全部臻品
				viewAllProducts() {
					uni.switchTab({
						url: '/pages/index/index'
					});
				},

				// 山水画卷载入完毕
				onBannerLoad() {
					console.log('山水画卷载入完毕');
				},

				// 山水画卷载入异常
				onBannerError() {
					this.bannerError = true
					uni.showToast({
						title: '山水画卷载入异常',
						icon: 'none',
						duration: 3000
					})
				},



				// 印章点触雅致效果
				onLogoTap() {
					uni.showToast({
						title: '雷波农特恭候雅临',
						icon: 'none',
						duration: 2000
					});
				},

				// 简单的图片加载处理
				onImageLoad(index) {
					if (this.featuredProducts[index]) {
						this.$set(this.featuredProducts[index], 'imageLoaded', true);
					}
				},

				// 简单的图片错误处理
				onImageError(index) {
					if (this.featuredProducts[index]) {
						this.$set(this.featuredProducts[index], 'imageLoaded', true);
						// 设置默认图片
						this.$set(this.featuredProducts[index], 'img',
							'https://pic1.imgdb.cn/item/6895daa458cb8da5c812a9a6.jpg');
					}
				},


			}
		}
	</script>

	<style lang="scss">
		// 移除可能遮挡内容的外层容器样式
	</style>

	<style lang="scss" scoped>
		// 全局样式重置
		.home-container {
			width: 100%;
			min-height: 100vh;
			background: #f5f5f5;
			position: relative;
		}
		
		// 顶部搜索栏
		.top-search-bar {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 1000;
			background: linear-gradient(to bottom, #34C759 0%, #34C759 30%, #67EABF 100%);
			box-shadow: 0 2px 10px rgba(52, 199, 89, 0.2);
		}
		
		.search-content {
			display: flex;
			align-items: center;
			padding: 0 30rpx;
			padding-right: 200rpx; // 给右侧胶囊按钮留出空间
		}
		
		.search-box {
			flex: 1;
			background: rgba(255, 255, 255, 0.25);
			border-radius: 44rpx;
			display: flex;
			align-items: center;
			gap: 12rpx;
			backdrop-filter: blur(10rpx);
			border: 1rpx solid rgba(255, 255, 255, 0.3);
			transition: all 0.3s ease;
			height: 44rpx;
			
			&:active {
				background: rgba(255, 255, 255, 0.35);
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
			color: rgba(255, 255, 255, 0.8);
			font-weight: 400;
		}

		// 背景装饰效果
		.background-effects {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			pointer-events: none;
			z-index: 0;
			overflow: hidden;
		}



		// 顶部落叶飘渺效果
		.falling-leaves {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			z-index: 5;
			overflow: hidden;
			pointer-events: none;

			.leaf {
				position: absolute;
				font-size: 32rpx;
				opacity: 0.7;
				filter: drop-shadow(2rpx 2rpx 4rpx rgba(0, 0, 0, 0.1));

				&.leaf-1 {
					top: -60rpx;
					left: 10%;
					animation: leaf-fall-1 12s infinite ease-in-out;
					animation-delay: 0s;
				}

				&.leaf-2 {
					top: -80rpx;
					left: 25%;
					animation: leaf-fall-2 15s infinite ease-in-out;
					animation-delay: 2s;
				}

				&.leaf-3 {
					top: -100rpx;
					left: 40%;
					animation: leaf-fall-3 18s infinite ease-in-out;
					animation-delay: 4s;
				}

				&.leaf-4 {
					top: -120rpx;
					left: 55%;
					animation: leaf-fall-4 14s infinite ease-in-out;
					animation-delay: 1s;
				}

				&.leaf-5 {
					top: -90rpx;
					left: 70%;
					animation: leaf-fall-5 16s infinite ease-in-out;
					animation-delay: 3s;
				}

				&.leaf-6 {
					top: -70rpx;
					left: 85%;
					animation: leaf-fall-6 13s infinite ease-in-out;
					animation-delay: 5s;
				}

				&.leaf-7 {
					top: -110rpx;
					left: 5%;
					animation: leaf-fall-7 17s infinite ease-in-out;
					animation-delay: 6s;
				}

				&.leaf-8 {
					top: -130rpx;
					left: 75%;
					animation: leaf-fall-8 11s infinite ease-in-out;
					animation-delay: 7s;
				}
			}
		}

		// 光晕效果
		.light-effects {
			position: absolute;
			width: 100%;
			height: 100%;
			/* iOS性能优化 */
			-webkit-transform: translateZ(0);
			transform: translateZ(0);
			-webkit-backface-visibility: hidden;
			backface-visibility: hidden;

			.light-orb {
				position: absolute;
				border-radius: 50%;
				filter: blur(60rpx);
				z-index: 50;
				opacity: 0.8;
				/* iOS优化：使用will-change和transform3d触发硬件加速 */
				will-change: transform;
				transform: translateZ(0);
				-webkit-backface-visibility: hidden;
				backface-visibility: hidden;

				&.orb-1 {
					width: 400rpx;
					height: 400rpx;
					background: radial-gradient(circle,
							rgba(255, 99, 99, 0.3) 0%,
							rgba(255, 99, 99, 0.15) 25%,
							rgba(255, 99, 99, 0.08) 50%,
							rgba(255, 99, 99, 0.03) 70%,
							rgba(255, 99, 99, 0.01) 85%,
							transparent 100%);
					top: 15%;
					left: -10%;
					/* iOS边缘优化 */
					-webkit-filter: blur(60rpx);
					filter: blur(60rpx);
				}

				&.orb-2 {
					width: 500rpx;
					height: 500rpx;
					background: radial-gradient(circle,
							rgba(255, 59, 48, 0.25) 0%,
							rgba(255, 69, 58, 0.12) 25%,
							rgba(255, 69, 58, 0.06) 50%,
							rgba(255, 69, 58, 0.02) 70%,
							rgba(255, 69, 58, 0.008) 85%,
							transparent 100%);
					top: 50%;
					right: -15%;
					/* iOS边缘优化 */
					-webkit-filter: blur(60rpx);
					filter: blur(60rpx);
				}

				&.orb-3 {
					width: 350rpx;
					height: 350rpx;
					background: radial-gradient(circle,
							rgba(220, 38, 127, 0.2) 0%,
							rgba(232, 62, 140, 0.1) 25%,
							rgba(232, 62, 140, 0.05) 50%,
							rgba(232, 62, 140, 0.018) 70%,
							rgba(232, 62, 140, 0.006) 85%,
							transparent 100%);
					top: 80%;
					left: 30%;
					/* iOS边缘优化 */
					-webkit-filter: blur(60rpx);
					filter: blur(60rpx);
				}
			}
		}



		// 品牌头部区域 - 中国风设计
		.brand-header {
			padding: 40rpx 20rpx 24rpx;
			position: relative;
			z-index: 10;
		}



		.traditional-frame {
			position: relative;
			background: linear-gradient(145deg, #fefefe 0%, #f8faf9 100%);
			border-radius: 16rpx;
			padding: 32rpx 24rpx;
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
			gap: 24rpx;
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
				animation: gentle-pulse 3s ease-in-out infinite;

				&::before {
					content: '';
					position: absolute;
					width: 96rpx;
					height: 96rpx;
					border: 2rpx solid rgba(255, 255, 255, 0.3);
					border-radius: 50%;
					animation: rotate-border 8s linear infinite;
				}

				&:active {
					transform: scale(0.95);
					animation-play-state: paused;
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
					animation: glow-pulse 2s ease-in-out infinite alternate;
				}

				.seal-text {
					font-size: 36rpx;
					font-weight: 800;
					color: #ffffff;
					text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.3);
					letter-spacing: 4rpx;
					position: relative;
					z-index: 2;
					animation: text-shimmer 4s ease-in-out infinite;
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
					animation: ripple-effect 2s ease-out infinite;
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
		}

		// 搜索区域
		.search-section {
			padding: 0 24rpx 16rpx;
			position: relative;
			z-index: 10;
		}

		.search-wrapper {
			width: 100%;
		}

		.search-box {
			background: linear-gradient(145deg, #ffffff 0%, #f8faf9 100%);
			border-radius: 48rpx;
			padding: 20rpx 28rpx;
			display: flex;
			align-items: center;
			gap: 16rpx;
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

		// 通知区域
		.notice-section {
			margin: 16rpx 24rpx 32rpx;
			border-radius: 16rpx;
			overflow: hidden;
			background: rgba(255, 255, 255, 0.9);
			backdrop-filter: blur(20rpx);
			box-shadow: 0 4rpx 20rpx rgba(255, 99, 99, 0.1);
			position: relative;
			z-index: 10;
		}

		// Banner轮播区域
		.banner-section {
			padding: 30rpx;
			position: relative;
			z-index: 10;
		}

		.swiper-container {
			position: relative;
		}

		.banner-skeleton {
			width: 100%;
			height: 400rpx;
			border-radius: 24rpx;
			overflow: hidden;
		}

		.skeleton-banner {
			width: 100%;
			height: 100%;
			background: linear-gradient(90deg, #f0f4f8 25%, #e2e8f0 50%, #f0f4f8 75%);
			background-size: 200% 100%;
			animation: skeleton-loading 1.8s infinite ease-in-out;
		}

		// 文化展示区域 - 清新设计
		.culture-showcase {
			margin: 64rpx 24rpx;
			background: linear-gradient(145deg, #ffffff 0%, #fff5f5 100%);
			border-radius: 32rpx;
			overflow: hidden;
			box-shadow:
				0 16rpx 48rpx rgba(255, 99, 99, 0.08),
				0 4rpx 16rpx rgba(0, 0, 0, 0.04);
			border: 2rpx solid rgba(255, 99, 99, 0.1);
			position: relative;
			z-index: 10;

			&::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background:
					radial-gradient(circle at 20% 20%, rgba(255, 99, 99, 0.03) 0%, transparent 50%),
					radial-gradient(circle at 80% 80%, rgba(255, 59, 48, 0.03) 0%, transparent 50%),
					radial-gradient(circle at 40% 70%, rgba(220, 38, 127, 0.02) 0%, transparent 50%);
				animation: background-float 8s ease-in-out infinite;
				pointer-events: none;
			}
		}

		.section-header {
			background: linear-gradient(135deg, #409eff 0%, #22c55e 100%);
			padding: 48rpx 40rpx;
			text-align: center;
			position: relative;
			overflow: hidden;

			&::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background:
					radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 40%),
					radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 40%);
				animation: header-glow 6s ease-in-out infinite alternate;
			}

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

		.culture-content {
			padding: 32rpx 28rpx;
		}

		.text-carousel {
			position: relative;
			min-height: 520rpx;
		}

		.text-slide {
			min-height: 520rpx;
			background: linear-gradient(145deg, #ffffff 0%, #f0f8ff 100%);
			border-radius: 24rpx;
			padding: 32rpx;
			box-shadow:
				inset 0 2rpx 12rpx rgba(64, 158, 255, 0.06),
				0 8rpx 32rpx rgba(0, 0, 0, 0.04);
			border: 2rpx solid rgba(64, 158, 255, 0.1);
			display: flex;
			flex-direction: column;
			transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
			position: relative;
			overflow: hidden;

			&::before {
				content: '';
				position: absolute;
				top: -50%;
				left: -50%;
				width: 200%;
				height: 200%;
				background: radial-gradient(circle, rgba(64, 158, 255, 0.02) 0%, transparent 70%);
				animation: slide-shimmer 4s ease-in-out infinite;
				pointer-events: none;
			}
		}

		.slide-header {
			margin-bottom: 32rpx;
			text-align: center;
			position: relative;
			z-index: 2;

			.main-title {
				font-size: 44rpx;
				font-weight: 800;
				color: #1e40af;
				margin-bottom: 12rpx;
				letter-spacing: 2rpx;
				line-height: 1.3;
			}

			.sub-title {
				font-size: 28rpx;
				color: #22c55e;
				font-weight: 500;
				letter-spacing: 1rpx;
			}
		}

		.slide-content {
			font-size: 30rpx;
			line-height: 1.8;
			color: #374151;
			text-align: justify;
			margin-bottom: 32rpx;
			position: relative;
			z-index: 2;
			flex: 1;
		}

		.content-highlight {
			margin: 24rpx 0;
			display: flex;
			justify-content: center;
			position: relative;
			z-index: 2;

			.highlight-badge {
				background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
				color: #ffffff;
				padding: 12rpx 24rpx;
				border-radius: 24rpx;
				font-size: 24rpx;
				font-weight: 600;
				letter-spacing: 1rpx;
				box-shadow: 0 4rpx 16rpx rgba(34, 197, 94, 0.3);

				text {
					text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.1);
				}
			}
		}

		.slide-decoration {
			display: flex;
			justify-content: center;
			margin-top: auto;
			padding-top: 24rpx;
			position: relative;
			z-index: 2;

			.decoration-dots {
				display: flex;
				gap: 16rpx;
				align-items: center;

				.dot {
					color: #409eff;
					font-size: 16rpx;
					opacity: 0.6;
					animation: dot-pulse 2s ease-in-out infinite;

					&:nth-child(1) {
						animation-delay: 0s;
					}

					&:nth-child(2) {
						animation-delay: 0.3s;
					}

					&:nth-child(3) {
						animation-delay: 0.6s;
					}
				}
			}
		}

		.culture-indicators {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 48rpx;
			gap: 32rpx;
		}

		.traditional-indicator {
			width: 52rpx;
			height: 52rpx;
			border-radius: 50%;
			background: rgba(64, 158, 255, 0.1);
			border: 2rpx solid rgba(64, 158, 255, 0.3);
			display: flex;
			align-items: center;
			justify-content: center;
			transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
			cursor: pointer;
			position: relative;
			overflow: hidden;

			&::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: radial-gradient(circle, rgba(64, 158, 255, 0.1) 0%, transparent 70%);
				opacity: 0;
				transition: opacity 0.3s ease;
			}

			&:hover::before {
				opacity: 1;
			}

			text {
				font-size: 24rpx;
				font-weight: 600;
				color: #409eff;
				position: relative;
				z-index: 2;
			}

			&.active {
				background: linear-gradient(135deg, #409eff 0%, #22c55e 100%);
				border-color: #409eff;
				transform: scale(1.15);
				box-shadow: 0 6rpx 20rpx rgba(64, 158, 255, 0.3);

				text {
					color: #fff;
					text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.1);
				}
			}
		}

		// 服务承诺矩阵 - 中国风
		.service-matrix {
			margin: 64rpx 24rpx;
			position: relative;
			z-index: 10;
		}

		.matrix-title {
			text-align: center;
			margin-bottom: 48rpx;

			.chinese-divider {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 24rpx;

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
		}

		.service-grid {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 32rpx;
		}

		.service-card {
			background: linear-gradient(145deg, #ffffff 0%, #f8faf9 100%);
			border-radius: 20rpx;
			padding: 28rpx 20rpx;
			text-align: center;
			box-shadow:
				0 8rpx 32rpx rgba(139, 148, 103, 0.08),
				0 4rpx 12rpx rgba(0, 0, 0, 0.04);
			border: 2rpx solid rgba(139, 148, 103, 0.1);
			transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
			position: relative;

			&:active {
				transform: translateY(-8rpx);
				box-shadow:
					0 16rpx 48rpx rgba(139, 148, 103, 0.12),
					0 8rpx 24rpx rgba(0, 0, 0, 0.06);
			}

			.card-header {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 16rpx;
				margin-bottom: 20rpx;

				.card-number {
					width: 56rpx;
					height: 56rpx;
					background: linear-gradient(135deg, #8b9467 0%, #6d7a52 100%);
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #fff;
					font-size: 20rpx;
					font-weight: 700;
					letter-spacing: 1rpx;
				}

				.card-title {
					font-size: 32rpx;
					font-weight: 700;
					color: #2d3820;
					letter-spacing: 1rpx;
				}
			}

			.card-desc {
				font-size: 24rpx;
				color: #666;
				line-height: 1.5;
				margin-bottom: 20rpx;
			}

			.card-decoration {
				color: #8b9467;
				font-size: 20rpx;
				opacity: 0.6;
			}
		}

		// 视频展示区域
		.video-showcase {
			margin: 64rpx 24rpx;
			position: relative;
			z-index: 10;
		}

		.video-header {
			text-align: center;
			margin-bottom: 48rpx;

			.video-title {
				font-size: 48rpx;
				font-weight: 800;
				color: #2d5016;
				margin-bottom: 16rpx;
				letter-spacing: 4rpx;
			}

			.video-subtitle {
				font-size: 28rpx;
				color: #666;
				letter-spacing: 2rpx;
			}
		}

		.video-container {
			position: relative;
			border-radius: 32rpx;
			overflow: hidden;
			box-shadow:
				0 20rpx 60rpx rgba(166, 226, 46, 0.1),
				0 8rpx 24rpx rgba(0, 0, 0, 0.05);

			.brand-video {
				width: 100%;
				height: 400rpx;
				border-radius: 32rpx;
				background: #000;
				display: block;
			}

			.video-overlay {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: rgba(0, 0, 0, 0.3);
				display: flex;
				align-items: center;
				justify-content: center;
				opacity: 0;
				transition: opacity 0.3s ease;

				&:active {
					opacity: 1;
				}

				.play-hint {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: #fff;
					font-size: 24rpx;
					font-weight: 500;

					text {
						margin-top: 16rpx;
					}
				}
			}
		}

		// 精品推荐区域
		.featured-products {
			margin: 80rpx 24rpx 64rpx;
			position: relative;
			z-index: 10;
		}

		.products-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 48rpx;

			.header-badge {
				background: linear-gradient(135deg, #a6e22e 0%, #8db82a 100%);
				padding: 12rpx 24rpx;
				border-radius: 20rpx;

				.badge-text {
					font-size: 20rpx;
					color: #fff;
					font-weight: 700;
					letter-spacing: 2rpx;
				}
			}

			.header-content {
				flex: 1;
				margin-left: 32rpx;
				display: flex;
				flex-direction: column;
				align-items: center;

				.header-title {
					font-size: 48rpx;
					font-weight: 800;
					color: #2d5016;
					margin-bottom: 8rpx;
					letter-spacing: 4rpx;
				}

				.header-desc {
					font-size: 24rpx;
					color: #666;
					letter-spacing: 1rpx;
				}
			}

			.view-more {
				display: flex;
				align-items: center;
				gap: 8rpx;
				color: #a6e22e;
				font-size: 24rpx;
				font-weight: 500;

				&:active {
					opacity: 0.7;
				}
			}
		}

		.products-grid {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 32rpx;
		}

		// 产品骨架屏
		.product-skeleton {
			background: #fff;
			border-radius: 24rpx;
			overflow: hidden;
			box-shadow: 0 8rpx 32rpx rgba(166, 226, 46, 0.08);

			.skeleton-image {
				width: 100%;
				height: 240rpx;
				background: linear-gradient(90deg, #f0f4f8 25%, #e2e8f0 50%, #f0f4f8 75%);
				background-size: 200% 100%;
				animation: skeleton-loading 1.8s infinite ease-in-out;
			}

			.skeleton-content {
				padding: 24rpx;

				.skeleton-title,
				.skeleton-desc,
				.skeleton-price {
					background: linear-gradient(90deg, #f0f4f8 25%, #e2e8f0 50%, #f0f4f8 75%);
					background-size: 200% 100%;
					animation: skeleton-loading 1.8s infinite ease-in-out;
					border-radius: 8rpx;
				}

				.skeleton-title {
					height: 36rpx;
					margin-bottom: 16rpx;
				}

				.skeleton-desc {
					height: 24rpx;
					margin-bottom: 20rpx;
					width: 80%;
				}

				.skeleton-price {
					height: 32rpx;
					width: 60%;
				}
			}
		}

		// 精美产品卡片
		.product-card-enhanced {
			background: #fff;
			border-radius: 24rpx;
			overflow: hidden;
			box-shadow:
				0 12rpx 40rpx rgba(166, 226, 46, 0.08),
				0 4rpx 16rpx rgba(0, 0, 0, 0.04);
			transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

			&:active {
				transform: translateY(-8rpx);
				box-shadow:
					0 20rpx 60rpx rgba(166, 226, 46, 0.15),
					0 8rpx 24rpx rgba(0, 0, 0, 0.08);
			}

			.card-image-container {
				position: relative;
				width: 100%;
				height: 240rpx;
				overflow: hidden;

				.card-image {
					width: 100%;
					height: 100%;
					object-fit: cover;
					transition: all 0.6s ease;
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
					z-index: 2;

					.skeleton-shimmer {
						width: 100%;
						height: 100%;
					}
				}

				.card-badge {
					position: absolute;
					top: 16rpx;
					left: 16rpx;
					background: linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%);
					color: #fff;
					padding: 8rpx 16rpx;
					border-radius: 16rpx;
					font-size: 20rpx;
					font-weight: 700;
					z-index: 5;
					box-shadow: 0 4rpx 12rpx rgba(255, 107, 107, 0.3);
				}

				.card-overlay {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background: rgba(0, 0, 0, 0.4);
					display: flex;
					align-items: center;
					justify-content: center;
					opacity: 0;
					transition: opacity 0.3s ease;
					z-index: 3;

					&:active {
						opacity: 1;
					}

					.quick-buy {
						background: rgba(166, 226, 46, 0.9);
						border-radius: 50%;
						width: 80rpx;
						height: 80rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						backdrop-filter: blur(10rpx);
						transition: transform 0.2s ease;

						&:active {
							transform: scale(0.9);
						}
					}
				}
			}

			.card-content {
				padding: 20rpx;

				.product-tag {
					display: inline-block;
					background: rgba(166, 226, 46, 0.1);
					color: #a6e22e;
					padding: 6rpx 12rpx;
					border-radius: 12rpx;
					font-size: 20rpx;
					font-weight: 500;
					margin-bottom: 12rpx;
				}

				.product-title {
					font-size: 32rpx;
					font-weight: 700;
					color: #2d5016;
					margin-bottom: 8rpx;
					line-height: 1.4;
				}

				.product-subtitle {
					font-size: 24rpx;
					color: #666;
					line-height: 1.5;
					margin-bottom: 16rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				.price-section {
					display: flex;
					align-items: center;
					gap: 12rpx;
					margin-bottom: 16rpx;

					.current-price {
						font-size: 36rpx;
						font-weight: 800;
						color: #ff6b6b;
					}

					.original-price {
						font-size: 24rpx;
						color: #999;
						text-decoration: line-through;
					}
				}

				.product-stats {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.stat-item {
						display: flex;
						align-items: center;
						gap: 8rpx;
						font-size: 24rpx;
						color: #666;
						font-weight: 500;
					}
				}
			}
		}

		// 底部装饰
		.bottom-decoration {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 80rpx 24rpx 40rpx;
			gap: 32rpx;
			position: relative;
			z-index: 10;

			.decoration-line {
				flex: 1;
				height: 2rpx;
				background: linear-gradient(90deg, transparent 0%, #ff6363 50%, transparent 100%);
			}

			.decoration-text {
				font-size: 24rpx;
				color: #ff6363;
				font-weight: 500;
				letter-spacing: 2rpx;
			}
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



		@keyframes float {

			0%,
			100% {
				transform: translate(-50%, -50%) rotate(0deg);
			}

			50% {
				transform: translate(-50%, -50%) rotate(180deg);
			}
		}

		// Logo动画效果
		@keyframes gentle-pulse {

			0%,
			100% {
				transform: scale(1);
				box-shadow:
					0 8rpx 24rpx rgba(139, 148, 103, 0.3),
					inset 0 2rpx 8rpx rgba(255, 255, 255, 0.2);
			}

			50% {
				transform: scale(1.02);
				box-shadow:
					0 12rpx 32rpx rgba(139, 148, 103, 0.4),
					inset 0 2rpx 8rpx rgba(255, 255, 255, 0.3);
			}
		}

		@keyframes rotate-border {
			0% {
				transform: rotate(0deg);
			}

			100% {
				transform: rotate(360deg);
			}
		}

		@keyframes glow-pulse {
			0% {
				opacity: 0;
				transform: scale(1);
			}

			100% {
				opacity: 0.6;
				transform: scale(1.1);
			}
		}

		@keyframes text-shimmer {

			0%,
			100% {
				text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.3);
			}

			50% {
				text-shadow:
					0 2rpx 8rpx rgba(0, 0, 0, 0.3),
					0 0 16rpx rgba(255, 255, 255, 0.5);
			}
		}

		@keyframes ripple-effect {
			0% {
				width: 0;
				height: 0;
				opacity: 1;
			}

			50% {
				width: 80rpx;
				height: 80rpx;
				opacity: 0.6;
			}

			100% {
				width: 120rpx;
				height: 120rpx;
				opacity: 0;
			}
		}

		// 新增动画效果
		@keyframes background-float {

			0%,
			100% {
				transform: translate(0, 0) rotate(0deg);
			}

			33% {
				transform: translate(20rpx, -15rpx) rotate(1deg);
			}

			66% {
				transform: translate(-15rpx, 20rpx) rotate(-1deg);
			}
		}

		@keyframes header-glow {
			0% {
				opacity: 0.3;
				transform: scale(1);
			}

			100% {
				opacity: 0.6;
				transform: scale(1.05);
			}
		}

		@keyframes slide-shimmer {

			0%,
			100% {
				transform: translate(-50%, -50%) rotate(0deg);
			}

			50% {
				transform: translate(-50%, -50%) rotate(180deg);
			}
		}

		@keyframes dot-pulse {

			0%,
			100% {
				opacity: 0.3;
				transform: scale(1);
			}

			50% {
				opacity: 1;
				transform: scale(1.2);
			}
		}

		// 背景光晕动画效果已移除，以优化iOS性能

		// 落叶飘渺动画效果
		@keyframes leaf-fall-1 {
			0% {
				transform: translateY(-60rpx) translateX(0) rotate(0deg);
				opacity: 0;
			}

			10% {
				opacity: 0.8;
			}

			50% {
				transform: translateY(50vh) translateX(40rpx) rotate(180deg);
				opacity: 0.6;
			}

			90% {
				opacity: 0.3;
			}

			100% {
				transform: translateY(120vh) translateX(-20rpx) rotate(360deg);
				opacity: 0;
			}
		}

		@keyframes leaf-fall-2 {
			0% {
				transform: translateY(-80rpx) translateX(0) rotate(0deg);
				opacity: 0;
			}

			15% {
				opacity: 0.7;
			}

			40% {
				transform: translateY(40vh) translateX(-60rpx) rotate(-120deg);
				opacity: 0.8;
			}

			80% {
				transform: translateY(80vh) translateX(30rpx) rotate(240deg);
				opacity: 0.4;
			}

			100% {
				transform: translateY(120vh) translateX(-40rpx) rotate(360deg);
				opacity: 0;
			}
		}

		@keyframes leaf-fall-3 {
			0% {
				transform: translateY(-100rpx) translateX(0) rotate(0deg);
				opacity: 0;
			}

			8% {
				opacity: 0.9;
			}

			30% {
				transform: translateY(30vh) translateX(50rpx) rotate(90deg);
				opacity: 0.7;
			}

			60% {
				transform: translateY(60vh) translateX(-30rpx) rotate(270deg);
				opacity: 0.5;
			}

			100% {
				transform: translateY(120vh) translateX(20rpx) rotate(450deg);
				opacity: 0;
			}
		}

		@keyframes leaf-fall-4 {
			0% {
				transform: translateY(-120rpx) translateX(0) rotate(0deg);
				opacity: 0;
			}

			12% {
				opacity: 0.8;
			}

			45% {
				transform: translateY(45vh) translateX(-40rpx) rotate(-150deg);
				opacity: 0.6;
			}

			75% {
				transform: translateY(75vh) translateX(60rpx) rotate(210deg);
				opacity: 0.4;
			}

			100% {
				transform: translateY(120vh) translateX(-30rpx) rotate(360deg);
				opacity: 0;
			}
		}

		@keyframes leaf-fall-5 {
			0% {
				transform: translateY(-90rpx) translateX(0) rotate(0deg);
				opacity: 0;
			}

			18% {
				opacity: 0.7;
			}

			35% {
				transform: translateY(35vh) translateX(35rpx) rotate(120deg);
				opacity: 0.8;
			}

			70% {
				transform: translateY(70vh) translateX(-50rpx) rotate(300deg);
				opacity: 0.3;
			}

			100% {
				transform: translateY(120vh) translateX(25rpx) rotate(480deg);
				opacity: 0;
			}
		}

		@keyframes leaf-fall-6 {
			0% {
				transform: translateY(-70rpx) translateX(0) rotate(0deg);
				opacity: 0;
			}

			20% {
				opacity: 0.9;
			}

			40% {
				transform: translateY(40vh) translateX(-45rpx) rotate(-100deg);
				opacity: 0.7;
			}

			85% {
				transform: translateY(85vh) translateX(35rpx) rotate(260deg);
				opacity: 0.2;
			}

			100% {
				transform: translateY(120vh) translateX(-25rpx) rotate(360deg);
				opacity: 0;
			}
		}

		@keyframes leaf-fall-7 {
			0% {
				transform: translateY(-110rpx) translateX(0) rotate(0deg);
				opacity: 0;
			}

			5% {
				opacity: 0.8;
			}

			25% {
				transform: translateY(25vh) translateX(70rpx) rotate(80deg);
				opacity: 0.9;
			}

			65% {
				transform: translateY(65vh) translateX(-35rpx) rotate(280deg);
				opacity: 0.4;
			}

			100% {
				transform: translateY(120vh) translateX(45rpx) rotate(440deg);
				opacity: 0;
			}
		}

		@keyframes leaf-fall-8 {
			0% {
				transform: translateY(-130rpx) translateX(0) rotate(0deg);
				opacity: 0;
			}

			25% {
				opacity: 0.6;
			}

			50% {
				transform: translateY(50vh) translateX(-55rpx) rotate(-180deg);
				opacity: 0.8;
			}

			90% {
				transform: translateY(90vh) translateX(40rpx) rotate(320deg);
				opacity: 0.2;
			}

			100% {
				transform: translateY(120vh) translateX(-35rpx) rotate(360deg);
				opacity: 0;
			}
		}

		// 全局过渡优化
		* {
			-webkit-tap-highlight-color: transparent;
		}
	</style>