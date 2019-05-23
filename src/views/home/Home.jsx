import React from "react";
import HeaderImgs from "./headImgs/HeaderImgs";
import BlogList from "@/components/blogList/BlogList";
import "./home.less";
import ToTop from "@/components/toTop/ToTop";

import LeftContainerWhole from "@/components/leftContainerWhole/LeftContainerWhole";
export default class Home extends React.Component {
    render() {
        return (
            <div className="article-container">
                <HeaderImgs />
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <BlogList className="blog-list" />
                    <LeftContainerWhole />
                </div>
                <ToTop />
            </div>
        );
    }
}
