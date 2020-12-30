import Vue from 'vue';
import Router from 'vue-router';

import Home from '../components/Home';
import Symptoms from '../components/Symptoms';
import Export from '../components/Export';

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
    }, {
      path: '/export',
      name: 'Export',
      component: Export
    }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});
