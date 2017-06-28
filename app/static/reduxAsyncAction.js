import {applyMiddleware, createStore} from "redux";
import axios from "axios";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
const initialState = {
    fetching : false,
    fetched  : false,
    users:[],
    error:null
};

const reducer = (state=initialState, action)=> {

    switch(action.type){
        case "FETCH_USER_START":{
            return {...state, fetching:true};
        }            
        case "RECEIVE_USERS":{
            return {...state, 
                fetching:false, 
                fetched:true, 
                users:action.payload };
        }
        case "RECEIVE_USERS_ERROR":{
            return {...state, fetching:false, error:action.payload};
        }
    }
    return state;
}


const middleware = applyMiddleware(promise(),thunk,createLogger());   

const store = createStore(reducer, middleware);


store.subscribe(()=> {
    console.log("store changed", store.getState());
})


store.dispatch((dispatch)=>{
    dispatch({type:"FETCH_USER_START"});
    axios.get("http://rest.learn111code.academy/api/wstern/users")
    .then((response)=>{
        dispatch({type:"RECEIVE_USERS", payload:response.data});
    })
    .catch((err)=>{
        dispatch({type:"RECEIVE_USERS_ERROR", payload:err});
    });        
});