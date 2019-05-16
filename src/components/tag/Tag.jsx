import React from "react";
import "./tag.less";
export default class Tag extends React.Component {
    render() {
        const { color, text } = this.props;
        return <div className={`self-tag ${color}`}>{text}</div>;
    }
}
