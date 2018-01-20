import { createStore } from 'redux'

const reducer_0 = (state, action) => {
  console.log(`reducer_0 was called with state ${state} and action ${action}`);
}

const store_0 = createStore(reducer_0);

console.log(`store_0 state after init: ${store_0.getState()}`);

const reducer_1 = (state, action) => {
  console.log(`reducer_1 was called with state ${state} and action ${action}`);
  if (typeof state === 'undefined') {
    return {};
  }

  return state;
}

const store_1 = createStore(reducer_1);

console.log(`store_1 state after init: ${store_1.getState()}`);

const reducer_2 = (state = {}, action) => {
  console.log(`reducer_2 was called with state ${state} and action ${action}`);

  return state;
}

const store_2 = createStore(reducer_2);

console.log(`store_2 state after init: ${store_2.getState()}`);

const reducer_3 = (state = {}, action) => {
  console.log(`reducer_3 was called with state ${state} and action ${action}`);

  switch(action.type) {
    case 'SAY_SOMETHING': 
      return {
        ...state,
        message: action.value
      }
    default: 
      return state;
  }
}

const store_3 = createStore(reducer_3);

console.log(`store_3 state after init: ${store_3.getState()}`);

