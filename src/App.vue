<template>
  <!-- 开启顶部安全区适配 -->
  <van-nav-bar :title="title" fixed left-arrow @click-left="onClickLeft" safe-area-inset-top />
  <div class="app-content">
    <router-view />
  </div>
</template>

<script>
import { computed } from 'vue'
import getPageTitle from './utils/get-page-title'
import { useRoute, useRouter } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const title = computed(() => getPageTitle(route.meta.title))

    const onClickLeft = () => {
      router.back()
    }

    return {
      title,
      onClickLeft
    }
  }
}
</script>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
}
#app {
  position: relative;
}
.app-content {
  position: absolute;
  width: 100%;
  top: 46px * 2; // van-nav-bar的height: 46px
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
