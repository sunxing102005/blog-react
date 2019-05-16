import React from "react";
import "./headerImgs.less";
import LeftImg from "../leftImg/LeftImg";
import { shufflingImgs, leftImgs } from "@/enums/home";
export default class HeaderImgs extends React.Component {
    constructor(props) {
        super(props);
        this.handleControlPage = this.handleControlPage.bind(this);
        this.changeCurrIndex = this.changeCurrIndex.bind(this);
    }
    state = {
        currIndex: 0
    };

    componentDidMount() {
        window.setInterval(() => {
            // console.log("this.state.currIndex ", this.state.currIndex);
            this.changeCurrIndex(1);
        }, 5000);
    }
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
                    {leftImgs.map((item, index) => (
                        <LeftImg
                            className="left-img-item"
                            {...item}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        );
    }
}
