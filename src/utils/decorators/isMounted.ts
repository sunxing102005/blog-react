import * as ReactDOM from "react-dom";
import * as React from "react";
export function isMounted(component: React.Component) {
    try {
        ReactDOM.findDOMNode(component);
        return true;
    } catch (e) {
        return false;
    }
}
