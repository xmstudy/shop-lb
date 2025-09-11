<template>
  <view class="notice-carousel" :style="{height}">
    <swiper 
      class="swiper" 
      :autoplay="true" 
      :interval="interval" 
      :circular="true"
      :vertical="false"
      :indicator-dots="false"
    >
      <swiper-item v-for="(item, index) in list" :key="index" @click="onItemClick(item)">
        <view class="notice-item">
          <u-icon name="volume" color="#e54d42" size="20"></u-icon>
          <text class="notice-text">{{ item.text }}</text>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  name: 'SimpleNoticeCarousel',
  props: {
    list: { type: Array, required: true },
    height: { type: String, default: '60rpx' },
    interval: { type: Number, default: 3000 }
  },
  methods: {
    onItemClick(item) {
      if (item.url) {
        uni.navigateTo({ url: item.url });
      }
    }
  }
}
</script>

<style scoped>
.notice-carousel {
  width: 100%;
  overflow: hidden;
}

.swiper {
  width: 100%;
  height: 100%;
}

.notice-item {
  display: flex;
  align-items: center;
  padding: 0 24rpx;
  font-size: 28rpx;
  color: #e54d42;
  width: 100%;
  height: 60rpx;
}

.notice-text {
  margin-left: 12rpx;
  font-size: 28rpx;
  color: #e54d42;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>