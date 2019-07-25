import * as React from "react";
import "./header.less";
import { Link } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router-dom";
const headerList = [
    { name: "网站首页", path: "/" },
    { name: "关于我", path: "/me" },
    { name: "技术博客", path: "/type/tech" },
    { name: "慢生活", path: "/type/life" }
    // { name: "时间轴", path: "/" },
    // { name: "内容页", path: "/content" }
];

@(withRouter as any)
class Header extends React.Component<RouteComponentProps> {
    render() {
        const { location } = this.props;

        const currPath = location.pathname;
        console.log("currPath", location);
        return (
            <header>
                <div>
                    <nav className="nav-container">
                        <h1 className="logo">孙星博客</h1>
                        {headerList.map((item, index) => {
                            return (
                                <Link to={item.path} key={index}>
                                    <li
                                        className={
                                            currPath != item.path
                                                ? "titleItem"
                                                : "titleItem active"
                                        }
                                        key={index}
                                    >
                                        {item.name}
                                    </li>
                                </Link>
                            );
                        })}
                        <div className="search">
                            <i className="fa fa-search icon" />
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
}
// const typ=withRouter(Header)
export default Header;
