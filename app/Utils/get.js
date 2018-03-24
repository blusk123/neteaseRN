const callback = res => {
    return res.json().then( json => {
        return json
    })
}
const urlFn = (url, item) => {
    let params = ""
    for( let val in item) {
        params += '&' + val + '=' + item[val]
    }
    if(params) {
        params = params.replace('&', '?')
    }
    url += params
    return url
}
// 发送 post 请求
export function get(url, item) {
    // url += '?timestamp=' + Date.now()
    url = item ? urlFn(url, item) : url
    // console.log(url)
    return fetch(url, {
        method: 'get',
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            // 'Content-Type': 'application/x-www-form-urlencoded'
        },
        // body: obj2params(paramsObj) 
    }).then(callback)
}
