import React from "react";
import "./specialArt.less";
export default class SpecialArt extends React.Component {
    render() {
        const { title, src } = this.props;
        return (
            <div className="special-art-container">
                <img src={src} />
                <div className="content-wrapper">
                    <p className="title-special">{title}</p>
                    <div className="readBtn">阅读</div>
                </div>
            </div>
        );
    }
}
