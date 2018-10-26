import Vue from 'vue';
import { Vuetify } from 'vuetify';
import 'vuetify/src/stylus/app.styl';
import theme from './theme';

Vue.use(Vuetify, {
  theme: theme,
  customProperties: true,
  iconfont: 'mdi'
});
