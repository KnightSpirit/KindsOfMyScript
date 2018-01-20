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
var styles = require("./selector.less");
// const Selector: React.SFC<SelectorProps> = (props: SelectorProps) => {
//     let langs = [];
//     const optData = props.OptData.map((v: any, ind: any) => {
//       return <option value={v} key={ind}>{v}</option>;
//     });
//     return (
//       <div>
//         <div className={styles.selector}>
//           <div className={styles['lang-panel']}></div>
//           <input type="text" onChange={(e) => getLang(e.currentTarget.value) }/>
//         </div>
//         <div>
//           <ul>
//             {langs}
//           </ul>
//         </div>
//       </div>
//     );
// }
function mapStateToProps(state) {
    return {
        langs: state.langs,
        metals: state.metals,
        showPanel: state.showPanel
    };
}
var Selector = (function (_super) {
    __extends(Selector, _super);
    function Selector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Selector.prototype.getLang = function (con) {
        this.props.dispatch({
            type: 'KEYWORD',
            keyword: con
        });
    };
    Selector.prototype.AddToPanel = function (v) {
        this.props.dispatch({
            type: 'ADD_METAL',
            metalValue: v
        });
    };
    Selector.prototype.DeleteMetal = function (v) {
        this.props.dispatch({
            type: 'DELETE_METAL',
            metalValue: v
        });
    };
    Selector.prototype.render = function () {
        var _this = this;
        var langsData = [], metals = [];
        var optData = this.props.OptData.map(function (v, ind) {
            return React.createElement("option", { value: v, key: ind }, v);
        });
        if (this.props.langs && this.props.showPanel) {
            langsData = this.props.langs.map(function (v, ind) {
                return React.createElement("li", { key: ind, onClick: function () { return _this.AddToPanel(v); } }, v);
            });
        }
        if (this.props.metals) {
            metals = this.props.metals.map(function (v, ind) {
                return (React.createElement("div", { key: ind, className: styles.metal },
                    v,
                    React.createElement("span", { className: styles.close, onClick: function () { return _this.DeleteMetal(v); } }, "X")));
            });
        }
        return (React.createElement("div", null,
            React.createElement("div", { className: styles.selector },
                React.createElement("div", { className: styles['lang-panel'] }, metals),
                React.createElement("input", { type: "text", onChange: function (e) { return _this.getLang(e.currentTarget.value); } })),
            React.createElement("div", { className: styles['lang-selector'] },
                React.createElement("ul", null, langsData))));
    };
    return Selector;
}(React.Component));
exports.default = react_redux_1.connect(mapStateToProps)(Selector);
//# sourceMappingURL=selector.js.map