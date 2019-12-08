<template>
  <div class="home">
    <MenuView msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>

import MenuView from '@/layout/MenuView.vue'

export default {
  name: 'Home',
  components: {
    MenuView
  }
}
</script>
