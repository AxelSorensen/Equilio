<script>
import Home from './pages/Home.vue'
import Challenges from './pages/Challenges.vue'
import Balance from './pages/Balance.vue'

const routes = {
  '/': Home,
  '/challenges': Challenges,
  '/balance': Balance,
}

export default {
  data() {
    return {
      currentPath: window.location.hash || '#/'
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1)] || null;
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash || '#/'
    })
  }
}
</script>

<template>
  <KeepAlive>
  <component :is="currentView" />
  </KeepAlive>
  <div id="navbar">
    <a href="#/">
      <font-awesome-icon icon="fa-solid fa-house" :class="{selected: this.currentPath == '#/'}" />
    </a>

    <a href="#/balance">
      <font-awesome-icon icon="fa-solid fa-coins" :class="{selected: this.currentPath == '#/balance'}"/>
    </a>
    <a href="#/challenges">
      <font-awesome-icon icon="fa-solid fa-trophy" :class="{selected: this.currentPath == '#/challenges'}"/>
    </a>
  </div>
</template>