import * as React from "react";
import "./footer.less";
type Props = {
    children: number;
    pp: number;
};
export default class Footer extends React.Component<Props, {}> {
    render() {
        const { children } = this.props;
        return (
            <footer className="footer-container">
                <p className="footer-text">{children}</p>
            </footer>
        );
    }
}
