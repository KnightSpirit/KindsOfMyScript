"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getTop20RepByLang: function (lang) {
        return function (dispatch) {
            setTimeout(function () {
                dispatch({
                    type: 'CHANGE_RESULT',
                    result: []
                });
            }, 2000);
        };
    }
};
//# sourceMappingURL=action.js.map