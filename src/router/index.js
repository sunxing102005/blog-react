import { routerConfig } from "./routerConfig";
import util from "./util";
const faltRoutes = [...util.flatRoutes(routerConfig)];
export default faltRoutes;
// export default () => (
//     <Route path="/">
//         <Route path="/article" component={Article} key="article" />
//         <Route path="/news" component={News} key="news" />
//     </Route>
// );
