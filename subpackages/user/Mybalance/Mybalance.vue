<template>
	<view class="balance-page">
		<!-- 页面主体内容 -->
		<scroll-view scroll-y class="balance-body">
			<!-- 余额卡片 -->
			<view class="balance-card">
				<view class="balance-info">
					<view class="balance-title">账户余额</view>
					<view class="balance-amount">
						<text class="currency">¥</text>
						<text class="amount">{{ balanceData.amount }}</text>
					</view>
					<view class="balance-desc">余额可用于购买商品抵扣现金</view>
				</view>
				<view class="balance-actions">
					<view class="action-btn recharge-btn" @click="handleRecharge">
						<u-icon name="plus" color="#fff" size="16"></u-icon>
						<text>充值</text>
					</view>
					<view class="action-btn withdraw-btn" @click="handleWithdraw">
						<u-icon name="arrow-up" color="#666" size="16"></u-icon>
						<text>提现</text>
					</view>
				</view>
			</view>

			<!-- 明细记录 -->
			<view class="records-section">
				<view class="section-header">
					<view class="section-title">明细记录</view>
					<view class="filter-tabs">
						<view class="tab-item" 
							:class="{ active: activeTab === item.key }" 
							v-for="item in tabList" 
							:key="item.key"
							@click="switchTab(item.key)">
							{{ item.name }}
						</view>
					</view>
				</view>

				<view class="records-list">
					<view class="record-item" v-for="(record, index) in filteredRecords" :key="index">
						<view class="record-info">
							<view class="record-title">{{ record.title }}</view>
							<view class="record-time">{{ record.time }}</view>
						</view>
						<view class="record-amount" :class="{ 'income': record.type === 'income', 'expense': record.type === 'expense' }">
							{{ record.type === 'income' ? '+' : '-' }}{{ record.amount }}
						</view>
					</view>

					<!-- 空状态 -->
					<view class="empty-state" v-if="filteredRecords.length === 0">
						<view class="empty-icon">📋</view>
						<view class="empty-text">暂无相关记录</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 活跃标签
				activeTab: 'all',

				// 标签列表
				tabList: [
					{ key: 'all', name: '全部' },
					{ key: 'income', name: '收入' },
					{ key: 'expense', name: '支出' }
				],

				// 余额数据
				balanceData: {
					amount: '1,280.50'
				},

				// Mock 明细记录数据
				records: [
					{
						title: '购买商品',
						time: '2024-01-15 14:30:25',
						amount: '158.80',
						type: 'expense'
					},
					{
						title: '充值',
						time: '2024-01-14 09:15:10',
						amount: '500.00',
						type: 'income'
					},
					{
						title: '退款',
						time: '2024-01-13 16:45:33',
						amount: '89.90',
						type: 'income'
					},
					{
						title: '购买商品',
						time: '2024-01-12 11:20:15',
						amount: '245.60',
						type: 'expense'
					},
					{
						title: '签到奖励',
						time: '2024-01-11 08:00:00',
						amount: '5.00',
						type: 'income'
					},
					{
						title: '购买商品',
						time: '2024-01-10 19:30:20',
						amount: '99.99',
						type: 'expense'
					},
					{
						title: '充值',
						time: '2024-01-09 12:15:45',
						amount: '200.00',
						type: 'income'
					},
					{
						title: '购买商品',
						time: '2024-01-08 15:22:10',
						amount: '76.50',
						type: 'expense'
					}
				]
			}
		},

		computed: {
			// 过滤后的记录
			filteredRecords() {
				if (this.activeTab === 'all') {
					return this.records
				}
				return this.records.filter(record => record.type === this.activeTab)
			}
		},

		methods: {

			// 切换标签
			switchTab(tabKey) {
				this.activeTab = tabKey
			},

			// 充值
			handleRecharge() {
				uni.showModal({
					title: '充值',
					content: '请选择充值金额',
					confirmText: '去充值',
					success: (res) => {
						if (res.confirm) {
							uni.showToast({
								title: '充值功能开发中',
								icon: 'none'
							})
						}
					}
				})
			},

			// 提现
			handleWithdraw() {
				uni.showModal({
					title: '提现',
					content: '确认要提现到银行卡吗？',
					confirmText: '确认提现',
					success: (res) => {
						if (res.confirm) {
							uni.showToast({
								title: '提现功能开发中',
								icon: 'none'
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.balance-page {
		height: 100vh;
		background: #f5f5f5;
		display: flex;
		flex-direction: column;
	}

	/* 页面主体 */
	.balance-body {
		flex: 1;
		height: 0;
		padding-bottom: 40rpx;
	}

	/* 余额卡片 */
	.balance-card {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		margin: 30rpx;
		border-radius: 20rpx;
		padding: 40rpx 30rpx;
		color: #fff;
	}

	.balance-info {
		text-align: center;
		margin-bottom: 40rpx;

		.balance-title {
			font-size: 28rpx;
			opacity: 0.9;
			margin-bottom: 20rpx;
		}

		.balance-amount {
			display: flex;
			align-items: baseline;
			justify-content: center;
			margin-bottom: 16rpx;

			.currency {
				font-size: 32rpx;
				margin-right: 8rpx;
			}

			.amount {
				font-size: 60rpx;
				font-weight: 700;
			}
		}

		.balance-desc {
			font-size: 24rpx;
			opacity: 0.8;
		}
	}

	.balance-actions {
		display: flex;
		gap: 20rpx;

		.action-btn {
			flex: 1;
			height: 72rpx;
			border-radius: 36rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 8rpx;
			font-size: 28rpx;
			font-weight: 600;

			&.recharge-btn {
				background: rgba(255, 255, 255, 0.2);
				border: 2rpx solid rgba(255, 255, 255, 0.3);
				color: #fff;
			}

			&.withdraw-btn {
				background: #fff;
				color: #666;
			}
		}
	}

	/* 明细记录 */
	.records-section {
		background: #fff;
		margin: 0 30rpx;
		border-radius: 20rpx;
		padding: 30rpx;
	}

	.section-header {
		margin-bottom: 30rpx;

		.section-title {
			font-size: 32rpx;
			font-weight: 600;
			color: #333;
			margin-bottom: 24rpx;
		}

		.filter-tabs {
			display: flex;
			background: #f5f5f5;
			border-radius: 12rpx;
			padding: 6rpx;

			.tab-item {
				flex: 1;
				text-align: center;
				padding: 16rpx;
				font-size: 26rpx;
				color: #666;
				border-radius: 8rpx;
				transition: all 0.3s ease;

				&.active {
					background: #fff;
					color: #333;
					font-weight: 600;
					box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
				}
			}
		}
	}

	.records-list {
		.record-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 24rpx 0;
			border-bottom: 1rpx solid #f0f0f0;

			&:last-child {
				border-bottom: none;
			}

			.record-info {
				flex: 1;

				.record-title {
					font-size: 28rpx;
					color: #333;
					margin-bottom: 8rpx;
				}

				.record-time {
					font-size: 24rpx;
					color: #999;
				}
			}

			.record-amount {
				font-size: 32rpx;
				font-weight: 600;

				&.income {
					color: #52c41a;
				}

				&.expense {
					color: #ff4d4f;
				}
			}
		}
	}

	/* 空状态 */
	.empty-state {
		text-align: center;
		padding: 80rpx 0;

		.empty-icon {
			font-size: 80rpx;
			margin-bottom: 20rpx;
		}

		.empty-text {
			font-size: 28rpx;
			color: #999;
		}
	}
</style>
