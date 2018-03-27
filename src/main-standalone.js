// This code is the main entrypoint for 'npm run build:standalone'.


// This makes webpack bundle our Vue-component as a self-contained web-element.
// Then users (=other developers) can choose to not deal with Vue:
// they only have to include the {package}.js script-tag, and they can
// insert the custom HTML-tag `<{tag-name} ...>` anywhere in their HTML.

// Use polyfill for support for custom HTML-elements.
import 'document-register-element/build/document-register-element';

// Import the Vue framework. This also makes it bundled into the output JS.
import Vue from 'vue';

// Import the `vue-custom-element` plugin.
import vueCustomElement from 'vue-custom-element';
Vue.use(vueCustomElement);

// Register our Vue-component as a custom element. This makes it a web-component.
import MyComponent from './MyComponent.vue';
Vue.customElement('my-component', MyComponent);
