import { createStore, combineReducers } from 'redux'

const itemsReducer = (state = [], action) => {
  console.log(`itemsReducer was called with state ${state} and action ${action}`);

  switch(action.type) {
    case 'ADD_ITEM': 
      return [
        ...state,
        action.item
      ];
    default:
      return state;
  }
}

const reducer = combineReducers({ items: itemsReducer });

const store_0 = createStore(reducer);

store_0.subscribe(() => {
  console.log(`store_0 has been updated. Latest store state: ${JSON.stringify(store_0.getState())}`);

})

const addItemActionCreator = (item) => {
  return {
    type: 'ADD_ITEM',
    item: item
  }
}

store_0.dispatch(addItemActionCreator({id: 1234, description: 'anything'}));
