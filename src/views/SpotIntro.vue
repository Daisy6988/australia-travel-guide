<template>
  <div class="spot-intro-container" v-if="currentContent">
    <div class="breadcrumb">
      <span class="back-link" @click="goBack">← 返回上一頁</span>
      <span class="separator">/</span>
      <span class="current-page">{{ currentContent.title }} 深度探索</span>
    </div>

    <div class="intro-main-layout">
      <div class="content-body">
        <h2 class="section-title">✨ 景點精彩亮點</h2>
        <p class="full-description">{{ currentContent.longDescription }}</p>

        <h3 class="subsection-title">🎯 核心旅遊體驗</h3>
        <div class="highlight-grid">
          <div v-for="(feature, index) in currentContent.features" :key="index" class="feature-card">
            <span class="feature-icon">💎</span>
            <div class="feature-text">
              <h4>{{ feature.name }}</h4>
              <p>{{ feature.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="travel-guide-sidebar">
        <div class="guide-card">
          <h3>📅 最佳旅遊季節</h3>
          <p>{{ currentContent.guide.bestTime }}</p>
        </div>

        <div class="guide-card packing-tips">
          <h3>🎒 必備行李建議</h3>
          <ul>
            <li v-for="(tip, index) in currentContent.guide.packing" :key="index">
              ✅ {{ tip }}
            </li>
          </ul>
        </div>

        <div class="guide-card price-range">
          <h3>💰 預估參考花費</h3>
          <p>{{ currentContent.guide.cost }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps(['spotId'])
const route = useRoute()
const router = useRouter()
const currentContent = ref(null)   // ← 這行原本就不見了

const detailedDatabase = {
  // === 1. 昆士蘭州景點 ===
  'great-barrier-reef': {
    title: '凱恩斯大堡礁潛水之旅',
    longDescription: '大堡礁（Great Barrier Reef）是全球最大且最延綿的珊瑚礁群，由數十億隻微小的珊瑚蟲建構而成，甚至在太空中都能清晰看見。從凱恩斯搭乘高級雙體船出海，外堡礁水質清澈見底。不論您是選擇特製的玻璃底船巡航、體驗刺激的浮潛，還是背上氣瓶進行深潛，都能與綠蠵龜、蘇眉魚、以及五彩斑斕的小丑魚近距離接觸，體驗如夢似幻的海洋天堂。',
    features: [
      { name: '外堡礁極致潛水', desc: '前往污染極少的海洋保護區，觀賞高達數十公尺、色彩鮮豔的活珊瑚斷崖。' },
      { name: '直升機高空俯瞰', desc: '可自費選搭景觀直升機，從空中俯瞰大自然最浪漫的傑作——心形礁（Heart Reef）。' },
      { name: '半潛水艇與海底觀景台', desc: '專為不玩水的旅客設計，透過大型觀景窗免濕身也能飽覽奇幻海底世界。' }
    ],
    guide: {
      bestTime: '每年 6 月至 11 月（此時正值澳洲冬春季，雨水少、能見度最高，且避開了水母季）。',
      packing: ['海洋友善防曬乳（不傷珊瑚）', '太陽眼鏡與遮陽帽', '泳衣與大毛巾', '防水相機或手機防水袋'],
      cost: '一日遊船票（含浮潛裝備與自助午餐）約 AUD $180 - $280 / 人'
    }
  },
  'gold-coast-beach': {
    title: '黃金海岸狂歡熱浪',
    longDescription: '黃金海岸（Gold Coast）以綿延 57 公里、細緻如粉末的金黃色沙灘聞名全球，其中最耀眼的莫過於「衝浪者天堂（Surfers Paradise）」。這裡全年陽光普照，強勁卻穩定的太平洋海浪讓它成為衝浪者的終極朝聖地。除了陽光與海灘，這裡還矗立著南半球最高的 Q1 大廈，周邊更環繞著華納兄弟電影世界、海洋世界等頂級主題樂園，是完美結合大自然與現代娛樂的度假聖地。',
    features: [
      { name: '衝浪者天堂極限浪潮', desc: '在專業教練指導下，站在衝浪板上迎接太平洋的第一道浪花。' },
      { name: 'SkyPoint 觀景台', desc: '登上高空第 77 層樓，360 度俯瞰無邊際海岸線與摩天大樓交織的震撼奇景。' },
      { name: '百利角（Burleigh Heads）漫步', desc: '在地人最愛的私房景點，漫步於國家公園步道，一旁就是絕美的崖邊海景。' }
    ],
    guide: {
      bestTime: '全年皆宜，最佳為 9 月至次年 3 月（夏日氣候溫暖明媚，最適合各類水上娛樂活動）。',
      packing: ['百搭海灘夾腳拖', '防風薄外套（海邊傍晚風大）', '衝浪褲或比基尼', '高係數防曬乳'],
      cost: '海灘免費開放；觀景台門票約 AUD $35；衝浪體驗課約 AUD $70'
    }
  },
  'aus-food': {
    title: '道地澳洲和牛與海鮮饗宴',
    longDescription: '澳洲得天獨厚的純淨生態與廣袤的牧場，孕育出了世界最高品質的頂級畜牧業與豐饒海鮮。澳洲黑毛和牛以自然的穀物飼養，肉質鮮嫩、油花如雪花般均勻分佈，煎烤後香氣四溢、入口即化。再搭配當天由南極冷冽海水捕撈直送的頂級岩石龍蝦、肥美多汁的現開生蠔，以及澳洲本地獵人谷酒莊釀造的精選紅白葡萄酒，為饕客帶來最奢華的味蕾饗宴。',
    features: [
      { name: '頂級 M9+ 澳洲和牛', desc: '精選最高評級和牛牛排，主廚精準火候掌控，外表焦香、內裡滿溢濃郁肉汁。' },
      { name: '現開冷水域生蠔', desc: '品嚐帶有淡淡海水鹹香與榛果甘甜的澳洲鮮生蠔，鮮美滑嫩一試難忘。' },
      { name: '雪梨魚市場主廚現撈', desc: '直接到市場挑選活跳跳的塔斯馬尼亞帝王蟹與大龍蝦，立刻烹調享用。' }
    ],
    guide: {
      bestTime: '全年皆適合，特別推薦 4 月至 5 月秋季（各地常舉辦美食慶典與新酒開瓶市集）。',
      packing: ['輕鬆端莊的服裝（部分高級景觀餐廳有 Smart Casual 衣著規定）', '空空的胃'],
      cost: '頂級和牛海鮮雙人套餐約 AUD $150 - $300'
    }
  },
  'aboriginal-culture': {
    title: '庫蘭達原住民文化體驗',
    longDescription: '澳洲原住民（Aboriginal）擁有超過六萬五千年的歷史，是地球上現存最古老的連續文化之一。在庫蘭達（Kuranda）蔚為壯觀的熱帶雨林深處，您可以跟隨查普凱部落後裔的腳步，聆聽古老神秘的「夢幻時代（Dreamtime）」神話創世傳說。親身學習如何扔擲傳統長矛、讓迴力鏢在空中完美迴旋，並在迪吉里杜管（Didgeridoo）的原始低鳴共振中，感受與這片神聖土地的情感交融。',
    features: [
      { name: '迴力鏢與長矛狩獵體驗', desc: '原住民戰士親自傳授秘訣，體驗在雨林中投擲古老武器進行狩獵的快感。' },
      { name: '火之律動傳統舞蹈', desc: '觀賞震撼人心的現場鑽木取火儀式，以及模仿袋鼠、沙袋鼠靈動姿態的傳統舞蹈。' },
      { name: '神秘查普凱故事劇場', desc: '結合現代聲光舞台特效，生動演繹萬物起源與原住民守護神虹蛇的神話。' }
    ],
    guide: {
      bestTime: '5 月至 10 月（正值昆士蘭乾季，雨林內氣候涼爽舒適，漫步體驗極佳）。',
      packing: ['舒適耐磨的防滑健行鞋', '防蚊液（雨林昆蟲較多）', '小水壺（隨時補充水分）'],
      cost: '文化園區全包式體驗門票（含導覽與舞蹈秀）約 AUD $60 - $95 / 人'
    }
  },

  // === 2. 新南威爾斯州景點 ===
  'sydney-opera': {
    title: '雪梨歌劇院內部導覽',
    longDescription: '雪梨歌劇院（Sydney Opera House）是二十世紀最偉大的建築奇蹟之一，以其層疊如白色風帆的貝殼屋頂，永遠改變了人類對建築藝術想像力的邊界。這座被列為聯合國世界文化遺產的表演殿堂，由丹麥建築師約恩．烏松（Jørn Utzon）設計，歷經 16 年打造，內含音樂廳、歌劇院、劇場等多個頂級演出空間。跟隨專業導遊深入後台，聆聽這棟建築傳奇背後的故事，再欣賞一場世界一流的現場音樂或歌劇表演，將是此生難忘的文化旅程。',
    features: [
      { name: '音樂廳管風琴近距離鑑賞', desc: '全球最大的機械式管風琴擁有逾萬支音管，聆聽現場彈奏時震撼的低頻共鳴無與倫比。' },
      { name: '專業幕後後台深度導覽', desc: '踏進平常謝絕公眾進入的後台區域，親眼目睹世界級演出前的緊張籌備與專業舞台機關。' },
      { name: '海港夜景晚宴與夜間導覽', desc: '夜幕低垂時分的歌劇院在燈光映照下更顯輝煌，結合港灣景觀晚宴，體驗最浪漫的雪梨之夜。' }
    ],
    guide: {
      bestTime: '全年皆宜，建議於 1 月的雪梨節（Sydney Festival）或 8 月的雪梨電影節期間造訪，演出節目最為豐富精彩。',
      packing: ['正式或 Smart Casual 服裝（觀賞正式演出時建議著裝）', '相機（導覽期間可拍照）', '演出門票（建議提前數週網路訂購）'],
      cost: '建築導覽票約 AUD $45 / 人；演出門票依節目從 AUD $50 至 $300 以上不等'
    }
  },
  'blue-mountain': {
    title: '藍山國家公園三姐妹岩',
    longDescription: '藍山國家公園（Blue Mountains National Park）距離雪梨市區僅約 90 分鐘車程，卻猶如截然不同的另一個世界。公園因廣佈山間的數億棵尤加利樹所揮發的精油在陽光折射下形成神秘的藍色霧靄而得名。「三姐妹岩（Three Sisters）」是公園最標誌性的地貌，三根孤絕的砂岩巨柱矗立於賈米森峽谷（Jamison Valley）之上。遊客可搭乘世界最陡峭的鐵道——景觀鐵路（Scenic Railway），垂降進入峽谷，深入蕨類叢生的遠古雨林步道，感受置身於侏羅紀的奇幻氛圍。',
    features: [
      { name: '三姐妹岩日落金光展望', desc: '在回音谷（Echo Point）展望台迎接夕陽，三姐妹岩在金橙色光芒中被染成最動人的顏色。' },
      { name: '景觀鐵路極速下坡體驗', desc: '搭乘最大坡度達 52 度的世界最陡峭景觀列車垂降入谷，刺激程度媲美雲霄飛車。' },
      { name: '尤加利森林無尾熊巡禮', desc: '在國家公園與周邊野生動物保育區，有極大機率在尤加利樹上發現慵懶可愛的野生無尾熊。' }
    ],
    guide: {
      bestTime: '3 月至 5 月秋季（山林葉色轉為金紅、霧氣最為夢幻）或 9 月至 11 月春季（野花盛開、氣候宜人）。',
      packing: ['防水防風保暖外套（山區氣溫比雪梨低 5-10°C）', '防滑登山鞋或健行鞋', '行動電源（山區部分地點無訊號）', '雨具（山區天氣多變）'],
      cost: '國家公園免費入場；景觀纜車套票（Scenic World）約 AUD $52 / 人；從雪梨出發的一日跟團遊約 AUD $80 - $120'
    }
  },
  'darling-harbour-food': {
    title: '達令港星級景觀餐廳',
    longDescription: '達令港（Darling Harbour）是雪梨最活力四射的濱水娛樂特區，全長數公里的海濱步道兩旁林立著各類型的頂級餐廳、酒吧與咖啡廳。白天，這裡是家庭出遊的完美去處；入夜後，霓虹燈光倒映在港灣水面，整個區域化身成浪漫的不夜城。最令饕客心動的是各家餐廳供應的生猛活海鮮——現場活殺的塔斯馬尼亞帝王蟹（Tasmanian King Crab）、鮮甜的岩石龍蝦與現蒸海鮮拼盤，佐以澳洲本地精釀啤酒或獵人谷白葡萄酒，在海港夜景第一排，獻上最奢侈的雪梨夜晚。',
    features: [
      { name: '現殺塔斯馬尼亞帝王蟹', desc: '從活蟹水缸中親自挑選，主廚即刻烹調，蟹肉鮮甜紮實、令人欲罷不能。' },
      { name: '週末煙火秀海港第一排', desc: '部分餐廳設有戶外露台，週末夜間定期施放的海港煙火秀可在用餐時盡收眼底。' },
      { name: '海濱市集與精品美食街', desc: '達令港沿線定期舉辦週末手工市集，可邊逛邊品嚐澳洲各地特色街頭美食。' }
    ],
    guide: {
      bestTime: '全年皆適合，尤其推薦 12 月至 1 月夏季跨年期間（煙火與節慶氣氛最為盛大熱鬧）。',
      packing: ['輕便時尚穿搭（沿港區域多為 Smart Casual 風格）', '防曬用品（白天海濱日照強烈）', '提前網路訂位確認單'],
      cost: '海鮮拼盤雙人餐約 AUD $120 - $250；帝王蟹視重量計價，約 AUD $80 - $150 / 公斤'
    }
  },
  'bondi-beach': {
    title: '邦代海灘冰山泳池體驗',
    longDescription: '邦代海灘（Bondi Beach）是澳洲最具代表性的海灘地標，也是全球社群媒體上被打卡分享次數最多的海灘之一。這裡最令人歎為觀止的，是建於天然岩石礁台之上的「冰山俱樂部（Bondi Icebergs Club）」戶外泳池——太平洋的巨浪會定期越過礁石直接拍打入池，形成一幅波濤壯闊的極致視覺奇觀。除了泳池，邦代至庫吉（Bondi to Coogee）的崖邊海岸步道全長約 6 公里，沿途壯麗的海灣景色讓每一步都值得停下腳步細細品味。',
    features: [
      { name: '冰山俱樂部岩石泳池', desc: '在海浪拍打聲中游泳，當滔天巨浪越礁而來的瞬間，是視覺與感官的雙重震撼。' },
      { name: '邦代至庫吉崖邊步道', desc: '6 公里、約 2 小時的輕鬆步道，沿途俯瞰一個比一個更美的弧形海灣，是全雪梨最美的散步路線。' },
      { name: '邦代農夫市集', desc: '每週六上午於海灘旁公園舉辦的農夫市集，販售新鮮有機農產品與澳洲本地特色手工食品。' }
    ],
    guide: {
      bestTime: '11 月至 3 月（澳洲夏季，海水溫暖、陽光充足，最適合海泳與曬太陽）；12 月每年固定舉辦邦代海灘露天電影節。',
      packing: ['泳衣與快乾毛巾', '防曬係數 50+ 以上的高效防曬乳', '運動涼鞋或夾腳拖', '充電式防水藍芽音響（海灘氣氛必備）'],
      cost: '海灘免費；冰山俱樂部泳池入場費約 AUD $9 / 人；Icebergs 景觀餐廳午餐約 AUD $60 - $100 / 人'
    }
  }
}

const loadContent = () => {
  const targetId = props.spotId || route.params.spotId
  currentContent.value = detailedDatabase[targetId] ?? null
}

onMounted(() => {
  loadContent()
})

watch(() => props.spotId, () => {
  loadContent()
})

const goBack = () => {
  if (route.query.from) {
    router.push({
      name: 'city-spots',
      params: { cityId: route.query.city || 'queensland' },
      query: { activeTab: route.query.from }
    })
  } else {
    router.back()
  }
}
</script>

<style scoped>
.spot-intro-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
}

.breadcrumb {
  margin-bottom: 25px;
  font-size: 14px;
}
.back-link {
  color: #007a99;
  cursor: pointer;
  font-weight: bold;
}
.back-link:hover {
  text-decoration: underline;
}
.separator {
  margin: 0 10px;
  color: #ccc;
}
.current-page {
  color: #666;
}

.intro-main-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
}

.section-title {
  color: #005c73;
  font-size: 24px;
  border-left: 5px solid #ffbe00;
  padding-left: 12px;
  margin-top: 0;
  margin-bottom: 20px;
}
.full-description {
  font-size: 16px;
  line-height: 1.8;
  color: #555;
  text-align: justify;
  margin-bottom: 35px;
}
.subsection-title {
  color: #333;
  font-size: 20px;
  margin-bottom: 20px;
}

.highlight-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}
.feature-card {
  display: flex;
  background: #f4fafd;
  border: 1px solid #e0f0f5;
  border-radius: 10px;
  padding: 20px;
}
.feature-icon {
  font-size: 24px;
  margin-right: 15px;
  margin-top: 2px;
}
.feature-text h4 {
  margin: 0 0 8px 0;
  color: #005c73;
  font-size: 16px;
}
.feature-text p {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.travel-guide-sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.guide-card {
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  padding: 22px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}
.guide-card h3 {
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 16px;
  color: #333;
}
.guide-card p {
  margin: 0;
  font-size: 14px;
  color: #555;
  line-height: 1.6;
}
.packing-tips ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.packing-tips li {
  font-size: 14px;
  margin-bottom: 8px;
  color: #555;
}
.price-range {
  border-top: 4px solid #ffbe00;
}

@media (max-width: 768px) {
  .intro-main-layout {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>