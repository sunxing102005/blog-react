import { isMounted } from "./isMounted";
function loading(property: string = "loading") {
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        const func = descriptor.value;
        descriptor.value = function(this: any) {
            const _this = this,
                args = arguments;
            return (async () => {
                _this.setState({
                    [property]: true
                });
                try {
                    const result = await func.apply(_this, args);
                    if (isMounted(_this)) {
                        _this.setState({
                            [property]: false
                        });
                        return result;
                    }
                } catch (error) {
                    if (isMounted(_this)) {
                        _this.setState({
                            [property]: false
                        });
                    }
                    throw error;
                }
            })();
        };
    };
}
