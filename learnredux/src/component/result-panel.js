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
var ResultPanel = (function (_super) {
    __extends(ResultPanel, _super);
    function ResultPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResultPanel.prototype.render = function () {
        var result = this.props.result;
        var resDemo = {};
        if (result) {
            resDemo = (React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("div", null,
                        React.createElement("span", null, "ProName 1"),
                        React.createElement("span", null, "Star")),
                    React.createElement("div", null, "Introduce"))));
        }
        else {
            resDemo = (React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("div", null,
                        React.createElement("span", null, "ProName 1"),
                        React.createElement("span", null, "Star")),
                    React.createElement("div", null, "Introduce")),
                React.createElement("li", null,
                    React.createElement("div", null,
                        React.createElement("span", null, "ProName 1"),
                        React.createElement("span", null, "Star")),
                    React.createElement("div", null, "Introduce")),
                React.createElement("li", null,
                    React.createElement("div", null,
                        React.createElement("span", null, "ProName 2"),
                        React.createElement("span", null, "Star")),
                    React.createElement("div", null, "Introduce")),
                React.createElement("li", null,
                    React.createElement("div", null,
                        React.createElement("span", null, "ProName 3"),
                        React.createElement("span", null, "Star")),
                    React.createElement("div", null, "Introduce"))));
        }
        return (React.createElement("section", null, resDemo));
    };
    return ResultPanel;
}(React.Component));
function mapStateToProps(state) {
    return {
        result: state.result
    };
}
exports.default = react_redux_1.connect(mapStateToProps)(ResultPanel);
//# sourceMappingURL=result-panel.js.map