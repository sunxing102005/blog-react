import React from "react";
import BlogList from "@/components/blogList/BlogList";
import ToTop from "@/components/toTop/ToTop";
import LeftContainerWhole from "@/components/leftContainerWhole/LeftContainerWhole";
import "./typeBlog.less";
export default class Home extends React.Component {
    render() {
        const { type, name } = this.props;
        return (
            <div>
                <div className="bg-img" />
                <div className="type-container">
                    <div className="top-tip">{name}</div>
                    <div style={{ display: "flex", alignItems: "flex-start" }}>
                        <BlogList className="blog-list" type={type} />
                        <LeftContainerWhole />
                    </div>
                    <ToTop />
                </div>
            </div>
        );
    }
}
