/**
 * 组件销毁后，不能设置state
 * @param {*} target
 */
export function inject_unmount(target) {
    // 改装componentWillUnmount，销毁的时候记录一下
    let next = target.prototype.componentWillUnmount;
    target.prototype.componentWillUnmount = function() {
        if (next) next.call(this, ...arguments);
        this.unmount = true;
    };
    // 对setState的改装，setState查看目前是否已经销毁
    let setState = target.prototype.setState;
    target.prototype.setState = function() {
        // console.log("this.unmount", this.unmount);
        if (this.unmount) return;
        setState.call(this, ...arguments);
    };
    return target;
}
