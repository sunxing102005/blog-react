export default {
    flatRoutes(routeTree = [], routes = [], parent = null) {
        for (let i = 0; i < routeTree.length; i++) {
            const routeItem = routeTree[i];
            let cloneRoute = { ...routeItem };

            if (routeItem.path) {
                cloneRoute.parent = parent;
                delete cloneRoute.children;
                routes.push(cloneRoute);
            }
            if (routeItem.children) {
                this.flatRoutes(routeItem.children, routes, cloneRoute);
            }
        }
        return routes;
    }
};
