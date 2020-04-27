import { defineMetadata } from "./validate";
// 1.定义常量名
const NAME = Symbol("name");
const NOT_EMPTY = Symbol("NOT_EMPTY");
// 2.定义装饰器
export function name(label: string = "用户名") {
    return function(target: any, propertyKey: string, index: number) {
        defineMetadata(NAME, { label, index }, propertyKey, target);
    };
}
export function notEmpty(label: string = "非空") {
    return function(target: any, propertyKey: string, index: number) {
        defineMetadata(NOT_EMPTY, { label, index }, propertyKey, target);
    };
}
// 3.定义检验方法
export const checkName = (val: string) =>
    !!(val && (val.length > 1 && val.length < 9));
export const checkNotEmpty = (val: string | Array<any>) => {
    console.log("vals", !!val.length);
    return Array.isArray(val) ? !!val.length : !!val;
};
// 4.定义规则
export const rules = [
    {
        type: NOT_EMPTY,
        checkValue: checkNotEmpty,
        message: "该字段必须传值"
    }
];
