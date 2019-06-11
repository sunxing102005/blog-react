import React from "react";
import ToTop from "@/components/toTop/ToTop";
import "./aboutMe.less";
import LeftContainer from "@/components/leftContainer/LeftContainer";
import { getBlogList } from "@/api/content";
export default class Home extends React.Component {
    state = {
        blog: {}
    };
    componentWillMount() {
        const params = { category_id: 33 }; //取category是self的，理论上只有一个
        getBlogList(params)
            .then(res => {
                let list = res.content;
                const blog = list[0];
                this.setState({ blog });
            })
            .catch(err => {
                console.error(err);
            });
    }
    render() {
        const { name } = this.props;
        const blog = this.state.blog;
        return (
            <div>
                <div className="me-bg-img" />
                <div className="me-type-container">
                    <div className="top-tip">{name}</div>
                    <div style={{ display: "flex", alignItems: "flex-start" }}>
                        <div
                            className="blog-me"
                            dangerouslySetInnerHTML={{
                                __html: blog.content
                            }}
                        />
                        <div className="left-whole-content">
                            <div className="left-content description">
                                <p className="avatar">
                                    <img
                                        src="http://cdn.sunx.club/wechat-header-sunx.png"
                                        alt="avatar"
                                    />
                                </p>
                                <p className="abname"> sunx | 孙星 </p>
                                <p className="abposition">Web前端工程师</p>
                                <p className="abtext">
                                    一个普普通通，但是也有点东西的英俊程序员。
                                </p>
                            </div>
                            <LeftContainer title="微信关注">
                                <img
                                    style={{ width: "100%" }}
                                    src="http://cdn.sunx.club/wechat-sunx.jpeg"
                                    alt="wechat"
                                />
                            </LeftContainer>
                        </div>
                    </div>
                    <ToTop />
                </div>
            </div>
        );
    }
}
