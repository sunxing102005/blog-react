import React from "react";
import LeftContainer from "@/components/leftContainer/LeftContainer";
import SpecialArt from "@/components/specialArt/SpecialArt";
import RecommandList from "@/components/recommandList/RecommandList";
import TagGroup from "@/components/tag/TagGroup";
import JoinUs from "@/components/joinUs/Joinus";
import "./leftContainerWhole.less";
import { getBlogList, getRecent, getAllTags } from "@/api/content";
import dateUtil from "@/utils/date";
import { toContentById } from "@/utils/common";
export default class Home extends React.Component {
    state = {
        viewOrderedList: [],
        recommendList: [],
        recentBlogs: [],
        tags: [],
        followmeScrollTop: 0
    };
    componentWillMount() {
        Promise.all([
            this.getSpecialArt(),
            this.getAllTags(),
            this.getRecentList(),
            this.getRecommendList()
        ]).then(result => {
            console.log("resultAll------", result);
            let followmeScrollTop = document.getElementById("fellowMe")
                .offsetTop;
            this.setState({ followmeScrollTop: followmeScrollTop });
        });
    }
    getSpecialArt = () => {
        return getBlogList({
            orderby: "view desc",
            fieldReverse: "content,markdown"
        }).then(res => {
            let list = res.content;
            list = list.map(item => {
                let date = null;
                if (item.publish_time) {
                    date = dateUtil.toFormat(
                        new Date(item.publish_time),
                        "yyyy-MM-dd"
                    );
                }
                return {
                    ...item,
                    date
                };
            });
            this.setState({ viewOrderedList: list });
        });
    };
    getRecentList = () => {
        return getRecent().then(res => {
            let blogs = res.recent.content;
            console.log("recentBlogs", blogs);
            blogs = blogs.map(item => {
                let date = null;
                if (item.publish_time) {
                    date = dateUtil.toFormat(
                        new Date(item.publish_time),
                        "yyyy-MM-dd"
                    );
                }
                return {
                    ...item,
                    date
                };
            });
            this.setState({ recentBlogs: blogs });
        });
    };
    getRecommendList = () => {
        return getBlogList({
            recommend: "Y",
            fieldReverse: "content,markdown"
        }).then(res => {
            let list = res.content;
            list = list.map(item => {
                let date = null;
                if (item.publish_time) {
                    date = dateUtil.toFormat(
                        new Date(item.publish_time),
                        "yyyy-MM-dd"
                    );
                }
                return {
                    ...item,
                    date
                };
            });
            this.setState({ recommendList: list });
        });
    };
    getAllTags = () => {
        return getAllTags({ type: "tag" }).then(res => {
            let list = res.map(item => item.name);
            this.setState({ tags: list });
        });
    };
    render() {
        const recommendList = this.state.recommendList.slice(0, 3);
        const recentBlogs = this.state.recentBlogs.slice(0, 4);
        const tags = this.state.tags;
        const viewOrderedList = this.state.viewOrderedList.slice(0, 4);
        return (
            <div className="left-whole-container">
                <LeftContainer title="特别推荐">
                    {recommendList.map((item, index) => (
                        <SpecialArt
                            title={item.title}
                            src={item.thumb}
                            key={index}
                            onClick={() => {
                                toContentById(item.id);
                            }}
                        />
                    ))}
                </LeftContainer>

                <LeftContainer title="点击排行">
                    <RecommandList recommandList={viewOrderedList} />
                </LeftContainer>
                <LeftContainer title="最近文章">
                    <RecommandList recommandList={recentBlogs} />
                </LeftContainer>
                <LeftContainer title="标签云">
                    <TagGroup list={tags} />
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
                <JoinUs followmeScrollTop={this.state.followmeScrollTop} />
            </div>
        );
    }
}
