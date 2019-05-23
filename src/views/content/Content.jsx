import React from "react";
import "./content.less";
import TagGroup from "@/components/tag/TagGroup";
import { getBlogById } from "@/api/content";
import LeftContainerWhole from "@/components/leftContainerWhole/LeftContainerWhole";
import { withRouter } from "react-router-dom";
export default
@withRouter
class Content extends React.Component {
    state = {
        article: {}
    };
    componentWillMount() {
        const { location } = this.props;
        let id = location.search;
        if (id) {
            getBlogById({ id }).then(res => {
                this.setState({ article: res });
                console.log("content", res);
            });
        }
    }
    render() {
        return (
            <div className="content-container">
                <div className="top-tip">个人博客内容页</div>

                <div className="bottom-container">
                    <div className="bottom-left-container">
                        <div className="content-wrapper">
                            <h2>个人博客，属于我的小世界！</h2>
                        </div>
                        <ul className="info">
                            <li className="author">
                                <i className="fa fa-user icon" />
                                {"孙星"}
                            </li>
                            <li className="tag">
                                <i className="fa fa-server icon" />
                                {"技术博客"}
                            </li>
                            <li className="time">
                                <i className="fa fa-clock-o icon" />
                                {"2019-09-09"}
                            </li>
                            <li className="views">
                                <i className="fa fa-eye icon" />
                                {1000}
                            </li>
                            <li className="likes">
                                <i className="fa fa-heart icon" />
                                {500}
                            </li>
                        </ul>
                        <TagGroup
                            list={["ThinkJs", "Vue"]}
                            style={{ marginTop: "0.2rem" }}
                        />
                        <div className="blog-content">博客内容</div>
                        <div className="star-container">
                            <div className="star">
                                <i className="fa fa-thumbs-up" />
                                <span> 很赞哦！</span>
                                <span>(13)</span>
                            </div>
                            <div className="star support">
                                <i className="fa fa-rmb" />
                                <span> 打赏本站</span>
                            </div>
                        </div>
                        <p className="page">
                            上一篇：作为一个设计师,如果遭到质疑你是否能恪守自己的原则？
                        </p>
                        <p>下一篇：总结个人博客经历</p>
                        <div className="bottom-article">
                            <div className="bottom-title">
                                <i className="fa fa-book icon" />
                                相关文章
                            </div>
                            <div className="link-article">
                                html5个人博客模板主题《心蓝时间轴》
                            </div>
                            <div className="link-article">
                                html5个人博客模板主题《心蓝时间轴》
                            </div>
                            <div className="link-article">
                                html5个人博客模板主题《心蓝时间轴》
                            </div>
                            <div className="link-article">
                                html5个人博客模板主题《心蓝时间轴》
                            </div>
                        </div>
                        <div className="bottom-article">
                            <div className="bottom-title">
                                <i className="fa fa-comment icon" />
                                评论
                            </div>
                        </div>
                    </div>

                    <LeftContainerWhole />
                </div>
            </div>
        );
    }
}
