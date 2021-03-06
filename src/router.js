import Vue from 'vue';
import Router from 'vue-router';
import I18nWrapper from './views/I18nWrapper';
import Home from './views/Home';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'index',
      redirect: () => {
        return localStorage.getItem('lang') || 'en-us';
      }
    },
    {
      path: '/:lang',
      component: I18nWrapper,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('./views/About.vue')
        },
        {
          path: 'c-sharp-async',
          name: 'c-sharp-async',
          component: () => import('./components/articles/CSharpAsync.vue')
        }
      ]
    },
  ]
})
