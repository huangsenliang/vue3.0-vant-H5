import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { getStore } from './utils/store'
const app = createApp(App)

import './permission'
import 'normalize.css'

import Vconsole from 'vconsole'
if (getStore({ name: 'test' })) {
  const vConsole = new Vconsole()
  app.use(vConsole)
}
// vant
import Vant from 'vant'
import 'vant/lib/index.css'
app.use(Vant)

import './icons' // icon
import SvgIcon from '@/components/SvgIcon' // svg component
app.component(SvgIcon.name, SvgIcon)

app.use(store).use(router).mount('#app')
