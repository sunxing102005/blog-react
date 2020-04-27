import React from "react";
import LeftContainer from "@/components/leftContainer/LeftContainer";
import { throttle } from "@/utils/util";
import "./joinUs.less";
export default class JoinUs extends React.Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
    }
    state = {
        className: "",
        throttle: null
    };
    componentDidMount() {
        // let followmeScrollTop = document.getElementById("fellowMe").offsetTop;
        // this.followmeScrollTop = followmeScrollTop;
        // console.log("followmeScrollTop", followmeScrollTop);
        console.log("component mounted");
        this.throttle = throttle(this.handleScroll, 200);
        window.addEventListener("scroll", this.throttle);
    }
    componentWillUnmount() {
        console.log("component destory");
        window.removeEventListener("scroll", this.throttle);
    }
    handleScroll(e) {
        let scrollTop = document.documentElement.scrollTop;
        let followmeScrollTop = this.props.followmeScrollTop;
        if (followmeScrollTop == 0) {
            return;
        }
        // console.log("followmeScrollTop", followmeScrollTop);
        // console.log("scrollTop", scrollTop); // console.log("flag", scrollTop - followmeScrollTop > 0);
        if (scrollTop - followmeScrollTop > 0) {
            this.setState({ className: "fixed-join" });
        } else {
            this.setState({ className: "" });
        }
        // console.log("scroll", scrollTop);
    }
    render() {
        return (
            <LeftContainer
                title="关注我"
                id="fellowMe"
                className={this.state.className}
            >
                <div className="join-container">
                    <div className="com-item sina">
                        <i className="fa fa-tecent-weibo com-icon" />
                        <span className="content-com">孙星微博</span>
                        <div className="com-name">新浪微博</div>
                    </div>
                    <div className="com-item tecent">
                        <i className="fa fa-weibo com-icon" />
                        <span className="content-com">孙星微博</span>
                        <div className="com-name">腾讯微博</div>
                    </div>
                    <div className="com-item qq">
                        <i className="fa fa-qq com-icon" />
                        <span className="content-com">1020059568</span>
                        <div className="com-name">QQ号</div>
                    </div>
                    <div className="com-item email">
                        <i className="fa fa-envelope com-icon" />
                        <span className="content-com">1020059568@qq.com</span>
                        <div className="com-name">邮箱账号</div>
                    </div>
                    <div className="com-item wechat">
                        <i className="fa fa-wechat com-icon" />
                        <span className="content-com">sunxing102005</span>
                        <div className="com-name">微信号</div>
                    </div>
                    <div>
                        <img
                            style={{ width: "100%" }}
                            src="http://cdn.sunx.club/wechat-sunx.jpeg"
                        />
                    </div>
                </div>
            </LeftContainer>
        );
    }
}
