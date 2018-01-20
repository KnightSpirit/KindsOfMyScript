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
var react_redux_1 = require("react-redux");
var actionCreator = require("./action");
var selector_1 = require("./selector");
// const SearchBar = (props: any) => {
//   const d = [1,2,3,4,];
//   return (
//     <div>
//       <input type="text"/>
//       <Selector OptData={d} />
//       <input type="button" value="搜索"/>
//     </div>
//   )
// }
var SearchBar = (function (_super) {
    __extends(SearchBar, _super);
    function SearchBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchBar.prototype.changeResult = function () {
        this.props.dispatch(actionCreator.default.getTop20RepByLang('ads'));
    };
    SearchBar.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("input", { type: "text" }),
            " ",
            React.createElement("input", { onClick: function () { return _this.changeResult(); }, type: "button", value: "搜索" }),
            React.createElement(selector_1.default, { OptData: [1, 2, 3, 4, 5, 6] })));
    };
    return SearchBar;
}(React.Component));
exports.default = react_redux_1.connect()(SearchBar);
//# sourceMappingURL=search-bar.js.map