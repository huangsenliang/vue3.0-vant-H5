<template>
  <h1 class="home">Home</h1>
</template>

<script>
import { getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'Home',
  setup(props, context) {
    const { ctx } = getCurrentInstance() // ==> vue2.0 this
    const route = useRoute() // ==> this.$route
    const router = useRouter() // ==> this.$router
    console.log(route)
    console.log(router)
    console.log(props, context, ctx)
  }
}
</script>
