import * as React from "react";
const ErrorMessage: React.FC<{ onReset: () => void }> = ({ onReset }) => {
    return (
        <div>
            <h2>{`Sorry there was an unexpected error`}</h2>
            <h2>{`please check the log and fix it soon `}</h2>
        </div>
    );
};
export default ErrorMessage;
