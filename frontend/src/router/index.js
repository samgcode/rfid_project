import Vue from 'vue';
import Router from 'vue-router';

import Home from '../components/Home';
import Symptoms from '../components/Symptoms';
import Export from '../components/Export';
import Goodbye from '../components/Goodbye';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/symptoms/:id',
      name: 'Symptoms',
      component: Symptoms,
      props: true
    }, {
      path: '/export',
      name: 'Export',
      component: Export
    }, {
      path: '/goodbye',
      name: 'Goodbye',
      component: Goodbye
    }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});
