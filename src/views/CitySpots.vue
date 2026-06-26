<template>
  <div class="city-spots-container" v-if="currentCityData">
    <button class="back-btn" @click="$router.push('/')">← 返回城市列表</button>

    <h2>{{ currentCityData.cityName }}精選觀光巴士路線指引</h2>
    <p class="subtitle">跟著藍色路線，輕鬆玩轉 {{ currentCityData.cityName }} 的核心精選站點</p>

    <!-- 觀光巴士路線圖 -->
    <div class="bus-route-map">
      <template v-for="(station, index) in currentCityData.busRoutes" :key="station.id">
        <div
          class="route-node"
          :class="{ active: activeStation?.id === station.id }"
          @click="selectStation(station)"
        >
          <div class="node-badge">{{ station.id }}</div>
          <div class="node-name">{{ station.name }}</div>
        </div>
        <div v-if="index < currentCityData.busRoutes.length - 1" class="line-connector"></div>
      </template>
    </div>

    <!-- 站點展開圖卡 -->
    <transition name="slide-down">
      <div class="station-detail-card" v-if="activeStation">

        <!-- ↓↓↓ 這裡是你要改的區塊 ↓↓↓ -->
        <div class="station-visual">
           <span class="station-icon">{{ activeStation.icon }}</span>
        </div>
        <!-- ↑↑↑ 改到這裡結束 ↑↑↑ -->

        <div class="station-body">
          <p class="station-meta">{{ activeStation.id }} · {{ currentCityData.cityName }}觀光路線</p>
          <h3 class="station-name">{{ activeStation.name }}</h3>
          <div class="tag-row">
            <span
              v-for="(tag, i) in activeStation.tags"
              :key="tag"
              class="tag"
              :class="i % 2 === 0 ? 'tag-teal' : 'tag-blue'"
            >{{ tag }}</span>
          </div>
          <p class="station-desc">{{ activeStation.desc }}</p>
          <button class="explore-btn" @click="goToStationDetail(activeStation)">
            深入探索 →
          </button>
        </div>
        <button class="close-btn" @click="activeStation = null" aria-label="關閉">✕</button>
      </div>
    </transition>

    <hr class="divider" />

    <h2>{{ currentCityData.cityName }} 周邊必去私房推薦</h2>
    <div class="spots-grid">
      <div
        v-for="spot in currentCityData.nearbySpots"
        :key="spot.id"
        class="spot-card"
        @click="goToDetail(spot.id, spot.category)"
      >
        <div class="spot-img-wrapper">
          <img :src="spot.image" :alt="spot.title" />
        </div>
        <div class="spot-title">
          <span class="category-tag">{{ spot.categoryName }}</span>
          <br />🦘 {{ spot.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps(['cityId'])

const currentCityData = ref(null)
const activeStation = ref(null)

// ── 核心資料庫 ────────────────────────────────────────────────
const citiesDatabase = {
  'queensland': {
    cityName: '昆士蘭州 (Queensland)',
    busRoutes: [
      {
        id: 'Q-1',
        name: '大堡礁碼頭總站',
        icon: '🐠',
        tags: ['世界遺產', '浮潛聖地', '珊瑚生態'],
        desc: '凱恩斯出發的大堡礁之旅起點，可搭乘快艇前往外礁浮潛或深潛，觀賞色彩繽紛的珊瑚礁生態系。附近有玻璃底船觀光行程，適合不想下水的旅客。'
      },
      {
        id: 'Q-2',
        name: '熱帶雨林空中纜車站',
        icon: '🌿',
        tags: ['空中纜車', '熱帶雨林', '庫蘭達村'],
        desc: '全長 7.5 公里的空中纜車穿越世界最古老熱帶雨林，俯瞰瀑布與樹冠層。終點庫蘭達村有原住民文化表演與手工市集，可搭景觀火車下山，一路兩種風景。'
      },
      {
        id: 'Q-3',
        name: '衝浪者天堂海灘線',
        icon: '🏄',
        tags: ['黃金海岸', '衝浪勝地', '海濱夜生活'],
        desc: '黃金海岸的心臟地帶，白沙灘綿延數公里，常年有專業衝浪救生員駐守。日落後海灘旁酒吧與餐廳熱鬧非凡，是感受澳洲海岸生活方式的最佳地點。'
      },
      {
        id: 'Q-4',
        name: '可倫賓野生動物園',
        icon: '🦘',
        tags: ['無尾熊抱抱', '袋鼠餵食', '親子首選'],
        desc: '擁有 90 年歷史的昆士蘭代表性野生動物園，可近距離與無尾熊合影、手餵袋鼠，也有鱷魚表演和鸚鵡飛行秀。園區緊鄰黃金海岸，交通便利。'
      }
    ],
    nearbySpots: [
      { id: 'great-barrier-reef', title: '凱恩斯大堡礁潛水之旅', image: '/images/reef.png', category: 'nature', categoryName: '自然景觀' },
      { id: 'gold-coast-beach', title: '黃金海岸狂歡熱浪', image: '/images/gold-coast.png', category: 'beach', categoryName: '海灘衝浪' },
      { id: 'aus-food', title: '道地澳洲和牛與海鮮饗宴', image: '/images/food.png', category: 'food', categoryName: '在地美食' },
      { id: 'aboriginal-culture', title: '庫蘭達庫帕卡原住民文化', image: '/images/culture.png', category: 'culture', categoryName: '人文體驗' }
    ]
  },

  'sydney-region': {
    cityName: '新南威爾斯州 (NSW)',
    busRoutes: [
      {
        id: 'S-1',
        name: '雪梨歌劇院 (環形碼頭 Circular Quay)',
        icon: '🎭',
        image: 'https://www.sydney.com/sites/sydney/files/styles/gallery_no_thumb_large/public/2021-11/150849.webp?h=4570e141&itok=vUNn8Im6',
        tags: ['世界遺產', '地標建築', '港灣夜景'],
        desc: '聯合國教科文組織世界遺產，丹麥建築師烏戎的代表作。內部設有導覽行程，演出廳常駐交響樂、歌劇、芭蕾等頂尖表演，環形碼頭周邊有渡輪連接各景點。'
      },
      {
        id: 'S-2',
        name: '岩石區歷史街區(The Rocks)',
        icon: '🪨',
        image: 'https://www.therocks.com/getmedia/69752d0b-b720-4ca0-adad-bd1a0e5ce31a/The-Rocks-Markets-Playfair-St_1.jpg?width=1920',
        tags: ['殖民歷史', '週末市集', '精釀啤酒'],
        desc: '澳洲最古老的歐洲聚落，保留 1800 年代石造建築群，每逢週末舉辦岩石區市集，可挖掘手工藝品與道地街頭美食。附近多家精釀酒吧，夜晚氛圍獨特迷人。'
      },
      {
        id: 'S-3',
        name: '達令港休閒中心(Darling Harbour)',
        icon: '🌊',
        image:'https://www.darlingharbour.com/getmedia/8b7be6b6-b8f6-4af8-9e39-361c8d161f55/Darling-Harbour-New-Precinct-Photography-2023-IMAX-Sydney-W-Hotel-17.jpg?width=1024',
        tags: ['海港景觀', '親子樂園', '星級餐廳'],
        desc: '緊鄰市中心的多功能海港區，設有雪梨水族館、野生動物園、海事博物館，以及大量海景餐廳與酒吧。夜晚點燈後景色絕美，是結合親子活動與美食的最佳選擇。'
      },
      {
        id: 'S-4',
        name: '海德公園 / 雪梨塔(Hyde Park/Sydney Tower Eye)',
        icon: '🗼',
        image:'https://www.cityofsydney.nsw.gov.au/-/jssmedia/corporate/images/places-and-spaces/parks/hyde-park/anzacmemorial2n5a2407.jpg?mw=1600',
        tags: ['城市綠肺', '360° 全景', '觀景餐廳'],
        desc: '海德公園是澳洲最古老的公共公園，榕樹林蔭大道令人心曠神怡。步行可達雪梨塔，登上 250 公尺高觀景台俯瞰全城與港灣，塔內亦有景觀 Buffet 餐廳。'
      },
      {
        id: 'S-5',
        name: '邦代海灘衝浪線(Bondi Beach)',
        icon: '🏊',
        image:'https://assets.atdw-online.com.au/images/b52fd22efb00fc6eaf087d9f5c0443e6.jpeg?rect=0%2C0%2C2066%2C1550&w=1600&h=1200&&rot=360&q=eyJ0eXBlIjoibGlzdGluZyIsImxpc3RpbmdJZCI6IjU2YjIzZWFiMjY2MTQwNTk0NTY4MWViNyIsImRpc3RyaWJ1dG9ySWQiOiI1NmIxZWI5MzQ0ZmVjYTNkZjJlMzIwYzgiLCJhcGlrZXlJZCI6IjU2YjFlZTU5MGNmMjEzYWQyMGRjNTgxOSJ9?w=1172&h=762&fm=jpg',
        tags: ['網紅海灘', '海岸步道', '冰山泳池'],
        desc: '全球最知名的都市海灘之一，常駐衝浪救生員並有新手衝浪課程。沿岸 Bondi to Coogee 海岸步道風景絕美，終點為懸崖邊天然岩石泳池 Icebergs，IG 必拍打卡點。'
      }
    ],
    nearbySpots: [
      { id: 'sydney-opera', title: '雪梨歌劇院內部導覽', image: '/images/opera.jpg', category: 'culture', categoryName: '世界遺產' },
      { id: 'blue-mountain', title: '藍山國家公園三姐妹岩', image: '/images/blue-mountain.jpg', category: 'nature', categoryName: '高山巨谷' },
      { id: 'darling-harbour-food', title: '達令港星級景觀餐廳', image: '/images/darling-food.jpg', category: 'food', categoryName: '海港美食' },
      { id: 'bondi-beach', title: '邦代海灘冰山泳池體驗', image: '/images/bondi.jpg', category: 'beach', categoryName: '網紅海灘' }
    ]
  }
}

// ── 切換城市時更新資料並重置選中站點 ─────────────────────────
const updateCityContent = (newCityId) => {
  const targetId = newCityId || 'queensland'
  currentCityData.value = citiesDatabase[targetId]
  activeStation.value = null
}

watch(
  () => props.cityId,
  (newId) => updateCityContent(newId),
  { immediate: true }
)

// ── 站點點擊：同一站再點一次則收合 ───────────────────────────
const selectStation = (station) => {
  activeStation.value = activeStation.value?.id === station.id ? null : station
}

// ── 深入探索：跳往站點詳細頁（依需求自行調整路由）───────────
const goToStationDetail = (station) => {
  router.push({
    name: 'station-detail',
    params: { stationId: station.id },
    query: { city: props.cityId }
  })
}

// ── 周邊景點卡片跳轉 ──────────────────────────────────────────
const goToDetail = (spotId, category) => {
  router.push({
    name: 'spot-intro',
    params: { spotId },
    query: {
      from: category,
      city: props.cityId
    }
  })
}
</script>

<style scoped>
.city-spots-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: sans-serif;
}

/* ── 返回按鈕 ── */
.back-btn {
  background: #007a99;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 20px;
  font-weight: bold;
}

.back-btn:hover {
  background: #005c73;
}

.subtitle {
  color: #666;
  margin-bottom: 30px;
}

/* ── 觀光巴士路線 ── */
.bus-route-map {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #e0f4f7;
  padding: 30px;
  border-radius: 50px;
  margin-bottom: 16px;
  border: 2px dashed #00a3cc;
  overflow-x: auto;
}

.route-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-width: 130px;
  cursor: pointer;
  z-index: 1;
}

.node-badge {
  width: 45px;
  height: 45px;
  background: #00a3cc;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border: 3px solid white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.18s, transform 0.18s;
}

.route-node:hover .node-badge,
.route-node.active .node-badge {
  background: #005c73;
  transform: scale(1.12);
}

.node-name {
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.route-node.active .node-name {
  color: #005c73;
}

.line-connector {
  position: absolute;
  right: -45%;
  top: 22px;
  width: 70%;
  height: 4px;
  background: #00a3cc;
  z-index: -1;
}

/* ── 站點展開圖卡 ── */
.station-detail-card {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  background: #fff;
  border: 1px solid #d0eef5;
  border-radius: 16px;
  padding: 20px 24px;
  margin-bottom: 20px;
  position: relative;
  box-shadow: 0 4px 16px rgba(0, 163, 204, 0.08);
}

.station-visual {
  width: 90px;
  height: 90px;
  flex-shrink: 0;
  background: #e0f4f7;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.station-icon {
  font-size: 48px;
  line-height: 1;
}

.station-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.station-meta {
  font-size: 12px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.station-name {
  font-size: 18px;
  font-weight: bold;
  color: #222;
  margin: 0;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 20px;
  font-weight: bold;
}

.tag-teal {
  background: #e0f4f7;
  color: #007a99;
}

.tag-blue {
  background: #dce9f7;
  color: #1a5fa8;
}

.station-desc {
  font-size: 14px;
  color: #555;
  line-height: 1.7;
  margin: 0;
}

.explore-btn {
  align-self: flex-start;
  margin-top: 4px;
  padding: 7px 18px;
  border-radius: 20px;
  border: 1.5px solid #00a3cc;
  background: transparent;
  color: #007a99;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.15s;
}

.explore-btn:hover {
  background: #e0f4f7;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 14px;
  background: none;
  border: none;
  color: #aaa;
  font-size: 16px;
  cursor: pointer;
  line-height: 1;
}

.close-btn:hover {
  color: #555;
}

/* ── transition 動畫 ── */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.22s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ── 分隔線 ── */
.divider {
  border: 0;
  height: 1px;
  background: #ddd;
  margin: 40px 0;
}

/* ── 周邊景點卡片 ── */
.spots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

.spot-card {
  border-radius: 8px;
  overflow: hidden;
  background: #f9f9f9;
  cursor: pointer;
  transition: 0.3s;
  border-bottom: 4px solid #00a3cc;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.spot-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.spot-img-wrapper {
  height: 180px;
  overflow: hidden;
}

.spot-img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.spot-title {
  padding: 15px;
  font-weight: bold;
  text-align: center;
  color: #444;
  line-height: 1.4;
}

.category-tag {
  background: #e0f4f7;
  color: #007a99;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 6px;
}

.station-visual {
  width: 120px;
  height: 100px;
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
  background: #e0f4f7;
  display: flex;
  align-items: center;
  justify-content: center;
}

.station-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ── RWD ── */
@media (max-width: 768px) {
  .bus-route-map {
    flex-direction: column;
    gap: 20px;
    border-radius: 20px;
  }

  .line-connector {
    display: none;
  }

  .station-detail-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .tag-row {
    justify-content: center;
  }

  .explore-btn {
    align-self: center;
  }
}
</style>