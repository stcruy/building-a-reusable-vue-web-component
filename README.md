## How to build a reusable Vue.js web-component

*--- Preliminary, partial text; to be rewritten: ---*

Skeleton project + demo use cases.

<br>
What if you're not building a full Vue.js app?  &ndash;
How can other developers integrate your component into their app?

+ What if you're just building a standalone component,
  for people that do not wish to know about Vue or webpack?

+ And what if some of those people are using multiple such standalone Vue
  components, but they want to speed up load time on their sites,
  by preventing to include the Vue framework that would be bundled in each such component,
  but they still don't want to deal with webpack?

+ And what if a third class of people just want to import your component into their
  own larger Vue component, or full app, without any webcomponent-wrapper overhead?


<br>
How to explore this project:

- See package.json commands (esp. `start` (`dev`), `testw`, and `build`).
- To see info on how to use the three different use cases (vue-component vs.
  slim web-component vs. standalone web-component):  
  see index-prod-*.html.
- There, read about small differences (if any) between them, for:
  - using a demo component `<my-component>` and loading any external dependencies;
  - setting an Object-type prop;
  - changing a prop;
  - listening to its events;
  - dynamically adding more instances of the component.
