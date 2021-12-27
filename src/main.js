import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSimpleAccordion from 'vue-simple-accordion'
import 'vue-simple-accordion/dist/vue-simple-accordion.css'

// VUEPR SLIDE


// PROODUCT ZOOMER
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)

// AXIOS
import axios from "axios";
window.axios = axios;
const accessToken = localStorage.getItem("auth_token");
if (accessToken) {
  console.log(accessToken)
  axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
}
axios.defaults.baseURL = "http://127.0.0.1:8085";
window.baseEnv = "http://127.0.0.1:8085"


// ZOOM
const ImageZoom = require('vue-image-zoomer').default;
Vue.component('image-zoom', ImageZoom);

// SOCIAL SHARING
import VueSocialSharing from 'vue-social-sharing'
Vue.use(VueSocialSharing);

// BASE URL ->

// Axios.defaults.baseURL = "http://eback.timetechri.co.uk/";
// <- BASE URL

// META IMPORT
// import './assets/js/jquery-3.6.0.min.js';
// import './assets/js/bootstrap.min.js';
// import './assets/js/main.js';
// import './assets/js/owl.carousel.min.js';



require('./assets/css/all.min.css');
require('./assets/css/bootstrap.min.css');
require('./assets/css/header.css');
require('./assets/css/home.css');
// require('./assets/css/owl.carousel.min.css');
// require('./assets/css/owl.theme.default.min.css');
// require('./assets/css/responsive.css');
require('./assets/css/style.css');
require('./assets/css/Untitled-1.css');
require('./assets/css/offer.css');
require('./assets/css/basket.css');
require('./assets/css/checkout.css');

//
import InnerImageZoom from 'vue-inner-image-zoom';
import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css';
Vue.component('inner-image-zoom', InnerImageZoom);
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueLodash, { name: 'custom' , lodash: lodash })
Vue.use(VueSimpleAccordion)
new Vue({
  router,
  store,
  vuetify,
  BootstrapVue,
  IconsPlugin,
  render: h => h(App)
}).$mount('#app')
