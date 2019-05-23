import history from "./history";
export function toContentById(id) {
    history.push("/content?id=" + id);
}
