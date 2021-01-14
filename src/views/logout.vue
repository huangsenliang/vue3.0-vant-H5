<script>
import { clearStore } from '@/utils/store'
import { useRouter } from 'vue-router'
export default {
  name: 'Logout',
  setup() {
    const router = useRouter()
    clearStore()
    router.replace({ name: 'Login' })

    return () => <div></div>
  }
}
</script>
