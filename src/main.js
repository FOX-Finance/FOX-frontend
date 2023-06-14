import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'

// CSS
import './assets/uikit.css'
import './assets/main.css'

// Frontend Scripts
import "./assets/js/uikit.js"
import "./assets/js/uikit-icons.js"

const app = createApp(App)

// Event Bus
const emitter = mitt()
app.config.globalProperties.emitter = emitter

app.use(router)
app.mount('#app')