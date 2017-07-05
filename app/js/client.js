require('../css/App.css');
require('bootstrap')
import 'bootstrap/dist/css/bootstrap.css';
import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import { createStore } from "redux"
import todoApp from "./todoApplication/reducers/todosReducers"
import PropTypes from 'prop-types'

//basics
import  {BasicRenderer, Basic1_App} from "./testsApplication/components/basic_1"
import  {CardsApp} from "./testsApplication/components/basic_2"
import  {Game} from "./testsApplication/components/basic_3"
//root apps
import App from "./todoApplication/components/App"
import TestApp from "./testsApplication/components/App"

let store = createStore(todoApp);
const app = document.getElementById("app");
const mainApp = document.getElementById("mainApp")


const Apps = [
    {key: 1, text:"General Test", component: TestApp},
    {key: 2, text:"Todo App"},
    {key: 3, text:"Basic Tutorial #1", component:Basic1_App},
    {key: 4, text:"Basic Tutorial #2", component:CardsApp},
    {key: 5, text:"Basic Tutorial - Numbers Game", component:Game}
]

const DEFAULT_APP = Game;

const AppLink = ({text,onAppClick}) => (
    <div>
        <a href="#" onClick={onAppClick}>{text}</a>
    </div>
)


const Main = () => (
    <div>        
        {Apps.map(app => (
              <AppLink key={app.key} text={app.text} onAppClick={(event)=>{
                  event.preventDefault(); 
                  AppSwitcher(app)
                  }
                } />
        ))}
    </div>
)



ReactDOM.render(<Main />, mainApp)
//render default
ReactDOM.render(<DEFAULT_APP />, app)
 

function AppSwitcher(selectedApp = Apps[0]){
    switch(selectedApp.key){
        case 1:
            ReactDOM.render(<selectedApp.component />,app);
            break;
        case 2:
            ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,app);
            break;
        default:
             ReactDOM.render(<selectedApp.component  />, app)
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