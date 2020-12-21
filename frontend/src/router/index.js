import Vue from 'vue';
import Router from 'vue-router';

import Home from '../Home';
import Symptoms from '../Symptoms';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/symptoms',
      name: 'Symptoms',
      component: Symptoms
    }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});
