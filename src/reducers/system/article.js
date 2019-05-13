import {
    SEARCH_LIST,
    CHANGE_ARTICLE,
    CLEAR_ARTICLE,
    SET_TAGS
} from "../../actionTypes/article";

const initState = {
    data: {},
    singleArticle: {
        title: "",
        sign: "",
        thumb: "",
        date: "",
        status: "",
        tag: [],
        markdown: "",
        create_time: null
    },
    tags: []
};
const emptyArticle = {
    title: "",
    sign: "",
    thumb: "",
    date: "",
    status: "",
    tag: [],
    markdown: "",
    create_time: null
};
const articleReducer = (state = initState, action) => {
    const type = action.type;
    switch (type) {
        case SEARCH_LIST:
            return Object.assign({}, state, { data: action.data });
        case CHANGE_ARTICLE: {
            console.log("action", action);
            const singleArticle = Object.assign({}, state.singleArticle, {
                ...action.data
            });
            return Object.assign({}, state, { singleArticle });
        }
        case CLEAR_ARTICLE:
            return Object.assign({}, state, {
                singleArticle: emptyArticle
            });
        case SET_TAGS:
            return Object.assign({}, state, { tags: action.data });
        default:
            return state;
    }
};
export default articleReducer;
