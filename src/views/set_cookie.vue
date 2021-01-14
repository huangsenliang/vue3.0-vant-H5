<script>
import Cookies from 'js-cookie'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'SetCookie',
  setup() {
    const { query } = useRoute()
    const router = useRouter()
    for (const key in query) {
      Cookies.set(key, query[key])
    }
    router.replace('/')

    return h => h()
  }
}
</script>
