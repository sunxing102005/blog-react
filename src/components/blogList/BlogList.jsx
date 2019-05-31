import React from "react";
import { blogLists } from "@/enums/home";
import "./blogList.less";
import scrollReveal from "scrollReveal";
import LazyLoad from "react-lazyload";
import { getBlogList } from "@/api/content";
import { deleteHTMLTag } from "@/utils/util";
import dateUtil from "@/utils/date";
import { toContentById } from "@/utils/common";
import config from "@/config/index.js";
class BlogList extends React.Component {
    constructor(props) {
        super(props);
        this.scrollReveal = scrollReveal();
    }
    state = {
        list: [],
        recentBLogs: []
    };
    componentWillMount() {
        let params = {};
        let type = this.props.type;
        if (type) {
            params["category_id"] = type == "tech" ? "1" : "2";
        }
        getBlogList(params).then(res => {
            let list = res.content;
            list = list.map(item => {
                let date = null;
                if (item.publish_time) {
                    date = dateUtil.toFormat(
                        new Date(item.publish_time),
                        "yyyy-MM-dd"
                    );
                }
                return {
                    ...item,
                    des: deleteHTMLTag(item.content),
                    date
                };
            });
            this.setState({ list });
        });
    }
    componentDidMount() {
        //设置 blog-item 滚动动画效果
        this.scrollReveal.reveal(".blog-item", {
            // 动画的时长
            duration: 1000,
            // 延迟时间
            // delay: 500,
            // 动画开始的位置，'bottom', 'left', 'top', 'right'
            origin: "bottom",
            // 回滚的时候是否再次触发动画
            reset: true,
            // 在移动端是否使用动画
            mobile: false,
            // 滚动的距离，单位可以用%，rem等
            distance: "25px",
            // 其他可用的动画效果
            opacity: 0,
            easing: "ease-in-out"
            // easing: "cubic-bezier(0.5, 0, 0, 1)"
        });
    }
    toDetailBlog = id => {
        toContentById(id);
    };
    render() {
        let list = this.state.list;
        return (
            <div className="blog-list-container">
                {list.map((item, index) => {
                    return (
                        // <LazyLoad key={index} debounce={500}>
                        <div
                            className="blog-item"
                            key={index}
                            onClick={() => this.toDetailBlog(item.id)}
                        >
                            <h3 className="blog-title">{item.title}</h3>
                            <div className="blog-wrapper">
                                <img src={config.serverHost + item.thumb} />
                                <p
                                    className={[
                                        "blog-des",
                                        item.thumb ? "" : "no-pic"
                                    ].join(" ")}
                                >
                                    {item.des}
                                </p>
                                <div className="blog-tag">
                                    <ul>
                                        <li className="author">
                                            <i className="fa fa-user icon" />
                                            {"孙星"}
                                        </li>
                                        <li className="tag">
                                            <i className="fa fa-server icon" />
                                            {item.category.name}
                                        </li>
                                        {item.date ? (
                                            <li className="time">
                                                {" "}
                                                <i className="fa fa-clock-o icon" />
                                                {item.date}
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        <li className="views">
                                            <i className="fa fa-eye icon" />
                                            {item.view}
                                        </li>
                                        <li className="likes">
                                            <i className="fa fa-heart icon" />
                                            {item.likes ? item.likes : 0}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        // </LazyLoad>
                    );
                })}
            </div>
        );
    }
}
BlogList.defaultProps = {
    category_id: null
};
export default BlogList;
