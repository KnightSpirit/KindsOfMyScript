"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var reducer_0 = function (state, action) {
    console.log("reducer_0 was called with state " + state + " and action " + action);
};
var store_0 = redux_1.createStore(reducer_0);
console.log("store_0 state after init: " + store_0.getState());
var reducer_1 = function (state, action) {
    console.log("reducer_1 was called with state " + state + " and action " + action);
    if (typeof state === 'undefined') {
        return {};
    }
    return state;
};
var store_1 = redux_1.createStore(reducer_1);
console.log("store_1 state after init: " + store_1.getState());
var reducer_2 = function (state, action) {
    if (state === void 0) { state = {}; }
    console.log("reducer_2 was called with state " + state + " and action " + action);
    return state;
};
var store_2 = redux_1.createStore(reducer_2);
console.log("store_2 state after init: " + store_2.getState());
var reducer_3 = function (state, action) {
    if (state === void 0) { state = {}; }
    console.log("reducer_3 was called with state " + state + " and action " + action);
    switch (action.type) {
        case 'SAY_SOMETHING':
            return __assign({}, state, { message: action.value });
        default:
            return state;
    }
};
var store_3 = redux_1.createStore(reducer_3);
console.log("store_3 state after init: " + store_3.getState());
//# sourceMappingURL=store.js.map