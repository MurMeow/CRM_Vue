import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import messagePlugin from './utils/message.plugin'
import Loader from './components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.component('Loader', Loader)

firebase.initializeApp({
  apiKey: 'AIzaSyDwLUoUYj6C07Cny5ZR29eYLYXznGVOoLM',
  authDomain: 'vue-crm-mur.firebaseapp.com',
  databaseURL: 'https://vue-crm-mur.firebaseio.com',
  projectId: 'vue-crm-mur',
  storageBucket: 'vue-crm-mur.appspot.com',
  messagingSenderId: '1011835259322',
  appId: '1:1011835259322:web:1f73ad31511eb47144f583'
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
