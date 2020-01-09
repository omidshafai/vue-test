import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import App from './App.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';
import store from './store'

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

Vue.config.productionTip = false;

Vue.use(VueRouter);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.component('infinite-scroll', {
  props: {
    threshold: {
      type: Number,
      default: 100
    },
    busy: {
      type: Boolean,
      default: false
    }, 
    callback: {
      type: Function
    }
  },
  data() {
    return {
      active: true
    }
  },
  methods: {
    onScroll(event){
      if(this.busy) return;

      if (Math.abs((event.target.offsetHeight + event.target.scrollTop) - event.target.scrollHeight) < this.threshold) {
        if (this.active) {
          this.active = false;
          this.callback();
        }
      }else{
        this.active = true;
      }
    }
  },
  template: `<div style="overflow-y: auto;" @scroll="onScroll">
    <slot></slot>
  </div>`
});

const router = new VueRouter({ routes });

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#root');