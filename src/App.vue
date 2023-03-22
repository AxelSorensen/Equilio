<script>
import Home from './pages/Home.vue'
import Challenges from './pages/Challenges.vue'

const routes = {
  '/': Home,
  '/challenges': Challenges,
  '/transaction': null,
}

export default {
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {

      return routes[this.currentPath.slice(1) || '/'] || null;
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
		})
  }
}
</script>

<template>
  <component :is="currentView" />
  <div id="navbar"><a href="#/"><font-awesome-icon icon="fa-solid fa-house" :class="{selected: this.currentPath == '#/'}" /></a>
    <a href="#/transaction"><font-awesome-icon
      icon="fa-solid fa-coins" :class="{selected: this.currentPath == '#/transaction'}"/></a>
      <a href="#/challenges"><font-awesome-icon
      icon="fa-solid fa-trophy" :class="{selected: this.currentPath == '#/challenges'}"/></a>
    </div>
      
</template>

