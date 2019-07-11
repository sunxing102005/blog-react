import React, { useState, useEffect, useCallback } from "react";
import { throttle } from "@/utils/util";
import "./toTop.less";
const offset = 300;
function JoinUs() {
    const [show, setShow] = useState(false);
    function scrollToTop() {
        const timer = window.setInterval(() => {
            let top = document.documentElement.scrollTop;
            let speed = top / 8;
            if (top !== 0) {
                document.documentElement.scrollTop -= speed;
            } else {
                clearInterval(timer);
            }
        }, 20);
    }
    const listenScrollTop = useCallback(e => {
        let scrollTop = document.documentElement.scrollTop;
        if (scrollTop > offset) {
            setShow(true);
        } else {
            setShow(false);
        }
    });

    useEffect(() => {
        window.addEventListener("scroll", throttle(listenScrollTop, 200));
    }, [listenScrollTop]);
    return (
        <div
            className={
                show ? "to-top-container" : "to-top-container hidden-to-top"
            }
            onClick={scrollToTop}
        >
            <i className="fa fa-arrow-up" />
        </div>
    );
}
export default JoinUs;
