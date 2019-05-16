import React from "react";
import HeaderImgs from "./headImgs/HeaderImgs";
import BlogList from "@/components/blogList/BlogList";
import "./home.less";
import LeftContainer from "@/components/leftContainer/LeftContainer";
import { specialArts, recommandList, tagList } from "@/enums/home";
import SpecialArt from "@/components/specialArt/SpecialArt";
import RecommandList from "@/components/recommandList/RecommandList";
import TagGroup from "@/components/tag/TagGroup";
import JoinUs from "@/components/joinUs/Joinus";
export default class Home extends React.Component {
    render() {
        return (
            <article className="article-container">
                <HeaderImgs />
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <BlogList className="blog-list" />
                    <div className="left-whole-container">
                        <LeftContainer title="特别推荐">
                            {specialArts.map((item, index) => (
                                <SpecialArt
                                    title={item.title}
                                    src={item.src}
                                    key={index}
                                />
                            ))}
                        </LeftContainer>
                        <LeftContainer title="推荐文章">
                            <RecommandList recommandList={recommandList} />
                        </LeftContainer>
                        <LeftContainer title="点击排行">
                            <RecommandList recommandList={recommandList} />
                        </LeftContainer>
                        <LeftContainer title="标签云">
                            <TagGroup list={tagList} />
                        </LeftContainer>
                        <LeftContainer title="相关链接">
                            <p className="link-p">
                                <a href="https://github.com/sunxing102005">
                                    personal github
                                </a>
                            </p>
                            <p className="link-p">
                                <a href="https://blog.csdn.net/qq_36228442">
                                    csdn blog
                                </a>
                            </p>
                        </LeftContainer>
                        <JoinUs />
                    </div>
                </div>
            </article>
        );
    }
}
