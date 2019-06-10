import React from "react";
// import { recommandList } from "@/enums/home";
import "./recommandList.less";
import { toContentById } from "@/utils/common";
import config from "@/config/index.js";
export default class RecommandList extends React.Component {
    toDetail = id => {
        toContentById(id);
    };
    render() {
        const { recommandList } = this.props;
        return (
            <div className="recmmand-contaner">
                {recommandList.map((item, index) => {
                    if (index === 0) {
                        return (
                            <div
                                className="top-img"
                                key={index}
                                onClick={this.toDetail.bind(this, item.id)}
                            >
                                <img src={item.thumb} />
                                <div className="top-title">{item.title}</div>
                            </div>
                        );
                    } else {
                        return (
                            <div
                                className="bottom-wrapper"
                                key={index}
                                onClick={this.toDetail.bind(this, item.id)}
                            >
                                <div className="left-recommand-container">
                                    <img src={item.thumb} />
                                </div>
                                <p className="right-title">{item.title}</p>
                                <span className="right-time">{item.date}</span>
                            </div>
                        );
                    }
                })}
            </div>
        );
    }
}
