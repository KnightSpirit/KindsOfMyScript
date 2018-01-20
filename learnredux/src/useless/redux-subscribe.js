"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var itemsReducer = function (state, action) {
    if (state === void 0) { state = []; }
    console.log("itemsReducer was called with state " + state + " and action " + action);
    switch (action.type) {
        case 'ADD_ITEM':
            return state.concat([
                action.item
            ]);
        default:
            return state;
    }
};
var reducer = redux_1.combineReducers({ items: itemsReducer });
var store_0 = redux_1.createStore(reducer);
store_0.subscribe(function () {
    console.log("store_0 has been updated. Latest store state: " + JSON.stringify(store_0.getState()));
});
var addItemActionCreator = function (item) {
    return {
        type: 'ADD_ITEM',
        item: item
    };
};
store_0.dispatch(addItemActionCreator({ id: 1234, description: 'anything' }));
//# sourceMappingURL=redux-subscribe.js.map