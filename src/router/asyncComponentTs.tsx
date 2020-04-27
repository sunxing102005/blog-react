import * as React from "react";
import { inject_unmount } from "@/utils/unmount";
interface InjectedProps {}
const aysncComponent = <BaseProps extends InjectedProps>(
    getComponent: () => Promise<any>
) => {
    type HocState = {
        readonly Component: React.ComponentType<any> | null;
    };
    class HOC extends React.Component<BaseProps, HocState> {
        readonly state: HocState = {
            Component: null
        };
        hasLoadedComponent() {
            return this.state.Component !== null;
        }
        async componentWillMount() {
            if (this.hasLoadedComponent()) {
                return;
            }
            const lazyComponent = (await getComponent()).default;
            if (this.state) {
                this.setState({ Component: lazyComponent });
            }
        }
        render() {
            const { Component } = this.state;
            return Component ? <Component /> : null;
        }
    }
    return inject_unmount(HOC);
};
export default aysncComponent;
