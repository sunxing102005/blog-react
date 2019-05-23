/**
 * server封装，所有请求都走这里
 * option = {
 *      url:请求地址
 *      method: 'post' // 请求方式，post\get\put\delete
 *      data: {}, // 参数，以及fn，成功回调函数，errorFn：失败回调函数
 *
 * }
 * service(option)
 */
import axios from "axios";
import base from "./base.js";

const service = option => {
    console.log("option", option);

    const url = base.getRequestURL(option.url);

    //是否返回的是二进制文件
    const isBlob = option.isBlob;
    const responseType = isBlob ? "blob" : "json";

    const req = {
        method: option.method,
        callbackFn: (option.data && option.data.fn) || null,
        callbackErrFn: (option.data && option.data.errorFn) || null
    };

    option.data && option.data.fn && delete option.data.fn;
    option.data && option.data.errorFn && delete option.data.errorFn;

    let sendData = option.data || {};

    if (req.method.toLowerCase() === "post") {
        if (option.isFormData) {
            req.data = sendData.formData;
        } else {
            //针对参数类型是对象（包含数组）
            for (const key in sendData) {
                if (
                    typeof sendData[key] === "object" &&
                    !sendData[key] instanceof Array
                ) {
                    sendData[key] = JSON.stringify(sendData[key]);
                }
            }
            // console.log("sendData", sendData);
            // sendData = qs.stringify(sendData);
            // console.log("sendData1", sendData);
            req.data = sendData;
        }
    } else if (req.method === "get") {
        req.params = sendData;
    } else {
        req.data = sendData;
    }
    /*
    else {
        req.params = sendData;
        req.data = sendData;
        req.headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        };
    }
    */

    console.log("url:", url);

    return axios({ url, ...req, responseType })
        .then(res => {
            console.log("res", res);
            const response = res.data;
            if (isBlob) {
                return response;
            }
            if (response.data.errno) {
                let errmsg = response.data.errmsg;
                req.callbackErrFn(errmsg || "接口请求失败");
            } else {
                req.callbackFn && req.callbackFn(response.data);
                Promise.resolve(response.data);
                return response.data;
            }
        })
        .catch(error => {
            let res = error.response;
            // message.error(error.message);
            // return Promise.reject(error);
            req.callbackErrFn &&
                req.callbackErrFn(res.message || "接口请求失败");
            throw error.message;
        });
};

export default service;
