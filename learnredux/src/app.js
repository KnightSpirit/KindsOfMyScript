"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var redux_thunk_1 = require("redux-thunk");
var reducer_1 = require("./reducer");
var Main_1 = require("./Main");
var GithubStarSearch = (function (_super) {
    __extends(GithubStarSearch, _super);
    function GithubStarSearch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GithubStarSearch.prototype.render = function () {
        var store = redux_1.applyMiddleware(redux_thunk_1.default)(redux_1.createStore)(reducer_1.default);
        return (React.createElement(react_redux_1.Provider, { store: store },
            React.createElement(Main_1.default, null)));
    };
    return GithubStarSearch;
}(React.Component));
ReactDOM.render(React.createElement(GithubStarSearch, null), document.getElementById("app"));
//# sourceMappingURL=app.js.map