import * as React from "react";

export interface HelloProps {
    compiler: string;
    framework: string;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
    render() {
        console.log("LLLLL");
        return <h1>Hello!</h1>;
    }
}
