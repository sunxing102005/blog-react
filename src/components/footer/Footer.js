import React from "react";
import "./footer.less";
export default function Footer(props) {
    const { children } = props;
    return (
        <footer className="footer-container">
            <p className="footer-text">{children}</p>
        </footer>
    );
}
