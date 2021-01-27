import Vue from 'vue';
import Router from 'vue-router';

import Home from '../components/Hello/Home';
import Symptoms from '../components/Symptoms/Symptoms';
import Export from '../components/Export/Export';
import Goodbye from '../components/Goodbye/Goodbye';
import EnterName from '../components/Name/EnterName';
import ThanksForChecking from '../components/Symptoms/ThanksForChecking'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/thanks/:name',
      name: 'Thanks',
      component: ThanksForChecking,
      props: true
    }, {
      path: '/symptoms/:id/:name',
      name: 'Symptoms',
      component: Symptoms,
      props: true
    }, {
      path: '/export',
      name: 'Export',
      component: Export
    }, {
      path: '/goodbye/:name',
      name: 'Goodbye',
      component: Goodbye,
      props: true
    }, {
      path: '/enterName/:id/:changeName',
      name: 'EnterName',
      component: EnterName
    }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});
