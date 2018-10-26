import Vue from 'vue';
import App from './App.vue';
import * as firebase from 'firebase';
import router from './router';
import store from './store';
import '@babel/polyfill';
import './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import Alert from './components/Alert';
import EditMeetupDetailsDialog from './components/Meetup/EditMeetupDetailsDialog';
import EditMeetupDateDialog from './components/Meetup/EditMeetupDateDialog';
import EditMeetupTimeDialog from './components/Meetup/EditMeetupTimeDialog';
import RegisterDialog from './components/Meetup/RegisterDialog';
import Loading from './components/Loading';

Vue.config.productionTip = false;
Vue.component('app-alert', Alert);
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog);
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog);
Vue.component('app-edit-meetup-time-dialog', EditMeetupTimeDialog);
Vue.component('app-register-dialog', RegisterDialog);
Vue.component('app-loading', Loading);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCjdMfT10eIgCtmjCuWchMU4Kv-H5r__Os',
      authDomain: 'devmeetup-77b47.firebaseapp.com',
      databaseURL: 'https://devmeetup-77b47.firebaseio.com',
      projectId: 'devmeetup-77b47',
      storageBucket: 'gs://devmeetup-77b47.appspot.com'
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user);
        this.$store.dispatch('fetchUserData');
      }
    });

    this.$store.dispatch('loadMeetups');
  }
}).$mount('#app');
