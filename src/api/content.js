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
        url: "/content/listNoPage",
        method: "get",
        data: params
    });
}
export function getRecent() {
    return service({
        url: "/content/recentFiveBlogs",
        method: "get"
    });
}
export function getBlogById(params) {
    return service({
        url: "/content/getBlogById",
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
        url: "/content/changeLikes",
        method: "get",
        data: params
    });
}
export function getLastNextBlog(params) {
    return service({
        url: "/content/getLastAndNextBlog",
        method: "post",
        data: params
    });
}
