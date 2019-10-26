import './js/common';
import './css/main.css';
import './scss/main.scss';
window.Vue = require('vue');

Vue.component('example-component', require('./components/Example.vue').default);
import store from './store';
const app = new Vue({
    data () {
        return {
            component: false
        }
    },
    store,
    el: '#app'
});