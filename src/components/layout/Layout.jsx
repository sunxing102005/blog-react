import React from "react";
import Header from "@/components/header/Header";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import AsyncComponent from "@/router/asyncComponentTs";
import Footer from "@/components/footer/Footer";
import "./layout.less";
const Home = AsyncComponent(() => import("@/views/home/Home"));
const Content = AsyncComponent(() => import("@/views/content/Content"));
const TechArticles = AsyncComponent(() =>
    import("@/views/typeArticles/TechArticles")
);
const LifeArticles = AsyncComponent(() =>
    import("@/views/typeArticles/LifeArticles")
);
const AboutMe = AsyncComponent(() => import("@/views/aboutMe/AboutMe"));
export default class Layout extends React.Component {
    render() {
        return (
            <div className="layout-container">
                <Header />
                <Router>
                    <div>
                        <Switch>
                            <Route path="/content" component={Content} />
                            <Route
                                path="/type/tech"
                                component={TechArticles}
                                name="学无止境"
                            />
                            <Route path="/type/life" component={LifeArticles} />
                            <Route path="/me" component={AboutMe} />
                            <Route path="/" component={Home} />
                        </Switch>
                    </div>
                </Router>
                <Footer>
                    Design By SUNX <a> 孙星个人博客</a> 辽ICP备19009050号
                </Footer>
            </div>
        );
    }
}
