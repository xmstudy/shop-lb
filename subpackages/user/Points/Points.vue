<template>
	<view class="points-page">
		<!-- 页面主体内容 -->
		<scroll-view scroll-y class="points-body">
			<!-- 积分卡片 -->
			<view class="points-card">
				<view class="points-info">
					<view class="points-title">可用积分</view>
					<view class="points-amount">
						<text class="amount">{{ pointsData.total }}</text>
						<text class="unit">分</text>
					</view>
					<view class="points-desc">积分可用于兑换商品或抵扣现金</view>
				</view>
				<view class="points-stats">
					<view class="stat-item">
						<view class="stat-value">{{ pointsData.thisMonth }}</view>
						<view class="stat-label">本月获得</view>
					</view>
					<view class="stat-item">
						<view class="stat-value">{{ pointsData.expiredSoon }}</view>
						<view class="stat-label">即将过期</view>
					</view>
				</view>
			</view>

			<!-- 快捷功能 -->
			<view class="quick-actions">
				<view class="action-item" @click="goToPointsMall">
					<view class="action-icon">
						<u-icon name="gift" color="#FF6B35" size="24"></u-icon>
					</view>
					<view class="action-text">积分商城</view>
				</view>
				<view class="action-item" @click="goToSignIn">
					<view class="action-icon">
						<u-icon name="calendar" color="#34C759" size="24"></u-icon>
					</view>
					<view class="action-text">每日签到</view>
				</view>
				<view class="action-item" @click="goToTasks">
					<view class="action-icon">
						<u-icon name="list" color="#007AFF" size="24"></u-icon>
					</view>
					<view class="action-text">任务中心</view>
				</view>
				<view class="action-item" @click="showRules">
					<view class="action-icon">
						<u-icon name="info-circle" color="#8E8E93" size="24"></u-icon>
					</view>
					<view class="action-text">积分规则</view>
				</view>
			</view>

			<!-- 积分记录 -->
			<view class="records-section">
				<view class="section-header">
					<view class="section-title">积分记录</view>
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
						<view class="record-points" :class="{ 'earn': record.type === 'earn', 'spend': record.type === 'spend' }">
							{{ record.type === 'earn' ? '+' : '-' }}{{ record.points }}
						</view>
					</view>

					<!-- 空状态 -->
					<view class="empty-state" v-if="filteredRecords.length === 0">
						<view class="empty-icon">🏆</view>
						<view class="empty-text">暂无积分记录</view>
						<view class="empty-desc">快去完成任务获取积分吧</view>
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
					{ key: 'earn', name: '获得' },
					{ key: 'spend', name: '消费' }
				],

				// 积分数据
				pointsData: {
					total: '5,680',
					thisMonth: '280',
					expiredSoon: '150'
				},

				// Mock 积分记录数据
				records: [
					{
						title: '每日签到',
						time: '2024-01-15 08:30:00',
						points: '10',
						type: 'earn'
					},
					{
						title: '兑换优惠券',
						time: '2024-01-14 16:20:15',
						points: '100',
						type: 'spend'
					},
					{
						title: '购买商品获得',
						time: '2024-01-14 14:30:25',
						points: '32',
						type: 'earn'
					},
					{
						title: '完成评价',
						time: '2024-01-13 19:45:33',
						points: '20',
						type: 'earn'
					},
					{
						title: '兑换商品',
						time: '2024-01-12 11:20:15',
						points: '500',
						type: 'spend'
					},
					{
						title: '邀请好友',
						time: '2024-01-11 15:30:20',
						points: '50',
						type: 'earn'
					},
					{
						title: '每日签到',
						time: '2024-01-11 08:00:00',
						points: '10',
						type: 'earn'
					},
					{
						title: '购买商品获得',
						time: '2024-01-10 12:15:45',
						points: '28',
						type: 'earn'
					},
					{
						title: '分享商品',
						time: '2024-01-09 16:22:10',
						points: '5',
						type: 'earn'
					},
					{
						title: '完成新手任务',
						time: '2024-01-08 10:30:00',
						points: '100',
						type: 'earn'
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

			// 积分商城
			goToPointsMall() {
				uni.showToast({
					title: '积分商城开发中',
					icon: 'none'
				})
			},

			// 每日签到
			goToSignIn() {
				uni.showModal({
					title: '每日签到',
					content: '连续签到可获得更多积分奖励',
					confirmText: '立即签到',
					success: (res) => {
						if (res.confirm) {
							uni.showToast({
								title: '签到成功，获得10积分',
								icon: 'success'
							})
						}
					}
				})
			},

			// 任务中心
			goToTasks() {
				uni.showToast({
					title: '任务中心开发中',
					icon: 'none'
				})
			},

			// 积分规则
			showRules() {
				uni.showModal({
					title: '积分规则',
					content: '1. 每日签到可获得10积分\n2. 购买商品可获得订单金额2%的积分\n3. 完成评价可获得20积分\n4. 邀请好友可获得50积分\n5. 积分有效期为1年',
					confirmText: '知道了'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.points-page {
		height: 100vh;
		background: #f5f5f5;
		display: flex;
		flex-direction: column;
	}

	/* 页面主体 */
	.points-body {
		flex: 1;
		height: 0;
		padding-bottom: 40rpx;
	}

	/* 积分卡片 */
	.points-card {
		background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
		margin: 30rpx;
		border-radius: 20rpx;
		padding: 40rpx 30rpx;
		color: #fff;
	}

	.points-info {
		text-align: center;
		margin-bottom: 40rpx;

		.points-title {
			font-size: 28rpx;
			opacity: 0.9;
			margin-bottom: 20rpx;
		}

		.points-amount {
			display: flex;
			align-items: baseline;
			justify-content: center;
			margin-bottom: 16rpx;

			.amount {
				font-size: 60rpx;
				font-weight: 700;
				margin-right: 8rpx;
			}

			.unit {
				font-size: 28rpx;
				opacity: 0.9;
			}
		}

		.points-desc {
			font-size: 24rpx;
			opacity: 0.8;
		}
	}

	.points-stats {
		display: flex;
		justify-content: space-around;

		.stat-item {
			text-align: center;

			.stat-value {
				font-size: 32rpx;
				font-weight: 700;
				margin-bottom: 8rpx;
			}

			.stat-label {
				font-size: 24rpx;
				opacity: 0.8;
			}
		}
	}

	/* 快捷功能 */
	.quick-actions {
		background: #fff;
		margin: 0 30rpx 20rpx;
		border-radius: 20rpx;
		padding: 30rpx;
		display: flex;
		justify-content: space-between;

		.action-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 12rpx;

			.action-icon {
				width: 60rpx;
				height: 60rpx;
				background: #f8f9fa;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.action-text {
				font-size: 24rpx;
				color: #666;
			}
		}
	}

	/* 积分记录 */
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

			.record-points {
				font-size: 32rpx;
				font-weight: 600;

				&.earn {
					color: #52c41a;
				}

				&.spend {
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
			color: #333;
			margin-bottom: 8rpx;
		}

		.empty-desc {
			font-size: 24rpx;
			color: #999;
		}
	}
</style>
