import React from "react";
import "./header.less";
const headerList = [
    { name: "网站首页" },
    { name: "关于我" },
    { name: "慢生活" },
    { name: "时间轴" }
];
export default class Header extends React.Component {
    render() {
        return (
            <header>
                <div>
                    <nav className="nav-container">
                        <h1 className="logo">孙星博客</h1>
                        {headerList.map((item, index) => (
                            <li className="titleItem" key={index}>
                                {item.name}
                            </li>
                        ))}
                        <div className="search">
                            <i className="fa fa-search icon" />
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
}
