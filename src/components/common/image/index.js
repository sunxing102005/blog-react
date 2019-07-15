import React, {
    useEffect,
    useCallback,
    useState,
    useMemo,
    useRef
} from "react";
import "./image.less";
import { throttle } from "throttle-debounce";
import { on, off, getScrollContainer, isInContainer } from "@/utils/dom";
import { isHtmlElement, isString } from "@/utils/type";
function ImageSelf(props) {
    const {
        style = {},
        src,
        loadingSlot = "加载中...",
        errorSlot = "加载失败",
        defaultWidth = "auto",
        defaultHeight = "auto",
        alt = "",
        scrollContainer = {},
        lazy = false
    } = props;
    // console.log("props", props);
    const elRef = useRef(null);
    const [loadingFlag, setLoadingFlag] = useState(true);
    const [errorFlag, setErrorFlag] = useState(false);
    const [show, setShow] = useState(!lazy);
    const [scrollState, setScrollState] = useState(null);
    const [lazyLoadFlag, setLazyLoadFlag] = useState(false);
    const imgDefaultStyle = {
        width: defaultWidth,
        height: defaultHeight,
        lineHeight: defaultHeight
    };
    // console.log("imgDefaultStyle", imgDefaultStyle);
    const loading = (
        <div className="image-placeholder" ref={elRef} style={imgDefaultStyle}>
            {loadingSlot}
        </div>
    );
    const error = (
        <div className="image-error" ref={elRef} style={imgDefaultStyle}>
            {errorSlot}
        </div>
    );
    const image = <img style={style} ref={elRef} src={src} alt={alt} />;
    const handleLoad = useCallback((e, img) => {
        setLoadingFlag(false);
    }, []);
    const handleError = useCallback((e, img) => {
        setLoadingFlag(false);
        setErrorFlag(true);
    }, []);
    const loadImage = () => {
        const img = new Image();
        img.onload = e => handleLoad(e, img);
        img.onerror = handleError;
        img.src = props.src;
    };
    const handleLazyLoad = useCallback(() => {
        // console.log("elRef", elRef.current);
        // console.log("scrollState", scrollState);
        if (
            elRef.current &&
            scrollState &&
            isInContainer(elRef.current, scrollState)
        ) {
            setShow(true);
            setLazyLoadFlag(false);
        }
        // eslint-disable-next-line
    }, [scrollState]);
    const throttleLazyLoad = useCallback(
        //不用useCallback缓存，每次render throttleLazyLoad的值会是一个新对象
        //取消监听时无效。
        throttle(200, handleLazyLoad),
        // eslint-disable-next-line
        [scrollState]
    );

    const addLazyLoadListener = () => {
        let _scrollContainer = null;
        if (isHtmlElement(scrollContainer)) {
            _scrollContainer = scrollContainer;
        } else if (isString(scrollContainer)) {
            _scrollContainer = document.querySelector(scrollContainer);
        } else {
            _scrollContainer = getScrollContainer(elRef.current);
        }

        if (_scrollContainer) {
            setScrollState(_scrollContainer);
            setLazyLoadFlag(true);
        }
    };
    useEffect(() => {
        if (lazyLoadFlag && scrollState) {
            on(scrollState, "scroll", throttleLazyLoad);
            handleLazyLoad();
        } else if (!lazyLoadFlag && scrollState) {
            off(scrollState, "scroll", throttleLazyLoad);
        }

        // eslint-disable-next-line
    }, [scrollState, lazyLoadFlag]);
    useEffect(() => {
        if (show) {
            loadImage();
        } else {
            addLazyLoadListener();
        }
        // eslint-disable-next-line
    }, [show]);
    useEffect(() => {
        return () => {
            //destory
            off(scrollState, "scroll", throttleLazyLoad);
        };
        // eslint-disable-next-line
    }, []);
    const content = useMemo(() => {
        if (loadingFlag) {
            return loading;
        } else if (errorFlag) {
            return error;
        } else {
            return image;
        }
        // eslint-disable-next-line
    }, [errorFlag, loadingFlag]);
    return content;
}
export default ImageSelf;
