const host = "http://localhost:8365";
export default {
    // eslint-disable-next-line
    serverHost: SERVER_HOST == "dev" ? host : ""
};
