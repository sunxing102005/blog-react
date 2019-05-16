import React from "react";
import "./leftImg.less";
export default class LeftImg extends React.Component {
    render() {
        const { src, bTitle, tTitle } = this.props;

        return (
            <div className="left-img-container">
                <img src={src} />
                <div className="bottom-title">{bTitle}</div>
                <div className="top-title">{tTitle}</div>
            </div>
        );
    }
}
