import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import AuthGuard from './router/auth-guard';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: () => import('./views/Meetup/Meetups.vue')
    },
    {
      path: '/meetup/new',
      name: 'CreateMeetup',
      component: () => import('./views/Meetup/CreateMeetup.vue'),
      beforeEnter: AuthGuard
    },
    {
      path: '/meetups/:id',
      name: 'Meetup',
      props: true,
      component: () => import('./views/Meetup/Meetup.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('./views/User/Profile.vue'),
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('./views/User/Signup.vue')
    },
    {
      path: '/signin',
      name: 'Signin',
      component: () => import('./views/User/Signin.vue')
    }
  ]
});
