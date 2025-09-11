<template>
	<u-popup :show="showPopup" mode="bottom" :round="20" height="70%" @close="cancel">
		<view class="popup">
			<view class="picker-btn">
				<view class="left" @click="cancel">取消</view>
				<view class="right" @click="confirm">确定</view>
			</view>
			
			<!-- 加载状态 -->
			<view class="loading-state" v-if="loading">
				<u-loading-icon mode="spinner" color="#89D600" size="20"></u-loading-icon>
				<text>加载地区数据中...</text>
			</view>
			
			<!-- 地区选择器 -->
			<picker-view v-else :indicator-style="indicatorStyle" :value="valueArr" @change="bindChange">
				<!-- 第一级：省 -->
				<picker-view-column>
					<view class="item" v-for="(province, index) in regionData" :key="index">{{ province.name }}</view>
				</picker-view-column>
				<!-- 第二级：市 -->
				<picker-view-column v-if="regionData[valueArr[0]] && regionData[valueArr[0]].children">
					<view class="item" v-for="(city, index) in regionData[valueArr[0]].children" :key="index">
						{{ city.name }}
					</view>
				</picker-view-column>
				<!-- 第三级：区 -->
				<picker-view-column
					v-if="regionData[valueArr[0]] && regionData[valueArr[0]].children && regionData[valueArr[0]].children[valueArr[1]] && regionData[valueArr[0]].children[valueArr[1]].children">
					<view class="item" v-for="(area, index) in regionData[valueArr[0]].children[valueArr[1]].children"
						:key="index">{{ area.name }}</view>
				</picker-view-column>
			</picker-view>
		</view>
	</u-popup>
</template>

<script>
	import { fetchAdressTree } from '@/api/adress/index.js'

	// 全局地区数据缓存
	let regionDataCache = null
	let isLoadingRegionData = false
	const loadingPromises = []

	export default {
		name: 'CityTree',
		data() {
			return {
				showPopup: false,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth / (750 / 100))}px;`,
				valueArr: [0, 0, 0],
				address: {
					city: '',
					cityId: '',
					district: '',
					province: '',
					consigneeAddressIdPath: ''
				},
				loading: false,
				regionData: []
			}
		},
		mounted() {
			// 组件挂载时预加载地区数据
			this.preloadRegionData()
		},
		methods: {
			// 预加载地区数据（静默加载，不显示loading）
			async preloadRegionData() {
				// 如果已有缓存，直接使用
				if (regionDataCache) {
					this.regionData = regionDataCache
					return
				}

				// 如果正在加载，等待加载完成
				if (isLoadingRegionData) {
					return new Promise((resolve) => {
						loadingPromises.push(resolve)
					}).then(() => {
						this.regionData = regionDataCache || []
					})
				}

				// 开始加载数据
				isLoadingRegionData = true
				try {
					// TODO fetchAdressTree 会在这里使用
					const res = await fetchAdressTree()
					if (res.code == 200 && res.data) {
						regionDataCache = res.data
						this.regionData = regionDataCache
						console.log('地区数据预加载成功')
					} else {
						console.error('预加载地区数据失败:', res.msg)
					}
				} catch (error) {
					console.error('预加载地区数据失败:', error)
				} finally {
					isLoadingRegionData = false
					// 通知所有等待的Promise
					loadingPromises.forEach(resolve => resolve())
					loadingPromises.length = 0
				}
			},

			// 获取地区数据（带loading显示）
			async loadRegionData() {
				// 如果已有缓存，直接使用
				if (regionDataCache) {
					this.regionData = regionDataCache
					return
				}

				this.loading = true
				try {
					// TODO fetchAdressTree 会在这里使用
					const res = await fetchAdressTree()
					if (res.code == 200 && res.data) {
						regionDataCache = res.data
						this.regionData = regionDataCache
					} else {
						uni.showToast({
							title: res.msg || '获取地区数据失败',
							icon: 'error'
						})
					}
				} catch (error) {
					console.error('获取地区数据失败:', error)
					uni.showToast({
						title: '网络错误，请重试',
						icon: 'error'
					})
				} finally {
					this.loading = false
				}
			},
			
			bindChange(event) {
				this.valueArr = event.detail.value;
			},

			cancel() {
				this.showPopup = false
			},

			confirm() {
				if (this.regionData.length === 0) {
					uni.showToast({
						title: '地区数据未加载完成',
						icon: 'error'
					})
					return
				}
				
				let province = this.regionData[this.valueArr[0]]
				let city = province.children[this.valueArr[1]]
				let district = city.children[this.valueArr[2]]
				
				this.address.city = city.name
				this.address.cityId = city.cityCode
				this.address.province = province.name
				this.address.district = district.name
				this.address.consigneeAddressIdPath = `${province.id},${city.id},${district.id}`
				
				this.$emit('confirm', this.address)
				this.showPopup = false
			},

			getData() {
				return this.address
			},

			open() {
				this.showPopup = true
				// 如果没有缓存数据，显示loading加载
				if (!regionDataCache) {
					this.loadRegionData()
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.popup {
		height: fit-content;
		width: 100%;
		background: #fff;
	}

	.picker-btn {
		display: flex;
		height: 100upx;
		width: 100%;
		line-height: 100upx;
		background: #fff;
		font-size: 34upx;
		z-index: 1;
		border-bottom: 1rpx solid #eee;

		.left {
			flex: 1;
			text-align: center;
			color: #666;
		}

		.right {
			flex: 1;
			text-align: center;
			color: #89D600;
			font-weight: bold;
		}
	}

	.loading-state {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12rpx;
		padding: 60rpx;
		color: #666;
		font-size: 26rpx;
	}
	
	picker-view {
		width: 100%;
		height: 500rpx;
	}
	
	.item {
		line-height: 100rpx;
		text-align: center;
		font-size: 32rpx;
		color: #333;
	}
</style> 