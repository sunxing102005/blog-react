import "reflect-metadata";
import { rules } from "./rules";
interface CustomMetaData {
    label: string; // 修饰参数关联的名字 如 name =》 用户名
    index: number; // 参数索引
}
export function defineMetadata(
    metaName: symbol,
    metaData: CustomMetaData,
    propertyKey: string,
    target: any
) {
    Reflect.defineMetadata(
        propertyKey,
        metaData,
        target,
        String(metaName) + metaData.index
    );
}
function validator(propertyKey: string, target: any, args: any) {
    for (let index in args) {
        for (let rule of rules) {
            const type: Symbol = rule.type;
            const item: CustomMetaData = Reflect.getMetadata(
                propertyKey,
                target,
                String(type) + index
            );

            if (!item) continue;
            const op = rule.checkValue(args[index]);
            if (!rule.checkValue(args[index])) {
                throw new Error(item.label + ":" + rule.message);
            }
            break;
        }
    }
}
export function validate() {
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        const fun = descriptor.value;
        descriptor.value = function() {
            try {
                validator(propertyKey, target, arguments);
                fun.apply(this, arguments);
            } catch (error) {
                // message.error(error.message);
            }
        };
    };
}
