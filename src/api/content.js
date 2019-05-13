import service from "../axios/service";
export function getContent(params) {
    return service({
        url: "/api/content",
        method: "get",
        data: params
    });
}
export function deleteArticle({ id }) {
    return service({
        url: "/api/content/" + id,
        method: "delete"
    });
}
export function addArticle(params, id) {
    return service({
        url: id ? "/api/content/" + id : "/api/content",
        method: "post",
        data: params
    });
}
