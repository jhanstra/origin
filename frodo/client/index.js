import { h, app } from 'hyperapp'
import classes from './main.css'

/* Define your initial application state here */
const state = {
  count: 0,
}


/*
  Define your actions here.
  Each action is a curried function that first takes a value passed to it, then passes
  in the state, then returns a slice of state
*/
const actions  = {
  up: value => state => ({ count: state.count + value }),
  down: value => state => ({ count: state.count - value })
}


/* Define your view here using JSX */
const view = (state, actions) => (
  <div class="main center">
    <h1>{state.count}</h1>
    <button onclick={() => actions.down(5)}> - </button>
    <button onclick={() => actions.up(5)}> + </button>
  </div>
)


/* Initialize your app using the app() function */
app(state, actions, view, document.body)


