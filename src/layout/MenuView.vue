<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu theme="dark" mode="horizontal" :defaultSelectedKeys="['home']" :style="{ lineHeight: '64px' }" @click="menuItemClick" >
        <a-menu-item key="home">HOME</a-menu-item>
        <a-menu-item  v-for="item in menuList" :key="item.name" >{{ item.name }}</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff"  v-if="sumMenu.length">
        <a-menu
          mode="inline"
          theme="dark"
          :defaultSelectedKeys="['1']"
          :defaultOpenKeys="['1']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-menu-item v-for="(item, index) in sumMenu" :key="index" >
              <a-icon type="appstore" :class="item.icon" />{{ item.name }}
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
          XXXXXXXX
          <slot />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
// import {getMenuList} from "@/api/menuList.js"
export default {
  data() {
    return {
      submenu: [],
      activeMenu: 'home',
      collapsed: false
    }
  },
  computed: {
    menuList() {
      return this.$store.state.menulist.menulist
    },
    sumMenu() {
      let list = []
      this.$store.state.menulist.menulist.forEach(item => {
        if (item.name === this.activeMenu) {
          list = item.list
        }
      })
      return list
    }
  },
  created() {
  },
  mounted() {
    console.log(123)
  },
  methods: {
    menuItemClick(item) {
      this.activeMenu = item.key
      // this.$axios.get('sys/menu/list?token=6f961db45cf15ca4eed61718a9b029be', {
      //   token: '6f961db45cf15ca4eed61718a9b029be'
      // }).then((res) => {
      //   console.log(res)
      //   debugger
      // })
    }
  }
}
</script>

<style>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>
