import React from "react";
import "./leftImg.less";
export default class LeftImg extends React.Component {
    handleClick = () => {
        const { onClick } = this.props;
        debugger;
        onClick();
    };
    render() {
        const { src, bTitle, tTitle } = this.props;

        return (
            <div className="left-img-container">
                <img src={src} onClick={this.handleClick} />
                <div className="bottom-title">{bTitle}</div>
                <div className="top-title">{tTitle}</div>
            </div>
        );
    }
}
