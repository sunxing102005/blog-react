import React from "react";
// import { recommandList } from "@/enums/home";
import "./recommandList.less";
export default class RecommandList extends React.Component {
    render() {
        const { recommandList } = this.props;
        return (
            <div className="recmmand-contaner">
                {recommandList.map((item, index) => {
                    if (index === 0) {
                        return (
                            <div className="top-img" key={index}>
                                <img src={item.src} />
                                <div className="top-title">{item.title}</div>
                            </div>
                        );
                    } else {
                        return (
                            <div className="bottom-wrapper" key={index}>
                                <div className="left-recommand-container">
                                    <img src={item.src} />
                                </div>
                                <p className="right-title">{item.title}</p>
                                <span className="right-time">{item.time}</span>
                            </div>
                        );
                    }
                })}
            </div>
        );
    }
}
