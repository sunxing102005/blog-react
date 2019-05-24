import service from "../axios/service";
export function getContent(params) {
    return service({
        url: "/api/content",
        method: "get",
        data: params
    });
}
export function getBlogList(params) {
    return service({
        url: "/font/content/listNoPage",
        method: "get",
        data: params
    });
}
export function getRecent() {
    return service({
        url: "/font/content/recentFiveBlogs",
        method: "get"
    });
}
export function getBlogById(params) {
    return service({
        url: "/font/content/getBlogById",
        method: "get",
        data: params
    });
}
export function getAllTags(params) {
    return service({
        url: "/api/meta",
        method: "get",
        data: params
    });
}
export function changeLikes(params) {
    return service({
        url: "/font/content/changeLikes",
        method: "get",
        data: params
    });
}
export function getLastNextBlog(params) {
    return service({
        url: "/font/content/getLastAndNextBlog",
        method: "post",
        data: params
    });
}
