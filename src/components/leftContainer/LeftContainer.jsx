import React from "react";
import "./leftContainer.less";
export default class LeftContainer extends React.Component {
    render() {
        const { title, children, style, id, className } = this.props;
        return (
            <div
                className={
                    className ? `left-container ${className}` : "left-container"
                }
                style={style}
                id={id}
            >
                <h2 className="title">{title}</h2>
                {children}
            </div>
        );
    }
}
