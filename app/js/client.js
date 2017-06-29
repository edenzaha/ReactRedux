import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import { createStore } from "redux"
import todoApp from "./todoApplication/reducers/todosReducers"
import PropTypes from 'prop-types'

//root apps
import App from "./todoApplication/components/App"
import TestApp from "./testsApplication/components/App"

let store = createStore(todoApp);
const app = document.getElementById("app");



const Apps = {
    TESTS : "Tests",
    TODO : "Todo"
}

const AppLink = ({text,onAppClick}) => (
    <div>
        <a href="#" onClick={onAppClick}>{text}</a>
    </div>
)


const Main = () => (
    <div>        
        {Object.keys(Apps).map((k,i) => (
            <AppLink key={i} text={k} onAppClick={()=> AppSwitcher(k)} />
        ))}
    </div>
)



ReactDOM.render(<Main />, app)

 
function AppSwitcher(selectedApp = Apps.TESTS){
    switch(selectedApp){
        case "TESTS":
            ReactDOM.render(<TestApp />,app);
            break;
        case "TODO":
            ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,app);
            break;
    }
}


//AppSwitcher(Apps.TODO);
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