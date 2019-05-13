import {
    SEARCH_LIST,
    CHANGE_ARTICLE,
    CLEAR_ARTICLE,
    SET_TAGS
} from "../../actionTypes/article";
import service from "../../axios/service";
const setList = data => {
    return { type: SEARCH_LIST, data };
};
const changeArticle = data => {
    return { type: CHANGE_ARTICLE, data };
};
const clearArticle = data => {
    return { type: CLEAR_ARTICLE, data };
};
const fetchTags = data => {
    return { type: SET_TAGS, data };
};
export function fetchListData(params) {
    return dispatch => {
        return service({
            url: "/api/content",
            method: "get",
            data: params
        })
            .then(res => {
                if (res.data instanceof Array) {
                    dispatch(setList(res));
                } else {
                    dispatch(changeArticle(res));
                }
            })
            .catch(err => {
                console.error("err", err);
            });
    };
}
export function setTags(params) {
    return dispatch => {
        return service({
            url: "/api/meta",
            method: "get",
            data: params
        })
            .then(res => {
                dispatch(fetchTags(res));
            })
            .catch(err => {
                console.error("err", err);
            });
    };
}
export function articleChange(data) {
    return dispatch => {
        dispatch(changeArticle(data));
    };
}
export function articleClear(data) {
    return dispatch => {
        dispatch(clearArticle(data));
    };
}
