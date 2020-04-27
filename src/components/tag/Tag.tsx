import * as React from "react";
import "./tag.less";
type propType = {
    color: string;
    text: string;
};
export default class Tag extends React.Component<propType, {}> {
    render() {
        const { color, text } = this.props;
        return <div className={`self-tag ${color}`}>{text}</div>;
    }
}
