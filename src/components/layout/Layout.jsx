import React from "react";
import Header from "@/components/header/Header";
import { HashRouter as Router, Route } from "react-router-dom";
import AsyncComponent from "@/router/asyncComponent";
import "./layout.less";
const Home = AsyncComponent(() => import("@/views/home/Home"));

export default class Layout extends React.Component {
    render() {
        return (
            <div className="layout-container">
                <Header />
                <Router>
                    <Route path="/" component={Home} />
                </Router>
            </div>
        );
    }
}
