<template>

	<view class="evaluate-container">
		<!-- 商品信息 -->
		<view class="product-info">
			<image class="product-img" :src="orderInfo.product.image" mode="aspectFill"></image>
			<view class="product-details">
				<view class="product-name">{{ orderInfo.product.name }}</view>
				<view class="product-attr">{{ orderInfo.product.attributes }}</view>
				<view class="product-price">¥{{ orderInfo.product.price }}</view>
			</view>
		</view>

		<!-- 评价内容 -->
		<view class="evaluate-content">
			<!-- 整体评分 -->
			<view class="rating-section">
				<view class="section-title">
					<text>整体评分</text>
				</view>
				<view class="rating-stars">
					<view class="star-item" v-for="index in 5" :key="index" @click="setOverallRating(index)">
						<u-icon :name="index <= overallRating ? 'star-fill' : 'star'"
							:color="index <= overallRating ? '#FFD700' : '#ddd'" size="24"></u-icon>
					</view>
				</view>
				<view class="rating-text">
					<text>{{ getRatingText(overallRating) }}</text>
				</view>
			</view>

			<!-- 详细评分 -->
			<view class="detail-rating">
				<view class="section-title">
					<text>详细评分</text>
				</view>
				<view class="rating-items">
					<view class="rating-item" v-for="(item, index) in detailRatings" :key="index">
						<view class="rating-label">
							<text>{{ item.label }}</text>
						</view>
						<view class="rating-stars">
							<view class="star-item" v-for="starIndex in 5" :key="starIndex"
								@click="setDetailRating(index, starIndex)">
								<u-icon :name="starIndex <= item.rating ? 'star-fill' : 'star'"
									:color="starIndex <= item.rating ? '#FFD700' : '#ddd'" size="20"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 文字评价 -->
			<view class="text-evaluate">
				<view class="section-title">
					<text>文字评价</text>
					<text class="word-count">{{ evaluateText.length }}/500</text>
				</view>
				<view class="text-area">
					<textarea v-model="evaluateText" class="evaluate-textarea" placeholder="请分享您的使用体验，帮助其他用户更好地了解商品..."
						maxlength="500" :show-confirm-bar="false"></textarea>
				</view>
			</view>

			<!-- 图片上传 -->
			<view class="image-upload">
				<view class="section-title">
					<text>上传图片</text>
					<text class="upload-tip">最多上传6张</text>
				</view>
				<view class="upload-list">
					<view class="upload-item" v-for="(image, index) in uploadedImages" :key="index">
						<image class="upload-img" :src="image" mode="aspectFill" @click="previewImage(index)"></image>
						<view class="delete-btn" @click="deleteImage(index)">
							<u-icon name="close" color="#fff" size="16"></u-icon>
						</view>
					</view>
					<view class="upload-btn" v-if="uploadedImages.length < 6" @click="chooseImage">
						<u-icon name="camera" color="#999" size="32"></u-icon>
						<text>添加图片</text>
					</view>
				</view>
			</view>

			<!-- 匿名评价 -->
			<view class="anonymous-section">
				<view class="anonymous-item">
					<text>匿名评价</text>
					<u-switch v-model="isAnonymous" active-color="#89D600"></u-switch>
				</view>
			</view>
		</view>

		<!-- 提交按钮 -->
		<view class="submit-section">
			<view class="submit-btn" @click="submitEvaluate">
				<text>提交评价</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Evaluate',
		data() {
			return {
				orderInfo: {
					orderNumber: 'ORD20231201001',
					product: {
						image: 'https://img.yzcdn.cn/vant/cat.jpeg',
						name: '新鲜有机蔬菜礼盒装 当季时令蔬菜 绿色健康',
						attributes: '规格：大份装 | 产地：山东',
						price: '199.90'
					}
				},
				overallRating: 5,
				detailRatings: [{
						label: '商品质量',
						rating: 5
					},
					{
						label: '物流服务',
						rating: 5
					},
					{
						label: '服务态度',
						rating: 5
					}
				],
				evaluateText: '',
				uploadedImages: [],
				isAnonymous: false
			}
		},
		methods: {
			// 返回上一页
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},

			// 设置整体评分
			setOverallRating(rating) {
				this.overallRating = rating
			},

			// 设置详细评分
			setDetailRating(index, rating) {
				this.detailRatings[index].rating = rating
			},

			// 获取评分文本
			getRatingText(rating) {
				const texts = ['', '很差', '较差', '一般', '不错', '很好']
				return texts[rating] || '很好'
			},

			// 选择图片
			chooseImage() {
				uni.chooseImage({
					count: 6 - this.uploadedImages.length,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						this.uploadedImages = [...this.uploadedImages, ...res.tempFilePaths]
					}
				})
			},

					// 删除图片
		deleteImage(index) {
			this.uploadedImages.splice(index, 1)
		},

		// 预览图片
		previewImage(currentIndex) {
			uni.previewImage({
				current: currentIndex, // 当前显示图片的索引
				urls: this.uploadedImages, // 需要预览的图片链接列表
				loop: true, // 循环预览
				indicator: 'number' // 显示页码
			})
		},

			// 提交评价
			submitEvaluate() {
				if (this.overallRating === 0) {
					uni.showToast({
						title: '请选择整体评分',
						icon: 'none'
					})
					return
				}

				if (!this.evaluateText.trim()) {
					uni.showToast({
						title: '请填写评价内容',
						icon: 'none'
					})
					return
				}

				// 验证详细评分
				const unrated = this.detailRatings.find(item => item.rating === 0)
				if (unrated) {
					uni.showToast({
						title: '请完成详细评分',
						icon: 'none'
					})
					return
				}

				uni.showLoading({
					title: '提交中...'
				})

				// 模拟提交
				setTimeout(() => {
					uni.hideLoading()
					uni.showToast({
						title: '评价提交成功',
						icon: 'success'
					})

					// 返回上一页
					setTimeout(() => {
						this.goBack()
					}, 1500)
				}, 1000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.evaluate-container {
		min-height: 100vh;
		background: #f5f5f5;
	}

	/* 页面头部 */
	.page-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 24rpx;
		background: #fff;
		border-bottom: 1rpx solid #f0f0f0;

		.header-left {
			width: 60rpx;
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.header-title {
			flex: 1;
			text-align: center;

			text {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
			}
		}

		.header-right {
			.submit-btn {
				font-size: 28rpx;
				color: #89D600;
				font-weight: bold;
			}
		}
	}

	/* 商品信息 */
	.product-info {
		display: flex;
		align-items: center;
		padding: 24rpx;
		background: #fff;
		margin-bottom: 20rpx;

		.product-img {
			width: 120rpx;
			height: 120rpx;
			border-radius: 8rpx;
			margin-right: 16rpx;
			flex-shrink: 0;
		}

		.product-details {
			flex: 1;

			.product-name {
				font-size: 28rpx;
				color: #333;
				line-height: 1.4;
				margin-bottom: 8rpx;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}

			.product-attr {
				font-size: 24rpx;
				color: #999;
				margin-bottom: 8rpx;
			}

			.product-price {
				font-size: 28rpx;
				color: #e54d42;
				font-weight: bold;
			}
		}
	}

	/* 评价内容 */
	.evaluate-content {
		background: #fff;
	}

	/* 评分区域 */
	.rating-section,
	.detail-rating {
		padding: 32rpx 24rpx;
		border-bottom: 1rpx solid #f0f0f0;

		.section-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 24rpx;

			text {
				font-size: 28rpx;
				color: #333;
				font-weight: bold;
			}
		}

		.rating-stars {
			display: flex;
			align-items: center;
			gap: 16rpx;
			margin-bottom: 16rpx;

			.star-item {
				padding: 8rpx;
			}
		}

		.rating-text {
			text {
				font-size: 26rpx;
				color: #666;
			}
		}
	}

	.detail-rating {
		.rating-items {
			.rating-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 24rpx;

				&:last-child {
					margin-bottom: 0;
				}

				.rating-label {
					text {
						font-size: 26rpx;
						color: #333;
					}
				}

				.rating-stars {
					display: flex;
					align-items: center;
					gap: 12rpx;

					.star-item {
						padding: 4rpx;
					}
				}
			}
		}
	}

	/* 文字评价 */
	.text-evaluate {
		padding: 32rpx 24rpx;
		border-bottom: 1rpx solid #f0f0f0;

		.section-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 24rpx;

			text {
				font-size: 28rpx;
				color: #333;
				font-weight: bold;

				&.word-count {
					font-size: 24rpx;
					color: #999;
					font-weight: normal;
				}
			}
		}

		.text-area {
			.evaluate-textarea {
				width: 100%;
				min-height: 200rpx;
				padding: 24rpx;
				border: 2rpx solid #f0f0f0;
				border-radius: 12rpx;
				font-size: 28rpx;
				color: #333;
				line-height: 1.5;
				box-sizing: border-box;
			}
		}
	}

	/* 图片上传 */
	.image-upload {
		padding: 32rpx 24rpx;
		border-bottom: 1rpx solid #f0f0f0;

		.section-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 24rpx;

			text {
				font-size: 28rpx;
				color: #333;
				font-weight: bold;

				&.upload-tip {
					font-size: 24rpx;
					color: #999;
					font-weight: normal;
				}
			}
		}

		.upload-list {
			display: flex;
			flex-wrap: wrap;
			gap: 16rpx;

					.upload-item {
			position: relative;
			width: 160rpx;
			height: 160rpx;

			.upload-img {
				width: 100%;
				height: 100%;
				border-radius: 8rpx;
				cursor: pointer;
				transition: transform 0.2s ease;

				&:active {
					transform: scale(0.95);
				}
			}

				.delete-btn {
					position: absolute;
					top: -8rpx;
					right: -8rpx;
					width: 32rpx;
					height: 32rpx;
					background: rgba(0, 0, 0, 0.6);
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}

			.upload-btn {
				width: 160rpx;
				height: 160rpx;
				border: 2rpx dashed #ddd;
				border-radius: 8rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				gap: 8rpx;

				text {
					font-size: 24rpx;
					color: #999;
				}
			}
		}
	}

	/* 匿名评价 */
	.anonymous-section {
		padding: 32rpx 24rpx;

		.anonymous-item {
			display: flex;
			align-items: center;
			justify-content: space-between;

			text {
				font-size: 28rpx;
				color: #333;
			}
		}
	}

	/* 提交按钮 */
	.submit-section {
		padding: 40rpx 24rpx;
		background: #fff;
		margin-top: 20rpx;

		.submit-btn {
			width: 100%;
			height: 88rpx;
			background: linear-gradient(135deg, #89D600 0%, #9BE600 100%);
			border-radius: 12rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			box-shadow: 0 4rpx 16rpx rgba(137, 214, 0, 0.3);
			transition: all 0.3s ease;

			&:active {
				transform: scale(0.98);
				box-shadow: 0 2rpx 8rpx rgba(137, 214, 0, 0.3);
			}

			text {
				font-size: 32rpx;
				color: #fff;
				font-weight: bold;
			}
		}
	}
</style>