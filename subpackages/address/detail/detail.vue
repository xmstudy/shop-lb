<template>
	<view class="address-container">
		<!-- 地址表单 -->
		<view class="address-form" v-if="!loading">
			<view class="form-item">
				<text class="item-label">收货人</text>
				<input 
					class="item-input" 
					v-model="addressForm.name" 
					placeholder="请输入收货人姓名"
					maxlength="20"
				/>
			</view>

			<view class="form-item">
				<text class="item-label">手机号码</text>
				<input 
					class="item-input" 
					v-model="addressForm.phone" 
					placeholder="请输入手机号码"
					type="number"
					maxlength="11"
				/>
			</view>

			<view class="form-item" @click="$refs.cityTree.open()">
				<text class="item-label">所在地区</text>
				<view class="region-selector">
					<text class="region-text" :class="{ placeholder: !addressForm.province }">
						{{ addressForm.province && addressForm.city && addressForm.district 
							? addressForm.province + addressForm.city + addressForm.district 
							: '请选择所在地区' }}
					</text>
					<u-icon name="arrow-right" color="#999" size="16"></u-icon>
				</view>
			</view>

			<view class="form-item">
				<text class="item-label">详细地址</text>
				<textarea 
					class="item-textarea" 
					v-model="addressForm.detail" 
					placeholder="请输入详细地址，如街道、门牌号等"
					:maxlength="100"
					:auto-height="true"
					:show-confirm-bar="false"
				/>
			</view>

			<view class="form-item">
				<text class="item-label">默认地址</text>
				<u-switch v-model="addressForm.isDefault" active-color="#89D600"></u-switch>
			</view>
		</view>

		<!-- 加载状态 -->
		<view class="loading-state" v-if="loading">
			<u-loading-icon mode="spinner" size="40" color="#89D600"></u-loading-icon>
			<text class="loading-text">加载中...</text>
		</view>

		<!-- 地区选择组件 -->
		<CityTree ref="cityTree" @confirm="onRegionConfirm"></CityTree>

		<!-- 底部保存按钮 -->
		<view class="bottom-save-btn" v-if="!loading">
			<view class="save-btn" @click="saveAddress">
				<text class="save-btn-text">{{ isEdit ? '保存修改' : '保存地址' }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import CityTree from '@/components/CityTree.vue'
	import { fetchAddressDetail, fetchAddressAdd, fetchAddressEdit } from '@/api/adress/index.js'

	export default {
		name: 'AddressDetail',
		components: { CityTree },
		data() {
			return {
				addressId: '',
				isEdit: false,
				loading: false,
				addressForm: {
					name: '',
					phone: '',
					province: '',
					city: '',
					district: '',
					detail: '',
					isDefault: false,
					consigneeAddressIdPath: ''
				}
			}
		},
		onLoad(options) {
			this.addressId = options.id || ''
			this.isEdit = !!this.addressId
			this.loadAddressDetail()
		},
		onReady() {
			// 页面渲染完成后预加载地区数据
			this.preloadRegionData()
		},
		methods: {
			// 预加载地区数据
			preloadRegionData() {
				// 通过refs调用CityTree组件的预加载方法
				if (this.$refs.cityTree) {
					this.$refs.cityTree.preloadRegionData()
				} else {
					// 如果组件还没有挂载，延迟调用
					this.$nextTick(() => {
						if (this.$refs.cityTree) {
							this.$refs.cityTree.preloadRegionData()
						}
					})
				}
			},

			// 加载地址详情
			async loadAddressDetail() {
				if (!this.isEdit) return
				
				this.loading = true
				try {
					// TODO fetchAddressDetail 会在这里使用
					const res = await fetchAddressDetail(this.addressId)
					
					if (res.code == 200 && res.data) {
						const addressData = res.data
						const addressPath = addressData.consigneeAddressPath || ''
						const addressParts = addressPath.split(',')
						
						this.addressForm = {
							id: addressData.id,
							name: addressData.name,
							phone: addressData.mobile,
							province: addressParts[0] || '',
							city: addressParts[1] || '',
							district: addressParts[2] || '',
							detail: addressData.detail,
							isDefault: addressData.isDefault === 1,
							consigneeAddressIdPath: addressData.consigneeAddressIdPath,
							lat: addressData.lat,
							lon: addressData.lon
						}
					} else {
						uni.showToast({
							title: res.msg || '获取地址详情失败',
							icon: 'error'
						})
					}
				} catch (error) {
					console.error('获取地址详情失败:', error)
					uni.showToast({
						title: '网络错误，请重试',
						icon: 'error'
					})
				} finally {
					this.loading = false
				}
			},

			// 地区选择确认 - 简化处理
			onRegionConfirm(region) {
				Object.assign(this.addressForm, {
					province: region.province,
					city: region.city,
					district: region.district,
					consigneeAddressIdPath: region.consigneeAddressIdPath
				})
			},

			// 保存地址
			async saveAddress() {
				if (!this.validateForm()) return

				uni.showLoading({ title: '保存中...' })

				try {
					const requestData = {
						name: this.addressForm.name,
						mobile: this.addressForm.phone,
						consigneeAddressPath: `${this.addressForm.province},${this.addressForm.city},${this.addressForm.district}`,
						detail: this.addressForm.detail,
						isDefault: this.addressForm.isDefault ? 1 : 0,
						lat: this.addressForm.lat || null,
						lon: this.addressForm.lon || null
					}
					
					if (this.addressForm.consigneeAddressIdPath) {
						requestData.consigneeAddressIdPath = this.addressForm.consigneeAddressIdPath
					}

					let res
					if (this.isEdit) {
						requestData.id = this.addressForm.id
						// TODO fetchAddressEdit 会在这里使用
						res = await fetchAddressEdit(requestData)
					} else {
						// TODO fetchAddressAdd 会在这里使用
						res = await fetchAddressAdd(requestData)
					}

					uni.hideLoading()

					if (res.code == 200) {
						uni.showToast({
							title: this.isEdit ? '修改成功' : '添加成功',
							icon: 'success'
						})
						setTimeout(() => uni.navigateBack(), 1500)
					} else {
						uni.showToast({
							title: res.msg || '保存失败',
							icon: 'error'
						})
					}
				} catch (error) {
					uni.hideLoading()
					console.error('保存地址失败:', error)
					uni.showToast({
						title: '网络错误，请重试',
						icon: 'error'
					})
				}
			},

			// 表单验证
			validateForm() {
				const validations = [
					{ condition: !this.addressForm.name.trim(), message: '请输入收货人姓名' },
					{ condition: !this.addressForm.phone.trim(), message: '请输入手机号码' },
					{ condition: !/^1[3-9]\d{9}$/.test(this.addressForm.phone), message: '请输入正确的手机号码' },
					{ condition: !this.addressForm.province || !this.addressForm.city || !this.addressForm.district, message: '请选择所在地区' },
					{ condition: !this.addressForm.detail.trim(), message: '请输入详细地址' }
				]

				for (const validation of validations) {
					if (validation.condition) {
						uni.showToast({
							title: validation.message,
							icon: 'none'
						})
						return false
					}
				}
				return true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.address-container {
		min-height: 100vh;
		background: #f8f9fa;
		padding-bottom: 120rpx;
	}

	/* 地址表单 */
	.address-form {
		background: #fff;
		margin: 20rpx;
		border-radius: 16rpx;
		overflow: hidden;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);

		.form-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 32rpx;
			border-bottom: 1rpx solid #f0f0f0;

			&:last-child {
				border-bottom: none;
			}

			.item-label {
				font-size: 32rpx;
				color: #333;
				font-weight: 500;
				min-width: 160rpx;
			}

			.item-input {
				flex: 1;
				font-size: 32rpx;
				color: #333;
				text-align: right;
				padding: 0;
				border: none;
				background: transparent;

				&::placeholder {
					color: #999;
				}
			}

			.item-textarea {
				flex: 1;
				font-size: 32rpx;
				color: #333;
				text-align: right;
				padding: 0;
				border: none;
				background: transparent;
				min-height: 80rpx;
				max-height: 120rpx; /* 限制最大高度为两行 */
				resize: none;
				line-height: 1.5;

				&::placeholder {
					color: #999;
				}
			}

			.region-selector {
				display: flex;
				align-items: center;
				gap: 12rpx;
				flex: 1;
				justify-content: flex-end;

				.region-text {
					font-size: 32rpx;
					color: #333;

					&.placeholder {
						color: #999;
					}
				}
			}
		}
	}

	/* 加载状态 */
	.loading-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 120rpx 40rpx;
		text-align: center;

		.loading-text {
			font-size: 28rpx;
			color: #999;
			margin-top: 24rpx;
		}
	}

	/* 底部保存按钮 */
	.bottom-save-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #ffffff;
		padding: 20rpx 30rpx;
		padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
		border-top: 1rpx solid #f0f0f0;
		box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.05);

		.save-btn {
			width: 100%;
			height: 88rpx;
			background: linear-gradient(135deg, #89D600, #9EE600);
			border-radius: 44rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: all 0.3s ease;

			&:active {
				transform: scale(0.98);
			}

			.save-btn-text {
				font-size: 32rpx;
				color: #ffffff;
				font-weight: 600;
			}
		}
	}
</style>