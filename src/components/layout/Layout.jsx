import React, { Suspense, lazy } from "react";
import Header from "@/components/header/Header";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Footer from "@/components/footer/Footer";
import "./layout.less";
import { Hello } from "../Hello";
const Home = lazy(() => import("@/views/home/Home"));
const Content = lazy(() => import("@/views/content/Content"));
const TechArticles = lazy(() => import("@/views/typeArticles/TechArticles"));
const LifeArticles = lazy(() => import("@/views/typeArticles/LifeArticles"));
const AboutMe = lazy(() => import("@/views/aboutMe/AboutMeHook"));
export default class Layout extends React.Component {
    render() {
        console.log("hello", Hello);
        return (
            <div className="layout-container">
                <Header />
                <Router>
                    <Suspense fallback={<div>Loading...</div>}>
                        <div>
                            <Switch>
                                <Route
                                    path="/content"
                                    component={() => <Content />}
                                />
                                <Route
                                    path="/type/tech"
                                    component={() => <TechArticles />}
                                    name="学无止境"
                                />
                                <Route
                                    path="/type/life"
                                    component={() => <LifeArticles />}
                                />
                                <Route
                                    path="/me"
                                    component={() => <AboutMe />}
                                />
                                <Route path="/" component={() => <Home />} />
                            </Switch>
                        </div>
                    </Suspense>
                </Router>
                <Footer>
                    Design By SUNX <a> 孙星个人博客</a> 辽ICP备19009050号
                </Footer>
            </div>
        );
    }
}
