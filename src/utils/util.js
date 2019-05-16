export function throttle(callback, delay) {
    let timeout = null;
    let startTime = new Date();
    return function() {
        let args = arguments;
        const curTime = new Date();
        // eslint-disable-next-line
        clearTimeout(timeout);
        // 如果达到了规定的触发时间间隔，触发 handler
        if (curTime - startTime >= delay) {
            callback(...args);
            startTime = curTime;
        } else {
            // 没达到触发间隔，重新设定定时器
            timeout = setTimeout(() => callback(...args), delay);
        }
    };
}
