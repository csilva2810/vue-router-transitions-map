# Vue Router Transitions Map

> A Vue.js project to play with router transitions

This project was made to test some transitions between routes using Vue Router + Vue transitions + Animate.css.
You can see it running here: https://6wl458x46r.codesandbox.io

## How does it Work?
It works by the combination of three packages working together:

- Vue's built-in [transition component](https://vuejs.org/v2/guide/transitions.html) ❤️
- [Vue Router]️️(https://router.vuejs.org/) ❤️
- [Animate.css](https://daneden.github.io/animate.css/) ❤️️

All the magic happens on `main.js` (This is an example but you could use it on every component you want). The `<App />` is the guy that renders the Vue Router's `<router-view />` component inside a `<transition />` component and bind two props to it (leave-active-class and enter-active-class).

```html
<transition
  :leave-active-class="leaveTransition"
  :enter-active-class="enterTransition"
>
  <router-view />
</transition>
```

We need to define our routes. It's important that each route receive a name because the name of the routes is what will be used to map the transitions.

```javascript
{ path: "/", name: "home", component: Home },
{ path: "/list-patient", name: "list-patient", component: ListPatient },
{ path: "/create-patient", name: "create-patient", component: CreatePatient },
...
```

The `<App />` component has some data that is used to control all the transitions that will be executed when a route change happens. Notice that the transitions map serves definitely as a map for the enter and leave transitions. It says "When a I go from home to list-patient" use a "fadeOut" transition on leave and a "fadeInUp" transition on enter. And it repeats for every single route transition.

```javascript
exports default {
  data() {
    return {
      leaveTransition: '',
      enterTransition: '',
      transitionsMap: {
        'home > list-patient': {
          leave: 'fadeOut',
          enter: 'fadeInUp'
        },
        'list-patient > home': {
          leave: 'fadeOutDown',
          enter: 'fadeIn'
        },
        'list-patient > create-patient': {
          leave: 'fadeOutLeft',
          enter: 'fadeInRight'
        },
        ...
      }
    };
  }
}
```

And then with this map of transitions we can listen to the route changes and take an action based on that.

```javascript
watch: {
  // watching to route changes
  $route(to, from) {
    // Here is where the magic happens :)
    // When we watch to changes on anything we receive as arguments the newValue and the oldValue of that value we are listening
    // In this case we are receiving the new route and the old route respectively
    // Notice that I'm trying to get the transitions defined on transitionsMap for the current route change
    // If that transition is found on the map I get the leave and enter values from there
    // Otherwise I get the default values that I defined as "fadeOut" and "fadeIn"
    const map = this.transitionsMap[`${from.name} > ${to.name}`] || {
      leave: 'fadeOut',
      enter: 'fadeIn'
    };
    // Here I'm just destructuring the map to use the values
    const { leave, enter } = map;

    // And here I'm changing the leave and enter transitions that will cause a rerender on my component with the new transitions values
    // the animated prefix is required from animate.css to execute the animation
    this.leaveTransition = `animated ${leave}`;
    this.enterTransition = `animated ${enter}`;
  }
},
```

Last but not least we have the CSS rules that is used to place the views in an absolute context that makes the leave and enter transitions to overlap each other.

```scss
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: "Raleway", sans-serif;
  color: #313131;
  // this overflow is important because whitout it the browser scrollbars will be visible when the views transitions is happening
  overflow: hidden;
}

.view {
  // here we make the views to overlap each other using the position absolute
  // because the leave and enter transitions happen at the same time
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  width: 100%;
  height: 100%;
  background-color: white;
  overflow: auto;

  // and here we are setting the duration and timing function of the transitions
  // notice that we are using animation properties. That's because we are using animate CSS
  animation-duration: 0.4s !important;
  animation-delay: 0 !important;
  animation-timing-function: ease !important;
}
```

### That's all folks!
I hope you like it! If you have any questions about this implementation feel free to ask me!
You can clone this repository and run it on your localhost by running the commands below.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```
