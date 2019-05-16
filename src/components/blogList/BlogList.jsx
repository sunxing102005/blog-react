import React from "react";
import { blogLists } from "@/enums/home";
import "./blogList.less";
import scrollReveal from "scrollReveal";
import LazyLoad from "react-lazyload";
export default class BlogList extends React.Component {
    constructor(props) {
        super(props);
        this.scrollReveal = scrollReveal();
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
    render() {
        return (
            <div className="blog-list-container">
                {blogLists.map((item, index) => {
                    return (
                        // <LazyLoad key={index} debounce={500}>
                        <div className="blog-item" key={index}>
                            <h3 className="blog-title">{item.title}</h3>
                            <div className="blog-wrapper">
                                <img src={item.img} />
                                <p
                                    className={[
                                        "blog-des",
                                        item.img ? "" : "no-pic"
                                    ].join(" ")}
                                >
                                    {item.des}
                                </p>
                                <div className="blog-tag">
                                    <ul>
                                        <li className="author">
                                            <i className="fa fa-user icon" />
                                            {item.author}
                                        </li>
                                        <li className="tag">
                                            <i className="fa fa-server icon" />
                                            {item.type}
                                        </li>
                                        <li className="time">
                                            <i className="fa fa-clock-o icon" />
                                            {item.time}
                                        </li>
                                        <li className="views">
                                            <i className="fa fa-eye icon" />
                                            {item.views}
                                        </li>
                                        <li className="likes">
                                            <i className="fa fa-heart icon" />
                                            {item.likes}
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
