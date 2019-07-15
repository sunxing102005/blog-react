import * as React from "react";
import "./image.less";
import { throttle } from "throttle-debounce";
import { on, off, getScrollContainer, isInContainer } from "@/utils/dom";
import { isHtmlElement, isString } from "@/utils/type";
class LazyImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingFlag: true,
            errorFlag: false,
            show: !this.props.lazy,
            scrollState: null,
            lazyLoadFlag: false
        };
        this.elRef = React.createRef();
    }
    componentDidMount() {
        this.updateShow(this.state);
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (
            nextState.show != this.state.show ||
            this.state.loadingFlag != nextState.loadingFlag ||
            this.state.errorFlag != nextState.errorFlag
        ) {
            this.updateShow(nextState);
            return true;
        } else {
            return false;
        }
    }
    componentWillUnmount() {
        this.props.lazy && this.removeLazyLoadListener();
    }
    updateShow = nextState => {
        console.log("this.state.show", this.state.show);
        if (nextState.show) {
            this.loadImage();
        } else {
            this.addLazyLoadListener();
        }
    };
    handleLoad = () => {
        this.setState({ loadingFlag: false });
    };
    handleError = () => {
        this.setState({ loadingFlag: false, errorFlag: true });
    };
    loadImage = () => {
        const img = new Image();
        img.onload = e => this.handleLoad(e, img);
        img.onerror = this.handleError;
        img.src = this.props.src;
    };
    handleLazyLoad = () => {
        if (
            this.elRef.current &&
            this.scrollState &&
            isInContainer(this.elRef.current, this.crollState)
        ) {
            this.setState({ show: true, lazyLoadFlag: false });
        }
    };
    handleLazyLoad = () => {
        if (isInContainer(this.elRef.current, this._scrollContainer)) {
            this.setState({ show: true });
            this.removeLazyLoadListener();
        }
    };
    removeLazyLoadListener = () => {
        const { _scrollContainer, _lazyLoadHandler } = this;

        if (!_scrollContainer || !_lazyLoadHandler) return;

        off(_scrollContainer, "scroll", _lazyLoadHandler);
        this._scrollContainer = null;
        this._lazyLoadHandler = null;
    };
    addLazyLoadListener = () => {
        let _scrollContainer = null;
        if (isHtmlElement(this.props.scrollContainer)) {
            _scrollContainer = this.props.scrollContainer;
        } else if (isString(this.props.scrollContainer)) {
            _scrollContainer = document.querySelector(
                this.props.scrollContainer
            );
        } else {
            _scrollContainer = getScrollContainer(this.elRef.current);
        }
        if (_scrollContainer) {
            // this.setState({ scrollState: _scrollContainer });
            this._scrollContainer = _scrollContainer;
            this._lazyLoadHandler = throttle(200, this.handleLazyLoad);
            on(_scrollContainer, "scroll", this._lazyLoadHandler);
            this.handleLazyLoad();
        }
    };

    render() {
        const {
            style = {},
            src,
            loadingSlot = "加载中...",
            errorSlot = "加载失败",
            defaultWidth = "auto",
            defaultHeight = "auto",
            alt = ""
        } = this.props;
        const imgDefaultStyle = {
            width: defaultWidth,
            height: defaultHeight,
            lineHeight: defaultHeight
        };
        const loading = (
            <div
                className="image-placeholder"
                ref={this.elRef}
                style={imgDefaultStyle}
            >
                {loadingSlot}
            </div>
        );
        const error = (
            <div
                className="image-error"
                ref={this.elRef}
                style={imgDefaultStyle}
            >
                {errorSlot}
            </div>
        );
        const image = (
            <img style={style} ref={this.elRef} src={src} alt={alt} />
        );
        if (this.state.loadingFlag) {
            return loading;
        } else if (this.state.errorFlag) {
            return error;
        } else {
            return image;
        }
    }
}
export default LazyImage;
