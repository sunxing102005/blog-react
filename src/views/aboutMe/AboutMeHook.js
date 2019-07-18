import React, { useEffect } from "react";
import ToTop from "@/components/toTop/ToTop";
import "./aboutMe.less";
import LeftContainer from "@/components/leftContainer/LeftContainer";
import { getBlogList } from "@/api/content";
import Toast from "../../components/common/toast/index";
import useAsync from "../../hooks/useAsync";
import ImageSelf from "@/components/common/image/index";
function AboutMe(props) {
    const params = { category_id: 33 };
    const { loading, error, value } = useAsync(() => {
        return getBlogList(params);
    });
    console.log(
        "value && value.content[0].content",
        value && value.content[0].content
    );
    useEffect(() => {
        if (error) Toast.error(error);
    }, [error]);
    return (
        <div>
            <div className="me-bg-img" />
            <div className="me-type-container">
                <div className="top-tip">自我介绍</div>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <div
                        className="blog-me"
                        dangerouslySetInnerHTML={{
                            __html: value && value.content[0].content
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
                            <ImageSelf
                                style={{ width: "100%" }}
                                defaultWidth="3rem"
                                defaultHeight="3rem"
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
export default AboutMe;
