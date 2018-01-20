"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (_a) {
    var dispatch = _a.dispatch, getState = _a.getState;
    return function (next) {
        return function (action) {
            return typeof action === 'function' ? action(dispatch, getState) : next(action);
        };
    };
};
//# sourceMappingURL=thunkMiddleware.js.map