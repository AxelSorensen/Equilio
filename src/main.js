import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { MotionPlugin } from '@vueuse/motion'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faTrophy, faHouse, faHeartPulse, faBagShopping, faDollarSign, faBicycle, faPlus, faCoins, faXmark, faUtensils, faCartShopping, faGift, faQuestion, faWineGlass } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faTrophy,faHouse,faHeartPulse,faBagShopping, faDollarSign, faBicycle, faPlus, faCoins, faXmark, faUtensils, faCartShopping, faGift, faQuestion, faWineGlass)

createApp(App).use(MotionPlugin).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
