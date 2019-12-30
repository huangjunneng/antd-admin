<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="['1']"
        :style="{ lineHeight: '64px' }"
        @click="menuItemClick"
        :selectedKeys="selectedKeys"
      >
        <a-menu-item key="主页" name="主页">HOME</a-menu-item>
        <a-menu-item v-for="item in menuList" :key="item.name"  :url="item.url" :name="item.name">{{ item.name }}</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff" v-if="sumMenu.length">
        <a-menu
          mode="inline"
          :defaultSelectedKeys="['1']"
          :defaultOpenKeys="['1']"
          :style="{ height: '100%', borderRight: 10 }"
          @click="menuItemClick2"
          :selectedKeys="selectedKeys2"
        >
          <a-menu-item v-for="item in sumMenu" :key="item.url"  :url="item.url" :name="item.name">
            <a-icon type="appstore" :class="item.icon" />
            {{ item.name }}12
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <bread-crumb class="breadcrumb-container"></bread-crumb>
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '600px' }"
        >
          <transition name="page-toggle">
            <keep-alive>
              <router-view />
            </keep-alive>
          </transition>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import BreadCrumb from '@/components/Breadcrumb/index.vue';

export default {
  components: {
    BreadCrumb
  },
  data() {
    return {
      selectedKeys: [],
      selectedKeys2: [],
      sumMenu: [],
      activeMenu: 'home',
      collapsed: false
    };
  },
  watch: {
    activeMenu(newValue, oldValue) {
      this.sumMenu = [];
      this.$store.state.menulist.menulist.forEach(item => {
        if (item.name === this.activeMenu) {
          this.sumMenu = item.list;
          // alert(this.sumMenu.length)
        }
      });
    },
    $route() {
      this.updateMenu()
    }
  },
  computed: {
    menuList() {
      return this.$store.state.menulist.menulist;
    }
  },
  created () {
    this.updateMenu()
  },
  mounted() {
  },
  methods: {
    menuItemClick(item) {
      this.activeMenu = item.key;
      this.selectedKeys = [item.key];
      if (item.key === '主页') {
        this.$router.push('/home');
      } else {
        let acitveMenu = this.menuList.filter(obj => obj.name === item.key);
        this.$router.push('/' + acitveMenu[0].list[0].url);
        // this.selectedKeys = [acitveMenu[0].name];
        this.selectedKeys2 = [acitveMenu[0].list[0].url]
      }
    },
    menuItemClick2(item) {
      this.$router.push('/' + item.key);
      this.selectedKeys2 = item.keyPath;
    },
    updateMenu () {
      let routes = this.$route.matched.concat()
      this.activeMenu = routes[0].name;
      this.selectedKeys = routes.map(item => item.name)
      this.selectedKeys2 = [routes[1].path.substr(1)]
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
