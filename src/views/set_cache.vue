<script>
import { setStore } from '@/utils/store'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'SetCache',
  setup() {
    const { query } = useRoute()
    const router = useRouter()
    for (const key in query) {
      setStore({ name: key, content: query[key] })
    }
    router.replace('/')

    return () => <div></div>
  }
}
</script>
