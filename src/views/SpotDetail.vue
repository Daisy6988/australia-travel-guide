<template>
  <div class="spot-detail-container" v-if="spotData">

    <div class="detail-hero" :style="{ backgroundImage: `url(${spotData.heroImage})` }">
      <div class="hero-overlay">
        <span class="tag">AUSTRALIA MUST GO</span>
        <h1>{{ spotData.title }}</h1>
        <p class="subtitle">{{ spotData.subtitle }}</p>
      </div>
    </div>

    <div class="detail-layout">
      <div class="info-sidebar">
        <div class="notice-box">
          <h3>📢 旅客重要公告 (Notice)</h3>
          <ul>
            <li><strong>開放時間：</strong> {{ spotData.info.hours }}</li>
            <li><strong>諮詢電話：</strong> {{ spotData.info.phone }}</li>
            <li class="danger-text">⚠️ <strong>注意事項：</strong> {{ spotData.info.warn }}</li>
          </ul>
        </div>

        <button class="back-home-btn" @click="goBack">🔙 返回上一頁</button>
      </div>

      <div class="interactive-content">
        <div class="vr-banner">
          <div class="vr-text">
            <h4>無法親臨現場？</h4>
            <p>即刻開啟 360° 全景線上虛擬極致導覽體驗！</p>
          </div>
          <button class="vr-action-btn" @click="openVR">
            🌌 啟動 VR 體驗
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['spotId'])
const router = useRouter()
const spotData = ref(null)

onMounted(() => {
  // 🌟 完美補齊 2 個州、共 8 個精選景點與美食的完整資料庫，杜絕幻覺錯位 🌟
  const mockDatabase = {
    // === 1. 昆士蘭州景點 ===
    'great-barrier-reef': {
      title: '凱恩斯大堡礁潛水之旅',
      subtitle: '自然與海洋生態共存的澳洲頂級夢幻地標',
      image: '/images/reef.png',
      hours: '每日 08:30 ~ 17:00 (天候不佳除外)',
      phone: '+61 7 4051 6777 (凱恩斯遊客服務中心)',
      warn: '全面禁止攜帶任何非環保防曬乳、禁止捕捉/碰觸任何珊瑚與海洋生物。'
    },
    'gold-coast-beach': {
      title: '黃金海岸狂歡熱浪',
      subtitle: '衝浪者天堂！綿延 57 公里的金色絕美沙灘',
      image: '/images/gold-coast.png',
      hours: '海灘全天開放 (救生員巡邏時間為 08:00 ~ 17:00)',
      phone: '+61 7 5581 6022 (黃金海岸旅遊局)',
      warn:  '請務必在紅色與黃色救生旗幟之間的「安全區域」內戲水衝浪'
    },
    'aus-food': {
      title: '道地澳洲和牛與海鮮饗宴',
      subtitle: '極致舌尖饗宴！頂級 M9+ 和牛與冷水域頂級生蠔',
      image: '/images/food.png',
      hours: '午餐 11:30 ~ 14:30 / 晚餐 17:30 ~ 22:00',
      phone: '+61 7 3221 7788 (頂級景觀餐廳訂位專線)',
      warn: '部分熱門時段與景觀座位極度容易客滿，請務必提前於網路上預約。'
    },
    'aboriginal-culture': {
      title: '庫蘭達庫帕卡原住民文化',
      subtitle: '探索六萬五千年歷史！萬年熱帶雨林深處的遠古迴響',
      image: '/images/culture.png',
      hours: '每日 09:00 ~ 16:00 (元旦與聖誕節休園)',
      phone: '+61 7 4093 9311 (庫蘭達文化園區總台)',
      warn: '尊重部落傳統文化，觀看部分神聖儀式表演時請遵從工作人員的攝影規範。'
    },

    // === 2. 新南威爾斯州景點 ===
    'sydney-opera': {
      title: '雪梨歌劇院內部導覽',
      subtitle: '人類建築史上的世紀傑作，世界遺產音樂殿堂',
      image: '/images/opera.png',
      hours: '每日 09:00 ~ 17:00 (演出時間依各劇院公告為準)',
      phone: '+61 2 9250 7111 (雪梨歌劇院票務中心)',
      warn: '進入主音樂廳導覽時請保持安靜，且內部彩排期間嚴禁進行任何拍照與錄影。'
    },
    'blue-mountain': {
      title: '藍山國家公園三姐妹岩',
      subtitle: '沉浸在滿山尤加利樹的藍色朦朧薄霧與壯麗峽谷',
      image: '/images/blue-mountain.png',
      hours: '回音谷展望台全天開放 / 景觀纜車 09:00 ~ 16:30',
      phone: '+61 2 4780 5000 (藍山遊客資訊中心)',
      warn: '山區午後氣溫驟降且容易起霧，請隨身攜帶保暖防風外套並依循正規步道行走。'
    },
    'darling-harbour-food': {
      title: '達令港星級景觀餐廳',
      subtitle: '海港夜景第一排！現撈塔斯馬尼亞巨蟹與星級葡萄酒',
      image: '/images/darling-food.png',
      hours: '每日 11:00 ~ 23:00 (酒吧與夜間餐廳營業至深夜)',
      phone: '+61 2 9211 2233 (達令港美食大街服務台)',
      warn: '週末晚餐時段人潮眾多，戶外景觀煙火席位有最低消費限制，建議提早預訂。'
    },
    'bondi-beach': {
      title: '邦代海灘冰山泳池體驗',
      subtitle: '網紅朝聖地！太平洋巨浪打進泳池的極致視覺震撼',
      image: '/images/bondi.png',
      hours: '冰山俱樂部泳池 06:00 ~ 18:30 (每週四清池維修除外)',
      phone: '+61 2 9130 3120 (Bondi Icebergs Club)',
      warn: '泳池畔地滑且海浪有時會直接拍打上岸，請聽從現場救生員指揮。'
    }
  }

  // 取得目前點擊的 spotId 的對應資料
  const currentSpot = mockDatabase[props.spotId]

  if (currentSpot) {
    spotData.value = {
      title: currentSpot.title,
      subtitle: currentSpot.subtitle,
      heroImage: currentSpot.image,
      info: {
        hours: currentSpot.hours,
        phone: currentSpot.phone,
        warn: currentSpot.warn
      },
      vrUrl: 'https://www.australia.com'
    }
  } else {
    // 降級防呆預設值
    spotData.value = {
      title: '澳洲精選地標',
      subtitle: '自然與現代都市共存的夢幻國度',
      heroImage: '/images/hero-bg.png',
      info: {
        hours: '依現場各景點公告為準',
        phone: '+61 2 9360 1111 (澳洲旅遊局總部)',
        warn: '請注意自身安全，並隨身攜帶防曬用品與飲用水。'
      },
      vrUrl: 'https://www.australia.com'
    }
  }
})

// 返回上一頁
const goBack = () => {
  router.back()
}

const openVR = () => {
  window.open(spotData.value.vrUrl, '_blank')
}
</script>

<style scoped>
.spot-detail-container {
  font-family: sans-serif;
}

.detail-hero {
  height: 450px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  color: white;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7));
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 40px;
}

.tag {
  background: #ffbe00;
  color: #333;
  padding: 4px 12px;
  font-weight: bold;
  font-size: 12px;
  border-radius: 4px;
  width: max-content;
  margin-bottom: 10px;
}

.detail-hero h1 {
  font-size: 42px;
  margin: 0 0 10px 0;
}

.detail-layout {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.notice-box {
  background: #fff9e6;
  border: 2px solid #ffe0b3;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.notice-box h3 {
  color: #b36b00;
  margin-top: 0;
  border-bottom: 2px solid #ffe0b3;
  padding-bottom: 10px;
}

.notice-box ul {
  list-style: none;
  padding: 0;
}

.notice-box li {
  margin-bottom: 15px;
  line-height: 1.6;
  color: #555;
}

.danger-text {
  color: #cc0000 !important;
}

.back-home-btn {
  margin-top: 20px;
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

.back-home-btn:hover {
  background: #f5f5f5;
}

.vr-banner {
  background: linear-gradient(135deg, #005c73, #009999);
  color: white;
  padding: 40px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  box-sizing: border-box;
}

.vr-text h4 {
  font-size: 24px;
  margin: 0 0 10px 0;
}

.vr-action-btn {
  background: #ffbe00;
  color: #222;
  border: none;
  padding: 15px 35px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: 0.2s;
  margin-top: 20px;
}

.vr-action-btn:hover {
  background: #ffe066;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .detail-layout {
    grid-template-columns: 1fr;
  }

  .detail-hero {
    height: 280px;
  }
}
</style>