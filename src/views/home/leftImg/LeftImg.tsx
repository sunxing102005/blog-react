import * as React from "react";
import "./leftImg.less";
type propType = {
    onClick?: Function;
    src?: string;
    bTitle?: string;
    tTitle?: string;
};
export default class LeftImg extends React.Component<propType, {}> {
    handleClick = () => {
        const { onClick } = this.props;
        onClick!();
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
