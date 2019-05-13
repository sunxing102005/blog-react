import React from "react";
import "./headerImgs.less";
const shufflingImgs = [
    {
        src: "/src/assets/images/banner01.jpg",
        text: "别让这些闹心的套路，毁了你的网页设计!"
    },
    {
        src: "/src/assets/images/banner02.jpg",
        text: "网页中图片属性固定宽度，如何用js改变大小"
    },
    {
        src: "/src/assets/images/banner03.jpg",
        text: "个人博客，属于我的小世界"
    }
];
export default class HeaderImgs extends React.Component {
    state = {
        currIndex: 1
    };
    render() {
        const left = "<";
        const right = ">";
        return (
            <div className="header-imgs-container">
                <div className="shuffling-container">
                    {shufflingImgs.map((item, index) => (
                        <div
                            className={`shuffle-item ${
                                index === this.state.currIndex ? "show" : ""
                            }`}
                            key={index}
                        >
                            <img src={item.src} />
                            <div className="img-des">{item.text}</div>
                        </div>
                    ))}
                    <ul className="shuffle-spot">
                        {shufflingImgs.map((spot, index) => (
                            <li
                                className={`spot ${
                                    index === this.state.currIndex ? "show" : ""
                                } `}
                                key={index}
                            />
                        ))}
                    </ul>
                    <div className="control-page">
                        <div className="tip left">{left}</div>
                        <div className="tip right">{right}</div>
                    </div>
                </div>
                <div className="rightImgs" />
            </div>
        );
    }
}
