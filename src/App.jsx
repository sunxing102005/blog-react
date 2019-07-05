import React, { Suspense, lazy } from "react";
import logo from "./logo.svg";
import "./App.css";
import AsyncComponent from "@/router/asyncComponent";
import { HashRouter as Router, Route } from "react-router-dom";
// import "@/assets/js/scrollReveal";
const SelftLayout = lazy(() => import("@/components/layout/Layout"));
console.log("SelftLayout instanceof Object", SelftLayout);
class App extends React.Component {
    render() {
        return (
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Route path="/" component={() => <SelftLayout />} />
                </Suspense>
            </Router>
        );
    }
}

export default App;
