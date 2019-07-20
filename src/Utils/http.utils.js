import axios from 'axios';
import GLOBAL from '../Constants/global.constants';
import { notify } from 'react-notify-toast';
// import NotifyService from '../Services/notify.service';
// import Loader from '../Services/loader.service';

export const defautlHeaders = {
    'Content-Type': 'application/json;charset=UTF-8',
};

export async function Get(obj) {
    if (!(obj && obj.url)) {
        return false;
    }

    const params = await getNecessaryParams(obj);
    return ApiCall(params);
}

export async function Post(obj) {
    obj.method = 'POST';
    const params = await getNecessaryParams(obj);
    return ApiCall(params);
}

export async function Put(obj) {
    obj.method = 'PUT';
    const params = await getNecessaryParams(obj);
    return ApiCall(params);
}

export async function Delete(obj) {
    const params = await getNecessaryParams(obj);
    return ApiCall(params);
}

async function getToken() {
    try {
        const value = await localStorage.getItem('@token')
        return value;
    } catch (e) {
        return;
    }
}

function ApiCall({ url, method, headers, body, resolve = defaultResolve, reject = defaultReject, params, hideMessage, hideLoader, persist, callback, extraParams, imageUploadId }) {
    const postDict = {
        headers, method
    };

    if (body) { // if body is attached
        postDict.body = body;
    }

    if (!hideLoader) {
        // Loader.start();
    }

    console.log('url', url);
    return axios({
        url,
        headers,
        data: body,
        method,
        params
    })
        .then((response) => {
            // Loader.stop();
            console.log('response', response);
            return resolve(response.data, { callback });
        })
        .catch((error) => {
            // Loader.stop();
            return reject(error);
        });
}

async function getNecessaryParams(obj) {
    const url = createFinalUrl(obj);
    const method = obj.method || 'GET';
    const headers = await createHeader(obj);

    const resolve = obj.hasOwnProperty('resolve') ? obj.resolve : defaultResolve;
    const reject = obj.hasOwnProperty('reject') ? obj.reject : defaultReject;

    const responseObj = {
        url, method, headers, resolve, reject, hideMessage: obj.hideMessage || false, hideLoader: obj.hideLoader
    };

    if (obj.body) {
        responseObj.body = obj.body;
        console.log('obj.body', obj.body)
    }

    return responseObj;
}

function createFinalUrl(obj) {
    return `${GLOBAL.API_BASE}/${obj.url}`;
}

async function createHeader(obj) {
    const headers = defautlHeaders;
    const token = await getToken();
    headers['Authorization'] = `Bearer ${token}`;

    // if headers are not passed
    if (!obj.headers) {
        return headers;
    }

    // extend default header options with one, passed with obj
    return { ...headers, ...obj.headers };
}

function defaultResolve(result, { callback }) {
    if (typeof callback == 'function') {
        callback(result);
    }

    if (result && result.response && typeof result.response == 'string') {
        notify.show(result.response, "success", 1000);
        // NotifyService.notify({
        //     title: '',
        //     message: result.response,
        //     type: result.success ? 'success' : 'error',
        //     duration: 1200
        // })
    }

    return result;
}

function defaultReject(result) {
    notify.show(result.response, "error", 1000);
    return result;
}