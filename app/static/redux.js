import {combineReducers, createStore} from "redux";

const userReducer = (state={},action)=>{
    switch(action.type){
        case "CHANGE_NAME":
            state = Object.assign(state,{name:action.payload});// {...state, name:action.payload};
            break;
        case "CHANGE_AGE":
           state = {...state, age:action.payload};
            break;
    }
    return state;
}
const tweetsReducer = (state=[], action)=> {
    return state;
}

const reducers = combineReducers({
    user:userReducer,
    tweets:tweetsReducer
})
 



const store = createStore(reducers);

store.subscribe(()=> {
    console.log("store changed",store.getState());
})

//type is mandatory, payload is a parameter, can be anything, 
store.dispatch({type:"CHANGE_NAME", payload:"WILL"});
store.dispatch({type:"CHANGE_AGE", payload:35});
store.dispatch({type:"CHANGE_AGE", payload:36});