var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var React = /** @class */ (function () {
    function React() {
    }
    return React;
}());
//@visible
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Component.prototype.super = function () {
    };
    return Component;
}(React));
var ComponentVisible = /** @class */ (function (_super) {
    __extends(ComponentVisible, _super);
    function ComponentVisible() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            visible: true
        };
        return _this;
    }
    ComponentVisible.prototype.render = function () {
        return this.state.visible ? ('<div />') : null;
    };
    return ComponentVisible;
}(React));
function visible(WrappedComponent) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {
                visible: true
            };
            return _this;
        }
        class_1.prototype.render = function () {
            return false === this.state.visible
                ? null
                : _super.prototype.render.call(this);
        };
        return class_1;
    }(WrappedComponent));
}
