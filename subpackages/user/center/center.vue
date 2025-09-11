<template>
	<BaseContainer>
		<view class="user-center-container">
			<!-- 用户信息表单 -->
			<view class="user-form">
				<!-- 头像上传 -->
				<view class="form-item avatar-item" @click="chooseAvatar">
					<view class="item-label">
						<text>头像</text>
					</view>
					<view class="item-content">
						<view class="avatar-wrapper">
							<image 
								:src="userInfo.avatar || '/static/images/default-avatar.png'" 
								class="avatar-image"
								mode="aspectFill"
							></image>
							<view class="avatar-edit">
								<u-icon name="camera" color="#fff" size="16"></u-icon>
							</view>
						</view>
						<u-icon name="arrow-right" color="#999" size="16"></u-icon>
					</view>
				</view>

				<!-- 昵称编辑 -->
				<view class="form-item">
					<view class="item-label">
						<text>昵称</text>
					</view>
					<view class="item-content">
						<input 
							v-model="userInfo.nickname" 
							class="nickname-input"
							placeholder="请输入昵称"
							maxlength="20"
							@blur="validateNickname"
						/>
						<u-icon name="arrow-right" color="#999" size="16"></u-icon>
					</view>
				</view>




			</view>

			<!-- 保存按钮 -->
			<view class="save-section">
				<view class="save-btn" @click="saveUserInfo">
					<text>保存</text>
				</view>
			</view>




		</view>
	</BaseContainer>
</template>

<script>
import BaseContainer from '@/components/BaseWrapper.vue'
import { getUserInfo, saveLoginInfo } from '@/utils/auth.js'
import { UpdateUserInfo, fetchUserInfo } from '@/api/user/index.js'

export default {
	name: 'UserCenter',
	components: {
		BaseContainer
	},
	data() {
		return {
			userInfo: {
				avatar: '',
				nickname: ''
			},
			originalUserInfo: null
		}
	},

	onShow() {
		// 每次页面显示时重新加载用户信息
		this.loadUserInfo()
	},
	mounted() {
		this.loadUserInfo()
	},
	methods: {
		// 返回上一页
		goBack() {
			// 获取当前页面栈
			const pages = getCurrentPages()
			
			// 如果页面栈长度大于1，说明有上一页，可以返回
			if (pages.length > 1) {
				uni.navigateBack({
					delta: 1
				})
			} else {
				// 如果没有上一页，跳转到首页
				uni.reLaunch({
					url: '/pages/index/index'
				})
			}
		},

		// 加载用户信息
		loadUserInfo() {
			try {
				// 使用认证工具函数获取用户信息
				const storedUserInfo = getUserInfo()
				if (storedUserInfo && Object.keys(storedUserInfo).length > 0) {
					// 合并用户信息，保留默认值
					this.userInfo = {
						...this.userInfo,
						// 如果没有头像，使用默认头像
						avatar: storedUserInfo.avatarUrl || storedUserInfo.avatar || this.userInfo.avatar || 'https://img.yzcdn.cn/vant/cat.jpeg',
						// 如果没有昵称，使用默认昵称
						nickname: storedUserInfo.nickname || this.userInfo.nickname || '用户' + (storedUserInfo.memberId || '')
					}
					this.originalUserInfo = { ...this.userInfo }
					console.log('用户信息已加载:', this.userInfo)
				} else {
					// 如果没有存储的用户信息，使用默认值
					const defaultUserInfo = {
						avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
						nickname: '用户昵称'
					}
					this.userInfo = { ...this.userInfo, ...defaultUserInfo }
					this.originalUserInfo = { ...this.userInfo }
				}
			} catch (error) {
				console.error('加载用户信息失败:', error)
				// 使用默认值
				const defaultUserInfo = {
					avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
					nickname: '用户昵称'
				}
				this.userInfo = { ...this.userInfo, ...defaultUserInfo }
				this.originalUserInfo = { ...this.userInfo }
			}
		},

		// 选择头像
		chooseAvatar() {
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					this.compressAndUploadImage(res.tempFilePaths[0])
				}
			})
		},

		// 压缩并上传图片
		compressAndUploadImage(filePath) {
			uni.showLoading({ title: '处理中...' })
			
			// 压缩图片
			uni.compressImage({
				src: filePath,
				quality: 80,
				success: (res) => {
					// TODO 头像上传接口会在这里使用
					// 模拟上传
					setTimeout(() => {
						this.userInfo.avatar = res.tempFilePath
						uni.hideLoading()
						uni.showToast({ title: '头像更新成功', icon: 'success' })
					}, 1000)
				},
				fail: () => {
					uni.hideLoading()
					uni.showToast({ title: '图片处理失败', icon: 'error' })
				}
			})
		},

		// 验证昵称
		validateNickname() {
			const nickname = this.userInfo.nickname.trim()
			if (nickname.length < 2) {
				uni.showToast({ title: '昵称至少2个字符', icon: 'none' })
				return false
			}
			if (nickname.length > 20) {
				uni.showToast({ title: '昵称最多20个字符', icon: 'none' })
				return false
			}
			return true
		},

		// 重新获取最新的用户信息
		async refreshUserInfo() {
			try {
				// TODO fetchUserInfo 会在这里使用
				const response = await fetchUserInfo()
				
				if (response.code === 200 && response.data) {
					const latestUserInfo = response.data
					
					// 更新页面显示的用户信息
					this.userInfo = {
						avatar: latestUserInfo.avatarUrl || latestUserInfo.avatar || this.userInfo.avatar,
						nickname: latestUserInfo.nickname || this.userInfo.nickname
					}
					
					// 保存到本地存储
					const updatedUserInfo = {
						...getUserInfo(),
						...latestUserInfo,
						avatar: latestUserInfo.avatarUrl || latestUserInfo.avatar,
						avatarUrl: latestUserInfo.avatarUrl || latestUserInfo.avatar
					}
					
					saveLoginInfo(updatedUserInfo)
					console.log('用户信息已刷新并保存:', updatedUserInfo)
				} else {
					console.error('获取最新用户信息失败:', response.message)
				}
			} catch (error) {
				console.error('重新获取用户信息失败:', error)
			}
		},

		// 保存用户信息
		async saveUserInfo() {
			// 校验头像
			if (!this.userInfo.avatar) {
				uni.showToast({ title: '请上传头像', icon: 'none' })
				return
			}

			// 校验昵称
			if (!this.userInfo.nickname.trim()) {
				uni.showToast({ title: '请输入昵称', icon: 'none' })
				return
			}

			if (!this.validateNickname()) {
				return
			}

			// 检查是否有修改
			const hasChanges = JSON.stringify({
				avatar: this.userInfo.avatar,
				nickname: this.userInfo.nickname
			}) !== JSON.stringify({
				avatar: this.originalUserInfo.avatar,
				nickname: this.originalUserInfo.nickname
			})
			
			if (!hasChanges) {
				uni.showToast({ title: '没有修改内容', icon: 'none' })
				return
			}

			uni.showLoading({ title: '保存中...' })
			
			try {
				// 调用用户信息修改接口
				// TODO UpdateUserInfo 会在这里使用
				const response = await UpdateUserInfo({
					avatarUrl: this.userInfo.avatar,
					nickname: this.userInfo.nickname
				})
				
				if (response.code === 200) {
					// 重新获取最新的用户信息
					await this.refreshUserInfo()
					
					this.originalUserInfo = { ...this.userInfo }
					uni.hideLoading()
					uni.showToast({ title: '保存成功', icon: 'success' })
					
					// 延迟返回上一页
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
				} else {
					uni.hideLoading()
					uni.showToast({ title: response.message || '保存失败', icon: 'none' })
				}
				
			} catch (error) {
				uni.hideLoading()
				console.error('保存用户信息失败:', error)
				uni.showToast({ title: '保存失败，请重试', icon: 'none' })
			}
		}
	}
}
</script>

<style lang="scss" scoped>
page {
	overflow: hidden;
	height: 100vh;
}

:deep(.base-wrapper) {
	overflow: hidden !important;
	height: 100vh !important;
	min-height: 100vh !important;
	position: relative !important;
}

.user-center-container {
	overflow: hidden;
	height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: #f5f5f5;
}



/* 用户表单 */
.user-form {
	margin-top: 0;
	background: #fff;

	.form-item {
		display: flex;
		align-items: center;
		padding: 32rpx 24rpx;
		border-bottom: 1rpx solid #f0f0f0;

		&:last-child {
			border-bottom: none;
		}

		.item-label {
			width: 160rpx;
			font-size: 28rpx;
			color: #333;
		}

		.item-content {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}

	.avatar-item {
		.avatar-wrapper {
			position: relative;
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			overflow: hidden;

			.avatar-image {
				width: 100%;
				height: 100%;
			}

			.avatar-edit {
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				height: 40rpx;
				background: rgba(0, 0, 0, 0.6);
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}

	.nickname-input {
		flex: 1;
		font-size: 28rpx;
		color: #333;
		text-align: left;
		margin-right: 16rpx;
	}

	.phone-text {
		font-size: 28rpx;
		color: #333;

		&.unbind {
			color: #999;
		}
	}

	.phone-action {
		display: flex;
		align-items: center;
		gap: 8rpx;

		.action-text {
			font-size: 26rpx;
			color: #89D600;
		}
	}

	.gender-text {
		font-size: 28rpx;
		color: #333;
	}
}

/* 手机号弹窗 */
.phone-modal {
	background: #fff;
	border-radius: 20rpx 20rpx 0 0;
	padding: 32rpx;

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 32rpx;

		.modal-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
		}

		.close-btn {
			width: 60rpx;
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.modal-content {
		.input-group {
			display: flex;
			align-items: center;
			gap: 16rpx;
			margin-bottom: 24rpx;

			.phone-input,
			.code-input {
				flex: 1;
				height: 80rpx;
				padding: 0 24rpx;
				border: 2rpx solid #f0f0f0;
				border-radius: 12rpx;
				font-size: 28rpx;
			}

			.send-code-btn {
				width: 200rpx;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #89D600;
				border-radius: 12rpx;

				text {
					font-size: 26rpx;
					color: #fff;
				}

				&.disabled {
					background: #ccc;
				}
			}
		}

		.error-tip {
			margin-top: 16rpx;

			text {
				font-size: 24rpx;
				color: #e54d42;
			}
		}
	}

	.modal-footer {
		margin-top: 32rpx;

		.confirm-btn {
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #89D600;
			border-radius: 12rpx;

			text {
				font-size: 28rpx;
				color: #fff;
				font-weight: bold;
			}
		}
	}
}

/* 保存按钮区域 */
.save-section {
	padding: 28rpx;
	margin-top: 40rpx;

	.save-btn {
		width: 100%;
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #89D600;
		border-radius: 12rpx;

		text {
			font-size: 32rpx;
			color: #fff;
			font-weight: bold;
		}
	}
}
</style> 