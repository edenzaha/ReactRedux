import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import App from "./components/App"
import { createStore } from "redux"
import todoApp from "./reducers/todosReducers"


let store = createStore(todoApp);


const app = document.getElementById("app");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,app);





/*
STORE ACTION SAMPLES
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from "./actions/todoListActions"
console.log(store.getState())
let unsubscribe = store.subscribe(() => {
    console.log(store.getState())
})


store.dispatch(addTodo("Learn Abount Actions"))
store.dispatch(addTodo("Learn abount reducers"))
store.dispatch(addTodo("Learn about store"))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

unsubscribe()
*/



/*
 function saySomthing(something){
     alert(something);
 }
 function AddExlamationMark(something){
     return something + "!";    
 }
 var doAll = something =>  saySomthing(AddExlamationMark(something));
 doAll("Eden");
 */