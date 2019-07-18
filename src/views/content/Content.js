import React, { useState, useEffect, useCallback } from "react";
import "./content.less";
import TagGroup from "@/components/tag/TagGroup";
import { getBlogById, changeLikes, getLastNextBlog } from "@/api/content";
import LeftContainerWhole from "@/components/leftContainerWhole/LeftContainerWhole";
import { withRouter } from "react-router-dom";
import { queryString } from "@/utils/common";
import dateUtil from "@/utils/date";
import Toast from "@/components/common/toast/index";
import useToggle from "@/hooks/useToggle";
import "gitalk/dist/gitalk.css";
import Gitalk from "gitalk";
function Content(props) {
    const [article, setArticle] = useState({});
    const [lastBlog, setLastBlog] = useState(null);
    const [nextBlog, setNextBlog] = useState(null);
    const [isLiked, toggleIsliked] = useToggle(false);
    const { location } = props;
    const fetchLastNextBlog = useCallback(() => {
        getLastNextBlog({ date: article.publish_time }).then(res => {
            setLastBlog(res.lastBlog);
            setNextBlog(res.nextBlog);
        });
    }, [article.publish_time]);
    const getArticleById = params => {
        return getBlogById(params).then(res => {
            setArticle(res.content);
        });
    };

    const likeNConcel = () => {
        changeLikes({
            id: article.id,
            type: isLiked ? "minus" : "plus"
        }).then(res => {
            isLiked ? Toast.warning("点赞取消！") : Toast.info("点赞成功！");
            toggleIsliked();
            getArticleById({ id: article.id });
        });
    };
    const toNeighbourPage = type => {
        const { history } = props;
        if (type == "next") {
            if (nextBlog && nextBlog.length) {
                history.push("/content?id=" + nextBlog[0].id);
            }
        } else if (type == "last") {
            if (lastBlog && lastBlog.length) {
                history.push("/content?id=" + lastBlog[0].id);
            }
        }
    };
    const lastBlogEle =
        lastBlog && lastBlog.length ? (
            <span>上一篇：{lastBlog[0].title}</span>
        ) : (
            ""
        );
    const nextBlogEle =
        nextBlog && nextBlog.length ? (
            <span>下一篇：{nextBlog[0].title}</span>
        ) : (
            ""
        );
    useEffect(() => {
        let id = queryString(location.search).id;
        if (id) {
            getArticleById({ id });
            fetchLastNextBlog();
            const gitalk = new Gitalk({
                clientID: "7d15c88f5ede69d86dbd",
                clientSecret: "df8c1217e3614b779763054c0f5ecdda05c3362e",
                repo: "blog-react",
                owner: "sunxing102005",
                admin: ["sunxing102005"],
                distractionFreeMode: false // Facebook-like distraction free mode
            });

            gitalk.render("comment-content");
        }
    }, [fetchLastNextBlog, location.search]);
    return (
        <div className="content-container" key={article.id ? article.id : "99"}>
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
                            className={isLiked ? "star liked" : "star"}
                            onClick={likeNConcel}
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
                        onClick={() => toNeighbourPage("last")}
                        className="page"
                        style={{ marginTop: ".5rem" }}
                    >
                        {lastBlogEle ? lastBlogEle : ""}
                    </p>
                    <p className="page" onClick={() => toNeighbourPage("next")}>
                        {nextBlogEle ? nextBlogEle : ""}
                    </p>
                    <div className="bottom-article">
                        <div className="bottom-title">
                            <i className="fa fa-comment icon" />
                            评论
                        </div>
                        <div id="comment-content" />
                    </div>
                </div>

                <LeftContainerWhole />
            </div>
        </div>
    );
}
export default withRouter(Content);
