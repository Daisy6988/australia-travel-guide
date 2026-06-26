import { createRouter, createWebHistory } from 'vue-router'
import CityList from '../views/CityList.vue'
import CitySpots from '../views/CitySpots.vue'
import SpotDetail from '../views/SpotDetail.vue'
// ⚡ 1. 務必引入你剛剛寫好的 SpotIntro 組件 ⚡
import SpotIntro from '../views/SpotIntro.vue' 

const routes = [
  {
    path: '/',
    name: 'city-list',
    component: CityList
  },
  {
    path: '/city/:cityId',
    name: 'city-spots',
    component: CitySpots,
    props: true // 讓 cityId 能用 props 傳進 CitySpots.vue
  },
  {
    path: '/spot/:spotId',
    name: 'spot-detail',
    component: SpotDetail,
    props: true // 讓 spotId 能用 props 傳進 SpotDetail.vue
  },
  // ⚡ 2. 核心補充：新增深度探索頁面的路由 ⚡
  {
    path: '/spot-intro/:spotId', // 👈 網址會長成 /spot-intro/sydney-opera 這樣
    name: 'spot-intro',          // 👈 這裡要叫 'spot-intro'
    component: SpotIntro,
    props: true                  // 👈 這一行超級重要！有它 props.spotId 才能接到網址參數
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router