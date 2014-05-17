var createCookie = function(key,value,options){
    options = options || {};

    var cookiesAry = [key+'='+encodeURIComponent(value)];
    var maxage = options.maxAge ? options.maxAge : options.maxage;

    if(maxage){
        var temp = maxage - 0;
        if(isNaN(temp))
            throw new Error('max age should be a number');
        cookiesAry.push('Max-Age='+temp);
    }

    if(options.domain)
        cookiesAry.push('Domain='+options.domain);
    if(options.path)
        cookiesAry.push('Path='+options.path);
    if(options.expires)
        cookiesAry.push('Expires='+options.expires.toUTCString());
    if(options.httpOnly || options.httponly)
        cookiesAry.push('HttpOnly');
    if(options.secure || options.Secure)
        cookiesAry.push('Secure');

    return cookiesAry.join('; ');
}

var cookieParse =  function(str){
    var allPairsArray = str.split(/;/);
    var cookies = {};
    for(var i = 0; i < allPairsArray.length; i++){
        var index = allPairsArray[i].indexOf('=');
        if(index != -1){
            var key = allPairsArray[i].substr(0, index).trim();
            var value =  allPairsArray[i].substr(index+1, allPairsArray[i].length).trim();
            //strip away quotes that may encapsulate a value
            if('"'===value[0])
                value = value.slice(1,-1);
            if(cookies[key] === undefined){
                try{
                    cookies[key] = decodeURIComponent(value);
                }catch(e){
                    cookies[key] = value;
                }
            }
        }
    }
    return cookies;
}

module.exports.createCookie = createCookie;
module.exports.cookieParse = cookieParse;