<template>
  <div class="city-list-container">
    <div class="hero-header" style="background-image: url('/images/hero-bg.png'); background-size: cover; background-position: center;">
      <h1>歡迎來到美麗的澳洲</h1>
      <p>探索大自然與現代城市的完美結合</p>
    </div>

    <div class="main-content">
      <h2>請選擇您想探索的地區</h2>
      <div class="city-grid">
        <div 
          v-for="city in cities" 
          :key="city.id" 
          class="city-card"
          @click="goToCity(city.id)"
        >
          <div class="card-img" :style="{ backgroundImage: `url(${city.image})` }"></div>
          <div class="card-info">
            <h3>{{ city.name }}</h3>
            <p>{{ city.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ⚡ 修正圖片配對，確保與 CitySpots 的主題完美對應
const cities = ref([
  {
    id: 'queensland',
    name: '昆士蘭州 (Queensland)',
    desc: '陽光之州！擁有著名的大堡礁、浪漫黃金海岸與萬年原住民熱帶雨林文化。',
    image: '/images/reef.png' // 👈 修正為大堡礁海龜圖（或黃金海岸圖，只要 public 裡面有這個檔案即可）
  },
  {
    id: 'sydney-region',
    name: '新南威爾斯州 (NSW)',
    desc: '探索繁華的雪梨歌劇院、歷史悠久的岩石區古街與壯麗的藍山國家公園。',
    image: '/images/hero-bg.png' // 👈 修正為新南威爾斯州的代表圖（可改為您的雪梨大圖路徑）
  }
])

// 點擊卡片時，將正確的 cityId 作為路由參數傳遞到下一頁
const goToCity = (cityId) => {
  router.push({ 
    name: 'city-spots', // 💡 請確保 router/index.js 裡的 name 也是寫 'city-spots'
    params: { cityId } 
  })
}
</script>

<style scoped>
.city-list-container { 
  font-family: sans-serif; 
}

/* 頂部大圖防爆、防拉伸樣式 */
.hero-header { 
  height: 350px; 
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat;
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  color: white; 
  text-shadow: 2px 2px 10px rgba(0,0,0,0.8); 
}

.hero-header h1 {
  font-size: 38px;
  margin: 0 0 10px 0;
}

.hero-header p {
  font-size: 18px;
  margin: 0;
  opacity: 0.9;
}

/* 內容排版 */
.main-content { 
  padding: 40px 20px; 
  max-width: 1200px; 
  margin: 0 auto; 
}

h2 { 
  color: #004d61; 
  margin-bottom: 25px;
}

/* 城市列表網格 */
.city-grid { 
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); 
  gap: 35px; 
}

/* 卡片與懸浮特效 */
.city-card { 
  border-radius: 12px; 
  overflow: hidden; 
  box-shadow: 0 4px 15px rgba(0,0,0,0.08); 
  cursor: pointer; 
  transition: transform 0.3s, box-shadow 0.3s; 
  background: #fff; 
}

.city-card:hover { 
  transform: translateY(-5px); 
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.card-img { 
  height: 220px; 
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat;
}

.card-info { 
  padding: 20px; 
}

.card-info h3 {
  margin: 0 0 10px 0;
  color: #007a99;
}

.card-info p {
  margin: 0;
  color: #666;
  line-height: 1.5;
  font-size: 14px;
}

@media (max-width: 768px) {
  .hero-header {
    height: 220px;
  }
  .hero-header h1 {
    font-size: 26px;
  }
  .hero-header p {
    font-size: 14px;
  }
}
</style>