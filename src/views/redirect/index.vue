<script>
import { useRoute, useRouter } from 'vue-router'
export default {
  setup() {
    const { params, query } = useRoute()
    const router = useRouter()
    const { path } = params
    router.replace({ path: '/' + path, query })

    return () => <div></div>
  }
}
</script>
