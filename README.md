# How to build a reusable Vue.js web-component

## <br>Intro

So you're using Vue.js and Webpack. Not for building a full web-application,
but for building a reusable *web component* &mdash; i.e. a user-interface
element that your *consumers (=other developers)* can use in their projects.

This project is a working **webpack+npm configuration**,
that supports three types of consumers for your Vue component:  
&bull; developers who use it as a _standalone web-component_;  
&bull; developers who prefer to only use a _slim component_ build;  
&bull; developers who use it _directly_ in their own Vue app.


## <br>The three consumer types

- Consumer type 1:  
  These developers don't want to deal with Vue or any Webpack setup.
  They only want to add one extra `<script src="__.js">`-tag in the html-header,
  and use your component as a custom html-tag,
  like: `<my-component attr1="...">...</my-component>`.
  - For them, we'll need to bundle the Vue framework, plus code that wraps the
    Vue-component into a _web component_ (which makes it usable as a custom
    html-tag), into a single JS-file.
  - For this we must build our Vue-component
    as a **standalone web-component**.

- Consumer type 2:  
  These developers want to add multiple such web-components
  to their page.
  And they realize it would make their site slower, if the same
  Vue framework code would be included by each standalone component.  
  - For these consumers, we need to build our Vue-component
    as a **slim component**.
    This is a build were the shared Vue code &amp; web-component'ifying code
    is split off.
  - Developers can then load this code (that supports all such 'slim'
    components on the page) once, by adding some extra `<script>`-tags.  
    They must also add a few lines of code to 'activate' the component
    with Vue, but they can avoid setting up Webpack.

- Consumer type 3:  
  These developers just want to import your Vue-component into their own, larger
  Vue component, or into their Vue app.
  - These developers will have their own Webpack setup.  
    So they can include either the .vue file directly, or (more efficiently)
    include the 'slim component' JS-code above.
  - This is the **development setup**.

<br>There are small differences in how to programmatically interface
with a component, based on these three output types.  
Therefore, if any of these differences pertain to your component,
you should make your consumers aware of them.
(This project fully describes them all).


## <br>Contents of this package

This project includes:  
- a complete Webpack setup to handle the three output types (standalone build,
  slim build, and development setup);
- three use-cases that demonstrate using the three types;
  with comments that point out the differences;
- an integrated testing setup with 'mocha-webpack' and 'vue-test-utils';
- an integrated linting setup with 'ESLint';
- npm-script commands to launch all of the above.


## <br>Detailed content

- `package.json`: the `scripts` section shows the different `npm` commands  
  (after you ran `npm install` first) :
  - `npm start` bundles the code for the browser, starts a Webpack dev-server,
    and opens the demo page `index-dev.html` (incl. `index-dev.js`).
  - `npm build` launches two build processes: `build:slim` and `build:standalone`.
    - These compile both the slim and standalone JS-code into the `dist` folder,
      named `my-component.min.js` and `my-component.standalone.min.js` respectively.
  - `npm test` runs the test code.
  - `npm testw` runs the test code in watch-mode (auto-retests on file changes).
  - `npm testwi` does the same but does not clear the console.
  - `npm dev` runs `start` and `testwi` in parallel, so you can use a single
    console-window during development, to see webpack and test errors.
  - `npm lint` runs style checks on the code.
    - These checks are automatically run during the dev/test/builds as well.
    - During dev/test they produce only non-breaking warnings instead of errors.

- `webpack.config.js`: the Webpack configuration file.  
  - Some people scatter Webpack config over multiple files.
    Others group it all together, and structure it by topic.  
    We chose for the clear, single-file approach, where we activate conditional
    config options like:  
    `Object.assign( {setting1},  DEV ? {setting2} || {} )`.
  - This config was inspired by sources all over the web. Where it's maybe less
    obvious, we added comments.
  - (On top of the file you see all `npm install`ed packages. This is useful
    if you'd want to reinstall all packages to their latest major version).

- `.eslintrc.js`: ESLint config options.
  - This includes both recommended EcmaScript and Vue.js
    code and code-style checks.
  - When using `npm lint`, these are the exact options. But for other build
    processes these may be overridden by options in webpack.

- `src/MyComponent.vue`: a small demo Vue-component. It is simply:
  - a button to increase a counter;
  - the counter's value;
  - the initial count-value,
    which can be set by an HTML-attribute ('prop') on the component;
  - a value that is given by a getValue() function, located in an Object
    that can be given as a prop on the component;
    - this is used for showing how to set an Object or class (i.e. not a String)
      attribute on a standalone web-component;
  - an event-emitter that fires after the button increased the value;
    - this is used for showing how to add an event-listener to a standalone
      web-component.

- `src/MyComponent.test.js`: a small demo of testing some aspects
  of the Vue-component. This shows that tests are well integrated in
  the webpack setup.

- `src/test-setup.js`: this file is included before any tests are run.

- `src/index-dev.html` + `src/index-dev.js`: the live demo of the Vue-component,
  served in a webpage, used during development. 
  - These need to be two separate files, so that 'webpack-dev-server' can use
    'index-dev.js' as a JS entry-point to find all the other JS code that
    it should bundle.
  - This demonstrates four aspects of using the component:
    - how to give a non-string prop (=attribute);
    - how to attach an event listener;
    - how to change a prop after component creation;
    - how to dynamically add an extra instance of the component,
      that was not present in the webpage originally.

- `index-prod-slim.html`: demo of using the 'slim' build.  
  - It treats the same four aspects as in 'index-dev',
    with comments on differences in use.  
  - It shows how to load the external dependencies in &lt;script&gt;-tags:  
    - 'document-register-element'
      (which allows Vue components to be wrapped into a web-component,
      so that we can insert MyComponent as a `<my-component>` tag),
    - 'vue', and
    - 'vue-custom-element':
    ```
      <script src="https://unpkg.com/document-register-element"></script>
      <script src="https://unpkg.com/vue"></script>
      <script src="https://unpkg.com/vue-custom-element"></script>
    ```
  - And it shows that the `<my-component>` tag must be located within another
    tag, e.g.:
    ```
    <div id="app">
      <my-component attr="..."></my-component>
    </div>
    ```
    on which the Vue framework must be activated like this:
    ```
    <script>
      Vue.customElement('my-component', MyComponent.default);
      new Vue({ el: '#app' });
    </script>
    ```

- `index-prod-standalone.html`: demo of using the 'standalone' web-component
  build.  
  - It treats the same four aspects as in 'index-dev' / 'index-prod-slim',
    with comments on differences in use.
  - Here, no other &lt;script&gt;-tag needs to be added, and  
    the `<my-component>` tag can be used anywhere on the web page.

- `index-prods.html`: this includes both `index-prod-slim.html` and
  `index-prod-standalone.html` in two &lt;iframe&gt;s on the same web page.  
  This enables us to verify at one glance (automatically after `npm build`)
  that both bundle types still work correctly.


<br>Read more in `index-*.*`'s comments, on the small differences in use
for the three build versions / consumer types.
