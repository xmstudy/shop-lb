<template>
  <BaseContainer
    :Bglinear="{
      background:
        'linear-gradient(to bottom, #a6e22e 0%, #a6e22e 34%, #fff 62%,#fff 100%)',
    }"
  >
    <view class="rmview-container">
      <!-- 页面标题区域 -->
      <view class="page-header">
        <view class="header-title">
          <text class="title-text">乡镇大集</text>
        </view>
      </view>

      <!-- 县域信息展示区 -->
      <view class="county-info">
        <view class="info-header">
          <text class="info-title">雷波县情</text>
        </view>
        <view class="info-content">
          <text class="info-desc"
            >雷波县地处四川省凉山彝族自治州东北部，素有"金沙江明珠"之美誉。全县幅员面积2838平方公里，辖19个乡镇，总人口27.8万人，其中彝族人口占85.4%。雷波依山傍水，风光秀丽，是典型的山区农业县，也是乌蒙山片区区域发展与扶贫攻坚重点县之一。这里民族文化深厚，自然资源丰富，脐橙、茶叶、竹笋等特色农产品享誉巴蜀。</text
          >
          <view class="info-link" @click="goToCountyDetail">
            <text>点击跳转</text>
            <u-icon name="arrow-right" color="#999" size="16"></u-icon>
          </view>
        </view>
      </view>

      <!-- 乡镇卡片入口区域 -->
      <view class="towns-section">
        <view class="section-title">
          <text>乡镇导航</text>
        </view>
        <view class="towns-grid">
          <view
            class="town-card"
            v-for="(town, index) in towns"
            :key="index"
            @click="goToTownDetail(town)"
          >
            <view
              class="card-bg"
              :style="{ backgroundImage: `url(${town.image})` }"
            ></view>
            <view class="card-content">
              <text class="town-name">{{ town.name }}</text>
              <text class="town-desc">{{ town.description }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部Tabbar -->
    <Tabbar :current="3" @change="handleTabChange" />
  </BaseContainer>
</template>

<script>
import BaseContainer from "@/components/BaseWrapper.vue";
import Tabbar from "@/components/Tabbar.vue";

export default {
  name: "RmVIew",
  components: {
    BaseContainer,
    Tabbar,
  },
  data() {
    return {
      towns: [
        {
          name: "锦城镇",
          image: "/static/images/town1.jpg",
          id: "jincheng",
          description: "雷波县城所在地，全县政治、经济、文化中心",
          content:
            "锦城镇地处雷波县中部，是县人民政府驻地，全县政治、经济、文化中心。总面积128.6平方公里，辖8个社区15个行政村，总人口6.8万人。镇内基础设施完善，商贸活跃，教育医疗资源丰富，是雷波县现代化建设的窗口和对外开放的前沿。",
        },
        {
          name: "桂花乡",
          image: "/static/images/town2.jpg",
          id: "guihua",
          description: "山区特色农业乡，桂花飘香产业兴旺",
          content:
            '桂花乡位于雷波县东南部，幅员面积176.8平方公里，辖12个行政村，总人口1.2万人。境内气候温和，土壤肥沃，适宜发展特色农业。主要产业有脐橙种植、茶叶生产、竹笋加工等，其中"雷波脐橙"品牌享誉省内外，是农民增收致富的支柱产业。',
        },
        {
          name: "上田坝镇",
          image: "/static/images/town3.jpg",
          id: "shangtianba",
          description: "传统农业重镇，物产丰富民风淳朴",
          content:
            "上田坝镇位于雷波县西南部，距县城42公里，幅员面积156.3平方公里，辖14个行政村，总人口1.8万人。该镇地势平坦，耕地面积广阔，是雷波县重要的粮食生产基地。主要农产品有水稻、玉米、红薯等，畜牧业发达，民风淳朴，文化底蕴深厚。",
        },
        {
          name: "西宁镇",
          image: "/static/images/town4.jpg",
          id: "xining",
          description: "边贸重镇，商业发达交通便利",
          content:
            "西宁镇地处雷波县北部，是重要的边贸重镇，总面积98.5平方公里，辖10个行政村，人口1.5万人。地理位置优越，交通便利，商贸活跃，是连接内地与金沙江流域的重要节点。",
        },
        {
          name: "永盛镇",
          image: "/static/images/town5.jpg",
          id: "yongsheng",
          description: "生态宜居小镇，绿色发展示范区",
          content:
            "永盛镇位于雷波县南部山区，森林覆盖率达78%，生态环境优美，气候宜人。总面积132.7平方公里，辖11个行政村，人口1.3万人。是发展生态旅游和绿色产业的理想之地。",
        },
        {
          name: "金沙镇",
          image: "/static/images/town6.jpg",
          id: "jinsha",
          description: "金沙江畔明珠，水运发达渔业兴盛",
          content:
            "金沙镇位于金沙江畔，水运便利，渔业资源丰富。总面积89.6平方公里，辖9个行政村，人口1.1万人。依托金沙江水资源优势，发展水产养殖和水运物流业，是雷波县重要的水上门户。",
        },
      ],
    };
  },
  methods: {
    goToCountyDetail() {
      uni.navigateTo({
        url: "/subpackages/county/detail",
      });
    },
    goToTownDetail(town) {
      uni.navigateTo({
        // url: `/subpackages/town/detail?id=${town.id}&name=${town.name}`
        url: "/subpackages/help/richText/richText",
      });
    },
    handleTabChange(index) {
      this.$globalData.activeTabbarKey = index;
      uni.navigateTo({
        url: "/pages/index/index",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.rmview-container {
  min-height: 100vh;
  padding: 0 24rpx;
  padding-bottom: 120rpx;
  /* 为tabbar留出空间 */
}

/* 页面标题区域 */
.page-header {
  padding: 40rpx 0 32rpx;
  text-align: center;

  .header-title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16rpx;

    .title-text {
      font-size: 48rpx;
      font-weight: bold;
      color: #000;
      text-shadow: 0 2rpx 4rpx rgba(139, 69, 19, 0.2);
    }
  }
}

/* 搜索框模块 */
.search-section {
  margin-bottom: 32rpx;

  .search-input {
    display: flex;
    align-items: center;
    gap: 16rpx;
    background: rgba(255, 255, 255, 0.8);
    border: 2rpx solid #daa520;
    border-radius: 50rpx;
    padding: 24rpx 32rpx;
    backdrop-filter: blur(10rpx);

    .placeholder {
      font-size: 28rpx;
      color: #999;
      flex: 1;
    }
  }
}

/* 县域信息展示区 */
.county-info {
  border-radius: 20rpx;
  padding: 32rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 8rpx 24rpx rgba(139, 69, 19, 0.1);
  position: relative;
  overflow: hidden;

  // background: url('/static/images/map-bg.png') center/cover;

  .info-header {
    margin-bottom: 24rpx;

    .info-title {
      font-size: 36rpx;
      font-weight: bold;
      color: #8b4513;
    }
  }

  .info-content {
    .info-desc {
      font-size: 28rpx;
      color: #666;
      line-height: 1.6;
      margin-bottom: 24rpx;
      display: block;
    }

    .info-link {
      display: flex;
      align-items: center;
      gap: 8rpx;
      font-size: 26rpx;
      color: #999;
      align-self: flex-end;
    }
  }
}

/* 乡镇卡片入口区域 */
.towns-section {
  .section-title {
    margin-bottom: 24rpx;

    text {
      font-size: 32rpx;
      font-weight: bold;
      color: #8b4513;
    }
  }

  .towns-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24rpx;

    .town-card {
      position: relative;
      height: 200rpx;
      border-radius: 16rpx;
      overflow: hidden;
      box-shadow: 0 8rpx 24rpx rgba(139, 69, 19, 0.15);
      transition: transform 0.3s ease;

      &:active {
        transform: scale(0.98);
      }

      .card-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-size: cover;
        background-position: center;
        filter: brightness(0.7);

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(139, 69, 19, 0.3) 0%,
            rgba(218, 165, 32, 0.2) 100%
          );
        }
      }

      .card-content {
        position: relative;
        z-index: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 24rpx;
        text-align: center;

        .town-name {
          font-size: 32rpx;
          font-weight: bold;
          color: #fff;
          text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.5);
          margin-bottom: 8rpx;
        }

        .town-desc {
          font-size: 22rpx;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
}

/* 响应式适配 */
@media (max-width: 750rpx) {
  .towns-grid {
    grid-template-columns: 1fr;
  }
}
</style>
