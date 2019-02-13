import { combineReducers } from 'redux';
import{REQUEST_APP_STATE, RECEIVE_APP_STATE, 
    START_IN_PROGRESS, END_IN_PROGRESS} 
  from '../actions';



export const DEFAULT_APP_STATE_TREE =
{
    users: [],
    categories: [],
    follows: []
}



const appStateTree = (state = DEFAULT_APP_STATE_TREE, action) => {
  switch (action.type) {
    case REQUEST_APP_STATE:
      return {
        ...state
      }
    case RECEIVE_APP_STATE:
        return action.appStateTree;
    default:
      return state
  }
}


const inProgress = (state = false, action) => {
  switch (action.type) {
    case START_IN_PROGRESS:
    //  console.log("reached reducer.inProgress.START");
       return true;
    case END_IN_PROGRESS:
  //    console.log("reached reducer.inProgress.END");
       return false;
    default:
      return state
  }
}


const rootReducer = combineReducers({
  appStateTree, inProgress
})


export default rootReducer;
