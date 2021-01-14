<template>
  <div class="layout-content">
    <!-- vue3.0配置 -->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" v-if="$route.meta.keepAlive" />
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive" />
    </router-view>
  </div>
  <TabBar
    class="layout-footer"
    :tabbars="tabbars"
    @tabbar-change="handleTabbarChange"
    active-color="#ef424a"
    inactive-color="#7d7e80"
  />
</template>

<script>
import TabBar from '@/components/TabBar'
import { reactive } from 'vue'
export default {
  name: 'Layout',
  components: {
    TabBar
  },
  setup() {
    const tabbars = reactive([
      {
        title: '首页',
        to: {
          name: 'Home'
        },
        icon: 'home-o'
      },
      {
        title: '收藏',
        to: {
          name: 'Page1'
        },
        svgIcon: 'star'
      },
      {
        title: '我的',
        to: {
          name: 'Page2'
        },
        imgIcon: {
          activeImg: require('../../assets/tabbar/wo2.png'),
          inactiveImg: require('../../assets/tabbar/wo1.png')
        }
      }
    ])

    const handleTabbarChange = v => {
      console.log('tab value:', v)
    }

    return {
      tabbars,
      handleTabbarChange
    }
  }
}
</script>

<style lang="scss">
.layout-content {
  position: absolute;
  top: 0;
  bottom: 50px * 2; //van-tabbar的height:46px
  left: 0;
  right: 0;
}
</style>
