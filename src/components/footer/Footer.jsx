import React from "react";
import "./footer.less";
export default class Footer extends React.Component {
    render() {
        const { children } = this.props;

        return (
            <footer className="footer-container">
                <p className="footer-text">{children}</p>
            </footer>
        );
    }
}
