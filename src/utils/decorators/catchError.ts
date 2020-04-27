export function catchError(catchFunc?: Function) {
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        const fun = descriptor.value;
        descriptor.value = function() {
            const _this = this,
                args = arguments;
            return (async () => {
                try {
                    console.log(":::::oo");
                    return await fun.apply(_this, args);
                } catch (error) {
                    console.log(":::::ooppp");
                    errorHandle.apply(self, [error, catchFunc]);
                }
            })();
        };
    };
}
function errorHandle(this: any, error: Error, catchFunc: Function) {
    console.info("catchError捕获到错误---begin");
    console.error(error);
    if (catchFunc) {
        catchFunc.apply(this, [error.message]);
    } else {
        // message.error(error.message);
    }
    console.info("catchError捕获到错误---end");
}
