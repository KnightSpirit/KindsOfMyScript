
// const reducer_1 = (state = {}, action) => {
//   console.log(`reducer_1 was called with state ${state} and action ${action}`);

//   switch(action.type) {
//     case 'SAY_SOMETHING': 
//       return {
//         ...state,
//         message: action.value
//       }
//     case 'DO_SOMETHING':
//     case 'LEARN_SOMETHING':
//     case 'HERA_SOMETHING':
//     case 'GO_SOMEWHERE':
//     default:
//       return state;
//   }
// }

// const userReducer = (state = {}, action) => {
//   console.log(`userReducer was called with state ${state} and action ${action.type}`);

//   switch(action.type) {
//     case 'SET_NAME': 
//       return {
//         ...state,
//         name: action.name
//       }
//     default:
//       return state;
//   }
// }

// const itemsReducer = (state = [], action) => {
//   console.log(`itemsReducer was called with state ${state} and action ${action.type}`);

//   switch(action.type) {
//     case 'ADD_ITEM':
//       return [
//         ...state,
//         action.item
//       ];
//     default:
//       return state;
//   }
// }

import { createStore, combineReducers, applyMiddleware } from 'redux';
import ThunkMiddleware from './thunkMiddleware';
// const reducer = combineReducers({
//   user: userReducer,
//   items: itemsReducer
// });

// const store_0 = createStore(reducer);

// console.log(`store_0 state after init ${{...store_0.getState()}}`);

// store_0.dispatch({
//   type: 'AN_ACTION'
// })

// console.log(`store_0 state after AN_ACTION ${store_0.getState().toString()}`);

// const setNameActionCreator = (name) => {
//   return {
//     type: 'SET_NAME',
//     name
//   }
// }

// store_0.dispatch(setNameActionCreator('bob'));

// console.log(`store_0 state after SET_NAME ${store_0.getState().user.name}`);

const finalCreateStore = applyMiddleware(ThunkMiddleware)(createStore);

const reducer_0 = combineReducers(
  {
    speaker: (state = {}, action) => {
      console.log(`reducer_0 was called with state ${JSON.stringify(state)} and action ${JSON.stringify(action)}`);
    
      switch(action.type) {
        case 'SAY_SOMETHING':
          return {
            ...state,
            message: action.message
          }
        default: 
          return state;
      }
    }
  }
) 

const store_0 = finalCreateStore(reducer_0);

// const sayActionCreator = (mes) => {
//   return {
//     type: 'SAY_SOMETHING',
//     message: mes
//   }
// }

const asyncSayActionCreator_1 = (mes) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: 'SAY_SOMETHING',
        message: mes
      })
    }, 2000)
  }
}

console.log(`Running our normal action creator.\n`);

store_0.dispatch(asyncSayActionCreator_1('hi'));

console.log(`store_0 state after action SAY ${JSON.stringify(store_0.getState())}`);



