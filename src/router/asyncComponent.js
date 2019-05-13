import React from "react";
import { inject_unmount } from "@/utils/unmount";
const AsyncComponent = loadComponent => {
    class AsyncComponent extends React.Component {
        state = {
            Component: null
        };

        componentWillMount() {
            if (this.hasLoadedComponent()) {
                return;
            }
            loadComponent()
                .then(module => module.default || module)
                .then(Component => {
                    if (this.state) {
                        this.setState({ Component });
                    }
                })
                .catch(err => {
                    console.error(
                        `Cannot load component in <AsyncComponent />`
                    );
                    throw err;
                });
        }
        hasLoadedComponent() {
            return this.state.Component !== null;
        }

        render() {
            const { Component } = this.state;
            return Component ? <Component {...this.props} /> : null;
        }
    }
    return inject_unmount(AsyncComponent);
};

export default AsyncComponent;
