import React, { useState, useEffect, useCallback } from "react";
import "./headerImgs.less";
import LeftImg from "../leftImg/LeftImg";
import { shufflingImgs } from "@/enums/home";
import { getRecent } from "@/api/content";
import { toContentById } from "@/utils/common";
function HeaderImgs(props) {
    const [currIndex, setCurrIndex] = useState(0);
    const [recentBlogs, setRecentBlogs] = useState([]);

    const changeCurrIndex = useCallback(increment => {
        if (currIndex < 2) {
            setCurrIndex(currIndex + increment);
        } else {
            setCurrIndex(0);
        }
        // eslint-disable-next-line
    }, []);
    const handleControlPage = type => {
        const increment = type === "left" ? -1 : 1;
        changeCurrIndex(increment);
    };
    const toDetail = id => {
        toContentById(id);
    };
    useEffect(() => {
        let timer = null;
        getRecent().then(res => {
            let blogs = res.recent.content;
            setRecentBlogs(blogs);
            timer = window.setInterval(() => {
                changeCurrIndex(1);
            }, 5000);
        });
        return clearInterval(timer);
    }, [changeCurrIndex]);
    //variables
    const left = "<";
    const right = ">";
    let shuffleImgs = recentBlogs.slice(0, 3);
    let leftImgsArr = recentBlogs.slice(3);
    let leftImgData = leftImgsArr.map(item => {
        return {
            src: item.thumb,
            id: item.id,
            tTitle: item.category.name,
            bTitle: item.title
        };
    });
    return (
        <div className="header-imgs-container">
            <div className="shuffling-container">
                {shuffleImgs.map((item, index) => (
                    <div
                        className={`shuffle-item ${
                            index === currIndex ? "show" : ""
                        }`}
                        key={index}
                        onClick={() => toDetail(item.id)}
                    >
                        <img src={item.thumb} />
                        <div className="img-des">{item.title}</div>
                    </div>
                ))}
                <ul className="shuffle-spot">
                    {shufflingImgs.map((spot, index) => (
                        <li
                            className={`spot ${
                                index === currIndex ? "show" : ""
                            } `}
                            key={index}
                        />
                    ))}
                </ul>
                <div className="control-page">
                    <div
                        className="tip left"
                        onClick={() => handleControlPage("left")}
                    >
                        {left}
                    </div>
                    <div
                        className="tip right"
                        onClick={() => handleControlPage("right")}
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
                        onClick={() => toDetail(item.id)}
                    />
                ))}
            </div>
        </div>
    );
}
export default HeaderImgs;
