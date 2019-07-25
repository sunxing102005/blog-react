import React from "react";
import "./content.less";
// import { message } from "antd";
import TagGroup from "@/components/tag/TagGroup";
import { getBlogById, changeLikes, getLastNextBlog } from "@/api/content";
import LeftContainerWhole from "@/components/leftContainerWhole/LeftContainerWhole";
import { withRouter } from "react-router-dom";
import { queryString } from "@/utils/common";
import dateUtil from "@/utils/date";
import { toContentById } from "@/utils/common";

class Content extends React.Component {
    state = {
        article: {},
        isLiked: false,
        lastBlog: null,
        nextBlog: null
    };
    async componentWillMount() {
        this.init();
    }
    async componentWillReceiveProps() {
        this.init();
    }
    init = async () => {
        const { location } = this.props;
        let id = queryString(location.search).id;
        // console.log("cotentid", id);
        if (id) {
            await this.getArticleById({ id });
            console.log(
                "this.state.article.publish_time",
                this.state.article.publish_time
            );
            this.fetchLastNextBlog();
        }
    };
    fetchLastNextBlog = () => {
        getLastNextBlog({ date: this.state.article.publish_time }).then(res => {
            console.log("getLastNextBlog", res);
            this.setState({ lastBlog: res.lastBlog, nextBlog: res.nextBlog });
        });
    };
    getArticleById = params => {
        return getBlogById(params).then(res => {
            this.setState({ article: res.content });
        });
    };
    likeNConcel = () => {
        changeLikes({
            id: this.state.article.id,
            type: this.state.isLiked ? "minus" : "plus"
        }).then(res => {
            // message.success(res.msg);
            this.setState(preState => {
                return { isLiked: !preState.isLiked };
            });
            this.getArticleById({ id: this.state.article.id });
        });
    };
    toNeighbourPage = type => {
        const { history } = this.props;
        console.log("type", type);
        console.log("this.state.nextBlog[0]", this.state.lastBlog[0]);
        if (type == "next") {
            if (this.state.nextBlog && this.state.nextBlog.length) {
                history.push("/content?id=" + this.state.nextBlog[0].id);
                // toContentById(this.state.nextBlog[0].id);
            }
        } else if (type == "last") {
            if (this.state.lastBlog && this.state.lastBlog.length) {
                // toContentById(this.state.lastBlog[0].id);
                history.push("/content?id=" + this.state.lastBlog[0].id);
            }
        }
    };
    render() {
        const article = this.state.article;
        const lastBlog =
            this.state.lastBlog && this.state.lastBlog.length ? (
                <span>上一篇：{this.state.lastBlog[0].title}</span>
            ) : (
                ""
            );
        const nextBlog =
            this.state.nextBlog && this.state.nextBlog.length ? (
                <span>下一篇：{this.state.nextBlog[0].title}</span>
            ) : (
                ""
            );
        console.log("nextBlognextBlog", nextBlog);
        return (
            <div
                className="content-container"
                key={this.state.article.id ? this.state.article.id : "99"}
            >
                <div className="top-tip">个人博客内容页</div>

                <div className="bottom-container">
                    <div className="bottom-left-container">
                        <div className="content-wrapper">
                            <h2>{article.title}</h2>
                        </div>
                        <ul className="info">
                            <li className="author">
                                <i className="fa fa-user icon" />
                                {"孙星"}
                            </li>
                            <li className="tag">
                                <i className="fa fa-server icon" />
                                {article.category && article.category.name}
                            </li>
                            <li className="time">
                                <i className="fa fa-clock-o icon" />
                                {dateUtil.toFormat(
                                    new Date(article.publish_time),
                                    "yyyy-MM-dd"
                                )}
                            </li>
                            <li className="views">
                                <i className="fa fa-eye icon" />
                                {article.view}
                            </li>
                            <li className="likes">
                                <i className="fa fa-heart icon" />
                                {article.like ? article.like : 0}
                            </li>
                        </ul>
                        <TagGroup
                            list={["ThinkJs", "Vue"]}
                            style={{ marginTop: "0.2rem" }}
                        />
                        <div
                            className="blog-content"
                            dangerouslySetInnerHTML={{
                                __html: article.content
                            }}
                        />
                        <div className="star-container">
                            <div
                                className={
                                    this.state.isLiked ? "star liked" : "star"
                                }
                                onClick={this.likeNConcel}
                            >
                                <i className="fa fa-thumbs-up" />
                                <span> 很赞哦！</span>
                                <span>({article.like ? article.like : 0})</span>
                            </div>
                            <div className="star support">
                                <i className="fa fa-rmb" />
                                <span> 打赏本站</span>
                            </div>
                        </div>
                        <p
                            onClick={this.toNeighbourPage.bind(this, "last")}
                            className="page"
                            style={{ marginTop: ".5rem" }}
                        >
                            {lastBlog ? lastBlog : ""}
                        </p>
                        <p
                            className="page"
                            onClick={this.toNeighbourPage.bind(this, "next")}
                        >
                            {" "}
                            {nextBlog ? nextBlog : ""}
                        </p>
                        {/* <div className="bottom-article">
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
                        </div> */}
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
export default withRouter(Content);
