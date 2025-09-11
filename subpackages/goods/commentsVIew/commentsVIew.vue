<template>
	<view class="comment-page">
		<!-- 商品信息区域 -->
		<view class="product-info">
			<image class="product-image" :src="productInfo.goodsImage" mode="aspectFill"></image>
			<view class="product-details">
				<text class="product-name">{{ productInfo.goodsName }}</text>
				<view class="product-price">
					<text class="price-symbol">¥</text>
					<text class="price-value">{{ productInfo.currentPrice }}</text>
				</view>
			</view>
		</view>

		<!-- 评价内容区域 -->
		<view class="comment-content">
			<!-- 星级评分 -->
			<view class="rating-section">
				<text class="section-title">评分</text>
				<view class="rating-stars">
					<view class="star-item" v-for="(star, index) in 5" :key="index" @click="setRating(index + 1)">
						<u-icon name="star-fill" :color="index < rating ? '#ffa500' : '#e0e0e0'" size="32"></u-icon>
					</view>
				</view>
				<text class="rating-text">{{ ratingTexts[rating - 1] || '请选择评分' }}</text>
			</view>

			<!-- 评价内容输入 -->
			<view class="comment-input-section">
				<text class="section-title">评价内容</text>
				<textarea class="comment-textarea" v-model="commentText" placeholder="分享您的使用感受，帮助其他用户了解商品"
					maxlength="500" :show-count="true"></textarea>
			</view>

			<!-- 图片上传 -->
			<view class="image-upload-section">
				<text class="section-title">上传图片 (可选)</text>
				<view class="image-upload-container">
					<view class="uploaded-images" v-if="uploadedImages.length > 0">
						<view class="image-item" v-for="(image, index) in uploadedImages" :key="index">
							<image class="uploaded-image" :src="image" mode="aspectFill"></image>
							<view class="delete-btn" @click="deleteImage(index)">
								<u-icon name="close" color="#fff" size="14"></u-icon>
							</view>
						</view>
					</view>
					<view class="upload-btn" @click="chooseImage" v-if="uploadedImages.length < maxImages">
						<u-icon name="camera" color="#999" size="28"></u-icon>
						<text>添加图片</text>
						<text class="upload-tip">{{ uploadedImages.length }}/{{ maxImages }}</text>
					</view>
				</view>
			</view>

			<!-- 匿名评价选项 -->
			<view class="anonymous-section">
				<text class="section-title">评价设置</text>
				<view class="anonymous-option" @click="toggleAnonymous">
					<view class="option-content">
						<text class="option-text">匿名评价</text>
						<text class="option-desc">匿名评价将不显示您的用户名</text>
					</view>
					<view class="switch-container">
						<view class="switch" :class="{ active: isAnonymous === 1 }">
							<view class="switch-handle"></view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部提交按钮 -->
		<view class="submit-section">
			<view class="submit-btn" :class="{ disabled: !canSubmit }" @click="submitComment">
				<text>提交评价</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { addGoodsComment } from '@/api/goods'
	
	export default {
		name: 'CommentsView',
		data() {
			return {
				// 订单相关信息
				orderId: '',
				orderItemId: '', // 子订单ID
				
				// 商品信息
				productInfo: {
					goodsId: '',
					goodsName: '',
					goodsImage: '',
					currentPrice: 0,
					originalPrice: 0
				},
				
				// 用户信息
				userInfo: null,

				// 评价相关
				rating: 5, // 默认5星
				commentText: '',
				uploadedImages: [],
				maxImages: 6, // 最多6张图片
				commentType: 0, // 评价类型：0-主评，1-追评
				isAnonymous: 0, // 是否匿名：0-否，1-是
				
				// 评分文字描述
				ratingTexts: [
					'很差',
					'较差', 
					'一般',
					'满意',
					'非常满意'
				],
				
				// 提交状态
				submitting: false
			}
		},

		computed: {
			// 是否可以提交
			canSubmit() {
				return this.rating > 0 && this.commentText.trim().length > 0 && !this.submitting
			}
		},

		onLoad(options) {
			// 获取订单ID和子订单ID
			if (options.orderId) {
				this.orderId = options.orderId
			}
			if (options.orderItemId) {
				this.orderItemId = options.orderItemId
			}
			
			// 获取商品信息
			if (options.productInfo) {
				try {
					this.productInfo = JSON.parse(decodeURIComponent(options.productInfo))
				} catch (error) {
					console.error('解析商品信息失败:', error)
					uni.showToast({
						title: '参数错误',
						icon: 'none'
					})
					this.goBack()
				}
			}
			
			// 获取评价类型（如果有传递）
			if (options.commentType !== undefined) {
				this.commentType = parseInt(options.commentType) || 0
			}
			
			// 获取用户信息
			this.getUserInfo()
		},

		methods: {
			// 获取用户信息
			getUserInfo() {
				try {
					const userInfo = uni.getStorageSync('userInfo')
					if (userInfo) {
						this.userInfo = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo
					} else {
						uni.showToast({
							title: '请先登录',
							icon: 'none'
						})
						// 可以在这里跳转到登录页面
					}
				} catch (error) {
					console.error('获取用户信息失败:', error)
				}
			},

			// 设置评分
			setRating(rating) {
				this.rating = rating
			},

			// 选择图片
			chooseImage() {
				const remainingCount = this.maxImages - this.uploadedImages.length
				uni.chooseImage({
					count: remainingCount,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						this.uploadedImages.push(...res.tempFilePaths)
					},
					fail: (error) => {
						console.error('选择图片失败:', error)
						uni.showToast({
							title: '选择图片失败',
							icon: 'none'
						})
					}
				})
			},

			// 删除图片
			deleteImage(index) {
				this.uploadedImages.splice(index, 1)
			},

			// 切换匿名状态
			toggleAnonymous() {
				this.isAnonymous = this.isAnonymous === 1 ? 0 : 1
			},

			// 上传图片并获取URL
			async uploadImages() {
				if (this.uploadedImages.length === 0) return ''
				
				try {
					// TODO: 这里需要实现图片上传逻辑，返回上传后的URL
					// 现在暂时返回本地路径，实际项目中需要上传到服务器
					uni.showLoading({ title: '上传图片中...' })
					
					// 模拟上传过程
					await new Promise(resolve => setTimeout(resolve, 1000))
					
					// 实际项目中应该调用上传接口获取真实URL
					const imageUrls = this.uploadedImages.map((image, index) => {
						// 这里应该是实际的上传逻辑
						return `https://example.com/images/comment_${Date.now()}_${index}.jpg`
					})
					
					uni.hideLoading()
					return imageUrls.join(',')
				} catch (error) {
					uni.hideLoading()
					console.error('图片上传失败:', error)
					throw new Error('图片上传失败')
				}
			},

			// 提交评价
			async submitComment() {
				if (!this.canSubmit) return

				// 检查必要参数
				if (!this.orderItemId) {
					uni.showToast({
						title: '缺少订单信息',
						icon: 'none'
					})
					return
				}

				this.submitting = true

				try {
					// 上传图片（如果有）
					const picUrls = await this.uploadImages()

					// 构建评价数据
					const commentData = {
						orderItemId: this.orderItemId,
						commentType: this.commentType,
						score: this.rating,
						content: this.commentText.trim(),
						picUrls: picUrls,
						isAnonymous: this.isAnonymous
					}

					console.log('提交评价数据:', commentData)

					// 调用评价接口
					const res = await addGoodsComment(commentData)
					
					if (res.code === 200) {
						uni.showToast({
							title: '评价提交成功',
							icon: 'success'
						})

						// 延迟返回上一页
						setTimeout(() => {
							this.goBack()
						}, 1500)
					} else {
						throw new Error(res.msg || '提交失败')
					}

				} catch (error) {
					console.error('提交评价失败:', error)
					uni.showToast({
						title: error.message || '提交失败，请重试',
						icon: 'none'
					})
				} finally {
					this.submitting = false
				}
			},

			// 返回上一页
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment-page {
		min-height: 100vh;
		background: #f5f5f5;
		padding-bottom: 120rpx;
	}

	/* 商品信息区域 */
	.product-info {
		background: #fff;
		padding: 30rpx;
		display: flex;
		align-items: center;
		gap: 20rpx;
		margin-bottom: 20rpx;
	}

	.product-image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 12rpx;
	}

	.product-details {
		flex: 1;
	}

	.product-name {
		font-size: 30rpx;
		color: #333;
		font-weight: 600;
		line-height: 1.4;
		margin-bottom: 16rpx;
		display: block;
	}

	.product-price {
		display: flex;
		align-items: baseline;

		.price-symbol {
			font-size: 24rpx;
			color: #ff4d4f;
			margin-right: 4rpx;
		}

		.price-value {
			font-size: 36rpx;
			color: #ff4d4f;
			font-weight: 700;
		}
	}

	/* 评价内容区域 */
	.comment-content {
		background: #fff;
		margin-bottom: 20rpx;
		padding: 30rpx;
	}

	.section-title {
		font-size: 32rpx;
		color: #333;
		font-weight: 600;
		margin-bottom: 24rpx;
		display: block;
	}

	/* 评分区域 */
	.rating-section {
		margin-bottom: 40rpx;
		padding-bottom: 30rpx;
		border-bottom: 1rpx solid #f0f0f0;
	}

	.rating-stars {
		display: flex;
		gap: 16rpx;
		margin-bottom: 16rpx;
	}

	.star-item {
		padding: 8rpx;
		transition: transform 0.2s ease;
	}

	.star-item:active {
		transform: scale(1.1);
	}

	.rating-text {
		font-size: 28rpx;
		color: #666;
	}

	/* 评价输入区域 */
	.comment-input-section {
		margin-bottom: 40rpx;
		padding-bottom: 30rpx;
		border-bottom: 1rpx solid #f0f0f0;
	}

	.comment-textarea {
		width: 100%;
		min-height: 200rpx;
		background: #f8f9fa;
		border: 1rpx solid #e9ecef;
		border-radius: 12rpx;
		padding: 20rpx;
		font-size: 28rpx;
		color: #333;
		line-height: 1.5;
		box-sizing: border-box;
	}

	.comment-textarea::placeholder {
		color: #999;
	}

	/* 图片上传区域 */
	.image-upload-section {
		.section-title {
			margin-bottom: 20rpx;
		}
	}

	.image-upload-container {
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;
	}

	.uploaded-images {
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;
	}

	.image-item {
		position: relative;
		width: 160rpx;
		height: 160rpx;
	}

	.uploaded-image {
		width: 100%;
		height: 100%;
		border-radius: 12rpx;
	}

	.delete-btn {
		position: absolute;
		top: -8rpx;
		right: -8rpx;
		width: 32rpx;
		height: 32rpx;
		background: #ff4d4f;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.upload-btn {
		width: 160rpx;
		height: 160rpx;
		border: 2rpx dashed #d9d9d9;
		border-radius: 12rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8rpx;
		transition: border-color 0.3s ease;

		text {
			font-size: 24rpx;
			color: #999;
		}

		.upload-tip {
			font-size: 20rpx;
			color: #ccc;
		}
	}

	.upload-btn:active {
		border-color: #1890ff;
	}

	/* 匿名评价设置 */
	.anonymous-section {
		padding-top: 30rpx;
		border-top: 1rpx solid #f0f0f0;
	}

	.anonymous-option {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0;
		cursor: pointer;
	}

	.option-content {
		flex: 1;
	}

	.option-text {
		font-size: 28rpx;
		color: #333;
		font-weight: 600;
		display: block;
		margin-bottom: 8rpx;
	}

	.option-desc {
		font-size: 24rpx;
		color: #999;
	}

	.switch-container {
		flex-shrink: 0;
	}

	.switch {
		width: 80rpx;
		height: 44rpx;
		background: #e0e0e0;
		border-radius: 22rpx;
		position: relative;
		transition: background-color 0.3s ease;
	}

	.switch.active {
		background: #1890ff;
	}

	.switch-handle {
		width: 36rpx;
		height: 36rpx;
		background: #fff;
		border-radius: 50%;
		position: absolute;
		top: 4rpx;
		left: 4rpx;
		transition: transform 0.3s ease;
		box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
	}

	.switch.active .switch-handle {
		transform: translateX(36rpx);
	}

	/* 底部提交区域 */
	.submit-section {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;
		padding: 24rpx 30rpx;
		box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.08);
	}

	.submit-btn {
		width: 100%;
		height: 88rpx;
		background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
		border-radius: 44rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;

		text {
			font-size: 32rpx;
			color: #fff;
			font-weight: 600;
		}
	}

	.submit-btn.disabled {
		background: #d9d9d9;
		
		text {
			color: #999;
		}
	}

	.submit-btn:not(.disabled):active {
		transform: scale(0.98);
		box-shadow: 0 2rpx 8rpx rgba(24, 144, 255, 0.3);
	}
</style>
