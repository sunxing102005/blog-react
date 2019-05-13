import React from "react";
import HeaderImgs from "./headImgs/HeaderImgs";
import "./home.less";
export default class Layout extends React.Component {
    render() {
        return (
            <article className="article-container">
                <HeaderImgs />
            </article>
        );
    }
}
