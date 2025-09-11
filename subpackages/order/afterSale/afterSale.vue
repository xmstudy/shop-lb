<template>
	<view class="after-sale-container">
		<!-- 页面头部 -->
		<!-- 	<view class="page-header">
			<view class="header-left" @click="goBack">
				<u-icon name="arrow-left" color="#333" size="20"></u-icon>
			</view>
			<view class="header-title">
				<text>申请售后</text>
			</view>
			<view class="header-right"></view>
		</view> -->

		<!-- 商品信息 -->
		<view class="product-info">
			<image class="product-img" :src="orderInfo.product.image" mode="aspectFill"></image>
			<view class="product-details">
				<view class="product-name">{{ orderInfo.product.name }}</view>
				<view class="product-attr">{{ orderInfo.product.attributes }}</view>
				<view class="product-price">¥{{ orderInfo.product.price }}</view>
			</view>
		</view>

		<!-- 售后表单 -->
		<view class="after-sale-form">
			<!-- 售后类型选择 -->
			<view class="form-section">
				<view class="section-title">
					<text>售后类型</text>
				</view>
				<view class="service-type-list">
					<view class="type-item" v-for="(type, index) in availableServiceTypes" :key="index"
						:class="{ active: selectedServiceType === type.value }" @click="selectServiceType(type.value)">
						<text>{{ type.label }}</text>
					</view>
				</view>
			</view>

			<!-- 申请原因 -->
			<view class="form-section">
				<view class="section-title">
					<text>申请原因</text>
				</view>
				<view class="reason-list">
					<view class="reason-item" v-for="(reason, index) in afterSaleReasons" :key="index"
						:class="{ active: selectedReason === reason.value }" @click="selectReason(reason.value)">
						<text>{{ reason.label }}</text>
					</view>
				</view>
			</view>

			<!-- 申请说明 -->
			<view class="form-section">
				<view class="section-title">
					<text>申请说明</text>
					<text class="word-count"
						:class="{ 'word-limit': problemDesc.length >= 100 }">{{ problemDesc.length }}/100</text>
				</view>
				<view class="text-area">
					<textarea v-model="problemDesc" class="problem-textarea" placeholder="请详细描述您遇到的问题（不超过100个字符）..."
						maxlength="100" :show-confirm-bar="false"></textarea>
				</view>
			</view>

			<!-- 图片上传 -->
			<view class="form-section">
				<view class="section-title">
					<text>图片凭证</text>
					<text class="upload-tip">最多上传1张</text>
				</view>
				<view class="upload-list">
					<view class="upload-item" v-for="(image, index) in uploadedImages" :key="index">
						<image class="upload-img" :src="image" mode="aspectFill" @click="previewImage(index)"></image>
						<view class="delete-btn" @click="deleteImage(index)">
							<u-icon name="close" color="#fff" size="16"></u-icon>
						</view>
					</view>
					<view class="upload-btn" v-if="uploadedImages.length < 1" @click="chooseImage">
						<u-icon name="camera" color="#999" size="32"></u-icon>
						<text>添加图片</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 提交按钮 -->
		<view class="submit-section">
			<view class="submit-btn" @click="submitAfterSale">
				<text>提交申请</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		fetchAfterSaleReasons,
		submitAfterSale
	} from '@/api/aftersales'
	import { fetchOrderDetail } from '@/api/orders'
	import { UploadFile } from '@/api/index/index.js'

	export default {
		name: 'AfterSale',
		data() {
			return {
				// 原始订单数据（从接口获取的完整数据）
				originalOrderData: null,
				// 显示用的订单信息（用于界面展示）
				orderInfo: {
					orderId: '',
					orderItemId: '',
					orderStatus: '', // 订单状态
					product: {
						image: 'https://img.yzcdn.cn/vant/cat.jpeg',
						name: '新鲜有机蔬菜礼盒装 当季时令蔬菜 绿色健康',
						attributes: '规格：大份装 | 产地：山东',
						price: '199.90'
					}
				},
				serviceTypes: [{
						label: '仅退款',
						value: '1'
					},
					{
						label: '退货退款',
						value: '2'
					}
				],
				selectedServiceType: '2', // 默认选择退货退款
				afterSaleReasons: [],
				selectedReason: '',
				problemDesc: '',
				uploadedImages: []
			}
		},
		computed: {
			// 根据订单状态过滤可用的售后类型
			availableServiceTypes() {
				// 只有未发货状态下可以申请仅退款
				if (this.orderInfo.orderStatus === '20' || this.orderInfo.orderStatus === 20) { 
					// 待发货（未发货）- 可以申请仅退款或退货退款
					return this.serviceTypes 
				} else if (this.orderInfo.orderStatus === '30' || this.orderInfo.orderStatus === 30) { 
					// 待收货（已发货）- 只能申请退货退款
					return this.serviceTypes.filter(type => type.value === '2') 
				} else if (this.orderInfo.orderStatus === '40' || this.orderInfo.orderStatus === 40) { 
					// 已完成 - 只能申请退货退款
					return this.serviceTypes.filter(type => type.value === '2') 
				}
				// 其他状态默认只能申请退货退款
				return this.serviceTypes.filter(type => type.value === '2')
			}
		},
		onLoad(options) {
			// 处理页面参数
			if (options.orderId) {
				this.orderInfo.orderId = options.orderId
				// 获取原始订单数据
				this.loadOriginalOrderData(options.orderId)
			}
			if (options.orderItemId) {
				this.orderInfo.orderItemId = options.orderItemId
			}
			if (options.orderStatus) {
				this.orderInfo.orderStatus = options.orderStatus
			}
			// 如果有商品信息参数，也设置
			if (options.productName) {
				this.orderInfo.product.name = decodeURIComponent(options.productName)
			}
			if (options.productImage) {
				this.orderInfo.product.image = decodeURIComponent(options.productImage)
			}
			if (options.productPrice) {
				this.orderInfo.product.price = options.productPrice
			}
		},
		mounted() {
			this.loadAfterSaleReasons()
			this.initDefaultServiceType()
		},
		methods: {
			// 返回上一页
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},

			// 加载原始订单数据
			async loadOriginalOrderData(orderId) {
				try {
					uni.showLoading({ title: '加载订单信息...' })
					
					const response = await fetchOrderDetail(orderId)
					
					if (response.code === 200 && response.data) {
						// 保存原始订单数据
						this.originalOrderData = response.data
						
						// 更新显示信息
						this.updateOrderDisplayInfo(response.data)
						
						console.log('原始订单数据:', this.originalOrderData)
					} else {
						uni.showToast({
							title: response.msg || '获取订单信息失败',
							icon: 'none'
						})
					}
				} catch (error) {
					console.error('加载订单数据失败:', error)
					uni.showToast({
						title: '网络错误，请重试',
						icon: 'none'
					})
				} finally {
					uni.hideLoading()
				}
			},

			// 更新订单显示信息
			updateOrderDisplayInfo(orderData) {
				// 更新基本订单信息
				this.orderInfo.orderId = orderData.orderId
				this.orderInfo.orderStatus = orderData.status
				
				// 如果有商品信息，更新商品显示
				if (orderData.orderItems && orderData.orderItems.length > 0) {
					const firstItem = orderData.orderItems[0]
					this.orderInfo.product = {
						image: firstItem.goodsImage || this.orderInfo.product.image,
						name: firstItem.goodsName || this.orderInfo.product.name,
						attributes: this.formatSpecs(firstItem.specs) || this.orderInfo.product.attributes,
						price: firstItem.goodsPrice || this.orderInfo.product.price
					}
				}
				
				// 订单状态更新后，重新初始化售后类型
				this.$nextTick(() => {
					this.initDefaultServiceType()
				})
			},

			// 格式化规格信息
			formatSpecs(specs) {
				if (!specs) return ''
				if (typeof specs === 'string') {
					try {
						const specsArray = JSON.parse(specs)
						if (Array.isArray(specsArray)) {
							return specsArray.join(' | ')
						}
						return specs
					} catch (error) {
						return specs
					}
				}
				if (Array.isArray(specs)) {
					return specs.join(' | ')
				}
				return String(specs)
			},

			// 初始化默认售后类型
			initDefaultServiceType() {
				if (this.availableServiceTypes.length > 0) {
					// 如果当前选择的类型不在可用类型中，则选择第一个可用类型
					const isCurrentTypeAvailable = this.availableServiceTypes.some(type => type.value === this.selectedServiceType)
					if (!isCurrentTypeAvailable) {
						this.selectedServiceType = this.availableServiceTypes[0].value
					}
				}
			},

			// 加载售后原因列表
			async loadAfterSaleReasons() {
				try {
					const response = await fetchAfterSaleReasons()

					if (response.code === 200 && response.data) {
						this.afterSaleReasons = response.data.map(item => ({
							label: item.reasonName || item.label,
							value: item.reasonCode || item.value || item.id
						}))
					} else {
						// 如果接口失败，使用默认原因
						this.afterSaleReasons = [{
								label: '商品质量问题',
								value: 'quality'
							},
							{
								label: '商品损坏',
								value: 'damaged'
							},
							{
								label: '商品与描述不符',
								value: 'mismatch'
							},
							{
								label: '收到错误商品',
								value: 'wrong_item'
							},
							{
								label: '其他原因',
								value: 'other'
							}
						]
						uni.showToast({
							title: response.msg || '加载售后原因失败，使用默认选项',
							icon: 'none'
						})
					}
				} catch (error) {
					console.error('Failed to load after sale reasons:', error)
					// 网络错误时使用默认原因
					this.afterSaleReasons = [{
							label: '商品质量问题',
							value: 'quality'
						},
						{
							label: '商品损坏',
							value: 'damaged'
						},
						{
							label: '商品与描述不符',
							value: 'mismatch'
						},
						{
							label: '收到错误商品',
							value: 'wrong_item'
						},
						{
							label: '其他原因',
							value: 'other'
						}
					]
					uni.showToast({
						title: '网络错误，使用默认选项',
						icon: 'none'
					})
				}
			},

			// 选择售后类型
			selectServiceType(type) {
				this.selectedServiceType = type
			},

			// 选择申请原因
			selectReason(reason) {
				this.selectedReason = reason
			},

			// 选择图片
			chooseImage() {
				// 检查是否已达到最大上传数量
				if (this.uploadedImages.length >= 1) {
					uni.showToast({
						title: '最多只能上传1张图片',
						icon: 'none'
					})
					return
				}

				uni.chooseImage({
					count: 1 - this.uploadedImages.length,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: async (res) => {
						// 再次检查，确保不会超过限制
						const remainingSlots = 1 - this.uploadedImages.length
						const newImages = res.tempFilePaths.slice(0, remainingSlots)

						if (newImages.length > 0) {
							// 立即上传图片
							await this.uploadImages(newImages)
						}

						// 如果用户选择了超过限制的图片数量，给出提示
						if (res.tempFilePaths.length > remainingSlots) {
							uni.showToast({
								title: '最多只能上传1张图片',
								icon: 'none'
							})
						}
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

			// 上传图片
			async uploadImages(imagePaths) {
				uni.showLoading({ title: '上传图片中...' })
				
				try {
					for (const imagePath of imagePaths) {
						const uploadedUrl = await this.uploadSingleImage(imagePath)
						if (uploadedUrl) {
							// 添加上传成功的图片URL到数组中
							this.uploadedImages.push(uploadedUrl)
						}
					}
				} catch (error) {
					console.error('图片上传失败:', error)
					uni.showToast({
						title: error.message || '图片上传失败',
						icon: 'none'
					})
				} finally {
					uni.hideLoading()
				}
			},

			// 上传单张图片
			async uploadSingleImage(imagePath) {
				try {
					const response = await UploadFile(imagePath)
					
					if (response.code === 200 && response.data) {
						// 根据接口返回的数据结构获取图片URL
						const imageUrl = response.data.url || response.data.path || response.data.fileUrl || response.data
						console.log('图片上传成功:', imageUrl)
						return imageUrl
					} else {
						throw new Error(response.msg || '图片上传失败')
					}
				} catch (error) {
					console.error('单张图片上传失败:', error)
					throw error
				}
			},


			// 删除图片
			deleteImage(index) {
				this.uploadedImages.splice(index, 1)
			},

			// 预览图片
			previewImage(currentIndex) {
				uni.previewImage({
					current: currentIndex,
					urls: this.uploadedImages,
					loop: true,
					indicator: 'number'
				})
			},


			// 提交售后申请
			async submitAfterSale() {
				// 验证表单 - 根据API参数要求
				if (!this.orderInfo.orderId) {
					uni.showToast({
						title: '订单号不能为空',
						icon: 'none'
					})
					return
				}

				if (!this.orderInfo.orderItemId) {
					uni.showToast({
						title: '子订单编号不能为空',
						icon: 'none'
					})
					return
				}

				if (!this.selectedServiceType) {
					uni.showToast({
						title: '请选择售后类型',
						icon: 'none'
					})
					return
				}

				if (!this.selectedReason) {
					uni.showToast({
						title: '申请原因不能为空',
						icon: 'none'
					})
					return
				}

				// 验证申请说明长度（不超过100个字符）
				if (this.problemDesc && this.problemDesc.length > 100) {
					uni.showToast({
						title: '申请说明不能超过100个字符',
						icon: 'none'
					})
					return
				}

				uni.showLoading({
					title: '提交中...'
				})
				console.log('原始订单数据:', this.originalOrderData);
				
				// 检查是否有原始订单数据
				if (!this.originalOrderData) {
					uni.hideLoading()
					uni.showToast({
						title: '订单信息未加载完成，请稍后重试',
						icon: 'none'
					})
					return
				}

				// 获取第一个订单项的orderItemId
				let orderItemId = ''
				if (this.originalOrderData.orderItems && this.originalOrderData.orderItems.length > 0) {
					orderItemId = this.originalOrderData.orderItems[0].orderItemId
				}

				if (!orderItemId) {
					uni.hideLoading()
					uni.showToast({
						title: '无法获取子订单编号',
						icon: 'none'
					})
					return
				}

				try {
					// 准备提交数据 - 严格按照API参数要求
					const submitData = {
						orderId: this.originalOrderData.orderId, // 订单号（必需）
						orderItemId: orderItemId, // 子订单编号（必需，从原始数据获取）
						serviceType: this.selectedServiceType, // 售后类型 1.仅退款 2.退货退款（必需）
						reason: this.selectedReason, // 申请原因（必需，字典类型查询）
						problemDesc: this.problemDesc.trim() || '', // 申请说明（可选，不超过100字符）
						afterSaleImage: this.uploadedImages.length > 0 ? this.uploadedImages[0] :
							'' // 图片凭证（可选，最多一张，使用上传后的URL）
					}
					
					console.log('提交的售后数据:', submitData);

					// 验证提交数据的合规性
					if (!submitData.orderId || !submitData.orderItemId || !submitData.serviceType || !submitData
						.reason) {
						uni.hideLoading()
						uni.showToast({
							title: '提交数据不完整，请检查必填项',
							icon: 'none'
						})
						return
					}

					const response = await submitAfterSale(submitData)

					uni.hideLoading()

					if (response.code === 200) {
						uni.showToast({
							title: '申请提交成功',
							icon: 'success'
						})

						// 返回上一页
						setTimeout(() => {
							this.goBack()
						}, 1500)
					} else {
						uni.showToast({
							title: response.msg || '提交失败，请重试',
							icon: 'none'
						})
					}

				} catch (error) {
					uni.hideLoading()
					console.error('Failed to submit after sale:', error)

					// 根据错误类型给出不同提示
					let errorMessage = '提交失败，请重试'
					if (error.message) {
						errorMessage = error.message
					} else if (error.msg) {
						errorMessage = error.msg
					} else if (typeof error === 'string') {
						errorMessage = error
					}

					uni.showToast({
						title: errorMessage,
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.after-sale-container {
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
			width: 60rpx;
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

	/* 售后表单 */
	.after-sale-form {
		background: #fff;
	}

	.form-section {
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

				&.word-count,
				&.upload-tip {
					font-size: 24rpx;
					color: #999;
					font-weight: normal;
				}

				&.word-count.word-limit {
					color: #e54d42;
					font-weight: bold;
				}
			}
		}
	}

	/* 售后类型选择 */
	.service-type-list {
		display: flex;
		gap: 20rpx;

		.type-item {
			flex: 1;
			height: 80rpx;
			border: 2rpx solid #ddd;
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: all 0.3s ease;

			text {
				font-size: 28rpx;
				color: #666;
			}

			&.active {
				border-color: #89D600;
				background: rgba(137, 214, 0, 0.1);

				text {
					color: #89D600;
					font-weight: bold;
				}
			}
		}
	}

	/* 申请原因选择 */
	.reason-list {
		.reason-item {
			padding: 24rpx;
			border: 2rpx solid #f0f0f0;
			border-radius: 8rpx;
			margin-bottom: 16rpx;
			transition: all 0.3s ease;

			&:last-child {
				margin-bottom: 0;
			}

			text {
				font-size: 28rpx;
				color: #333;
			}

			&.active {
				border-color: #89D600;
				background: rgba(137, 214, 0, 0.1);

				text {
					color: #89D600;
					font-weight: bold;
				}
			}
		}
	}

	/* 申请说明 */
	.text-area {
		.problem-textarea {
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

	/* 图片上传 */
	.upload-list {
		display: flex;
		gap: 16rpx;

		.upload-item {
			position: relative;
			width: 160rpx;
			height: 160rpx;

			.upload-img {
				width: 100%;
				height: 100%;
				border-radius: 8rpx;
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