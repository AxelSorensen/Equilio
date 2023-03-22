import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faTrophy, faHouse, faHeartPulse, faBagShopping, faDollarSign, faBicycle, faPlus, faCoins } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faTrophy,faHouse,faHeartPulse,faBagShopping, faDollarSign, faBicycle, faPlus, faCoins)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
