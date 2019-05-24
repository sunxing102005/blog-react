import history from "./history";
export function toContentById(id) {
    history.push("/content?id=" + id);
}
export function queryString(search) {
    let ret = {};
    let query = search.substring(search.indexOf("?") + 1);
    let allQueryArr = query.split("&");
    if (allQueryArr.length > 0) {
        allQueryArr.forEach(item => {
            let keyValArr = item.split("=");
            ret[keyValArr[0]] = keyValArr[1];
        });
    }
    return ret;
}
