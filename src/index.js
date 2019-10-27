import './js/common';
import './assets/css/main.css';
import './assets/scss/main.scss';
window.Vue = require('vue');


// Еслм мы не хотим использ. Vue в сборке, то необходимо удалить нижний блок.
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
// **** end Vue block****

