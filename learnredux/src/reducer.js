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
var metals = new Set();
function reducer(state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case 'CHANGE_RESULT':
            return __assign({}, state, { result: action.result });
        case 'KEYWORD':
            var langType = ['java', 'javascript', 'c#', 'c++'];
            return __assign({}, state, { langs: langType.filter(function (v) { return v.includes(action.keyword); }), showPanel: true });
        case 'ADD_METAL':
            metals.add(action.metalValue);
            return __assign({}, state, { metals: Array.from(metals), showPanel: false });
        case 'DELETE_METAL':
            metals.delete(action.metalValue);
            return __assign({}, state, { metals: Array.from(metals) });
    }
    return state;
}
exports.default = reducer;
//# sourceMappingURL=reducer.js.map