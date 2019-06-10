import React from "react";
import "./headerImgs.less";
import LeftImg from "../leftImg/LeftImg";
import { shufflingImgs } from "@/enums/home";
import { getRecent } from "@/api/content";
import { toContentById } from "@/utils/common";
import config from "@/config/index.js";
export default class HeaderImgs extends React.Component {
    constructor(props) {
        super(props);
        this.handleControlPage = this.handleControlPage.bind(this);
        this.changeCurrIndex = this.changeCurrIndex.bind(this);
    }
    state = {
        currIndex: 0,
        recentBlogs: []
    };

    componentDidMount() {
        this.getRecentFiveBlog();
    }
    getRecentFiveBlog = () => {
        getRecent().then(res => {
            let blogs = res.recent.content;
            // console.log("blogs", res);
            this.setState({ recentBlogs: blogs });
            window.setInterval(() => {
                // console.log("this.state.currIndex ", this.state.currIndex);
                this.changeCurrIndex(1);
            }, 5000);
        });
    };
    handleControlPage(type) {
        const increment = type === "left" ? -1 : 1;
        this.changeCurrIndex(increment);
    }
    changeCurrIndex(increment) {
        if (this.state.currIndex < 2) {
            this.setState(preState => ({
                currIndex: preState.currIndex + increment
            }));
        } else {
            this.setState({ currIndex: 0 });
        }
    }
    toDetail = id => {
        toContentById(id);
    };
    render() {
        const left = "<";
        const right = ">";
        let shuffleImgs = this.state.recentBlogs.slice(0, 3);
        let leftImgsArr = this.state.recentBlogs.slice(3);
        let leftImgData = leftImgsArr.map(item => {
            return {
                src: item.thumb,
                id: item.id,
                tTitle: item.category.name,
                bTitle: item.title
            };
        });
        // console.log("shuffleImgs", shuffleImgs);
        return (
            <div className="header-imgs-container">
                <div className="shuffling-container">
                    {shuffleImgs.map((item, index) => (
                        <div
                            className={`shuffle-item ${
                                index === this.state.currIndex ? "show" : ""
                            }`}
                            key={index}
                            onClick={this.toDetail.bind(this, item.id)}
                        >
                            <img src={item.thumb} />
                            <div className="img-des">{item.title}</div>
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
                        <div
                            className="tip left"
                            onClick={() => this.handleControlPage("left")}
                        >
                            {left}
                        </div>
                        <div
                            className="tip right"
                            onClick={() => this.handleControlPage("right")}
                        >
                            {right}
                        </div>
                    </div>
                </div>
                <div className="rightImgs">
                    {leftImgData.map((item, index) => (
                        <LeftImg
                            className="left-img-item"
                            {...item}
                            key={index}
                            onClick={this.toDetail.bind(this, item.id)}
                        />
                    ))}
                </div>
            </div>
        );
    }
}
