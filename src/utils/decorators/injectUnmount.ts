import * as React from "react";

export const injectUnmount =
    // = function() {
    //     return
    <T extends { new (...args: any[]): {} }>(Component: T) => {
        const willUnmount = Component.prototype.componentWillUnmount;
        Component.prototype.componentWillUnmount = function() {
            if (willUnmount) {
                willUnmount.apply(this, arguments);
            }
            this.unmount = true;
        };
        const setState = Component.prototype.setState;
        Component.prototype.setState = function() {
            if (this.unmount) return;
            setState.apply(this, arguments);
        };
        return Component;
        // };
    };
