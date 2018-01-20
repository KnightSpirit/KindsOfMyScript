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
var search_bar_1 = require("./component/search-bar");
var result_panel_1 = require("./component/result-panel");
var react_redux_1 = require("react-redux");
var style = require("./app.less");
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.render = function () {
        return (React.createElement("div", { className: style.app },
            React.createElement(search_bar_1.default, null),
            React.createElement(result_panel_1.default, null)));
    };
    return Main;
}(React.Component));
exports.default = react_redux_1.connect()(Main);
//# sourceMappingURL=Main.js.map