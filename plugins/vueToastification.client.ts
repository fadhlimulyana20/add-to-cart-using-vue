import { defineNuxtPlugin } from '#app'
import Toast, { PluginOptions, POSITION, useToast } from "vue-toastification";
import "vue-toastification/dist/index.css"; 

export default defineNuxtPlugin((nuxtApp) => {
  const options: PluginOptions = {
    timeout: 2000,
    position: POSITION.TOP_RIGHT
  }
  nuxtApp.vueApp.use(Toast, options)
})