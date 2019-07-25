import * as React from "react";
import { Subtract } from "utility-types";

const MISSING_ERROR = "Error was swallowed during propagation.";
interface InjectedProps {
    onReset: () => void;
}
export const withErrorBoundary = <BaseProps extends InjectedProps>(
    _BaseComponent: React.ComponentType<BaseProps>
) => {
    const BaseComponent = _BaseComponent as React.ComponentType<InjectedProps>;
    type HOCProps = Subtract<BaseProps, InjectedProps>;
    type HOCState = {
        readonly error: Error | null | undefined;
    };
    return class HOCComponent extends React.Component<HOCProps, HOCState> {
        static displayName = `withErrorBoundary(${BaseComponent.name})`;
        static readonly WrappedComponent = BaseComponent;
        readonly state = {
            error: undefined
        };
        handleRest = () => {
            this.setState({ error: undefined });
        };
        componentDidCatch(error: Error | null, info: object) {
            console.error("errorBoundary work");
            this.setState({ error: error || new Error(MISSING_ERROR) });
        }
        render() {
            const { children, ...rest } = this.props;
            const { error } = this.state;
            if (error) {
                return <BaseComponent onReset={this.handleRest} {...rest} />;
            }
            return children;
        }
    };
};
