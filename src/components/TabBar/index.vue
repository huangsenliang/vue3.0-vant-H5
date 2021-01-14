<template>
  <van-tabbar
    fixed
    route
    v-model="active"
    @change="handleTabbarChange"
    :active-color="activeColor"
    :inactive-color="inactiveColor"
  >
    <van-tabbar-item v-for="(item, index) in tabbars" :to="item.to" :key="index">
      <span> {{ item.title }}</span>
      <template #icon="{ active }">
        <van-icon v-if="item.icon" :name="item.icon" :color="active ? activeColor : inactiveColor" />
        <SvgIcon
          v-else-if="item.svgIcon"
          :class-name="item.svgIcon"
          :icon-class="item.svgIcon"
          :color="active ? activeColor : inactiveColor"
        ></SvgIcon>
        <img v-else-if="item.imgIcon" :src="active ? item.imgIcon.activeImg : item.imgIcon.inactiveImg" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>
<!--
tabbars数据类型比如
  tabbars:[
    {
      title: '首页',
      to: {},
      icon: 'home-o'
    },
    {
      title: '收藏',
      to: {},
      svgIcon: 'star'
    },
    {
      title: '我的',
      to: {},
      imgIcon: {
        activeImg: require('../../assets/tabbar/wo2.png'),
        inactiveImg: require('../../assets/tabbar/wo1.png')
      }
    }
  ]
-->
<script>
import { ref } from 'vue'
export default {
  name: 'TabBar',
  props: {
    // 默认激活
    defaultActive: {
      type: Number,
      default: 0
    },
    // 数据
    tabbars: {
      type: Array,
      default: () => []
    },
    // 激活颜色
    activeColor: {
      type: String,
      default: '#1989fa'
    },
    // 未激活颜色
    inactiveColor: {
      type: String,
      default: '#7d7e80'
    }
  },
  setup(props, { emit }) {
    const active = ref(props.defaultActive)
    const handleTabbarChange = value => {
      emit('tabbar-change', value)
    }
    return {
      active,
      handleTabbarChange
    }
  }
}
</script>
