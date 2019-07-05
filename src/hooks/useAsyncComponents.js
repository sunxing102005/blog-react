import React, { useState, useEffect } from "react";
import { inject_unmount } from "@/utils/unmount";
const asyncComponent = loadComponent => {
    function useAsyncCom(props) {
        const [component, setComponent] = useState(null);

        useEffect(() => {
            function hasLoadedComponent() {
                return component !== null;
            }
            if (hasLoadedComponent()) {
                return;
            }
            loadComponent()
                .then(module => module.default || module)
                .then(Component => {
                    setComponent(Component);
                })
                .catch(err => {
                    console.error(
                        `Cannot load component in <AsyncComponent />`
                    );
                    throw err;
                });
        }, [component]);
        return component ? <component {...props} /> : null;
    }
    return useAsyncCom;
};
export default asyncComponent;
