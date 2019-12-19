<template>
  <transition name="page-toggle">
    <keep-alive v-if="multipage">
      <router-view />
    </keep-alive>
    <router-view v-else />
  </transition>
</template>

<script>
export default {
  name: 'RouteView',
  computed: {
    multipage () {
      return false
    }
  }
}
</script>

<style scoped>

</style>
