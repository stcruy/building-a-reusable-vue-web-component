// This demo-code is loaded and run by 'index-dev.html', via 'npm run dev'.


import Vue from 'vue';  // For fast loads @dev, include Vue in webpack bundle.
import MyComponent from './MyComponent.vue';

runDemo();



function runDemo() {
  Vue.config.productionTip = false;

  // Activate Vue on the #app element and its children.
  new Vue({
    el: '#app',

    components: {
      'my-component': MyComponent
    },

    data : {
      init: 5,
      addNr2: false,
      // Demo use 1): give an Object to a v-bound prop (`:data-source`).
      myDataSource: class {
        static getValue() {
          return 39;
        }
      }
    },

    created: function() {
      // Demo use 3): change a prop on the webcomponent. We'll see it react to it.
      setTimeout(() => {
        var orig = this.init;
        this.init = 99;
        setTimeout(() => { this.init = orig }, 1000);  // Restore.
      }, 1000);

      // Demo use 4): add one more component, in a data-driven manner.
      setTimeout(() => { this.addNr2 = true }, 3000);
    },

    methods: {
      // Demo use 2): attach an event listener.
      incReported: (count, event) => {
        console.log(count);
        console.log(event);
      }
    }
  });
}
