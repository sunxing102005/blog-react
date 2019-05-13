import config from "../config/index.js";
const getRequestURL = path => {
    return config.serverHost + path;
};

export default {
    getRequestURL
};
