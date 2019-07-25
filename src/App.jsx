import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AsyncComponent from "@/router/asyncComponentTs";
import { HashRouter as Router, Route } from "react-router-dom";
// import "@/assets/js/scrollReveal";
const SelftLayout = AsyncComponent(() => import("@/components/layout/Layout"));
class App extends React.Component {
    render() {
        return (
            <Router>
                <Route path="/" component={SelftLayout} />
            </Router>
        );
    }
}

export default App;
