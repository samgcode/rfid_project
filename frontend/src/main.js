import Vue from 'vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';
import router from './router';

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
